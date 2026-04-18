import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Braces, FlaskConical } from "lucide-react";
import { PretextInlineDemo } from "@/components/pretext-inline-demo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/siteConfig";

const pretextDescription =
  "Pretext demo in The Lab showing how glossary rich text can improve readability in web experiences.";

export const metadata: Metadata = {
  title: "Pretext Demo | Christian Wilkins",
  description: pretextDescription,
  keywords: [...siteConfig.keywords, "pretext", "web typography", "lab demo"],
  alternates: {
    canonical: `${siteConfig.url}/lab/pretext`,
  },
  openGraph: {
    title: "Pretext Demo | Christian Wilkins",
    description: pretextDescription,
    url: `${siteConfig.url}/lab/pretext`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Pretext Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pretext Demo | Christian Wilkins",
    description: pretextDescription,
    images: [siteConfig.image],
  },
};

export default function PretextPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pretext Demo",
    description: pretextDescription,
    url: `${siteConfig.url}/lab/pretext`,
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
        name: "Lab",
        item: `${siteConfig.url}/lab`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pretext Demo",
        item: `${siteConfig.url}/lab/pretext`,
      },
    ],
  };

  return (
    <div className="w-full space-y-6 animate-rise-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="rounded-2xl border border-border/70 bg-card/60 p-5 sm:p-6">
        <Link href="/lab" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <FlaskConical className="h-4 w-4" />
          Back to The Lab
        </Link>
        <div className="mt-4 flex items-center gap-2 text-primary">
          <Braces className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Pretext</span>
        </div>
        <h1 className="mt-3 ui-label text-3xl sm:text-4xl font-bold font-heading">Interactive glossary demo</h1>
        <p className="mt-3 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          This section tests how pretext can make term heavy writing easier to scan and understand.
          Use it as a reference for future web content patterns in this site.
        </p>
      </header>

      <Card className="border-border/70 bg-card/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Native in page glossary renderer</CardTitle>
        </CardHeader>
        <CardContent>
          <PretextInlineDemo />
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Live demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
            <iframe
              title="Pretext demo glossary"
              src="https://chenglou.me/pretext/"
              className="h-[520px] w-full sm:h-[680px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href="https://chenglou.me/pretext/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center gap-2 text-primary hover:underline sm:w-auto"
            >
              Open source demo <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/chenglou/pretext"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center gap-2 text-primary hover:underline sm:w-auto"
            >
              View repository <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
