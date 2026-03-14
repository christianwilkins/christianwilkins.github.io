import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cookingContent } from "@/data/cookingContent";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cooking Blog | Christian Wilkins",
  description: cookingContent.subtitle,
  keywords: [...siteConfig.keywords, "cooking", "recipe rating", "food inventory"],
  alternates: {
    canonical: `${siteConfig.url}/cooking`,
  },
  openGraph: {
    title: "Cooking Blog | Christian Wilkins",
    description: cookingContent.subtitle,
    url: `${siteConfig.url}/cooking`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Christian Wilkins Cooking Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cooking Blog | Christian Wilkins",
    description: cookingContent.subtitle,
    images: [siteConfig.image],
  },
};

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const active = i < value;
        return (
          <Star
            key={`star-${i}`}
            className={cn(
              "h-4 w-4",
              active ? "fill-amber-400 text-amber-400" : "text-muted-foreground/35"
            )}
          />
        );
      })}
      <span className="ml-2 text-xs text-muted-foreground">{value}/5</span>
    </div>
  );
}

export default function CookingPage() {
  const recipesSchema = cookingContent.recipes.map((recipe) => ({
    "@type": "Recipe",
    name: recipe.title,
    url: recipe.link,
    description: recipe.notes,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: recipe.rating,
      bestRating: 5,
      ratingCount: 1,
    },
  }));

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cooking Blog",
    description: cookingContent.subtitle,
    url: `${siteConfig.url}/cooking`,
    hasPart: recipesSchema,
  };

  const inventoryCount = cookingContent.inventory.length;

  return (
    <div className="animate-rise-in space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">Cooking</Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">{cookingContent.title}</h1>
        <p className="text-base sm:text-lg text-muted-foreground">{cookingContent.subtitle}</p>
        <p className="text-xs text-muted-foreground">Last updated: {cookingContent.updatedAt}</p>
      </header>

      <section className="ui-section space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Recipe scorecards</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {cookingContent.recipes.map((recipe) => (
            <article key={recipe.link} className="rounded-2xl border border-border/70 bg-background/70 p-4 space-y-3">
              <div className="space-y-2">
                <h3 className="text-base font-semibold leading-tight">
                  <Link href={recipe.link} target="_blank" rel="noreferrer" className="ui-link">
                    {recipe.title}
                  </Link>
                </h3>
                <StarRating value={recipe.rating} />
              </div>
              <p className="text-sm text-muted-foreground">{recipe.notes}</p>
              <p className="text-xs text-muted-foreground">
                Cook again: <span className="font-medium text-foreground">{recipe.cookAgain ? "Yes" : "No"}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ui-section space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="ui-label text-2xl font-semibold font-heading">Current inventory</h2>
          <Badge variant="outline" className="text-xs">{inventoryCount} items</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {cookingContent.inventory.map((item) => {
            const quantityText = item.quantity === null ? "on hand" : `${item.quantity} ${item.unit}`.trim();
            return (
              <div key={item.name} className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-1">
                <p className="text-sm font-semibold capitalize">{item.name}</p>
                <p className="text-xs text-muted-foreground">{quantityText}</p>
                <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
