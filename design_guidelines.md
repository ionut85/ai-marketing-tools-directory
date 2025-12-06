# AI x Marketing Tools Directory - Design Guidelines

## Design Approach
**Reference-Based**: Inspired by Vercel's template gallery - clean, spacious, minimal aesthetic with prominent search functionality.

## Core Design Principles
1. **Compact & Scannable**: Users see 20+ tools without scrolling on desktop
2. **Search-First**: Large, prominent search bar as primary interaction
3. **Real-Time Feedback**: Instant filtering with smooth transitions
4. **Black & White Minimalism**: Clean, professional, no distracting colors

---

## Typography
- **Font Family**: Inter (primary) or Geist (fallback)
- **Hierarchy**:
  - H1 Hero: Large, centered "Discover AI x Marketing Tools"
  - Tool Names: Medium weight, 14px (sm)
  - Taglines: 12px (xs), muted gray
  - Body: Clean, minimal, lots of whitespace

---

## Layout System
**Spacing Primitives**: Use Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16 for consistent rhythm

**Homepage Grid**:
- Filter sidebar: LEFT (fixed width ~240-280px)
- Tool grid: RIGHT (4-6 columns on desktop, responsive)
- Generous whitespace between sections

**Responsive Breakpoints**:
- Desktop: 4-6 column grid
- Tablet: 3 column grid
- Mobile: 1-2 column grid, filters in slide-out sheet

---

## Component Library

### Search Bar
- **Size**: 48px+ height (prominently large)
- **Position**: Centered below hero section
- **Placeholder**: "Search tools... try 'AI for ad creative' or 'attribution platforms'"
- **Style**: Subtle border, clean input, search icon
- **Behavior**: Real-time filtering with 300ms debounce

### Tool Cards (CRITICAL - Compact Design)
- **Dimensions**: 180-220px wide × 100-120px tall
- **Layout**:
  - Logo: 32×32px, rounded, top-left
  - Tool name: Next to logo, medium weight, truncated
  - Tagline: Single line, 12px, gray, line-clamp-1
  - Tags: 2-3 small badges at bottom
- **Hover State**: Subtle shadow elevation, cursor pointer
- **Logo Fallback**: Colored circle with first letter initial when logo missing

### Filter Sidebar
- **Sections**: "Category", "Use Case", "Pricing" (collapsible)
- **Checkboxes**: With counts - e.g., "Creative (23)"
- **Clear All**: Link at top or bottom
- **Mobile**: Slide-out sheet with overlay

### Badges
- **Style**: Small, secondary variant, minimal padding
- **Usage**: Category tags, use case indicators
- **Size**: xs (12px text)

### Buttons
- **Primary CTA**: Black background, white text
- **Visit Website**: Top-right on tool detail pages
- **Hover**: Subtle state change

### Cards
- **Background**: White with subtle gray border (#E4E4E7)
- **Padding**: Compact (p-3 or 12px)
- **Shadow**: None default, subtle on hover

---

## Color Palette
- **Background**: White (#FFFFFF)
- **Text Primary**: Black (#000000)
- **Text Secondary**: Gray (#71717A)
- **Borders**: Light Gray (#E4E4E7)
- **Accent**: Black (buttons, active states)
- **Category Colors**: Only on Landscape page for category headers

---

## Page-Specific Layouts

### Homepage
1. **Header**: Minimal - Logo left, "Landscape" + "About" links right
2. **Hero**: Large centered H1 + subtitle
3. **Search Bar**: Prominently large, centered
4. **Main Area**: Filter sidebar (left) + Tool grid (right)
5. **Results Counter**: "Showing 47 of 103 tools" (top-right or bottom)
6. **Footer**: "Submit a Tool" mailto link

### Tool Detail Page
1. **Navigation**: "← Back to Directory" (top-left), "Visit Website" button (top-right)
2. **Header**: Tool name (H1) + tagline
3. **Hero Area**: Large screenshot or prominent logo display
4. **Two-Column Layout**:
   - LEFT: Full markdown description (max-width for readability)
   - RIGHT: Metadata sidebar (category, tags, pricing, social links)
5. **Related Tools**: Horizontal scroll of 4 compact cards at bottom

### Landscape Page
1. **Title**: "AI x Marketing Landscape" (large, centered)
2. **Grid Layout**: Categories as COLUMNS (4-6), subcategories as ROWS
3. **Tool Logos**: 24×24 or 32×32px in grid cells
4. **Category Headers**: Color-coded indicators
5. **Interactions**: Hover tooltip with tool name, click navigates to detail
6. **Mobile**: Horizontal scroll enabled

---

## Interactions & Animations
- **Minimal Animations**: Subtle, fast, purposeful only
- **Transitions**: Smooth fade in/out when filtering (CSS transitions)
- **Hover States**: Elevation on cards, underline on links
- **Loading States**: Simple spinner or skeleton for search results

---

## Images
**Logo System**:
- Primary: Upload logos in /public/logos/ directory
- Fallback: Programmatically generated colored circle with first letter
- Size: 32×32px for cards, larger for detail pages

**Screenshots**:
- Tool detail hero: Large, high-quality product screenshots
- Aspect ratio: 16:9 or similar wide format
- Display: Centered with subtle border or shadow

---

## Mobile Considerations
- Search bar remains prominent
- Filters move to slide-out sheet (overlay)
- Tool grid: 1-2 columns maximum
- Landscape page: Horizontal scroll for category grid
- Touch-friendly hit areas (minimum 44×44px)

---

## Accessibility
- High contrast (black/white ensures WCAG compliance)
- Semantic HTML structure
- Keyboard navigation for filters and cards
- ARIA labels for icons and interactive elements
- Focus states clearly visible