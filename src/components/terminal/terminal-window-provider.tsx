"use client";

import * as React from "react";
import { TerminalWindow } from "@/components/terminal/terminal-window";

interface TerminalWindowContextValue {
  isOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
}

const TerminalWindowContext = React.createContext<TerminalWindowContextValue | null>(null);

export function TerminalWindowProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const openTerminal = React.useCallback(() => setIsOpen(true), []);
  const closeTerminal = React.useCallback(() => setIsOpen(false), []);
  const toggleTerminal = React.useCallback(() => setIsOpen((prev) => !prev), []);

  const value = React.useMemo(
    () => ({ isOpen, openTerminal, closeTerminal, toggleTerminal }),
    [closeTerminal, isOpen, openTerminal, toggleTerminal]
  );

  return (
    <TerminalWindowContext.Provider value={value}>
      {children}
      <TerminalWindow isOpen={isOpen} onClose={closeTerminal} />
    </TerminalWindowContext.Provider>
  );
}

export function useTerminalWindow() {
  const context = React.useContext(TerminalWindowContext);
  if (!context) {
    throw new Error("useTerminalWindow must be used within TerminalWindowProvider");
  }
  return context;
}
