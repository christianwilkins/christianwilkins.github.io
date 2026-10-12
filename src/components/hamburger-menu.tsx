"use client"

import * as React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { primaryNavItems } from "@/data/navigation"
import { MoreNavigation } from "@/components/more-navigation"

interface HamburgerMenuProps {
    isVisible: boolean
}

export function HamburgerMenu({ isVisible }: HamburgerMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const navRef = React.useRef<HTMLElement>(null)

    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    React.useEffect(() => {
        const previous = document.body.style.overflow
        if (isOpen) {
            document.body.style.overflow = "hidden"
            navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus()
            const onKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Escape") setIsOpen(false)
                if (event.key !== "Tab") return
                const controls = [buttonRef.current, ...Array.from(navRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [])].filter((item): item is HTMLElement => !!item)
                const first = controls[0]
                const last = controls[controls.length - 1]
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault()
                    last?.focus()
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault()
                    first?.focus()
                }
            }
            document.addEventListener("keydown", onKeyDown)
            return () => {
                document.body.style.overflow = previous
                document.removeEventListener("keydown", onKeyDown)
                buttonRef.current?.focus()
            }
        }
        document.body.style.overflow = previous
    }, [isOpen])

    if (!isVisible) return null

    return (
        <>
            {/* Hamburger Button */}
            <button
                ref={buttonRef}
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
                ref={navRef}
                id="mobile-nav"
                aria-label="Mobile navigation"
                inert={!isOpen}
                className={cn(
                    "mobile-nav-panel fixed top-0 right-0 h-full w-[min(80vw,17.5rem)] z-[1001] transform transition-transform duration-300 ease-in-out flex flex-col justify-center items-center animate-soft-pop surface-panel",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
                aria-hidden={!isOpen}
            >
                <div className="flex flex-col gap-5 items-stretch w-full px-6">
                    {primaryNavItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={closeMenu}
                            className="nav-link mobile-nav-link text-xl font-semibold transition-colors font-heading hover-lift text-center"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <MoreNavigation mobile onNavigate={closeMenu} />
                    <div className="mt-4 flex justify-center">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>
        </>
    )
}
