export interface NavItem {
  id: string;
  href: string;
  label: string;
  action?: "terminal";
}

export const primaryNavItems: NavItem[] = [
  { id: "home", href: "/", label: "Home" },
  { id: "consulting", href: "/consulting", label: "Consulting" },
  { id: "projects", href: "/projects", label: "Projects" },
  { id: "thoughts", href: "/thoughts", label: "Thoughts" },
  { id: "contact", href: "/contact", label: "Contact" },
  { id: "lab", href: "/lab", label: "The Lab" },
];
