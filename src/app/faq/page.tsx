import type { Metadata } from "next";
import { faqContent } from "@/data/seoContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "FAQ | Christian Wilkins",
  description: faqContent.subtitle,
  keywords: [...siteConfig.keywords, "software consulting faq"],
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  openGraph: {
    title: "FAQ | Christian Wilkins",
    description: faqContent.subtitle,
    url: `${siteConfig.url}/faq`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Christian Wilkins",
    description: faqContent.subtitle,
    images: [siteConfig.image],
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="animate-rise-in space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <header className="space-y-3">
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">
          {faqContent.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">{faqContent.subtitle}</p>
      </header>
      <div className="space-y-4">
        {faqContent.items.map((item) => (
          <div key={item.question} className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <h2 className="text-base font-semibold">{item.question}</h2>
            <p className="text-sm text-muted-foreground mt-2">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
