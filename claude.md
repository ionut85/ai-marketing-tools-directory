# GenAI Marketing Tools Directory

A searchable, filterable directory of AI marketing tools built with React, TypeScript, Express, and Tailwind CSS.

## Project Overview

This is a full-stack web application that helps marketers discover AI tools across four main categories:
- **Plan** - Strategic planning and analysis tools
- **Create** - Content creation and copywriting tools
- **Activate** - Campaign activation and media management tools
- **Measure** - Analytics and performance measurement tools

The application features advanced search, multi-dimensional filtering, detailed tool pages, a visual landscape view, and SEO optimization.

## Tech Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.20
- **Styling**: Tailwind CSS 4 + shadcn/ui component library
- **UI Components**: Radix UI primitives (45+ components)
- **Routing**: Wouter 3.3.5 (lightweight client-side routing)
- **State Management**: React hooks + TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React + React Icons
- **Animations**: Framer Motion 11.13.1

### Backend
- **Framework**: Express.js 4.21.2
- **Language**: TypeScript 5.6.3
- **Database**: PostgreSQL-ready (Drizzle ORM) - currently using JSON files
- **Build**: esbuild for server bundling
- **Session**: express-session with PostgreSQL store
- **Auth**: Passport.js (configured but not active)

### Development Tools
- **Type Checking**: TypeScript with strict mode
- **CSS Processing**: PostCSS + Tailwind
- **Analytics**: Google Analytics + PostHog
- **Deployment**: Replit-optimized

## Project Structure

```
strange-wing/
├── client/                    # React frontend
│   └── src/
│       ├── pages/            # Route pages (Home, ToolDetailPage, CategoryPage, Landscape, About)
│       ├── components/       # React components (Header, Footer, ToolCard, FilterSidebar, etc.)
│       │   └── ui/          # shadcn/ui reusable UI components (49 components)
│       ├── hooks/           # Custom React hooks (useDebounce, useMobile, useToast, useAnalytics)
│       ├── lib/             # Utilities (types, analytics, PostHog, queryClient, utils)
│       ├── data/            # JSON data files (tools.json, categories.json, useCases.json)
│       ├── App.tsx          # Main app component with routing
│       └── main.tsx         # React entry point
├── server/                   # Express backend
│   ├── index.ts             # Main server setup
│   ├── routes.ts            # API routes (sitemap.xml, robots.txt, llms.txt)
│   ├── vite.ts              # Vite dev server integration
│   ├── static.ts            # Static file serving
│   ├── storage.ts           # Storage abstraction interface
│   └── github.ts            # GitHub integration
├── shared/                   # Shared code
│   └── schema.ts            # Drizzle ORM schema
├── scripts/                  # Utility scripts
└── attached_assets/          # Screenshots and reference data
```

## Key Features

### 1. Search & Discovery
- Real-time search across tool names, taglines, descriptions, categories, and use cases
- 300ms debounced search for performance optimization
- Search bar prominently displayed in hero section

### 2. Advanced Filtering
- Multi-dimensional filters: Categories, Use Cases, Pricing Models, Company Type
- Real-time filter counts showing how many tools match each option
- Responsive filter UI (sidebar on desktop, slide-out sheet on mobile)
- Filter state preservation during navigation

### 3. Tool Browsing
- Responsive grid layout (4-6 columns on desktop, down to mobile)
- Pagination (12 tools per page)
- Tool cards with logo, name, tagline, category badge, and use case badge
- Logo fallback with colored circle + first letter when unavailable

### 4. Individual Tool Pages
- Detailed tool information with markdown description support
- Tool metadata (category, pricing, company type, founding year)
- Social media links (LinkedIn, Twitter)
- Related tools recommendations
- "Visit Website" call-to-action

### 5. Visual Landscape View
- Matrix layout showing tools organized by category and subcategory
- Horizontal scrolling support for responsive design
- Tool logo tooltips with names

### 6. SEO & Discovery Optimization
- Dynamic sitemap.xml generation
- robots.txt with sitemaps reference
- llms.txt file for AI crawlers and model training
- JSON-LD structured data for schema.org
- Meta tags, Open Graph, Twitter Card support
- Analytics integration (Google Analytics, PostHog)

## Important Files

### Frontend Core
- `client/src/App.tsx` - Main app component with router setup
- `client/src/pages/Home.tsx` - Homepage with search, filters, and tool grid (234 lines)
- `client/src/pages/ToolDetailPage.tsx` - Individual tool detail page
- `client/src/pages/Landscape.tsx` - Visual landscape/matrix view
- `client/src/components/ToolCard.tsx` - Individual tool card component
- `client/src/components/FilterSidebar.tsx` - Desktop filter panel
- `client/src/components/SearchBar.tsx` - Search input component
- `client/src/components/SEO.tsx` - Meta tags and structured data

### Backend Core
- `server/index.ts` - Express server setup, middleware, error handling
- `server/routes.ts` - API route handlers (sitemap, robots.txt, llms.txt)
- `server/vite.ts` - Vite dev server integration
- `server/static.ts` - Production static file serving

### Data Files
- `client/src/data/tools.json` - Tool definitions (~150+ tools)
- `client/src/data/categories.json` - Category hierarchy
- `client/src/data/useCases.json` - Use case tags
- `client/src/data/categoryDescriptions.json` - Category descriptions for SEO

### Configuration
- `tailwind.config.ts` - CSS customization and color tokens
- `vite.config.ts` - Vite bundler configuration with path aliases
- `drizzle.config.ts` - Database migration configuration
- `tsconfig.json` - TypeScript compiler settings (strict mode)
- `components.json` - shadcn/ui component configuration

## Development

### Available Scripts

```bash
npm run dev          # Development server (tsx server/index.ts)
npm run build        # Production build (client + server)
npm run start        # Production server (node dist/index.cjs)
npm run check        # Type checking (tsc)
npm run db:push      # Database migrations (drizzle-kit push)
```

### Development Workflow

1. **Starting Development Server**
   ```bash
   npm run dev
   ```
   - Starts Express server on port 5000 (default)
   - Vite dev server with HMR (Hot Module Replacement)
   - TypeScript compilation in watch mode

2. **Type Checking**
   ```bash
   npm run check
   ```
   - Validates TypeScript across entire codebase
   - Runs in strict mode

3. **Building for Production**
   ```bash
   npm run build
   ```
   - Client: Vite builds to `/dist/public` with code splitting
   - Server: esbuild bundles to `/dist/index.cjs`
   - Minified and optimized output

### Environment Variables

```env
DATABASE_URL=postgresql://...     # PostgreSQL connection string
NODE_ENV=development|production   # Environment mode
PORT=5000                         # Server port
VITE_GA_MEASUREMENT_ID=G-...     # Google Analytics ID
VITE_POSTHOG_API_KEY=phc_...     # PostHog analytics key
```

## Data Management

### Current Data Source
The application currently uses JSON files for data storage:
- `client/src/data/tools.json` - All tool definitions
- `client/src/data/categories.json` - Category structure
- `client/src/data/useCases.json` - Use case tags

### Database Setup (PostgreSQL)
The project is configured for PostgreSQL using Drizzle ORM but currently uses JSON files:

```bash
# Push schema to database
npm run db:push
```

Schema is defined in `shared/schema.ts` (currently minimal - users table only).

## Adding New Tools

To add a new tool to the directory:

1. Edit `client/src/data/tools.json`
2. Add a new tool object with required fields:
   ```json
   {
     "id": "unique-slug",
     "name": "Tool Name",
     "tagline": "Short description",
     "description": "Full markdown description",
     "category": "plan|create|activate|measure",
     "subcategory": "Subcategory name",
     "useCases": ["use-case-1", "use-case-2"],
     "websiteUrl": "https://example.com",
     "pricingModel": "freemium|free|paid|enterprise",
     "companyType": "startup|established|enterprise",
     "foundedYear": 2024,
     "logoUrl": "https://..." (optional),
     "socialLinks": {
       "linkedin": "https://...",
       "twitter": "https://..."
     }
   }
   ```
3. Update related data files if adding new categories/use cases
4. Restart dev server to see changes

## UI Components

The project uses shadcn/ui built on Radix UI primitives. All UI components are in `client/src/components/ui/`:

- **Forms**: Button, Input, Label, Checkbox, Select, Textarea, Switch
- **Feedback**: Toast, Alert, Badge, Progress
- **Layout**: Card, Sheet, Dialog, Popover, Tooltip, Separator
- **Data**: Table, Pagination, Skeleton
- **Navigation**: Tabs, Breadcrumb, Menubar, Command

Components follow Tailwind CSS design system defined in `tailwind.config.ts`.

## Styling

### Tailwind Configuration
- Custom color palette in `tailwind.config.ts`
- CSS variables for theming in `client/src/index.css`
- Typography plugin for prose styles
- Animate plugin for animations

### Design Guidelines
See `design_guidelines.md` for:
- Color usage
- Typography scale
- Component patterns
- Spacing system
- Responsive breakpoints

## SEO & Analytics

### SEO Features
- Dynamic meta tags per page (SEO.tsx component)
- JSON-LD structured data for tools
- Sitemap.xml auto-generated from tools.json
- robots.txt with sitemap reference
- llms.txt for AI crawler optimization
- Open Graph and Twitter Card tags

### Analytics Integration
- **Google Analytics**: Set `VITE_GA_MEASUREMENT_ID`
- **PostHog**: Set `VITE_POSTHOG_API_KEY`
- Custom event tracking via `useAnalytics` hook

## Known Limitations

1. **No Automated Tests** - No test infrastructure currently exists
2. **No Backend Database** - Uses JSON files instead of PostgreSQL
3. **No User Authentication** - Passport.js configured but not active
4. **No Admin Panel** - Tools must be added manually via JSON files
5. **No Image Uploads** - Logo URLs must be hosted externally

## Future Enhancements

Potential areas for improvement:
- Add automated testing (Vitest + React Testing Library)
- Migrate from JSON files to PostgreSQL database
- Build admin panel for tool management
- Add user accounts and favorites/collections
- Implement tool submission form
- Add advanced analytics dashboard
- Support for tool comparisons
- API endpoints for third-party integrations

## Architecture Decisions

### Why Wouter instead of React Router?
- Lightweight (~2KB vs ~10KB)
- Simple API for basic routing needs
- Good TypeScript support

### Why Drizzle ORM?
- TypeScript-first with excellent type inference
- SQL-like query syntax
- Lightweight and performant
- Easy migrations

### Why JSON files instead of database?
- Simpler deployment (no database setup)
- Version control for all data
- Fast reads (static data)
- Trade-off: No dynamic updates without redeployment

### Why shadcn/ui?
- Copy-paste components (no npm dependency bloat)
- Full customization control
- Built on Radix UI (accessible primitives)
- Tailwind CSS integration

## Contributing

When making changes:
1. Follow TypeScript strict mode (no `any` types)
2. Use existing component patterns from shadcn/ui
3. Maintain responsive design (mobile-first)
4. Update data files for new tools/categories
5. Run type checking before committing: `npm run check`
6. Test search and filter functionality manually
7. Verify SEO tags on new pages

## Deployment

### Build Process
```bash
npm run build
npm run start
```

### Production Requirements
- Node.js 18+ (for native fetch, WebSocket)
- Environment variables configured
- Static assets in `/dist/public`
- Server bundle at `/dist/index.cjs`

### Replit Deployment
The project includes Replit-specific optimizations:
- `@replit/vite-plugin-cartographer` for file mapping
- `@replit/vite-plugin-error-modal` for error display
- `@replit/vite-plugin-dev-banner` for dev mode indicator

## Troubleshooting

### Common Issues

**Build fails with type errors**
```bash
npm run check  # See specific errors
```

**Search not working**
- Check `useDebounce` hook (300ms delay expected)
- Verify tools.json is valid JSON
- Check browser console for errors

**Filters not updating counts**
- Verify filter logic in `Home.tsx:234`
- Check that tool data has matching fields
- Ensure filter state is synchronized

**Images not loading**
- Check `logoUrl` in tools.json
- Verify CORS for external images
- Fallback should show colored circle + letter

## License

Not specified in project files.

## Contact

Not specified in project files.
