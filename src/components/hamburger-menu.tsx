"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { primaryNavItems } from "@/data/navigation"
import { useModalDialog } from "@/components/use-modal-dialog"

export function HamburgerMenu({ isVisible }: { isVisible: boolean }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const dialogRef = useModalDialog(isOpen)
    const closeMenu = () => setIsOpen(false)

    React.useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)")
        const closeOnDesktop = () => { if (media.matches) setIsOpen(false) }
        media.addEventListener("change", closeOnDesktop)
        return () => media.removeEventListener("change", closeOnDesktop)
    }, [])

    if (!isVisible) return null
    return (
        <>
            <button type="button" className="mobile-menu-button fixed z-[1002] flex items-center justify-center w-11 h-11 rounded-full border border-border/70 bg-background text-foreground md:hidden"
                onClick={() => setIsOpen(true)} aria-label="Open navigation menu" aria-expanded={isOpen} aria-controls="mobile-nav">
                <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <dialog ref={dialogRef} id="mobile-nav" aria-label="Navigation menu" onCancel={closeMenu} onClose={closeMenu}
                onClick={(event) => { if (event.target === event.currentTarget) closeMenu() }} className="mobile-nav-dialog surface-panel">
                <button type="button" onClick={closeMenu} aria-label="Close navigation menu" className="absolute top-3 right-4 flex h-11 w-11 items-center justify-center">
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>
                <nav aria-label="Primary" className="flex flex-col gap-2 px-6 py-16">
                    {primaryNavItems.map((item) => (
                        <Link key={item.id} href={item.href} onClick={closeMenu}
                            aria-current={(item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)) ? "page" : undefined}
                            className="nav-link mobile-nav-link min-h-11 flex items-center justify-center text-xl font-semibold font-heading">
                            {item.label}
                        </Link>
                    ))}
                    <div className="mt-4 flex justify-center"><ThemeToggle /></div>
                </nav>
            </dialog>
        </>
    )
}
