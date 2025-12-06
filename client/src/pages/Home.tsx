import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { MobileFilters } from "@/components/MobileFilters";
import { ToolGrid } from "@/components/ToolGrid";
import { ResultsCounter } from "@/components/ResultsCounter";
import { useDebounce } from "@/hooks/use-debounce";
import type { Tool, Category, UseCase, FilterState } from "@/lib/types";

import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";
import useCasesData from "@/data/useCases.json";

export default function Home() {
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    useCases: [],
    pricing: [],
    search: "",
  });

  const tools = toolsData as Tool[];
  const categories = categoriesData as Category[];
  const useCases = useCasesData as UseCase[];

  const debouncedSearch = useDebounce(filters.search, 300);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      if (filters.categories.length > 0 && !filters.categories.includes(tool.category)) {
        return false;
      }

      if (filters.useCases.length > 0 && !filters.useCases.some((uc) => tool.useCases.includes(uc))) {
        return false;
      }

      if (filters.pricing.length > 0 && !filters.pricing.includes(tool.pricing)) {
        return false;
      }

      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(searchLower);
        const matchesTagline = tool.tagline.toLowerCase().includes(searchLower);
        const matchesDescription = tool.description.toLowerCase().includes(searchLower);
        const matchesCategory = tool.category.toLowerCase().includes(searchLower);
        const matchesUseCases = tool.useCases.some((uc) =>
          uc.toLowerCase().includes(searchLower)
        );

        if (!matchesName && !matchesTagline && !matchesDescription && !matchesCategory && !matchesUseCases) {
          return false;
        }
      }

      return true;
    });
  }, [tools, filters.categories, filters.useCases, filters.pricing, debouncedSearch]);

  const toolCounts = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    const useCaseCounts: Record<string, number> = {};
    const pricingCounts: Record<string, number> = {};

    tools.forEach((tool) => {
      categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
      tool.useCases.forEach((uc) => {
        useCaseCounts[uc] = (useCaseCounts[uc] || 0) + 1;
      });
      pricingCounts[tool.pricing] = (pricingCounts[tool.pricing] || 0) + 1;
    });

    return {
      categories: categoryCounts,
      useCases: useCaseCounts,
      pricing: pricingCounts,
    };
  }, [tools]);

  const activeFilterCount =
    filters.categories.length + filters.useCases.length + filters.pricing.length;

  const handleToolClick = (tool: Tool) => {
    setLocation(`/tools/${tool.slug}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="border-b bg-background py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl" data-testid="text-hero-title">
              Discover AI x Marketing Tools
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg" data-testid="text-hero-subtitle">
              The comprehensive directory of AI-powered marketing solutions
            </p>
            <div className="mt-8 flex justify-center">
              <SearchBar
                value={filters.search}
                onChange={(search) => setFilters((f) => ({ ...f, search }))}
              />
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <MobileFilters
              categories={categories}
              useCases={useCases}
              filters={filters}
              onFilterChange={setFilters}
              toolCounts={toolCounts}
              activeFilterCount={activeFilterCount}
            />
            <ResultsCounter showing={filteredTools.length} total={tools.length} />
          </div>

          <div className="flex gap-8">
            <div className="hidden w-64 flex-shrink-0 lg:block">
              <FilterSidebar
                categories={categories}
                useCases={useCases}
                filters={filters}
                onFilterChange={setFilters}
                toolCounts={toolCounts}
              />
            </div>

            <div className="flex-1 min-w-0">
              <ToolGrid
                tools={filteredTools}
                categories={categories}
                onToolClick={handleToolClick}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
