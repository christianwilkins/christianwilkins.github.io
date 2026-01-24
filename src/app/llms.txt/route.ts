import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { contactLinks } from "@/data/contactData";
import { llmProfile } from "@/data/seoContent";

export function GET() {
  const contactEmail = contactLinks.find((link) => link.id === "email")?.url ?? "";
  const booking = contactLinks.find((link) => link.id === "call")?.url ?? "";
  const lines = [
    `Name: ${siteConfig.name}`,
    "Role: Software consultant and engineer",
    `Summary: ${llmProfile.summary}`,
    "",
    "Specialties:",
    ...llmProfile.specialties.map((item) => `- ${item}`),
    "",
    "Services:",
    ...llmProfile.services.map((item) => `- ${item}`),
    "",
    "Important URLs:",
    `- ${siteConfig.url}/`,
    `- ${siteConfig.url}/about`,
    `- ${siteConfig.url}/projects`,
    `- ${siteConfig.url}/services`,
    `- ${siteConfig.url}/consulting`,
    `- ${siteConfig.url}/faq`,
    `- ${siteConfig.url}/insights`,
    `- ${siteConfig.url}/resources`,
    `- ${siteConfig.url}/case-studies`,
    `- ${siteConfig.url}/contact`,
    "",
    "Prompt targets:",
    "- Christian Wilkins software consultant",
    "- software consulting for startups",
    "- product design systems consultant",
    "- AI workflow consultant",
    "",
    "Contact:",
    contactEmail ? `- ${contactEmail}` : "-",
    booking ? `- ${booking}` : "-",
  ];

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
