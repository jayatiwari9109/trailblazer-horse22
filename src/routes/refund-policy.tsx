import { createFileRoute } from "@tanstack/react-router";
import LegalPageLayout from "@/components/LegalPageLayout";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <LegalPageLayout
      title="Refund Policy"
      subtitle="Simple and transparent refund guidelines."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <h3 className="text-4xl font-bold">100%</h3>
          <p className="mt-2 text-muted-foreground">
            7+ Days Before Ride
          </p>
        </div>

        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <h3 className="text-4xl font-bold">50%</h3>
          <p className="mt-2 text-muted-foreground">
            48 Hours – 7 Days
          </p>
        </div>

        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <h3 className="text-4xl font-bold">0%</h3>
          <p className="mt-2 text-muted-foreground">
            Less Than 48 Hours
          </p>
        </div>
      </div>
    </LegalPageLayout>
  );
}