export interface NavItem {
  id: string;
  href: string;
  label: string;
  action?: "terminal";
}

export const primaryNavItems: NavItem[] = [
  { id: "about", href: "/", label: "About" },
  { id: "services", href: "/services", label: "Services" },
  { id: "consulting", href: "/consulting", label: "Consulting" },
  { id: "case-studies", href: "/case-studies", label: "Case Studies" },
  { id: "projects", href: "/projects", label: "Projects" },
  { id: "contact", href: "/contact", label: "Start a project" },
  { id: "lab", href: "/lab", label: "The Lab" },
];
