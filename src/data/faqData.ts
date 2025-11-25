export interface FAQOption {
    text: string;
    options: string[];
}

export const faqData: Record<string, FAQOption> = {
    // Main branches
    "Thinking of hiring Chris?": {
        text: "Great! Chris is a passionate software engineer with leadership experience and a proven track record. What would you like to know about his qualifications?",
        options: [
            "Projects",
            "Experience",
            "Chris's Resume"
        ]
    },
    "Get Advice from Chris": {
        text: "I'm willing to help! What would you like advice on?",
        options: [
            "Internship",
            "Resume",
            // "Startups"
        ]
    },

    // Hiring branch placeholders
    "Projects": {
        text: "You'll add your own content here about Chris's projects.",
        options: [
            "Experience",
            "Chris's Resume"
        ]
    },
    "Experience": {
        text: "You'll add your own content here about Chris's experience.",
        options: [
            "Projects",
            "Chris's Resume"
        ]
    },
    "Chris's Resume": {
        text: "You'll add your own content here about Chris's resume.",
        options: [
            "Projects",
            "Experience"
        ]
    },

    // Advice branch placeholders
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
        text: "You'll add your own content here about startup advice.",
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
