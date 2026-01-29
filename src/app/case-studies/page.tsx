import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projectsData";
import { siteConfig } from "@/data/siteConfig";

const caseStudiesDescription =
  "Case studies from Christian Wilkins, software consultant and engineer delivering product strategy, UI systems, and engineering execution.";

export const metadata: Metadata = {
  title: "Case Studies | Christian Wilkins",
  description: caseStudiesDescription,
  keywords: [...siteConfig.keywords, "software consultant case studies", "startup case study"],
  alternates: {
    canonical: `${siteConfig.url}/case-studies`,
  },
  openGraph: {
    title: "Case Studies | Christian Wilkins",
    description: caseStudiesDescription,
    url: `${siteConfig.url}/case-studies`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Christian Wilkins",
    description: caseStudiesDescription,
    images: [siteConfig.image],
  },
};

export default function CaseStudiesPage() {
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        url: project.liveLink || siteConfig.url,
        keywords: project.technologies.join(", "),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: `${siteConfig.url}/case-studies`,
      },
    ],
  };

  return (
    <div className="animate-rise-in space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">Case Studies</Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">
          Software consulting case studies
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Proof of delivery across enterprise tooling, startup launches, and AI product systems.
        </p>
      </header>

      <section className="grid gap-4">
        {projects.map((project) => (
          <div key={project.title} className="rounded-2xl border border-border/70 bg-background/70 p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{project.role}</span>
              <span>•</span>
              <span>{project.timeline}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Highlights</p>
                <ul className="mt-2 space-y-1">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Impact</p>
                <ul className="mt-2 space-y-1">
                  {project.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-border/70 px-2 py-1 text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
            {project.liveLink && (
              <Link href={project.liveLink} className="mt-4 inline-block text-sm ui-link">
                View live project
              </Link>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
