import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Route as RouteIcon, Users, Shield, Heart, Share2, ChevronLeft, ChevronRight, Check, X as XIcon, Info } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { TrailCard } from "@/components/site/TrailCard";
import { trails, type Trail } from "@/lib/data";

export const Route = createFileRoute("/trails/$id")({
  loader: ({ params }) => {
    const trail = trails.find((t) => t.slug === params.id);
    if (!trail) throw notFound();
    return { trail };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.trail.name} — Horse Trails` },
          { name: "description", content: loaderData.trail.short },
          { property: "og:title", content: loaderData.trail.name },
          { property: "og:description", content: loaderData.trail.short },
          { property: "og:image", content: loaderData.trail.image },
        ]
      : [{ title: "Trail — Horse Trails" }, { name: "robots", content: "noindex" }],
  }),
  component: TrailDetail,
  notFoundComponent: () => (
    <SiteLayout><div className="container-wide py-24 text-center"><h1 className="font-display text-3xl">Trail not found</h1></div></SiteLayout>
  ),
});

function TrailDetail() {
  const { trail } = Route.useLoaderData() as { trail: Trail };
  const [active, setActive] = useState(0);

  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [priv, setPriv] = useState(trail.private);
  const [equip, setEquip] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [ins, setIns] = useState(true);

  const base = trail.price * (Number(adults) + Number(children) * 0.6);
  const addons = (priv ? 80 : 0) + (equip ? 25 : 0) + (photo ? 60 : 0) + (ins ? 15 : 0);
  const subtotal = base + addons;
  const tax = subtotal * 0.09;
  const total = subtotal + tax;

  const related = trails.filter((t) => t.id !== trail.id).slice(0, 3);

  return (
    <SiteLayout>
      <section className="container-wide">
        {/* breadcrumb */}
        <div className="mb-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-forest">Home</Link> · <Link to="/trails" className="hover:text-forest">Trails</Link> · <span className="text-forest">{trail.name}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              {trail.tags.map((t) => <Badge key={t} className="bg-gold text-gold-foreground">{t}</Badge>)}
              <Badge variant="outline">{trail.difficulty}</Badge>
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold text-forest md:text-5xl">{trail.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" /><b className="text-foreground">{trail.rating}</b> ({trail.reviews} reviews)</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{trail.location}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{trail.duration}</span>
              <span className="inline-flex items-center gap-1"><RouteIcon className="h-4 w-4" />{trail.distanceKm} km</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <motion.div layout className="relative overflow-hidden rounded-3xl shadow-elegant md:col-span-3">
            <motion.img key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={trail.gallery[active]} alt={trail.name} className="h-[380px] w-full object-cover md:h-[520px]" />
            <button onClick={() => setActive((i) => (i - 1 + trail.gallery.length) % trail.gallery.length)} className="glass absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full">
              <ChevronLeft className="h-4 w-4 text-forest" />
            </button>
            <button onClick={() => setActive((i) => (i + 1) % trail.gallery.length)} className="glass absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full">
              <ChevronRight className="h-4 w-4 text-forest" />
            </button>
          </motion.div>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-1">
            {trail.gallery.slice(0, 4).map((img, i) => (
              <button key={i} onClick={() => setActive(i)} className={`overflow-hidden rounded-2xl border-2 transition-all ${active === i ? "border-gold shadow-glow" : "border-transparent"}`}>
                <img src={img} alt="" loading="lazy" className="h-24 w-full object-cover md:h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* Left content */}
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-forest">Overview</h2>
              <p className="mt-3 leading-relaxed text-foreground/80">{trail.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard label="Meeting Point" value={trail.meetingPoint} />
              <InfoCard label="Horse Breed" value={`${trail.breed} · Calm temperament`} />
              <InfoCard label="Group Size" value={`Up to ${trail.slots} riders`} />
              <InfoCard label="Cancellation" value={trail.cancellation} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-forest">Included</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {trail.included.map((x) => <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-forest" />{x}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-forest">Not included</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {trail.notIncluded.map((x) => <li key={x} className="flex items-start gap-2"><XIcon className="mt-0.5 h-4 w-4 text-destructive" />{x}</li>)}
                </ul>
              </div>
            </div>

            <Tabs defaultValue="safety">
              <TabsList className="glass rounded-full p-1">
                <TabsTrigger value="safety" className="rounded-full">Safety</TabsTrigger>
                <TabsTrigger value="bring" className="rounded-full">What to Bring</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-full">Reviews</TabsTrigger>
                <TabsTrigger value="map" className="rounded-full">Route Map</TabsTrigger>
              </TabsList>
              <TabsContent value="safety" className="mt-6 space-y-3 text-sm text-foreground/80">
                <p className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-forest" />All riders complete a 15-minute safety briefing before mounting.</p>
                <p className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-forest" />Certified helmets and safety vests provided at no extra cost.</p>
                <p className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-forest" />Two guides accompany every group; both are wilderness first-aid certified.</p>
              </TabsContent>
              <TabsContent value="bring" className="mt-6">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {trail.bring.map((b) => <li key={b} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-forest" />{b}</li>)}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6 space-y-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/80?img=${20 + i}`} alt="" className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-forest">Rider {i + 1}</div>
                        <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3 w-3 fill-gold text-gold" />)}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">2 weeks ago</div>
                    </div>
                    <p className="mt-3 text-sm text-foreground/80">Absolutely magical. The horses were beautifully matched to our ability, and the light on the ridge at sunrise was cinema.</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="map" className="mt-6">
                <div className="grid h-72 place-items-center rounded-3xl border border-border/60 bg-cream text-muted-foreground">
                  <div className="text-center"><MapPin className="mx-auto h-8 w-8 text-forest" /><div className="mt-2 text-sm">Interactive route map</div></div>
                </div>
              </TabsContent>
            </Tabs>

            <div>
              <h3 className="font-display text-xl font-bold text-forest">Frequently asked</h3>
              <div className="mt-4"><FAQAccordion items={[
                { q: "Is this trail suitable for beginners?", a: `This trail is graded ${trail.difficulty}. ${trail.difficulty === "Easy" ? "Complete beginners are welcome — no experience required." : "Some prior riding experience is recommended for comfort and safety."}` },
                { q: "What is the minimum age?", a: "Riders must be at least 8 years old for this trail. Kids Rides accept riders from age 5." },
                { q: "Can I reschedule?", a: "Yes — free rescheduling up to 48 hours before your booking." },
              ]} /></div>
            </div>
          </div>

          {/* Sticky booking card */}
          <aside>
            <div className="glass sticky top-28 rounded-3xl p-6 shadow-elegant">
              <div className="flex items-baseline gap-2">
                <div className="font-display text-3xl font-bold text-forest">${trail.price}</div>
                {trail.originalPrice && <div className="text-sm text-muted-foreground line-through">${trail.originalPrice}</div>}
                <div className="ml-auto text-xs uppercase tracking-wider text-muted-foreground">per rider</div>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <Label className="text-xs">Date</Label>
                  <Input type="date" className="mt-1 bg-card" />
                </div>
                <div>
                  <Label className="text-xs">Time slot</Label>
                  <Select defaultValue="06:00">
                    <SelectTrigger className="mt-1 bg-card"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["06:00", "08:30", "11:00", "14:00", "16:30", "18:00"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Adults</Label>
                    <Select value={adults} onValueChange={setAdults}>
                      <SelectTrigger className="mt-1 bg-card"><SelectValue /></SelectTrigger>
                      <SelectContent>{[1,2,3,4,5,6].map(n=><SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Children</Label>
                    <Select value={children} onValueChange={setChildren}>
                      <SelectTrigger className="mt-1 bg-card"><SelectValue /></SelectTrigger>
                      <SelectContent>{[0,1,2,3,4].map(n=><SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/60 p-3 text-sm">
                  <label className="flex items-center gap-2"><Checkbox checked={priv} onCheckedChange={(v) => setPriv(!!v)} />Private ride (+$80)</label>
                  <label className="mt-2 flex items-center gap-2"><Checkbox checked={equip} onCheckedChange={(v) => setEquip(!!v)} />Equipment rental (+$25)</label>
                  <label className="mt-2 flex items-center gap-2"><Checkbox checked={photo} onCheckedChange={(v) => setPhoto(!!v)} />Photographer (+$60)</label>
                  <label className="mt-2 flex items-center gap-2"><Checkbox checked={ins} onCheckedChange={(v) => setIns(!!v)} />Trip insurance (+$15)</label>
                </div>

                <div>
                  <Label className="text-xs">Coupon code</Label>
                  <div className="mt-1 flex gap-2">
                    <Input placeholder="RIDE10" className="bg-card" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <div className="space-y-1 rounded-2xl bg-cream/60 p-4 text-sm">
                  <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                  <Row label="Taxes & fees" value={`$${tax.toFixed(2)}`} />
                  <Row label="Booking amount (30%)" value={`$${(total * 0.3).toFixed(2)}`} />
                  <Row label="Remaining at ranch" value={`$${(total * 0.7).toFixed(2)}`} muted />
                  <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 font-display text-lg font-bold text-forest">
                    <span>Grand total</span><span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full bg-forest text-forest-foreground shadow-glow hover:bg-forest/90">
                  <Link to="/checkout">Proceed to checkout</Link>
                </Button>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Info className="h-3 w-3" /> Free cancellation up to 48 hours prior.</div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related trails */}
        <div className="mt-24">
          <h2 className="mb-6 font-display text-2xl font-bold text-forest">You may also love</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((t, i) => <TrailCard key={t.id} trail={t} index={i} />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium text-forest">{value}</div>
    </div>
  );
}
function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${muted ? "text-muted-foreground" : "text-foreground"}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
