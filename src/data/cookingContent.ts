export interface CookingRecipeEntry {
  title: string;
  link: string;
  rating: number;
  cookAgain: boolean;
  notes: string;
}

export interface CookingInventoryItem {
  name: string;
  quantity: number | null;
  unit: string;
  category: string;
}

export const cookingContent = {
  title: "Cooking blog",
  subtitle:
    "Recipe scorecards and current kitchen inventory. This is a practical log, not a polished food magazine.",
  updatedAt: "2026-03-14T10:17:00-04:00",
  recipes: [
    {
      title: "Best Lentil Soup",
      link: "https://cookieandkate.com/best-lentil-soup-recipe/",
      rating: 4,
      cookAgain: true,
      notes: "Worth remaking.",
    },
    {
      title: "Chicken Stew (Budget Bytes)",
      link: "https://www.budgetbytes.com/chicken-stew/",
      rating: 3,
      cookAgain: false,
      notes: "Decent, but there are better chicken soups. Prefers chicken noodle.",
    },
  ] satisfies CookingRecipeEntry[],
  inventory: [
    { name: "chicken thighs", quantity: 3, unit: "lb", category: "protein" },
    { name: "eggs", quantity: 11, unit: "count", category: "protein" },
    { name: "whole chickens", quantity: 2, unit: "count", category: "protein" },
    { name: "oat milk", quantity: 104, unit: "oz", category: "dairy-alternative" },
    { name: "juice", quantity: 104, unit: "oz", category: "beverage" },
    { name: "greek yogurt", quantity: 3.5, unit: "container", category: "protein" },
    { name: "bananas", quantity: 5, unit: "count", category: "produce" },
    { name: "salt", quantity: 1, unit: "container", category: "pantry" },
    { name: "black pepper", quantity: 1, unit: "container", category: "pantry" },
    { name: "assorted spices", quantity: 1, unit: "set", category: "pantry" },
    { name: "lemon", quantity: 1, unit: "count", category: "produce" },
    { name: "whey protein", quantity: 2.5, unit: "lb", category: "protein" },
    { name: "chicken breast", quantity: null, unit: "", category: "protein" },
    { name: "frozen ground beef", quantity: null, unit: "", category: "protein" },
    { name: "frozen chicken stock", quantity: null, unit: "", category: "broth" },
    { name: "red lentils", quantity: null, unit: "", category: "pantry" },
    { name: "quinoa", quantity: null, unit: "", category: "pantry" },
    { name: "black beans", quantity: null, unit: "", category: "pantry" },
    { name: "chickpeas", quantity: null, unit: "", category: "pantry" },
    { name: "whole wheat tortillas", quantity: null, unit: "", category: "pantry" },
    { name: "assorted pasta", quantity: null, unit: "", category: "pantry" },
    { name: "instant ramen (variety)", quantity: null, unit: "", category: "pantry" },
    { name: "frozen broccoli", quantity: null, unit: "", category: "frozen" },
    { name: "frozen italian bread", quantity: null, unit: "", category: "frozen" },
    { name: "carrots", quantity: null, unit: "", category: "produce" },
    { name: "celery", quantity: null, unit: "", category: "produce" },
    { name: "kale", quantity: null, unit: "", category: "produce" },
    { name: "garlic", quantity: null, unit: "", category: "produce" },
    { name: "yellow onions", quantity: null, unit: "", category: "produce" },
    { name: "potatoes", quantity: null, unit: "", category: "produce" },
    { name: "canned diced tomatoes", quantity: null, unit: "", category: "pantry" },
    { name: "canned crushed tomatoes", quantity: null, unit: "", category: "pantry" },
    { name: "oats", quantity: null, unit: "", category: "pantry" },
    { name: "peanuts", quantity: null, unit: "", category: "pantry" },
  ] satisfies CookingInventoryItem[],
} as const;
