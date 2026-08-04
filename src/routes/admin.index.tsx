import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { DollarSign, CalendarCheck, Users, Compass, Store, AlertTriangle, TrendingUp, CircleDollarSign } from "lucide-react";
import { getAdminDashboardStats } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function StatCard({ icon: Icon, label, value, sub, tone = "forest" }: { icon: any; label: string; value: string; sub?: string; tone?: "forest" | "gold" | "destructive" }) {
  const toneCls = tone === "gold" ? "bg-gold/15 text-gold" : tone === "destructive" ? "bg-destructive/15 text-destructive" : "bg-forest/10 text-forest";
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-1 font-display text-2xl font-bold text-forest">{value}</div>
          {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${toneCls}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function AdminOverview() {
  const fn = useServerFn(getAdminDashboardStats);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => fn(),
  });

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading dashboard…</div>;
  if (error) return <div className="text-sm text-destructive">Failed to load: {(error as Error).message}</div>;
  if (!data) return null;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">Overview</h1>
        <p className="text-sm text-muted-foreground">Live revenue, bookings, and platform health.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Total revenue" value={fmt(data.revenue.total)} sub={`Avg ${fmt(data.avgBookingValue)} / booking`} />
        <StatCard icon={TrendingUp} label="This month" value={fmt(data.revenue.month)} tone="gold" />
        <StatCard icon={CalendarCheck} label="This week" value={fmt(data.revenue.week)} />
        <StatCard icon={CircleDollarSign} label="Today" value={fmt(data.revenue.today)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarCheck} label="Total bookings" value={String(data.counts.totalBookings)} sub={`${data.counts.completedBookings} completed`} />
        <StatCard icon={Users} label="Customers" value={String(data.counts.customers)} />
        <StatCard icon={Store} label="Vendors" value={String(data.counts.vendors)} sub={`${data.counts.horses} horses`} />
        <StatCard icon={Compass} label="Active trails" value={String(data.counts.activeTrails)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={AlertTriangle} label="Pending bookings" value={String(data.counts.pendingBookings)} tone="gold" />
        <StatCard icon={AlertTriangle} label="Pending refunds" value={String(data.counts.pendingRefunds)} tone="destructive" />
        <StatCard icon={AlertTriangle} label="Pending withdrawals" value={String(data.counts.pendingWithdrawals)} tone="destructive" />
      </div>

      <div className="glass rounded-3xl p-6">
        <div className="font-display text-xl font-semibold text-forest">Coming online</div>
        <p className="mt-1 text-sm text-muted-foreground">
          The database, RBAC, RLS, and dashboard APIs are now live. Next portals in the pipeline:
          Vendor CRM, Guide check-in app, Finance/Refund approvals, CMS editor, Coupon manager,
          and full reports export (CSV/PDF).
        </p>
      </div>
    </div>
  );
}
