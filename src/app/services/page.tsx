import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { servicesContent } from "@/data/seoContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Services | Christian Wilkins",
  description: servicesContent.heroSubtitle,
  keywords: [...siteConfig.keywords, "software consultant", "software consulting services"],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Services | Christian Wilkins",
    description: servicesContent.heroSubtitle,
    url: `${siteConfig.url}/services`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Christian Wilkins",
    description: servicesContent.heroSubtitle,
    images: [siteConfig.image],
  },
};

export default function ServicesPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servicesContent.heroTitle,
    description: servicesContent.summary,
    provider: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "United States",
    serviceType: servicesContent.highlights,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Service offerings",
      itemListElement: servicesContent.offerings.map((offering) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offering.title,
          description: offering.description,
        },
      })),
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
        name: "Services",
        item: `${siteConfig.url}/services`,
      },
    ],
  };

  return (
    <div className="animate-rise-in space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">Services</Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">
          {servicesContent.heroTitle}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          {servicesContent.heroSubtitle}
        </p>
      </header>

      <section className="ui-section space-y-3">
        <h2 className="ui-label text-2xl font-semibold font-heading">How I help</h2>
        <p className="text-base text-muted-foreground">{servicesContent.summary}</p>
        <ul className="grid gap-3 sm:grid-cols-3">
          {servicesContent.highlights.map((item) => (
            <li key={item} className="rounded-2xl border border-border/70 bg-muted/20 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="ui-section space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Service areas</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {servicesContent.offerings.map((offering) => (
            <div key={offering.title} className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <h3 className="text-base font-semibold">{offering.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{offering.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ui-section space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Outcomes</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {servicesContent.outcomes.map((item) => (
            <li key={item} className="rounded-2xl border border-border/70 bg-muted/20 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="ui-section space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Industries</h2>
        <div className="flex flex-wrap gap-2">
          {servicesContent.industries.map((item) => (
            <span key={item} className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="ui-section space-y-4 rounded-2xl border border-border/70 bg-muted/20 p-6">
        <p className="text-sm text-muted-foreground">{servicesContent.callToAction}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact" className="ui-label">
              Contact Christian Wilkins
            </Link>
          </Button>
          <Link href="/projects" className="text-sm ui-link">
            View case studies
          </Link>
        </div>
      </section>
    </div>
  );
}
