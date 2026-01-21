"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Layers, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { learningModules, type LearningModule } from "@/data/learningModules";

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

function ModuleCard({ module }: { module: LearningModule }) {
  const card = (
    <Card
      className={cn(
        "h-full transition-all duration-300 hover:border-foreground/30 hover:shadow-deep bg-card/60",
        !module.href && "opacity-80"
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={cn("rounded-full", statusStyles[module.status])}>
            {statusLabel[module.status]}
          </Badge>
          {module.href && (
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
        <div>
          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
            {module.title}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {module.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {module.topics.map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs font-medium">
              {topic}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {module.stack.map((item) => (
            <span key={item} className="rounded-full border border-border/60 px-2 py-1">
              {item}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (!module.href) {
    return <div className="h-full">{card}</div>;
  }

  if (module.href.startsWith("/")) {
    return (
      <Link href={module.href} className="group block h-full">
        {card}
      </Link>
    );
  }

  return (
    <a href={module.href} className="group block h-full" target="_blank" rel="noreferrer">
      {card}
    </a>
  );
}

export default function LearningPage() {
  const topics = useMemo(() => {
    const set = new Set<string>();
    learningModules.forEach((module) => {
      module.topics.forEach((topic) => set.add(topic));
    });
    return ["All", ...Array.from(set).sort()];
  }, []);

  const [activeTopic, setActiveTopic] = useState("All");

  const filteredModules = useMemo(() => {
    if (activeTopic === "All") {
      return learningModules;
    }
    return learningModules.filter((module) => module.topics.includes(activeTopic));
  }, [activeTopic]);

  const activeModules = filteredModules.filter((module) => module.status !== "planned");
  const plannedModules = filteredModules.filter((module) => module.status === "planned");

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 md:px-10 lg:px-16 animate-rise-in">
      <div className="pointer-events-none absolute -top-40 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-muted/40 blur-3xl" />

      <div className="relative z-10 space-y-10">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-6 max-w-3xl">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/lab" aria-label="Back to The Lab">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles className="h-7 w-7" />
                <span className="text-sm font-semibold text-muted-foreground">Learning hub</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Learning Hub</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                A modular shelf of experiments built while exploring UI systems, state models,
                data storytelling, and interaction design. Each module can stand alone or connect into a larger narrative.
              </p>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4 text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-sm font-medium">
              <Layers className="h-4 w-4" />
              <span>{learningModules.length} modules tracked</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Add new modules in <span className="font-mono">src/data/learningModules.ts</span>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
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
          <p className="text-sm text-muted-foreground">
            Filter modules by topic to keep the lab focused while new experiments land.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold font-heading">Active modules</h2>
            <Badge variant="outline" className="text-xs font-semibold">{activeModules.length} live</Badge>
          </div>
          {activeModules.length === 0 ? (
            <Card className="border-dashed bg-muted/20">
              <CardContent className="py-10 text-center space-y-2">
                <p className="text-base font-medium">No active modules yet.</p>
                <p className="text-sm text-muted-foreground">
                  Drop your first learning app into the data file and it will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold font-heading">Planned and prototypes</h2>
            <Badge variant="outline" className="text-xs font-semibold">{plannedModules.length} queued</Badge>
          </div>
          {plannedModules.length === 0 ? (
            <Card className="border-dashed bg-muted/20">
              <CardContent className="py-10 text-center space-y-2">
                <p className="text-base font-medium">Everything is live.</p>
                <p className="text-sm text-muted-foreground">
                  Add planned modules when you want to sketch what&apos;s next.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {plannedModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
