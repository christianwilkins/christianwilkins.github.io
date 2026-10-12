"use client"

import * as React from "react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { StyleSettingsDrawer } from "@/components/style-settings-drawer"
import { TerminalWindowProvider } from "@/components/terminal/terminal-window-provider"
import { cn } from "@/lib/utils"
import { primaryNavItems } from "@/data/navigation"

import { usePathname } from "next/navigation"

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isMobile, setIsMobile] = React.useState(false)
    const isLab = pathname?.startsWith("/lab") || pathname?.startsWith("/terminal")
    const isProjects = pathname?.startsWith("/projects")

    React.useEffect(() => {
        const update = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
        }

        window.addEventListener("resize", update)
        update()

        return () => {
            window.removeEventListener("resize", update)
        }
    }, [])

    return (
        <TerminalWindowProvider>
            <div className="layout-shell flex min-h-screen">
                <Sidebar />

                <div className="layout-main flex-1 min-w-0 flex flex-col min-h-screen transition-all duration-300">
                    <MobileHeader />
                    <HamburgerMenu isVisible={true} />
                    <StyleSettingsDrawer />

                    <main className={cn(
                        "flex-1 page-shell flex flex-col animate-fade-in overflow-x-hidden",
                        !isLab && "justify-center items-center",
                        isMobile && "mobile-content-offset"
                    )}>
                        <div className={cn(
                            "layout-content min-w-0 animate-rise-in",
                            isLab && "layout-content-lab",
                            isProjects && "max-w-3xl"
                        )}>
                            {isLab ? (
                                children
                            ) : (
                                <div className="layout-card">
                                    {children}
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="page-footer text-center text-sm text-muted-foreground mt-auto">
                        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-2">
                            {primaryNavItems.map((link) => (
                                <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center px-2 text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <p className="mt-2 text-xs">Copyright © 2026 Christian J Wilkins. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </TerminalWindowProvider>
    )
}
