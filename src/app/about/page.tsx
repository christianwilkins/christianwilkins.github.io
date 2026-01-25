import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { contactLinks } from "@/data/contactData";
import { siteConfig } from "@/data/siteConfig";

const aboutDescription =
  "Christian Wilkins is a software consultant and engineer focused on startups, product design, and AI workflow systems.";

export const metadata: Metadata = {
  title: "About | Christian Wilkins",
  description: aboutDescription,
  keywords: [...siteConfig.keywords, "about Christian Wilkins", "software consultant bio"],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About Christian Wilkins",
    description: aboutDescription,
    url: `${siteConfig.url}/about`,
    type: "profile",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Christian Wilkins",
    description: aboutDescription,
    images: [siteConfig.image],
  },
};

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Christian Wilkins",
    description: aboutDescription,
    url: `${siteConfig.url}/about`,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "Software consultant and engineer",
      sameAs: contactLinks
        .filter((link) => ["github", "linkedin", "twitter"].includes(link.id))
        .map((link) => link.url),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteConfig.url}/about`,
      },
    ],
  };

  return (
    <div className="animate-rise-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="ui-label text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 font-heading">About</h1>
      <p className="mb-4 text-base sm:text-lg leading-relaxed">
        I&apos;m a software consultant and engineer focused on startups and product design. Based in the
        United States and a United States citizen.
      </p>
      <p className="mb-4 text-base sm:text-lg leading-relaxed">
        I&apos;m currently interested in building with AI agents and pushing new workflows for AI
        integration across the stack. I also focus on design and software consulting.
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
