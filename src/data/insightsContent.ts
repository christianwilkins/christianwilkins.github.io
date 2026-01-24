export interface InsightSection {
  title?: string;
  content: string[];
}

export interface InsightPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  keywords: string[];
  sections: InsightSection[];
}

export const insightsIntro = {
  title: "Insights",
  subtitle:
    "Notes on software consulting, product design, and AI workflows from Christian Wilkins.",
  description:
    "Field notes and playbooks for founders and teams shipping high quality products with speed.",
};

export const insightPosts: InsightPost[] = [
  {
    slug: "startup-software-consulting",
    title: "Startup software consulting that ships fast",
    description:
      "How a software consultant helps startups deliver product strategy, UI systems, and engineering execution with speed.",
    date: "2026-01-12",
    readingTime: "7 min read",
    tags: ["software consulting", "startups", "product strategy"],
    keywords: [
      "startup software consultant",
      "software consulting for startups",
      "product strategy",
      "Christian Wilkins software consultant",
    ],
    sections: [
      {
        title: "When consulting is the right tool",
        content: [
          "Consulting works best when the team needs speed and clarity, not a long hiring cycle.",
          "If you have a focused goal and a two-to-six week window, a consultant can move faster than a new hire ramping up.",
        ],
      },
      {
        title: "A two-week sprint shape",
        content: [
          "Week one is for scope, user goals, and the smallest set of features that prove the product direction.",
          "Week two is for shipping: front-end builds, the supporting system pieces, and a clean handoff plan.",
        ],
      },
      {
        title: "Artifacts that compound",
        content: [
          "Good consulting leaves behind more than code. You should expect a usable roadmap, clear UI standards, and a simple system for future changes.",
          "That way the work keeps paying off after the engagement ends.",
        ],
      },
      {
        title: "How I structure engagements",
        content: [
          "I run short loops with weekly demos, a live backlog, and direct collaboration with product and engineering.",
          "This keeps decisions close to the work and reduces the back-and-forth that slows teams down.",
        ],
      },
      {
        title: "Signals that it is working",
        content: [
          "Teams ship smaller, cleaner releases. Design decisions get easier. Bugs drop because the UI system is consistent.",
          "You should feel lighter, not busier.",
        ],
      },
    ],
  },
  {
    slug: "design-systems-for-founders",
    title: "Design systems for founders who move fast",
    description:
      "A lightweight system that keeps product design, engineering, and brand in sync for startups.",
    date: "2026-01-14",
    readingTime: "6 min read",
    tags: ["design systems", "product design", "UI architecture"],
    keywords: [
      "design system consultant",
      "product design systems",
      "UI architecture",
      "software consultant",
    ],
    sections: [
      {
        title: "What a startup design system must do",
        content: [
          "It should reduce decision fatigue, keep the product consistent, and make UI work faster for both design and engineering.",
          "If it slows you down or feels heavy, it is too big for the stage you are in.",
        ],
      },
      {
        title: "Build the core set first",
        content: [
          "Start with typography, spacing, color tokens, and the small set of components used in every flow.",
          "Buttons, inputs, tables, modals, badges, and empty states go a long way for early teams.",
        ],
      },
      {
        title: "Ship documentation inside the product",
        content: [
          "A single internal page with component rules and usage examples is enough to keep the team aligned.",
          "When the UI rules live near the work, people follow them.",
        ],
      },
      {
        title: "How I support this",
        content: [
          "I help teams design the system and ship it as production-ready front-end components.",
          "That keeps design intent and implementation in lockstep.",
        ],
      },
    ],
  },
  {
    slug: "ai-workflow-consulting",
    title: "AI workflow consulting for product teams",
    description:
      "A practical approach to agentic workflows, automation, and AI-enabled tooling for startups.",
    date: "2026-01-17",
    readingTime: "7 min read",
    tags: ["AI workflows", "automation", "startup tooling"],
    keywords: [
      "AI workflow consultant",
      "agentic product tooling",
      "automation for startups",
      "software consulting",
    ],
    sections: [
      {
        title: "Map the workflow before building",
        content: [
          "AI wins come from removing the slowest steps in a repeated workflow, not from building a flashy demo.",
          "Start by listing the tasks that happen weekly and decide which can be automated safely.",
        ],
      },
      {
        title: "Prototype fast, harden later",
        content: [
          "A quick prototype shows whether the workflow is even worth automating.",
          "Once it works, add guardrails like input checks, rate limits, and human review.",
        ],
      },
      {
        title: "Pick a narrow first target",
        content: [
          "Reporting, QA checks, and internal knowledge lookups are good early wins because the scope is tight.",
          "These give value without changing the core product.",
        ],
      },
      {
        title: "How I help",
        content: [
          "I build and test workflows with product and engineering teams, then package them into usable internal tools.",
          "The goal is steady time saved, not a one-off experiment.",
        ],
      },
    ],
  },
  {
    slug: "two-week-product-audit",
    title: "The two-week product audit for early teams",
    description:
      "A short, focused audit that reveals the biggest product and UX wins without stalling delivery.",
    date: "2026-01-20",
    readingTime: "8 min read",
    tags: ["product audit", "UX", "startup"],
    keywords: [
      "product audit",
      "startup ux review",
      "software consultant audit",
    ],
    sections: [
      {
        title: "Start with the core user journey",
        content: [
          "Pick the single path that matters most: onboarding, activation, or a core workflow.",
          "If that path feels rough, nothing else matters.",
        ],
      },
      {
        title: "Audit surfaces, not just screens",
        content: [
          "Look at how state changes are communicated, how errors are handled, and where users get stuck.",
          "Most friction shows up between screens, not inside them.",
        ],
      },
      {
        title: "Deliverables that help teams ship",
        content: [
          "A short list of fixes with effort and impact, a UI cleanup plan, and a focused 2–4 week roadmap.",
          "Keep it short enough that the team will actually use it.",
        ],
      },
      {
        title: "How I run it",
        content: [
          "I combine a live product review with a quick code and UI audit, then present a clear action plan.",
          "The goal is to unblock shipping, not create a large report.",
        ],
      },
    ],
  },
  {
    slug: "hire-vs-consultant",
    title: "Hire vs. consultant: a simple decision guide",
    description:
      "How to decide when you need a full-time hire and when a consultant is the faster option.",
    date: "2026-01-21",
    readingTime: "6 min read",
    tags: ["hiring", "consulting", "startup ops"],
    keywords: [
      "hire vs consultant",
      "startup hiring decision",
      "software consulting value",
    ],
    sections: [
      {
        title: "Start with your time horizon",
        content: [
          "If you need results in weeks, a consultant fits. If you are building a long-term function, a hire makes sense.",
          "Time is the clearest filter.",
        ],
      },
      {
        title: "Scope clarity matters",
        content: [
          "Consultants do best with a clear goal and a fixed scope. Hires are better when the scope changes week to week.",
        ],
      },
      {
        title: "Consider team bandwidth",
        content: [
          "If no one has time to onboard a new hire, a consultant can embed and move without slowing the team.",
        ],
      },
      {
        title: "A hybrid approach works",
        content: [
          "Many teams start with a consultant to ship and then hire once the product path is stable.",
        ],
      },
    ],
  },
  {
    slug: "briefing-a-consultant",
    title: "Briefing a consultant for fast results",
    description:
      "A short checklist for founders to align goals, scope, and success measures before day one.",
    date: "2026-01-22",
    readingTime: "5 min read",
    tags: ["consulting", "product planning", "startup ops"],
    keywords: [
      "consultant brief",
      "software consulting kickoff",
      "startup product scope",
    ],
    sections: [
      {
        title: "Lead with the goal, not the feature list",
        content: [
          "Start with the business goal: better activation, faster sales cycles, or improved retention.",
          "A goal gives room for the best solution.",
        ],
      },
      {
        title: "Define a tight time window",
        content: [
          "Two to six weeks is enough for real change, short enough to keep focus.",
        ],
      },
      {
        title: "Agree on success signals",
        content: [
          "Set a few measurable targets: fewer steps in onboarding, faster page load, or fewer support tickets.",
        ],
      },
      {
        title: "Plan the handoff",
        content: [
          "Decide how code, docs, and design assets will be delivered so the team can build on the work.",
        ],
      },
    ],
  },
  {
    slug: "mvp-30-days",
    title: "A realistic 30-day MVP plan",
    description:
      "A week-by-week plan for founders who need an MVP without cutting corners on quality.",
    date: "2026-01-23",
    readingTime: "8 min read",
    tags: ["MVP", "product delivery", "startup"],
    keywords: [
      "mvp plan",
      "startup product delivery",
      "build mvp in 30 days",
    ],
    sections: [
      {
        title: "Week 1: define the smallest useful product",
        content: [
          "Write one paragraph that describes the product and who it is for.",
          "Then cut the scope until it fits a single primary workflow.",
        ],
      },
      {
        title: "Week 2: ship the core experience",
        content: [
          "Build the main flow end to end. Keep UI clean and consistent so the product feels finished.",
        ],
      },
      {
        title: "Week 3: fix the edges",
        content: [
          "Handle error states, empty states, and loading states. These decide whether the product feels stable.",
        ],
      },
      {
        title: "Week 4: polish and measure",
        content: [
          "Add light analytics, clear onboarding, and a feedback loop to learn from early users.",
        ],
      },
    ],
  },
  {
    slug: "design-system-mvp-12-components",
    title: "The 12 components that pay off first",
    description:
      "A short list of UI components that reduce rework and keep products consistent.",
    date: "2026-01-24",
    readingTime: "6 min read",
    tags: ["design systems", "UI components", "product design"],
    keywords: [
      "design system components",
      "ui component checklist",
      "startup design system",
    ],
    sections: [
      {
        title: "Start with the components used daily",
        content: [
          "Buttons, inputs, form validation, and basic layout pieces create most of the UI surface area.",
        ],
      },
      {
        title: "A starter set",
        content: [
          "Buttons, text inputs, select menus, text areas, checkboxes, radio groups, tables, modals, alerts, badges, empty states, and pagination cover most early flows.",
        ],
      },
      {
        title: "Include usage rules",
        content: [
          "One or two clear usage rules per component prevents drift when the team grows.",
        ],
      },
    ],
  },
  {
    slug: "engineering-velocity-without-rewrite",
    title: "Engineering velocity without a rewrite",
    description:
      "Ways to speed up a product team without burning months on a full rebuild.",
    date: "2026-01-24",
    readingTime: "7 min read",
    tags: ["engineering", "velocity", "startup"],
    keywords: [
      "engineering velocity",
      "startup codebase cleanup",
      "avoid rewrite",
    ],
    sections: [
      {
        title: "Measure before you change",
        content: [
          "Track cycle time, deploy frequency, and failure rate for two weeks. These point to the real bottlenecks.",
        ],
      },
      {
        title: "Fix the slow loops",
        content: [
          "Build times, flaky tests, and unclear review standards are common causes of slow delivery.",
          "Target those before you touch architecture.",
        ],
      },
      {
        title: "Refactor the edges",
        content: [
          "Pick one messy flow and clean it up fully. This raises the quality bar and creates a working pattern.",
        ],
      },
      {
        title: "Make changes visible",
        content: [
          "Weekly demos and small releases keep stakeholders aligned and reduce last-minute rewrites.",
        ],
      },
    ],
  },
  {
    slug: "just-ask-ai",
    title: "Just ask AI.",
    description:
      "Why coding agents became my default answer and how I use Codex to move faster without losing quality.",
    date: "2026-01-24",
    readingTime: "7 min read",
    tags: ["coding agents", "AI workflows", "developer tools"],
    keywords: [
      "OpenAI Codex",
      "coding agent",
      "AI coding assistant",
      "agentic workflows",
    ],
    sections: [
      {
        title: "The default move",
        content: [
          "When I need a feature, a refactor, or a quick spike, my first step is simple: just ask the agent.",
          "That shift is less about hype and more about speed. Agents can chew through setup and grunt work while I keep the product decisions in my hands.",
        ],
      },
      {
        title: "Work that fits agents well",
        content: [
          "Scoped tasks with clear inputs and outputs are perfect: adding a component, updating a page, writing tests, or cleaning up a module.",
          "If I can express it as a checklist, the agent can execute it.",
        ],
      },
      {
        title: "How I use Codex in practice",
        content: [
          "I use the CLI for local work and the cloud agent for parallel tasks. Both are great when you pair them with a short spec and a clear test command.",
          "An AGENTS.md file keeps the agent aligned with project rules, and approvals make sure nothing risky happens on its own.",
        ],
      },
      {
        title: "Where humans still lead",
        content: [
          "I keep product strategy, UI taste, and final shipping decisions on the human side.",
          "Agents are fast builders, but the final call on what to ship stays with the team.",
        ],
      },
      {
        title: "A starter prompt",
        content: [
          "Give a goal, a list of files, and the expected test command. Then ask for a short plan before it writes code.",
          "That small step avoids confusion and keeps the work clean.",
        ],
      },
    ],
  },
  {
    slug: "design-to-code-without-handoff",
    title: "Design to code without the handoff",
    description:
      "Why design-to-code workflows are tightening and how I keep teams shipping from a shared system.",
    date: "2026-01-19",
    readingTime: "7 min read",
    tags: ["design systems", "design-to-code", "product design"],
    keywords: [
      "Figma Dev Mode",
      "design to code workflow",
      "Figma MCP server",
      "Code Connect",
    ],
    sections: [
      {
        title: "Handoff is where speed dies",
        content: [
          "When design and code drift, teams slow down. The fix is not a bigger spec, it is shared context.",
          "Tools that bring design intent into the coding workflow are now a real advantage.",
        ],
      },
      {
        title: "A tight loop workflow",
        content: [
          "Design lives in one place, code lives in another, and the link between them needs to be direct.",
          "Dev Mode, Code Connect, and design context for coding agents reduce the gap and make changes less risky.",
        ],
      },
      {
        title: "What to standardize early",
        content: [
          "Component names, tokens, and layout rules should be consistent across design and code.",
          "If the tokens do not match, the handoff will never be smooth.",
        ],
      },
      {
        title: "How I help",
        content: [
          "I help teams build the design system in Figma and ship the matching components in code.",
          "That keeps the product consistent even as the team grows.",
        ],
      },
    ],
  },
  {
    slug: "platform-engineering-for-small-teams",
    title: "Platform engineering for small teams",
    description:
      "A lightweight approach to developer experience without building a full platform org.",
    date: "2026-01-18",
    readingTime: "6 min read",
    tags: ["platform engineering", "developer experience", "startup engineering"],
    keywords: [
      "platform engineering",
      "developer experience",
      "startup engineering tools",
    ],
    sections: [
      {
        title: "Start with the friction list",
        content: [
          "Slow builds, unclear deploy steps, and one-off scripts drain energy from small teams.",
          "List the top three pain points and fix those first.",
        ],
      },
      {
        title: "Thin platform, real impact",
        content: [
          "You do not need a platform team to get platform value.",
          "A few shared tools, a clean repo template, and stable CI can cut hours every week.",
        ],
      },
      {
        title: "Self-service is the goal",
        content: [
          "The best platform work makes common tasks easy without asking for help.",
          "If a new engineer can ship on day one, the platform is doing its job.",
        ],
      },
      {
        title: "Measure the change",
        content: [
          "Track cycle time and deploy frequency before and after the updates.",
          "If those improve, the investment is paying off.",
        ],
      },
    ],
  },
  {
    slug: "agent-security-for-product-teams",
    title: "Agent security for product teams",
    description:
      "How to ship agentic workflows without opening the door to prompt injection and tool misuse.",
    date: "2026-01-16",
    readingTime: "7 min read",
    tags: ["AI agents", "security", "product workflows"],
    keywords: [
      "prompt injection",
      "agent security",
      "AI workflow safety",
    ],
    sections: [
      {
        title: "Assume prompts can be hostile",
        content: [
          "Agents read more than you think: emails, docs, tickets, and web pages can all carry hidden instructions.",
          "Treat every input as untrusted until it is cleaned or verified.",
        ],
      },
      {
        title: "Least privilege tools",
        content: [
          "Give agents access only to the tools and data they need for a task.",
          "Small scopes reduce the blast radius when something goes wrong.",
        ],
      },
      {
        title: "Human review still matters",
        content: [
          "Require a review step before any write operation that affects production systems.",
          "You can move fast and still keep the final action in human hands.",
        ],
      },
      {
        title: "Roll out in layers",
        content: [
          "Start with read-only tasks, then add write access once the team trusts the workflow.",
          "This is the safest path to agent adoption.",
        ],
      },
    ],
  },

  {
    slug: "remote-agentic-dev-setup",
    title: "My remote agent dev setup (phone + old PC + laptop)",
    description:
      "A practical setup guide for running Codex, OpenCode, and Claude Code across devices with Tailscale, tmux, and custom scripts.",
    date: "2026-01-24",
    readingTime: "9 min read",
    tags: ["remote dev", "coding agents", "workflow"],
    keywords: [
      "remote development setup",
      "coding agents workflow",
      "Codex CLI",
      "tmux async jobs",
    ],
    sections: [
      {
        title: "What this setup is for",
        content: [
          "I want to work from anywhere and still run real builds, tests, and agent tasks safely on hardware I control.",
          "The phone is for quick prompts and task handoffs. The old PC is the always-on workhorse. The laptop is for focused work and reviews.",
        ],
      },
      {
        title: "Hardware layout",
        content: [
          "Old PC stays online at home and runs long jobs. It is the default place for heavy tasks like builds, indexing, or data prep.",
          "Laptop is for active coding sessions and reviews. It connects to the same repo and can take over any job.",
          "Phone is for quick prompts, status checks, and kicking off tasks when I am away from a desk.",
        ],
      },
      {
        title: "Network glue with Tailscale",
        content: [
          "All machines are on the same Tailscale network so I can SSH to the old PC from anywhere, including my phone.",
          "I keep a short host alias list so I can jump in fast without thinking about IPs.",
        ],
      },
      {
        title: "tmux as the async job runner",
        content: [
          "Every long task runs inside tmux on the old PC. Each repo gets a named session and each task gets its own window.",
          "This lets me start a job from the phone, close the app, and check progress later from any device.",
        ],
      },
      {
        title: "Agent stack: Codex, OpenCode, Claude Code",
        content: [
          "I run Codex in the repo for file edits, tests, and structured refactors. It is my default for hands-on work.",
          "OpenCode handles quick codebase questions and small changes when I want a lighter loop.",
          "Claude Code is my backup for alternative plans or second opinions on a risky change.",
        ],
      },
      {
        title: "Custom scripts that keep it fast",
        content: [
          "I keep a scripts folder with helpers like: open a tmux session, sync the repo, run tests, and start an agent task with a standard prompt.",
          "One script creates a new tmux window, pulls the latest branch, then opens Codex with a short spec template.",
        ],
      },
      {
        title: "A simple daily flow",
        content: [
          "From my phone, I SSH into the old PC, create a tmux window, and start a Codex task with a short prompt.",
          "From the laptop, I review the diff, run tests locally if needed, and push the final change.",
        ],
      },
      {
        title: "Safety and guardrails",
        content: [
          "All agent tasks run in a clean working tree. I keep separate branches for each task to avoid messy merges.",
          "I only allow write access where needed, and I always review diffs before pushing.",
        ],
      },
      {
        title: "Quick start checklist",
        content: [
          "Install Tailscale on all devices and confirm SSH access to the old PC.",
          "Set up tmux sessions per repo and name them clearly.",
          "Install Codex, OpenCode, and Claude Code on the machines where you will run them.",
          "Create a small scripts folder for repeatable tasks and keep prompts short and specific.",
        ],
      },
    ],
  },

];
