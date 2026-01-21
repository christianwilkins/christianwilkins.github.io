export type LearningModuleStatus = "live" | "beta" | "prototype" | "planned";

export type LearningModule = {
  id: string;
  title: string;
  description: string;
  topics: string[];
  status: LearningModuleStatus;
  stack: string[];
  href?: string;
  isTemplate?: boolean;
};

export const learningModules: LearningModule[] = [
  {
    id: "template-interaction",
    title: "Interaction Patterns",
    description: "A sandbox for testing gestures, hover states, and layout rhythm.",
    topics: ["UI", "Motion", "Patterns"],
    status: "planned",
    stack: ["React", "Tailwind"],
    isTemplate: true,
  },
  {
    id: "template-state",
    title: "Statecraft Playground",
    description: "Small visualizers for state machines, events, and derived data.",
    topics: ["State", "Architecture", "Visualization"],
    status: "planned",
    stack: ["React", "Tailwind"],
    isTemplate: true,
  },
  {
    id: "template-visuals",
    title: "Data Sketchbook",
    description: "Experiment with charts, grids, and emergent layouts for data stories.",
    topics: ["Data", "Canvas", "UX"],
    status: "planned",
    stack: ["React", "Tailwind"],
    isTemplate: true,
  },
];
