import {
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ExternalLink,
  List,
  Map,
  MapPin,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { SiteLayout } from "@/components/site/Layout";
import { TrailCard } from "@/components/site/TrailCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { trails } from "@/lib/data";

export const Route = createFileRoute("/trails")({
  head: () => ({
    meta: [
      {
        title: "All Horse Trails — Horse Trails",
      },
      {
        name: "description",
        content:
          "Browse and filter every horse riding trail on Horse Trails — by location, difficulty, price, breed, and duration.",
      },
    ],
  }),

  component: TrailsPage,
});

const difficulties = [
  "Easy",
  "Moderate",
  "Challenging",
] as const;

const breeds = Array.from(
  new Set(
    trails
      .map((trail) => trail.breed)
      .filter(
        (horseBreed): horseBreed is string =>
          Boolean(horseBreed),
      ),
  ),
);

type StringStateSetter = Dispatch<
  SetStateAction<string[]>
>;

function TrailsPage() {
  const [priceMax, setPriceMax] = useState(700);
  const [minRating, setMinRating] = useState(0);

  const [
    selectedDifficulties,
    setSelectedDifficulties,
  ] = useState<string[]>([]);

  const [selectedBreeds, setSelectedBreeds] =
    useState<string[]>([]);

  const [privateOnly, setPrivateOnly] =
    useState(false);

  const [instantOnly, setInstantOnly] =
    useState(false);

  const [sort, setSort] = useState("popular");

  const [view, setView] = useState<
    "list" | "map"
  >("list");

  const [openFilters, setOpenFilters] =
    useState(false);

  const filteredTrails = useMemo(() => {
    const result = trails.filter((trail) => {
      const trailPrice =
        Number(trail.price) || 0;

      const trailRating =
        Number(trail.rating) || 0;

      const matchesPrice =
        trailPrice <= priceMax;

      const matchesRating =
        trailRating >= minRating;

      const matchesDifficulty =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(
          trail.difficulty,
        );

      const matchesBreed =
        selectedBreeds.length === 0 ||
        selectedBreeds.includes(trail.breed);

      const matchesPrivate =
        !privateOnly ||
        Boolean(trail.private);

      const matchesInstant =
        !instantOnly ||
        Boolean(trail.instant);

      return (
        matchesPrice &&
        matchesRating &&
        matchesDifficulty &&
        matchesBreed &&
        matchesPrivate &&
        matchesInstant
      );
    });

    if (sort === "rating") {
      return [...result].sort(
        (firstTrail, secondTrail) =>
          Number(secondTrail.rating) -
          Number(firstTrail.rating),
      );
    }

    if (sort === "price") {
      return [...result].sort(
        (firstTrail, secondTrail) =>
          Number(firstTrail.price) -
          Number(secondTrail.price),
      );
    }

    if (sort === "newest") {
      return [...result].reverse();
    }

    return result;
  }, [
    priceMax,
    minRating,
    selectedDifficulties,
    selectedBreeds,
    privateOnly,
    instantOnly,
    sort,
  ]);

  function toggleValue(
    list: string[],
    value: string,
    setList: StringStateSetter,
  ) {
    setList((currentList) =>
      currentList.includes(value)
        ? currentList.filter(
            (item) => item !== value,
          )
        : [...currentList, value],
    );
  }

  function resetFilters() {
    setPriceMax(700);
    setMinRating(0);
    setSelectedDifficulties([]);
    setSelectedBreeds([]);
    setPrivateOnly(false);
    setInstantOnly(false);
    setSort("popular");
  }

  const filtersAreActive =
    priceMax !== 700 ||
    minRating !== 0 ||
    selectedDifficulties.length > 0 ||
    selectedBreeds.length > 0 ||
    privateOnly ||
    instantOnly;

  const Filters = (
    <div className="space-y-7">
      {/* Max price */}
      <div>
        <Label className="font-display text-sm font-semibold text-forest">
          Max price
        </Label>

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>$50</span>

          <span className="font-semibold text-forest">
            ${priceMax}
          </span>
        </div>

        <Slider
          value={[priceMax]}
          onValueChange={(value) => {
            setPriceMax(value[0] ?? 700);
          }}
          min={50}
          max={700}
          step={10}
          className="mt-3"
        />
      </div>

      {/* Minimum rating */}
      <div>
        <Label className="font-display text-sm font-semibold text-forest">
          Minimum rating
        </Label>

        <div className="mt-3 flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map(
            (rating) => {
              const isSelected =
                minRating === rating;

              return (
                <button
                  key={rating}
                  type="button"
                  onClick={() =>
                    setMinRating(rating)
                  }
                  aria-pressed={isSelected}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    isSelected
                      ? "border-forest bg-forest text-forest-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-forest hover:text-forest"
                  }`}
                >
                  {rating === 0
                    ? "Any"
                    : `${rating}+`}
                </button>
              );
            },
          )}
        </div>

        {minRating > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Showing trails rated {minRating} or
            higher
          </p>
        )}
      </div>

      {/* Difficulty */}
      <FilterGroup title="Difficulty">
        {difficulties.map((difficulty) => (
          <label
            key={difficulty}
            className="flex cursor-pointer items-center gap-2.5 text-sm"
          >
            <Checkbox
              checked={selectedDifficulties.includes(
                difficulty,
              )}
              onCheckedChange={() =>
                toggleValue(
                  selectedDifficulties,
                  difficulty,
                  setSelectedDifficulties,
                )
              }
            />

            <span>{difficulty}</span>
          </label>
        ))}
      </FilterGroup>

      {/* Horse breed */}
      <FilterGroup title="Horse breed">
        {breeds.map((horseBreed) => (
          <label
            key={horseBreed}
            className="flex cursor-pointer items-center gap-2.5 text-sm"
          >
            <Checkbox
              checked={selectedBreeds.includes(
                horseBreed,
              )}
              onCheckedChange={() =>
                toggleValue(
                  selectedBreeds,
                  horseBreed,
                  setSelectedBreeds,
                )
              }
            />

            <span>{horseBreed}</span>
          </label>
        ))}
      </FilterGroup>

      {/* Booking */}
      <FilterGroup title="Booking">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <Checkbox
            checked={privateOnly}
            onCheckedChange={(checked) =>
              setPrivateOnly(checked === true)
            }
          />

          <span>Private rides only</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <Checkbox
            checked={instantOnly}
            onCheckedChange={(checked) =>
              setInstantOnly(checked === true)
            }
          />

          <span>Instant booking</span>
        </label>
      </FilterGroup>

      {filtersAreActive && (
        <Button
          type="button"
          variant="outline"
          onClick={resetFilters}
          className="w-full rounded-xl"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset filters
        </Button>
      )}
    </div>
  );

  return (
    <SiteLayout>
      <section className="container-wide">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-saddle">
              Horse Trails
            </div>

            <h1 className="mt-1 font-display text-4xl font-bold text-forest md:text-5xl">
              All experiences
            </h1>

            <p className="mt-2 text-muted-foreground">
              {filteredTrails.length}{" "}
              {filteredTrails.length === 1
                ? "trail"
                : "trails"}{" "}
              available
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* List and map buttons */}
            <div className="glass flex gap-1 rounded-full p-1">
              <button
                type="button"
                onClick={() => setView("list")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
                  view === "list"
                    ? "bg-forest text-forest-foreground"
                    : "text-forest hover:bg-forest/5"
                }`}
              >
                <List className="h-4 w-4" />
                List
              </button>

              <button
                type="button"
                onClick={() => setView("map")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
                  view === "map"
                    ? "bg-forest text-forest-foreground"
                    : "text-forest hover:bg-forest/5"
                }`}
              >
                <Map className="h-4 w-4" />
                Map
              </button>
            </div>

            {/* Sort */}
            <Select
              value={sort}
              onValueChange={setSort}
            >
              <SelectTrigger className="w-40 bg-card">
                <SelectValue placeholder="Sort trails" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="popular">
                  Popular
                </SelectItem>

                <SelectItem value="rating">
                  Highest Rated
                </SelectItem>

                <SelectItem value="price">
                  Lowest Price
                </SelectItem>

                <SelectItem value="newest">
                  Newest
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile filters */}
            <Button
              type="button"
              variant="outline"
              className="lg:hidden"
              onClick={() =>
                setOpenFilters(true)
              }
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="glass sticky top-28 rounded-2xl p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 font-display text-lg font-semibold text-forest">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </div>

                {filtersAreActive && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-medium text-saddle hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              {Filters}
            </div>
          </aside>

          {/* Results */}
          <div>
            {view === "map" ? (
              <div className="glass overflow-hidden rounded-3xl border border-border/60 shadow-elegant">
                {/* Map heading */}
                <div className="flex flex-col gap-4 border-b border-border/60 bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest/10 text-forest">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-display text-lg font-semibold text-forest">
                        Aspen Sunrise Ridge
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        42 Bridle Lane, Aspen, CO 81611
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=42%20Bridle%20Lane%2C%20Aspen%2C%20CO%2081611"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-forest px-5 text-sm font-semibold text-forest-foreground transition hover:bg-forest/90"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                {/* Google map */}
                <div className="relative h-[600px] w-full bg-muted">
                  <iframe
                    title="42 Bridle Lane Aspen Colorado map"
                    src="https://www.google.com/maps?q=42%20Bridle%20Lane%2C%20Aspen%2C%20CO%2081611&output=embed"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>

                {/* Map footer */}
                <div className="flex flex-col gap-3 border-t border-border/60 bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-forest" />

                    <div>
                      <p className="font-semibold text-forest">
                        42 Bridle Lane
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Aspen, Colorado 81611
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Use the map to view directions and nearby landmarks.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Active filters */}
                {filtersAreActive && (
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    {minRating > 0 && (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-card"
                      >
                        Rating {minRating}+

                        <button
                          type="button"
                          onClick={() =>
                            setMinRating(0)
                          }
                          aria-label="Remove rating filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}

                    {priceMax < 700 && (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-card"
                      >
                        Up to ${priceMax}

                        <button
                          type="button"
                          onClick={() =>
                            setPriceMax(700)
                          }
                          aria-label="Remove price filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}

                    {selectedDifficulties.map(
                      (difficulty) => (
                        <Badge
                          key={difficulty}
                          variant="outline"
                          className="gap-1 bg-card"
                        >
                          {difficulty}

                          <button
                            type="button"
                            onClick={() =>
                              toggleValue(
                                selectedDifficulties,
                                difficulty,
                                setSelectedDifficulties,
                              )
                            }
                            aria-label={`Remove ${difficulty} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ),
                    )}

                    {selectedBreeds.map(
                      (horseBreed) => (
                        <Badge
                          key={horseBreed}
                          variant="outline"
                          className="gap-1 bg-card"
                        >
                          {horseBreed}

                          <button
                            type="button"
                            onClick={() =>
                              toggleValue(
                                selectedBreeds,
                                horseBreed,
                                setSelectedBreeds,
                              )
                            }
                            aria-label={`Remove ${horseBreed} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ),
                    )}

                    {privateOnly && (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-card"
                      >
                        Private

                        <button
                          type="button"
                          onClick={() =>
                            setPrivateOnly(false)
                          }
                          aria-label="Remove private filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}

                    {instantOnly && (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-card"
                      >
                        Instant booking

                        <button
                          type="button"
                          onClick={() =>
                            setInstantOnly(false)
                          }
                          aria-label="Remove instant booking filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}

                {filteredTrails.length === 0 ? (
                  <div className="glass rounded-3xl p-10 text-center sm:p-16">
                    <div className="font-display text-xl font-semibold text-forest">
                      No trails match your filters
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Try changing or resetting your
                      selected filters.
                    </p>

                    <Button
                      type="button"
                      onClick={resetFilters}
                      className="mt-5 rounded-full bg-forest text-forest-foreground"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset filters
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {filteredTrails.map(
                      (trail, index) => (
                        <TrailCard
                          key={trail.id}
                          trail={trail}
                          index={index}
                        />
                      ),
                    )}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile filters drawer */}
        {openFilters && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <button
              type="button"
              aria-label="Close filters"
              className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
              onClick={() =>
                setOpenFilters(false)
              }
            />

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              className="absolute right-0 top-0 h-full w-80 max-w-[90vw] overflow-y-auto bg-background p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="font-display text-lg font-semibold text-forest">
                  Filters
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setOpenFilters(false)
                  }
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {Filters}

              <Button
                type="button"
                className="mt-7 w-full rounded-full bg-forest text-forest-foreground"
                onClick={() =>
                  setOpenFilters(false)
                }
              >
                Show {filteredTrails.length} results
              </Button>
            </motion.div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label className="font-display text-sm font-semibold text-forest">
        {title}
      </Label>

      <div className="mt-3 space-y-2">
        {children}
      </div>
    </div>
  );
}
