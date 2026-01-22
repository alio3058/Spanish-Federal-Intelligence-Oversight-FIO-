# ARCHIVE-X Visual Design Guide

## Color Specifications

### Primary Palette
```css
--color-bg-primary: #0f1419;        /* Page background - Deep navy black */
--color-bg-secondary: #1a1f2e;      /* Panels & header - Navy blue */
--color-bg-tertiary: #252d3d;       /* Cards & inputs - Lighter charcoal */
--color-text-primary: #e8eef7;      /* Main text - Light blue-grey */
--color-text-secondary: #a0aac0;    /* Labels - Muted blue-grey */
--color-text-tertiary: #7a8499;     /* Dim text - Darker grey */
```

### Accent Colors
```css
--color-accent-blue: #4a90e2;           /* Primary interactive (buttons, active states) */
--color-accent-blue-light: #6ba4ed;     /* Hover states */
--color-accent-blue-dark: #2d5cb8;      /* Pressed states */

--color-success: #4a9d6f;               /* Status: Online, Operational */
--color-warning: #d4945e;               /* Status: Alert, Pending, Caution */
--color-danger: #c0544a;                /* Status: Error, Critical, Denied */
--color-info: #5a8fb8;                  /* Status: Info, General alerts */
```

---

## Typography

### Font Stack
```css
Body Text: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Monospace: 'IBM Plex Mono', monospace
```

### Size & Weight Scale
```
H1 (System Title)    : 1.5em, Bold (700)      /* ARCHIVE-X */
H2 (Panel Headers)   : 1.1em, SemiBold (600)  /* Recent Activity */
H3 (Card Titles)     : 1.0em, SemiBold (600)  /* File names */
Body Text            : 0.95em, Regular (400)  /* Default content */
Labels/Captions      : 0.85em, Medium (500)   /* "Database Status" */
Meta/Secondary       : 0.8em, Regular (400)   /* Timestamps, IDs */
```

---

## Spacing System

### Base Unit: 8px Grid
```
--spacing-xs: 4px     /* Minimal gaps */
--spacing-sm: 8px     /* Small gaps */
--spacing-md: 16px    /* Standard padding */
--spacing-lg: 24px    /* Panel padding */
--spacing-xl: 32px    /* Section spacing */
```

### Usage Examples
- Card padding: 16px
- Panel header padding: 24px
- Section gap: 32px
- Input padding: 8px 16px
- Button padding: 8px 16px

---

## Border Radius

```
--radius-sm: 4px    /* Badges, small inputs */
--radius-md: 6px    /* Cards, buttons, panels */
--radius-lg: 8px    /* Large modals, main panels */
```

---

## Shadows

### Depth Layers
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.25);      /* Subtle, cards */
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.35);     /* Hover states */
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.45);     /* Modals, prominent */
```

### Hover Card Example
```
Default: 0 2px 8px
Hover:   0 8px 24px (with transform: translateY(-4px))
```

---

## Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Common Applications
- Hover color changes: 150ms
- Panel elevation/shadows: 300ms
- Loading screen fade: 500ms
- Modal slide-in: 300ms

---

## Component Specifications

### Status Indicator (Dot)
```
Size: 10px × 10px
Border radius: 50%
Colors:
  - Green (online): #4a9d6f
  - Yellow (alert): #d4945e
  - Red (critical): #c0544a
Animation: 2s pulse (opacity 1 → 0.7 → 1)
Glow: box-shadow 0 0 8px [color]
```

### Classification Badge
```
Text: UPPERCASE
Font: Bold (700), 0.75em, letter-spacing 1px
Padding: 4px 8px
Border radius: 4px

Tier-1 (Top Secret):
  Background: rgba(192, 84, 74, 0.2)  /* Danger red tint */
  Color: #c0544a

Tier-2 (Confidential):
  Background: rgba(212, 148, 94, 0.2) /* Warning amber tint */
  Color: #d4945e
```

### File Card
```
Layout: Vertical flex
Background: Linear gradient (bg-tertiary → bg-secondary)
Border: 1px solid --color-border
Padding: 16px
Border radius: 6px
Hover:
  - Border: rgba(74, 144, 226, 0.3)
  - Shadow: 0 8px 24px rgba(74, 144, 226, 0.15)
  - Transform: translateY(-4px)
Transition: 300ms
```

### Active Navigation Item
```
Background: rgba(74, 144, 226, 0.15)  /* Subtle blue */
Color: #4a90e2
Border-left: 3px solid #4a90e2
Font-weight: 600
```

### Status Card Grid
```
Layout: CSS Grid
Columns: repeat(auto-fit, minmax(200px, 1fr))
Gap: 16px

Card Content:
  - Label: 0.85em, uppercase, secondary text
  - Indicator: 50px × 50px circle (glowing)
  - Status: 1.3em, bold
  - Detail: 0.85em, tertiary text
```

---

## Interaction Patterns

### Hover States
```
Most interactive elements:
  - Color shift: [color] → lighter shade
  - Shadow: increase
  - Border: opacity increase
  - Transform: subtle lift (translateY(-2px) to -4px)

Buttons:
  - Background: gradient shift darker
  - Shadow: more prominent
  - Transform: translateY(-1px)

Text links:
  - Color: shift to accent-blue-light
  - Border-bottom: emerge
```

### Focus States
```
Inputs:
  - Outline: none (remove default)
  - Border-color: --color-accent-blue
  - Box-shadow: 0 0 12px rgba(74, 144, 226, 0.2)
  - Background: rgba(74, 144, 226, 0.05)
```

### Active States
```
Navigation items: Bright accent color + border
Buttons: Pressed (slight inset shadow)
Toggles: Color shift
```

---

## Responsive Breakpoints

```
Desktop (> 1024px):
  - 3-column layout (240px sidebar)
  - Full file card grid
  - Subject panel on right side

Tablet (768px - 1024px):
  - Narrower sidebar (200px)
  - 2-column card layout
  - Subject panel adapts

Mobile (< 768px):
  - Single column layout
  - Sidebar moves to bottom
  - Stack-based navigation
  - Full-width panels
  - Subject panel slides from top
```

---

## Animations

### Pulse (Status Indicators)
```
Timing: 2s ease-in-out infinite
Keyframes: 
  0%, 100%: opacity 1
  50%: opacity 0.7
Used for: Live status dots
```

### Spin (Loading)
```
Timing: 1s linear infinite
Rotation: 0deg → 360deg
Used for: Loading spinner
```

### Slide-up (Modals)
```
Duration: 300ms
From: translateY(20px), opacity 0
To: translateY(0), opacity 1
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Slide-in (Profile Panel)
```
Duration: 300ms
From: translateX(100%)
To: translateX(0)
Used for: Subject profile side panel
```

---

## Accessibility Notes

### Color Contrast
- Text on bg-primary: ✅ WCAG AA (ratio > 7:1)
- Text on bg-secondary: ✅ WCAG AA (ratio > 7:1)
- Accent colors: ✅ Readable with secondary text

### Interactive Elements
- Min touch target: 44px × 44px
- Focus states: Visible and distinct
- Hover states: Non-essential enhancements

### Semantic HTML
- `<header>`, `<main>`, `<aside>`, `<footer>` for landmarks
- `<nav>` for navigation
- Proper heading hierarchy (H1, H2, H3)
- Form labels associated with inputs

---

## Dark Mode Characteristics

✅ **No pure white** - Uses #e8eef7 (soft blue-grey)
✅ **No harsh black** - Uses #0f1419 (deep navy)
✅ **Reduced contrast jumps** - Soft gradients between color stops
✅ **Glow effects** - Subtle box shadows simulate light
✅ **Professional tone** - Avoids "neon hacker" aesthetic
✅ **Long-form readability** - Proper line-height and letter-spacing

---

## Design Decision Rationale

### Why This Color Scheme?
- **Navy + Muted Blues**: Associated with government/authority
- **Professional Green/Amber/Red**: Not cyberpunk neon
- **Low contrast text**: Reduces eye strain on dark backgrounds
- **Subtle gradients**: Creates depth without distraction

### Why These Animations?
- **Slow timing (150-300ms)**: Professional, not gamey
- **Easing function**: Natural motion, not jarring
- **Minimal motion**: Important for accessibility

### Why This Typography?
- **Inter**: Modern, clean, excellent readability at all sizes
- **IBM Plex Mono**: Professional monospace for code/logs
- **Large letter-spacing**: Improves scannability for labels

---

**Last Updated**: January 20, 2026
**Version**: 2.0 (Professional Federal Intelligence Dashboard)
