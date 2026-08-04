import { motion } from "framer-motion";
import {
  Check,
  Loader2,
  Mail,
} from "lucide-react";
import {
  useState,
  type FormEvent,
} from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] =
    useState(false);
  const [subscribed, setSubscribed] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const cleanedEmail =
      email.trim().toLowerCase();

    if (!cleanedEmail) {
      toast.error(
        "Please enter your email address.",
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanedEmail)) {
      toast.error(
        "Please enter a valid email address.",
      );
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) =>
        window.setTimeout(resolve, 700),
      );

      setSubscribed(true);
      setEmail("");

      toast.success(
        "You are subscribed to the Horse Trails newsletter!",
      );

      window.setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    } catch (error) {
      console.error(
        "Newsletter subscription error:",
        error,
      );

      toast.error(
        "Subscription failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="gradient-forest relative overflow-hidden rounded-[2rem] p-8 shadow-elegant md:p-14"
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />

      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-saddle/30 blur-3xl" />

      <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
            <Mail className="h-3 w-3" />
            Newsletter
          </div>

          <h3 className="mt-4 font-display text-3xl font-bold text-forest-foreground md:text-4xl">
            Trail drops, delivered{" "}
            <span className="text-gradient-gold">
              monthly.
            </span>
          </h3>

          <p className="mt-3 max-w-md text-sm text-forest-foreground/70">
            Be first to the season&apos;s new rides, private ranches, and
            members-only pricing.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-dark flex flex-col gap-2 rounded-2xl p-2 sm:flex-row"
        >
          <Input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(
                event.target.value,
              );
              setSubscribed(false);
            }}
            placeholder="Your best email"
            autoComplete="email"
            required
            disabled={loading}
            className="border-0 bg-transparent text-forest-foreground placeholder:text-forest-foreground/50 focus-visible:ring-0"
          />

          <Button
            type="submit"
            disabled={
              loading || subscribed
            }
            className="min-w-[130px] gap-2 bg-gold text-gold-foreground shadow-glow hover:bg-gold/90"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : subscribed ? (
              <>
                <Check className="h-4 w-4" />
                Subscribed
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}