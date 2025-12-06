import { ToolDetail } from "../ToolDetail";
import type { Tool, Category } from "@/lib/types";

const mockTool: Tool = {
  id: "jasper",
  slug: "jasper",
  name: "Jasper",
  tagline: "AI copilot for enterprise marketing teams",
  description: "Jasper is an AI copilot for marketing teams that helps create content at scale. With advanced AI capabilities, Jasper enables teams to maintain brand voice consistency while generating high-quality marketing copy, social media posts, and long-form content.",
  logo: null,
  screenshot: null,
  website: "https://jasper.ai",
  category: "creative-delivery",
  subcategory: "content-creation",
  useCases: ["copywriting", "content-generation", "brand-voice"],
  pricing: "paid",
  founded: 2021,
  social: {
    linkedin: "https://linkedin.com/company/jasper-ai",
    twitter: "https://twitter.com/jasperai",
  },
};

const mockCategories: Category[] = [
  {
    id: "creative-delivery",
    name: "Creative & Delivery",
    color: "#000000",
    order: 1,
    subcategories: [
      { id: "content-creation", name: "Content Creation", order: 1 },
    ],
  },
];

const mockRelated: Tool[] = [
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
];

export default function ToolDetailExample() {
  return (
    <ToolDetail
      tool={mockTool}
      categories={mockCategories}
      relatedTools={mockRelated}
      onRelatedToolClick={(tool) => console.log("Related tool clicked:", tool.name)}
    />
  );
}
