---
description: Rust + TypeScript Development Guidelines for Talli-App
---

# Talli-App Development Guidelines

## Code Quality & Safety Standards

### Rust Guidelines

**Safety First:**
- Use `unwrap()` and `expect()` only in test code or during initial development; replace with proper error handling before commits
- Prefer `Result<T, E>` over panics for recoverable errors
- Use `Option<T>` methods (map, and_then, unwrap_or) for safe unwrapping
- Enable `#![deny(clippy::all)]` and `#![deny(rust_2018_idioms)]` in all Rust files
- Use `?` operator extensively for error propagation
- Implement `thiserror` for structured error types

**Type Safety:**
- Avoid `unsafe` blocks unless absolutely necessary and well-documented
- Use `NonZeroU*` types where zero is semantically invalid
- Leverage Rust's type system to make illegal states unrepresentable
- Use `#[must_use]` on functions with important return values

**Performance:**
- Use `Arc<str>` instead of `String` for immutable shared strings
- Prefer `Vec::with_capacity()` when size is known
- Use `Cow<'_, str>` for functions that may clone or borrow
- Implement `Default` trait instead of `new()` for zero-cost defaults

**Async/Await:**
- Use `tokio` as the async runtime
- Prefer `async fn` over manual `Future` implementations
- Use `spawn` for concurrent operations
- Implement proper cancellation tokens for long-running tasks

**Documentation:**
- Document all public APIs with `///` doc comments
- Include examples in doc comments
- Use `cargo doc` to verify documentation builds
- Keep README.md updated with architecture changes

### TypeScript Guidelines

**Type Safety:**
- Enable strict mode: `strict: true` in tsconfig.json
- Use `unknown` instead of `any` for unknown types
- Implement branded types for domain-specific identifiers
- Use discriminated unions for complex state machines
- Prefer `readonly` arrays and objects for immutability
- Use `satisfies` operator for type constraints without widening

**React Patterns:**
- Use functional components with hooks exclusively
- Implement `React.memo()` for expensive renders with proper dependency arrays
- Use `useCallback` and `useMemo` judiciously (measure first)
- Prefer composition over inheritance for component reuse
- Use `forwardRef` for component refs when needed

**Error Handling:**
- Use `zod` for runtime type validation
- Implement proper error boundaries for React components
- Use `try/catch` with typed errors in async functions
- Return `Result<T, Error>` pattern from utility functions

**State Management:**
- Keep Zustand stores focused and small (single responsibility)
- Use Immer for immutable updates in complex state
- Implement optimistic updates for better UX
- Use React Query for server state exclusively

## Project Structure

```
src/
├── app/                 # Next.js-style app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── primitives/     # Base UI components (Button, Input, etc.)
│   ├── composite/      # Business logic components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and constants
├── stores/             # Zustand state stores
├── styles/             # Theme configurations
├── types/              # TypeScript definitions
└── i18n/               # Internationalization
    ├── fi/            # Finnish translations (default)
    ├── en/            # English translations
    └── config.ts      # i18n configuration

src-tauri/
├── src/
│   ├── main.rs         # Entry point
│   ├── commands/       # Tauri command handlers
│   ├── models/         # Data structures
│   └── services/       # Business logic
├── Cargo.toml
└── tauri.conf.json
```

## Naming Conventions

**Rust:**
- `PascalCase` for types, traits, enums
- `snake_case` for functions, variables, modules
- `SCREAMING_SNAKE_CASE` for constants
- `PascalCase` for acronyms (e.g., `HttpRequest` not `HTTPRequest`)

**TypeScript/React:**
- `PascalCase` for components, interfaces, types
- `camelCase` for functions, variables, hooks
- `SCREAMING_SNAKE_CASE` for constants
- Prefix hooks with `use`: `useTheme`, `useBreakpoint`
- Suffix types with `Type` or `Props`: `ButtonProps`, `UserType`

**Files:**
- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Hooks: `camelCase.ts` (e.g., `useTheme.ts`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Styles: `kebab-case.css` or `kebab-case.module.css`

## Component Guidelines

**Primitive Components:**
```tsx
// Always forward ref and support all native attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), props.className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

**Composite Components:**
- Compose from primitives
- Implement compound component pattern for complex UIs
- Keep business logic in custom hooks
- Use React Context only for truly global state

## Testing Requirements

**Rust:**
- Unit tests for all public functions
- Integration tests for command handlers
- Use `cargo test` for all test runs
- Mock external dependencies

**TypeScript/React:**
- Component tests with React Testing Library
- Hook tests with `renderHook`
- E2E tests for critical user paths (Playwright)
- Minimum 80% coverage for business logic

## Performance Checklist

**Before Committing:**
- [ ] No `console.log` in production code
- [ ] No `debugger` statements
- [ ] No unused imports or variables
- [ ] Images optimized and lazy-loaded
- [ ] Animations use `transform` and `opacity` only
- [ ] Lists use virtualization for >50 items
- [ ] Bundle size checked with `vite-bundle-visualizer`

## Accessibility Requirements

**Mandatory:**
- WCAG 2.1 Level AA compliance
- Keyboard navigation for all interactive elements
- Screen reader announcements for dynamic content
- Focus management for modals and dialogs
- Color contrast ratio >= 4.5:1 for text
- Support for `prefers-reduced-motion`

**Implementation:**
- Use Radix UI primitives for accessibility
- Add `aria-label` for icon-only buttons
- Implement skip links for navigation
- Use semantic HTML elements
- Test with keyboard-only navigation

## Internationalization (i18n)

**Finnish as Default:**
- All UI strings in Finnish by default
- English translations maintained in parallel
- Use `next-intl` or `react-i18next` for translation management
- Format dates, numbers, and currencies according to Finnish locale
- Support RTL languages in layout (future-proofing)

**Translation Files:**
```typescript
// i18n/fi/common.json
{
  "navigation": {
    "search": "Haku",
    "stables": "Tallit",
    "bookings": "Varaukset"
  }
}

// i18n/en/common.json
{
  "navigation": {
    "search": "Search",
    "stables": "Stables",
    "bookings": "Bookings"
  }
}
```

## Git Workflow

**Branch Naming:**
- Features: `feature/theme-system`
- Bugs: `fix/responsive-layout`
- Docs: `docs/api-reference`

**Commit Messages:**
```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(ui): add theme switching capability`
- `fix(layout): correct mobile navigation positioning`
- `docs(readme): update setup instructions`

## Security Considerations

**Rust Backend:**
- Validate all inputs at API boundaries
- Use prepared statements for all database queries
- Implement rate limiting on public endpoints
- Sanitize user-generated content before display
- Use HTTPS for all external communications

**Frontend:**
- Sanitize HTML in user content (DOMPurify)
- Use Content Security Policy headers
- Validate file uploads (type, size)
- No secrets in client-side code
- Secure cookie settings

## Dependencies

**Allowed:**
- `@radix-ui/*` - Accessible primitives
- `tailwindcss` - Utility-first styling
- `zustand` - State management
- `@tanstack/react-query` - Server state
- `framer-motion` - Animations
- `lucide-react` - Icons
- `zod` - Validation
- `clsx` + `tailwind-merge` - Class utilities

**Review Required:**
- Any new runtime dependency >100KB
- Any dependency with <1000 weekly downloads
- Any dependency not updated in 6 months

## Code Review Checklist

**For Authors:**
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console warnings
- [ ] Responsive design verified
- [ ] Accessibility tested

**For Reviewers:**
- [ ] Logic correctness
- [ ] Performance implications
- [ ] Security considerations
- [ ] Type safety maintained
- [ ] Error handling complete
- [ ] i18n strings present

## Emergency Procedures

**If Build Fails:**
1. Check `cargo check` / `tsc --noEmit`
2. Verify lockfiles are committed (`Cargo.lock`, `pnpm-lock.yaml`)
3. Check for environment-specific issues

**If Performance Regresses:**
1. Profile with browser DevTools / `cargo flamegraph`
2. Identify slow renders / hot paths
3. Implement memoization / virtualization
4. Measure before/after with Lighthouse

## Contact & Resources

- Architecture Plan: `docs/architecture.md`
- Component Library: `src/components/README.md`
- API Documentation: `docs/api.md`
- Finnish Translation Guide: `docs/i18n-fi.md`

---

Last Updated: April 2026
Enforced by: CI/CD pipeline, pre-commit hooks, and code review
