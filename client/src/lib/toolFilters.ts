import type { Tool } from "./types";

/**
 * Tool membership helpers that honor `secondaryCategories`. A tool's primary
 * `category` / `subcategory` is its canonical home, but a tool may also be
 * cross-listed into other views (e.g. an AI Assistant that also executes in
 * Activate). Listing / filter surfaces should use these so cross-listed tools
 * appear in every place they belong, while the detail page and canonical URL
 * stay tied to the primary.
 */

export function toolInCategory(tool: Tool, categoryId: string): boolean {
  if (tool.category === categoryId) return true;
  return (tool.secondaryCategories ?? []).some((s) => s.category === categoryId);
}

export function toolInSubcategory(
  tool: Tool,
  categoryId: string,
  subcategoryId: string,
): boolean {
  if (tool.category === categoryId && tool.subcategory === subcategoryId) {
    return true;
  }
  return (tool.secondaryCategories ?? []).some(
    (s) => s.category === categoryId && s.subcategory === subcategoryId,
  );
}
