"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Compass, Layers3, Orbit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { learningModules, type LearningModule } from "@/data/learningModules";
import { siteConfig } from "@/data/siteConfig";

const learningDescription =
  "Learning Hub with practical modules on system design, prompting, and product execution.";

const statusLabel: Record<LearningModule["status"], string> = {
  live: "Live",
  beta: "Beta",
  prototype: "Prototype",
  planned: "Planned",
};

const statusStyles: Record<LearningModule["status"], string> = {
  live: "status-chip status-live",
  beta: "status-chip status-beta",
  prototype: "status-chip status-prototype",
  planned: "status-chip status-planned",
};

const trackLabel: Record<NonNullable<LearningModule["track"]>, string> = {
  foundation: "Foundation",
  systems: "Systems",
  product: "Product",
  execution: "Execution",
};

function ModuleTile({ module }: { module: LearningModule }) {
  const body = (
    <Card
      className={cn(
        "h-full border-border/70 bg-card/60 transition-all duration-300 hover:border-foreground/30 hover:shadow-deep",
        !module.href && "opacity-85",
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className={cn("rounded-full", statusStyles[module.status])}>
            {statusLabel[module.status]}
          </Badge>
          {module.track && (
            <Badge variant="secondary" className="rounded-full text-xs">
              {trackLabel[module.track]}
            </Badge>
          )}
        </div>
        <div>
          <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">{module.title}</CardTitle>
          <CardDescription className="mt-2 text-sm leading-relaxed">{module.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {module.duration && <span className="rounded-full border border-border/70 px-2 py-1">{module.duration}</span>}
          {module.level && <span className="rounded-full border border-border/70 px-2 py-1 capitalize">{module.level}</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          {module.topics.map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs font-medium">
              {topic}
            </Badge>
          ))}
        </div>
        {module.outcome && <p className="text-sm text-muted-foreground">Outcome: {module.outcome}</p>}
      </CardContent>
    </Card>
  );

  if (!module.href) {
    return <div className="group block h-full">{body}</div>;
  }

  if (module.href.startsWith("/")) {
    return (
      <Link href={module.href} className="group block h-full">
        {body}
      </Link>
    );
  }

  return (
    <a href={module.href} className="group block h-full" target="_blank" rel="noreferrer">
      {body}
    </a>
  );
}

export default function LearningPage() {
  const topics = useMemo(() => {
    const set = new Set<string>();
    learningModules.forEach((module) => module.topics.forEach((topic) => set.add(topic)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const [activeTopic, setActiveTopic] = useState("All");

  const filtered = useMemo(() => {
    if (activeTopic === "All") return learningModules;
    return learningModules.filter((module) => module.topics.includes(activeTopic));
  }, [activeTopic]);

  const sorted = useMemo(() => {
    const order: Record<LearningModule["status"], number> = {
      live: 0,
      beta: 1,
      prototype: 2,
      planned: 3,
    };
    return [...filtered].sort((a, b) => order[a.status] - order[b.status]);
  }, [filtered]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Learning Hub",
    description: learningDescription,
    url: `${siteConfig.url}/lab/learning`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Lab", item: `${siteConfig.url}/lab` },
      { "@type": "ListItem", position: 3, name: "Learning Hub", item: `${siteConfig.url}/lab/learning` },
    ],
  };

  return (
    <div className="relative min-h-screen px-5 py-10 md:px-10 lg:px-16 animate-rise-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pointer-events-none absolute left-8 top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-4 top-40 h-72 w-72 rounded-full bg-muted/30 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-10">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/lab" aria-label="Back to The Lab">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <header className="rounded-3xl border border-border/70 bg-card/55 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-primary">
            <Orbit className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Module Atlas</span>
          </div>
          <h1 className="mt-4 ui-label text-4xl md:text-5xl font-heading font-bold tracking-tight">Learning Hub</h1>
          <p className="mt-4 max-w-4xl text-lg text-muted-foreground leading-relaxed">
            A focused map of modules on system design, prompting, and shipping reliable products.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">{learningModules.length} modules</Badge>
            <Badge variant="outline" className="rounded-full inline-flex items-center gap-1">
              <Compass className="h-3.5 w-3.5" />
              Language agnostic
            </Badge>
            <Badge variant="outline" className="rounded-full inline-flex items-center gap-1">
              <Layers3 className="h-3.5 w-3.5" />
              System design centered
            </Badge>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {topics.map((topic) => (
              <Button
                key={topic}
                size="sm"
                variant={activeTopic === topic ? "secondary" : "outline"}
                onClick={() => setActiveTopic(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Filter by topic to find the right module fast.</p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((module) => (
            <ModuleTile key={module.id} module={module} />
          ))}
        </section>

        <section className="rounded-3xl border border-dashed border-border/70 bg-muted/20 p-6 text-sm text-muted-foreground">
          <p>Need this as a team workshop? I can turn these modules into guided sprints with live reviews.</p>
          <div className="mt-3">
            <Link href="/contact" className="inline-flex items-center gap-1 text-primary hover:underline">
              Talk to me about custom learning tracks
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
