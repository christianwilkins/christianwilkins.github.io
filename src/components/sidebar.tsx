"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
    const pathname = usePathname()
    const navItems = [
        { href: "/", label: "About" },
        { href: "/projects", label: "Projects" },
        { href: "/contact", label: "Contact" },
        { href: "/lab", label: "The Lab" },
    ]

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname?.startsWith(href)
    }

    return (
        <div className="sidebar-shell hidden md:flex flex-col fixed h-screen p-6 items-start animate-rise-in">
            <Link
                href="/"
                className="text-inherit no-underline w-fit mb-4"
            >
                <h2 className="m-0 leading-[1.05] p-0 text-2xl font-bold font-heading">
                    Christian<br />Wilkins
                </h2>
            </Link>
            <h1 className="m-0 leading-[1.05] p-0 text-xl font-normal mb-8 font-heading">
                Software<br />Engineer
            </h1>
            <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="nav-link w-fit text-lg transition-colors font-heading hover-lift"
                    >
                        {item.label}
                    </Link>
                ))}
                <div className="mt-2">
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    )
}
