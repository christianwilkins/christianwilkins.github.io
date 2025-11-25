"use client"

import * as React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface HamburgerMenuProps {
    isVisible: boolean
    showStickyHeader: boolean
}

export function HamburgerMenu({ isVisible, showStickyHeader }: HamburgerMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    if (!isVisible) return null

    return (
        <>
            {/* Hamburger Button */}
            <button
                className={cn(
                    "fixed top-5 right-5 z-[1002] flex flex-col justify-around w-8 h-8 bg-transparent border-none cursor-pointer p-0 focus:outline-none transition-all duration-300",
                    isOpen && "open",
                    showStickyHeader && "top-[15px]"
                )}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <span className={cn("w-8 h-0.5 bg-foreground rounded transition-all duration-300 relative origin-[1px]", isOpen && "rotate-45 translate-x-[2px]")} />
                <span className={cn("w-8 h-0.5 bg-foreground rounded transition-all duration-300 relative opacity-100", isOpen && "opacity-0 translate-x-5")} />
                <span className={cn("w-8 h-0.5 bg-foreground rounded transition-all duration-300 relative origin-[1px]", isOpen && "-rotate-45 translate-x-[2px]")} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1001]"
                    onClick={closeMenu}
                />
            )}

            {/* Menu */}
            <nav
                className={cn(
                    "fixed top-0 right-0 h-full w-[300px] bg-background shadow-lg z-[1001] transform transition-transform duration-300 ease-in-out flex flex-col justify-center items-center",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col gap-8 items-center">
                    <Link href="/" onClick={closeMenu} className="text-2xl font-bold hover:text-primary transition-colors font-heading">HOME</Link>
                    <Link href="/about" onClick={closeMenu} className="text-2xl font-bold hover:text-primary transition-colors font-heading">ABOUT</Link>
                    <Link href="/projects" onClick={closeMenu} className="text-2xl font-bold hover:text-primary transition-colors font-heading">PROJECTS</Link>
                    <Link href="/contact" onClick={closeMenu} className="text-2xl font-bold hover:text-primary transition-colors font-heading">CONTACT</Link>
                    <Link href="/faq" onClick={closeMenu} className="text-2xl font-bold hover:text-primary transition-colors font-heading">FAQ</Link>
                    <div className="mt-4">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>
        </>
    )
}
