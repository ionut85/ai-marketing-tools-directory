import { useState } from "react";
import { FilterSidebar } from "../FilterSidebar";
import type { Category, UseCase, FilterState } from "@/lib/types";

const mockCategories: Category[] = [
  { id: "creative-delivery", name: "Creative & Delivery", color: "#000", order: 1, subcategories: [] },
  { id: "measurement-analytics", name: "Measurement & Analytics", color: "#333", order: 2, subcategories: [] },
  { id: "data-enablement", name: "Data Enablement", color: "#666", order: 3, subcategories: [] },
];

const mockUseCases: UseCase[] = [
  { id: "copywriting", name: "Copywriting" },
  { id: "analytics", name: "Analytics" },
  { id: "attribution", name: "Attribution" },
  { id: "automation", name: "Automation" },
];

const mockCounts = {
  categories: { "creative-delivery": 8, "measurement-analytics": 5, "data-enablement": 4 },
  useCases: { copywriting: 6, analytics: 4, attribution: 3, automation: 2 },
  pricing: { free: 2, freemium: 5, paid: 8, enterprise: 3 },
};

export default function FilterSidebarExample() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    useCases: [],
    pricing: [],
    search: "",
  });

  return (
    <div className="w-64">
      <FilterSidebar
        categories={mockCategories}
        useCases={mockUseCases}
        filters={filters}
        onFilterChange={setFilters}
        toolCounts={mockCounts}
      />
    </div>
  );
}
