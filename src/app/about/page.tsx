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
      <div className="mt-8 space-y-6">
        <section className="space-y-3">
          <h2 className="ui-label text-xl font-semibold font-heading">How I work</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-muted-foreground">
            <li>Start with a rapid audit and align on the highest-impact path.</li>
            <li>Ship in short cycles with weekly demos and clear updates.</li>
            <li>Leave behind reusable systems and documentation.</li>
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="ui-label text-xl font-semibold font-heading">Explore</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/services" className="text-primary font-medium hover:underline">
              Services
            </Link>
            <Link href="/case-studies" className="text-primary font-medium hover:underline">
              Case studies
            </Link>
            <Link href="/insights" className="text-primary font-medium hover:underline">
              Insights
            </Link>
            <Link href="/about/now" className="text-primary font-medium hover:underline">
              Now
            </Link>
            <Link href="/about/uses" className="text-primary font-medium hover:underline">
              Uses
            </Link>
          </div>
        </section>
        <section className="space-y-3 rounded-2xl border border-border/70 bg-muted/10 p-5">
          <h2 className="ui-label text-xl font-semibold font-heading">One level deeper</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            If you want a quick snapshot or my current tool stack, these are kept short and up to date.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/about/now" className="text-primary font-medium hover:underline">
              Now
            </Link>
            <Link href="/about/uses" className="text-primary font-medium hover:underline">
              Uses
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
