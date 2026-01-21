import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Christian Wilkins",
  description:
    "Christian Wilkins is a software consultant and engineer focused on startups, freelance product design, and hiring support for top CS candidates in the United States.",
};

export default function Home() {
  return (
    <div className="animate-rise-in">
      <h1 className="ui-label text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 font-heading">About</h1>
      <p className="mb-4 text-base sm:text-lg leading-relaxed">
        I&apos;m a software consultant and engineer focused on startups and product design. Based in the
        United States<span className="hidden sm:inline"> and a United States citizen</span>.
      </p>
      <p className="mb-4 text-base sm:text-lg leading-relaxed">
        I&apos;m currently interested in building with AI agents and pushing cutting edge workflows
        for AI integration across every level of development.
        <span className="hidden sm:inline"> I also focus on design and software consulting.</span>
      </p>
      <p className="mb-4 text-base sm:text-lg leading-relaxed">
        I&apos;ve done a lot of building recently. Check out my{" "}
        <Link href="/projects" className="text-primary hover:underline font-medium">
          projects
        </Link>
        .
      </p>
      <div className="mt-6">
        <Button asChild size="lg">
          <Link href="/contact" className="ui-label">
            Start a project
          </Link>
        </Button>
      </div>
    </div>
  );
}
