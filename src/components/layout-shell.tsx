"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { cn } from "@/lib/utils"

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const [showStickyHeader, setShowStickyHeader] = React.useState(false)

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
                <HamburgerMenu isVisible={false} showStickyHeader={showStickyHeader} />

                <main className={cn(
                    "flex-1 p-8 flex flex-col justify-center items-center",
                    showStickyHeader && "pt-[80px]"
                )}>
                    <div className="w-full max-w-2xl">
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
