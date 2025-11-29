export interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveLink?: string;
    githubLink?: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        title: "JPMC Summer Intern Project",
        description: "Worked as a software engineering intern at JPMorgan Chase. I contributed to internal tools and helped improve developer workflows.",
        image: "",
        technologies: ["Java", "Spring Boot", "React"],
        liveLink: "https://jpmorganchase.com",
        githubLink: "https://github.com/christianwilkins",
        featured: true,
    },
    {
        title: "Configura Summer Intern Project",
        description: "Interned at Configura where I worked on their space planning software. I helped implement new features for a specific client.",
        image: "",
        technologies: ["C#", "React", "TypeScript"],
        liveLink: "https://configura.com",
        githubLink: "https://github.com/christianwilkins",
        featured: true,
    },
    {
        title: "ReKive AI Politics Project",
        description: "An AI powered platform for political analysis. It aggregates news and provides unbiased summaries using machine learning.",
        image: "",
        technologies: ["Python", "NLP", "React"],
        liveLink: "https://rekive.ai",
        githubLink: "https://github.com/christianwilkins/rekive",
        featured: true,
    },
    {
        title: "Paira Double Dating App Project",
        description: "A mobile application designed for double dates. I worked on the backend architecture and real time messaging features.",
        image: "",
        technologies: ["React Native", "Firebase", "Node.js"],
        liveLink: "https://paira.app",
        githubLink: "https://github.com/christianwilkins/paira",
        featured: false,
    },
    {
        title: "Resume Tailor AI Project",
        description: "A tool that uses AI to tailor resumes to specific job descriptions. It helps users optimize their applications for ATS systems.",
        image: "",
        technologies: ["Next.js", "OpenAI API", "Tailwind CSS"],
        liveLink: "https://resumetailor.ai",
        githubLink: "https://github.com/christianwilkins/resume-tailor",
        featured: true,
    },
    {
        title: "ROS2 Car MSU CSE Capstone Project",
        description: "My senior capstone project involving a self driving car using ROS2. We implemented navigation and obstacle avoidance algorithms.",
        image: "",
        technologies: ["ROS2", "Python", "C++"],
        liveLink: "https://msu.edu",
        githubLink: "https://github.com/christianwilkins/ros2-car",
        featured: false,
    },
    {
        title: "This Portfolio Website",
        description: "The website you are looking at right now. Built with Next.js and Tailwind CSS to showcase my work and experience.",
        image: "",
        technologies: ["Next.js", "Tailwind CSS", "Shadcn UI"],
        liveLink: "https://chriswiki.com",
        githubLink: "https://github.com/christianwilkins/christianwilkins.github.io",
        featured: true,
    },
    {
        title: "RecycleMe Mobile App",
        description: "A mobile app that identifies recyclable items using computer vision. It helps users reduce waste by providing accurate recycling information.",
        image: "",
        technologies: ["Flutter", "TensorFlow Lite", "Dart"],
        liveLink: "https://recycleme.app",
        githubLink: "https://github.com/christianwilkins/recycleme",
        featured: false,
    }
];
