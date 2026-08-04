import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="glass relative rounded-3xl p-6 shadow-elegant"
        >
          <Quote className="absolute right-5 top-5 h-8 w-8 text-gold/30" />
          <div className="flex gap-1">
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">"{t.text}"</p>
          <div className="mt-6 flex items-center gap-3">
            <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <div className="text-sm font-semibold text-forest">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.location}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
