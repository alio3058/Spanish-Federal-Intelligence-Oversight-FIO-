# 📊 Interactive Documents - Visual Reference

## Modal Layouts

### 1. Summary Modal

```
┌─────────────────────────────────────────────────────────────┐
│                                                          [✕] │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ TOP SECRET                                            │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  Operation Nightfall - Mission Brief.pdf                    │
│                                                              │
│  ┌────────────────────┬──────────────────────────────────┐  │
│  │ Classification Tier│ Status                           │  │
│  │ Tier 1 - Top Secret│ Active                           │  │
│  │                    │                                  │  │
│  │ Last Modified      │ Access Level                     │  │
│  │ 2026-01-18         │ ✓ Access Granted                 │  │
│  └────────────────────┴──────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Executive Summary                                     │   │
│  │                                                       │   │
│  │ Covert surveillance operation targeting criminal     │   │
│  │ syndicate 'Red Veil' operating across Eastern        │   │
│  │ European financial networks. Mission objectives      │   │
│  │ include asset identification, communication          │   │
│  │ intercept, and strategic disruption planning.        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────┐  ┌──────────────────────────────┐  │
│  │ 📄 View Summary    │  │ 📂 Open Document             │  │
│  └────────────────────┘  └──────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Clean, professional layout
- Classification badge at top
- 2x2 info grid for metadata
- Blue-bordered executive summary box
- Two clear action buttons at bottom

---

### 2. Document Viewer

```
┌──────────────────────────────────────────────────────────────┐
│ [✕ Close Document]  🔒 Operation Nightfall.pdf    [🖨️] [💾] │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│    ┌────────────────────────────────────────────────┐        │
│    │                                                 │        │
│    │         United States Government                │        │
│    │       Federal Bureau of Investigation           │        │
│    │         Case File: 000001-FBI-2026              │        │
│    │ ─────────────────────────────────────────────── │        │
│    │                                                 │        │
│    │ ══════════════════════════════════════════════ │        │
│    │              TOP SECRET                         │        │
│    │ ══════════════════════════════════════════════ │        │
│    │                                                 │        │
│    │      OPERATION NIGHTFALL - MISSION BRIEF        │        │
│    │                                                 │        │
│    │ ┌─────────────────────────────────────────┐    │        │
│    │ │ Date: 2026-01-18                        │    │        │
│    │ │ Classification: TOP SECRET              │    │        │
│    │ │ Status: Active                          │    │        │
│    │ │ Access Level: AUTHORIZED PERSONNEL ONLY │    │        │
│    │ └─────────────────────────────────────────┘    │        │
│    │                                                 │        │
│    │ EXECUTIVE SUMMARY                               │        │
│    │ ─────────────────                               │        │
│    │                                                 │        │
│    │     Covert surveillance operation targeting     │        │
│    │ criminal syndicate 'Red Veil' operating across  │        │
│    │ Eastern European financial networks...          │        │
│    │                                                 │        │
│    │ DETAILED ANALYSIS                               │        │
│    │ ─────────────────                               │        │
│    │                                                 │        │
│    │ Background                                      │        │
│    │                                                 │        │
│    │     Intelligence gathering operations...        │        │
│    │                                                 │        │
│    │ Key Findings                                    │        │
│    │                                                 │        │
│    │ • Operational intelligence indicates elevated   │        │
│    │   threat levels in designated sectors           │        │
│    │ • Asset identification and tracking protocols   │        │
│    │   have been successfully implemented            │        │
│    │                                                 │        │
│    │ Recommendations                                 │        │
│    │                                                 │        │
│    │ 1. Maintain heightened surveillance on          │        │
│    │    identified targets and associated networks   │        │
│    │ 2. Coordinate with inter-agency partners...     │        │
│    │                                                 │        │
│    │ ═════════════════════════════════════════════  │        │
│    │ Some information has been redacted pursuant     │        │
│    │ to FOIA exemptions.                             │        │
│    │                                                 │        │
│    │ DESTROY BY: [REDACTED]                          │        │
│    │                                                 │        │
│    └─────────────────────────────────────────────────┘        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**Features:**
- Full-screen dark background
- Toolbar with document title and controls
- Aged paper document styling
- Official government headers
- Classification banners (red bars)
- Monospace typewriter font
- "CLASSIFIED" watermark (diagonal across page)
- Structured sections with headers
- Footer notices (redaction, destruction)

---

## Color Scheme

### Classification Tiers

**Tier 1 - Top Secret**
```
Background: rgba(192, 84, 74, 0.2)
Text: #c0544a (Deep Red)
Border: #c0544a
```

**Tier 2 - Confidential**
```
Background: rgba(212, 148, 94, 0.2)
Text: #d4945e (Burnt Orange)
Border: #d4945e
```

**Tier 3 - Restricted**
```
Background: rgba(212, 167, 106, 0.2)
Text: #d4a76a (Gold/Yellow)
Border: #d4a76a
```

### Document Viewer Colors

**Paper Background:**
```css
background: #f4f1e8; /* Aged beige/cream */
```

**Classification Banner:**
```css
background: #c0544a; /* Deep red */
border: 3px solid #8b0000; /* Dark red */
```

**Text Colors:**
```css
Primary Text: #1a1a1a (Near black)
Metadata Labels: #555 (Medium gray)
Footer Notices: #c0544a (Red for warnings)
```

**Watermark:**
```css
color: rgba(192, 84, 74, 0.08); /* Transparent red */
```

---

## Animation Sequences

### Opening Summary Modal

```
Timeline:
0ms   → Modal overlay appears (opacity: 0)
10ms  → Add 'active' class
10ms  → Fade in starts (opacity: 0 → 1)
       → Slide up (translateY: -20px → 0)
       → Scale (0.95 → 1)
410ms → Animation complete
```

### Transitioning to Document Viewer

```
Timeline:
0ms   → User clicks "Open Document"
0ms   → Summary modal fade out starts
300ms → Summary modal hidden
310ms → Document viewer appears
810ms → Document viewer fully visible
```

### Closing Animations

```
Timeline:
0ms   → User clicks close or outside
0ms   → Remove 'active' class
0ms   → Fade out starts (opacity: 1 → 0)
300ms → Add 'hidden' class
300ms → Modal removed from view
```

---

## Button States

### Primary Button (Open Document)

**Normal State:**
```css
background: #4a90e2
color: white
box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3)
```

**Hover State:**
```css
background: #6ba4ed (lighter blue)
box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4)
transform: translateY(-2px)
```

**Active State:**
```css
transform: translateY(0)
```

### Secondary Button (View Summary)

**Normal State:**
```css
background: rgba(74, 144, 226, 0.1)
color: #4a90e2
border: 1px solid #4a90e2
```

**Hover State:**
```css
background: rgba(74, 144, 226, 0.2)
transform: translateY(-2px)
```

### Close Button

**Normal State:**
```css
background: rgba(192, 84, 74, 0.1)
color: #c0544a
border: 1px solid #c0544a
```

**Hover State:**
```css
background: rgba(192, 84, 74, 0.25)
transform: rotate(90deg)
```

---

## Responsive Breakpoints

### Desktop (> 1200px)
- Modal width: 800px max
- Info grid: 2 columns
- Full padding (40px)
- All features visible

### Tablet (768px - 1200px)
- Modal width: 90%
- Info grid: 1 column
- Reduced padding (30px)
- Maintained functionality

### Mobile (< 768px)
- Modal width: 95%
- Info grid: 1 column stacked
- Action buttons: stacked vertically
- Reduced padding (24px)
- Smaller document font (0.9em)
- Compressed toolbar

---

## Typography

### Summary Modal

**Title:**
```css
font-size: 1.5em
font-weight: 600
line-height: 1.4
```

**Labels:**
```css
font-size: 0.85em
font-weight: 600
text-transform: uppercase
letter-spacing: 0.8px
```

**Body Text:**
```css
font-size: 1em
line-height: 1.7
```

### Document Viewer

**Document Title:**
```css
font-family: 'Courier New', Courier, monospace
font-size: 1.8em
font-weight: bold
text-transform: uppercase
letter-spacing: 2px
```

**Section Headers:**
```css
font-size: 1.3em
font-weight: bold
text-transform: uppercase
letter-spacing: 2px
border-bottom: 2px solid #333
```

**Body Text:**
```css
font-family: 'Courier New', Courier, monospace
font-size: 1em
line-height: 1.8
text-align: justify
text-indent: 40px
```

---

## Spacing & Layout

### Summary Modal Padding

```
Container: 40px all sides
Header: 40px horizontal, 40px top, 30px bottom
Body: 40px all sides
Info Grid Gap: 24px
Executive Summary: 24px padding
Actions Section: 24px top padding
Button Gap: 16px
```

### Document Viewer Margins

```
Document Container: 60px vertical, 80px horizontal
Section Margins: 40px vertical
Paragraph Margins: 15px bottom
List Indentation: 60px left
```

---

## Z-Index Hierarchy

```
Document Viewer:    z-index: 3000  (Top layer)
Summary Modal:      z-index: 2500  (Second layer)
Access Denied:      z-index: 2000  (Third layer)
Loading Screen:     z-index: 1000  (Fourth layer)
Main Content:       z-index: 1     (Base layer)
```

---

## Shadow Effects

### Summary Modal

```css
box-shadow: 
    0 0 40px rgba(74, 144, 226, 0.3),  /* Blue glow */
    0 8px 32px rgba(0, 0, 0, 0.45)     /* Depth shadow */
```

### Document Paper

```css
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6)
```

### Buttons (Hover)

```css
box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4)
```

---

## Interaction Feedback

### Click Feedback
- Instant visual response (< 50ms)
- Smooth state transitions
- Clear active states

### Hover Feedback
- Subtle lift effect (-2px)
- Color brightening
- Shadow enhancement
- Cursor changes to pointer

### Loading States
- Smooth fade transitions
- No jarring content shifts
- Maintained layout stability

---

## Accessibility Features

### Keyboard Support
- ESC key closes modals
- Tab navigation through buttons
- Enter activates focused button

### Visual Indicators
- High contrast classification badges
- Clear button states
- Focus rings on interactive elements

### Screen Reader Support
- Semantic HTML structure
- ARIA labels on buttons
- Descriptive link text

---

This visual reference provides a complete overview of the interactive document system's appearance, behavior, and technical styling details.
