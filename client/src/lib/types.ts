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
  subcategory: string | null;
  useCases: string[];
  pricing: "free" | "freemium" | "subscription" | "usage-based" | "enterprise" | "unknown";
  companyType: "indie" | "startup" | "private" | "public" | "established" | "oss";
  founded: number | null;
  social: {
    // Company-level handles
    linkedin?: string | null;
    twitter?: string | null;
    github?: string | null;
    // Author-level handles (for tools published by an individual rather than a company)
    authorName?: string | null;
    authorLinkedin?: string | null;
    authorTwitter?: string | null;
    authorGithub?: string | null;
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
