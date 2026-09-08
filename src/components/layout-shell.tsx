"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { StyleSettingsDrawer } from "@/components/style-settings-drawer"
import { TerminalWindowProvider } from "@/components/terminal/terminal-window-provider"
import { cn } from "@/lib/utils"
import { seoFooterLinks } from "@/data/seoContent"

import { usePathname } from "next/navigation"
import { useLocation } from "react-router-dom"

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const location = useLocation()
    const mainRef = React.useRef<HTMLElement>(null)
    const previousPath = React.useRef(pathname)
    const isLab = pathname?.startsWith("/lab") || pathname?.startsWith("/terminal")
    const isProjects = pathname?.startsWith("/projects")

    React.useEffect(() => {
        if (previousPath.current === pathname) return
        previousPath.current = pathname
        const frame = requestAnimationFrame(() => {
            let anchorId = location.hash.slice(1)
            try { anchorId = decodeURIComponent(anchorId) } catch { /* Keep malformed fragments safe. */ }
            const anchor = anchorId ? document.getElementById(anchorId) : null
            mainRef.current?.focus({ preventScroll: true })
            if (anchor) anchor.scrollIntoView()
            else window.scrollTo({ top: 0, behavior: "instant" })
        })
        return () => cancelAnimationFrame(frame)
    }, [pathname, location.hash])

    return (
        <TerminalWindowProvider>
            <div className={cn("layout-shell flex min-h-screen", pathname === "/" && "layout-home")}>
                <a href="#main-content" className="skip-link">Skip to content</a>
                <Sidebar />

                <div className="layout-main flex-1 min-w-0 flex flex-col min-h-screen transition-all duration-300">
                    <MobileHeader />
                    <HamburgerMenu isVisible={true} />

                    <main id="main-content" ref={mainRef} tabIndex={-1} className={cn(
                        "flex-1 page-shell flex flex-col animate-fade-in overflow-x-hidden",
                        !isLab && "justify-center items-center",
                        "mobile-content-offset"
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
                        <p>Copyright © 2026 Christian Wilkins. All rights reserved.</p>
                        <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                            {seoFooterLinks.map((link) => (
                                <a key={link.href} href={link.href} className="hover:text-foreground">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <StyleSettingsDrawer inline={pathname === "/"} />
                    </footer>
                </div>
            </div>
        </TerminalWindowProvider>
    )
}
