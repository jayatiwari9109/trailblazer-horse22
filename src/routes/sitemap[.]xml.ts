import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { trails } from "@/lib/data";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/trails", "/experiences", "/packages", "/about", "/gallery", "/blog", "/contact", "/faq", "/login", "/register"];
        const dynamic = trails.map((t) => `/trails/${t.slug}`);
        const urls = [...staticPaths, ...dynamic].map((p) =>
          `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
