# Professional UI Design System
## ARCHIVE-X Intelligence Platform

---

## 🎨 Color Palette

### Primary Colors
```css
--navy-950: #0a0e1a          /* Deep background */
--navy-900: #0f1419          /* Primary background */
--navy-800: #1a1f2e          /* Secondary background */
--navy-700: #252d3d          /* Elevated surfaces */
--navy-600: #2f3847          /* Subtle highlights */
```

### Accent Colors
```css
--blue-500: #3b82f6          /* Primary action */
--blue-400: #60a5fa          /* Hover states */
--blue-600: #2563eb          /* Active states */
--blue-100: #dbeafe          /* Light accents */
```

### Semantic Colors
```css
--success-500: #10b981       /* Success states */
--success-600: #059669       /* Success hover */
--warning-500: #f59e0b       /* Warning states */
--warning-600: #d97706       /* Warning hover */
--danger-500: #ef4444        /* Error/danger states */
--danger-600: #dc2626        /* Danger hover */
```

### Neutral Colors
```css
--slate-50: #f8fafc          /* Lightest text */
--slate-200: #e2e8f0         /* Primary text on dark */
--slate-400: #94a3b8         /* Secondary text */
--slate-500: #64748b         /* Tertiary text */
--slate-600: #475569         /* Muted text */
```

### Special
```css
--border-subtle: rgba(148, 163, 184, 0.1)
--border-default: rgba(148, 163, 184, 0.15)
--border-emphasis: rgba(148, 163, 184, 0.25)
```

---

## 📝 Typography

### Font Families
- **Primary**: `Inter` - Modern, professional, highly readable
- **Monospace**: `IBM Plex Mono` - Technical data, code blocks
- **Display**: `Inter` (heavier weights) - Headers, titles

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Type Scale
```css
--text-xs: 0.75rem     /* 12px */
--text-sm: 0.875rem    /* 14px */
--text-base: 1rem      /* 16px */
--text-lg: 1.125rem    /* 18px */
--text-xl: 1.25rem     /* 20px */
--text-2xl: 1.5rem     /* 24px */
--text-3xl: 1.875rem   /* 30px */
--text-4xl: 2.25rem    /* 36px */
```

### Line Heights
```css
--leading-tight: 1.25
--leading-normal: 1.5
--leading-relaxed: 1.75
```

### Letter Spacing
```css
--tracking-tight: -0.025em
--tracking-normal: 0
--tracking-wide: 0.025em
--tracking-wider: 0.05em
--tracking-widest: 0.1em
```

---

## 🎯 Spacing System

### Base Scale (4px)
```css
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */
--space-3: 0.75rem    /* 12px */
--space-4: 1rem       /* 16px */
--space-5: 1.25rem    /* 20px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
```

---

## 🔲 Shadows

### Shadow Scale
```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)
```

### Glow Effects (Subtle)
```css
--glow-blue-subtle: 0 0 20px rgba(59, 130, 246, 0.15)
--glow-success-subtle: 0 0 20px rgba(16, 185, 129, 0.15)
```

---

## 🎬 Animation & Transitions

### Durations
```css
--duration-fast: 150ms
--duration-normal: 250ms
--duration-slow: 350ms
```

### Easing Functions
```css
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Standard Transitions
```css
--transition-colors: color 150ms var(--ease-out), background-color 150ms var(--ease-out)
--transition-transform: transform 250ms var(--ease-out)
--transition-all: all 250ms var(--ease-out)
```

---

## 🎨 Component Styles

### Cards
- Background: `--navy-700`
- Border: `--border-default`
- Border radius: `8px` or `12px`
- Padding: `--space-6` (24px)
- Shadow: `--shadow-md`

### Buttons

#### Primary
- Background: `--blue-500`
- Hover: `--blue-400`
- Active: `--blue-600`
- Text: `--slate-50`
- Padding: `12px 24px`
- Border radius: `6px`

#### Secondary
- Background: `--navy-600`
- Border: `1px solid --border-emphasis`
- Hover: `--navy-500`
- Text: `--slate-200`

### Inputs
- Background: `--navy-800`
- Border: `1px solid --border-default`
- Focus border: `--blue-500`
- Padding: `10px 16px`
- Border radius: `6px`

### Tables
- Header background: `--navy-700`
- Row background: `--navy-800`
- Row hover: `--navy-700`
- Border: `--border-subtle`

---

## 🔤 Icon Library Recommendations

### Option 1: Lucide Icons (Recommended)
- **URL**: https://lucide.dev
- **Why**: Clean, consistent, modern
- **Size**: 20px or 24px standard
- **Stroke width**: 2px

### Option 2: Heroicons
- **URL**: https://heroicons.com
- **Why**: Professional, minimalist
- **Variants**: Solid and outline

### Option 3: Phosphor Icons
- **URL**: https://phosphoricons.com
- **Why**: Versatile, extensive library
- **Weight options**: Thin to bold

---

## 🎨 UI Component Library Suggestions

### Headless UI + Custom Styling
Build custom components with professional interactions using headless libraries.

### Components to Standardize
1. **Data Tables**: Sortable, filterable, with clean pagination
2. **Modals**: Centered, with backdrop blur
3. **Dropdowns**: Smooth animations, keyboard navigation
4. **Toast Notifications**: Top-right, subtle slide-in
5. **Form Controls**: Consistent focus states
6. **Status Badges**: Pill-shaped, semantic colors
7. **Navigation**: Clear active states, smooth transitions

---

## ✅ Best Practices

### DO:
- Use consistent spacing (multiples of 4px or 8px)
- Maintain high contrast for text (WCAG AA minimum)
- Use subtle shadows for depth
- Implement smooth, purposeful animations
- Keep hover states obvious but not jarring

### DON'T:
- Overuse bright colors or glows
- Mix inconsistent border radiuses
- Use more than 3-4 colors per section
- Animate everything (only meaningful transitions)
- Use extreme drop shadows

---

## 🎯 Implementation Priority

1. **Phase 1**: Update color variables and typography
2. **Phase 2**: Standardize spacing and component sizing
3. **Phase 3**: Replace emoji icons with SVG icons
4. **Phase 4**: Refine animations and hover states
5. **Phase 5**: Polish micro-interactions

---

## 📦 Quick Setup

```html
<!-- Add to <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Optional: Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
```

---

**Last Updated**: January 2026  
**Version**: 1.0
