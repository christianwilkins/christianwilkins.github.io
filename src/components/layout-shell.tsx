"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { HamburgerMenu } from "@/components/hamburger-menu"
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
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col md:ml-[200px] min-h-screen transition-all duration-300">
                <MobileHeader />
                <HamburgerMenu isVisible={true} showStickyHeader={showStickyHeader} />

                <main className={cn(
                    "flex-1 p-8 flex flex-col",
                    !isLab && "justify-center items-center",
                    showStickyHeader && "pt-[80px]"
                )}>
                    <div className={cn(
                        "w-full",
                        isLab ? "max-w-7xl mx-auto" : "max-w-2xl"
                    )}>
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-8 text-center text-sm text-muted-foreground mt-auto">
                    <h4>COPYRIGHT © 2025 Christian J Wilkins. ALL RIGHTS RESERVED.</h4>
                </footer>
            </div>
        </div>
    )
}


