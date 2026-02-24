import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Beaker, BookOpenText, Bot, Compass, Layers3, MessageSquareText, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/siteConfig";

const labDescription = "The Lab by Christian Wilkins: real experiments in system design, tooling, and agentic product workflows.";

export const metadata: Metadata = {
  title: "The Lab | Christian Wilkins",
  description: labDescription,
  keywords: [...siteConfig.keywords, "agentic engineering", "system design lab", "product experiments"],
  alternates: {
    canonical: `${siteConfig.url}/lab`,
  },
  openGraph: {
    title: "The Lab | Christian Wilkins",
    description: labDescription,
    url: `${siteConfig.url}/lab`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins Lab",
      },
    ],
  },
};

type LabNode = {
  title: string;
  href: string;
  description: string;
  state: "live" | "beta" | "building";
  icon: React.ComponentType<{ className?: string }>;
  note: string;
};

const nodes: LabNode[] = [
  {
    title: "Learning Hub",
    href: "/lab/learning",
    description: "Curriculum modules for system design, prompting, and agentic execution.",
    state: "live",
    icon: Compass,
    note: "Start here",
  },
  {
    title: "The Library",
    href: "/lab/books",
    description: "Private, cloud synced reading workflows for PDFs and EPUBs.",
    state: "beta",
    icon: BookOpenText,
    note: "Reader system",
  },
  {
    title: "ChrisWiki OS",
    href: "/terminal",
    description: "Command driven shell for routing, tooling, and style control.",
    state: "live",
    icon: Bot,
    note: "Power surface",
  },
  {
    title: "Supabase Tester",
    href: "/lab/supabase-tester",
    description: "Exposure checks for endpoints, table access, and write paths.",
    state: "live",
    icon: ShieldCheck,
    note: "Security probe",
  },
  {
    title: "FAQ",
    href: "/lab/faq",
    description: "Interactive profile Q and A with conversational context.",
    state: "building",
    icon: MessageSquareText,
    note: "Utility",
  },
];

const stateClass = {
  live: "status-chip status-live",
  beta: "status-chip status-beta",
  building: "status-chip status-prototype",
};

export default function LabPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The Lab",
    description: labDescription,
    url: `${siteConfig.url}/lab`,
  };

  return (
    <div className="relative min-h-screen px-5 py-10 md:px-10 lg:px-16 animate-rise-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="pointer-events-none absolute -top-16 left-10 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-muted/40 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-10">
        <header className="rounded-3xl border border-border/70 bg-card/55 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-primary">
            <Beaker className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">The Lab</span>
          </div>
          <h1 className="mt-4 ui-label text-4xl md:text-5xl font-heading font-bold tracking-tight">Build surface, not just demos</h1>
          <p className="mt-4 max-w-4xl text-lg text-muted-foreground leading-relaxed">
            This is where I run product experiments that need to survive real use.
            Every module is part of a larger operating system for shipping fast without losing quality.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {nodes.map((node) => {
            const Icon = node.icon;
            return (
              <Link key={node.title} href={node.href} className="group block h-full">
                <Card className="h-full border-border/70 bg-card/60 transition-all duration-300 hover:border-foreground/30 hover:shadow-deep">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full border border-border/70 p-2 text-muted-foreground">
                        <Icon className="h-4 w-4" />
                      </span>
                      <Badge variant="outline" className={stateClass[node.state]}>
                        {node.state}
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">{node.title}</CardTitle>
                      <CardDescription className="mt-2 text-base leading-relaxed">{node.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{node.note}</span>
                    <span className="inline-flex items-center gap-1 text-primary transition-transform group-hover:translate-x-1">
                      Enter <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </section>

        <section className="rounded-3xl border border-dashed border-border/70 bg-muted/20 p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Layers3 className="h-4 w-4" />
            <span>Principle: English is the control plane. Architecture is the moat. Automation is leverage.</span>
          </div>
        </section>
      </div>
    </div>
  );
}
