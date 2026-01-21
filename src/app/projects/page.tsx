import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projectsData";

export default function Projects() {
    return (
        <div className="w-full animate-rise-in">
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
