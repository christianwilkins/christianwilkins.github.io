import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { consultingContent } from "@/data/seoContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Software Consulting | Christian Wilkins",
  description: consultingContent.heroSubtitle,
  keywords: [...siteConfig.keywords, "software consultant", "startup software consultant"],
};

export default function ConsultingPage() {
  return (
    <div className="animate-rise-in space-y-8">
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">Consulting</Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">
          {consultingContent.heroTitle}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          {consultingContent.heroSubtitle}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">{consultingContent.approachTitle}</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {consultingContent.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">{consultingContent.focusTitle}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {consultingContent.focusAreas.map((item) => (
            <div key={item} className="rounded-2xl border border-border/70 bg-muted/20 p-4 text-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">{consultingContent.engagementTitle}</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {consultingContent.engagement.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 rounded-2xl border border-border/70 bg-muted/20 p-6">
        <p className="text-sm text-muted-foreground">{consultingContent.availability}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact" className="ui-label">
              Start a consulting project
            </Link>
          </Button>
          <Link href="/services" className="text-sm text-primary font-medium hover:underline">
            Explore services
          </Link>
        </div>
      </section>
    </div>
  );
}
