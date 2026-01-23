"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { terminalConsoleCopy, terminalWindowCopy } from "@/data/terminalData";
import { useTerminalEngine, type OutputTone } from "@/components/terminal/use-terminal-engine";

interface TerminalWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const toneClasses: Record<OutputTone, string> = {
  default: "text-terminal-muted",
  muted: "text-terminal-muted",
  accent: "text-terminal-accent",
  success: "text-terminal-accent",
  error: "text-terminal-error",
  system: "text-terminal-text",
};

const MIN_WIDTH = 520;
const MIN_HEIGHT = 320;

export function TerminalWindow({ isOpen, onClose }: TerminalWindowProps) {
  const [position, setPosition] = React.useState({ x: 120, y: 110 });
  const [size, setSize] = React.useState({ width: 760, height: 460 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [hasOpened, setHasOpened] = React.useState(false);
  const dragRef = React.useRef({ startX: 0, startY: 0, originX: 0, originY: 0 });
  const resizeRef = React.useRef({ startX: 0, startY: 0, originW: 0, originH: 0 });

  const {
    history,
    input,
    setInput,
    handleSubmit,
    handleKeyDown,
    inputRef,
    endRef,
  } = useTerminalEngine({ bootOnMount: isOpen });

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    if (isMobile) return;
    if (!hasOpened) {
      const { innerWidth, innerHeight } = window;
      setSize({
        width: Math.min(780, Math.max(MIN_WIDTH, innerWidth * 0.62)),
        height: Math.min(520, Math.max(MIN_HEIGHT, innerHeight * 0.5)),
      });
      setPosition({
        x: Math.max(24, innerWidth * 0.18),
        y: Math.max(24, innerHeight * 0.18),
      });
      setHasOpened(true);
    }
  }, [hasOpened, inputRef, isMobile, isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (!isOpen || !isMobile) return;
    setPosition({ x: 0, y: 0 });
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, [isMobile, isOpen]);

  React.useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMove = (event: PointerEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - dragRef.current.startX;
        const deltaY = event.clientY - dragRef.current.startY;
        const nextX = dragRef.current.originX + deltaX;
        const nextY = dragRef.current.originY + deltaY;
        const maxX = window.innerWidth - size.width - 16;
        const maxY = window.innerHeight - size.height - 16;
        setPosition({
          x: Math.min(Math.max(16, nextX), Math.max(16, maxX)),
          y: Math.min(Math.max(16, nextY), Math.max(16, maxY)),
        });
      }
      if (isResizing) {
        const deltaX = event.clientX - resizeRef.current.startX;
        const deltaY = event.clientY - resizeRef.current.startY;
        const nextWidth = Math.max(MIN_WIDTH, resizeRef.current.originW + deltaX);
        const nextHeight = Math.max(MIN_HEIGHT, resizeRef.current.originH + deltaY);
        const maxWidth = window.innerWidth - position.x - 16;
        const maxHeight = window.innerHeight - position.y - 16;
        setSize({
          width: Math.min(nextWidth, Math.max(MIN_WIDTH, maxWidth)),
          height: Math.min(nextHeight, Math.max(MIN_HEIGHT, maxHeight)),
        });
      }
    };

    const handleUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isDragging, isResizing, position.x, position.y, size.height, size.width]);

  React.useEffect(() => {
    const handleResize = () => {
      if (isMobile) {
        setSize({ width: window.innerWidth, height: window.innerHeight });
        setPosition({ x: 0, y: 0 });
        return;
      }
      const maxX = window.innerWidth - size.width - 16;
      const maxY = window.innerHeight - size.height - 16;
      setPosition({
        x: Math.min(position.x, Math.max(16, maxX)),
        y: Math.min(position.y, Math.max(16, maxY)),
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, position.x, position.y, size.height, size.width]);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    setIsDragging(true);
  };

  const handleResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    event.preventDefault();
    resizeRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originW: size.width,
      originH: size.height,
    };
    setIsResizing(true);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[1400] pointer-events-none transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "terminal-window pointer-events-auto",
          isDragging && "is-dragging",
          isMobile ? "terminal-window-mobile" : "terminal-window-desktop",
          !isOpen && "pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        style={
          isMobile
            ? { width: "100%", height: "100%", transform: "translate3d(0,0,0)" }
            : {
                width: size.width,
                height: size.height,
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`
              }
        }
      >
        <div
          className="terminal-titlebar flex items-center justify-between px-4 py-2"
          onPointerDown={handleDragStart}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              onPointerDown={(event) => event.stopPropagation()}
              className="terminal-control terminal-control-close"
              aria-label="Close terminal"
            >
              <X className="terminal-control-icon" />
            </button>
            <span className="terminal-control terminal-control-min" aria-hidden="true" />
            <span className="terminal-control terminal-control-max" aria-hidden="true" />
          </div>
          <p className="terminal-title text-xs sm:text-sm font-semibold">{terminalWindowCopy.title}</p>
          <span className="terminal-title-status text-[10px] sm:text-xs">{terminalWindowCopy.status}</span>
        </div>

        <div className="terminal-body flex flex-col">
          <div
            className="terminal-output flex-1 overflow-y-auto px-4 py-4 text-xs sm:text-sm"
            onClick={() => inputRef.current?.focus()}
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
          >
            <div className="space-y-2">
              {history.map((entry) => (
                <div key={entry.id} className="whitespace-pre-wrap">
                  {entry.type === "input" ? (
                    <div className="terminal-line">
                      <div className="terminal-prompt">
                        {terminalWindowCopy.promptSegments.map((segment) => (
                          <span
                            key={segment.id}
                            className={cn("terminal-pill", `terminal-pill-${segment.tone}`)}
                          >
                            {segment.label}
                          </span>
                        ))}
                        <span className="terminal-prompt-symbol">{terminalConsoleCopy.promptSymbol}</span>
                      </div>
                      <span className="terminal-command">{entry.content}</span>
                    </div>
                  ) : (
                    <span className={cn("terminal-text", toneClasses[entry.tone ?? "default"])}>
                      {entry.content}
                    </span>
                  )}
                </div>
              ))}
              <div ref={endRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="terminal-inputbar px-4 py-3">
            <div className="terminal-line">
              <div className="terminal-prompt">
                {terminalWindowCopy.promptSegments.map((segment) => (
                  <span
                    key={segment.id}
                    className={cn("terminal-pill", `terminal-pill-${segment.tone}`)}
                  >
                    {segment.label}
                  </span>
                ))}
                <span className="terminal-prompt-symbol">{terminalConsoleCopy.promptSymbol}</span>
              </div>
              <Input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={terminalWindowCopy.inputPlaceholder}
                autoComplete="off"
                spellCheck={false}
                className="terminal-input-field border-0 bg-transparent shadow-none focus-visible:ring-0"
                aria-label="Terminal command"
              />
            </div>
            <div className="terminal-hint text-[10px] sm:text-xs">{terminalWindowCopy.inputHint}</div>
          </form>
        </div>

        {!isMobile && (
          <div
            className="terminal-resize-handle"
            onPointerDown={handleResizeStart}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
