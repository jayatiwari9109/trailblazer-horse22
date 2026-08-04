import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Check,
  Clock3,
  Heart,
  MapPin,
  Route,
  Share2,
  Star,
  Zap,
} from "lucide-react";

import { BookingPopup } from "@/components/site/BookingPopup";
import { trails } from "@/lib/data";

type Trail = (typeof trails)[number];

type ExtendedTrail = Trail & {
  name?: string;
  title?: string;
  reviews?: number;
  reviewCount?: number;
  duration?: string | number;
  distance?: string | number;
  slots?: number;
  availableSlots?: number;
  oldPrice?: number;
  originalPrice?: number;
  discount?: string;
  location?: string;
  short?: string;
  category?: string;
  instant?: boolean;
};

type TrailCardProps = {
  trail: Trail;
  index?: number;
};

export function TrailCard({
  trail,
  index = 0,
}: TrailCardProps) {
  const currentTrail = trail as ExtendedTrail;

  const [liked, setLiked] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const trailName =
    currentTrail.name ||
    currentTrail.title ||
    "Horse riding experience";

  const reviewCount =
    currentTrail.reviews ??
    currentTrail.reviewCount ??
    0;

  const duration =
    currentTrail.duration ??
    "2 hours";

  const distance =
    currentTrail.distance ??
    "8 km";

  const availableSlots =
    currentTrail.slots ??
    currentTrail.availableSlots ??
    4;

  const originalPrice =
    currentTrail.oldPrice ??
    currentTrail.originalPrice;

  const location =
    currentTrail.location ?? "";

  const favouriteStorageKey =
    `horse-trail-favourite-${trail.id}`;

  useEffect(() => {
    try {
      const savedFavourite =
        window.localStorage.getItem(
          favouriteStorageKey,
        );

      setLiked(savedFavourite === "true");
    } catch {
      setLiked(false);
    }
  }, [favouriteStorageKey]);

  const handleLike = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setLiked((currentLiked) => {
      const updatedLiked = !currentLiked;

      try {
        window.localStorage.setItem(
          favouriteStorageKey,
          String(updatedLiked),
        );
      } catch {
        // UI state will still work.
      }

      return updatedLiked;
    });
  };

  const handleShare = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const trailUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/trails/${trail.slug}`
        : "";

    try {
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        await navigator.share({
          title: trailName,
          text: `Check out ${trailName} on Horse Trails.`,
          url: trailUrl,
        });

        return;
      }

      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard
      ) {
        await navigator.clipboard.writeText(trailUrl);

        setShareCopied(true);

        window.setTimeout(() => {
          setShareCopied(false);
        }, 1800);

        return;
      }

      window.prompt(
        "Copy this trail link:",
        trailUrl,
      );
    } catch (error) {
      const shareError = error as Error;

      if (shareError.name !== "AbortError") {
        console.error(
          "Unable to share trail:",
          shareError,
        );
      }
    }
  };

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.3),
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link
          to="/trails/$id"
          params={{
            id: trail.slug,
          }}
          className="block h-full w-full"
          aria-label={`View ${trailName}`}
        >
          <img
            src={trail.image}
            alt={trailName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />

        {/* Tags */}
        <div className="absolute left-3 top-3 z-20 flex max-w-[70%] flex-wrap gap-2">
          {currentTrail.category && (
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground shadow-sm">
              {currentTrail.category}
            </span>
          )}

          {currentTrail.difficulty && (
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground shadow-sm">
              {currentTrail.difficulty}
            </span>
          )}

          {currentTrail.instant && (
            <span className="inline-flex items-center gap-1 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-forest-foreground shadow-sm">
              <Zap className="h-3 w-3" />
              Instant
            </span>
          )}
        </div>

        {/* Like and share */}
        <div className="absolute right-3 top-3 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={handleLike}
            aria-label={
              liked
                ? `Remove ${trailName} from favourites`
                : `Add ${trailName} to favourites`
            }
            aria-pressed={liked}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/85 text-forest shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white active:scale-95"
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                liked
                  ? "fill-red-500 text-red-500"
                  : "fill-transparent text-forest"
              }`}
            />
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label={`Share ${trailName}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/85 text-forest shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white active:scale-95"
          >
            {shareCopied ? (
              <Check className="h-5 w-5 text-forest" />
            ) : (
              <Share2 className="h-5 w-5 text-forest" />
            )}
          </button>
        </div>

        {/* Discount */}
        {(currentTrail.discount ||
          originalPrice) && (
          <div className="absolute bottom-3 left-3 z-20">
            <span className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
              {currentTrail.discount
                ? currentTrail.discount
                : originalPrice
                  ? `Save $${Math.max(
                      Number(originalPrice) -
                        Number(trail.price),
                      0,
                    )}`
                  : ""}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1.5">
            <Star className="h-4 w-4 shrink-0 fill-gold text-gold" />

            <span className="font-semibold text-forest">
              {Number(trail.rating).toFixed(1)}
            </span>

            {reviewCount > 0 && (
              <span className="truncate text-sm text-muted-foreground">
                ({reviewCount})
              </span>
            )}
          </div>

          {currentTrail.difficulty && (
            <span className="shrink-0 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-forest">
              {currentTrail.difficulty}
            </span>
          )}
        </div>

        <Link
          to="/trails/$id"
          params={{
            id: trail.slug,
          }}
          className="mt-3 block"
        >
          <h3 className="font-display text-xl font-semibold leading-tight text-forest transition-colors hover:text-saddle">
            {trailName}
          </h3>
        </Link>

        {location && (
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />

            <span className="line-clamp-1">
              {location}
            </span>
          </div>
        )}

        {currentTrail.short && (
          <p className="mt-3 line-clamp-2 min-h-[44px] text-sm leading-6 text-muted-foreground">
            {currentTrail.short}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock3 className="h-4 w-4" />

            <span>
              {typeof duration === "number"
                ? `${duration} hours`
                : duration}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Route className="h-4 w-4" />

            <span>
              {typeof distance === "number"
                ? `${distance} km`
                : distance}
            </span>
          </div>

          <span className="ml-auto font-medium text-forest">
            {availableSlots} slots
          </span>
        </div>

        {/* Price and popup button */}
        <div className="mt-auto border-t border-border/70 pt-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-forest">
                  ${trail.price}
                </span>

                {originalPrice &&
                  Number(originalPrice) >
                    Number(trail.price) && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${originalPrice}
                    </span>
                  )}
              </div>

              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                Per rider
              </p>
            </div>

            <div
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
             <BookingPopup
  trailName={trailName}
  price={trail.price}
  location={location}
  productId={Number(trail.id)}
/>
            </div>
          </div>
        </div>
      </div>

      {shareCopied && (
        <div className="pointer-events-none absolute bottom-20 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest px-4 py-2 text-xs font-medium text-forest-foreground shadow-xl">
          Link copied
        </div>
      )}
    </motion.article>
  );
}