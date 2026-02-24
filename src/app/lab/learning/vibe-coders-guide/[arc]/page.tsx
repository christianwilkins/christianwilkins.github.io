import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVibeArcBySlug, vibeCoderArcs } from "@/data/vibeCoderCurriculum";
import { siteConfig } from "@/data/siteConfig";
import ActivityPanel from "./activity-panel";

type Params = {
  arc: string;
};

export function generateStaticParams() {
  return vibeCoderArcs.map((arc) => ({ arc: arc.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const arc = getVibeArcBySlug(params.arc);
  if (!arc) {
    return {
      title: "Arc not found | Vibe Coder's Guide",
    };
  }

  const title = `${arc.title} | Vibe Coder's Guide to the Galaxy`;
  const description = arc.concise;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/lab/learning/vibe-coders-guide/${arc.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/lab/learning/vibe-coders-guide/${arc.slug}`,
      type: "article",
      images: [{ url: siteConfig.image, width: 1200, height: 630, alt: title }],
    },
  };
}

export default function VibeArcPage({ params }: { params: Params }) {
  const arc = getVibeArcBySlug(params.arc);
  if (!arc) {
    notFound();
  }

  return (
    <div className="min-h-screen px-5 py-10 md:px-10 lg:px-16 animate-rise-in">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/lab/learning/vibe-coders-guide" aria-label="Back to Vibe Coder curriculum arcs">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <header className="space-y-4 rounded-3xl border border-border/70 bg-card/55 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{arc.duration}</Badge>
            <Badge variant="outline">Interactive</Badge>
          </div>
          <h1 className="ui-label text-3xl md:text-4xl font-heading font-bold tracking-tight">{arc.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{arc.concise}</p>
          <p className="text-sm text-muted-foreground">{arc.whyItMatters}</p>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          <Card className="border-border/70 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl">Concise curriculum map</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="mb-2 font-medium">Core concepts</p>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {arc.learn.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-medium">Practice drills</p>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {arc.drills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {arc.deliverables.map((item) => (
                  <Badge key={item} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <ActivityPanel arc={arc} />
        </section>

        <section className="rounded-3xl border border-dashed border-border/70 bg-muted/20 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Compass className="h-4 w-4" />
              Next: complete this arc activity, then move to the next module in sequence.
            </p>
            <Button asChild variant="outline">
              <Link href="/lab/learning/vibe-coders-guide" className="inline-flex items-center gap-2">
                Back to all arcs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
