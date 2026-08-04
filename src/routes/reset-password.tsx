import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from "lucide-react";
import {
  useState,
  type FormEvent,
} from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route =
  createFileRoute("/reset-password")({
    head: () => ({
      meta: [
        {
          title: "Reset password — Horse Trails",
        },
      ],
    }),

    component: ResetPasswordPage,
  });

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error(
        "Password must contain at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(
        "Password updated successfully.",
      );

      await navigate({
        to: "/login",
      });
    } catch (error) {
      console.error(
        "Password update error:",
        error,
      );

      toast.error(
        "Unable to update password.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-elegant sm:p-9">
        <h1 className="font-display text-3xl font-bold text-forest">
          Create new password
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Enter and confirm your new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <Label htmlFor="new-password">
              New password
            </Label>

            <div className="relative mt-2">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="new-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                required
                minLength={8}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                className="px-9"
                placeholder="Minimum 8 characters"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirm-password">
              Confirm password
            </Label>

            <div className="relative mt-2">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="confirm-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                className="pl-9"
                placeholder="Enter password again"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-forest text-forest-foreground hover:bg-forest/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update password"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}