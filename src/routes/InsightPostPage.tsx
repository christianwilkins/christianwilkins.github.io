import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { insightPosts } from "@/data/insightsContent";
import { siteConfig } from "@/data/siteConfig";
import { NotFoundPage } from "@/routes/NotFoundPage";

export function InsightPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = insightPosts.find((entry) => entry.slug === slug);
  if (!post) return <NotFoundPage />;

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
    keywords: post.keywords.join(", "),
    mainEntityOfPage: `${siteConfig.url}/insights/${post.slug}`,
  };

  const relatedPosts = insightPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3);

  return (
    <article className="animate-rise-in space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">Insight</Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span>-</span>
          <span>{post.readingTime}</span>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground">{post.description}</p>
      </header>

      <div className="space-y-6">
        {post.sections.map((section) => (
          <section
            key={section.title ?? section.content[0]}
            className={section.title ? "ui-section space-y-3" : "space-y-3"}
          >
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

      <section className="rounded-2xl border border-border/70 bg-background/70 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">More insights</h2>
          <Link to="/insights" className="text-xs ui-link">
            View all
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {relatedPosts.map((entry) => (
            <Link
              key={entry.slug}
              to={`/insights/${entry.slug}`}
              className="rounded-xl border border-border/70 bg-background/80 px-3 py-3 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{entry.readingTime}</p>
              <p className="mt-1 font-semibold text-foreground">{entry.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{entry.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
