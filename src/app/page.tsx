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
