import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/Layout";
import { TrailCard } from "@/components/site/TrailCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { trails } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      {
        title: "Experiences — Horse Trails",
      },
      {
        name: "description",
        content:
          "Signature curated horse riding experiences from our editorial team.",
      },
    ],
  }),

  component: ExperiencesPage,
});

function ExperiencesPage() {
  return (
    <SiteLayout>
      <section className="container-wide">
        <SectionHeading
          eyebrow="Signature"
          title="Curated experiences"
          subtitle="Our editors' most memorable rides from the past twelve months."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trails.map((trail, index) => (
            <TrailCard
              key={trail.id}
              trail={trail}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full"
          >
            <Link to="/trails">
              Browse all trails
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}