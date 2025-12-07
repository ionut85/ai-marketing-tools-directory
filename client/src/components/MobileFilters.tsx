import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar } from "./FilterSidebar";
import type { Category, UseCase, FilterState } from "@/lib/types";

interface MobileFiltersProps {
  categories: Category[];
  useCases: UseCase[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  toolCounts: {
    categories: Record<string, number>;
    useCases: Record<string, number>;
    pricing: Record<string, number>;
    companyType: Record<string, number>;
  };
  activeFilterCount: number;
}

export function MobileFilters({
  categories,
  useCases,
  filters,
  onFilterChange,
  toolCounts,
  activeFilterCount,
}: MobileFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden" data-testid="button-mobile-filters">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterSidebar
            categories={categories}
            useCases={useCases}
            filters={filters}
            onFilterChange={onFilterChange}
            toolCounts={toolCounts}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
