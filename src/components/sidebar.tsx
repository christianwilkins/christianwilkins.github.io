"use client"

import { personalBrand } from "@/data/personalBrand"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { primaryNavItems } from "@/data/navigation"

export function Sidebar() {
    const pathname = usePathname()
    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname?.startsWith(href)
    }

    return (
        <header className="sidebar-shell hidden md:flex flex-col fixed h-screen p-6 items-start animate-rise-in">
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
                    <p className="sidebar-role m-0 leading-[1.05] p-0 text-xl font-normal font-heading">
                        {personalBrand.role}
                    </p>
                </div>
                <nav aria-label="Primary" className="flex flex-col gap-4 mt-8">
                    {primaryNavItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            className="nav-link w-fit text-lg transition-colors font-heading hover-lift"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    )
}
