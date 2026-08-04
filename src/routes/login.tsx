// import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
// import { motion } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { images } from "@/lib/data";
// import { supabase } from "@/integrations/supabase/client";
// import { lovable } from "@/integrations/lovable";

// export const Route = createFileRoute("/login")({
//   head: () => ({
//     meta: [{ title: "Sign in — Horse Trails" }, { name: "description", content: "Sign in to your Horse Trails account." }],
//   }),
//   component: Login,
// });

// function Login() {
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [busy, setBusy] = useState(false);

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setBusy(true);
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//     setBusy(false);
//     if (error) {
//       toast.error(error.message);
//       return;
//     }
//     // Log login
//     if (data.user) {
//       await supabase.from("login_history").insert({
//         user_id: data.user.id,
//         user_agent: navigator.userAgent,
//         success: true,
//       });
//     }
//     toast.success("Welcome back");
//     navigate({ to: "/dashboard" });
//   }

//   async function onGoogle() {
//     const res = await lovable.auth.signInWithOAuth("google", {
//       redirect_uri: window.location.origin,
//     });
//     if (res.error) toast.error(res.error.message ?? "Google sign-in failed");
//     else if (!res.redirected) navigate({ to: "/dashboard" });
//   }

//   return (
//     <div className="grid min-h-screen lg:grid-cols-2">
//       <div className="relative hidden lg:block">
//         <img src={images.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-br from-forest/90 to-forest/40" />
//         <div className="relative flex h-full flex-col justify-between p-12 text-forest-foreground">
//           <Link to="/" className="inline-flex items-center gap-2">
//             <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-gold-foreground"><span className="font-display font-bold">H</span></div>
//             <span className="font-display text-lg font-bold">Horse Trails</span>
//           </Link>
//           <div>
//             <div className="font-display text-4xl font-bold">The world's finest saddles are one login away.</div>
//             <div className="mt-3 text-forest-foreground/70">Sign in to manage bookings, wishlists, and members-only pricing.</div>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-center p-6 md:p-12">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
//           <div className="lg:hidden mb-6">
//             <Link to="/" className="inline-flex items-center gap-2">
//               <div className="grid h-10 w-10 place-items-center rounded-xl gradient-forest text-forest-foreground"><span className="font-display font-bold">H</span></div>
//               <span className="font-display text-lg font-bold text-forest">Horse Trails</span>
//             </Link>
//           </div>
//           <h1 className="font-display text-3xl font-bold text-forest md:text-4xl">Welcome back</h1>
//           <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue.</p>

//           <form className="mt-8 space-y-4" onSubmit={onSubmit}>
//             <div>
//               <Label>Email</Label>
//               <div className="relative mt-1">
//                 <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="pl-9 bg-card" />
//               </div>
//             </div>
//             <div>
//               <Label>Password</Label>
//               <div className="relative mt-1">
//                 <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="px-9 bg-card" />
//                 <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
//                   {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </button>
//               </div>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Remember me</label>
//               <Link to="/login" className="text-forest hover:underline">Forgot password?</Link>
//             </div>
//             <Button size="lg" disabled={busy} className="w-full bg-forest text-forest-foreground shadow-glow hover:bg-forest/90">
//               {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
//             </Button>

//             <div className="relative my-6 text-center text-xs text-muted-foreground">
//               <span className="relative z-10 bg-background px-3">or continue with</span>
//               <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
//             </div>
//             <div className="grid gap-2 sm:grid-cols-2">
//               <Button type="button" variant="outline" onClick={onGoogle}>Google</Button>
//               <Button type="button" variant="outline" disabled title="Apple sign-in coming soon">Apple</Button>
//             </div>

//             <div className="pt-4 text-center text-sm text-muted-foreground">
//               Don't have an account? <Link to="/register" className="font-semibold text-forest hover:underline">Register</Link>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { toast } from "sonner";

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
} from "@/components/ui/dialog";

import { images } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      {
        title: "Sign in — Horse Trails",
      },
      {
        name: "description",
        content: "Sign in to your Horse Trails account.",
      },
    ],
  }),

  component: Login,
});

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [signInLoading, setSignInLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [forgotPasswordOpen, setForgotPasswordOpen] =
    useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    try {
      const rememberedEmail =
        window.localStorage.getItem(
          "horse-trails-remembered-email",
        );

      if (rememberedEmail) {
        setEmail(rememberedEmail);
        setRememberMe(true);
      }
    } catch {
      // Local storage may be unavailable.
    }
  }, []);

  async function onSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanedEmail = email.trim();

    if (!cleanedEmail) {
      toast.error("Please enter your email.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setSignInLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanedEmail,
          password,
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (rememberMe) {
        try {
          window.localStorage.setItem(
            "horse-trails-remembered-email",
            cleanedEmail,
          );
        } catch {
          // Ignore storage errors.
        }
      } else {
        try {
          window.localStorage.removeItem(
            "horse-trails-remembered-email",
          );
        } catch {
          // Ignore storage errors.
        }
      }

      if (data.user) {
        const { error: historyError } = await supabase
          .from("login_history")
          .insert({
            user_id: data.user.id,
            user_agent: navigator.userAgent,
            success: true,
          });

        if (historyError) {
          console.warn(
            "Login history was not saved:",
            historyError.message,
          );
        }
      }

      toast.success("Welcome back");

      await navigate({
        to: "/dashboard",
      });
    } catch (error) {
      console.error("Sign-in error:", error);

      toast.error(
        "Unable to sign in. Please try again.",
      );
    } finally {
      setSignInLoading(false);
    }
  }

  async function onGoogle() {
    setGoogleLoading(true);

    try {
      const redirectTo = `${window.location.origin}/dashboard`;

      const { error } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
          },
        });

      if (error) {
        toast.error(error.message);
        setGoogleLoading(false);
      }

      /*
       * Successful OAuth automatically redirects to Google.
       * Isliye yahan navigate() nahi lagana.
       */
    } catch (error) {
      console.error("Google login error:", error);

      toast.error(
        "Google sign-in failed. Please try again.",
      );

      setGoogleLoading(false);
    }
  }

  function openForgotPassword() {
    setResetEmail(email.trim());
    setForgotPasswordOpen(true);
  }

  async function handleForgotPassword(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanedResetEmail = resetEmail.trim();

    if (!cleanedResetEmail) {
      toast.error("Please enter your email.");
      return;
    }

    setResetLoading(true);

    try {
      const redirectTo = `${window.location.origin}/reset-password`;

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          cleanedResetEmail,
          {
            redirectTo,
          },
        );

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(
        "Password reset link sent. Please check your email.",
      );

      setForgotPasswordOpen(false);
    } catch (error) {
      console.error("Password reset error:", error);

      toast.error(
        "Unable to send reset link. Please try again.",
      );
    } finally {
      setResetLoading(false);
    }
  }

  const anyLoading =
    signInLoading || googleLoading;

  return (
    <>
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left image area */}
        <div className="relative hidden lg:block">
          <img
            src={images.hero}
            alt="Horse rider on a scenic trail"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-forest/90 to-forest/40" />

          <div className="relative flex h-full flex-col justify-between p-12 text-forest-foreground">
            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-gold-foreground">
                <span className="font-display font-bold">
                  H
                </span>
              </div>

              <span className="font-display text-lg font-bold">
                Horse Trails
              </span>
            </Link>

            <div>
              <div className="font-display text-4xl font-bold">
                The world's finest saddles are one
                login away.
              </div>

              <div className="mt-3 text-forest-foreground/70">
                Sign in to manage bookings, wishlists,
                and members-only pricing.
              </div>
            </div>
          </div>
        </div>

        {/* Login form area */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="w-full max-w-md"
          >
            <div className="mb-6 lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2"
              >
                <div className="gradient-forest grid h-10 w-10 place-items-center rounded-xl text-forest-foreground">
                  <span className="font-display font-bold">
                    H
                  </span>
                </div>

                <span className="font-display text-lg font-bold text-forest">
                  Horse Trails
                </span>
              </Link>
            </div>

            <h1 className="font-display text-3xl font-bold text-forest md:text-4xl">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to continue.
            </p>

            <form
              className="mt-8 space-y-4"
              onSubmit={onSubmit}
            >
              {/* Email */}
              <div>
                <Label htmlFor="login-email">
                  Email
                </Label>

                <div className="relative mt-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@email.com"
                    className="bg-card pl-9"
                    disabled={anyLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="login-password">
                  Password
                </Label>

                <div className="relative mt-1">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="••••••••"
                    className="bg-card px-9"
                    disabled={anyLoading}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-forest"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember and forgot */}
              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(
                        event.target.checked,
                      )
                    }
                    className="rounded"
                  />

                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={openForgotPassword}
                  className="text-forest transition hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign in */}
              <Button
                type="submit"
                size="lg"
                disabled={anyLoading}
                className="w-full bg-forest text-forest-foreground shadow-glow hover:bg-forest/90"
              >
                {signInLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6 text-center text-xs text-muted-foreground">
                <span className="relative z-10 bg-background px-3">
                  or continue with
                </span>

                <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              </div>

              {/* Social login */}
              <div className="grid gap-2 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onGoogle}
                  disabled={anyLoading}
                >
                  {googleLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Google"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled
                  title="Apple sign-in coming soon"
                >
                  Apple
                </Button>
              </div>

              <div className="pt-4 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-forest hover:underline"
                >
                  Register
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Forgot-password popup */}
      <Dialog
        open={forgotPasswordOpen}
        onOpenChange={(open) => {
          if (!resetLoading) {
            setForgotPasswordOpen(open);
          }
        }}
      >
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-forest">
              Reset your password
            </DialogTitle>

            <DialogDescription>
              Enter your account email and we will
              send you a password reset link.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleForgotPassword}
            className="space-y-5 pt-2"
          >
            <div>
              <Label htmlFor="reset-email">
                Email address
              </Label>

              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={resetEmail}
                  onChange={(event) =>
                    setResetEmail(
                      event.target.value,
                    )
                  }
                  placeholder="you@email.com"
                  className="pl-9"
                  disabled={resetLoading}
                  autoFocus
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setForgotPasswordOpen(false)
                }
                disabled={resetLoading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={resetLoading}
                className="bg-forest text-forest-foreground hover:bg-forest/90"
              >
                {resetLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}