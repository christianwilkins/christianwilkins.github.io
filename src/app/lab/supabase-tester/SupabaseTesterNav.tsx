"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/lab/supabase-tester", label: "Overview" },
  { href: "/lab/supabase-tester/results", label: "Results" },
  { href: "/lab/supabase-tester/tables", label: "Tables" },
  { href: "/lab/supabase-tester/writes", label: "Writes" },
  { href: "/lab/supabase-tester/settings", label: "Settings" },
];

export function SupabaseTesterNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-wrap items-center gap-2 text-xs", className)}>
      {navItems.map((item) => {
        const isActive = item.href === "/lab/supabase-tester"
          ? pathname === item.href
          : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full border border-[var(--color-border)] px-3 py-1 font-semibold transition",
              isActive
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-accent)]"
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <Link
        href="/lab"
        className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-semibold text-[var(--color-ink-muted)] transition hover:border-[var(--color-accent)]"
      >
        Lab Home
      </Link>
    </nav>
  );
}
