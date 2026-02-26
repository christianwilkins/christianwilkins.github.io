export type LearningModuleStatus = "live" | "beta" | "prototype" | "planned";

export type LearningModule = {
  id: string;
  title: string;
  description: string;
  topics: string[];
  status: LearningModuleStatus;
  stack: string[];
  href?: string;
  track?: "foundation" | "systems" | "product" | "execution";
  level?: "starter" | "intermediate" | "advanced";
  duration?: string;
  outcome?: string;
  isTemplate?: boolean;
};

export const learningModules: LearningModule[] = [
  {
    id: "vibe-coder-guide-galaxy",
    title: "Vibe Coder's Guide to the Galaxy",
    description:
      "A language agnostic curriculum for agentic engineers. Focuses on systems, prompting, architecture, and delivery without syntax drills.",
    topics: ["System design", "Prompting", "Agentic workflows", "Product"],
    status: "live",
    stack: ["English-first", "AI copilots", "Design docs", "Postmortems"],
    href: "/lab/learning/vibe-coders-guide",
    track: "foundation",
    level: "starter",
    duration: "12 weeks",
    outcome: "Ship production grade systems using AI driven development loops.",
  },
  {
    id: "agentic-ops-patterns",
    title: "Agentic Ops Patterns",
    description:
      "Hands on patterns for long running agents, retries, approvals, and budget safe automation.",
    topics: ["Operations", "Reliability", "Automation"],
    status: "beta",
    stack: ["Queue design", "Runbooks", "Alerts"],
    track: "execution",
    level: "intermediate",
    duration: "4 weeks",
    outcome: "Design async workflows that run safely without constant supervision.",
  },
  {
    id: "system-design-storyboards",
    title: "System Design Storyboards",
    description:
      "Turn architecture decisions into narrative diagrams and tradeoff memos for teams.",
    topics: ["Architecture", "Communication", "Tradeoffs"],
    status: "prototype",
    stack: ["Sequence maps", "SLO framing", "Decision records"],
    track: "systems",
    level: "intermediate",
    duration: "3 weeks",
    outcome: "Explain and defend system decisions in plain language.",
  },
  {
    id: "template-interaction",
    title: "Interaction Patterns",
    description: "A sandbox for testing gestures, hover states, and layout rhythm.",
    topics: ["UI", "Motion", "Patterns"],
    status: "planned",
    stack: ["React", "Tailwind"],
    track: "product",
    level: "starter",
    duration: "2 weeks",
    outcome: "Catalog reusable interaction patterns for product surfaces.",
    isTemplate: true,
  },
  {
    id: "template-state",
    title: "Statecraft Playground",
    description: "Small visualizers for state machines, events, and derived data.",
    topics: ["State", "Architecture", "Visualization"],
    status: "planned",
    stack: ["React", "Tailwind"],
    track: "systems",
    level: "starter",
    duration: "2 weeks",
    outcome: "Reason about complex state changes with less debugging churn.",
    isTemplate: true,
  },
  {
    id: "template-visuals",
    title: "Data Sketchbook",
    description: "Experiment with charts, grids, and emergent layouts for data stories.",
    topics: ["Data", "Canvas", "UX"],
    status: "planned",
    stack: ["React", "Tailwind"],
    track: "product",
    level: "starter",
    duration: "2 weeks",
    outcome: "Create narrative data visuals that inform decisions quickly.",
    isTemplate: true,
  },
];
