export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string | null;
  screenshot: string | null;
  website: string;
  category: string;
  subcategory: string;
  useCases: string[];
  pricing: "free" | "subscription" | "usage-based" | "performance";
  companyType: "indie" | "startup" | "private" | "public" | "oss";
  founded: number;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Subcategory {
  id: string;
  name: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  order: number;
  subcategories: Subcategory[];
}

export interface UseCase {
  id: string;
  name: string;
}

export interface FilterState {
  categories: string[];
  useCases: string[];
  pricing: string[];
  companyType: string[];
  search: string;
}
