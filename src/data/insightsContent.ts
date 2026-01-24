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
];
