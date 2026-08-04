import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { images } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — Horse Trails" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accepted) {
      toast.error("Please accept the terms");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: `${firstName} ${lastName}`.trim() },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created — welcome to Horse Trails");
    navigate({ to: "/dashboard" });
  }

  async function onGoogle() {
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (res.error) toast.error(res.error.message ?? "Google sign-in failed");
    else if (!res.redirected) navigate({ to: "/dashboard" });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="mb-6 inline-flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-forest text-forest-foreground"><span className="font-display font-bold">H</span></div>
            <span className="font-display text-lg font-bold text-forest">Horse Trails</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-forest md:text-4xl">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Book faster, save favourites, and earn rider rewards.</p>

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>First name</Label><Input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Elena" className="mt-1 bg-card" /></div>
              <div><Label>Last name</Label><Input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Marchetti" className="mt-1 bg-card" /></div>
            </div>
            <div><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="mt-1 bg-card" /></div>
            <div><Label>Password</Label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="mt-1 bg-card" /></div>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 rounded" />
              <span>I agree to the <a href="#" className="text-forest">Terms</a> and <a href="#" className="text-forest">Privacy Policy</a>.</span>
            </label>
            <Button size="lg" disabled={busy} className="w-full bg-forest text-forest-foreground shadow-glow hover:bg-forest/90">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
            </Button>

            <div className="relative my-4 text-center text-xs text-muted-foreground">
              <span className="relative z-10 bg-background px-3">or</span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={onGoogle}>Continue with Google</Button>

            <div className="pt-4 text-center text-sm text-muted-foreground">Already a rider? <Link to="/login" className="font-semibold text-forest hover:underline">Sign in</Link></div>
          </form>
        </motion.div>
      </div>
      <div className="relative hidden lg:block">
        <img src={images.t5} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tl from-forest/90 to-forest/30" />
        <div className="relative flex h-full items-end p-12 text-forest-foreground">
          <div>
            <div className="font-display text-4xl font-bold">Join 68,000 riders.</div>
            <div className="mt-3 text-forest-foreground/70">Members save on average $184 per booking with rider rewards.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
