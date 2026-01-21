"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import type { Project } from "@/data/projectsData"

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <HoverCard openDelay={150} closeDelay={120}>
      <HoverCardTrigger asChild>
        <div
          className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          role="button"
          tabIndex={0}
          aria-label={`More info about ${project.title}`}
        >
          <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_color-mix(in_oklch,_var(--muted-foreground)_18%,_transparent),_transparent_70%)]" />
          </div>
          <div className="relative z-10 flex h-full flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs tracking-wide text-muted-foreground">{project.role}</p>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {project.title}
                </h2>
              </div>
              {project.featured ? (
                <Badge variant="secondary" className="rounded-full text-[0.65rem] tracking-wide">
                  Featured
                </Badge>
              ) : null}
            </div>
            <p className="text-sm text-muted-foreground">{project.summary}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="bg-background/80">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground/80">
              <span>{project.timeline}</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" aria-hidden="true" />
                Hover or click
              </span>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        side="top"
        sideOffset={12}
        className="w-[min(420px,calc(100vw-2rem))] rounded-2xl"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs tracking-wide text-muted-foreground">{project.timeline}</p>
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
            </div>
            <Badge variant="outline" className="rounded-full text-[0.65rem] tracking-wide">
              {project.role}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{project.description}</p>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground">Highlights</p>
            <ul className="mt-2 space-y-2 text-sm text-foreground/90">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground">Impact</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.impact.map((item) => (
                <Badge key={item} variant="outline" className="bg-background/80 text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            {project.liveLink ? (
              <Link
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-xs font-semibold tracking-wide text-foreground transition hover:border-foreground/40"
              >
                Live demo
              </Link>
            ) : null}
            {project.githubLink ? (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-xs font-semibold tracking-wide text-foreground transition hover:border-foreground/40"
              >
                GitHub
              </Link>
            ) : null}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export { ProjectCard }
