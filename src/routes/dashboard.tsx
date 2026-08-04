import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { CalendarCheck, Heart, Star, Wallet, FileText, Bell, LifeBuoy, User, Settings, LogOut, LayoutDashboard, Download } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Horse Trails" }, { name: "robots", content: "noindex" }] }),
  component: DashboardLayout,
});

type NavLink = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const links: NavLink[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/bookings", label: "My Bookings", icon: CalendarCheck },
  { to: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { to: "/dashboard/reviews", label: "Reviews", icon: Star },
  { to: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { to: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { to: "/dashboard/downloads", label: "Downloads", icon: Download },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { to: "/dashboard/support", label: "Support", icon: LifeBuoy },
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

function DashboardLayout() {
  return (
    <SiteLayout>
      <section className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="glass sticky top-28 h-fit rounded-3xl p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-cream/70 p-3">
              <img src="https://i.pravatar.cc/100?img=47" alt="" className="h-11 w-11 rounded-full" />
              <div>
                <div className="text-sm font-semibold text-forest">Sophia Reyes</div>
                <div className="text-xs text-muted-foreground">Gold Rider</div>
              </div>
            </div>
            <nav className="mt-3 space-y-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to as never} activeOptions={{ exact: !!l.exact }} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-cream data-[status=active]:bg-forest data-[status=active]:text-forest-foreground">
                  <l.icon className="h-4 w-4" /> {l.label}
                </Link>
              ))}
              <button className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </nav>
          </aside>
          <div>
            <Outlet />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
