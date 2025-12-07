import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, X, ExternalLink } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { Category, UseCase, FilterState } from "@/lib/types";

interface FilterSidebarProps {
  categories: Category[];
  useCases: UseCase[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  toolCounts: {
    categories: Record<string, number>;
    useCases: Record<string, number>;
    pricing: Record<string, number>;
  };
}

const pricingOptions = [
  { id: "free", name: "Free" },
  { id: "freemium", name: "Freemium" },
  { id: "paid", name: "Paid" },
  { id: "enterprise", name: "Enterprise" },
];

export function FilterSidebar({
  categories,
  useCases,
  filters,
  onFilterChange,
  toolCounts,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    useCase: true,
    pricing: true,
  });

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.useCases.length > 0 ||
    filters.pricing.length > 0;

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((c) => c !== categoryId)
      : [...filters.categories, categoryId];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const toggleUseCase = (useCaseId: string) => {
    const newUseCases = filters.useCases.includes(useCaseId)
      ? filters.useCases.filter((u) => u !== useCaseId)
      : [...filters.useCases, useCaseId];
    onFilterChange({ ...filters, useCases: newUseCases });
  };

  const togglePricing = (pricingId: string) => {
    const newPricing = filters.pricing.includes(pricingId)
      ? filters.pricing.filter((p) => p !== pricingId)
      : [...filters.pricing, pricingId];
    onFilterChange({ ...filters, pricing: newPricing });
  };

  const clearAll = () => {
    onFilterChange({
      ...filters,
      categories: [],
      useCases: [],
      pricing: [],
    });
  };

  return (
    <aside className="w-full space-y-4" data-testid="filter-sidebar">
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="w-full justify-start text-muted-foreground"
          data-testid="button-clear-filters"
        >
          <X className="mr-2 h-4 w-4" />
          Clear all filters
        </Button>
      )}

      <Collapsible
        open={openSections.category}
        onOpenChange={(open) => setOpenSections((s) => ({ ...s, category: open }))}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
          Category
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openSections.category && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <label className="flex flex-1 cursor-pointer items-center gap-2">
                <Checkbox
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                  data-testid={`checkbox-category-${category.id}`}
                />
                <span className="text-sm">{category.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  ({toolCounts.categories[category.id] || 0})
                </span>
              </label>
              <Link href={`/category/${category.id}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  data-testid={`link-category-${category.id}`}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={openSections.useCase}
        onOpenChange={(open) => setOpenSections((s) => ({ ...s, useCase: open }))}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
          Use Case
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openSections.useCase && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2 max-h-64 overflow-y-auto">
          {useCases.slice(0, 15).map((useCase) => (
            <label
              key={useCase.id}
              className="flex cursor-pointer items-center gap-2"
            >
              <Checkbox
                checked={filters.useCases.includes(useCase.id)}
                onCheckedChange={() => toggleUseCase(useCase.id)}
                data-testid={`checkbox-usecase-${useCase.id}`}
              />
              <span className="text-sm">{useCase.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                ({toolCounts.useCases[useCase.id] || 0})
              </span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={openSections.pricing}
        onOpenChange={(open) => setOpenSections((s) => ({ ...s, pricing: open }))}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
          Pricing
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openSections.pricing && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {pricingOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2"
            >
              <Checkbox
                checked={filters.pricing.includes(option.id)}
                onCheckedChange={() => togglePricing(option.id)}
                data-testid={`checkbox-pricing-${option.id}`}
              />
              <span className="text-sm">{option.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                ({toolCounts.pricing[option.id] || 0})
              </span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}
