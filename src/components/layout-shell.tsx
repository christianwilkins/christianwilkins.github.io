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

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isMobile, setIsMobile] = React.useState(false)
    const isLab = pathname?.startsWith("/lab") || pathname?.startsWith("/terminal")

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

                <div className="layout-main flex-1 flex flex-col min-h-screen transition-all duration-300">
                    <MobileHeader />
                    <HamburgerMenu isVisible={true} />
                    <StyleSettingsDrawer />

                    <main className={cn(
                        "flex-1 page-shell flex flex-col animate-fade-in",
                        !isLab && "justify-center items-center",
                        isMobile && "mobile-content-offset"
                    )}>
                        <div className={cn(
                            "layout-content animate-rise-in",
                            isLab && "layout-content-lab"
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
                        <h4>Copyright © 2025 Christian J Wilkins. All rights reserved.</h4>
                        <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                            {seoFooterLinks.map((link) => (
                                <a key={link.href} href={link.href} className="hover:text-foreground">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </footer>
                </div>
            </div>
        </TerminalWindowProvider>
    )
}
