"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
    return (
        <div className="hidden md:flex flex-col fixed w-[200px] h-screen p-6 items-start">
            <Link
                href="/"
                className="text-inherit no-underline w-fit mb-4"
            >
                <h2 className="m-0 leading-[1.05] p-0 text-2xl font-bold font-heading">
                    CHRIS<br />WILKINS
                </h2>
            </Link>
            <h1 className="m-0 leading-[1.05] p-0 text-xl font-normal mb-8 font-heading">
                SOFTWARE<br />ENGINEER
            </h1>

            <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="w-fit text-lg hover:underline hover:bg-accent/10 p-1 rounded transition-colors font-heading">HOME</Link>
                <Link href="/about" className="w-fit text-lg hover:underline hover:bg-accent/10 p-1 rounded transition-colors font-heading">ABOUT</Link>
                <Link href="/projects" className="w-fit text-lg hover:underline hover:bg-accent/10 p-1 rounded transition-colors font-heading">PROJECTS</Link>
                <Link href="/contact" className="w-fit text-lg hover:underline hover:bg-accent/10 p-1 rounded transition-colors font-heading">CONTACT</Link>
                <Link href="/faq" className="w-fit text-lg hover:underline hover:bg-accent/10 p-1 rounded transition-colors font-heading">FAQ</Link>
                <Link href="/lab" className="w-fit text-lg hover:underline hover:bg-accent/10 p-1 rounded transition-colors font-heading">THE LAB</Link>
                <div className="mt-2">
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    )
}
