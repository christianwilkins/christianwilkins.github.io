import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { insightPosts, insightsIntro } from "@/data/insightsContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Insights | Christian Wilkins",
  description: insightsIntro.description,
  keywords: [...siteConfig.keywords, "software consulting insights", "startup consulting"],
  alternates: {
    canonical: `${siteConfig.url}/insights`,
    types: {
      "application/rss+xml": `${siteConfig.url}${siteConfig.rss}`,
    },
  },
  openGraph: {
    title: "Insights | Christian Wilkins",
    description: insightsIntro.description,
    url: `${siteConfig.url}/insights`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Christian Wilkins",
    description: insightsIntro.description,
    images: [siteConfig.image],
  },
};

export default function InsightsPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Insights`,
    url: `${siteConfig.url}/insights`,
    description: insightsIntro.description,
    blogPost: insightPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      mainEntityOfPage: `${siteConfig.url}/insights/${post.slug}`,
    })),
  };

  return (
    <div className="animate-rise-in space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">Insights</Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">
          {insightsIntro.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">{insightsIntro.subtitle}</p>
        <p className="text-sm text-muted-foreground max-w-2xl">{insightsIntro.description}</p>
      </header>

      <section className="grid gap-4">
        {insightPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/insights/${post.slug}`}
            className="group rounded-2xl border border-border/70 bg-background/70 p-5 transition-colors hover:bg-muted/30"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold group-hover:text-primary">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border/70 px-2 py-1 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
