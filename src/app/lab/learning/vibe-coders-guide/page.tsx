import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BrainCircuit, Compass, Layers3, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/siteConfig";
import { vibeCoderArcs, vibeCoderCapstoneTracks } from "@/data/vibeCoderCurriculum";

const pageTitle = "Vibe Coder's Guide to the Galaxy";
const pageDescription =
  "A language agnostic curriculum for engineers building real systems with AI support.";

export const metadata: Metadata = {
  title: `${pageTitle} | Learning Hub | Christian Wilkins`,
  description: pageDescription,
  alternates: {
    canonical: `${siteConfig.url}/lab/learning/vibe-coders-guide`,
  },
  openGraph: {
    title: `${pageTitle} | Christian Wilkins`,
    description: pageDescription,
    url: `${siteConfig.url}/lab/learning/vibe-coders-guide`,
    type: "article",
    images: [{ url: siteConfig.image, width: 1200, height: 630, alt: pageTitle }],
  },
};

const arcIconMap = {
  "arc-1": Compass,
  "arc-2": Sparkles,
  "arc-3": Layers3,
  "arc-4": Workflow,
  "arc-5": ShieldCheck,
} as const;

export default function VibeCodersGuidePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: pageTitle,
    description: pageDescription,
    provider: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/lab/learning/vibe-coders-guide`,
  };

  return (
    <div className="min-h-screen px-5 py-10 md:px-10 lg:px-16 animate-rise-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto w-full max-w-6xl space-y-10">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/lab/learning" aria-label="Back to Learning Hub">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <header className="space-y-5 rounded-3xl border border-border/70 bg-card/50 p-6 md:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline">Live curriculum</Badge>
            <Badge variant="outline">Language agnostic</Badge>
            <Badge variant="outline">System design first</Badge>
          </div>
          <h1 className="ui-label text-4xl md:text-5xl font-heading font-bold tracking-tight">{pageTitle}</h1>
          <p className="max-w-4xl text-lg text-muted-foreground leading-relaxed">
            This curriculum focuses on architecture, prompting, product judgment, and execution quality.
            It is practical, language agnostic, and built for real delivery work.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1">
              <BrainCircuit className="h-4 w-4" />
              12 week path
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1">
              <Workflow className="h-4 w-4" />
              Prompt to production
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1">
              <ShieldCheck className="h-4 w-4" />
              Security and reliability baked in
            </div>
          </div>
        </header>

        <section className="space-y-5">
          <h2 className="text-2xl font-heading font-semibold">Curriculum arcs</h2>
          <p className="text-sm text-muted-foreground">Each arc includes a focused activity and a short brief.</p>
          <div className="grid gap-5 md:grid-cols-2">
            {vibeCoderArcs.map((arc) => {
              const Icon = arcIconMap[arc.id as keyof typeof arcIconMap] ?? Compass;
              return (
                <Link key={arc.id} href={`/lab/learning/vibe-coders-guide/${arc.slug}`} className="group block">
                  <Card className="border-border/70 bg-card/60 shadow-soft transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-deep">
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">{arc.title}</CardTitle>
                        <span className="inline-flex items-center rounded-full border border-border/70 p-2 text-muted-foreground">
                          <Icon className="h-4 w-4" />
                        </span>
                      </div>
                      <CardDescription>{arc.duration}</CardDescription>
                      <p className="text-sm text-muted-foreground">{arc.concise}</p>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <p className="text-muted-foreground">{arc.whyItMatters}</p>
                      <div className="flex flex-wrap gap-2">
                        {arc.deliverables.map((item) => (
                          <Badge key={item} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                        Open arc activity
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-border/70 bg-card/40 p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Capstone: ship one real system</h2>
          <p className="text-muted-foreground">Graduate by delivering one production ready system under real constraints.</p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {vibeCoderCapstoneTracks.map((track) => (
              <li key={track}>{track}</li>
            ))}
          </ul>
          <div className="pt-2">
            <Button asChild>
              <Link href="/contact" className="inline-flex items-center gap-2">
                Build this curriculum with me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
