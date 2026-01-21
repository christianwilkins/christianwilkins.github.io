export interface Project {
  title: string;
  summary: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  featured: boolean;
  role: string;
  timeline: string;
  highlights: string[];
  impact: string[];
}

export const projects: Project[] = [
  {
    title: "JPMorgan Summer Intern Project",
    summary: "Enterprise developer tooling to streamline engineering workflows and reduce friction.",
    description: "Contributed to internal tools used by engineering teams, focusing on reliability, automation, and a cleaner developer experience.",
    image: "",
    technologies: ["Java", "Spring Boot", "React"],
    liveLink: "https://jpmorganchase.com",
    githubLink: "https://github.com/christianwilkins",
    featured: true,
    role: "Software Engineering Intern",
    timeline: "Summer internship",
    highlights: [
      "Built improvements for internal tooling workflows.",
      "Automated repetitive steps in developer setup and delivery.",
      "Worked within enterprise code review and testing practices.",
    ],
    impact: [
      "Reduced day to day friction for engineers.",
      "Improved maintainability through cleanup and documentation.",
    ],
  },
  {
    title: "Configura Summer Intern Project",
    summary: "Client focused enhancements to enterprise space planning software.",
    description: "Implemented features for a specific client and refined Ui flows across the React front end and C sharp services.",
    image: "",
    technologies: ["C#", "React", "TypeScript"],
    liveLink: "https://configura.com",
    githubLink: "https://github.com/christianwilkins",
    featured: true,
    role: "Software Engineering Intern",
    timeline: "Summer internship",
    highlights: [
      "Delivered client requested features on a tight timeline.",
      "Bridged front end Ui updates with backend logic.",
      "Partnered with Qa to validate release readiness.",
    ],
    impact: [
      "Enhanced client workflows with tailored features.",
      "Improved consistency across Ui interactions.",
    ],
  },
  {
    title: "ReKive Ai Politics Project",
    summary: "Ai platform for balanced political analysis and news summaries.",
    description: "Aggregated news sources, applied Nlp summarization, and surfaced multiple viewpoints in a clean, skimmable Ui.",
    image: "",
    technologies: ["Python", "Nlp", "React"],
    liveLink: "https://rekive.ai",
    githubLink: "https://github.com/christianwilkins/rekive",
    featured: true,
    role: "Full stack Developer",
    timeline: "Ongoing",
    highlights: [
      "Built ingestion pipeline for multi source news.",
      "Implemented summarization and clustering for topic coverage.",
      "Designed transparency signals around sources.",
    ],
    impact: [
      "Made complex news easier to digest.",
      "Encouraged exposure to multiple viewpoints.",
    ],
  },
  {
    title: "Paira Double Dating App Project",
    summary: "Mobile app for double date matching with real time messaging.",
    description: "Designed backend architecture and messaging features for paired matches, focusing on reliable real time experiences.",
    image: "",
    technologies: ["React Native", "Firebase", "Node.js"],
    liveLink: "https://paira.app",
    githubLink: "https://github.com/christianwilkins/paira",
    featured: false,
    role: "Backend Engineer",
    timeline: "Product prototype",
    highlights: [
      "Designed data models for paired matchmaking.",
      "Built real time chat flows for group conversations.",
      "Added safeguards for reliable message delivery.",
    ],
    impact: [
      "Enabled fast, reliable messaging between pairs.",
      "Improved match activation with low latency flows.",
    ],
  },
  {
    title: "Resume Tailor Ai Project",
    summary: "Ai powered resume tailoring for Ats friendly applications.",
    description: "Built a product that extracts job requirements, generates targeted resume bullets, and keeps edits structured and consistent.",
    image: "",
    technologies: ["Next.js", "OpenAi Api", "Tailwind CSS"],
    liveLink: "https://resumetailor.ai",
    githubLink: "https://github.com/christianwilkins/resume-tailor",
    featured: true,
    role: "Full stack Developer",
    timeline: "Side project",
    highlights: [
      "Integrated Llm workflows for targeted rewrites.",
      "Built a structured editing experience for resumes.",
      "Added guardrails for tone, length, and clarity.",
    ],
    impact: [
      "Helped users align resumes to job specs.",
      "Reduced manual edits during applications.",
    ],
  },
  {
    title: "Ros2 Car Capstone Project",
    summary: "Autonomous navigation and obstacle avoidance with Ros2.",
    description: "Implemented navigation behavior, sensor integration, and obstacle avoidance routines, validated in simulation and on hardware.",
    image: "",
    technologies: ["Ros2", "Python", "C++"],
    liveLink: "https://msu.edu",
    githubLink: "https://github.com/christianwilkins/ros2-car",
    featured: false,
    role: "Capstone Team Member",
    timeline: "Senior capstone",
    highlights: [
      "Implemented navigation and obstacle avoidance routines.",
      "Integrated sensors and Ros2 nodes for autonomy.",
      "Tuned behaviors through simulation testing.",
    ],
    impact: [
      "Achieved stable autonomous navigation.",
      "Demonstrated safe path planning.",
    ],
  },
  {
    title: "This Portfolio Website",
    summary: "Next.js and Tailwind portfolio with custom, reusable Ui components.",
    description: "Designed a clean visual system, built modular components, and optimized layout for clarity and responsiveness.",
    image: "",
    technologies: ["Next.js", "Tailwind CSS", "Shadcn Ui"],
    liveLink: "https://chriswiki.com",
    githubLink: "https://github.com/christianwilkins/christianwilkins.github.io",
    featured: true,
    role: "Designer and Developer",
    timeline: "Active",
    highlights: [
      "Built a reusable component system.",
      "Iterated on typography, layout, and spacing.",
      "Optimized for responsiveness and performance.",
    ],
    impact: [
      "Showcases projects in a cohesive narrative.",
      "Improves discoverability of work.",
    ],
  },
  {
    title: "RecycleMe Mobile App",
    summary: "Computer vision mobile app to identify recyclable materials.",
    description: "Integrated on device vision models and crafted a camera first Flutter experience with clear recycling guidance.",
    image: "",
    technologies: ["Flutter", "TensorFlow Lite", "Dart"],
    liveLink: "https://recycleme.app",
    githubLink: "https://github.com/christianwilkins/recycleme",
    featured: false,
    role: "Mobile Developer",
    timeline: "Prototype",
    highlights: [
      "Integrated lightweight on device inference.",
      "Designed camera first Ui flows.",
      "Mapped classifications to recycling guidance.",
    ],
    impact: [
      "Simplified recycling decisions for users.",
      "Reduced confusion around material types.",
    ],
  },
];
