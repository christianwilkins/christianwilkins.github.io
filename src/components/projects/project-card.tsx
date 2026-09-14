import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/data/projectsData"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full min-w-0 flex-col gap-4 rounded-2xl border border-border/60 bg-card/70 p-6">
      <header>
        <p className="mb-2 text-sm text-muted-foreground">{project.role}</p>
        <h2 className="text-xl font-semibold text-foreground">{project.title}</h2>
      </header>
      <p className="text-sm text-muted-foreground">{project.summary}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => <Badge key={tech} variant="outline">{tech}</Badge>)}
      </div>
      <p className="text-xs text-muted-foreground">{project.timeline}</p>
      <details className="project-details border-t border-border">
        <summary className="text-sm font-medium">Project details<span className="sr-only"> for {project.title}</span></summary>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <h3 className="mt-4 text-sm font-semibold">Scope</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {project.highlights.map((item) => <li key={item}>{item}</li>)}
        </ul>
        {project.impact.length > 0 && <>
          <h3 className="mt-4 text-sm font-semibold">Outcomes</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {project.impact.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </>}
      </details>
      {!project.liveLink && !project.appStoreLink && !project.githubLink && <p className="text-sm text-muted-foreground">Public demo unavailable. Project details are available above.</p>}
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2">
        {project.liveLink && <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="ui-link inline-flex min-h-11 items-center text-sm" aria-label={`Visit ${project.title} website (opens in a new tab)`}>Visit website</Link>}
        {project.appStoreLink && <Link href={project.appStoreLink} target="_blank" rel="noopener noreferrer" className="ui-link inline-flex min-h-11 items-center text-sm">App Store<span className="sr-only"> for {project.title} (opens in a new tab)</span></Link>}
        {project.githubLink && <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" className="ui-link inline-flex min-h-11 items-center text-sm">GitHub<span className="sr-only"> for {project.title} (opens in a new tab)</span></Link>}
      </div>
    </article>
  )
}
