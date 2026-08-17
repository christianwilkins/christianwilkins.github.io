import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  getThoughtReadingTime,
  thoughtPosts,
  thoughtsIntro,
} from "@/data/thoughtsContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Thoughts | Christian Wilkins",
  description: thoughtsIntro.description,
  alternates: {
    canonical: `${siteConfig.url}/thoughts`,
    types: {
      "application/rss+xml": `${siteConfig.url}${siteConfig.rss}`,
    },
  },
};

export default function ThoughtsPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Thoughts`,
    url: `${siteConfig.url}/thoughts`,
    description: thoughtsIntro.description,
    blogPost: thoughtPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      mainEntityOfPage: `${siteConfig.url}/thoughts/${post.slug}`,
    })),
  };

  return (
    <div className="animate-rise-in space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">
          Thoughts
        </Badge>
        <h1 className="ui-label text-3xl font-bold font-heading sm:text-4xl">
          {thoughtsIntro.title}
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          {thoughtsIntro.subtitle}
        </p>
      </header>

      {thoughtPosts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts yet.</p>
      ) : (
        <section className="grid gap-4">
          {thoughtPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/thoughts/${post.slug}`}
              className="group rounded-2xl border border-border/70 bg-background/70 p-5 transition-colors hover:bg-muted/30"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span>•</span>
                <span>{getThoughtReadingTime(post)}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
              {post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/70 px-2 py-1 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
