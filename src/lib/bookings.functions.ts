import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ============ Booking server functions ============

const createBookingSchema = z.object({
  trail_id: z.string().uuid(),
  booking_date: z.string(),
  start_time: z.string().optional(),
  guests: z.number().int().min(1).max(50),
  is_private: z.boolean().default(false),
  addons: z
    .array(
      z.object({
        name: z.string().max(80),
        quantity: z.number().int().min(1).max(20),
        unit_price: z.number().min(0),
      }),
    )
    .max(20)
    .default([]),
  coupon_code: z.string().max(64).optional(),
  customer_notes: z.string().max(2000).optional(),
});

export const createBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => createBookingSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: trail, error: trailErr } = await supabase
      .from("trails")
      .select("id, vendor_id, base_price, currency, name")
      .eq("id", data.trail_id)
      .eq("status", "active")
      .maybeSingle();

    if (trailErr || !trail) throw new Error("Trail not found");

    const base_amount = Number(trail.base_price) * data.guests;
    const addons_amount = data.addons.reduce(
      (sum, a) => sum + a.unit_price * a.quantity,
      0,
    );

    // Coupon
    let discount_amount = 0;
    let couponId: string | null = null;
    if (data.coupon_code) {
      const { data: coupon } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", data.coupon_code.toUpperCase())
        .eq("is_active", true)
        .maybeSingle();
      if (coupon) {
        const now = new Date();
        const okStart = !coupon.starts_at || new Date(coupon.starts_at) <= now;
        const okEnd = !coupon.expires_at || new Date(coupon.expires_at) >= now;
        const okMin =
          !coupon.min_booking_amount ||
          base_amount + addons_amount >= Number(coupon.min_booking_amount);
        if (okStart && okEnd && okMin) {
          if (coupon.type === "flat") discount_amount = Number(coupon.value);
          else
            discount_amount = Math.min(
              (base_amount + addons_amount) * (Number(coupon.value) / 100),
              coupon.max_discount ? Number(coupon.max_discount) : Infinity,
            );
          couponId = coupon.id;
        }
      }
    }

    const total_amount = Math.max(0, base_amount + addons_amount - discount_amount);

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        customer_id: userId,
        trail_id: trail.id,
        vendor_id: trail.vendor_id,
        booking_date: data.booking_date,
        start_time: data.start_time ?? null,
        guests: data.guests,
        is_private: data.is_private,
        base_amount,
        addons_amount,
        discount_amount,
        total_amount,
        currency: trail.currency,
        coupon_code: data.coupon_code?.toUpperCase() ?? null,
        customer_notes: data.customer_notes ?? null,
        status: "pending",
      })
      .select()
      .single();

    if (error || !booking) throw new Error(error?.message || "Booking failed");

    // Addons
    if (data.addons.length > 0) {
      await supabase.from("booking_addons").insert(
        data.addons.map((a) => ({
          booking_id: booking.id,
          name: a.name,
          quantity: a.quantity,
          unit_price: a.unit_price,
          total_price: a.unit_price * a.quantity,
        })),
      );
    }

    // Coupon redemption record
    if (couponId) {
      await supabase.from("coupon_redemptions").insert({
        coupon_id: couponId,
        booking_id: booking.id,
        customer_id: userId,
        discount_amount,
      });
    }

    // Booking event
    await supabase.from("booking_events").insert({
      booking_id: booking.id,
      event_type: "created",
      actor_id: userId,
      message: `Booking created for ${trail.name}`,
    });

    return { booking_id: booking.id, booking_number: booking.booking_number };
  });

export const cancelBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        booking_id: z.string().uuid(),
        reason: z.string().max(500).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
        cancellation_reason: data.reason ?? null,
      })
      .eq("id", data.booking_id)
      .eq("customer_id", userId);
    if (error) throw new Error(error.message);
    await supabase.from("booking_events").insert({
      booking_id: data.booking_id,
      event_type: "cancelled",
      actor_id: userId,
      message: data.reason ?? "Cancelled by customer",
    });
    return { ok: true };
  });

export const listMyBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("bookings")
      .select(
        "id, booking_number, booking_date, start_time, guests, status, total_amount, currency, trail_id, trails(name, images, location, slug)",
      )
      .eq("customer_id", context.userId)
      .order("booking_date", { ascending: false })
      .limit(100);
    return data ?? [];
  });
