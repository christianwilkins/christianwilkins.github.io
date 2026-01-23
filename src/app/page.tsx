import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";
import { faqContent } from "@/data/seoContent";

export const metadata: Metadata = {
  title: "Christian Wilkins",
  description: siteConfig.shortDescription,
};

export default function Home() {
  const homeFaqItems = faqContent.items.slice(0, 3);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="animate-rise-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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

      <section className="mt-10 sm:mt-12 space-y-4">
        <h2 className="ui-label text-2xl sm:text-3xl font-semibold font-heading">
          Christian Wilkins software consultant for startups
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          I help founders and teams ship polished products, strengthen engineering workflows, and
          build scalable front-end systems. My consulting blends product design, software engineering,
          and AI workflow experimentation for fast-moving startups.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
            <p className="text-sm font-semibold ui-label">Core focus</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Software consulting and technical strategy</li>
              <li>Product design systems and UI architecture</li>
              <li>AI-enabled workflows and automation</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
            <p className="text-sm font-semibold ui-label">Engagements</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Fractional product and engineering leadership</li>
              <li>Rapid prototypes for MVP validation</li>
              <li>Hiring support and technical evaluations</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/projects" className="text-primary font-medium hover:underline">
            See case studies
          </Link>
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Book a discovery call
          </Link>
        </div>
      </section>

      <section className="mt-10 sm:mt-12 space-y-4">
        <h2 className="ui-label text-2xl sm:text-3xl font-semibold font-heading">
          Software consulting FAQ
        </h2>
        <div className="grid gap-4">
          {homeFaqItems.map((item) => (
            <div key={item.question} className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <p className="text-sm font-semibold">{item.question}</p>
              <p className="text-sm text-muted-foreground mt-2">{item.answer}</p>
            </div>
          ))}
        </div>
        <Link href="/faq" className="text-sm text-primary font-medium hover:underline">
          Read the full FAQ
        </Link>
      </section>
    </div>
  );
}
