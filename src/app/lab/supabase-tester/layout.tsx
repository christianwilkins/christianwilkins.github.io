import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { InspectorProvider } from "./providers/InspectorProvider";

const testerDescription = "Inspect Supabase endpoints, tables, and write permissions from a single lab workspace.";

export const metadata: Metadata = {
  title: "Supabase Tester | Christian Wilkins",
  description: testerDescription,
  keywords: [...siteConfig.keywords, "supabase tester", "security", "exposure explorer"],
  alternates: {
    canonical: `${siteConfig.url}/lab/supabase-tester`,
  },
  openGraph: {
    title: "Supabase Tester | Christian Wilkins",
    description: testerDescription,
    url: `${siteConfig.url}/lab/supabase-tester`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Supabase Tester",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supabase Tester | Christian Wilkins",
    description: testerDescription,
    images: [siteConfig.image],
  },
};

export default function SupabaseTesterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "font-sans text-[var(--color-ink)] " +
        "[--color-paper:var(--background)] " +
        "[--color-surface:var(--card)] " +
        "[--color-surface-muted:color-mix(in_oklch,var(--muted)_80%,var(--background))] " +
        "[--color-ink:var(--foreground)] " +
        "[--color-ink-muted:var(--muted-foreground)] " +
        "[--color-accent:var(--primary)] " +
        "[--color-accent-strong:color-mix(in_oklch,var(--primary)_85%,var(--foreground))] " +
        "[--color-border:var(--border)] " +
        "[--color-warning:var(--chart-4)] " +
        "[--color-danger:var(--destructive)] " +
        "[--shadow-soft:var(--shadow-1)] " +
        "[--shadow-card:var(--shadow-2)] " +
        "[--radius-card:calc(var(--radius)+0.25rem)] " +
        "[--radius-pill:999px] " +
        "[--font-display:var(--font-sans)] " +
        "[--font-serif:var(--font-heading)] " +
        "[--font-mono:var(--font-mono)]"
      }
    >
      <InspectorProvider>{children}</InspectorProvider>
    </div>
  );
}
