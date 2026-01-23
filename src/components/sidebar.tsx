"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { primaryNavItems } from "@/data/navigation"
import { useTerminalWindow } from "@/components/terminal/terminal-window-provider"

export function Sidebar() {
    const pathname = usePathname()
    const { openTerminal, isOpen } = useTerminalWindow()
    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname?.startsWith(href)
    }

    return (
        <div className="sidebar-shell hidden md:flex flex-col fixed h-screen p-6 items-start animate-rise-in">
            <div className="sidebar-inner">
                <div className="sidebar-header">
                    <Link
                        href="/"
                        className="sidebar-brand text-inherit no-underline w-fit"
                    >
                        <h2 className="m-0 leading-[1.05] p-0 text-2xl font-bold font-heading sidebar-name">
                            <span className="sidebar-name-part">Christian</span>
                            <span className="sidebar-name-part">Wilkins</span>
                        </h2>
                    </Link>
                    <h1 className="sidebar-role m-0 leading-[1.05] p-0 text-xl font-normal font-heading">
                        <span className="sidebar-role-part">Software</span>
                        <span className="sidebar-role-part">Engineer</span>
                    </h1>
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                    {primaryNavItems.map((item) => (
                        item.action === "terminal" ? (
                            <button
                                key={item.id}
                                type="button"
                                onClick={openTerminal}
                                aria-haspopup="dialog"
                                aria-expanded={isOpen}
                                className="nav-link w-fit text-lg transition-colors font-heading hover-lift"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <Link
                                key={item.id}
                                href={item.href}
                                aria-current={isActive(item.href) ? "page" : undefined}
                                className="nav-link w-fit text-lg transition-colors font-heading hover-lift"
                            >
                                {item.label}
                            </Link>
                        )
                    ))}
                    <div className="mt-2">
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </div>
    )
}
