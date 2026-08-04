import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CalendarCheck,
  CheckCircle2,
  DollarSign,
  Eye,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import { SiteLayout } from "@/components/site/Layout";
import { Badge } from "@/components/ui/badge";

import {
  Booking,
  getBookings,
  getProducts,
  Product,
} from "@/lib/dashboard-store";

export const Route = createFileRoute(
  "/performance",
)({
  head: () => ({
    meta: [
      {
        title: "Performance — Horse Trails",
      },
      {
        name: "description",
        content:
          "Track booking and trail performance.",
      },
    ],
  }),
  component: Performance,
});

function Performance() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [productFilter, setProductFilter] =
    useState("All");

  useEffect(() => {
    const loadData = () => {
      setBookings(getBookings());
      setProducts(getProducts());
    };

    loadData();

    window.addEventListener(
      "horse-trails-data-updated",
      loadData,
    );

    return () => {
      window.removeEventListener(
        "horse-trails-data-updated",
        loadData,
      );
    };
  }, []);

  const filteredBookings = useMemo(() => {
    if (productFilter === "All") {
      return bookings;
    }

    return bookings.filter(
      (booking) =>
        booking.productId ===
        Number(productFilter),
    );
  }, [bookings, productFilter]);

  const totalRevenue = filteredBookings
    .filter(
      (booking) =>
        booking.status !== "Cancelled",
    )
    .reduce(
      (sum, booking) =>
        sum + booking.amount,
      0,
    );

  const totalRiders = filteredBookings
    .filter(
      (booking) =>
        booking.status !== "Cancelled",
    )
    .reduce(
      (sum, booking) =>
        sum + booking.riders,
      0,
    );

  const confirmedBookings =
    filteredBookings.filter(
      (booking) =>
        booking.status === "Confirmed",
    ).length;

  const completedBookings =
    filteredBookings.filter(
      (booking) =>
        booking.status === "Completed",
    ).length;

  const cancelledBookings =
    filteredBookings.filter(
      (booking) =>
        booking.status === "Cancelled",
    ).length;

  const conversionRate =
    filteredBookings.length > 0
      ? Math.round(
          ((confirmedBookings +
            completedBookings) /
            filteredBookings.length) *
            100,
        )
      : 0;

  const productPerformance = products.map(
    (product) => {
      const productBookings = bookings.filter(
        (booking) =>
          booking.productId === product.id,
      );

      const revenue = productBookings
        .filter(
          (booking) =>
            booking.status !== "Cancelled",
        )
        .reduce(
          (sum, booking) =>
            sum + booking.amount,
          0,
        );

      const riders = productBookings
        .filter(
          (booking) =>
            booking.status !== "Cancelled",
        )
        .reduce(
          (sum, booking) =>
            sum + booking.riders,
          0,
        );

      return {
        ...product,
        bookings: productBookings.length,
        revenue,
        riders,
      };
    },
  );

  const maxBookings = Math.max(
    1,
    ...productPerformance.map(
      (product) => product.bookings,
    ),
  );

  const stats = [
    {
      title: "Total Bookings",
      value: String(filteredBookings.length),
      icon: CalendarCheck,
    },
    {
      title: "Confirmed",
      value: String(confirmedBookings),
      icon: CheckCircle2,
    },
    {
      title: "Cancelled",
      value: String(cancelledBookings),
      icon: XCircle,
    },
    {
      title: "Total Riders",
      value: String(totalRiders),
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <SiteLayout>
      <section className="container-wide py-10 sm:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge className="bg-gold text-gold-foreground">
              Live Analytics
            </Badge>

            <h1 className="mt-3 font-display text-3xl font-bold text-forest sm:text-4xl">
              Performance
            </h1>

            <p className="mt-2 text-muted-foreground">
              Live statistics calculated from products
              and bookings.
            </p>
          </div>

          <select
            value={productFilter}
            onChange={(event) =>
              setProductFilter(
                event.target.value,
              )
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="All">
              All Products
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-3xl border border-border/60 bg-card p-6 shadow-elegant transition-transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cream text-forest">
                    <Icon className="h-5 w-5" />
                  </div>

                  <TrendingUp className="h-5 w-5 text-green-700" />
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <p className="mt-1 font-display text-3xl font-bold text-forest">
                  {stat.value}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1.5fr]">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-elegant">
            <h2 className="font-display text-xl font-semibold text-forest">
              Booking Overview
            </h2>

            <div className="mt-6 grid gap-5">
              {[
                {
                  label: "Confirmed",
                  value: confirmedBookings,
                },
                {
                  label: "Completed",
                  value: completedBookings,
                },
                {
                  label: "Cancelled",
                  value: cancelledBookings,
                },
              ].map((item) => {
                const percentage =
                  filteredBookings.length > 0
                    ? (item.value /
                        filteredBookings.length) *
                      100
                    : 0;

                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span>
                        {item.value}
                      </span>
                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-forest transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-elegant">
            <h2 className="font-display text-xl font-semibold text-forest">
              Product Booking Comparison
            </h2>

            <div className="mt-6 grid gap-5">
              {productPerformance.map(
                (product) => {
                  const width =
                    (product.bookings /
                      maxBookings) *
                    100;

                  return (
                    <div key={product.id}>
                      <div className="flex justify-between gap-4 text-sm">
                        <span className="font-medium text-forest">
                          {product.name}
                        </span>

                        <span>
                          {product.bookings} bookings
                        </span>
                      </div>

                      <div className="mt-2 h-4 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gold transition-all"
                          style={{
                            width: `${width}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-border/60 bg-card p-5 shadow-elegant sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-forest">
            Product Performance
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-border text-sm text-muted-foreground">
                  <th className="px-4 py-3">
                    Product
                  </th>

                  <th className="px-4 py-3">
                    Bookings
                  </th>

                  <th className="px-4 py-3">
                    Riders
                  </th>

                  <th className="px-4 py-3">
                    Views
                  </th>

                  <th className="px-4 py-3">
                    Revenue
                  </th>

                  <th className="px-4 py-3">
                    Rating
                  </th>
                </tr>
              </thead>

              <tbody>
                {productPerformance.map(
                  (product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="px-4 py-4 font-medium text-forest">
                        {product.name}
                      </td>

                      <td className="px-4 py-4">
                        {product.bookings}
                      </td>

                      <td className="px-4 py-4">
                        {product.riders}
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {product.views}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        $
                        {product.revenue.toLocaleString()}
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-4 w-4 fill-gold text-gold" />
                          {product.rating}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}