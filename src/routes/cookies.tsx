import { createFileRoute } from "@tanstack/react-router";
import LegalPageLayout from "@/components/LegalPageLayout";

export const Route = createFileRoute("/cookies")({
  component: CookiesPolicy,
});

function CookiesPolicy() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="Understanding how cookies improve your experience."
    >
      <div className="space-y-6">
        <div className="rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Types of Cookies
          </h2>

          <ul className="space-y-3">
            <li>✓ Essential Cookies</li>
            <li>✓ Analytics Cookies</li>
            <li>✓ Performance Cookies</li>
            <li>✓ Marketing Cookies</li>
          </ul>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Managing Cookies
          </h2>

          <p className="text-muted-foreground leading-8">
            You can manage or disable cookies through your browser settings.
          </p>
        </div>
      </div>
    </LegalPageLayout>
  );
}