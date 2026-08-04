import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { categories } from "@/lib/data";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((c, i) => {
        const Icon =
          (
            Icons as unknown as Record<
              string,
              Icons.LucideIcon
            >
          )[c.icon] ?? Icons.Sparkles;

        return (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Link
              to="/trails"
              search={{ type: c.key } as never}
              className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elegant"
            >
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-500 group-hover:opacity-60 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/70 to-ivory/95 group-hover:from-ivory/60 group-hover:to-ivory/90 transition-all" />

              <div className="relative grid h-12 w-12 place-items-center rounded-xl gradient-forest text-forest-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </div>

              <div className="relative mt-3 text-center text-sm font-semibold text-forest">
                {c.label}
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}