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
};

export default function ServicesPage() {
  return (
    <div className="animate-rise-in space-y-8">
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">Services</Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">
          {servicesContent.heroTitle}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          {servicesContent.heroSubtitle}
        </p>
      </header>

      <section className="space-y-3">
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

      <section className="space-y-4">
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

      <section className="space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Outcomes</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {servicesContent.outcomes.map((item) => (
            <li key={item} className="rounded-2xl border border-border/70 bg-muted/20 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Industries</h2>
        <div className="flex flex-wrap gap-2">
          {servicesContent.industries.map((item) => (
            <span key={item} className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border/70 bg-muted/20 p-6">
        <p className="text-sm text-muted-foreground">{servicesContent.callToAction}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact" className="ui-label">
              Contact Christian Wilkins
            </Link>
          </Button>
          <Link href="/projects" className="text-sm text-primary font-medium hover:underline">
            View case studies
          </Link>
        </div>
      </section>
    </div>
  );
}
