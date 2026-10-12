"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { moreNavItems } from "@/data/navigation";

export function MoreNavigation({ mobile = false, onNavigate }: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const active = moreNavItems.some(item => item.href.startsWith("/") && pathname?.startsWith(item.href));

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  const links = moreNavItems.map(item => (
    <Link key={item.id} href={item.href}
      aria-current={item.href.startsWith("/") && pathname?.startsWith(item.href) ? "page" : undefined}
      className="more-nav-link font-heading"
      onClick={() => { setOpen(false); onNavigate?.(); }}>
      {item.label}
      {!item.href.startsWith("/") && <ArrowUpRight size={14} aria-hidden="true" />}
    </Link>
  ));

  if (mobile) return <div className="mobile-more-navigation">
    <span className="more-nav-label">More</span>
    {links}
  </div>;

  return <div className="more-navigation" ref={root}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
    <button ref={trigger} type="button" className="nav-link more-nav-trigger text-lg font-heading"
      aria-expanded={open} aria-controls={id} data-active={active || undefined}
      onClick={() => setOpen(value => !value)}>
      More <ChevronDown size={14} aria-hidden="true" />
    </button>
    {open && <div id={id} className="more-nav-panel">{links}</div>}
  </div>;
}
