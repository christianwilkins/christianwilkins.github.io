import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BrainCircuit, Compass, Layers3, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/siteConfig";

const pageTitle = "Vibe Coder's Guide to the Galaxy";
const pageDescription =
  "A language agnostic curriculum for agentic engineers who build systems with AI, using English as the control plane and architecture as the edge.";

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

type Arc = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  whyItMatters: string;
  learn: string[];
  drills: string[];
  deliverables: string[];
};

const arcs: Arc[] = [
  {
    id: "arc-1",
    title: "Arc 1 — Systems Thinking over Syntax",
    icon: Compass,
    duration: "Week 1 to 2",
    whyItMatters: "Great builders frame the right problem before they prompt the model.",
    learn: [
      "Problem framing: user pain, constraints, and success metrics.",
      "System boundaries: what you own, what you trust, what can fail.",
      "English specs as source code for AI implementation.",
    ],
    drills: [
      "Rewrite a vague feature ask into a measurable spec.",
      "Define 3 failure modes before writing any code.",
      "Create a one page architecture intent memo.",
    ],
    deliverables: ["Spec template", "Failure mode checklist", "Decision log"],
  },
  {
    id: "arc-2",
    title: "Arc 2 — Prompting as Interface Design",
    icon: Sparkles,
    duration: "Week 3 to 4",
    whyItMatters: "Prompt quality determines solution quality when AI writes most code.",
    learn: [
      "Prompt contracts: goal, constraints, non goals, acceptance tests.",
      "Multi step prompting: plan, implement, verify, refactor.",
      "Guardrails for scope, security, and maintainability.",
    ],
    drills: [
      "Convert one feature into a deterministic prompt pack.",
      "Run adversarial prompts to stress test assumptions.",
      "Build a reusable prompt library per workflow type.",
    ],
    deliverables: ["Prompt contract format", "Prompt library", "Review rubric"],
  },
  {
    id: "arc-3",
    title: "Arc 3 — Core Architecture and System Design",
    icon: Layers3,
    duration: "Week 5 to 7",
    whyItMatters: "AI can generate code fast, but architecture quality decides long term velocity.",
    learn: [
      "Data flow, API boundaries, idempotency, consistency models.",
      "Read and write paths, queues, retries, and backpressure.",
      "Reliability primitives: caching, rate limits, graceful degradation.",
    ],
    drills: [
      "Design one service for 10x traffic with clear tradeoffs.",
      "Write incident playbooks for top three failure classes.",
      "Present architecture in plain English and sequence diagrams.",
    ],
    deliverables: ["System design pack", "Runbook", "Capacity assumptions sheet"],
  },
  {
    id: "arc-4",
    title: "Arc 4 — Agentic Workflows and Automation Loops",
    icon: Workflow,
    duration: "Week 8 to 9",
    whyItMatters: "Agentic engineers orchestrate long running workflows, not single prompts.",
    learn: [
      "Asynchronous job design: queues, retries, compensation actions.",
      "Approval gates for high risk operations.",
      "Budget aware execution and usage telemetry.",
    ],
    drills: [
      "Build one nightly autopilot with quality thresholds.",
      "Add pause and approval checkpoints for risky actions.",
      "Add daily health reports and failure alerts.",
    ],
    deliverables: ["Workflow state machine", "Approval policy", "Cost dashboard"],
  },
  {
    id: "arc-5",
    title: "Arc 5 — Product, Security, and Professional Execution",
    icon: ShieldCheck,
    duration: "Week 10 to 12",
    whyItMatters: "Shipping value consistently beats shipping demos.",
    learn: [
      "Product loops: discover, ship, measure, iterate.",
      "Security baseline: least privilege, secret handling, audit trails.",
      "Professional engineering: docs, changelogs, handoffs, and tradeoff communication.",
    ],
    drills: [
      "Run one end to end feature from idea to production notes.",
      "Perform a mini security audit and remediation pass.",
      "Write an executive update with metrics and next bets.",
    ],
    deliverables: ["Launch report", "Security checklist", "Stakeholder brief"],
  },
];

const capstoneTracks = [
  "Design and ship a customer facing system with AI pair coding and strict quality gates.",
  "Demonstrate resilience under failure scenarios with a documented incident response.",
  "Show measurable business impact using a before and after metrics narrative.",
];

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
            This curriculum trains a new kind of engineer: one who uses English as the control plane,
            AI as leverage, and systems thinking as the real moat. No syntax drills. No framework worship.
            Just architecture, prompting, product judgment, and execution quality.
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
          <div className="grid gap-5 md:grid-cols-2">
            {arcs.map((arc) => {
              const Icon = arc.icon;
              return (
                <Card key={arc.id} className="border-border/70 bg-card/60 shadow-soft">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-xl leading-tight">{arc.title}</CardTitle>
                      <span className="inline-flex items-center rounded-full border border-border/70 p-2 text-muted-foreground">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <CardDescription>{arc.duration}</CardDescription>
                    <p className="text-sm text-muted-foreground">{arc.whyItMatters}</p>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <p className="mb-2 font-medium">What to learn</p>
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
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-border/70 bg-card/40 p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Capstone: agentic engineer in the wild</h2>
          <p className="text-muted-foreground">
            Graduate by shipping one real system and proving quality under real constraints.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {capstoneTracks.map((track) => (
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
