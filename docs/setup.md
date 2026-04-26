# Talli-App Setup Instructions

## Prerequisites

- **Node.js**: Version 18 or higher
- **pnpm**: Version 8 or higher (recommended for best performance)
- **Rust**: Version 1.70 or higher (for Tauri desktop builds)
- **Git**: For version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vilhotalvitie-blip/talli-app.git
cd talli-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development Server

#### Web Development (Vite only)
```bash
pnpm dev
```
The app will be available at `http://localhost:1420`

#### Desktop Development (Tauri)
```bash
pnpm tauri:dev
```
This will compile the Rust backend and launch the desktop application.

## Build for Production

### Web Build
```bash
pnpm build
```
Output will be in the `dist` folder.

### Desktop Build
```bash
pnpm tauri:build
```
This will create native installers for Windows, macOS, and Linux in `src-tauri/target/release/bundle`.

## Development Workflow

### Code Quality
```bash
# Type checking
pnpm type-check

# Linting
pnpm lint
```

### Project Structure
```
talli-app/
├── src/                    # React/TypeScript frontend
│   ├── components/         # React components
│   │   ├── primitives/    # Base UI components (Button, Card, etc.)
│   │   └── layout/        # Layout components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── stores/            # Zustand state stores
│   ├── styles/            # Theme configurations
│   └── App.tsx            # Main application component
├── src-tauri/             # Rust backend
│   ├── src/              # Rust source code
│   └── Cargo.toml        # Rust dependencies
├── docs/                 # Documentation
└── public/               # Static assets
```

## Theming Guide

### Theme Switching
The application supports three theme modes:
- **Light**: Always use light theme
- **Dark**: Always use dark theme
- **System**: Follow system preference (default)

Themes are stored in `src/stores/themeStore.ts` and persist across sessions.

### Customizing Colors
Edit `tailwind.config.ts` to modify the design tokens:

```typescript
colors: {
  primary: {
    50: "#ecfdf5",
    500: "#10b981",  // Main brand color
    // ... other shades
  },
  // ... other colors
}
```

### CSS Variables
Theme values are controlled by CSS variables in `src/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary-500: 160 84% 39%;
  /* ... */
}
```

## Responsive Design

### Breakpoints
The app uses six breakpoints:
- **xs**: 480px (mobile portrait)
- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (small laptop)
- **xl**: 1280px (desktop)
- **2xl**: 1536px (wide screens)

### Usage Example
```tsx
const { isMobile, breakpoint } = useLayoutStore();

return (
  <div className={cn(
    "grid gap-4",
    isMobile ? "grid-cols-1" : "grid-cols-3"
  )}>
    {/* content */}
  </div>
);
```

## Internationalization (i18n)

Finnish is the default language. English support can be added:

1. Create translation files in `src/i18n/`
2. Use `react-i18next` for translations
3. All UI strings in Finnish by default

## Troubleshooting

### Common Issues

**1. Build fails with Rust errors**
- Ensure Rust is installed: `rustc --version`
- Install Tauri CLI: `cargo install tauri-cli`

**2. Dependencies not found**
- Delete `node_modules` and `pnpm-lock.yaml`
- Run `pnpm install` again

**3. Tailwind styles not applying**
- Check `postcss.config.js` exists
- Verify `tailwind.config.ts` has correct content paths

**4. Theme not persisting**
- Check browser localStorage permissions
- Clear site data and reload

## Performance Targets

- **Initial Load**: < 2 seconds
- **Interaction Response**: < 100ms
- **Animation Frame Rate**: 60fps
- **Bundle Size**: < 200KB (gzipped)

## Next Steps

1. Review the [Architecture Guide](./architecture.md)
2. Check [Component Documentation](./components.md)
3. Read [API Documentation](./api.md)

## Support

For issues or questions:
- Check existing [GitHub Issues](https://github.com/vilhotalvitie-blip/talli-app/issues)
- Review the [Architecture Plan](../.windsurf/plans/talli-app-architecture-plan-5e44a9.md)
- Refer to [Development Guidelines](../.windsurf/rules/rust-ts-guidelines.md)
