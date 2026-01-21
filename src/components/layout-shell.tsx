"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { StyleSettingsDrawer } from "@/components/style-settings-drawer"
import { cn } from "@/lib/utils"

import { usePathname } from "next/navigation"

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [showStickyHeader, setShowStickyHeader] = React.useState(false)
    const isLab = pathname?.startsWith("/lab")

    React.useEffect(() => {
        const handleScroll = () => {
            const isMobile = window.innerWidth <= 768
            const scrollY = window.scrollY

            if (isMobile && scrollY > 100) {
                setShowStickyHeader(true)
            } else {
                setShowStickyHeader(false)
            }
        }

        const handleResize = () => {
            if (window.innerWidth > 768) {
                setShowStickyHeader(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)

        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="layout-shell flex min-h-screen">
            <Sidebar />

            <div className="layout-main flex-1 flex flex-col min-h-screen transition-all duration-300">
                <MobileHeader />
                <HamburgerMenu isVisible={true} showStickyHeader={showStickyHeader} />
                <StyleSettingsDrawer />

                <main className={cn(
                    "flex-1 page-shell flex flex-col animate-fade-in",
                    !isLab && "justify-center items-center",
                    showStickyHeader && "pt-[80px]"
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
                </footer>
            </div>
        </div>
    )
}
