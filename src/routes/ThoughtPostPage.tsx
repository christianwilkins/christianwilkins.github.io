import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getThoughtParagraphText,
  getThoughtReadingTime,
  getThoughtSourceUrls,
  thoughtPosts,
  type ThoughtParagraph,
} from "@/data/thoughtsContent";
import { siteConfig } from "@/data/siteConfig";
import { NotFoundPage } from "@/routes/NotFoundPage";

function renderThoughtParagraph(paragraph: ThoughtParagraph) {
  if (typeof paragraph === "string") return paragraph;

  const content: ReactNode[] = [];
  let cursor = 0;

  paragraph.links.forEach((link) => {
    const linkStart = paragraph.text.indexOf(link.text, cursor);
    if (linkStart === -1) return;

    content.push(paragraph.text.slice(cursor, linkStart));
    content.push(
      <a
        key={`${link.href}-${linkStart}`}
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className="thought-source-link"
      >
        {link.text}
        <ExternalLink aria-hidden="true" />
      </a>,
    );
    cursor = linkStart + link.text.length;
  });

  content.push(paragraph.text.slice(cursor));
  return content;
}

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
    citation: getThoughtSourceUrls(post),
  };

  const relatedPosts = thoughtPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3);

  return (
    <article className="thought-article animate-rise-in space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <header className="thought-header space-y-4">
        <Badge variant="secondary" className="text-xs">
          Thought
        </Badge>
        <h1 className="ui-label text-3xl font-bold font-heading sm:text-4xl">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span>•</span>
          <span>{getThoughtReadingTime(post)}</span>
        </div>
        <p className="thought-description text-base text-muted-foreground sm:text-lg">
          {post.description}
        </p>
      </header>

      <div className="thought-prose">
        {post.sections.map((section) => (
          <section
            key={section.title ?? getThoughtParagraphText(section.paragraphs[0])}
            className={
              section.title
                ? "thought-section ui-section"
                : "thought-section thought-section-unheaded"
            }
          >
            {section.title && (
              <h2 className="ui-label text-2xl font-semibold font-heading">{section.title}</h2>
            )}
            <div className="thought-section-body">
              {section.paragraphs.map((paragraph) => (
                <p key={getThoughtParagraphText(paragraph)} className="thought-paragraph">
                  {renderThoughtParagraph(paragraph)}
                </p>
              ))}
            </div>
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
