import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

const nowDescription =
  "A short snapshot of what Christian Wilkins is focused on right now across AI workflows, product delivery, and UI systems.";

export const metadata: Metadata = {
  title: "Now | Christian Wilkins",
  description: nowDescription,
  keywords: [...siteConfig.keywords, "now page", "current focus"],
  alternates: {
    canonical: `${siteConfig.url}/about/now`,
  },
  openGraph: {
    title: "Now | Christian Wilkins",
    description: nowDescription,
    url: `${siteConfig.url}/about/now`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins Now",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Now | Christian Wilkins",
    description: nowDescription,
    images: [siteConfig.image],
  },
};

export default function NowPage() {
  const nowSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Now",
    description: nowDescription,
    url: `${siteConfig.url}/about/now`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Now",
        item: `${siteConfig.url}/about/now`,
      },
    ],
  };

  return (
    <div className="animate-rise-in space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nowSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="space-y-3">
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">Now</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          A short snapshot of what I&apos;m focused on. If you haven&apos;t seen me in a while, this is the
          short version. Last updated January 25, 2026.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="ui-label text-xl font-semibold font-heading">Current focus</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-muted-foreground">
          <li>AI workflow pilots that move teams from manual steps to reliable automation.</li>
          <li>Design systems and UI architecture for fast-moving product teams.</li>
          <li>Shipping production work in Next.js, React, and modern tooling.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="ui-label text-xl font-semibold font-heading">In the queue</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-muted-foreground">
          <li>More case study writeups and delivery playbooks.</li>
          <li>New Lab experiments around UI systems and workflow tooling.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="ui-label text-xl font-semibold font-heading">If this helps</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          If you&apos;re building a product and need design, engineering, or AI workflow support, reach out.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contact
          </Link>
          <Link href="/services" className="text-primary font-medium hover:underline">
            Services
          </Link>
          <Link href="/projects" className="text-primary font-medium hover:underline">
            Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
