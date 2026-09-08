import { personalBrand } from "@/data/personalBrand";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { thoughtPosts } from "@/data/thoughtsContent";
import "./home.css";
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
    <div className="home-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <section className="home-intro" aria-labelledby="home-heading">
        <div className="home-intro-copy">
          <p className="home-role">{personalBrand.role}</p>
          <h1 id="home-heading">From first idea to working product.</h1>
          <p className="home-description">I’m Christian. I build products, design systems, and AI workflows with founders who want to make something useful.</p>
          <div className="home-actions">
            <Link href="/contact" className="home-button">Start a project <ArrowUpRight aria-hidden="true" /></Link>
            <Link href="/about" className="home-text-link">More about me <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
        <figure className="home-portrait">
          <img src="/assets/pfp.jpg" width="7911" height="7911" alt="Christian Wilkins" fetchPriority="high" />
          <figcaption>Founder of <a href={personalBrand.company.url}>{personalBrand.company.name}</a></figcaption>
        </figure>
      </section>

      <section className="home-work" aria-labelledby="work-heading">
        <div className="home-section-heading">
          <h2 id="work-heading">Selected work</h2>
          <Link href="/projects" className="home-text-link">All projects <ArrowRight aria-hidden="true" /></Link>
        </div>
        <article className="home-feature">
          <a href={personalBrand.company.url} className="home-project-image" aria-label="Visit ForgePeak Ventures website">
            <img src="/assets/forgepeak-website.png" alt="ForgePeak Ventures website, featuring its technical cofounder services" width="1440" height="1000" loading="lazy" />
          </a>
          <div className="home-feature-copy">
            <p className="home-project-role">{personalBrand.company.role}</p>
            <h3>{personalBrand.company.name}</h3>
            <p>My consulting company. I work with founders on technical direction and software delivery, and designed and built the company’s website.</p>
            <a href={personalBrand.company.url} className="home-text-link">Explore ForgePeak <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </article>
        <div className="home-project-list">
          <a href="https://www.joinpaira.com/" className="home-project-row">
            <div><h3>Paira</h3><p>Backend engineering for double date matching and real time messaging.</p></div>
            <span>Mobile app <ArrowUpRight aria-hidden="true" /></span>
          </a>
          <a href="https://resumetailor.ai" className="home-project-row">
            <div><h3>Resume Tailor AI</h3><p>Structured AI workflows for targeted, consistent resume edits.</p></div>
            <span>AI product <ArrowUpRight aria-hidden="true" /></span>
          </a>
        </div>
      </section>

      <section className="home-notes" aria-labelledby="notes-heading">
        <div className="home-notes-intro">
          <h2 id="notes-heading">Outside the code.</h2>
          <p>Notes on work, technology, and whatever has my attention.</p>
          <Link href="/thoughts" className="home-text-link">All thoughts <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="home-notes-list">
          {thoughtPosts.slice(0, 2).map((post) => (
            <Link key={post.slug} href={`/thoughts/${post.slug}`} className="home-note">
              <time dateTime={post.date}>{new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>
              <h3>{post.title} <ArrowUpRight aria-hidden="true" /></h3>
              <p>{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-contact" aria-labelledby="contact-heading">
        <div><h2 id="contact-heading">Have something in mind?</h2><p>Tell me what you’re building and where you need a hand.</p></div>
        <Link href="/contact" className="home-button">Let’s talk <ArrowUpRight aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
