import type { Metadata } from "next";
import { FAQChat } from "@/components/faq-chat";
import { siteConfig } from "@/data/siteConfig";

const labFaqDescription = "Interactive lab FAQ for Christian Wilkins.";

export const metadata: Metadata = {
  title: "Lab FAQ | Christian Wilkins",
  description: labFaqDescription,
  keywords: [...siteConfig.keywords, "lab faq", "interactive faq"],
  alternates: {
    canonical: `${siteConfig.url}/lab/faq`,
  },
  openGraph: {
    title: "Lab FAQ | Christian Wilkins",
    description: labFaqDescription,
    url: `${siteConfig.url}/lab/faq`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Lab FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lab FAQ | Christian Wilkins",
    description: labFaqDescription,
    images: [siteConfig.image],
  },
};

export default function FAQ() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Lab FAQ",
    description: labFaqDescription,
    url: `${siteConfig.url}/lab/faq`,
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
        name: "Lab",
        item: `${siteConfig.url}/lab`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "FAQ",
        item: `${siteConfig.url}/lab/faq`,
      },
    ],
  };

  return (
    <div className="w-full animate-rise-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="ui-label text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 font-heading">FAQ</h1>
      <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
        hi there! i made this page to help you learn more about me.
      </p>
      <FAQChat />
    </div>
  );
}
