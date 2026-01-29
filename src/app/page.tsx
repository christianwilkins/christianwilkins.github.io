import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Christian Wilkins",
  description: siteConfig.shortDescription,
  keywords: [...siteConfig.keywords, "software consultant portfolio"],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    images: [siteConfig.image],
  },
};

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: siteConfig.title,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="animate-rise-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <h1 className="ui-label text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 font-heading">About</h1>
      <p className="mb-4 text-base sm:text-lg leading-relaxed">
        I&apos;m a software consultant and engineer focused on startups and product design. Based in the
        United States<span className="hidden sm:inline"> and a United States citizen</span>.
      </p>
      <p className="mb-4 text-base sm:text-lg leading-relaxed">
        I&apos;m currently interested in building with AI agents and pushing new workflows
        for AI integration across the stack.
        <span className="hidden sm:inline"> I also focus on design and software consulting.</span>
      </p>
      <p className="mb-4 text-base sm:text-lg leading-relaxed">
        I&apos;ve done a lot of building recently. Check out my{" "}
        <Link href="/projects" className="ui-link">
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
      <div className="mt-8 space-y-6">
        <section className="ui-section space-y-3">
          <h2 className="ui-label text-xl font-semibold font-heading">Current focus</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-muted-foreground">
            <li>Agent-assisted product workflows and rapid prototyping.</li>
            <li>Design systems and UI architecture for fast-moving teams.</li>
            <li>Shipping production work in Next.js, React, and modern tooling.</li>
          </ul>
        </section>
        <section className="ui-section space-y-2">
          <h2 className="ui-label text-xl font-semibold font-heading">Explore</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/services" className="ui-link">
              Services
            </Link>
            <Link href="/case-studies" className="ui-link">
              Case studies
            </Link>
            <Link href="/consulting" className="ui-link">
              Consulting
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
