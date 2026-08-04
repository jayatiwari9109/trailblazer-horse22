// import { createFileRoute, Link } from "@tanstack/react-router";
// import { motion } from "framer-motion";
// import { ArrowRight, Award, Shield, Sparkles, Users } from "lucide-react";
// import { SiteLayout } from "@/components/site/Layout";
// import { SearchWidget } from "@/components/site/SearchWidget";
// import { CategoryGrid } from "@/components/site/CategoryGrid";
// import { TrailCard } from "@/components/site/TrailCard";
// import { SectionHeading } from "@/components/site/SectionHeading";
// import { Testimonials } from "@/components/site/Testimonials";
// import { InstagramGallery } from "@/components/site/InstagramGallery";
// import { FAQAccordion } from "@/components/site/FAQAccordion";
// import { Newsletter } from "@/components/site/Newsletter";
// import { Button } from "@/components/ui/button";
// import { images, trails } from "@/lib/data";

// export const Route = createFileRoute("/")({
//   component: Home,
// });

// function Home() {
//   const popular = trails.slice(0, 6);
//   const featured = trails.slice(2, 6);
//   const topRated = [...trails].sort((a, b) => b.rating - a.rating).slice(0, 4);

//   return (
//     <SiteLayout>
//       {/* HERO */}
//       <section className="container-wide relative">
//         <div className="relative overflow-hidden rounded-[2.5rem] shadow-elegant">
//           <img src={images.hero} alt="Horse riding at sunrise" width={1920} height={1200} className="h-[85vh] max-h-[820px] w-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/10 to-ivory/95" />
//           <div className="absolute inset-0 flex flex-col justify-center">
//             <div className="container-wide">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7 }}
//                 className="max-w-2xl"
//               >
//                 <div className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
//                   <Sparkles className="h-3.5 w-3.5" /> Premium Equestrian Marketplace
//                 </div>
//                 <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-white drop-shadow-lg md:text-7xl">
//                   Ride where the <span className="text-gradient-gold">wild ones</span> live.
//                 </h1>
//                 <p className="mt-5 max-w-xl text-lg text-white/90 drop-shadow">
//                   Curated horse riding experiences across six continents — sunrise ridges, private beaches, and safari plains, all in one place.
//                 </p>
//                 <div className="mt-8 flex flex-wrap gap-3">
//                   <Button asChild size="lg" className="bg-gold text-gold-foreground shadow-glow hover:bg-gold/90">
//                     <Link to="/trails">Explore Trails <ArrowRight className="ml-2 h-4 w-4" /></Link>
//                   </Button>
//                   <Button asChild size="lg" variant="outline" className="border-white/60 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white">
//                     <Link to="/about">Our Story</Link>
//                   </Button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>

//         {/* Search widget overlapping hero */}
//         <div className="relative z-10 -mt-16 md:-mt-20">
//           <SearchWidget />
//         </div>
//       </section>

//       {/* TRUST STRIP */}
//       <section className="container-wide mt-16">
//         <div className="glass grid gap-6 rounded-3xl p-6 sm:grid-cols-2 md:grid-cols-4 md:p-8">
//           {[
//             { icon: Award, label: "Vetted Ranches", value: "240+" },
//             { icon: Users, label: "Happy Riders", value: "68k" },
//             { icon: Shield, label: "Insured Rides", value: "100%" },
//             { icon: Sparkles, label: "Avg. Rating", value: "4.94" },
//           ].map((s, i) => (
//             <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4">
//               <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-gold text-gold-foreground shadow-glow">
//                 <s.icon className="h-5 w-5" />
//               </div>
//               <div>
//                 <div className="font-display text-2xl font-bold text-forest">{s.value}</div>
//                 <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CATEGORIES */}
//       <section className="container-wide mt-24">
//         <SectionHeading
//           eyebrow="Explore by style"
//           title="A trail for every rider"
//           subtitle="From gentle first canters to overnight camps, choose the pace and mood that fits your journey."
//         />
//         <CategoryGrid />
//       </section>

//       {/* POPULAR TRAILS */}
//       <section className="container-wide mt-24">
//         <div className="flex items-end justify-between gap-4">
//           <SectionHeading
//             align="left"
//             eyebrow="Most booked"
//             title="Popular horse trails"
//             subtitle="Rider favourites from around the world, refreshed every week."
//           />
//           <Button asChild variant="ghost" className="hidden gap-2 text-forest md:inline-flex">
//             <Link to="/trails">View all <ArrowRight className="h-4 w-4" /></Link>
//           </Button>
//         </div>
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {popular.map((t, i) => <TrailCard key={t.id} trail={t} index={i} />)}
//         </div>
//       </section>

//       {/* FEATURED EXPERIENCES — editorial split */}
//       <section className="container-wide mt-24">
//         <SectionHeading eyebrow="Editor's picks" title="Featured experiences" subtitle="Signature rides handpicked by our senior guides." />
//         <div className="grid gap-6 lg:grid-cols-2">
//           {featured.map((t, i) => (
//             <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
//               <Link to="/trails/$id" params={{ id: t.slug }} className="group relative flex overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant">
//                 <div className="relative aspect-[4/3] w-2/5 overflow-hidden">
//                   <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
//                 </div>
//                 <div className="flex flex-1 flex-col justify-between p-5">
//                   <div>
//                     <div className="text-xs uppercase tracking-wider text-saddle">{t.category}</div>
//                     <h3 className="mt-1 font-display text-xl font-semibold text-forest">{t.name}</h3>
//                     <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{t.short}</p>
//                   </div>
//                   <div className="mt-4 flex items-center justify-between">
//                     <div className="font-display text-xl font-bold text-forest">${t.price}<span className="text-xs font-normal text-muted-foreground">/rider</span></div>
//                     <div className="rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-forest-foreground">Book</div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* TOP RATED HORSES */}
//       <section className="container-wide mt-24">
//         <SectionHeading eyebrow="Top rated" title="Horses our riders adore" subtitle="Every horse on Horse Trails is individually reviewed after every ride." />
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {topRated.map((t, i) => <TrailCard key={t.id} trail={t} index={i} />)}
//         </div>
//       </section>

//       {/* ADVENTURE PACKAGES — luxe banner */}
//       <section className="container-wide mt-24">
//         <div className="relative overflow-hidden rounded-[2rem] shadow-elegant">
//           <img src={images.t7} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/40" />
//           <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-16">
//             <div>
//               <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
//                 Luxury Packages
//               </div>
//               <h3 className="mt-4 font-display text-4xl font-bold text-forest-foreground md:text-5xl">
//                 Overnight adventures, <span className="text-gradient-gold">stitched together.</span>
//               </h3>
//               <p className="mt-4 max-w-lg text-forest-foreground/80">
//                 Multi-day rides with canvas camps, private chefs, and the world's most photogenic ranches. Add flights, transfers, and photography with a single click.
//               </p>
//               <Button asChild size="lg" className="mt-6 bg-gold text-gold-foreground shadow-glow hover:bg-gold/90">
//                 <Link to="/packages">Discover packages <ArrowRight className="ml-2 h-4 w-4" /></Link>
//               </Button>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               {[images.t4, images.t8, images.t7, images.t5].map((img, i) => (
//                 <img key={i} src={img} alt="" loading="lazy" className="aspect-square w-full rounded-2xl object-cover shadow-elegant" />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section className="container-wide mt-24">
//         <SectionHeading eyebrow="Rider stories" title="Loved by riders worldwide" />
//         <Testimonials />
//       </section>

//       {/* INSTAGRAM */}
//       <section className="container-wide mt-24">
//         <SectionHeading eyebrow="@horsetrails" title="From the saddle to the feed" subtitle="Follow along and tag #HorseTrails for a chance to be featured." />
//         <InstagramGallery />
//       </section>

//       {/* FAQ */}
//       <section className="container-wide mt-24">
//         <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
//         <FAQAccordion />
//       </section>

//       {/* NEWSLETTER */}
//       <section className="container-wide mt-24">
//         <Newsletter />
//       </section>
//     </SiteLayout>
//   );
// }
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

import { SiteLayout } from "@/components/site/Layout";
import { SearchWidget } from "@/components/site/SearchWidget";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { TrailCard } from "@/components/site/TrailCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Testimonials } from "@/components/site/Testimonials";
import { InstagramGallery } from "@/components/site/InstagramGallery";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { Newsletter } from "@/components/site/Newsletter";
import { BookingPopup } from "@/components/site/BookingPopup";

import { Button } from "@/components/ui/button";
import { images, trails } from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const popular = trails.slice(0, 6);

  const featured = trails.slice(2, 6);

  const topRated = [...trails]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative w-full">
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-elegant">
          <img
            src={images.hero}
            alt="Horse riding at sunrise"
            width={1920}
            height={1200}
            className="h-[85vh] max-h-[820px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/10 to-ivory/95" />

          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="container-wide">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="max-w-2xl"
              >
                <div className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Premium Equestrian Marketplace
                </div>

                <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-white drop-shadow-lg md:text-7xl">
                  Ride where the{" "}
                  <span className="text-gradient-gold">
                    wild ones
                  </span>{" "}
                  live.
                </h1>

                <p className="mt-5 max-w-xl text-lg text-white/90 drop-shadow">
                  Curated horse riding experiences across six continents —
                  sunrise ridges, private beaches, and safari plains, all in one
                  place.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gold text-gold-foreground shadow-glow hover:bg-gold/90"
                  >
                    <Link to="/trails">
                      Explore Trails
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/60 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                  >
                    <Link to="/about">
                      Our Story
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Search widget */}
        <div className="relative z-10 -mt-16 md:-mt-20">
          <SearchWidget />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="container-wide mt-16">
        <div className="glass grid gap-6 rounded-3xl p-6 sm:grid-cols-2 md:grid-cols-4 md:p-8">
          {[
            {
              icon: Award,
              label: "Vetted Ranches",
              value: "240+",
            },
            {
              icon: Users,
              label: "Happy Riders",
              value: "68k",
            },
            {
              icon: Shield,
              label: "Insured Rides",
              value: "100%",
            },
            {
              icon: Sparkles,
              label: "Avg. Rating",
              value: "4.94",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="flex items-center gap-4"
            >
              <div className="gradient-gold grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-gold-foreground shadow-glow">
                <item.icon className="h-5 w-5" />
              </div>

              <div>
                <div className="font-display text-2xl font-bold text-forest">
                  {item.value}
                </div>

                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-wide mt-24">
        <SectionHeading
          eyebrow="Explore by style"
          title="A trail for every rider"
          subtitle="From gentle first canters to overnight camps, choose the pace and mood that fits your journey."
        />

        <CategoryGrid />
      </section>

      {/* POPULAR TRAILS */}
      <section className="container-wide mt-24">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Most booked"
            title="Popular horse trails"
            subtitle="Rider favourites from around the world, refreshed every week."
          />

          <Button
            asChild
            variant="ghost"
            className="hidden gap-2 text-forest md:inline-flex"
          >
            <Link to="/trails">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((trail, index) => (
            <TrailCard
              key={trail.id}
              trail={trail}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* FEATURED EXPERIENCES */}
      <section className="container-wide mt-24">
        <SectionHeading
          eyebrow="Editor's picks"
          title="Featured experiences"
          subtitle="Signature rides handpicked by our senior guides."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((trail, index) => (
            <motion.article
              key={trail.id}
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
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -5,
              }}
              className="group relative flex overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant"
            >
              {/* Card detail link */}
              <Link
                to="/trails/$id"
                params={{
                  id: trail.slug,
                }}
                className="absolute inset-0 z-0"
                aria-label={`View ${trail.name}`}
              />

              {/* Image */}
              <div className="pointer-events-none relative z-10 aspect-[4/3] w-2/5 overflow-hidden">
                <img
                  src={trail.image}
                  alt={trail.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>

              {/* Content */}
              <div className="pointer-events-none relative z-10 flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-saddle">
                    {trail.category}
                  </div>

                  <h3 className="mt-1 font-display text-xl font-semibold text-forest">
                    {trail.name}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {trail.short}
                  </p>
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="font-display text-xl font-bold text-forest">
                      ${trail.price}
                      <span className="ml-1 text-xs font-normal text-muted-foreground">
                        /rider
                      </span>
                    </div>
                  </div>

                  {/* Working Book Now popup */}
                  <div className="pointer-events-auto relative z-20">
                    <BookingPopup
                      trailName={trail.name}
                      price={trail.price}
                      className="h-9 px-4 text-xs"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* TOP RATED HORSES */}
      <section className="container-wide mt-24">
        <SectionHeading
          eyebrow="Top rated"
          title="Horses our riders adore"
          subtitle="Every horse on Horse Trails is individually reviewed after every ride."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topRated.map((trail, index) => (
            <TrailCard
              key={trail.id}
              trail={trail}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ADVENTURE PACKAGES */}
      <section className="container-wide mt-24">
        <div className="relative overflow-hidden rounded-[2rem] shadow-elegant">
          <img
            src={images.t7}
            alt="Luxury horse riding package"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/40" />

          <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
                Luxury Packages
              </div>

              <h3 className="mt-4 font-display text-4xl font-bold text-forest-foreground md:text-5xl">
                Overnight adventures,{" "}
                <span className="text-gradient-gold">
                  stitched together.
                </span>
              </h3>

              <p className="mt-4 max-w-lg text-forest-foreground/80">
                Multi-day rides with canvas camps, private chefs, and the
                world's most photogenic ranches. Add flights, transfers, and
                photography with a single click.
              </p>

              <Button
                asChild
                size="lg"
                className="mt-6 bg-gold text-gold-foreground shadow-glow hover:bg-gold/90"
              >
                <Link to="/packages">
                  Discover packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                images.t4,
                images.t8,
                images.t7,
                images.t5,
              ].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full rounded-2xl object-cover shadow-elegant"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-wide mt-24">
        <SectionHeading
          eyebrow="Rider stories"
          title="Loved by riders worldwide"
        />

        <Testimonials />
      </section>

      {/* INSTAGRAM */}
      <section className="container-wide mt-24">
        <SectionHeading
          eyebrow="@horsetrails"
          title="From the saddle to the feed"
          subtitle="Follow along and tag #HorseTrails for a chance to be featured."
        />

        <InstagramGallery />
      </section>

      {/* FAQ */}
      <section className="container-wide mt-24">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently asked questions"
        />

        <FAQAccordion />
      </section>

      {/* NEWSLETTER */}
      <section className="container-wide mt-24">
        <Newsletter />
      </section>
    </SiteLayout>
  );
}