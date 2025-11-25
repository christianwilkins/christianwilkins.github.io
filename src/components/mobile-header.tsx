"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MobileHeader() {
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
        <div className={cn(
            "fixed top-0 left-0 right-0 z-[1000] px-4 py-2 pr-[70px] backdrop-blur-md transition-all duration-300 hidden",
            showStickyHeader && "block bg-background/90 border-b border-border"
        )}>
            <Link
                href="/"
                className="text-inherit no-underline cursor-pointer block transform translate-y-1"
            >
                <h2 className="m-0 leading-[1.2] text-xl font-bold font-heading">
                    CHRIS WILKINS
                </h2>
            </Link>
        </div>
    )
}
