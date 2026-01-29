import type { Metadata } from "next";
import Link from "next/link";
import { contactLinks } from "@/data/contactData";
import { siteConfig } from "@/data/siteConfig";
import { ContactLinks } from "@/components/contact-links";

const contactDescription =
  "Contact Christian Wilkins for software consultancy, startup product design, and technical hiring support.";

export const metadata: Metadata = {
  title: "Contact | Christian Wilkins",
  description: contactDescription,
  keywords: [...siteConfig.keywords, "contact software consultant", "software consulting inquiry"],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact Christian Wilkins",
    description: contactDescription,
    url: `${siteConfig.url}/contact`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Contact Christian Wilkins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Christian Wilkins",
    description: contactDescription,
    images: [siteConfig.image],
  },
};

export default function Contact() {
  const contactEmail = contactLinks.find((link) => link.id === "email")?.url.replace("mailto:", "") ?? "";
  const bookingUrl = contactLinks.find((link) => link.id === "call")?.url ?? siteConfig.url;

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Christian Wilkins",
    description: contactDescription,
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "inquiries",
        email: contactEmail,
        url: bookingUrl,
      },
    ],
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
        name: "Contact",
        item: `${siteConfig.url}/contact`,
      },
    ],
  };

  return (
    <div className="animate-rise-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="ui-label text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 font-heading">Contact</h1>
      <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
        Feel free to reach out and connect with me. <br /> <br />
        <span className="hidden sm:inline text-sm text-muted-foreground">
          (Do not book a call without prior communication)
        </span>
      </p>
      <div className="mb-6 sm:mb-8 space-y-3">
        <h2 className="ui-label text-xl font-semibold font-heading">A strong first note includes</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-muted-foreground">
          <li>What you&apos;re building and who it&apos;s for.</li>
          <li>Timeline, stage, and any hard constraints.</li>
          <li>Budget range or engagement size, if known.</li>
        </ul>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/services" className="ui-link">
            Services
          </Link>
          <Link href="/consulting" className="ui-link">
            Consulting
          </Link>
        </div>
      </div>
      <ContactLinks />
    </div>
  );
}
