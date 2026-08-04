import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Minus,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  getBookings,
  saveBookings,
  type Booking,
} from "@/lib/dashboard-store";

type BookingPopupProps = {
  trailName: string;
  price?: number | string;
  location?: string;
  productId?: number;
  buttonText?: string;
};

export function BookingPopup({
  trailName,
  price,
  location = "Horse Trails Location",
  productId = 0,
  buttonText = "Book Now",
}: BookingPopupProps) {
  const [open, setOpen] = useState(false);
  const [riders, setRiders] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const numericPrice = Number(price ?? 0);

  const increaseRiders = () => {
    setRiders((current) =>
      Math.min(current + 1, 10),
    );
  };

  const decreaseRiders = () => {
    setRiders((current) =>
      Math.max(current - 1, 1),
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const customer = String(
      formData.get("name") ?? "",
    ).trim();

    const phone = String(
      formData.get("phone") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    ).trim();

    const selectedDate = String(
      formData.get("date") ?? "",
    );

    if (
      !customer ||
      !phone ||
      !email ||
      !selectedDate
    ) {
      window.alert(
        "Please complete all required booking details.",
      );

      setIsSubmitting(false);
      return;
    }

    const generatedId = `HT-${Date.now()
      .toString()
      .slice(-7)}`;

    const dateObject = new Date(
      `${selectedDate}T00:00:00`,
    );

    const formattedDate =
      dateObject.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

    const newBooking: Booking = {
      id: generatedId,
      customer,
      email,
      phone,
      trail: trailName,
      location,
      date: formattedDate,
      time: "To be confirmed",
      riders,
      amount: numericPrice * riders,
      status: "Pending",
      productId,
    };

    const currentBookings = getBookings();

    saveBookings([
      newBooking,
      ...currentBookings,
    ]);

    setBookingId(generatedId);
    setSubmitted(true);
    setIsSubmitting(false);

    form.reset();
  };

  const handleOpenChange = (
    value: boolean,
  ) => {
    setOpen(value);

    if (!value) {
      window.setTimeout(() => {
        setSubmitted(false);
        setRiders(1);
        setBookingId("");
        setIsSubmitting(false);
      }, 200);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          className="rounded-full bg-[#0d462d] px-6 text-white shadow-md hover:bg-[#083821]"
        >
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border border-emerald-950/10 bg-[#fffdf8] p-0 sm:max-w-[560px]">
        {!submitted ? (
          <>
            <div className="rounded-t-3xl bg-gradient-to-br from-[#0d462d] to-[#17633f] px-6 py-7 text-white">
              <DialogHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <CalendarDays className="h-6 w-6" />
                </div>

                <DialogTitle className="text-2xl font-bold text-white">
                  Book your ride
                </DialogTitle>

                <DialogDescription className="text-sm text-white/80">
                  Complete the form below to reserve
                  your horse riding adventure.
                </DialogDescription>
              </DialogHeader>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 px-6 py-6"
            >
              <div className="rounded-2xl border border-emerald-950/10 bg-[#f5f1e7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a56a20]">
                  Selected ride
                </p>

                <div className="mt-1 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-[#123f2a]">
                      {trailName}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {location}
                    </p>
                  </div>

                  {price !== undefined && (
                    <p className="whitespace-nowrap text-lg font-bold text-[#123f2a]">
                      ${numericPrice}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor={`name-${productId}`}
                  >
                    Full name
                  </Label>

                  <Input
                    id={`name-${productId}`}
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="h-11 rounded-xl bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`phone-${productId}`}
                  >
                    Phone number
                  </Label>

                  <Input
                    id={`phone-${productId}`}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="+1 234 567 890"
                    required
                    className="h-11 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`email-${productId}`}
                >
                  Email address
                </Label>

                <Input
                  id={`email-${productId}`}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-11 rounded-xl bg-white"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor={`date-${productId}`}
                  >
                    Booking date
                  </Label>

                  <Input
                    id={`date-${productId}`}
                    name="date"
                    type="date"
                    required
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    className="h-11 rounded-xl bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Number of riders
                  </Label>

                  <div className="flex h-11 items-center justify-between rounded-xl border bg-white px-2">
                    <button
                      type="button"
                      onClick={decreaseRiders}
                      disabled={riders === 1}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f1e7] text-[#123f2a] transition hover:bg-[#ebe3d2] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="font-bold text-[#123f2a]">
                      {riders}
                    </span>

                    <button
                      type="button"
                      onClick={increaseRiders}
                      disabled={riders === 10}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f1e7] text-[#123f2a] transition hover:bg-[#ebe3d2] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <input
                    type="hidden"
                    name="riders"
                    value={riders}
                  />
                </div>
              </div>

              {numericPrice > 0 && (
                <div className="flex items-center justify-between rounded-2xl border border-emerald-950/10 bg-white p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total amount
                    </p>

                    <p className="text-xs text-muted-foreground">
                      ${numericPrice} × {riders}{" "}
                      {riders === 1
                        ? "rider"
                        : "riders"}
                    </p>
                  </div>

                  <p className="text-xl font-bold text-[#123f2a]">
                    $
                    {(
                      numericPrice * riders
                    ).toFixed(2)}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor={`message-${productId}`}
                >
                  Special request
                  <span className="ml-1 font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>

                <textarea
                  id={`message-${productId}`}
                  name="message"
                  rows={3}
                  placeholder="Share any special requirements..."
                  className="w-full resize-none rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#0d462d]/30"
                />
              </div>

              <DialogFooter className="gap-2 pt-2 sm:gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setOpen(false)
                  }
                  disabled={isSubmitting}
                  className="h-11 rounded-full px-6"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 rounded-full bg-[#0d462d] px-7 text-white hover:bg-[#083821]"
                >
                  {isSubmitting
                    ? "Booking..."
                    : "Confirm Booking"}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="flex min-h-[430px] flex-col items-center justify-center px-7 py-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-11 w-11 text-emerald-700" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#123f2a]">
              Booking request received!
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Your booking for{" "}
              <strong className="text-[#123f2a]">
                {trailName}
              </strong>{" "}
              has been saved successfully.
            </p>

            <div className="mt-5 rounded-2xl bg-[#f5f1e7] px-5 py-3">
              <p className="text-xs text-muted-foreground">
                Booking ID
              </p>

              <p className="mt-1 font-bold text-[#123f2a]">
                {bookingId}
              </p>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              You can view this booking in the My
              Bookings section.
            </p>

            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-7 rounded-full bg-[#0d462d] px-8 text-white hover:bg-[#083821]"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}