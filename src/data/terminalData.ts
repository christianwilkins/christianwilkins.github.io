import { contactLinks } from "@/data/contactData";
import { primaryNavItems } from "@/data/navigation";

export interface TerminalRoute {
  id: string;
  label: string;
  path: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
}

export interface TerminalModule {
  id: string;
  title: string;
  status: string;
  description: string;
  commands: string[];
  details: string[];
}

export interface TerminalSocialLink {
  id: string;
  label: string;
  value: string;
}

export interface TerminalOutputLine {
  text: string;
  tone?: "default" | "muted" | "accent" | "success" | "error" | "system";
}

export interface TerminalPromptSegment {
  id: string;
  label: string;
  tone: "a" | "b" | "c" | "muted";
}

export const terminalPageContent = {
  badge: "ChrisWiki OS",
  badgeNote: "Command deck",
  title: "Terminal",
  description: "A modular command surface that routes the portfolio and remixes the live style system.",
};

export const terminalConsoleCopy = {
  title: "ChrisWiki OS Console",
  subtitle: "Live routing, style controls, and modules",
  windowBadge: "Beta",
  modulePanelTitle: "Active Module",
  modulePanelSubtitle: "ChrisWiki OS workspace",
  quickCommandsTitle: "Quick Commands",
  quickCommandsAction: "Activate",
  systemPulseTitle: "System Pulse",
  systemPulseButton: "Snapshot Status",
  inputPlaceholder: "Type a command...",
  inputTip: "Tip: use ↑ ↓ to cycle history. Ctrl+L clears the console.",
  promptUser: "cw@os",
  promptShort: "cw",
  promptSymbol: "❯",
};

export const terminalWindowCopy = {
  title: "cw@os — zsh",
  status: "active",
  inputPlaceholder: "Type a command...",
  inputHint: "Press Enter to run. Use ↑ ↓ for history.",
  promptSegments: [
    { id: "user", label: "chris", tone: "a" },
    { id: "path", label: "~/christianwilkins", tone: "b" },
    { id: "git", label: "main", tone: "c" },
  ] satisfies TerminalPromptSegment[],
};

export const terminalBootSequence: TerminalOutputLine[] = [
  { text: "ChrisWiki OS v0.9.1", tone: "system" },
  { text: "Boot sequence: ready", tone: "muted" },
  { text: "Modules online: navigator, atlas, relay, chronicle, style-lab, signal, wiki", tone: "muted" },
  { text: "Type 'help' to list commands.", tone: "accent" },
  { text: "Try: open projects | style palette gallery | launch wiki", tone: "muted" },
];

export const terminalProfile = [
  "Christian Wilkins",
  "Software consultant and engineer",
  "Focus: AI workflows, product design, and startups",
  "Use 'contact' for a quick intro.",
];

export const terminalWikiStory = [
  "ChrisWiki OS: a living index of experiments and tools.",
  "Each module is a mini app for navigating the portfolio.",
  "Try: launch atlas | launch relay | launch chronicle",
  "Use 'launch <module>' to switch context.",
];

export const terminalTips = {
  projects: "Tip: use 'open projects' to browse the full page.",
  contact: "Tip: use 'open contact' for the full page.",
  now: "Use 'projects' or 'contact' to go deeper.",
};

export const terminalPingMessage = "Signal check: all systems nominal.";

const seoRoutes: TerminalRoute[] = [
  { id: "services", label: "Services", path: "/services" },
  { id: "consulting", label: "Consulting", path: "/consulting" },
  { id: "faq", label: "FAQ", path: "/faq" },
  { id: "insights", label: "Insights", path: "/insights" },
  { id: "resources", label: "Resources", path: "/resources" },
  { id: "case-studies", label: "Case Studies", path: "/case-studies" },
];

const labRoutes: TerminalRoute[] = [
  { id: "books", label: "Library", path: "/lab/books" },
  { id: "learning", label: "Learning Hub", path: "/lab/learning" },
  { id: "lab-faq", label: "FAQ", path: "/lab/faq" },
];

export const terminalRoutes: TerminalRoute[] = [
  ...primaryNavItems.map((item) => ({ id: item.id, label: item.label, path: item.href })),
  ...seoRoutes,
  ...labRoutes,
];

export const terminalCommandGuide: TerminalCommand[] = [
  { command: "help", description: "Show all commands" },
  { command: "routes", description: "List available routes" },
  { command: "open <route>", description: "Navigate to a route" },
  { command: "projects", description: "Show featured projects" },
  { command: "projects all", description: "List all projects" },
  { command: "stack", description: "Show tech stack" },
  { command: "style <key> <value>", description: "Update visual settings" },
  { command: "style list", description: "List style keys" },
  { command: "style preset <id>", description: "Apply a preset" },
  { command: "theme <light|dark|system>", description: "Switch theme" },
  { command: "modules", description: "List ChrisWiki modules" },
  { command: "launch <module>", description: "Activate a module" },
  { command: "wiki", description: "Open the ChrisWiki OS story" },
  { command: "contact", description: "Show contact shortcuts" },
  { command: "social", description: "Show social links" },
  { command: "now", description: "Show current focus" },
  { command: "ping", description: "Check system health" },
  { command: "status", description: "Show system status" },
  { command: "whoami", description: "Show profile summary" },
  { command: "time", description: "Show local time" },
  { command: "clear", description: "Clear the console" },
  { command: "echo <text>", description: "Print a custom line" },
];

export const terminalModules: TerminalModule[] = [
  {
    id: "navigator",
    title: "Navigator",
    status: "Online",
    description: "Route mapping and quick jumps",
    commands: ["open projects", "open lab", "open contact"],
    details: [
      "Route aliases are available for all major pages.",
      "Use 'routes' to list every available jump.",
    ],
  },
  {
    id: "atlas",
    title: "Atlas",
    status: "Curated",
    description: "Portfolio project registry",
    commands: ["projects", "projects all", "stack"],
    details: [
      "Highlights featured case studies and impact.",
      "Use 'projects all' to list the full archive.",
    ],
  },
  {
    id: "relay",
    title: "Relay",
    status: "Online",
    description: "Contact channels and socials",
    commands: ["contact", "social", "open contact"],
    details: [
      "Keeps outreach links close at hand.",
      "Built for fast handoff and booking.",
    ],
  },
  {
    id: "chronicle",
    title: "Chronicle",
    status: "Active",
    description: "Now playing and current focus",
    commands: ["now", "time", "status"],
    details: [
      "Tracks realtime status and timing.",
      "Use it to orient before exploring.",
    ],
  },
  {
    id: "style-lab",
    title: "Style Lab",
    status: "Live",
    description: "Palette, layout, and motion control",
    commands: ["style palette gallery", "style layout atelier", "style ambient on"],
    details: [
      "Changes sync with the Style drawer instantly.",
      "Use 'style list' to browse options.",
    ],
  },
  {
    id: "signal",
    title: "Signal Monitor",
    status: "Stable",
    description: "Status reads for the portfolio",
    commands: ["status", "ping", "whoami"],
    details: [
      "Outputs the current system snapshot.",
      "Designed for quick context while browsing.",
    ],
  },
  {
    id: "wiki",
    title: "ChrisWiki OS",
    status: "Experimental",
    description: "A narrative shell for the portfolio",
    commands: ["launch wiki", "modules", "help"],
    details: [
      "Treat each module as a mini app.",
      "More interfaces will arrive over time.",
    ],
  },
];

export const terminalSocialLinks: TerminalSocialLink[] = contactLinks.map((link) => ({
  id: link.id,
  label: link.label,
  value: link.url,
}));

export const terminalNow = [
  "Building modular UI systems and AI workflow experiments.",
  "Exploring agentic product tooling and interaction patterns.",
  "Available for select consulting and product builds.",
];
