import { LandscapeGrid } from "../LandscapeGrid";
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
    tagline: "AI-powered content creation",
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
    tagline: "Customer data platform",
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
  {
    id: "creative-delivery",
    name: "Creative & Delivery",
    color: "#000000",
    order: 1,
    subcategories: [
      { id: "content-creation", name: "Content Creation", order: 1 },
      { id: "creative-intelligence", name: "Creative Intelligence", order: 2 },
    ],
  },
  {
    id: "data-enablement",
    name: "Data Enablement",
    color: "#6B7280",
    order: 2,
    subcategories: [
      { id: "cdps", name: "CDPs", order: 1 },
      { id: "identity", name: "Identity", order: 2 },
    ],
  },
];

export default function LandscapeGridExample() {
  return (
    <LandscapeGrid
      tools={mockTools}
      categories={mockCategories}
      onToolClick={(tool) => console.log("Tool clicked:", tool.name)}
    />
  );
}
