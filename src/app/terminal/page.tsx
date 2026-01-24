import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { TerminalPageClient } from "@/components/terminal/terminal-page-client";
import { terminalPageContent } from "@/data/terminalData";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Terminal | Christian Wilkins",
  description: "ChrisWiki OS terminal for routing, style control, and portfolio navigation.",
  alternates: {
    canonical: `${siteConfig.url}/terminal`,
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function TerminalPage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-rise-in">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-xs">{terminalPageContent.badge}</Badge>
          <span className="text-xs text-muted-foreground">{terminalPageContent.badgeNote}</span>
        </div>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">{terminalPageContent.title}</h1>
        <p className="text-base sm:text-lg text-muted-foreground">{terminalPageContent.description}</p>
      </header>
      <TerminalPageClient />
    </div>
  );
}
