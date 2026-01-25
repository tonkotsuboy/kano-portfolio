# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commit Rules

- Create commits in small, granular units
- Write commit titles in clear, descriptive English

## Development Commands

```bash
# Start development server (generates CSS type definitions first)
npm run dev

# Build
npm run build

# Start Storybook
npm run storybook

# Run tests
npm run test

# Lint fixes
npm run lint:next:fix    # ESLint
npm run lint:css:fix     # Stylelint

# CSS Modules type definition generation
npm run tcm              # Run once
npm run tcm:watch        # Watch mode
```

## Tech Stack

- **Next.js 15** - App Router
- **React 19**
- **TypeScript 5** - Strict type checking (strict + exactOptionalPropertyTypes + noUncheckedIndexedAccess)
- **CSS Modules** - Scoped styles, type generation with typed-css-modules
- **Velite** - Markdown-based content management
- **Storybook** - Component development environment

## Project Structure

```
app/
├── components/ui/     # Reusable UI components (GlassSurface, LiquidGlassBox, etc.)
├── features/          # Feature-based modules
│   ├── layout/        # Header, Footer
│   ├── posts/         # ArticleCard, ArticleGrid
│   ├── theme/         # ThemeProvider, ThemeToggle
│   ├── analytics/     # GoogleAnalytics
│   └── pwa/           # ServiceWorkerRegister
├── styles/globals.css # CSS variable definitions (Liquid Glass design system)
├── entry/[slug]/      # Article detail pages
└── constants/         # Site configuration constants

content/posts/         # Markdown articles (processed by Velite)
.velite/               # Velite build artifacts (including type definitions)
.claude/rules/         # File-type specific coding conventions
```
