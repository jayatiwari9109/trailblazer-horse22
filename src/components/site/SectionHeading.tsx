import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow, title, subtitle, align = "center",
}: { eyebrow?: string; title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-3 inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-saddle"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="font-display text-3xl font-bold tracking-tight text-forest md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          className={`mt-4 text-base text-muted-foreground md:text-lg ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
