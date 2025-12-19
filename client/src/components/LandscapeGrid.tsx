import { Link } from "wouter";
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

  // Split categories into regular (with subcategories) and general (without)
  const regularCategories = sortedCategories.filter(cat => cat.subcategories.length > 0);
  const generalCategory = sortedCategories.find(cat => cat.id === 'general');

  // Gradient colors from Plan to Measure
  const gradientStart = '#ea580c'; // Plan orange
  const gradientEnd = '#fdba74';   // Measure orange

  const getToolsBySubcategory = (categoryId: string, subcategoryId: string) => {
    return tools.filter(
      (tool) => tool.category === categoryId && tool.subcategory === subcategoryId
    );
  };

  const getToolsByCategory = (categoryId: string) => {
    return tools.filter((tool) => tool.category === categoryId);
  };

  return (
    <div className="pb-4 flex flex-col items-center gap-4" data-testid="landscape-grid">
      {/* Regular categories in horizontal scroll */}
      <div className="overflow-x-auto w-full flex justify-center">
        <div className="inline-flex gap-4 min-w-max">
          {/* Regular categories (Plan, Create, Activate, Measure) */}
          {regularCategories.map((category) => (
          <div key={category.id} className="w-64 flex-shrink-0">
            <Link
              href={`/category/${category.id}`}
              className="mb-3 block rounded-md px-3 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity cursor-pointer"
              style={{ backgroundColor: category.color }}
              data-testid={`landscape-category-${category.id}`}
            >
              {category.name}
            </Link>

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

      {/* General category (Full-width section below) */}
      {generalCategory && (() => {
        const generalTools = getToolsByCategory(generalCategory.id);
        if (generalTools.length === 0) return null;

        return (
          <div
            key={generalCategory.id}
            className="w-full max-w-[1088px] px-4"
            data-testid="landscape-category-general"
          >
            {/* Mobile: solid color */}
            <Link
              href="/category/general"
              className="mb-3 block rounded-md px-3 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity cursor-pointer lg:hidden"
              style={{ backgroundColor: generalCategory.color }}
            >
              {generalCategory.name}
            </Link>

            {/* Desktop: gradient */}
            <Link
              href="/category/general"
              className="mb-3 hidden rounded-md px-3 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity cursor-pointer lg:block"
              style={{
                background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
              }}
            >
              {generalCategory.name}
            </Link>

            {/* Tool container (no subcategory label) */}
            <div className="rounded-md border bg-card p-3">
              <div className="flex flex-wrap gap-2">
                {generalTools.map((tool) => (
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
          </div>
        );
      })()}
    </div>
  );
}
