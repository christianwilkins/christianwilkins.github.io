import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { insightPosts } from "@/data/insightsContent";
import { siteConfig } from "@/data/siteConfig";

interface InsightPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return insightPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: InsightPageProps): Metadata {
  const post = insightPosts.find((entry) => entry.slug === params.slug);
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Christian Wilkins`,
    description: post.description,
    keywords: [...siteConfig.keywords, ...post.keywords],
    alternates: {
      canonical: `${siteConfig.url}/insights/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteConfig.url}/insights/${post.slug}`,
      publishedTime: post.date,
      authors: [siteConfig.name],
      images: [
        {
          url: siteConfig.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [siteConfig.image],
    },
  };
}

export default function InsightPage({ params }: InsightPageProps) {
  const post = insightPosts.find((entry) => entry.slug === params.slug);
  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: post.keywords.join(", "),
    mainEntityOfPage: `${siteConfig.url}/insights/${post.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteConfig.url}/insights` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/insights/${post.slug}` },
    ],
  };

  return (
    <article className="animate-rise-in space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">Insight</Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground">{post.description}</p>
      </header>

      <div className="space-y-6">
        {post.sections.map((section) => (
          <section key={section.title ?? section.content[0]} className="space-y-3">
            {section.title && (
              <h2 className="ui-label text-2xl font-semibold font-heading">{section.title}</h2>
            )}
            {section.content.map((paragraph) => (
              <p key={paragraph} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="rounded-2xl border border-border/70 bg-muted/20 p-6">
        <p className="text-sm text-muted-foreground">
          Need hands-on support with software consulting, design systems, or AI workflows?
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contact Christian Wilkins
          </Link>
        </div>
      </div>
    </article>
  );
}
