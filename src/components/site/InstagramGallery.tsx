import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { galleryImages } from "@/lib/data";

export function InstagramGallery() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
      {galleryImages.slice(0, 12).map((img, i) => (
        <motion.a
          key={i}
          href="#"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 6) * 0.04 }}
          className="group relative aspect-square overflow-hidden rounded-2xl"
        >
          <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 grid place-items-center bg-forest/0 transition-colors group-hover:bg-forest/50">
            <Instagram className="h-6 w-6 text-transparent transition-colors group-hover:text-white" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}
