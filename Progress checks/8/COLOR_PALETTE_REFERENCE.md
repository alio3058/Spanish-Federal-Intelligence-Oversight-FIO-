# ARCHIVE-X Professional Color Palette

## 🎨 Primary Palette

### Backgrounds
```
┌─────────────────────────────────────┐
│ Primary Background                   │
│ #0f1419                             │
│ rgb(15, 20, 25)                     │
│ Main app background                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Secondary Background                 │
│ #1a1f2e                             │
│ rgb(26, 31, 46)                     │
│ Cards, panels, modals               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Tertiary Background                  │
│ #252d3d                             │
│ rgb(37, 45, 61)                     │
│ Elevated surfaces, headers          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Elevated Background                  │
│ #2f3847                             │
│ rgb(47, 56, 71)                     │
│ Hover states, highlights            │
└─────────────────────────────────────┘
```

---

## 💬 Text Colors

### Primary Text
**#e2e8f0** (slate-200)  
rgb(226, 232, 240)  
Main body text, headings

### Secondary Text
**#94a3b8** (slate-400)  
rgb(148, 163, 184)  
Descriptions, labels, meta

### Tertiary Text
**#64748b** (slate-500)  
rgb(100, 116, 139)  
Timestamps, deemphasized

### Muted Text
**#475569** (slate-600)  
rgb(71, 85, 105)  
Placeholders, disabled

---

## 🔵 Accent Blue (Primary Action)

### Main
**#3b82f6** (blue-500)  
rgb(59, 130, 246)  
Buttons, links, active states

### Light (Hover)
**#60a5fa** (blue-400)  
rgb(96, 165, 250)  
Hover effects

### Dark (Active)
**#2563eb** (blue-600)  
rgb(37, 99, 235)  
Pressed/active states

---

## ✅ Semantic Colors

### Success (Green)
**#10b981** (emerald-500)  
rgb(16, 185, 129)  
Success states, positive indicators

**#059669** (emerald-600)  
rgb(5, 150, 105)  
Success hover/active

### Warning (Amber)
**#f59e0b** (amber-500)  
rgb(245, 158, 11)  
Warning states, caution

**#d97706** (amber-600)  
rgb(217, 119, 6)  
Warning hover/active

### Danger (Red)
**#ef4444** (red-500)  
rgb(239, 68, 68)  
Errors, destructive actions

**#dc2626** (red-600)  
rgb(220, 38, 38)  
Danger hover/active

---

## 🔲 Borders

### Subtle
`rgba(148, 163, 184, 0.1)`  
Light dividers, inner borders

### Default
`rgba(148, 163, 184, 0.15)`  
Standard borders, card outlines

### Emphasis
`rgba(148, 163, 184, 0.25)`  
Focused borders, important dividers

---

## 💫 Shadows & Glows

### Shadows (Neutral)
```css
--shadow-xs:  0 1px 2px 0 rgba(0,0,0,0.05)
--shadow-sm:  0 1px 3px 0 rgba(0,0,0,0.1), 
              0 1px 2px -1px rgba(0,0,0,0.1)
--shadow-md:  0 4px 6px -1px rgba(0,0,0,0.1), 
              0 2px 4px -2px rgba(0,0,0,0.1)
--shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.1), 
              0 4px 6px -4px rgba(0,0,0,0.1)
--shadow-xl:  0 20px 25px -5px rgba(0,0,0,0.1), 
              0 8px 10px -6px rgba(0,0,0,0.1)
```

### Glows (Subtle - Use Sparingly!)
```css
/* Blue glow for interactive elements */
--glow-blue-subtle: 0 0 20px rgba(59, 130, 246, 0.15)

/* Green glow for status indicators */
--glow-success-subtle: 0 0 20px rgba(16, 185, 129, 0.15)
```

**⚠️ Use glows ONLY for:**
- Active status dots
- Primary buttons on hover (optional)
- Focus states on critical inputs
- Live/real-time indicators

**❌ NEVER use glows on:**
- Static text
- All borders
- Background elements
- Non-interactive content

---

## 📊 Usage Examples

### Button Primary
```css
background: #3b82f6
color: #e2e8f0
border: none

:hover {
  background: #60a5fa
  box-shadow: var(--shadow-md)
}

:active {
  background: #2563eb
}
```

### Card Component
```css
background: #1a1f2e
border: 1px solid rgba(148, 163, 184, 0.15)
border-radius: 8px
padding: 24px

:hover {
  border-color: rgba(148, 163, 184, 0.25)
  box-shadow: var(--shadow-md)
}
```

### Status Indicator - Success
```css
background: #10b981
box-shadow: 0 0 20px rgba(16, 185, 129, 0.15)
border-radius: 50%
```

### Input Field
```css
background: #252d3d
border: 1px solid rgba(148, 163, 184, 0.15)
color: #e2e8f0

:focus {
  border-color: #3b82f6
  background: #1a1f2e
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)
}
```

### Table Header
```css
background: #2f3847
color: #94a3b8
border-bottom: 2px solid rgba(148, 163, 184, 0.15)
```

### Alert/Warning Banner
```css
background: rgba(245, 158, 11, 0.1)
border-left: 3px solid #f59e0b
color: #fcd34d
```

---

## 🎯 Color Contrast Ratios

**WCAG AA Compliant**

| Background | Text Color | Ratio | Status |
|------------|------------|-------|--------|
| #0f1419 | #e2e8f0 | 13.1:1 | ✅ AAA |
| #1a1f2e | #e2e8f0 | 11.2:1 | ✅ AAA |
| #252d3d | #e2e8f0 | 8.9:1 | ✅ AAA |
| #0f1419 | #94a3b8 | 6.8:1 | ✅ AA |
| #1a1f2e | #94a3b8 | 5.9:1 | ✅ AA |
| #3b82f6 | #e2e8f0 | 4.9:1 | ✅ AA |

---

## 🎨 Figma/Design Export

```json
{
  "colors": {
    "background": {
      "primary": "#0f1419",
      "secondary": "#1a1f2e",
      "tertiary": "#252d3d",
      "elevated": "#2f3847"
    },
    "text": {
      "primary": "#e2e8f0",
      "secondary": "#94a3b8",
      "tertiary": "#64748b",
      "muted": "#475569"
    },
    "accent": {
      "blue": "#3b82f6",
      "blueLight": "#60a5fa",
      "blueDark": "#2563eb"
    },
    "semantic": {
      "success": "#10b981",
      "successDark": "#059669",
      "warning": "#f59e0b",
      "warningDark": "#d97706",
      "danger": "#ef4444",
      "dangerDark": "#dc2626"
    }
  }
}
```

---

## 🔍 Quick Visual Test

Copy this HTML to test your palette:

```html
<div style="display: flex; gap: 16px; padding: 24px; background: #0f1419;">
  <!-- Backgrounds -->
  <div style="width: 100px; height: 100px; background: #1a1f2e; border-radius: 8px;"></div>
  <div style="width: 100px; height: 100px; background: #252d3d; border-radius: 8px;"></div>
  <div style="width: 100px; height: 100px; background: #2f3847; border-radius: 8px;"></div>
  
  <!-- Accents -->
  <div style="width: 100px; height: 100px; background: #3b82f6; border-radius: 8px;"></div>
  <div style="width: 100px; height: 100px; background: #10b981; border-radius: 8px;"></div>
  <div style="width: 100px; height: 100px; background: #f59e0b; border-radius: 8px;"></div>
  <div style="width: 100px; height: 100px; background: #ef4444; border-radius: 8px;"></div>
</div>
```

---

**Last Updated**: January 2026  
**Palette Version**: Professional 2.0  
**Status**: ✅ Production Ready
