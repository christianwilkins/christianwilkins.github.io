import fs from "node:fs/promises";
import path from "node:path";

export interface FoodStockItem {
  name: string;
  quantity: number | null;
  unit: string;
  category: string;
}

export interface RecipeHistoryItem {
  title: string;
  link: string;
  cookStatus: string;
  cookAgain: boolean | null;
  rating: number | null;
  notes: string;
}

interface FoodLogEntry {
  timestamp: string;
  action: string;
  item: string;
  quantity: string;
  unit: string;
  note: string;
}

export interface ShoppingItem {
  name: string;
  quantity: number;
  unit: string;
}

export interface FoodDashboardData {
  updatedAt: string;
  source: {
    dataDir: string;
    inventoryPath: string;
    logPath: string;
    recipesPath: string;
  };
  summary: {
    inventoryItemCount: number;
    shoppingItemCount: number;
    plannedRecipeCount: number;
    backlogRecipeCount: number;
  };
  inventory: FoodStockItem[];
  shopping: ShoppingItem[];
  recipes: {
    planned: RecipeHistoryItem[];
    backlog: RecipeHistoryItem[];
  };
}

const DEFAULT_DATA_DIR =
  process.env.FOOD_DATA_DIR ?? path.resolve(process.cwd(), "..", "inventory");

function normalizeItemName(value: string): string {
  return value.trim().toLowerCase();
}

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      const nextChar = line[i + 1];
      if (inQuotes && nextChar === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function parseFoodLog(csv: string): FoodLogEntry[] {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);

  if (lines.length <= 1) return [];

  const headers = parseCsvLine(lines[0]);
  const entries: FoodLogEntry[] = [];

  for (const line of lines.slice(1)) {
    const cells = parseCsvLine(line);
    const row = Object.fromEntries(
      headers.map((header, index) => [header, cells[index] ?? ""]),
    ) as Record<string, string>;

    entries.push({
      timestamp: row.timestamp ?? "",
      action: row.action ?? "",
      item: row.item ?? "",
      quantity: row.quantity ?? "",
      unit: row.unit ?? "",
      note: row.note ?? "",
    });
  }

  return entries;
}

function sortInventory(items: FoodStockItem[]): FoodStockItem[] {
  return [...items].sort((a, b) => {
    const byCategory = a.category.localeCompare(b.category);
    if (byCategory !== 0) return byCategory;
    return a.name.localeCompare(b.name);
  });
}

function buildShoppingList(logEntries: FoodLogEntry[]): ShoppingItem[] {
  const planned = new Map<string, ShoppingItem>();
  const added = new Map<string, number>();

  for (const entry of logEntries) {
    const key = normalizeItemName(entry.item);
    if (!key) continue;

    const quantity = parseNumericValue(entry.quantity) ?? 1;

    if (entry.action === "planned-buy") {
      const current = planned.get(key) ?? {
        name: entry.item,
        quantity: 0,
        unit: entry.unit,
      };

      current.quantity += quantity;
      current.unit = current.unit || entry.unit;
      current.name = entry.item || current.name;
      planned.set(key, current);
      continue;
    }

    if (entry.action === "add") {
      const currentAdded = added.get(key) ?? 0;
      added.set(key, currentAdded + quantity);
    }
  }

  const shopping: ShoppingItem[] = [];

  for (const [key, plannedItem] of planned.entries()) {
    const consumed = added.get(key) ?? 0;
    const remaining = plannedItem.quantity - consumed;

    if (remaining > 0) {
      shopping.push({
        name: plannedItem.name,
        quantity: Number(remaining.toFixed(2)),
        unit: plannedItem.unit,
      });
    }
  }

  return shopping.sort((a, b) => a.name.localeCompare(b.name));
}

export async function readFoodDashboardData(): Promise<FoodDashboardData> {
  const inventoryPath = path.join(DEFAULT_DATA_DIR, "food-stock.json");
  const logPath = path.join(DEFAULT_DATA_DIR, "food-log.csv");
  const recipesPath = path.join(DEFAULT_DATA_DIR, "recipe-history.json");

  const [inventoryRaw, logRaw, recipeHistoryRaw] = await Promise.all([
    fs.readFile(inventoryPath, "utf8"),
    fs.readFile(logPath, "utf8"),
    fs.readFile(recipesPath, "utf8"),
  ]);

  const inventoryJson = JSON.parse(inventoryRaw) as {
    updatedAt?: string;
    items?: FoodStockItem[];
  };

  const recipeHistoryJson = JSON.parse(recipeHistoryRaw) as {
    updatedAt?: string;
    recipes?: RecipeHistoryItem[];
  };

  const inventory = sortInventory(inventoryJson.items ?? []);
  const logEntries = parseFoodLog(logRaw);
  const shopping = buildShoppingList(logEntries);

  const allRecipes = recipeHistoryJson.recipes ?? [];
  const plannedRecipes = allRecipes.filter(
    (recipe) => recipe.cookStatus === "plan to cook",
  );
  const backlogRecipes = allRecipes.filter(
    (recipe) => recipe.cookStatus === "want to cook",
  );

  return {
    updatedAt:
      inventoryJson.updatedAt ??
      recipeHistoryJson.updatedAt ??
      new Date().toISOString(),
    source: {
      dataDir: DEFAULT_DATA_DIR,
      inventoryPath,
      logPath,
      recipesPath,
    },
    summary: {
      inventoryItemCount: inventory.length,
      shoppingItemCount: shopping.length,
      plannedRecipeCount: plannedRecipes.length,
      backlogRecipeCount: backlogRecipes.length,
    },
    inventory,
    shopping,
    recipes: {
      planned: plannedRecipes,
      backlog: backlogRecipes,
    },
  };
}
