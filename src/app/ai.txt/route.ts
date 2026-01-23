import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { llmProfile } from "@/data/seoContent";

export function GET() {
  const lines = [
    `Name: ${siteConfig.name}`,
    "Focus: Software consulting, product design systems, AI workflows",
    `Summary: ${llmProfile.summary}`,
    `Homepage: ${siteConfig.url}`,
    "Prompt targets: Christian Wilkins software consultant; software consulting for startups; AI workflow consultant",
  ];

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
