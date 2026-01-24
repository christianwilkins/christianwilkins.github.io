import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { resourcesContent } from "@/data/resourcesContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Resources | Christian Wilkins",
  description: resourcesContent.subtitle,
  keywords: [...siteConfig.keywords, "software consulting resources", "product design resources"],
  alternates: {
    canonical: `${siteConfig.url}/resources`,
  },
  openGraph: {
    title: "Resources | Christian Wilkins",
    description: resourcesContent.subtitle,
    url: `${siteConfig.url}/resources`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Christian Wilkins",
    description: resourcesContent.subtitle,
    images: [siteConfig.image],
  },
};

export default function ResourcesPage() {
  const resourcesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: resourcesContent.title,
    description: resourcesContent.subtitle,
    url: `${siteConfig.url}/resources`,
    about: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    hasPart: [
      ...resourcesContent.playbooks.map((item) => ({
        "@type": "CreativeWork",
        name: item.title,
        description: item.description,
      })),
      ...resourcesContent.stack.map((item) => ({
        "@type": "CreativeWork",
        name: item.title,
        description: item.description,
      })),
    ],
  };

  return (
    <div className="animate-rise-in space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesSchema) }}
      />
      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">Resources</Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">
          {resourcesContent.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">{resourcesContent.subtitle}</p>
      </header>

      <section className="space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Signature playbooks</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {resourcesContent.playbooks.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Tools and stack</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {resourcesContent.stack.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/70 bg-muted/20 p-4">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Prompt-ready profile</h2>
        <div className="rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted-foreground space-y-2">
          {resourcesContent.promptProfile.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
