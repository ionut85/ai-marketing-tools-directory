import { useState } from "react";
import { MobileFilters } from "../MobileFilters";
import type { Category, UseCase, FilterState } from "@/lib/types";

const mockCategories: Category[] = [
  { id: "creative-delivery", name: "Creative & Delivery", color: "#000", order: 1, subcategories: [] },
  { id: "measurement-analytics", name: "Measurement & Analytics", color: "#333", order: 2, subcategories: [] },
];

const mockUseCases: UseCase[] = [
  { id: "copywriting", name: "Copywriting" },
  { id: "analytics", name: "Analytics" },
];

const mockCounts = {
  categories: { "creative-delivery": 8, "measurement-analytics": 5 },
  useCases: { copywriting: 6, analytics: 4 },
  pricing: { free: 2, freemium: 5, subscription: 8, enterprise: 3 },
  companyType: { startup: 7, indie: 3, oss: 2 },
};

export default function MobileFiltersExample() {
  const [filters, setFilters] = useState<FilterState>({
    categories: ["creative-delivery"],
    useCases: [],
    pricing: [],
    companyType: [],
    search: "",
  });

  return (
    <MobileFilters
      categories={mockCategories}
      useCases={mockUseCases}
      filters={filters}
      onFilterChange={setFilters}
      toolCounts={mockCounts}
      activeFilterCount={1}
    />
  );
}
