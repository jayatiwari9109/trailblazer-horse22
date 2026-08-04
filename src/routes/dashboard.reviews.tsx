import { createFileRoute } from "@tanstack/react-router";
import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Camera,
  CheckCircle2,
  Edit3,
  Film,
  Search,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trails } from "@/lib/data";

export const Route = createFileRoute("/dashboard/reviews")({
  head: () => ({
    meta: [
      {
        title: "Reviews — Horse Trails",
      },
      {
        name: "description",
        content:
          "Rate your horse riding experience and manage your reviews.",
      },
    ],
  }),

  component: Reviews,
});

type Ratings = {
  overall: number;
  horse: number;
  guide: number;
  value: number;
};

type UploadedMedia = {
  id: string;
  name: string;
  type: "image" | "video";
  url: string;
};

type ReviewItem = {
  id: string;
  trailId: string | number;
  trailName: string;
  location: string;
  image: string;
  date: string;
  ratings: Ratings;
  comment: string;
  media: UploadedMedia[];
  createdAt: string;
};

const STORAGE_KEY =
  "horse-trails-dashboard-reviews";

const emptyRatings: Ratings = {
  overall: 0,
  horse: 0,
  guide: 0,
  value: 0,
};

const defaultReviews: ReviewItem[] = trails
  .slice(1, 4)
  .map((trail, index) => ({
    id: `review-${trail.id}`,
    trailId: trail.id,
    trailName: trail.name,
    location: trail.location,
    image: trail.image,
    date: [
      "Feb 18, 2026",
      "Jan 30, 2026",
      "Dec 12, 2025",
    ][index],
    ratings: {
      overall: 5,
      horse: 5,
      guide: 5,
      value: 5,
    },
    comment:
      "Absolutely wonderful. Would ride again in a heartbeat.",
    media: [],
    createdAt: new Date(
      2026,
      1 - index,
      18,
    ).toISOString(),
  }));

function Reviews() {
  const [reviews, setReviews] =
    useState<ReviewItem[]>([]);

  const [ratings, setRatings] =
    useState<Ratings>(emptyRatings);

  const [comment, setComment] =
    useState("");

  const [media, setMedia] =
    useState<UploadedMedia[]>([]);

  const [editingReviewId, setEditingReviewId] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const lastTrail = trails[0];

  useEffect(() => {
    const storedReviews =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (storedReviews) {
      try {
        setReviews(
          JSON.parse(
            storedReviews,
          ) as ReviewItem[],
        );

        return;
      } catch {
        window.localStorage.removeItem(
          STORAGE_KEY,
        );
      }
    }

    setReviews(defaultReviews);
  }, []);

  const saveReviews = (
    nextReviews: ReviewItem[],
  ) => {
    setReviews(nextReviews);

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(nextReviews),
    );
  };

  const filteredReviews = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return reviews.filter((review) => {
      return (
        review.trailName
          .toLowerCase()
          .includes(keyword) ||
        review.location
          .toLowerCase()
          .includes(keyword) ||
        review.comment
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [reviews, search]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) =>
        sum + review.ratings.overall,
      0,
    );

    return total / reviews.length;
  }, [reviews]);

  const updateRating = (
    field: keyof Ratings,
    value: number,
  ) => {
    setRatings((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  const handleMediaUpload = (
    event: ChangeEvent<HTMLInputElement>,
    type: "image" | "video",
  ) => {
    const files = Array.from(
      event.target.files ?? [],
    );

    if (files.length === 0) {
      return;
    }

    const maximumFiles =
      type === "image" ? 5 : 2;

    const currentTypeCount =
      media.filter(
        (item) => item.type === type,
      ).length;

    if (
      currentTypeCount + files.length >
      maximumFiles
    ) {
      window.alert(
        type === "image"
          ? "You can upload maximum 5 photos."
          : "You can upload maximum 2 videos.",
      );

      event.target.value = "";
      return;
    }

    const validFiles = files.filter(
      (file) => {
        const validType =
          type === "image"
            ? file.type.startsWith("image/")
            : file.type.startsWith("video/");

        const maximumSize =
          type === "image"
            ? 2 * 1024 * 1024
            : 20 * 1024 * 1024;

        return (
          validType &&
          file.size <= maximumSize
        );
      },
    );

    if (
      validFiles.length !== files.length
    ) {
      window.alert(
        type === "image"
          ? "Only image files up to 2MB are allowed."
          : "Only video files up to 20MB are allowed.",
      );
    }

    const uploadedItems =
      validFiles.map((file) => ({
        id: `${Date.now()}-${file.name}-${Math.random()}`,
        name: file.name,
        type,
        url: URL.createObjectURL(file),
      }));

    setMedia((current) => [
      ...current,
      ...uploadedItems,
    ]);

    setSuccessMessage("");
    event.target.value = "";
  };

  const removeMedia = (
    mediaId: string,
  ) => {
    setMedia((current) => {
      const item = current.find(
        (mediaItem) =>
          mediaItem.id === mediaId,
      );

      if (
        item &&
        item.url.startsWith("blob:")
      ) {
        URL.revokeObjectURL(item.url);
      }

      return current.filter(
        (mediaItem) =>
          mediaItem.id !== mediaId,
      );
    });
  };

  const resetForm = () => {
    media.forEach((item) => {
      if (item.url.startsWith("blob:")) {
        URL.revokeObjectURL(item.url);
      }
    });

    setRatings(emptyRatings);
    setComment("");
    setMedia([]);
    setEditingReviewId(null);
    setError("");
  };

  const submitReview = () => {
    if (
      Object.values(ratings).some(
        (rating) => rating === 0,
      )
    ) {
      setError(
        "Please select all four ratings.",
      );

      return;
    }

    if (comment.trim().length < 10) {
      setError(
        "Review must contain at least 10 characters.",
      );

      return;
    }

    if (editingReviewId) {
      const updatedReviews = reviews.map(
        (review) =>
          review.id === editingReviewId
            ? {
                ...review,
                ratings,
                comment: comment.trim(),
                media,
              }
            : review,
      );

      saveReviews(updatedReviews);
      setSuccessMessage(
        "Review updated successfully.",
      );
    } else {
      const newReview: ReviewItem = {
        id: `review-${Date.now()}`,
        trailId: lastTrail.id,
        trailName: lastTrail.name,
        location: lastTrail.location,
        image: lastTrail.image,
        date: "Mar 02, 2026",
        ratings,
        comment: comment.trim(),
        media,
        createdAt:
          new Date().toISOString(),
      };

      saveReviews([
        newReview,
        ...reviews,
      ]);

      setSuccessMessage(
        "Review submitted successfully.",
      );
    }

    setRatings(emptyRatings);
    setComment("");
    setMedia([]);
    setEditingReviewId(null);
    setError("");

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const editReview = (
    review: ReviewItem,
  ) => {
    setRatings(review.ratings);
    setComment(review.comment);
    setMedia(review.media);
    setEditingReviewId(review.id);
    setError("");
    setSuccessMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteReview = (
    reviewId: string,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) {
      return;
    }

    const reviewToDelete =
      reviews.find(
        (review) =>
          review.id === reviewId,
      );

    reviewToDelete?.media.forEach(
      (item) => {
        if (
          item.url.startsWith("blob:")
        ) {
          URL.revokeObjectURL(item.url);
        }
      },
    );

    saveReviews(
      reviews.filter(
        (review) =>
          review.id !== reviewId,
      ),
    );

    if (
      editingReviewId === reviewId
    ) {
      resetForm();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">
          Reviews
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Rate your rides and share your
          experience with other riders.
        </p>
      </div>

      {successMessage && (
        <div className="flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            {successMessage}
          </div>

          <button
            type="button"
            onClick={() =>
              setSuccessMessage("")
            }
            className="rounded-full p-1 hover:bg-green-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">
            Total Reviews
          </p>

          <p className="mt-1 text-2xl font-bold text-forest">
            {reviews.length}
          </p>
        </div>

        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">
            Average Rating
          </p>

          <div className="mt-1 flex items-center gap-2">
            <p className="text-2xl font-bold text-forest">
              {averageRating.toFixed(1)}
            </p>

            <Star className="h-5 w-5 fill-gold text-gold" />
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">
            Photos & Videos
          </p>

          <p className="mt-1 text-2xl font-bold text-forest">
            {reviews.reduce(
              (total, review) =>
                total +
                review.media.length,
              0,
            )}
          </p>
        </div>
      </div>

      <div className="glass rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold text-forest">
              {editingReviewId
                ? "Edit your review"
                : "Rate your last ride"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Select ratings and write about
              your experience.
            </p>
          </div>

          {editingReviewId && (
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
            >
              Cancel editing
            </Button>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:flex-row sm:items-center">
          <img
            src={lastTrail.image}
            alt={lastTrail.name}
            className="h-24 w-full rounded-2xl object-cover sm:w-32"
          />

          <div>
            <div className="font-semibold text-forest">
              {lastTrail.name}
            </div>

            <div className="mt-1 text-xs text-muted-foreground">
              {lastTrail.location} · Mar 02,
              2026
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <RatingRow
            label="Overall experience"
            value={ratings.overall}
            onChange={(value) =>
              updateRating(
                "overall",
                value,
              )
            }
          />

          <RatingRow
            label="Horse rating"
            value={ratings.horse}
            onChange={(value) =>
              updateRating(
                "horse",
                value,
              )
            }
          />

          <RatingRow
            label="Guide rating"
            value={ratings.guide}
            onChange={(value) =>
              updateRating(
                "guide",
                value,
              )
            }
          />

          <RatingRow
            label="Value for money"
            value={ratings.value}
            onChange={(value) =>
              updateRating(
                "value",
                value,
              )
            }
          />
        </div>

        <div className="mt-5">
          <Label htmlFor="review-comment">
            Your review
          </Label>

          <Textarea
            id="review-comment"
            rows={4}
            value={comment}
            onChange={(event) => {
              setComment(
                event.target.value,
              );

              setError("");
              setSuccessMessage("");
            }}
            className="mt-1 resize-none bg-card"
            placeholder="Tell other riders about your experience..."
            maxLength={500}
          />

          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>
              Minimum 10 characters
            </span>

            <span>
              {comment.length}/500
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Upload photos</Label>

            <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card px-4 py-6 text-sm font-medium text-forest transition hover:border-forest hover:bg-forest/5">
              <Camera className="h-5 w-5" />
              Select photos

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(event) =>
                  handleMediaUpload(
                    event,
                    "image",
                  )
                }
                className="hidden"
              />
            </label>

            <p className="mt-1 text-xs text-muted-foreground">
              Maximum 5 photos, 2MB each.
            </p>
          </div>

          <div>
            <Label>Upload videos</Label>

            <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card px-4 py-6 text-sm font-medium text-forest transition hover:border-forest hover:bg-forest/5">
              <Film className="h-5 w-5" />
              Select videos

              <input
                type="file"
                multiple
                accept="video/*"
                onChange={(event) =>
                  handleMediaUpload(
                    event,
                    "video",
                  )
                }
                className="hidden"
              />
            </label>

            <p className="mt-1 text-xs text-muted-foreground">
              Maximum 2 videos, 20MB each.
            </p>
          </div>
        </div>

        {media.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {media.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                {item.type ===
                "image" ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-36 w-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="h-36 w-full bg-black object-cover"
                  />
                )}

                <button
                  type="button"
                  onClick={() =>
                    removeMedia(item.id)
                  }
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white transition hover:bg-red-600"
                  title="Remove media"
                >
                  <X className="h-4 w-4" />
                </button>

                <p className="truncate px-3 py-2 text-xs text-muted-foreground">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <Button
          type="button"
          onClick={submitReview}
          className="mt-6 bg-forest text-forest-foreground shadow-glow hover:bg-forest/90"
        >
          <Upload className="mr-2 h-4 w-4" />

          {editingReviewId
            ? "Update review"
            : "Submit review"}
        </Button>
      </div>

      <div className="glass rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold text-forest">
              Your past reviews
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              View, edit or delete your
              submitted reviews.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search reviews..."
              className="w-full bg-transparent text-sm outline-none sm:w-48"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {filteredReviews.map(
            (review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-border/60 bg-card p-4 transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img
                    src={review.image}
                    alt={review.trailName}
                    className="h-24 w-full rounded-2xl object-cover sm:w-32"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="font-semibold text-forest">
                          {review.trailName}
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {review.location} ·{" "}
                          {review.date}
                        </p>
                      </div>

                      <StarRatingDisplay
                        value={
                          review.ratings
                            .overall
                        }
                      />
                    </div>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {review.comment}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <RatingBadge
                        label="Horse"
                        value={
                          review.ratings.horse
                        }
                      />

                      <RatingBadge
                        label="Guide"
                        value={
                          review.ratings.guide
                        }
                      />

                      <RatingBadge
                        label="Value"
                        value={
                          review.ratings.value
                        }
                      />
                    </div>

                    {review.media.length >
                      0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {review.media
                          .slice(0, 4)
                          .map((item) =>
                            item.type ===
                            "image" ? (
                              <img
                                key={item.id}
                                src={item.url}
                                alt={item.name}
                                className="h-16 w-16 rounded-xl object-cover"
                              />
                            ) : (
                              <div
                                key={item.id}
                                className="grid h-16 w-16 place-items-center rounded-xl bg-forest/10 text-forest"
                              >
                                <Film className="h-5 w-5" />
                              </div>
                            ),
                          )}
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          editReview(review)
                        }
                      >
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          deleteReview(
                            review.id,
                          )
                        }
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ),
          )}

          {filteredReviews.length ===
            0 && (
            <div className="rounded-2xl border border-dashed border-border px-6 py-14 text-center">
              <Star className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-3 font-semibold text-forest">
                No reviews found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Submit your first review or
                clear the search field.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RatingRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const [hoveredValue, setHoveredValue] =
    useState(0);

  const activeValue =
    hoveredValue || value;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>

        <span className="text-xs font-medium text-muted-foreground">
          {value > 0
            ? `${value}/5`
            : "Not rated"}
        </span>
      </div>

      <div
        className="mt-2 flex gap-1"
        onMouseLeave={() =>
          setHoveredValue(0)
        }
      >
        {Array.from({
          length: 5,
        }).map((_, index) => {
          const starValue = index + 1;

          return (
            <button
              key={starValue}
              type="button"
              onMouseEnter={() =>
                setHoveredValue(
                  starValue,
                )
              }
              onClick={() =>
                onChange(starValue)
              }
              className="rounded-md p-0.5 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-forest/30"
              title={`${starValue} star`}
            >
              <Star
                className={`h-7 w-7 transition ${
                  starValue <=
                  activeValue
                    ? "fill-gold text-gold"
                    : "text-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StarRatingDisplay({
  value,
}: {
  value: number;
}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < value
              ? "fill-gold text-gold"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function RatingBadge({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-1 font-medium text-forest">
      {label}: {value}
      <Star className="h-3 w-3 fill-gold text-gold" />
    </span>
  );
}
