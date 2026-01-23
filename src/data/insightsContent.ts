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
    "Short essays and playbooks for founders and teams building high quality products with speed.",
};

export const insightPosts: InsightPost[] = [
  {
    slug: "startup-software-consulting",
    title: "Startup software consulting that ships fast",
    description:
      "How a software consultant helps startups deliver product strategy, UI systems, and engineering execution with speed.",
    date: "2025-01-12",
    readingTime: "5 min read",
    tags: ["software consulting", "startups", "product strategy"],
    keywords: [
      "startup software consultant",
      "software consulting for startups",
      "product strategy",
      "Christian Wilkins software consultant",
    ],
    sections: [
      {
        title: "Why startups hire a software consultant",
        content: [
          "Startups hire consultants to accelerate delivery without the overhead of a full-time hire.",
          "The best engagements blend product strategy, UI design, and engineering execution in one loop.",
        ],
      },
      {
        title: "Where impact shows up fastest",
        content: [
          "Clarifying scope for a 2-6 week window keeps momentum and avoids overbuilding.",
          "A reusable design system paired with production-ready front-end code prevents regressions.",
          "Weekly demos and clear handoffs build trust and move stakeholders forward.",
        ],
      },
      {
        title: "What Christian Wilkins focuses on",
        content: [
          "I partner with founders on product strategy, design systems, and modern front-end delivery.",
          "Every engagement includes workflow improvements, documentation, and a clear roadmap.",
        ],
      },
    ],
  },
  {
    slug: "design-systems-for-founders",
    title: "Design systems for founders who move fast",
    description:
      "A lightweight system that keeps product design, engineering, and brand in sync for startups.",
    date: "2025-01-18",
    readingTime: "4 min read",
    tags: ["design systems", "product design", "UI architecture"],
    keywords: [
      "design system consultant",
      "product design systems",
      "UI architecture",
      "software consultant",
    ],
    sections: [
      {
        title: "Design system outcomes",
        content: [
          "A system should reduce decision fatigue and accelerate shipping.",
          "Founders need a toolkit that protects brand quality while moving quickly.",
        ],
      },
      {
        title: "What to build first",
        content: [
          "Start with typography, spacing, and the 10-15 components used everywhere.",
          "Document usage patterns inside the product so the team can self-serve.",
        ],
      },
      {
        title: "Consulting support",
        content: [
          "I build design systems alongside product teams and translate them into reusable front-end code.",
        ],
      },
    ],
  },
  {
    slug: "ai-workflow-consulting",
    title: "AI workflow consulting for product teams",
    description:
      "A practical approach to agentic workflows, automation, and AI-enabled tooling for startups.",
    date: "2025-01-22",
    readingTime: "6 min read",
    tags: ["AI workflows", "automation", "startup tooling"],
    keywords: [
      "AI workflow consultant",
      "agentic product tooling",
      "automation for startups",
      "software consulting",
    ],
    sections: [
      {
        title: "Start with workflow mapping",
        content: [
          "The highest ROI AI work comes from mapping the daily tasks that slow teams down.",
          "Automating internal reporting or QA checks can save hours every week.",
        ],
      },
      {
        title: "Prototype fast, productionize smart",
        content: [
          "Rapid prototypes validate an AI workflow before investing in full integration.",
          "Once proven, we harden the pipeline with monitoring, rate limits, and human review.",
        ],
      },
      {
        title: "How I help",
        content: [
          "I build and test AI workflows with product and engineering teams to unlock automation safely.",
        ],
      },
    ],
  },
];
