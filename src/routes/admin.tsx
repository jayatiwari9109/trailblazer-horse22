import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Users, Store, Compass, CalendarCheck, Wallet, Ticket, FileText, Settings, LogOut, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Horse Trails" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/users", label: "Users & Roles", icon: Users },
  { to: "/admin/vendors", label: "Vendors", icon: Store },
  { to: "/admin/trails", label: "Trails", icon: Compass },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/finance", label: "Finance", icon: Wallet },
  { to: "/admin/coupons", label: "Coupons", icon: Ticket },
  { to: "/admin/cms", label: "CMS & Blog", icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate({ to: "/login" });
  }, [loading, user, isAdmin, navigate]);

  if (loading || !user || !isAdmin) {
    return (
      <SiteLayout>
        <div className="container-wide py-24 text-center text-muted-foreground">Checking permissions…</div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="glass sticky top-28 h-fit rounded-3xl p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-cream/70 p-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-forest text-forest-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-forest">Admin Console</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </div>
            <nav className="mt-3 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to as never}
                  activeOptions={{ exact: !!l.exact }}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-cream data-[status=active]:bg-forest data-[status=active]:text-forest-foreground"
                >
                  <l.icon className="h-4 w-4" /> {l.label}
                </Link>
              ))}
              <button onClick={() => { void signOut(); navigate({ to: "/" }); }} className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </nav>
          </aside>
          <div><Outlet /></div>
        </div>
      </section>
    </SiteLayout>
  );
}
