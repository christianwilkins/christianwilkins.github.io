export interface NavItem {
  id: string;
  href: string;
  label: string;
  action?: "terminal";
}

export const primaryNavItems: NavItem[] = [
  { id: "about", href: "/", label: "About" },
  { id: "projects", href: "/projects", label: "Projects" },
  { id: "contact", href: "/contact", label: "Contact" },
  { id: "lab", href: "/lab", label: "The Lab" },
];
