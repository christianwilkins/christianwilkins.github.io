"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
    return (
        <div className="sidebar-shell hidden md:flex flex-col fixed h-screen p-6 items-start animate-rise-in">
            <Link
                href="/"
                className="text-inherit no-underline w-fit mb-4"
            >
                <h2 className="m-0 leading-[1.05] p-0 text-2xl font-bold font-heading">
                    Chris<br />Wilkins
                </h2>
            </Link>
            <h1 className="m-0 leading-[1.05] p-0 text-xl font-normal mb-8 font-heading">
                Software<br />Engineer
            </h1>
            <div className="layout-tag mb-6 text-xs tracking-[0.22em] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Portfolioteca
            </div>

            <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="nav-link w-fit text-lg transition-colors font-heading hover-lift">Home</Link>
                <Link href="/about" className="nav-link w-fit text-lg transition-colors font-heading hover-lift">About</Link>
                <Link href="/projects" className="nav-link w-fit text-lg transition-colors font-heading hover-lift">Projects</Link>
                <Link href="/contact" className="nav-link w-fit text-lg transition-colors font-heading hover-lift">Contact</Link>
                <Link href="/faq" className="nav-link w-fit text-lg transition-colors font-heading hover-lift">Faq</Link>
                <Link href="/lab" className="nav-link w-fit text-lg transition-colors font-heading hover-lift">The Lab</Link>
                <div className="mt-2">
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    )
}
