import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projectsData";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
    title: "Projects | Christian Wilkins",
    description:
        "Projects by Christian Wilkins, a software consultant and engineer focused on startups, product design, and practical delivery.",
    keywords: [...siteConfig.keywords, "software consultant projects", "product design portfolio"],
};

export default function Projects() {
    const projectSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "CreativeWork",
                name: project.title,
                description: project.summary,
                url: project.liveLink || siteConfig.url,
                keywords: project.technologies.join(", "),
                creator: {
                    "@type": "Person",
                    name: siteConfig.name,
                    url: siteConfig.url,
                },
            },
        })),
    };

    return (
        <div className="w-full animate-rise-in">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
            />
            <h1 className="ui-label text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 font-heading">Projects</h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed text-muted-foreground">
                A curated selection of recent work spanning enterprise tooling,
                Ai driven products, and mobile applications<span className="hidden sm:inline">. Hover or click any
                card to explore roles, highlights, and impact</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </div>
    );
}
