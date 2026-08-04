import {
  createFileRoute,
  Navigate,
} from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/bookings",
)({
  head: () => ({
    meta: [
      {
        title:
          "Dashboard Bookings — Horse Trails",
      },
      {
        name: "description",
        content:
          "Manage Horse Trails bookings, tickets and booking status.",
      },
    ],
  }),

  component: DashboardBookings,
});

function DashboardBookings() {
  return (
    <Navigate
      to="/my-bookings"
      replace
    />
  );
}