// import { createFileRoute } from "@tanstack/react-router";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { SiteLayout } from "@/components/site/Layout";
// import { SectionHeading } from "@/components/site/SectionHeading";
// import { galleryImages } from "@/lib/data";

// const filters = ["All", "Trails", "Horses", "Adventure", "Drone"] as const;

// export const Route = createFileRoute("/gallery")({
//   head: () => ({
//     meta: [
//       { title: "Gallery — Horse Trails" },
//       { name: "description", content: "Photos and drone shots from our most memorable rides." },
//     ],
//   }),
//   component: Gallery,
// });

// function Gallery() {
//   const [active, setActive] = useState<typeof filters[number]>("All");
//   return (
//     <SiteLayout>
//       <section className="container-wide">
//         <SectionHeading eyebrow="Field notes" title="From the saddle" subtitle="A visual journal of our most-loved rides." />
//         <div className="mb-8 flex flex-wrap justify-center gap-2">
//           {filters.map((f) => (
//             <button key={f} onClick={() => setActive(f)} className={`rounded-full border px-4 py-1.5 text-sm transition-all ${active === f ? "border-forest bg-forest text-forest-foreground shadow-glow" : "border-border bg-card"}`}>{f}</button>
//           ))}
//         </div>
//         <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
//           {galleryImages.map((img, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: (i % 8) * 0.03 }}
//               className={`group overflow-hidden rounded-2xl shadow-elegant ${i % 5 === 0 ? "row-span-2" : ""}`}
//             >
//               <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </SiteLayout>
//   );
// }
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { galleryImages } from "@/lib/data";

const filters = ["All", "Trails", "Horses", "Adventure", "Drone"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title: "Gallery — Horse Trails",
      },
      {
        name: "description",
        content: "Photos and drone shots from our most memorable rides.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [active, setActive] =
    useState<(typeof filters)[number]>("All");

  const filteredImages =
    active === "All"
      ? galleryImages
      : galleryImages.filter(
          (img) => img.category === active
        );

  return (
    <SiteLayout>
      <section className="container-wide">
        <SectionHeading
          eyebrow="Field notes"
          title="From the saddle"
          subtitle="A visual journal of our most-loved rides."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                active === f
                  ? "border-forest bg-forest text-forest-foreground shadow-glow"
                  : "border-border bg-card"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((img, i) => (
            <motion.div
              key={`${img.src}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: (i % 8) * 0.03,
              }}
              className={`group overflow-hidden rounded-2xl shadow-elegant ${
                i % 5 === 0 ? "row-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.category}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                {img.category}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
