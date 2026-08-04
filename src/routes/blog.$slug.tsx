import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock3,
  Facebook,
  Link2,
  Share2,
  Twitter,
} from "lucide-react";
import { useState, type MouseEvent } from "react";

import { SiteLayout } from "@/components/site/Layout";
import { posts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      {
        title: "Article — Horse Trails",
      },
      {
        name: "description",
        content:
          "Read expert horse riding guides, safety advice, and trail stories.",
      },
    ],
  }),

  component: BlogArticlePage,
});

type ExtendedPost = (typeof posts)[number] & {
  author?: string;
  readTime?: string;
  content?: string;
  paragraphs?: string[];
};

function BlogArticlePage() {
  const { slug } = Route.useParams();

  const [copied, setCopied] = useState(false);

  const post = posts.find(
    (currentPost) => currentPost.slug === slug,
  ) as ExtendedPost | undefined;

  if (!post) {
    return (
      <SiteLayout>
        <section className="container-wide py-20">
          <div className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-card p-10 text-center shadow-elegant">
            <h1 className="font-display text-3xl font-bold text-forest">
              Article not found
            </h1>

            <p className="mt-3 text-muted-foreground">
              This article may have been removed or the link is incorrect.
            </p>

            <Button
              asChild
              className="mt-6 rounded-full bg-forest text-forest-foreground hover:bg-forest/90"
            >
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to journal
              </Link>
            </Button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const articleParagraphs = getArticleParagraphs(post);

  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const handleCopyLink = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(articleUrl);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      window.prompt("Copy article link:", articleUrl);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: articleUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(articleUrl);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      const shareError = error as Error;

      if (shareError.name !== "AbortError") {
        console.error("Unable to share article:", shareError);
      }
    }
  };

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    articleUrl,
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    post.title,
  )}&url=${encodeURIComponent(articleUrl)}`;

  return (
    <SiteLayout>
      <article>
        {/* Top heading */}
        <section className="container-wide pb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-saddle"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to journal
          </Link>

          <div className="mx-auto mt-10 max-w-4xl text-center">
            <Badge className="bg-gold text-gold-foreground">
              {post.category}
            </Badge>

            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-forest sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                <span>{post.readTime ?? "6 min read"}</span>
              </div>

              <div>
                By{" "}
                <span className="font-semibold text-forest">
                  {post.author ?? "Horse Trails Editorial Team"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main article image */}
        <section className="container-wide">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-border/60 shadow-elegant">
            <img
              src={post.image}
              alt={post.title}
              className="aspect-[16/8] w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </section>

        {/* Article body */}
        <section className="container-wide py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_220px]">
            <div className="min-w-0">
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-elegant sm:p-9 lg:p-12">
                <p className="font-display text-xl font-semibold leading-8 text-forest sm:text-2xl">
                  {post.excerpt}
                </p>

                <div className="mt-8 space-y-7">
                  {articleParagraphs.map((paragraph, index) => (
                    <ArticleSection
                      key={`${post.slug}-${index}`}
                      paragraph={paragraph}
                      index={index}
                    />
                  ))}
                </div>

                {/* Safety note */}
                <div className="mt-10 rounded-2xl border border-forest/15 bg-forest/5 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-forest" />

                    <div>
                      <h3 className="font-display text-lg font-semibold text-forest">
                        Remember before you ride
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Always follow your guide’s instructions, wear suitable
                        safety equipment, and honestly communicate your riding
                        experience before choosing a horse or trail.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom share */}
                <div className="mt-10 flex flex-col gap-4 border-t border-border/60 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display font-semibold text-forest">
                      Enjoyed this article?
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Share it with another trail rider.
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={handleShare}
                    className="rounded-full bg-forest px-6 text-forest-foreground hover:bg-forest/90"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share article
                  </Button>
                </div>
              </div>
            </div>

            {/* Sticky social buttons */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-3xl border border-border/60 bg-card p-5 shadow-elegant">
                <p className="font-display text-sm font-semibold text-forest">
                  Share this story
                </p>

                <div className="mt-4 space-y-2">
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-sm text-forest transition hover:border-forest/40 hover:bg-forest/5"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>

                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-sm text-forest transition hover:border-forest/40 hover:bg-forest/5"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex w-full items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-sm text-forest transition hover:border-forest/40 hover:bg-forest/5"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Link2 className="h-4 w-4" />
                    )}

                    {copied ? "Link copied" : "Copy link"}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* More articles */}
        <RelatedArticles currentSlug={post.slug} />
      </article>

      {copied && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-forest px-5 py-3 text-sm font-medium text-forest-foreground shadow-xl">
          Article link copied
        </div>
      )}
    </SiteLayout>
  );
}

function ArticleSection({
  paragraph,
  index,
}: {
  paragraph: string;
  index: number;
}) {
  const headings = [
    "Preparing for your trail ride",
    "Meeting your horse",
    "Following your guide",
    "Staying comfortable on the trail",
    "Enjoying the complete experience",
  ];

  const heading = headings[index % headings.length];

  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-forest">
        {heading}
      </h2>

      <p className="mt-3 text-base leading-8 text-muted-foreground">
        {paragraph}
      </p>
    </section>
  );
}

function RelatedArticles({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border/60 bg-muted/30 py-14 sm:py-16">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saddle">
              Continue reading
            </p>

            <h2 className="mt-2 font-display text-3xl font-bold text-forest">
              More from the journal
            </h2>
          </div>

          <Link
            to="/blog"
            className="hidden items-center gap-2 text-sm font-semibold text-forest sm:inline-flex"
          >
            View all

            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.slug}
              to="/blog/$slug"
              params={{
                slug: relatedPost.slug,
              }}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <Badge variant="outline">
                  {relatedPost.category}
                </Badge>

                <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-forest">
                  {relatedPost.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {relatedPost.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function getArticleParagraphs(
  post: ExtendedPost,
): string[] {
  if (post.paragraphs && post.paragraphs.length > 0) {
    return post.paragraphs;
  }

  if (post.content) {
    return post.content
      .split("\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  return [
    `A successful horse trail experience begins before you arrive at the stable. Choose comfortable clothing, closed-toe footwear, and layers suitable for the weather. Arriving a little early will also give you enough time to meet your guide and become familiar with the surroundings.`,

    `Your guide will match you with a horse based on your confidence, experience, height, and riding ability. Stay calm while approaching the horse, avoid sudden movements, and allow the guide to explain how to safely mount and hold the reins.`,

    `During the ride, always maintain a safe distance from the horse ahead of you. Listen carefully to instructions about turning, stopping, slowing down, and navigating uneven ground. Never attempt to overtake another rider unless the guide allows it.`,

    `Keep your body relaxed, sit upright, and allow your hips to move naturally with the horse. If you feel uncomfortable or uncertain at any point, tell your guide immediately. Trail guides are there to keep both riders and horses safe.`,

    `Most importantly, take time to enjoy the landscape and connection with your horse. Trail riding is not about speed. It is a peaceful experience that allows you to explore nature from a completely different perspective.`,
  ];
}
