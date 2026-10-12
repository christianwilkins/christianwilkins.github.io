export interface NavItem {
  id: string;
  href: string;
  label: string;
  action?: "terminal";
  matchPaths?: string[];
}

export const primaryNavItems: NavItem[] = [
  { id: "projects", href: "/projects", label: "Work", matchPaths: ["/projects", "/consulting", "/services", "/case-studies", "/resources", "/faq"] },
  { id: "thoughts", href: "/thoughts", label: "Thoughts", matchPaths: ["/thoughts", "/insights"] },
  { id: "lab", href: "/lab", label: "Fun Stuff" },
  { id: "contact", href: "/contact", label: "Contact" },
];

export function isNavItemActive(item: NavItem, pathname: string | null): boolean {
  return (item.matchPaths ?? [item.href]).some(path =>
    pathname === path || pathname?.startsWith(`${path}/`)
  );
}
