"use client";

import { Fragment } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type GlossaryEntry = {
  term: string;
  definition: string;
  whyItMatters: string;
};

type Segment =
  | { type: "text"; value: string }
  | { type: "term"; value: string; label: string };

const glossaryEntries: Record<string, GlossaryEntry> = {
  "control plane": {
    term: "Control plane",
    definition: "The part of a system that decides what should happen next.",
    whyItMatters: "Product teams can encode decisions in language and rules before writing deep automation code.",
  },
  "semantic expectation": {
    term: "Semantic expectation",
    definition: "A meaning based rule that checks whether a screen reflects the right user intent.",
    whyItMatters: "This catches UI drift that simple selector checks often miss.",
  },
  "interaction friction": {
    term: "Interaction friction",
    definition: "Any extra effort required for a user to complete a task.",
    whyItMatters: "Reducing friction usually improves completion rates and user confidence.",
  },
  "agentic loop": {
    term: "Agentic loop",
    definition: "A repeated cycle where an agent plans, acts, validates, then adapts.",
    whyItMatters: "It creates reliable automation by turning one-shot scripts into self correcting flows.",
  },
  "progressive disclosure": {
    term: "Progressive disclosure",
    definition: "Show core information first, then reveal detail as needed.",
    whyItMatters: "Readers can scan quickly without losing access to depth.",
  },
};

const demoParagraphs = [
  "In modern web tools, [[progressive disclosure]] helps readers absorb ideas without facing a wall of text.",
  "When teams treat plain language as a [[control plane]], product intent stays clear across design and engineering.",
  "Automations become more robust when each [[agentic loop]] validates against a [[semantic expectation]] instead of brittle selectors.",
  "The final quality win is lower [[interaction friction]], which makes features feel calm and obvious to users.",
];

const pretextSource = `In modern web tools, [[progressive disclosure]] helps readers absorb ideas without facing a wall of text.
When teams treat plain language as a [[control plane]], product intent stays clear across design and engineering.
Automations become more robust when each [[agentic loop]] validates against a [[semantic expectation]] instead of brittle selectors.
The final quality win is lower [[interaction friction]], which makes features feel calm and obvious to users.`;

const tokenPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

function parsePretextLine(line: string): Segment[] {
  const segments: Segment[] = [];
  let pointer = 0;

  for (const match of line.matchAll(tokenPattern)) {
    const [raw, rawTerm, rawLabel] = match;
    if (match.index === undefined) continue;

    if (match.index > pointer) {
      segments.push({ type: "text", value: line.slice(pointer, match.index) });
    }

    const normalizedTerm = rawTerm.trim().toLowerCase();
    const label = (rawLabel ?? rawTerm).trim();

    segments.push({ type: "term", value: normalizedTerm, label });
    pointer = match.index + raw.length;
  }

  if (pointer < line.length) {
    segments.push({ type: "text", value: line.slice(pointer) });
  }

  return segments;
}

function GlossaryToken({ value, label }: { value: string; label: string }) {
  const entry = glossaryEntries[value];

  if (!entry) {
    return <span className="font-medium underline decoration-dotted underline-offset-4">{label}</span>;
  }

  return (
    <HoverCard openDelay={120} closeDelay={120}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="rounded-sm border-b border-dotted border-primary/70 font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label={`Show glossary definition for ${entry.term}`}
        >
          {label}
        </button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-[min(22rem,calc(100vw-2.5rem))] space-y-2">
        <p className="text-sm font-semibold text-foreground">{entry.term}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{entry.definition}</p>
        <p className="text-xs leading-relaxed text-muted-foreground/90">Why it matters: {entry.whyItMatters}</p>
      </HoverCardContent>
    </HoverCard>
  );
}

export function PretextInlineDemo() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border/70 bg-background p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Native renderer preview</p>
          <p className="text-xs text-muted-foreground">Tap or hover highlighted terms</p>
        </div>
        <div className="mt-3 space-y-4 text-sm sm:text-base leading-relaxed text-foreground">
          {demoParagraphs.map((line, lineIndex) => {
            const segments = parsePretextLine(line);

            return (
              <p key={`line-${lineIndex}`}>
                {segments.map((segment, segmentIndex) => (
                  <Fragment key={`segment-${lineIndex}-${segmentIndex}`}>
                    {segment.type === "text" ? (
                      segment.value
                    ) : (
                      <GlossaryToken value={segment.value} label={segment.label} />
                    )}
                  </Fragment>
                ))}
              </p>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sample pretext source</p>
        <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground sm:max-h-none sm:text-sm">
          {pretextSource}
        </pre>
      </div>
    </div>
  );
}
