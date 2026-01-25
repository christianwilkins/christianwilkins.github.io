"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { projects } from "@/data/projectsData";
import {
  terminalBootSequence,
  terminalCommandGuide,
  terminalModules,
  terminalRoutes,
  terminalSocialLinks,
  terminalNow,
  terminalProfile,
  terminalWikiStory,
  terminalTips,
  terminalPingMessage,
} from "@/data/terminalData";
import {
  STORAGE_KEYS,
  presets,
  palettes,
  fontSets,
  caseSets,
  motionSets,
  blurSets,
  radiusSets,
  shadowSets,
  densitySets,
  ambientSets,
  layoutSets,
  alignSets,
  navSets,
  terminalSets,
  setRootData,
  type StyleSettingKey,
} from "@/lib/style-config";

export type OutputTone = "default" | "muted" | "accent" | "success" | "error" | "system";

export interface TerminalEntry {
  id: string;
  type: "input" | "output";
  content: string;
  tone?: OutputTone;
}

interface UseTerminalEngineOptions {
  bootOnMount?: boolean;
}

const styleOptions: Record<StyleSettingKey, string[]> = {
  palette: palettes.map((item) => item.id),
  font: fontSets.map((item) => item.id),
  motion: motionSets.map((item) => item.id),
  blur: blurSets.map((item) => item.id),
  radius: radiusSets.map((item) => item.id),
  shadow: shadowSets.map((item) => item.id),
  density: densitySets.map((item) => item.id),
  ambient: ambientSets.map((item) => item.id),
  layout: layoutSets.map((item) => item.id),
  align: alignSets.map((item) => item.id),
  nav: navSets.map((item) => item.id),
  case: caseSets.map((item) => item.id),
  terminal: terminalSets.map((item) => item.id),
};

export function useTerminalEngine(options: UseTerminalEngineOptions = {}) {
  const { bootOnMount = true } = options;
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [history, setHistory] = React.useState<TerminalEntry[]>([]);
  const [input, setInput] = React.useState("");
  const [activeModuleId, setActiveModuleId] = React.useState(terminalModules[0]?.id ?? "navigator");
  const [historyIndex, setHistoryIndex] = React.useState<number | null>(null);
  const [styleSnapshot, setStyleSnapshot] = React.useState({
    palette: "signal",
    layout: "classic",
    nav: "sidebar",
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);
  const entryId = React.useRef(0);

  const activeModule = terminalModules.find((module) => module.id === activeModuleId) ?? terminalModules[0];

  const nextId = React.useCallback(() => {
    entryId.current += 1;
    return `entry-${entryId.current}`;
  }, []);

  const pushOutput = React.useCallback(
    (lines: string[], tone: OutputTone = "default") => {
      setHistory((prev) => [
        ...prev,
        ...lines.map((line) => ({
          id: nextId(),
          type: "output" as const,
          content: line,
          tone,
        })),
      ]);
    },
    [nextId]
  );

  const pushInput = React.useCallback(
    (command: string) => {
      setHistory((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "input" as const,
          content: command,
        },
      ]);
    },
    [nextId]
  );

  const refreshStyleSnapshot = React.useCallback(() => {
    if (typeof document === "undefined") return;
    const { palette, layout, nav } = document.documentElement.dataset;
    setStyleSnapshot({
      palette: palette ?? "signal",
      layout: layout ?? "classic",
      nav: nav ?? "sidebar",
    });
  }, []);

  React.useEffect(() => {
    if (!bootOnMount || history.length) return;
    const timeouts = terminalBootSequence.map((line, index) =>
      window.setTimeout(() => {
        pushOutput([line.text], line.tone ?? "default");
      }, index * 140)
    );

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [bootOnMount, history.length, pushOutput]);

  React.useEffect(() => {
    if (!bootOnMount) return;
    inputRef.current?.focus();
  }, [bootOnMount]);

  React.useEffect(() => {
    refreshStyleSnapshot();
  }, [refreshStyleSnapshot]);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const observer = new MutationObserver(() => refreshStyleSnapshot());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-palette", "data-layout", "data-nav"],
    });
    return () => observer.disconnect();
  }, [refreshStyleSnapshot]);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [history]);

  const commandHistory = React.useMemo(
    () => history.filter((entry) => entry.type === "input").map((entry) => entry.content),
    [history]
  );

  const listRoutes = React.useCallback(() => {
    const lines = terminalRoutes.map((route) => `${route.id.padEnd(12)} ${route.path}`);
    pushOutput(["Routes:", ...lines], "system");
  }, [pushOutput]);

  const listModules = React.useCallback(() => {
    const lines = terminalModules.map(
      (module) => `${module.id.padEnd(12)} ${module.title} (${module.status})`
    );
    pushOutput(["Modules:", ...lines], "system");
  }, [pushOutput]);

  const setStyleValue = React.useCallback(
    (key: StyleSettingKey, value: string, markCustom = true) => {
      if (typeof window === "undefined") return;
      localStorage.setItem(STORAGE_KEYS[key], value);
      if (markCustom) {
        localStorage.setItem(STORAGE_KEYS.preset, "custom");
      }
      setRootData(key, value);
      refreshStyleSnapshot();
    },
    [refreshStyleSnapshot]
  );

  const applyPreset = React.useCallback((presetId: string) => {
    if (typeof window === "undefined") return;
    const preset = presets.find((item) => item.id === presetId);
    if (!preset) {
      pushOutput([`Preset '${presetId}' not found.`], "error");
      return;
    }
    Object.entries(preset.values).forEach(([key, value]) => {
      setStyleValue(key as StyleSettingKey, value, false);
    });
    localStorage.setItem(STORAGE_KEYS.preset, preset.id);
    refreshStyleSnapshot();
    pushOutput([`Preset applied: ${preset.name}`], "success");
  }, [pushOutput, refreshStyleSnapshot, setStyleValue]);

  const handleStyle = React.useCallback(
    (args: string[]) => {
      const [rawFirst, rawSecond] = args;
      const first = rawFirst?.toLowerCase();
      const second = rawSecond?.toLowerCase();
      if (!first) {
        pushOutput([
          "Style controls:",
          "- style list",
          "- style <key> <value>",
          "- style preset <id>",
        ], "system");
        return;
      }

      if (first === "list") {
        const lines = Object.entries(styleOptions).map(
          ([key, values]) => `${key.padEnd(10)} ${values.join(" | ")}`
        );
        pushOutput(["Style keys:", ...lines], "system");
        return;
      }

      if (first === "preset") {
        if (!second) {
          const presetList = presets.map((item) => `${item.id.padEnd(10)} ${item.name}`);
          pushOutput(["Available presets:", ...presetList], "system");
          return;
        }
        applyPreset(second);
        return;
      }

      if (!Object.keys(styleOptions).includes(first)) {
        pushOutput([`Unknown style key: ${first}. Use 'style list'.`], "error");
        return;
      }

      const key = first as StyleSettingKey;
      const available = styleOptions[key];
      if (!second) {
        pushOutput([`${key} options: ${available.join(" | ")}`], "system");
        return;
      }
      if (available.length && !available.includes(second)) {
        pushOutput([`Invalid value '${second}' for ${key}.`], "error");
        return;
      }

      setStyleValue(key, second ?? "");
      pushOutput([`Updated ${key} to ${second}.`], "success");
    },
    [applyPreset, pushOutput, setStyleValue]
  );

  const resolveRoute = React.useCallback((target: string) => {
    const normalized = target.toLowerCase();
    return terminalRoutes.find(
      (route) => route.id === normalized || route.label.toLowerCase() === normalized || route.path === target
    );
  }, []);

  const handleNavigate = React.useCallback(
    (args: string[]) => {
      const target = args[0]?.toLowerCase();
      if (!target) {
        pushOutput(["Usage: open <route>", "Try: routes"], "muted");
        return;
      }
      const route = resolveRoute(target);
      if (!route) {
        pushOutput([`Route not found: ${target}`, "Use 'routes' to list options."], "error");
        return;
      }
      pushOutput([`Routing to ${route.path}...`], "accent");
      router.push(route.path);
    },
    [pushOutput, resolveRoute, router]
  );

  const handleProjects = React.useCallback(
    (args: string[]) => {
      const mode = args[0]?.toLowerCase();
      const list = mode === "all" ? projects : projects.filter((project) => project.featured);
      if (!list.length) {
        pushOutput(["No projects found."], "muted");
        return;
      }
      const lines = list.map((project) => `${project.title} — ${project.summary}`);
      pushOutput([
        mode === "all" ? "Project archive:" : "Featured projects:",
        ...lines,
        terminalTips.projects,
      ], "system");
    },
    [pushOutput]
  );

  const handleStack = React.useCallback(() => {
    const stack = Array.from(new Set(projects.flatMap((project) => project.technologies))).sort(
      (a, b) => a.localeCompare(b)
    );
    const lines: string[] = [];
    for (let i = 0; i < stack.length; i += 6) {
      lines.push(stack.slice(i, i + 6).join(" | "));
    }
    pushOutput(["Stack:", ...lines], "system");
  }, [pushOutput]);

  const handleContact = React.useCallback(() => {
    const lines = terminalSocialLinks.map((link) => `${link.label.padEnd(12)} ${link.value}`);
    pushOutput(["Contact channels:", ...lines, terminalTips.contact], "system");
  }, [pushOutput]);

  const handleSocial = React.useCallback(() => {
    const socials = terminalSocialLinks.filter((link) =>
      ["github", "linkedin", "twitter"].includes(link.id)
    );
    const lines = socials.map((link) => `${link.label.padEnd(10)} ${link.value}`);
    pushOutput(["Social links:", ...lines], "system");
  }, [pushOutput]);

  const handleNow = React.useCallback(() => {
    pushOutput(["Now:", ...terminalNow, terminalTips.now], "system");
  }, [pushOutput]);

  const handlePing = React.useCallback(() => {
    pushOutput([terminalPingMessage], "success");
  }, [pushOutput]);

  const handleTheme = React.useCallback((args: string[]) => {
    const option = args[0]?.toLowerCase();
    if (!option) {
      pushOutput([`Theme is ${theme ?? "system"}.`], "system");
      return;
    }
    if (!["light", "dark", "system"].includes(option)) {
      pushOutput(["Theme options: light | dark | system"], "muted");
      return;
    }
    setTheme(option);
    pushOutput([`Theme set to ${option}.`], "success");
  }, [pushOutput, setTheme, theme]);

  const handleLaunch = React.useCallback(
    (args: string[]) => {
      const target = args[0];
      if (!target) {
        listModules();
        return;
      }
      const moduleEntry = terminalModules.find((item) => item.id === target);
      if (!moduleEntry) {
        pushOutput([`Module not found: ${target}`], "error");
        return;
      }
      setActiveModuleId(moduleEntry.id);
      pushOutput([`Module active: ${moduleEntry.title}`], "success");
    },
    [listModules, pushOutput]
  );

  const handleStatus = React.useCallback(() => {
    const now = new Date();
    const snapshot = [
      `Theme: ${theme ?? "system"}`,
      `Time: ${now.toLocaleTimeString()}`,
      `Layout: ${styleSnapshot.layout}`,
      `Palette: ${styleSnapshot.palette}`,
      `Nav: ${styleSnapshot.nav}`,
    ];
    pushOutput(["Status:", ...snapshot], "system");
  }, [pushOutput, styleSnapshot, theme]);

  const handleWiki = React.useCallback(() => {
    const wikiModule = terminalModules.find((item) => item.id === "wiki");
    if (wikiModule) {
      setActiveModuleId(wikiModule.id);
    }
    pushOutput(terminalWikiStory, "system");
  }, [pushOutput]);

  const handleWhoAmI = React.useCallback(() => {
    pushOutput(terminalProfile, "system");
  }, [pushOutput]);

  const handleTime = React.useCallback(() => {
    const now = new Date();
    pushOutput([now.toLocaleString()], "system");
  }, [pushOutput]);

  const runCommand = React.useCallback(
    (commandLine: string) => {
      const trimmed = commandLine.trim();
      if (!trimmed) return;
      setInput("");
      setHistoryIndex(null);
      pushInput(trimmed);
      const [command, ...args] = trimmed.split(/\s+/);
      const normalized = command.toLowerCase();

      if (normalized === "help") {
        const lines = terminalCommandGuide.map(
          (item) => `${item.command.padEnd(18)} ${item.description}`
        );
        pushOutput(["Commands:", ...lines], "system");
        return;
      }
      if (normalized === "routes") {
        listRoutes();
        return;
      }
      if (["open", "goto", "route"].includes(normalized)) {
        handleNavigate(args);
        return;
      }
      if (normalized === "projects") {
        handleProjects(args);
        return;
      }
      if (normalized === "stack") {
        handleStack();
        return;
      }
      if (normalized === "style") {
        handleStyle(args);
        return;
      }
      if (normalized === "theme") {
        handleTheme(args);
        return;
      }
      if (normalized === "modules") {
        listModules();
        return;
      }
      if (normalized === "launch") {
        handleLaunch(args);
        return;
      }
      if (normalized === "wiki") {
        handleWiki();
        return;
      }
      if (normalized === "contact") {
        handleContact();
        return;
      }
      if (normalized === "social") {
        handleSocial();
        return;
      }
      if (normalized === "now") {
        handleNow();
        return;
      }
      if (normalized === "ping") {
        handlePing();
        return;
      }
      if (normalized === "status") {
        handleStatus();
        return;
      }
      if (normalized === "whoami") {
        handleWhoAmI();
        return;
      }
      if (normalized === "time" || normalized === "date") {
        handleTime();
        return;
      }
      if (normalized === "clear") {
        setHistory([]);
        return;
      }
      if (normalized === "echo") {
        pushOutput([args.join(" ") || ""], "system");
        return;
      }

      pushOutput([`Command not found: ${command}. Type 'help'.`], "error");
    },
    [
      handleContact,
      handleLaunch,
      handleNavigate,
      handleNow,
      handlePing,
      handleProjects,
      handleSocial,
      handleStack,
      handleStatus,
      handleStyle,
      handleTheme,
      handleTime,
      handleWhoAmI,
      handleWiki,
      listModules,
      listRoutes,
      pushInput,
      pushOutput,
    ]
  );

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
  }, [input, runCommand]);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!commandHistory.length) return;
      const nextIndex = historyIndex === null
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!commandHistory.length) return;
      if (historyIndex === null) return;
      const nextIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
      if (nextIndex === historyIndex && historyIndex === commandHistory.length - 1) {
        setHistoryIndex(null);
        setInput("");
        return;
      }
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] ?? "");
      return;
    }
    if (event.key.toLowerCase() === "l" && event.ctrlKey) {
      event.preventDefault();
      setHistory([]);
    }
    if (historyIndex !== null) {
      setHistoryIndex(null);
    }
  }, [commandHistory, historyIndex]);

  return {
    history,
    input,
    setInput,
    handleSubmit,
    handleKeyDown,
    runCommand,
    inputRef,
    endRef,
    activeModule,
    modules: terminalModules,
    styleSnapshot,
    theme,
  };
}
