"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Button variant="ghost" size="sm" className="theme-toggle">Loading...</Button>
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-toggle"
        >
            {theme === "dark" ? (
                <>
                    <Sun className="h-4 w-4" />
                    Light
                </>
            ) : (
                <>
                    <Moon className="h-4 w-4" />
                    Dark
                </>
            )}
        </Button>
    )
}
