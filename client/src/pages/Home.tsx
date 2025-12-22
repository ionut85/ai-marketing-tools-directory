import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { MobileFilters } from "@/components/MobileFilters";
import { ToolGrid } from "@/components/ToolGrid";
import { ResultsCounter } from "@/components/ResultsCounter";
import { SEO, generateDirectoryJsonLd } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import type { Tool, Category, UseCase, FilterState } from "@/lib/types";

import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";
import useCasesData from "@/data/useCases.json";

const TOOLS_PER_PAGE = 15;

export default function Home() {
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    useCases: [],
    pricing: [],
    companyType: [],
    search: "",
  });

  const tools = toolsData as Tool[];
  const categories = categoriesData as Category[];
  const useCases = useCasesData as UseCase[];

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.categories, filters.useCases, filters.pricing, filters.companyType, debouncedSearch]);

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

      if (filters.companyType.length > 0 && !filters.companyType.includes(tool.companyType)) {
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
  }, [tools, filters.categories, filters.useCases, filters.pricing, filters.companyType, debouncedSearch]);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * TOOLS_PER_PAGE;
    return filteredTools.slice(startIndex, startIndex + TOOLS_PER_PAGE);
  }, [filteredTools, currentPage]);

  const totalPages = Math.ceil(filteredTools.length / TOOLS_PER_PAGE);

  const toolCounts = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    const useCaseCounts: Record<string, number> = {};
    const pricingCounts: Record<string, number> = {};
    const companyTypeCounts: Record<string, number> = {};

    tools.forEach((tool) => {
      categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
      tool.useCases.forEach((uc) => {
        useCaseCounts[uc] = (useCaseCounts[uc] || 0) + 1;
      });
      pricingCounts[tool.pricing] = (pricingCounts[tool.pricing] || 0) + 1;
      companyTypeCounts[tool.companyType] = (companyTypeCounts[tool.companyType] || 0) + 1;
    });

    return {
      categories: categoryCounts,
      useCases: useCaseCounts,
      pricing: pricingCounts,
      companyType: companyTypeCounts,
    };
  }, [tools]);

  const activeFilterCount =
    filters.categories.length + filters.useCases.length + filters.pricing.length + filters.companyType.length;

  const handleToolClick = (tool: Tool) => {
    setLocation(`/tools/${tool.slug}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Discover Practical GenAI Marketing Tools"
        description="Explore the GenAI Marketing Landscape - discover AI-powered tools to plan, create, activate, and measure your marketing campaigns."
        keywords={["AI marketing tools", "marketing automation", "AI advertising", "marketing analytics", "creative AI"]}
        canonicalUrl="/"
        jsonLd={generateDirectoryJsonLd()}
      />
      <Header />

      <section className="border-b bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl" data-testid="text-hero-title">
              GenAI Marketing Landscape
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg" data-testid="text-hero-subtitle">
              Discover AI-powered tools to plan, create, activate, and measure your marketing
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
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <MobileFilters
              categories={categories}
              useCases={useCases}
              filters={filters}
              onFilterChange={setFilters}
              toolCounts={toolCounts}
              activeFilterCount={activeFilterCount}
            />
            <ResultsCounter showing={paginatedTools.length} total={filteredTools.length} />
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
                tools={paginatedTools}
                categories={categories}
                onToolClick={handleToolClick}
              />

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2" data-testid="pagination-controls">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    data-testid="button-prev-page"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let page: number;
                      if (totalPages <= 7) {
                        page = i + 1;
                      } else if (currentPage <= 4) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 3) {
                        page = totalPages - 6 + i;
                      } else {
                        page = currentPage - 3 + i;
                      }
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          data-testid={`button-page-${page}`}
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    data-testid="button-next-page"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
