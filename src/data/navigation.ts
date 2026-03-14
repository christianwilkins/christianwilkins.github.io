export interface NavItem {
  id: string;
  href: string;
  label: string;
  action?: "terminal";
}

export const primaryNavItems: NavItem[] = [
  { id: "about", href: "/", label: "About" },
  { id: "consulting", href: "/consulting", label: "Consulting" },
  { id: "projects", href: "/projects", label: "Projects" },
  { id: "cooking", href: "/cooking", label: "Cooking Blog" },
  { id: "contact", href: "/contact", label: "Contact" },
  { id: "lab", href: "/lab", label: "The Lab" },
];
