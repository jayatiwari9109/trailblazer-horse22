import { createFileRoute } from "@tanstack/react-router";
import { TrailCard } from "@/components/site/TrailCard";
import { trails } from "@/lib/data";

export const Route = createFileRoute("/dashboard/wishlist")({
  component: () => (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-forest">Wishlist</h1>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {trails.slice(0, 4).map((t, i) => <TrailCard key={t.id} trail={t} index={i} />)}
      </div>
    </div>
  ),
});
