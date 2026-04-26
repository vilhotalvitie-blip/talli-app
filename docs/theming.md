# Talli-App Theming Guidelines

## Overview

Talli-App implements a comprehensive theming system supporting Light, Dark, and System (auto) modes with Finnish as the default UI language.

## Theme Architecture

### Theme Modes

1. **Light Mode**: Clean, bright interface optimized for daytime use
2. **Dark Mode**: Reduced eye strain for low-light environments
3. **System Mode** (default): Automatically follows OS preference

### Storage & Persistence

Themes are persisted via `localStorage` using Zustand's persist middleware:
- Key: `talli-theme-storage`
- Auto-rehydration on app load
- Real-time updates without page refresh

## Design Tokens

### Color Palette

**Primary (Emerald) - Brand Identity**
```
Primary-50:  #ecfdf5  (Lightest background)
Primary-100: #d1fae5  (Hover states)
Primary-500: #10b981  (Main brand color - buttons, links)
Primary-600: #059669  (Active states)
Primary-900: #064e3b  (Dark backgrounds)
```

**Secondary (Indigo) - Supporting Color**
```
Secondary-500: #6366f1  (Accents, badges)
```

**Semantic Colors**
```
Success: #22c55e  (Green - confirmations, success states)
Warning: #f59e0b  (Amber - warnings, pending states)
Error:   #ef4444  (Red - errors, destructive actions)
Info:    #3b82f6  (Blue - information, neutral emphasis)
```

### Background Colors (CSS Variables)

**Light Mode**
```css
--background:         0 0% 100%    (Main background)
--background-primary: 0 0% 100%    (Cards, elevated surfaces)
--background-secondary: 210 40% 98% (Alternate backgrounds)
--background-tertiary:  210 40% 96% (Subtle backgrounds)
```

**Dark Mode**
```css
--background:         222 47% 11%   (Deep background)
--background-primary: 222 47% 11%   (Cards)
--background-secondary: 217 33% 17% (Alternate)
--background-tertiary:  215 28% 25% (Subtle)
```

### Typography Scale

**Font Sizes**
- `xs`: 0.75rem (12px) - Captions, timestamps
- `sm`: 0.875rem (14px) - Secondary text
- `base`: 1rem (16px) - Body text (default)
- `lg`: 1.125rem (18px) - Large body
- `xl`: 1.25rem (20px) - Small headings
- `2xl`: 1.5rem (24px) - Section headings
- `3xl`: 1.875rem (30px) - Major headings
- `4xl`: 2.25rem (36px) - Hero text

**Font Weights**
- `light`: 300
- `normal`: 400 (default)
- `medium`: 500
- `semibold`: 600
- `bold`: 700

### Spacing Scale

Base unit: 4px (0.25rem)

Common values:
- `1`: 0.25rem (4px) - Tight spacing
- `2`: 0.5rem (8px) - Compact spacing
- `4`: 1rem (16px) - Standard spacing
- `6`: 1.5rem (24px) - Section padding
- `8`: 2rem (32px) - Large gaps

### Border Radius

- `sm`: 0.125rem (2px) - Subtle rounding
- `DEFAULT`: 0.25rem (4px) - Standard
- `md`: 0.375rem (6px) - Components
- `lg`: 0.5rem (8px) - Cards
- `xl`: 0.75rem (12px) - Large elements
- `full`: 9999px - Pills, avatars

## Component Guidelines

### Button Component

**Variants**
- `default`: Primary action (emerald background)
- `destructive`: Dangerous actions (red)
- `outline`: Secondary actions (border only)
- `secondary`: Alternative primary (indigo)
- `ghost`: Subtle actions (transparent)
- `link`: Navigation (text only)

**Sizes**
- `sm`: 36px height (compact)
- `default`: 40px height (standard)
- `lg`: 44px height (emphasis)
- `icon`: 40px × 40px (square)

**Usage Example**
```tsx
<Button variant="default" size="lg">
  Rekisteröidy
</Button>
<Button variant="outline" size="sm">
  Kirjaudu
</Button>
<Button variant="ghost" size="icon">
  <SettingsIcon />
</Button>
```

### Card Component

**Structure**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Otsikko</CardTitle>
    <CardDescription>Kuvaus</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

**Styling**
- Background: `bg-card`
- Border: `border` (subtle)
- Shadow: `shadow-sm` to `shadow-lg` on hover
- Padding: `p-6` for header/footer, `pt-0` for content

## Responsive Behavior

### Breakpoint-Driven Themes

Themes adapt seamlessly across breakpoints:
- Mobile (< 768px): Full-width cards, stacked navigation
- Tablet (768-1024px): 2-column grids, sidebar navigation
- Desktop (> 1024px): 3-4 column grids, horizontal navigation

### Touch Target Guidelines

- Minimum: 48×48px (WCAG compliance)
- Recommended: 56×56px (optimal touch)
- Spacing between: 8px minimum

## Accessibility

### Color Contrast

All text meets WCAG 2.1 Level AA:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Focus States

- Ring width: 2px
- Ring color: `ring-ring` (matches primary)
- Ring offset: 2px
- Transition: 150ms ease

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Finnish Language Integration

### Text Contrast in Finnish

Finnish uses special characters (ä, ö, å) that maintain readability:
- All font weights support Nordic characters
- Line height: relaxed (1.5) for multi-line text
- Letter spacing: normal for body, tight for headings

### Finnish Terms

UI uses authentic Finnish equestrian terminology:
- **Talli**: Stable
- **Tallihaku**: Stable search
- **Tuntihaku**: Lesson search
- **Ratsastuskoulu**: Riding school
- **Rekisteröidy**: Register
- **Kirjaudu**: Log in

## Performance Considerations

### CSS Variables
- No runtime JavaScript required for theme switching
- GPU-accelerated transitions via CSS
- Minimal repaint/reflow on theme change

### Animation Performance
- Use `transform` and `opacity` only
- 60fps target for all animations
- `will-change` hints for complex animations

## Best Practices

### Do
- Use semantic color names (primary, success, error)
- Test in both light and dark modes
- Maintain consistent spacing rhythm
- Use CSS variables for dynamic theming

### Don't
- Hardcode colors (use theme tokens)
- Use pure black (#000) or pure white (#fff)
- Mix light and dark elements
- Override focus styles without replacement

## Customization

### Creating Custom Theme

1. Copy `src/styles/themes/` structure
2. Modify CSS variables in `globals.css`
3. Update Tailwind config with new colors
4. Test across all breakpoints

### Example: Custom Brand Color

```typescript
// tailwind.config.ts
colors: {
  primary: {
    500: "#your-brand-color",
    // ... other shades
  }
}
```

```css
/* globals.css */
:root {
  --primary-500: hsl(your-hue sat% lig%);
}
```

## Testing Checklist

- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] System mode follows OS preference
- [ ] Theme persists across reloads
- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AA
- [ ] Animations respect reduced-motion preference
- [ ] Touch targets meet minimum size
- [ ] Finnish characters display correctly
- [ ] Responsive breakpoints work correctly

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Finnish Equestrian Terms](https://www.ratsastus.fi/)
