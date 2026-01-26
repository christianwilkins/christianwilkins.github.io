"use client";

import * as React from "react";
import { Activity, ChevronRight, Cpu, Terminal, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { terminalConsoleCopy } from "@/data/terminalData";
import { useTerminalEngine, type OutputTone } from "@/components/terminal/use-terminal-engine";

const toneClasses: Record<OutputTone, string> = {
  default: "text-foreground/80",
  muted: "text-muted-foreground",
  accent: "text-primary",
  success: "text-primary",
  error: "text-destructive",
  system: "text-foreground",
};

export function TerminalConsole() {
  const {
    history,
    input,
    setInput,
    handleSubmit,
    handleKeyDown,
    runCommand,
    inputRef,
    endRef,
    activeModule,
    modules,
    styleSnapshot,
    theme,
  } = useTerminalEngine();

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] items-start">
      <section className="terminal-panel flex flex-col min-h-[420px] max-h-[70vh]">
        <header className="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="terminal-dot terminal-dot-accent h-2.5 w-2.5" aria-hidden="true" />
              <span className="terminal-dot terminal-dot-muted h-2.5 w-2.5" aria-hidden="true" />
              <span className="terminal-dot terminal-dot-primary h-2.5 w-2.5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                {terminalConsoleCopy.title}
              </p>
              <p className="text-xs text-muted-foreground">{terminalConsoleCopy.subtitle}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-[11px]">{terminalConsoleCopy.windowBadge}</Badge>
        </header>

        <div className="flex flex-1 min-h-0 flex-col gap-4 p-4 sm:p-5">
          <div
            className="terminal-screen flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 text-xs sm:text-sm font-mono leading-relaxed"
            onClick={() => inputRef.current?.focus()}
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
          >
            <div className="space-y-2">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className={cn(
                    "whitespace-pre-wrap terminal-text",
                    entry.type === "output" && toneClasses[entry.tone ?? "default"]
                  )}
                >
                  {entry.type === "input" ? (
                    <span className="text-foreground">
                      <span className="text-muted-foreground">{terminalConsoleCopy.promptUser}</span>
                      <span className="text-primary"> {terminalConsoleCopy.promptSymbol} </span>
                      {entry.content}
                    </span>
                  ) : (
                    entry.content
                  )}
                </div>
              ))}
              <div ref={endRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="terminal-input flex items-center gap-2 px-3 py-2">
              <span className="text-xs font-semibold text-muted-foreground">{terminalConsoleCopy.promptShort}</span>
              <Input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={terminalConsoleCopy.inputPlaceholder}
                autoComplete="off"
                spellCheck={false}
                className="h-8 border-0 bg-transparent px-0 text-sm font-mono focus-visible:ring-0"
                aria-label="Terminal command"
              />
              <Button type="submit" size="sm" variant="secondary" className="shrink-0">
                Run
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">{terminalConsoleCopy.inputTip}</p>
          </form>
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <div className="surface-panel rounded-2xl border border-border/70 p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold">{terminalConsoleCopy.modulePanelTitle}</p>
              <p className="text-xs text-muted-foreground">{terminalConsoleCopy.modulePanelSubtitle}</p>
            </div>
            <Badge variant="secondary" className="text-[11px]">{activeModule.status}</Badge>
          </div>
          <div className="space-y-2">
            <p className="text-base font-semibold flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              {activeModule.title}
            </p>
            <p className="text-sm text-muted-foreground">{activeModule.description}</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              {activeModule.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {activeModule.commands.map((command) => (
                <Button
                  key={command}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => runCommand(command)}
                  className="text-xs font-mono"
                >
                  {command}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-panel rounded-2xl border border-border/70 p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold">{terminalConsoleCopy.quickCommandsTitle}</p>
            <Wand2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {module.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => runCommand(`launch ${module.id}`)}
                    className="text-xs text-primary flex items-center gap-1"
                  >
                    {terminalConsoleCopy.quickCommandsAction} <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {module.commands.map((command) => (
                    <Button
                      key={command}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => runCommand(command)}
                      className="text-xs font-mono"
                    >
                      {command}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel rounded-2xl border border-border/70 p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold">{terminalConsoleCopy.systemPulseTitle}</p>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Theme: <span className="text-foreground">{theme ?? "system"}</span></p>
            <p>Palette: <span className="text-foreground">{styleSnapshot.palette}</span></p>
            <p>Layout: <span className="text-foreground">{styleSnapshot.layout}</span></p>
            <p>Nav: <span className="text-foreground">{styleSnapshot.nav}</span></p>
            <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("status")}>
              {terminalConsoleCopy.systemPulseButton}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
