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

    React.useEffect(() => {
        const previous = document.body.style.overflow
        if (isOpen) {
            document.body.style.overflow = "hidden"
            return () => {
                document.body.style.overflow = previous
            }
        }
        document.body.style.overflow = previous
    }, [isOpen])

    if (!isVisible) return null

    return (
        <>
            {/* Hamburger Button */}
            <button
                className={cn(
                    "fixed top-4 right-4 z-[1002] flex flex-col justify-around w-11 h-11 bg-transparent border-none cursor-pointer p-0 focus:outline-none transition-all duration-300 md:hidden",
                    isOpen && "open",
                    showStickyHeader && "top-3"
                )}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
            >
                <span className={cn("w-6 h-0.5 bg-foreground rounded transition-all duration-300 relative origin-[1px]", isOpen && "rotate-45 translate-x-[2px]")} />
                <span className={cn("w-6 h-0.5 bg-foreground rounded transition-all duration-300 relative opacity-100", isOpen && "opacity-0 translate-x-5")} />
                <span className={cn("w-6 h-0.5 bg-foreground rounded transition-all duration-300 relative origin-[1px]", isOpen && "-rotate-45 translate-x-[2px]")} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1001] animate-fade-in"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            {/* Menu */}
            <nav
                id="mobile-nav"
                className={cn(
                    "fixed top-0 right-0 h-full w-[min(80vw,17.5rem)] z-[1001] transform transition-transform duration-300 ease-in-out flex flex-col justify-center items-center animate-soft-pop surface-panel",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
                aria-hidden={!isOpen}
            >
                <div className="flex flex-col gap-5 items-stretch w-full px-6">
                    <Link href="/" onClick={closeMenu} className="nav-link mobile-nav-link text-xl font-semibold transition-colors font-heading hover-lift text-center">About</Link>
                    <Link href="/projects" onClick={closeMenu} className="nav-link mobile-nav-link text-xl font-semibold transition-colors font-heading hover-lift text-center">Projects</Link>
                    <Link href="/contact" onClick={closeMenu} className="nav-link mobile-nav-link text-xl font-semibold transition-colors font-heading hover-lift text-center">Contact</Link>
                    <Link href="/lab" onClick={closeMenu} className="nav-link mobile-nav-link text-xl font-semibold transition-colors font-heading hover-lift text-center">The Lab</Link>
                    <div className="mt-4 flex justify-center">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>
        </>
    )
}
