"use client";

import * as React from "react";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTerminalWindow } from "@/components/terminal/terminal-window-provider";
import { terminalPageContent, terminalWindowCopy } from "@/data/terminalData";

export function TerminalPageClient() {
  const { openTerminal } = useTerminalWindow();

  React.useEffect(() => {
    openTerminal();
  }, [openTerminal]);

  return (
    <div className="mt-6 flex flex-col items-start gap-4">
      <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-muted-foreground">
        <Terminal className="h-4 w-4" />
        {terminalWindowCopy.title}
      </div>
      <p className="text-sm text-muted-foreground max-w-xl">
        {terminalPageContent.description}
      </p>
      <Button type="button" onClick={openTerminal}>
        Open Terminal Window
      </Button>
    </div>
  );
}
