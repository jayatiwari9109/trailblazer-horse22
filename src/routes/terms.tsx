import { createFileRoute } from "@tanstack/react-router";
import LegalPageLayout from "@/components/LegalPageLayout";

export const Route = createFileRoute("/terms")({
  component: Terms,
});

function Terms() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our services."
    >
      <div className="space-y-8">
        <section className="rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Booking Rules
          </h2>
          <p className="text-muted-foreground leading-8">
            All bookings are subject to availability and confirmation.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Rider Responsibilities
          </h2>
          <p className="text-muted-foreground leading-8">
            Riders must follow safety guidelines and instructions provided by
            guides and ranch operators.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Liability
          </h2>
          <p className="text-muted-foreground leading-8">
            Participation in horse riding activities involves inherent risks.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}