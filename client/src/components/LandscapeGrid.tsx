import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LogoFallback } from "./LogoFallback";
import type { Tool, Category } from "@/lib/types";

interface LandscapeGridProps {
  tools: Tool[];
  categories: Category[];
  onToolClick: (tool: Tool) => void;
}

export function LandscapeGrid({ tools, categories, onToolClick }: LandscapeGridProps) {
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  const getToolsBySubcategory = (categoryId: string, subcategoryId: string) => {
    return tools.filter(
      (tool) => tool.category === categoryId && tool.subcategory === subcategoryId
    );
  };

  return (
    <div className="overflow-x-auto pb-4 flex justify-center" data-testid="landscape-grid">
      <div className="inline-flex gap-4 min-w-max">
        {sortedCategories.map((category) => (
          <div key={category.id} className="w-64 flex-shrink-0">
            <div
              className="mb-3 rounded-md px-3 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: category.color }}
              data-testid={`landscape-category-${category.id}`}
            >
              {category.name}
            </div>

            <div className="space-y-3">
              {category.subcategories
                .sort((a, b) => a.order - b.order)
                .map((subcategory) => {
                  const subcategoryTools = getToolsBySubcategory(
                    category.id,
                    subcategory.id
                  );

                  if (subcategoryTools.length === 0) return null;

                  return (
                    <div
                      key={subcategory.id}
                      className="rounded-md border bg-card p-3"
                      data-testid={`landscape-subcategory-${subcategory.id}`}
                    >
                      <div className="mb-2 text-xs font-medium text-muted-foreground">
                        {subcategory.name}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {subcategoryTools.map((tool) => (
                          <Tooltip key={tool.id}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => onToolClick(tool)}
                                className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                                data-testid={`landscape-tool-${tool.slug}`}
                              >
                                {tool.logo ? (
                                  <img
                                    src={tool.logo}
                                    alt={tool.name}
                                    className="h-8 w-8 rounded-md object-contain"
                                  />
                                ) : (
                                  <LogoFallback name={tool.name} size="md" />
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">{tool.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {tool.tagline}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
