import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getThoughtReadingTime, thoughtPosts } from "@/data/thoughtsContent";
import { siteConfig } from "@/data/siteConfig";
import { NotFoundPage } from "@/routes/NotFoundPage";

export function ThoughtPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = thoughtPosts.find((entry) => entry.slug === slug);
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
    keywords: post.tags.join(", "),
    mainEntityOfPage: `${siteConfig.url}/thoughts/${post.slug}`,
  };

  const relatedPosts = thoughtPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3);

  return (
    <article className="animate-rise-in space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">
          Thought
        </Badge>
        <h1 className="ui-label text-3xl font-bold font-heading sm:text-4xl">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span>•</span>
          <span>{getThoughtReadingTime(post)}</span>
        </div>
        <p className="text-base text-muted-foreground sm:text-lg">{post.description}</p>
      </header>

      <div className="space-y-6">
        {post.sections.map((section) => (
          <section
            key={section.title ?? section.paragraphs[0]}
            className={section.title ? "ui-section space-y-3" : "space-y-3"}
          >
            {section.title && (
              <h2 className="ui-label text-2xl font-semibold font-heading">{section.title}</h2>
            )}
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">
            {relatedPosts.length > 0 ? "More thoughts" : "Thoughts"}
          </h2>
          <Link to="/thoughts" className="ui-link text-xs">
            View all
          </Link>
        </div>
        {relatedPosts.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-3">
            {relatedPosts.map((entry) => (
              <Link
                key={entry.slug}
                to={`/thoughts/${entry.slug}`}
                className="rounded-xl border border-border/70 bg-background/80 px-3 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {getThoughtReadingTime(entry)}
                </p>
                <p className="mt-1 font-semibold text-foreground">{entry.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{entry.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
