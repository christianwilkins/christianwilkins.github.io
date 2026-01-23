export interface ContactLink {
  id: "call" | "email" | "github" | "linkedin" | "twitter";
  label: string;
  url: string;
}

export const contactLinks: ContactLink[] = [
  {
    id: "call",
    label: "Book a Call",
    url: "https://cal.com/christianwilkins/book?duration=15",
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:christian.wilkins.careers@gmail.com",
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/christianwilkins",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/christian--wilkins/",
  },
  {
    id: "twitter",
    label: "Twitter",
    url: "https://x.com/christian_wilki",
  },
];
