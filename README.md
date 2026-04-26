# Talli-App 

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Tauri](https://img.shields.io/badge/Tauri-2.1-24C8DB?logo=tauri)](https://tauri.app/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Rust](https://img.shields.io/badge/Rust-1.70+-DEA584?logo=rust)](https://www.rust-lang.org/)

> **Ratsastuksen uusi koti** - Etsi sopiva talli ja varaa ratsastustuntisi helposti!

A modern, cross-platform horse stable booking application built with **Rust/Tauri** + **React/TypeScript**. Inspired by Hopoti but redesigned with contemporary UI patterns, comprehensive theming, and full responsive support.

## Features

### Core Functionality
- **Stable Search** (Tallihaku) - Find riding schools and stables
- **Lesson Booking** (Tuntihaku) - Book riding lessons online
- **Stable Management** - Manage your stable's offerings
- **User Profiles** - Personal and family accounts
- **Multi-language Support** - Finnish default with i18n ready

### Technical Excellence
- **Comprehensive Theming** - Light/Dark/System modes with CSS variables
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **High Performance** - < 2s load, 60fps animations
- **Type Safe** - Full TypeScript coverage
- **Accessible** - WCAG 2.1 Level AA compliant
- **Cross-Platform** - Web, Windows, macOS, Linux, iOS, Android

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ 
- [pnpm](https://pnpm.io/) 8+
- [Rust](https://www.rust-lang.org/) 1.70+ (for desktop builds)

### Installation

```bash
# Clone the repository
git clone https://github.com/vilhotalvitie-blip/talli-app.git
cd talli-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:1420` to see the app.

### Build for Production

```bash
# Web build
pnpm build

# Desktop build (Windows, macOS, Linux)
pnpm tauri:build
```

## Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript | UI components & state |
| **Styling** | Tailwind CSS 3.4 | Utility-first styling |
| **Components** | Radix UI | Accessible primitives |
| **State** | Zustand | Global state management |
| **Backend** | Rust + Tauri 2 | Native API & desktop |
| **Query** | TanStack Query | Server state management |
| **Animation** | Framer Motion | Smooth transitions |
| **Icons** | Lucide React | Consistent iconography |

### Project Structure

```
talli-app/
├── src/                    # React Frontend
│   ├── components/
│   │   ├── primitives/    # Base UI (Button, Card, etc.)
│   │   └── layout/        # Layout components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities
│   ├── stores/            # Zustand stores
│   │   ├── themeStore.ts  # Theme management
│   │   └── layoutStore.ts # Responsive state
│   └── App.tsx            # Main application
├── src-tauri/             # Rust Backend
│   └── src/              # Rust source code
├── docs/                 # Documentation
└── .windsurf/            # Development guidelines
```

## Theming System

Talli-App features a comprehensive theming system with:

### Theme Modes
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes
- **System Mode** - Follows OS preference (default)

### Design Tokens
- **Primary**: Emerald (#10b981) - Nature/equestrian association
- **Secondary**: Indigo (#6366f1) - Trust/calming
- **Semantic**: Success, Warning, Error states
- **Typography**: Inter font family, 6 size levels
- **Spacing**: 4px base unit, consistent rhythm

### CSS Variables
All theme values are controlled by CSS variables for instant switching:
```css
--background: 0 0% 100%;
--foreground: 222 47% 11%;
--primary-500: 160 84% 39%;
```

## Responsive Design

### Breakpoints
| Name | Width | Target |
|------|-------|--------|
| xs | 480px | Mobile portrait |
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Small laptop |
| xl | 1280px | Desktop |
| 2xl | 1536px | Wide screens |

### Layout Behavior
- **Mobile**: Bottom navigation, full-width cards
- **Tablet**: Sidebar navigation, 2-column grids
- **Desktop**: Top navigation, 3-4 column grids

## Finnish Language

The application uses **Finnish as the default language** with authentic equestrian terminology:

- **Talli** - Stable
- **Tallihaku** - Stable search
- **Tuntihaku** - Lesson search
- **Ratsastuskoulu** - Riding school
- **Rekisteröidy** - Register
- **Kirjaudu** - Log in

English language support can be added via the i18n system.

## Documentation

- [Setup Instructions](./docs/setup.md) - Detailed installation guide
- [Theming Guide](./docs/theming.md) - Complete theming documentation
- [Architecture Plan](./.windsurf/plans/talli-app-architecture-plan-5e44a9.md) - Technical specification
- [Development Guidelines](./.windsurf/rules/rust-ts-guidelines.md) - Code standards

## Performance Targets

- **Initial Load**: < 2 seconds
- **Interaction Response**: < 100ms
- **Animation FPS**: 60fps maintained
- **Bundle Size**: < 200KB (gzipped)
- **Memory Usage**: < 150MB

## Development

### Available Scripts

```bash
pnpm dev              # Start web dev server
pnpm tauri:dev        # Start desktop dev mode
pnpm build            # Build for production
pnpm tauri:build      # Build desktop app
pnpm type-check       # TypeScript check
pnpm lint            # ESLint check
```

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: React-specific rules
- **Prettier**: Consistent formatting
- **Husky**: Pre-commit hooks

## Contributing

Contributions are welcome! Please read our [Development Guidelines](./.windsurf/rules/rust-ts-guidelines.md) before submitting PRs.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Acknowledgments

- Inspired by [Hopoti](https://hopoti.com/fi) - Finnish equestrian platform
- Design system based on [Radix UI](https://www.radix-ui.com/) primitives
- Icons by [Lucide](https://lucide.dev/)

---

**Talli-App** - *Ratsastuksen uusi koti* 🐴🇫🇮

Built with ❤️ using React, TypeScript, Tauri, and Tailwind CSS.
