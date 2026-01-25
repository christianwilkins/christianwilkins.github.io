"use client"

import * as React from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import type { Project } from "@/data/projectsData"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
}

type RoleLabelStyle = "label" | "tag" | "dot"

function ProjectCard({ project }: ProjectCardProps) {
  const [canHover, setCanHover] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [roleLabelStyle, setRoleLabelStyle] = React.useState<RoleLabelStyle>("label")

  React.useEffect(() => {
    setMounted(true)
    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(media.matches)
    update()

    if (media.addEventListener) {
      media.addEventListener("change", update)
    } else {
      media.addListener(update)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update)
      } else {
        media.removeListener(update)
      }
    }
  }, [])

  React.useEffect(() => {
    if (typeof document === "undefined") return
    const root = document.documentElement
    const readRoleLabel = () => {
      const value = root.dataset.roleLabel
      if (value === "tag" || value === "dot" || value === "label") {
        setRoleLabelStyle(value)
      } else {
        setRoleLabelStyle("label")
      }
    }

    readRoleLabel()
    const observer = new MutationObserver(readRoleLabel)
    observer.observe(root, { attributes: true, attributeFilter: ["data-role-label"] })
    return () => observer.disconnect()
  }, [])

  const interactiveProps = canHover
    ? {
        role: "button",
        tabIndex: 0,
        "aria-label": `More info about ${project.title}`,
      }
    : {}

  const cardBody = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 shadow-soft transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
        canHover &&
          "cursor-pointer hover:-translate-y-1 hover:border-foreground/30 hover:shadow-deep"
      )}
      {...interactiveProps}
    >
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_color-mix(in_oklch,_var(--muted-foreground)_18%,_transparent),_transparent_70%)]" />
      </div>
      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            {roleLabelStyle === "tag" ? (
              <span className="mb-2 inline-flex w-fit items-center rounded-full border border-border/70 bg-background/80 px-2.5 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
                {project.role}
              </span>
            ) : null}
            {roleLabelStyle === "dot" ? (
              <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-foreground/40" aria-hidden="true" />
                <span className="pr-4">{project.role}</span>
              </div>
            ) : null}
            {roleLabelStyle === "label" ? (
              <p className="mb-1 pr-4 text-xs font-medium text-foreground/70">
                {project.role}
              </p>
            ) : null}
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
          {canHover ? (
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" aria-hidden="true" />
              Hover or click
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )

  if (!mounted || !canHover) {
    return cardBody
  }

  return (
    <HoverCard openDelay={150} closeDelay={120}>
      <HoverCardTrigger asChild>{cardBody}</HoverCardTrigger>
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
