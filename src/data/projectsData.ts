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
        title: "RecycleMe",
        description:
            "A mobile app that tells users whether an item is recyclable or not by taking a photo of it. The focus is to identify if an item is too contaminated to be recycled.",
        image: "/path-to-image.jpg", // Add project screenshot/image
        technologies: ["Flutter", "Firebase", "Dart"],
        liveLink: "https://project-url.com",
        githubLink: "https://github.com/username/project",
        featured: true,
    },
    {
        title: "TaskFlow",
        description:
            "A collaborative project management tool with real-time updates, drag-and-drop functionality, and team communication features. Built with modern web technologies for optimal performance.",
        image: "/path-to-taskflow-image.jpg",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
        liveLink: "https://taskflow-demo.com",
        githubLink: "https://github.com/username/taskflow",
        featured: true,
    },
    {
        title: "Weather Dashboard",
        description:
            "A responsive weather application that provides current conditions, 5-day forecasts, and interactive maps. Features location-based weather data and customizable themes.",
        image: "/path-to-weather-image.jpg",
        technologies: ["Vue.js", "OpenWeather API", "Chart.js", "CSS3"],
        liveLink: "https://weather-dash.netlify.app",
        githubLink: "https://github.com/username/weather-dashboard",
        featured: false,
    },
    {
        title: "E-Commerce Platform",
        description:
            "A full-stack e-commerce solution with user authentication, shopping cart, payment processing, and admin dashboard. Includes inventory management and order tracking.",
        image: "/path-to-ecommerce-image.jpg",
        technologies: ["Next.js", "Stripe API", "PostgreSQL", "Prisma"],
        liveLink: "https://shop-example.vercel.app",
        githubLink: "https://github.com/username/ecommerce-platform",
        featured: true,
    },
    {
        title: "Code Snippet Manager",
        description:
            "A developer tool for organizing and sharing code snippets with syntax highlighting, search functionality, and team collaboration features. Supports multiple programming languages.",
        image: "/path-to-snippet-image.jpg",
        technologies: ["TypeScript", "Express.js", "Redis", "Prism.js"],
        liveLink: "https://snippet-manager.herokuapp.com",
        githubLink: "https://github.com/username/snippet-manager",
        featured: false,
    },
    {
        title: "Fitness Tracker",
        description:
            "A mobile-first fitness application that tracks workouts, monitors progress, and provides personalized workout recommendations. Includes social features and achievement system.",
        image: "/path-to-fitness-image.jpg",
        technologies: ["React Native", "Firebase", "Chart.js", "AsyncStorage"],
        liveLink: "https://fitness-tracker-app.com",
        githubLink: "https://github.com/username/fitness-tracker",
        featured: false,
    },
    {
        title: "AI Chat Bot",
        description:
            "An intelligent chatbot powered by natural language processing that can answer questions, provide recommendations, and assist with various tasks. Features conversation memory and context awareness.",
        image: "/path-to-chatbot-image.jpg",
        technologies: ["Python", "TensorFlow", "Flask", "OpenAI API"],
        liveLink: "https://ai-chatbot-demo.com",
        githubLink: "https://github.com/username/ai-chatbot",
        featured: true,
    },
    {
        title: "Recipe Finder",
        description:
            "A culinary application that suggests recipes based on available ingredients, dietary restrictions, and cooking time. Includes meal planning and grocery list generation features.",
        image: "/path-to-recipe-image.jpg",
        technologies: ["Angular", "Spring Boot", "MySQL", "Spoonacular API"],
        liveLink: "https://recipe-finder-app.com",
        githubLink: "https://github.com/username/recipe-finder",
        featured: false,
    }
];
