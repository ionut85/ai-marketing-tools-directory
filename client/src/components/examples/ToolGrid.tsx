import { ToolGrid } from "../ToolGrid";
import type { Tool, Category } from "@/lib/types";

const mockTools: Tool[] = [
  {
    id: "jasper",
    slug: "jasper",
    name: "Jasper",
    tagline: "AI copilot for enterprise marketing teams",
    description: "",
    logo: null,
    screenshot: null,
    website: "https://jasper.ai",
    category: "creative-delivery",
    subcategory: "content-creation",
    useCases: ["copywriting"],
    pricing: "paid",
    founded: 2021,
    social: {},
  },
  {
    id: "copy-ai",
    slug: "copy-ai",
    name: "Copy.ai",
    tagline: "AI-powered content creation platform",
    description: "",
    logo: null,
    screenshot: null,
    website: "https://copy.ai",
    category: "creative-delivery",
    subcategory: "content-creation",
    useCases: ["copywriting"],
    pricing: "freemium",
    founded: 2020,
    social: {},
  },
  {
    id: "segment",
    slug: "segment",
    name: "Segment",
    tagline: "Customer data platform for unified data",
    description: "",
    logo: null,
    screenshot: null,
    website: "https://segment.com",
    category: "data-enablement",
    subcategory: "cdps",
    useCases: ["customer-data"],
    pricing: "freemium",
    founded: 2011,
    social: {},
  },
];

const mockCategories: Category[] = [
  { id: "creative-delivery", name: "Creative & Delivery", color: "#000", order: 1, subcategories: [] },
  { id: "data-enablement", name: "Data Enablement", color: "#666", order: 2, subcategories: [] },
];

export default function ToolGridExample() {
  return (
    <div className="w-full">
      <ToolGrid
        tools={mockTools}
        categories={mockCategories}
        onToolClick={(tool) => console.log("Tool clicked:", tool.name)}
      />
    </div>
  );
}
