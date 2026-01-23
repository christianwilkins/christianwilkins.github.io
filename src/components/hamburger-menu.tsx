"use client"

import * as React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { primaryNavItems } from "@/data/navigation"
import { useTerminalWindow } from "@/components/terminal/terminal-window-provider"

interface HamburgerMenuProps {
    isVisible: boolean
}

export function HamburgerMenu({ isVisible }: HamburgerMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const { openTerminal, isOpen: isTerminalOpen } = useTerminalWindow()

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
                    "mobile-menu-button fixed z-[1002] flex items-center justify-center w-11 h-11 rounded-full border border-border/70 bg-background/80 text-foreground shadow-soft backdrop-blur-sm transition-all duration-300 md:hidden"
                )}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
            >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                    {primaryNavItems.map((item) => (
                        item.action === "terminal" ? (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    openTerminal()
                                    closeMenu()
                                }}
                                aria-haspopup="dialog"
                                aria-expanded={isTerminalOpen}
                                className="nav-link mobile-nav-link text-xl font-semibold transition-colors font-heading hover-lift text-center"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={closeMenu}
                                className="nav-link mobile-nav-link text-xl font-semibold transition-colors font-heading hover-lift text-center"
                            >
                                {item.label}
                            </Link>
                        )
                    ))}
                    <div className="mt-4 flex justify-center">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>
        </>
    )
}
