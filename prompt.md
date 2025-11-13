````
# 🧭 Cursor Prompt — Full-Site Responsive Architecture Overhaul

## Context
The site currently fails to resize gracefully — elements overflow their containers and break layout harmony at various viewports.
This isn’t an isolated card issue; it’s a missing responsive foundation across the global layout system.

Our goal: establish a resilient, scalable, and predictable responsive framework that ensures every page adapts fluidly from mobile to desktop.

---

## Objectives
- Implement consistent responsive scaling across all routes and components.
- Prevent any horizontal overflow or layout shifts.
- Maintain balanced spacing, alignment, and readability at every viewport size.
- Align design tokens (spacing, radii, breakpoints) with a modern responsive system (Apple/Stripe-level polish).

---

## Implementation Plan

### 1. Establish a Global Layout System
Audit the site’s root layout (e.g., `Layout.tsx`, `_app.tsx`, or main container).
Apply flexible, constraint-based sizing:

```css
:root {
  --page-max-width: 1280px;
  --page-padding: clamp(1rem, 4vw, 3rem);
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}
````

In your layout wrapper:

```html
<main className="flex flex-col items-center w-full min-h-screen overflow-x-hidden px-[clamp(1rem,4vw,3rem)]">
  <div className="w-full max-w-[var(--page-max-width)] mx-auto">
    {children}
  </div>
</main>
```

---

### 2. Normalize Component Responsiveness

For every reusable component (cards, grids, sections):

* Use **fluid widths** (`width: 100%`, `max-width: theme constraint`).
* Apply **clamp-based paddings/margins** for natural scaling.
* Avoid fixed pixel values except for icons or borders.
* Use modern layout primitives:

  * `flex-wrap: wrap;`
  * `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`

Example:

```html
<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[var(--page-max-width)] mx-auto">
  <!-- product cards -->
</section>
```

---

### 3. Define Breakpoints (Design System Aligned)

Use a minimal, predictable breakpoint set (Tailwind default or custom):

```js
// tailwind.config.js
theme: {
  screens: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}
```

Ensure all typography, spacing, and containers respond gracefully using `clamp()` where possible.

---

### 4. Validation Checklist

* ✅ No horizontal scroll at any viewport.
* ✅ Cards, modals, and navbars scale fluidly.
* ✅ Typography scales via `clamp()` or Tailwind’s responsive font utilities.
* ✅ Layout grid remains centered, balanced, and accessible.
* ✅ Safari and Chrome behave identically.

---

### 5. Commit Message

```
refactor(responsive): unify global layout system and responsive scaling

Implements fluid container widths, grid-based layouts, and clamp-based spacing.
Ensures site-wide responsive behavior with consistent design rhythm.
```

---

## Success Criteria

* Works perfectly from 320px to 1440px+.
* Every component respects the design grid.
* No content overflow or layout shift.
* Visuals remain centered, proportional, and precise — at any size.

---

```
```
