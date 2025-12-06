import { ToolCard } from "../ToolCard";
import type { Tool, Category } from "@/lib/types";

const mockTool: Tool = {
  id: "jasper",
  slug: "jasper",
  name: "Jasper",
  tagline: "AI copilot for enterprise marketing teams",
  description: "Jasper is an AI copilot for marketing teams.",
  logo: null,
  screenshot: null,
  website: "https://jasper.ai",
  category: "creative-delivery",
  subcategory: "content-creation",
  useCases: ["copywriting", "content-generation"],
  pricing: "paid",
  founded: 2021,
  social: {},
};

const mockCategories: Category[] = [
  {
    id: "creative-delivery",
    name: "Creative & Delivery",
    color: "#000000",
    order: 1,
    subcategories: [],
  },
];

export default function ToolCardExample() {
  return (
    <div className="w-[200px]">
      <ToolCard
        tool={mockTool}
        categories={mockCategories}
        onClick={() => console.log("Tool clicked:", mockTool.name)}
      />
    </div>
  );
}
