export interface FAQOption {
    text: string;
    options: string[];
}

export const faqData: Record<string, FAQOption> = {
    // Main branches
    "Thinking of hiring Christian?": {
        text: "Christian is a technical founder, consultant, and engineer. What would you like to know about his work?",
        options: [
            "Projects",
            "Experience",
            "Christian's Resume"
        ]
    },
    "Get Advice from Christian": {
        text: "I'm willing to help! What would you like advice on?",
        options: [
            "Internship",
            "Resume",
            // "Startups"
        ]
    },

    // Work and experience
    "Projects": {
        text: "My projects cover consulting, enterprise tools, AI products, and mobile applications. Visit Projects for my role and scope on each.",
        options: [
            "View projects",
            "Experience",
            "Christian's Resume"
        ]
    },
    "Experience": {
        text: "I am a technical founder, consultant, and engineer. I founded ForgePeak Ventures and work across product design, engineering, and AI workflows.",
        options: [
            "About Christian",
            "Projects",
            "Christian's Resume"
        ]
    },
    "Christian's Resume": {
        text: "Contact me for a current resume tailored to the role or project you have in mind.",
        options: [
            "Contact Christian",
            "Projects",
            "Experience"
        ]
    },

    // Advice topics
    "Internship": {
        text: "I've mainly gotten my internships from experience gained at Imagine Software. I would recommend joining if you're an MSU student or not.",
        options: [
            "Imagine Software",
            "Interviews",
        ]
    },
    "Resume": {
        text: "Resumes are very opinionated. Some general advice is to use a well known template (Jake's Resume), minimize whitespace, keep it to one page. Also make sure it is ATS friendly and you use the STAR method for your bullet points. If you want to get more specific advice, we do resume reviews in the Imagine Software Discord server.",
        options: [
            "Imagine Software",
        ]
    },
    "Startups": {
        text: "I work with founders on technical direction and product delivery through ForgePeak Ventures. Contact me to discuss your product.",
        options: [
            "Internship",
            "Resume"
        ]
    },

    "Interviews": {
        text: "Honestly, interviewing is not my strong suit. I would recommend using these resources to help you prepare:",
        options: [
            "Companies Expert YouTube (soft skills)",
            "My LeetCode Thoughts",
            "Doing Projects"
        ]
    },

    "My LeetCode Thoughts": {
        text: "I don't like LeetCode. My cheat code is to cheat. Not on real technical interviews, but on the practice problems. It's too much memorization.",
        options: [
            "Imagine Software",
        ]
    },

    "Doing Projects": {
        text: "Honestly talking about your work is the most impressive thing to me. I would recommend showing by doing when you can. In the age of AI, doing a project is easier than ever.",
        options: [
            "Imagine Software",
        ]
    },
};
