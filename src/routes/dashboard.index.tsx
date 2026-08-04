import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Clock,
  Download,
  Heart,
  MapPin,
  Star,
  Ticket,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Booking,
  getBookings,
  saveBookings,
} from "@/lib/dashboard-store";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      {
        title:
          "Dashboard Overview — Horse Trails",
      },
      {
        name: "description",
        content:
          "View upcoming bookings, saved trails, reviews and wallet information.",
      },
    ],
  }),

  component: Overview,
});

function Overview() {
  const navigate = useNavigate();

  const bookingsSectionRef =
    useRef<HTMLDivElement | null>(null);

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [rescheduleOpen, setRescheduleOpen] =
    useState(false);

  const [newDate, setNewDate] =
    useState("");

  const [newTime, setNewTime] =
    useState("");

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const upcomingBookings = useMemo(() => {
    return bookings
      .filter(
        (booking) =>
          booking.status === "Confirmed" ||
          booking.status === "Pending",
      )
      .slice(0, 2);
  }, [bookings]);

  const completedBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        booking.status === "Completed",
    );
  }, [bookings]);

  const totalWalletValue = useMemo(() => {
    return bookings
      .filter(
        (booking) =>
          booking.status === "Cancelled",
      )
      .reduce(
        (total, booking) =>
          total + booking.amount,
        0,
      );
  }, [bookings]);

  const openDetails = (
    booking: Booking,
  ) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  const openReschedule = (
    booking: Booking,
  ) => {
    setSelectedBooking(booking);
    setNewDate(booking.date);
    setNewTime(booking.time);
    setRescheduleOpen(true);
  };

  const handleReschedule = () => {
    if (
      !selectedBooking ||
      !newDate ||
      !newTime
    ) {
      window.alert(
        "Please select booking date and time.",
      );

      return;
    }

    const updatedBookings = bookings.map(
      (booking) =>
        booking.id === selectedBooking.id
          ? {
              ...booking,
              date: newDate,
              time: newTime,
            }
          : booking,
    );

    setBookings(updatedBookings);
    saveBookings(updatedBookings);

    setSelectedBooking((current) =>
      current
        ? {
            ...current,
            date: newDate,
            time: newTime,
          }
        : current,
    );

    setRescheduleOpen(false);

    window.alert(
      "Booking rescheduled successfully.",
    );
  };

  const scrollToBookings = () => {
    bookingsSectionRef.current?.scrollIntoView(
      {
        behavior: "smooth",
        block: "start",
      },
    );
  };

  const stats = [
    {
      icon: CalendarCheck,
      label: "Upcoming",
      value: String(
        upcomingBookings.length,
      ),
      action: scrollToBookings,
    },
    {
      icon: Star,
      label: "Reviews",
      value: String(
        completedBookings.length,
      ),
      action: () => {
        navigate({
          to: "/trails",
        });
      },
    },
    {
      icon: Heart,
      label: "Wishlist",
      value: "8",
      action: () => {
        navigate({
          to: "/dashboard/wishlist",
        });
      },
    },
    {
      icon: Wallet,
      label: "Wallet",
      value: `$${totalWalletValue}`,
      action: () => {
        navigate({
          to: "/dashboard/downloads",
        });
      },
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">
          Welcome back, Sophia 👋
        </h1>

        <p className="mt-1 text-muted-foreground">
          You have{" "}
          {upcomingBookings.length} upcoming
          rides and 8 saved trails.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.button
              key={stat.label}
              type="button"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              onClick={stat.action}
              className="glass rounded-2xl p-5 text-left transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-forest/30"
            >
              <div className="gradient-forest grid h-10 w-10 place-items-center rounded-xl text-forest-foreground shadow-glow">
                <Icon className="h-4 w-4" />
              </div>

              <div className="mt-3 font-display text-2xl font-bold text-forest">
                {stat.value}
              </div>

              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div
        ref={bookingsSectionRef}
        className="glass scroll-mt-28 rounded-3xl p-4 sm:p-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-forest">
              Upcoming bookings
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your upcoming Horse
              Trails experiences.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1 text-forest"
          >
            <Link to="/my-bookings">
              See all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-5 space-y-3">
          {upcomingBookings.map(
            (booking) => (
              <article
                key={booking.id}
                className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md lg:flex-row lg:items-center"
              >
                <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-xl bg-forest/10 text-forest lg:w-28">
                  <Ticket className="h-8 w-8" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-forest">
                      {booking.trail}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        booking.status ===
                        "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {booking.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {booking.date}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {booking.time}
                    </span>

                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {booking.riders} riders
                    </span>
                  </div>

                  <div className="mt-2">
                    <span className="rounded-full bg-cream px-2 py-1 text-xs">
                      Booking #{booking.id}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      openReschedule(
                        booking,
                      )
                    }
                  >
                    Reschedule
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    onClick={() =>
                      openDetails(booking)
                    }
                    className="bg-forest text-forest-foreground hover:bg-forest/90"
                  >
                    Details
                  </Button>
                </div>
              </article>
            ),
          )}

          {upcomingBookings.length ===
            0 && (
            <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
              <CalendarCheck className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-3 font-semibold text-forest">
                No upcoming bookings
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Explore available trails and
                book your next experience.
              </p>

              <Button
                asChild
                className="mt-4 bg-forest text-forest-foreground hover:bg-forest/90"
              >
                <Link to="/trails">
                  Explore Trails
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      >
        <DialogContent className="max-w-2xl">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-forest">
                  Booking Details
                </DialogTitle>
              </DialogHeader>

              <div className="rounded-2xl border border-border bg-[#faf8f1] p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-forest">
                      {
                        selectedBooking.trail
                      }
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Booking ID:{" "}
                      {selectedBooking.id}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {
                      selectedBooking.status
                    }
                  </span>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <DetailField
                    label="Customer"
                    value={
                      selectedBooking.customer
                    }
                  />

                  <DetailField
                    label="Location"
                    value={
                      selectedBooking.location
                    }
                  />

                  <DetailField
                    label="Date"
                    value={
                      selectedBooking.date
                    }
                  />

                  <DetailField
                    label="Time"
                    value={
                      selectedBooking.time
                    }
                  />

                  <DetailField
                    label="Travellers"
                    value={`${selectedBooking.riders}`}
                  />

                  <DetailField
                    label="Total amount"
                    value={`$${selectedBooking.amount}`}
                  />

                  <DetailField
                    label="Email"
                    value={
                      selectedBooking.email
                    }
                  />

                  <DetailField
                    label="Phone"
                    value={
                      selectedBooking.phone
                    }
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setDetailsOpen(false)
                  }
                >
                  <X className="mr-2 h-4 w-4" />
                  Close
                </Button>

                <Button
                  asChild
                  className="bg-forest text-forest-foreground hover:bg-forest/90"
                >
                  <Link to="/my-bookings">
                    <Download className="mr-2 h-4 w-4" />
                    Open Ticket
                  </Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={rescheduleOpen}
        onOpenChange={setRescheduleOpen}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-forest">
              Reschedule Booking
            </DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-5">
              <div className="rounded-xl border border-border bg-[#faf8f1] p-4">
                <p className="font-semibold text-forest">
                  {selectedBooking.trail}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Booking ID:{" "}
                  {selectedBooking.id}
                </p>
              </div>

              <div>
                <label
                  htmlFor="reschedule-date"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  New booking date
                </label>

                <input
                  id="reschedule-date"
                  type="date"
                  value={newDate}
                  onChange={(event) =>
                    setNewDate(
                      event.target.value,
                    )
                  }
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-forest/30"
                />
              </div>

              <div>
                <label
                  htmlFor="reschedule-time"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  New booking time
                </label>

                <input
                  id="reschedule-time"
                  type="time"
                  value={newTime}
                  onChange={(event) =>
                    setNewTime(
                      event.target.value,
                    )
                  }
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-forest/30"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setRescheduleOpen(false)
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={
                    handleReschedule
                  }
                  className="bg-forest text-forest-foreground hover:bg-forest/90"
                >
                  Confirm Reschedule
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 break-words font-semibold text-forest">
        {value}
      </p>
    </div>
  );
}