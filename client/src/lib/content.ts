/**
 * Long-form page content (category + subcategory bodies) authored as markdown
 * files under `client/src/data/content/`. Loaded at build time via Vite's
 * import.meta.glob so each page can render 500+ words of indexable copy below
 * its tool grid. Meta (title/description/keywords) stays in the JSON files.
 */

const categoryModules = import.meta.glob("../data/content/categories/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const subcategoryModules = import.meta.glob(
  "../data/content/subcategories/*.md",
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;

function toSlugMap(modules: Record<string, string>): Record<string, string> {
  const map: Record<string, string> = {};
  for (const path in modules) {
    const slug = path.split("/").pop()?.replace(/\.md$/, "");
    if (slug) map[slug] = modules[path];
  }
  return map;
}

const categoryBodies = toSlugMap(categoryModules);
const subcategoryBodies = toSlugMap(subcategoryModules);

/** Long-form markdown body for a category, or null if none authored yet. */
export function getCategoryContent(slug: string): string | null {
  return categoryBodies[slug] ?? null;
}

/** Long-form markdown body for a subcategory, or null if none authored yet. */
export function getSubcategoryContent(slug: string): string | null {
  return subcategoryBodies[slug] ?? null;
}
