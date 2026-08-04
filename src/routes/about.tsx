import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Award,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { SiteLayout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { images } from "@/lib/data";

const team = [
  {
    name: "Elena Marchetti",
    role: "Founder & CEO",
    avatar: "https://i.pravatar.cc/240?img=45",
  },
  {
    name: "James Whitaker",
    role: "Head of Ranch Partnerships",
    avatar: "https://i.pravatar.cc/240?img=12",
  },
  {
    name: "Amara Odili",
    role: "Chief Safety Officer",
    avatar: "https://i.pravatar.cc/240?img=32",
  },
  {
    name: "Kenji Watanabe",
    role: "Head of Experience Design",
    avatar: "https://i.pravatar.cc/240?img=68",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "Make world-class equestrian experiences accessible to anyone, anywhere.",
  },
  {
    icon: Compass,
    title: "Our Vision",
    text: "A future where every meaningful stable is one click away from a thoughtful rider.",
  },
  {
    icon: HeartHandshake,
    title: "Our Values",
    text: "Horse welfare first, guide livelihoods second, revenue third — in that order.",
  },
];

const stats = [
  {
    value: "240+",
    label: "Vetted Ranches",
  },
  {
    value: "68k",
    label: "Happy Riders",
  },
  {
    value: "4.94",
    label: "Avg. Rating",
  },
  {
    value: "6",
    label: "Continents",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Us — Horse Trails",
      },
      {
        name: "description",
        content:
          "The story, mission, and team behind the world's most curated horse riding marketplace.",
      },
      {
        property: "og:image",
        content: images.portrait,
      },
    ],
  }),

  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="container-wide">
        {/* Hero */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.55,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-saddle">
              <Sparkles className="h-4 w-4" />
              About Horse Trails
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-forest md:text-6xl">
              Built by riders,{" "}
              <span className="text-gradient-gold">
                for riders.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Horse Trails started with a simple frustration: finding a
              trustworthy, beautifully run stable while travelling is nearly
              impossible. We spent three years personally visiting every ranch
              we list, and today we power tens of thousands of rides across six
              continents.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium text-forest shadow-sm">
                <ShieldCheck className="h-4 w-4 text-gold" />
                Verified ranch partners
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium text-forest shadow-sm">
                <Award className="h-4 w-4 text-gold" />
                Annual safety audits
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
            className="group relative overflow-hidden rounded-[32px] border border-border/60 shadow-elegant"
          >
            <img
              src={images.portrait}
              alt="Horse Trails team member with a horse"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Our promise
              </p>

              <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                Every ride should feel safe, personal, and unforgettable.
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {values.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-elegant transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="gradient-forest relative grid h-14 w-14 place-items-center rounded-2xl text-forest-foreground shadow-glow transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                <item.icon className="h-6 w-6" />
              </div>

              <h3 className="relative mt-5 font-display text-2xl font-bold text-forest">
                {item.title}
              </h3>

              <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
                {item.text}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Team */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Meet the team"
            title="Small team, big saddles"
            subtitle="A global team of riders, safety experts, designers, and ranch partners."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

                  <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs uppercase tracking-widest text-white/70">
                      Horse Trails Team
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="font-display text-lg font-semibold text-forest transition-colors group-hover:text-saddle">
                    {member.name}
                  </div>

                  <div className="mt-1 text-sm text-muted-foreground">
                    {member.role}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              className="group rounded-3xl border border-border/60 bg-card p-7 text-center shadow-elegant transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="font-display text-4xl font-bold text-forest transition-transform duration-300 group-hover:scale-110 md:text-5xl">
                {stat.value}
              </div>

              <div className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Safety CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.55,
          }}
          className="group relative mt-24 overflow-hidden rounded-[32px] gradient-forest p-8 shadow-elegant md:p-14"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-gold backdrop-blur-sm">
              <Award className="h-4 w-4" />
              Safety standards
            </div>

            <h3 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight text-forest-foreground md:text-5xl">
              A rigorous standard, checked yearly.
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-8 text-forest-foreground/75">
              Every partner ranch passes a 48-point inspection covering horse
              welfare, guide certification, equipment, insurance, and emergency
              response — audited annually by our in-house team.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold">
              <ShieldCheck className="h-5 w-5" />
              Horse welfare and rider safety come first
            </div>
          </div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}