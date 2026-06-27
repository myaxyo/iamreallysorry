## Overview

This repository uses **Tailwind CSS v4** as its primary styling system, configured with the new `@tailwindcss/postcss` plugin. The approach is utility-first with inline Tailwind classes applied directly in React/JSX components.

## Core Technology Stack

- **CSS Framework**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **PostCSS Configuration**: Minimal setup using `@tailwindcss/postcss` plugin
- **Animation Library**: Framer Motion for component-level animations and transitions
- **3D Rendering**: Three.js + @react-three/fiber + @react-three/drei for 3D elements
- **Effects**: canvas-confetti for celebration effects

## Design Tokens & Theme

### Color Palette (defined in `globals.css`)
- **Background**: `#030712` (near-black, dark theme)
- **Foreground**: `#ffffff` (white text)
- **Accent Pink**: `#ec4899` (used for scrollbar, selection, hover states)
- **Hover Pink**: `#f472b6` (lighter pink for interactive states)
- **Track Gray**: `#1f2937` (scrollbar track)

### Gradient Patterns
Common gradient combinations used throughout:
- `from-gray-950 via-gray-900 to-gray-950` — page backgrounds
- `from-pink-500 via-red-500 to-rose-500` — hero headings, CTAs
- `from-green-400 to-emerald-500` — positive action buttons
- `from-gray-800/50` — card backgrounds with transparency

### Typography
- **Font Family**: `system-ui, -apple-system, sans-serif` (system font stack)
- **Text Sizes**: Responsive scaling from `text-sm` to `text-9xl`
- **Font Weights**: `font-bold`, `font-black` for emphasis

## Architecture & Conventions

### Global Styles (`src/app/globals.css`)
The global CSS file is minimal, containing only:
1. Tailwind import (`@import "tailwindcss"`)
2. CSS custom properties for background/foreground colors
3. Custom scrollbar styling (pink thumb on dark track)
4. Smooth scroll behavior
5. Text selection color (pink background, white text)

### Component Styling Pattern
All components use **inline Tailwind utility classes** with no CSS modules or separate style files. Key patterns:

1. **Responsive Design**: Mobile-first with `md:` breakpoints
   - Example: `text-2xl md:text-5xl`, `px-4 md:px-8`, `gap-4 md:gap-8`

2. **Glassmorphism Effects**: Semi-transparent backgrounds with backdrop blur
   - Pattern: `bg-gray-800/50 backdrop-blur-sm border border-gray-700`

3. **Hover States**: Border color transitions and scale transforms
   - Pattern: `hover:border-pink-500/50 transition-colors`
   - Pattern: `whileHover={{ scale: 1.02 }}` (Framer Motion)

4. **Gradient Text**: Using `bg-clip-text text-transparent` with gradient backgrounds
   - Example: `bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 bg-clip-text text-transparent`

5. **Dark Theme Consistency**: All components assume dark mode
   - Backgrounds: `gray-950`, `gray-900`, `gray-800`
   - Text: `white`, `gray-300`, `gray-400`, `gray-600`
   - Accents: `pink-400`, `pink-500`, `pink-300`

### Animation Integration
Styling is tightly coupled with Framer Motion for animated interactions:
- Scroll-triggered reveals using `whileInView` and `viewport={{ once: true }}`
- Spring-based transitions for natural motion
- Staggered animations using indexed delays (`delay: i * 0.2`)
- Continuous animations for decorative elements (`animate={{ rotate: [0, 10, -10, 0] }}`)

## Developer Rules & Conventions

### DO:
- Use Tailwind utility classes directly in JSX `className` attributes
- Apply responsive modifiers (`md:`, `lg:`) for adaptive layouts
- Use semantic gray scale values (`gray-950` through `gray-300`) for dark theme consistency
- Apply pink accent colors (`pink-400`, `pink-500`) for interactive/hover states
- Combine `backdrop-blur-sm` with semi-transparent backgrounds for glassmorphism cards
- Use Framer Motion `motion.*` components for any animated element
- Apply `transition-colors` or `transition-transform` for smooth hover effects

### DON'T:
- Create separate CSS/SCSS files for component styles
- Use CSS modules (`.module.css` files)
- Import styled-components or emotion libraries
- Define custom CSS classes in globals.css beyond the existing design tokens
- Use light theme colors — the entire app is dark-mode only
- Hardcode hex colors in components — use Tailwind's color palette instead

### Layout Patterns:
- Full-screen sections: `min-h-screen flex flex-col items-center justify-center px-4 py-20`
- Card grids: `grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full`
- Centered content: `max-w-2xl w-full mx-auto` or `flex flex-col items-center`
- Fixed UI elements: `fixed top-4 right-4 z-50` with backdrop blur

### Accessibility Notes:
- Body uses `antialiased` class for smoother text rendering
- RTL support via dynamic `dir` attribute on `<html>` element (Arabic locale)
- High contrast maintained between text (`white`, `gray-300`) and backgrounds (`gray-950`, `gray-900`)