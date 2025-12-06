# AI x Marketing Tools Directory

## Overview

An AI-powered marketing tools directory that helps users discover and explore marketing solutions across creative, analytics, media, and data categories. The platform features a clean, minimal black-and-white design inspired by Vercel's template gallery, with prominent search functionality and real-time filtering.

**Key Features:**
- Searchable directory of AI marketing tools with 300ms debounced search
- Multi-faceted filtering (category, use case, pricing model)
- Interactive landscape view showing tools organized by category and subcategory
- Individual tool detail pages with related tools
- Responsive design with mobile-optimized filters
- Static JSON-based data store (no database required)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React 18+ with Vite build tooling
- **Routing:** Wouter (lightweight client-side routing)
- **State Management:** React hooks with local component state
- **Data Fetching:** TanStack Query (React Query) for API calls
- **UI Components:** shadcn/ui component library built on Radix UI primitives
- **Styling:** Tailwind CSS 4 with custom design tokens

**Design System:**
- Black and white minimalist theme with neutral color palette
- Custom CSS variables for theming (light/dark mode support)
- Spacing primitives: 1, 2, 3, 4, 6, 8, 12, 16 Tailwind units
- Typography: Inter/Geist font families
- Responsive breakpoints: mobile (1-2 cols), tablet (3 cols), desktop (4-6 cols)

**Key Pages:**
1. **Home (/)** - Main directory with search, filters, and tool grid
2. **Tool Detail (/tools/:slug)** - Individual tool pages with related recommendations
3. **Landscape (/landscape)** - Horizontal scrolling category-based view
4. **About (/about)** - Static information page

**Component Structure:**
- Reusable UI components in `/client/src/components/ui/` (shadcn)
- Feature components in `/client/src/components/` (Header, Footer, FilterSidebar, ToolCard, etc.)
- Custom hooks in `/client/src/hooks/` (useDebounce, useMobile, useToast)

**Performance Optimizations:**
- Debounced search (300ms) to reduce unnecessary re-renders
- Memoized filtered results using `useMemo`
- Lazy loading and code splitting via Vite

### Backend Architecture

**Server Framework:** Express.js with TypeScript
- **HTTP Server:** Node.js HTTP server wrapping Express
- **Build System:** esbuild for production bundling
- **Development:** Vite dev server with HMR middleware

**Current Implementation:**
- Minimal Express server serving static assets
- `/api` route prefix reserved for future API endpoints
- In-memory storage interface (`IStorage`) with CRUD methods for users
- Logging middleware for request tracking

**Static File Serving:**
- Production: Serves built Vite assets from `/dist/public`
- Development: Vite middleware with hot module replacement
- Fallback routing to `index.html` for SPA support

### Data Architecture

**Storage Solution:** JSON files (no database)
- `/client/src/data/tools.json` - Tool definitions
- `/client/src/data/categories.json` - Category hierarchy with subcategories
- `/client/src/data/useCases.json` - Use case tags

**Data Models:**
```typescript
Tool {
  id, slug, name, tagline, description
  logo, screenshot, website
  category, subcategory
  useCases[], pricing (free|freemium|paid|enterprise)
  founded, social{linkedin, twitter}
}

Category {
  id, name, color, order
  subcategories[{id, name, order}]
}
```

**Filtering Logic:**
- Client-side filtering of JSON data
- Multi-dimensional filters: category, use case, pricing, search text
- Real-time count updates for available tools per filter option

**Future Database Migration Path:**
- Drizzle ORM configured with PostgreSQL schema (`shared/schema.ts`)
- Schema defines users table with UUID primary keys
- Drizzle Kit configured for migrations (`drizzle.config.ts`)
- Storage interface abstraction (`IStorage`) ready for database implementation

### External Dependencies

**UI & Styling:**
- **shadcn/ui** - Pre-built accessible React components
- **Radix UI** - Headless UI primitives (dialogs, dropdowns, tooltips, etc.)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets (used for social media icons)
- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Class name utilities

**Data & Forms:**
- **TanStack Query** - Async state management and caching
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - React Hook Form integration with Zod

**Development & Build:**
- **Vite** - Frontend build tool and dev server
- **esbuild** - Backend bundler for production
- **TypeScript** - Type safety across full stack
- **@replit/vite-plugin-runtime-error-modal** - Development error overlay
- **@replit/vite-plugin-cartographer** - Replit-specific tooling
- **@replit/vite-plugin-dev-banner** - Development environment banner

**Database (Configured but Optional):**
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **drizzle-zod** - Zod schema generation from Drizzle schemas
- **pg** - PostgreSQL client (via Drizzle)

**Future Integration Potential:**
- Express session management (`express-session`, `connect-pg-simple`, `memorystore`)
- Authentication (`passport`, `passport-local`, `jsonwebtoken`)
- File uploads (`multer`)
- Email (`nodemailer`)
- Rate limiting (`express-rate-limit`)
- Payment processing (`stripe`)
- AI/LLM integration (`openai`, `@google/generative-ai`)

**Utilities:**
- **wouter** - Minimal client-side routing
- **date-fns** - Date formatting and manipulation
- **nanoid** - Unique ID generation
- **cmdk** - Command palette component
- **embla-carousel-react** - Carousel functionality