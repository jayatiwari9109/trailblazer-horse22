import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data } = await ctx.supabase.rpc("is_admin", { _user_id: ctx.userId });
  if (!data) throw new Error("Forbidden");
}

export const getAdminDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabase } = context;

    const [
      bookingsAll,
      bookingsCompleted,
      bookingsPending,
      bookingsCancelled,
      customers,
      vendors,
      horses,
      trails,
      pendingWithdrawals,
      pendingRefunds,
    ] = await Promise.all([
      supabase.from("bookings").select("total_amount, status, created_at", { count: "exact" }),
      supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "completed"),
      supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "cancelled"),
      supabase.from("user_roles").select("user_id", { count: "exact", head: true }).eq("role", "customer"),
      supabase.from("vendors").select("id", { count: "exact", head: true }).is("deleted_at", null),
      supabase.from("horses").select("id", { count: "exact", head: true }).is("deleted_at", null),
      supabase.from("trails").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("withdrawals").select("amount", { count: "exact" }).eq("status", "pending"),
      supabase.from("refunds").select("amount", { count: "exact" }).eq("status", "pending"),
    ]);

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getTime() - 7 * 86400_000).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const rows = (bookingsAll.data ?? []) as Array<{ total_amount: number; status: string; created_at: string }>;
    const paidRows = rows.filter((r) => r.status !== "cancelled" && r.status !== "refunded");
    const sum = (rs: typeof paidRows) => rs.reduce((s, r) => s + Number(r.total_amount || 0), 0);

    return {
      revenue: {
        total: sum(paidRows),
        today: sum(paidRows.filter((r) => r.created_at >= todayStart)),
        week: sum(paidRows.filter((r) => r.created_at >= weekStart)),
        month: sum(paidRows.filter((r) => r.created_at >= monthStart)),
      },
      counts: {
        totalBookings: bookingsAll.count ?? 0,
        completedBookings: bookingsCompleted.count ?? 0,
        pendingBookings: bookingsPending.count ?? 0,
        cancelledBookings: bookingsCancelled.count ?? 0,
        customers: customers.count ?? 0,
        vendors: vendors.count ?? 0,
        horses: horses.count ?? 0,
        activeTrails: trails.count ?? 0,
        pendingWithdrawals: pendingWithdrawals.count ?? 0,
        pendingRefunds: pendingRefunds.count ?? 0,
      },
      avgBookingValue: paidRows.length ? sum(paidRows) / paidRows.length : 0,
    };
  });

export const grantRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        user_id: z.string().uuid(),
        role: z.enum([
          "super_admin",
          "admin",
          "vendor",
          "stable_owner",
          "guide",
          "accountant",
          "booking_manager",
          "customer",
        ]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("user_roles")
      .insert({ user_id: data.user_id, role: data.role, granted_by: context.userId });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true };
  });

export const revokeRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        user_id: z.string().uuid(),
        role: z.string(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("user_roles")
      .delete()
      .eq("user_id", data.user_id)
      .eq("role", data.role as never);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
