"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardCopy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VibeArc } from "@/data/vibeCoderCurriculum";

type Props = {
  arc: VibeArc;
};

export default function ActivityPanel({ arc }: Props) {
  const [completed, setCompleted] = useState<boolean[]>(arc.activity.instructions.map(() => false));
  const [response, setResponse] = useState("");
  const [copied, setCopied] = useState(false);

  const progress = useMemo(() => {
    const done = completed.filter(Boolean).length;
    return { done, total: completed.length };
  }, [completed]);

  const toggleStep = (index: number) => {
    setCompleted((prev) => prev.map((value, idx) => (idx === index ? !value : value)));
  };

  const reset = () => {
    setCompleted(arc.activity.instructions.map(() => false));
    setResponse("");
    setCopied(false);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(arc.activity.promptTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="border-border/70 bg-card/55">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">Interactive activity — {arc.activity.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{arc.activity.objective}</p>
        <p className="text-xs text-muted-foreground">
          Progress: {progress.done}/{progress.total}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {arc.activity.instructions.map((step, index) => (
            <button
              key={step}
              type="button"
              onClick={() => toggleStep(index)}
              className="w-full rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-left text-sm transition hover:border-primary/40"
            >
              <span className="inline-flex items-start gap-2">
                {completed[index] ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                ) : (
                  <span className="mt-0.5 inline-block h-4 w-4 rounded-full border border-border/70" />
                )}
                <span>{step}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Prompt template</p>
          <pre className="whitespace-pre-wrap rounded-xl border border-border/70 bg-background/70 p-3 text-xs text-muted-foreground">
            {arc.activity.promptTemplate}
          </pre>
          <Button type="button" variant="outline" size="sm" className="inline-flex items-center gap-2" onClick={copyPrompt}>
            <ClipboardCopy className="h-4 w-4" />
            {copied ? "Copied" : "Copy prompt"}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Your concise output draft</p>
          <textarea
            value={response}
            onChange={(event) => setResponse(event.target.value)}
            className="min-h-36 w-full rounded-xl border border-border/70 bg-background/70 p-3 text-sm"
            placeholder="Capture your refined brief, architecture tradeoffs, or execution plan here."
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Success signals</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {arc.activity.successSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>

        <Button type="button" variant="ghost" size="sm" className="inline-flex items-center gap-2" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Reset activity
        </Button>
      </CardContent>
    </Card>
  );
}
