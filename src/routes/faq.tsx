import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FAQAccordion } from "@/components/site/FAQAccordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Horse Trails" },
      { name: "description", content: "Answers to the most common questions about booking, safety, and cancellations." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="container-wide">
        <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
        <FAQAccordion />
      </section>
    </SiteLayout>
  ),
});
