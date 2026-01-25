import type { Metadata } from "next";
import Link from "next/link";
import { resourcesContent } from "@/data/resourcesContent";
import { siteConfig } from "@/data/siteConfig";

const usesDescription =
  "A compact list of the tools and systems Christian Wilkins relies on for product design, engineering, and AI workflows.";

export const metadata: Metadata = {
  title: "Uses | Christian Wilkins",
  description: usesDescription,
  keywords: [...siteConfig.keywords, "uses page", "tools", "stack"],
  alternates: {
    canonical: `${siteConfig.url}/about/uses`,
  },
  openGraph: {
    title: "Uses | Christian Wilkins",
    description: usesDescription,
    url: `${siteConfig.url}/about/uses`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins Uses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uses | Christian Wilkins",
    description: usesDescription,
    images: [siteConfig.image],
  },
};

export default function UsesPage() {
  const usesSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Uses",
    description: usesDescription,
    url: `${siteConfig.url}/about/uses`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
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
        name: "About",
        item: `${siteConfig.url}/about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Uses",
        item: `${siteConfig.url}/about/uses`,
      },
    ],
  };

  return (
    <div className="animate-rise-in space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(usesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="space-y-3">
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">Uses</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          A compact list of the tools and systems I reach for most. Last updated January 25, 2026.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {resourcesContent.stack.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/70 bg-muted/10 p-5">
            <h2 className="text-base font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <p className="text-sm sm:text-base text-muted-foreground">
          I keep this list short and update it as my workflows change.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/resources" className="text-primary font-medium hover:underline">
            Resources
          </Link>
          <Link href="/about" className="text-primary font-medium hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
