/**
 * Picks a tool's direct alternatives for its detail page (client and server
 * render both use this). Same subcategory ranks first, then shared use cases;
 * a tool from another subcategory needs the same category and at least one
 * shared use case, so unrelated entries no longer show up.
 */
export interface RelatableTool {
  id: string;
  category: string;
  subcategory: string | null;
  secondaryCategories?: { category: string; subcategory: string | null }[];
  useCases: string[];
}

function homes(t: RelatableTool) {
  return [{ category: t.category, subcategory: t.subcategory }, ...(t.secondaryCategories ?? [])];
}

export function relatedTools<T extends RelatableTool>(tool: T, all: T[], limit = 5): T[] {
  const mine = homes(tool);
  return all
    .filter((t) => t.id !== tool.id)
    .map((t) => {
      const theirs = homes(t);
      const sameSub = theirs.some((h) =>
        mine.some((m) => m.subcategory && m.category === h.category && m.subcategory === h.subcategory),
      );
      const sameCat = theirs.some((h) => mine.some((m) => m.category === h.category));
      const shared = t.useCases.filter((u) => tool.useCases.includes(u)).length;
      const score = (sameSub ? 10 : 0) + shared;
      return { t, keep: sameSub || (sameCat && shared > 0), score };
    })
    .filter((x) => x.keep)
    .sort((a, b) => b.score - a.score) // stable: ties keep tools.json order
    .slice(0, limit)
    .map((x) => x.t);
}
