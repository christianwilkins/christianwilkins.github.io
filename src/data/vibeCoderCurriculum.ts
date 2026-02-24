export type VibeActivity = {
  title: string;
  objective: string;
  instructions: string[];
  promptTemplate: string;
  successSignals: string[];
};

export type VibeArc = {
  id: string;
  slug: string;
  title: string;
  duration: string;
  concise: string;
  whyItMatters: string;
  learn: string[];
  drills: string[];
  deliverables: string[];
  activity: VibeActivity;
};

export const vibeCoderArcs: VibeArc[] = [
  {
    id: "arc-1",
    slug: "systems-thinking-over-syntax",
    title: "Arc 1 — Systems Thinking over Syntax",
    duration: "Week 1 to 2",
    concise: "Learn to define the right problem before touching implementation.",
    whyItMatters: "Great builders frame constraints and outcomes before they prompt any model.",
    learn: [
      "Problem framing with user pain, constraints, and target outcomes.",
      "System boundaries, trust assumptions, and failure points.",
      "English specs that AI can execute with less ambiguity.",
    ],
    drills: [
      "Rewrite one vague ask into a measurable implementation brief.",
      "List top 3 failure modes before design decisions.",
      "Draft one architecture intent note for a real feature.",
    ],
    deliverables: ["Spec brief", "Failure map", "Architecture intent note"],
    activity: {
      title: "Constraint to clarity workshop",
      objective: "Turn a fuzzy idea into a high signal implementation brief.",
      instructions: [
        "Write one real product pain in a single sentence.",
        "Add measurable success criteria and hard constraints.",
        "Generate one AI-ready implementation brief and refine it once.",
      ],
      promptTemplate:
        "You are my systems design reviewer. Convert this idea into a compact implementation brief with: goal, users, constraints, success metrics, and top 3 failure modes. Idea: <replace>.",
      successSignals: [
        "The brief has explicit metrics.",
        "Failure modes are concrete and testable.",
        "The implementation scope is bounded.",
      ],
    },
  },
  {
    id: "arc-2",
    slug: "prompting-as-interface-design",
    title: "Arc 2 — Prompting as Interface Design",
    duration: "Week 3 to 4",
    concise: "Design prompts like production interfaces, not chat snippets.",
    whyItMatters: "Prompt quality becomes engineering quality when AI writes large portions of code.",
    learn: [
      "Prompt contracts: objective, constraints, and acceptance checks.",
      "Multi-step prompt loops: plan, implement, verify, improve.",
      "Scope and safety guardrails for autonomous execution.",
    ],
    drills: [
      "Build one reusable prompt contract for feature delivery.",
      "Run red-team prompts to expose weak assumptions.",
      "Create a small prompt library by workflow type.",
    ],
    deliverables: ["Prompt contract", "Red-team checklist", "Prompt library"],
    activity: {
      title: "Prompt contract lab",
      objective: "Create a deterministic prompt pack for one real workflow.",
      instructions: [
        "Define a single workflow with clear input and output.",
        "Write a structured prompt contract with acceptance tests.",
        "Run one adversarial test and patch the contract.",
      ],
      promptTemplate:
        "Act as a strict implementation agent. Follow this contract only: Goal=<>, Constraints=<>, Non-goals=<>, Acceptance tests=<>, Output format=<>.",
      successSignals: [
        "Output format is stable across reruns.",
        "Acceptance tests are directly checkable.",
        "Scope creep is prevented by non-goals.",
      ],
    },
  },
  {
    id: "arc-3",
    slug: "core-architecture-and-system-design",
    title: "Arc 3 — Core Architecture and System Design",
    duration: "Week 5 to 7",
    concise: "Make high leverage architecture decisions that survive growth.",
    whyItMatters: "AI accelerates coding, but architecture quality controls long term speed and stability.",
    learn: [
      "Read/write paths, consistency tradeoffs, and idempotency.",
      "Queues, retries, backpressure, and degradation strategies.",
      "Security and reliability defaults in system topology.",
    ],
    drills: [
      "Design one system for 10x load and document tradeoffs.",
      "Draft incident playbooks for the top 3 failures.",
      "Explain architecture in plain English plus sequence flow.",
    ],
    deliverables: ["System design deck", "Failure playbook", "Tradeoff log"],
    activity: {
      title: "10x architecture drill",
      objective: "Produce a simple but robust architecture for growth.",
      instructions: [
        "Pick one service and define baseline throughput.",
        "Design read/write flow for 10x demand.",
        "Add fallback behavior for partial outage.",
      ],
      promptTemplate:
        "Design a resilient architecture for <service> at 10x traffic. Include data flow, queue strategy, retry model, and graceful degradation decisions with tradeoffs.",
      successSignals: [
        "Tradeoffs are explicit.",
        "Failure behavior is specified.",
        "There is a clear scaling path.",
      ],
    },
  },
  {
    id: "arc-4",
    slug: "agentic-workflows-and-automation-loops",
    title: "Arc 4 — Agentic Workflows and Automation Loops",
    duration: "Week 8 to 9",
    concise: "Build long running async workflows that can operate safely without constant supervision.",
    whyItMatters: "Agentic engineers orchestrate systems of actions, not one-shot code generation.",
    learn: [
      "State machines for async workflows and retries.",
      "Human approvals for high-risk actions.",
      "Usage and cost controls with health telemetry.",
    ],
    drills: [
      "Implement one nightly autopilot with quality thresholds.",
      "Add approval gates for destructive steps.",
      "Ship daily health summary and failure alerts.",
    ],
    deliverables: ["Workflow map", "Approval policy", "Ops dashboard"],
    activity: {
      title: "Autopilot safety pass",
      objective: "Harden one async workflow for real unattended operation.",
      instructions: [
        "Map all states and failure transitions.",
        "Set max retries, timeout, and escalation paths.",
        "Define budget and send caps.",
      ],
      promptTemplate:
        "Audit this workflow for unattended execution. Return: state machine, risk gates, retry limits, and budget constraints. Workflow: <replace>.",
      successSignals: [
        "Workflow can pause safely.",
        "Critical actions require explicit approval.",
        "Budget overrun is prevented by hard caps.",
      ],
    },
  },
  {
    id: "arc-5",
    slug: "product-security-and-professional-execution",
    title: "Arc 5 — Product Security and Professional Execution",
    duration: "Week 10 to 12",
    concise: "Ship with product judgment, operational discipline, and trustworthiness.",
    whyItMatters: "Real engineering value is measured by outcomes, reliability, and stakeholder trust.",
    learn: [
      "Product loops: discover, ship, measure, iterate.",
      "Security baseline: least privilege, auditability, and secret hygiene.",
      "Professional communication: release notes, decision docs, and executive summaries.",
    ],
    drills: [
      "Run one feature from discovery to launch notes.",
      "Perform a targeted security review and remediation.",
      "Write one stakeholder brief with outcome metrics.",
    ],
    deliverables: ["Launch package", "Security checklist", "Stakeholder update"],
    activity: {
      title: "Launch quality review",
      objective: "Evaluate one shipped feature for product and operational quality.",
      instructions: [
        "Document expected business outcome and metric.",
        "Audit security and rollback readiness.",
        "Write a concise post launch update with next steps.",
      ],
      promptTemplate:
        "Review this shipped feature as staff engineer and PM. Output: impact metric, top 3 risks, security gaps, and one week iteration plan. Feature: <replace>.",
      successSignals: [
        "Outcome metric is clear.",
        "Risks are prioritized with owners.",
        "Next iteration plan is actionable.",
      ],
    },
  },
];

export const vibeCoderCapstoneTracks = [
  "Design and ship one customer facing system with AI pair coding and explicit quality gates.",
  "Prove resilience under failure scenarios with a documented incident response runbook.",
  "Show measurable impact with a before and after performance narrative.",
];

export function getVibeArcBySlug(slug: string) {
  return vibeCoderArcs.find((arc) => arc.slug === slug);
}
