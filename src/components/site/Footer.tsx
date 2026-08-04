import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Check,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleNewsletterSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const cleanedEmail = newsletterEmail.trim().toLowerCase();

    if (!cleanedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setJoining(true);

    try {
      // Temporary frontend submission.
      // Later Supabase/backend integration can be added here.
      await new Promise((resolve) =>
        window.setTimeout(resolve, 700),
      );

      setJoined(true);
      setNewsletterEmail("");

      toast.success(
        "You have successfully joined the Horse Trails newsletter!",
      );

      window.setTimeout(() => {
        setJoined(false);
      }, 3000);
    } catch (error) {
      console.error("Newsletter error:", error);

      toast.error(
        "Unable to join the newsletter. Please try again.",
      );
    } finally {
      setJoining(false);
    }
  };

  return (
    <footer className="mt-24 border-t border-border/60 bg-gradient-to-b from-transparent to-cream">
      <div className="container-wide py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="gradient-forest grid h-10 w-10 place-items-center rounded-xl text-forest-foreground">
                <span className="font-display text-lg font-bold">
                  h
                </span>
              </div>

              <div>
                <div className="font-display text-lg font-bold text-forest">
                  Horse Trails
                </div>

                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Premium Equestrian
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              The world's most curated marketplace for horse riding
              experiences. Every ranch, guide, and horse personally vetted by
              our team of expert equestrians.
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <a
                href="https://www.google.com/maps/search/?api=1&query=42+Bridle+Lane+Aspen+CO+81611"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-forest"
              >
                <MapPin className="h-4 w-4 shrink-0 text-forest" />
                42 Bridle Lane, Aspen CO 81611
              </a>

              <a
                href="tel:+14155550140"
                className="flex items-center gap-2 transition-colors hover:text-forest"
              >
                <Phone className="h-4 w-4 shrink-0 text-forest" />
                +1 (415) 555-0140
              </a>

              <a
                href="mailto:hello@horsetrails.co"
                className="flex items-center gap-2 transition-colors hover:text-forest"
              >
                <Mail className="h-4 w-4 shrink-0 text-forest" />
                hello@horsetrails.co
              </a>
            </div>

            <div className="mt-6 flex gap-2">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/",
                },
                {
                  icon: Facebook,
                  label: "Facebook",
                  href: "https://www.facebook.com/",
                },
                {
                  icon: Twitter,
                  label: "Twitter",
                  href: "https://x.com/",
                },
                {
                  icon: Youtube,
                  label: "YouTube",
                  href: "https://www.youtube.com/",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:bg-forest hover:text-forest-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <FooterCol
            title="Explore"
            links={[
              ["/", "Home"],
              ["/trails", "All Trails"],
              ["/experiences", "Experiences"],
              ["/packages", "Packages"],
              ["/gallery", "Gallery"],
              ["/blog", "Blog"],
            ]}
          />

          {/* Company */}
          <FooterCol
            title="Company"
            links={[
              ["/about", "About Us"],
              ["/contact", "Contact"],
              ["/faq", "FAQ"],
              ["/dashboard", "My Account"],
            ]}
          />

          {/* Newsletter */}
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-wider text-forest">
              Newsletter
            </div>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Trail drops, seasonal offers, and quiet luxury inspiration — one
              email a month.
            </p>

            <form
              className="mt-4 space-y-2"
              onSubmit={handleNewsletterSubmit}
            >
              <Input
                type="email"
                value={newsletterEmail}
                onChange={(event) => {
                  setNewsletterEmail(event.target.value);
                  setJoined(false);
                }}
                placeholder="you@email.com"
                autoComplete="email"
                required
                disabled={joining}
                className="bg-card"
              />

              <Button
                type="submit"
                disabled={joining || joined}
                className="w-full gap-2 bg-forest text-forest-foreground hover:bg-forest/90"
              >
                {joining ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : joined ? (
                  <>
                    <Check className="h-4 w-4" />
                    Joined
                  </>
                ) : (
                  "Join Newsletter"
                )}
              </Button>
            </form>

            <p className="mt-2 text-xs text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} Horse Trails. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-forest"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-forest"
            >
              Terms
            </Link>

            <Link
              to="/refund-policy"
              className="transition-colors hover:text-forest"
            >
              Refund Policy
            </Link>

            <Link
              to="/cookies"
              className="transition-colors hover:text-forest"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <div className="font-display text-sm font-semibold uppercase tracking-wider text-forest">
        {title}
      </div>

      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([to, label]) => (
          <li key={to}>
            <Link
              to={to as any}
              className="text-muted-foreground transition-colors hover:text-forest"
              activeProps={{
                className: "text-forest font-medium",
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}