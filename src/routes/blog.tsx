// import { createFileRoute, Link } from "@tanstack/react-router";
// import { motion } from "framer-motion";
// import { ArrowRight, Calendar } from "lucide-react";
// import { SiteLayout } from "@/components/site/Layout";
// import { SectionHeading } from "@/components/site/SectionHeading";
// import { posts } from "@/lib/data";
// import { Badge } from "@/components/ui/badge";

// export const Route = createFileRoute("/blog")({
//   head: () => ({
//     meta: [
//       { title: "Journal — Horse Trails" },
//       { name: "description", content: "Guides, safety notes, and stories from our team of expert equestrians." },
//     ],
//   }),
//   component: Blog,
// });

// function Blog() {
//   const [featured, ...rest] = posts;
//   return (
//     <SiteLayout>
//       <section className="container-wide">
//         <SectionHeading eyebrow="Journal" title="Stories from the trail" />

//         <Link to="/blog" className="group grid gap-6 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant lg:grid-cols-2">
//           <div className="relative aspect-[4/3] overflow-hidden">
//             <img src={featured.image} alt={featured.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
//           </div>
//           <div className="flex flex-col justify-center p-8 md:p-12">
//             <Badge className="w-fit bg-gold text-gold-foreground">{featured.category}</Badge>
//             <h2 className="mt-4 font-display text-3xl font-bold text-forest md:text-4xl">{featured.title}</h2>
//             <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
//             <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-4 w-4" />{featured.date}</div>
//             <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">Read article <ArrowRight className="h-4 w-4" /></div>
//           </div>
//         </Link>

//         <div className="mt-12 grid gap-6 md:grid-cols-3">
//           {rest.map((p, i) => (
//             <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
//               <Link to="/blog" className="group block overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant">
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
//                 </div>
//                 <div className="p-5">
//                   <Badge variant="outline">{p.category}</Badge>
//                   <h3 className="mt-2 font-display text-lg font-semibold text-forest">{p.title}</h3>
//                   <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
//                   <div className="mt-3 text-xs text-muted-foreground">{p.date}</div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </SiteLayout>
//   );
// }
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock3,
  Share2,
} from "lucide-react";

import { SiteLayout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { posts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      {
        title: "Journal — Horse Trails",
      },
      {
        name: "description",
        content:
          "Guides, safety notes, and stories from our team of expert equestrians.",
      },
    ],
  }),

  component: BlogPage,
});

type Post = (typeof posts)[number];

type ExtendedPost = Post & {
  author?: string;
  readTime?: string;
  content?: string;
  paragraphs?: string[];
};

function BlogPage() {
  const [selectedPost, setSelectedPost] =
    useState<ExtendedPost | null>(null);

  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <SiteLayout>
        <section className="container-wide py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-forest">
            No articles available
          </h1>

          <p className="mt-3 text-muted-foreground">
            New stories will be added soon.
          </p>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-wide">
        <SectionHeading
          eyebrow="Journal"
          title="Stories from the trail"
          subtitle="Guides, safety notes, and memorable stories from our expert equestrians."
        />

        {/* Featured article */}
        <article
          role="button"
          tabIndex={0}
          onClick={() => setSelectedPost(featured)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setSelectedPost(featured);
            }
          }}
          className="group grid cursor-pointer gap-0 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:grid-cols-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[450px]">
            <img
              src={featured.image}
              alt={featured.title}
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-9 md:p-12">
            <Badge className="w-fit bg-gold text-gold-foreground">
              {featured.category}
            </Badge>

            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-forest md:text-4xl">
              {featured.title}
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              {featured.excerpt}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{featured.date}</span>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedPost(featured);
              }}
              className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-forest"
            >
              Read article

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </article>

        {/* Other articles */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((post, index) => (
            <motion.article
              key={post.slug}
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              onClick={() => setSelectedPost(post)}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <Badge
                  variant="outline"
                  className="w-fit border-gold/50 bg-gold/10 text-forest"
                >
                  {post.category}
                </Badge>

                <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-forest">
                  {post.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-5">
                  <div className="flex items-center justify-between border-t border-border/60 pt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedPost(post);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest"
                    >
                      Read

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Article popup */}
      <ArticlePopup
        post={selectedPost}
        open={Boolean(selectedPost)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPost(null);
          }
        }}
      />
    </SiteLayout>
  );
}

function ArticlePopup({
  post,
  open,
  onOpenChange,
}: {
  post: ExtendedPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!post) {
    return null;
  }

  const paragraphs = getArticleParagraphs(post);

  const handleShare = async () => {
    try {
      const shareData = {
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      window.alert("Article link copied");
    } catch (error) {
      const shareError = error as Error;

      if (shareError.name !== "AbortError") {
        console.error("Unable to share article:", shareError);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border border-border/60 bg-background p-0 sm:max-w-4xl">
        <div className="relative overflow-hidden rounded-t-3xl">
          <img
            src={post.image}
            alt={post.title}
            className="h-[260px] w-full object-cover sm:h-[380px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-9">
            <Badge className="bg-gold text-gold-foreground">
              {post.category}
            </Badge>

            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              {post.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-9">
          <DialogHeader className="text-left">
            <DialogTitle className="sr-only">
              {post.title}
            </DialogTitle>

            <DialogDescription className="text-base leading-7 text-muted-foreground">
              {post.excerpt}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border/70 py-4 text-sm text-muted-foreground">
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

          <div className="mt-8 space-y-8">
            {paragraphs.map((paragraph, index) => (
              <ArticleSection
                key={`${post.slug}-${index}`}
                paragraph={paragraph}
                index={index}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-border/70 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-forest">
                Enjoyed this article?
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Share this story with another trail rider.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>

              <Button
                type="button"
                onClick={handleShare}
                className="rounded-full bg-forest px-6 text-forest-foreground hover:bg-forest/90"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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

  return (
    <section>
      <h3 className="font-display text-2xl font-bold text-forest">
        {headings[index % headings.length]}
      </h3>

      <p className="mt-3 text-base leading-8 text-muted-foreground">
        {paragraph}
      </p>
    </section>
  );
}

function getArticleParagraphs(
  post: ExtendedPost,
): string[] {
  if (post.paragraphs?.length) {
    return post.paragraphs;
  }

  if (post.content) {
    return post.content
      .split("\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  return [
    "A successful horse trail experience begins before you arrive at the stable. Choose comfortable clothing, closed-toe footwear, and layers suitable for the weather. Arriving early gives you time to meet your guide and become familiar with the surroundings.",

    "Your guide will match you with a horse based on your confidence, experience, height, and riding ability. Stay calm while approaching the horse and allow the guide to explain how to safely mount and hold the reins.",

    "During the ride, maintain a safe distance from the horse ahead of you. Listen carefully to instructions about turning, stopping, slowing down, and navigating uneven ground.",

    "Keep your body relaxed, sit upright, and allow your hips to move naturally with the horse. Tell your guide immediately if you feel uncomfortable or uncertain.",

    "Take time to enjoy the landscape and your connection with the horse. Trail riding is a peaceful experience that allows you to explore nature from a different perspective.",
  ];
}