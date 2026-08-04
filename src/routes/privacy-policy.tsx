import { createFileRoute } from "@tanstack/react-router";
import LegalPageLayout from "@/components/LegalPageLayout";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Your trust matters. Learn how we collect and protect your information."
    >
      <div className="space-y-8">
        <section className="rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Information We Collect
          </h2>
          <p className="text-muted-foreground leading-8">
            We collect account details, booking information, contact details,
            and website usage data to provide exceptional riding experiences.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold mb-3">
            How We Use Information
          </h2>
          <p className="text-muted-foreground leading-8">
            Information is used for bookings, customer support, notifications,
            platform improvements, and personalized recommendations.
          </p>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Data Protection
          </h2>
          <p className="text-muted-foreground leading-8">
            We employ modern security practices to keep your personal
            information secure and protected.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}