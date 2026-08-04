import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export type AppRole =
  | "super_admin"
  | "admin"
  | "vendor"
  | "stable_owner"
  | "guide"
  | "accountant"
  | "booking_manager"
  | "customer";

export type AuthState = {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  loading: boolean;
  isAdmin: boolean;
  isVendor: boolean;
  isGuide: boolean;
  isCustomer: boolean;
};

export function useAuth(): AuthState & {
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
} {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoles = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    setRoles((data ?? []).map((r) => r.role as AppRole));
  }, []);

  useEffect(() => {
    // Register listener first (identity transitions only)
    const { data: sub } = supabase.auth.onAuthStateChange((event, sess) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        // Defer to avoid deadlock inside the listener
        setTimeout(() => void loadRoles(sess.user.id), 0);
      } else {
        setRoles([]);
      }
    });

    // Bootstrap current session
    void supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) await loadRoles(data.session.user.id);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, [loadRoles]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setRoles([]);
  }, []);

  const refreshRoles = useCallback(async () => {
    if (user) await loadRoles(user.id);
  }, [user, loadRoles]);

  return {
    user,
    session,
    roles,
    loading,
    isAdmin: roles.includes("super_admin") || roles.includes("admin"),
    isVendor: roles.includes("vendor") || roles.includes("stable_owner"),
    isGuide: roles.includes("guide"),
    isCustomer: roles.includes("customer"),
    signOut,
    refreshRoles,
  };
}
