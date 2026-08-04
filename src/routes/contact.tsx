import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Horse Trails" },
      { name: "description", content: "Get in touch with our concierge, ranch partnerships, or press team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <SiteLayout>
      <section className="container-wide">
        <SectionHeading eyebrow="Say hello" title="We'd love to hear from you" subtitle="Concierge, partnerships, press — we usually reply within 24 hours." />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: Phone, title: "Call us", value: "+1 (415) 555-0140" },
              { icon: Mail, title: "Email", value: "hello@horsetrails.co" },
              { icon: MessageCircle, title: "WhatsApp", value: "+1 (415) 555-0140" },
              { icon: MapPin, title: "Office", value: "42 Bridle Lane, Aspen CO 81611" },
              { icon: Clock, title: "Hours", value: "Mon–Sat, 08:00–20:00 MT" },
            ].map((c) => (
              <div key={c.title} className="glass flex items-center gap-4 rounded-2xl p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-forest text-forest-foreground shadow-glow"><c.icon className="h-5 w-5" /></div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.title}</div>
                  <div className="font-medium text-forest">{c.value}</div>
                </div>
              </div>
            ))}

            <div className="glass overflow-hidden rounded-3xl">
              <div className="grid h-52 place-items-center text-muted-foreground">
                <div className="text-center"><MapPin className="mx-auto h-8 w-8 text-forest" /><div className="mt-2 text-sm">Google Maps embed</div></div>
              </div>
            </div>
          </div>

          <form className="glass space-y-4 rounded-3xl p-6 md:p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>First name</Label><Input
                value={firstName}
                onChange={(e) =>
                  setFirstName(
                    e.target.value.replace(/[^A-Za-z\s]/g, "")
                  )
                }
                placeholder="Elena"
                className="mt-1 bg-card"
              /></div>
              <div><Label>Last name</Label><Input
                value={lastName}
                onChange={(e) =>
                  setLastName(
                    e.target.value.replace(/[^A-Za-z\s]/g, "")
                  )
                }
                placeholder="Marchetti"
                className="mt-1 bg-card"
              /></div>
              <div><Label>Email</Label><Input type="email" placeholder="you@email.com" className="mt-1 bg-card" /></div>
              <div><Label>Phone</Label><Input
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(
                    e.target.value.replace(/[^0-9]/g, "")
                  )
                }
                inputMode="numeric"
                placeholder="4155550140"
                className="mt-1 bg-card"
              /></div>
            </div>
            <div><Label>Subject</Label><Input placeholder="How can we help?" className="mt-1 bg-card" /></div>
            <div><Label>Message</Label><Textarea rows={5} placeholder="Tell us about your dream ride..." className="mt-1 bg-card" /></div>
            <Button size="lg" className="w-full gap-2 bg-forest text-forest-foreground shadow-glow hover:bg-forest/90">
              <Send className="h-4 w-4" /> Send message
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
