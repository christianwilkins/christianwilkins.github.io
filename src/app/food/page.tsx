import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/data/siteConfig";
import { readFoodDashboardData } from "@/lib/food-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Food Dashboard | Christian Wilkins",
  description:
    "Read only dashboard for pantry inventory, shopping list, and planned recipes managed by OpenClaw.",
  alternates: {
    canonical: `${siteConfig.url}/food`,
  },
};

function formatQuantity(quantity: number | null, unit: string): string {
  if (quantity === null) {
    return unit ? `unknown ${unit}` : "unknown";
  }

  const formatted = Number.isInteger(quantity)
    ? String(quantity)
    : new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(quantity);

  return unit ? `${formatted} ${unit}` : formatted;
}

function labelForCategory(category: string): string {
  return category.replace(/-/g, " ");
}

export default async function FoodPage() {
  const data = await readFoodDashboardData();

  const inventorySchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Food inventory dashboard",
    description:
      "Live pantry inventory, shopping queue, and recipe plan sourced from local OpenClaw inventory files.",
    url: `${siteConfig.url}/food`,
    dateModified: data.updatedAt,
  };

  const inventoryByCategory = data.inventory.reduce<Record<string, typeof data.inventory>>(
    (accumulator, item) => {
      const key = item.category || "uncategorized";
      if (!accumulator[key]) {
        accumulator[key] = [];
      }

      accumulator[key].push(item);
      return accumulator;
    },
    {},
  );

  const categoryEntries = Object.entries(inventoryByCategory).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <div className="w-full animate-rise-in space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(inventorySchema) }}
      />

      <header className="space-y-4">
        <Badge variant="secondary" className="text-xs">
          Food
        </Badge>
        <h1 className="ui-label text-3xl sm:text-4xl font-bold font-heading">Food dashboard</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Read only view for inventory, shopping, and recipe planning. All updates and recipe
          research stay in OpenClaw chat.
        </p>
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(data.updatedAt).toLocaleString()}
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
          <p className="text-xs text-muted-foreground">Inventory items</p>
          <p className="mt-2 text-2xl font-semibold">{data.summary.inventoryItemCount}</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
          <p className="text-xs text-muted-foreground">Shopping items</p>
          <p className="mt-2 text-2xl font-semibold">{data.summary.shoppingItemCount}</p>
        </div>
        <div className="col-span-2 rounded-2xl border border-border/70 bg-background/70 p-4 sm:col-span-1">
          <p className="text-xs text-muted-foreground">Planned recipes</p>
          <p className="mt-2 text-2xl font-semibold">{data.summary.plannedRecipeCount}</p>
        </div>
      </section>

      <section className="ui-section space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Shopping list</h2>
        <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
          {data.shopping.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing to buy right now.</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {data.shopping.map((item) => (
                <li
                  key={item.name}
                  className="flex min-h-10 flex-col justify-center gap-1 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">
                    {formatQuantity(item.quantity, item.unit)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="ui-section space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Planned recipes</h2>
        {data.recipes.planned.length === 0 ? (
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="text-sm text-muted-foreground">No recipes are in the active plan yet.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {data.recipes.planned.map((recipe) => (
              <a
                key={recipe.link}
                href={recipe.link}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-border/70 bg-background/70 p-4 transition-colors hover:border-border hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <p className="text-sm font-semibold">{recipe.title}</p>
                {recipe.notes ? (
                  <p className="mt-2 text-xs text-muted-foreground">{recipe.notes}</p>
                ) : null}
                <p className="mt-3 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  Open recipe ↗
                </p>
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="ui-section space-y-4">
        <h2 className="ui-label text-2xl font-semibold font-heading">Current inventory</h2>
        <div className="space-y-3">
          {categoryEntries.map(([category, items]) => (
            <div
              key={category}
              className="rounded-2xl border border-border/70 bg-background/70 p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold capitalize">{labelForCategory(category)}</p>
                <p className="text-xs text-muted-foreground">{items.length} items</p>
              </div>
              <ul className="divide-y divide-border/60">
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="flex min-h-10 flex-col justify-center gap-1 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">
                      {formatQuantity(item.quantity, item.unit)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
