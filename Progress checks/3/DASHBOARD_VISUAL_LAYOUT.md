# Intelligence Dashboard - Visual Layout Diagram

## Page Structure Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        DASHBOARD HEADER                                   │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────┐   │
│  │ Intelligence Dashboard          │  │ Last Update:                │   │
│  │ Real-time monitoring platform   │  │ 01/20/2026, 14:23:45       │   │
│  └─────────────────────────────────┘  └─────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                       SUMMARY METRICS                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │ 📄  247  │  │ ⚠️   18  │  │ 🔔   3   │  │ 🗄️  1842 │                │
│  │ Active   │  │ Pending  │  │ Critical │  │ Archived │                │
│  │ Documents│  │ Reviews  │  │ Alerts   │  │ Items    │                │
│  │ +12 week │  │ 4 urgent │  │ Requires │  │ Total    │                │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘                │
└──────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐ ┌─────────────────────────────────────┐
│         LEFT COLUMN             │ │          RIGHT COLUMN               │
│                                 │ │                                     │
│  ┌─────────────────────────┐   │ │  ┌─────────────────────────────┐   │
│  │    SYSTEM STATUS        │   │ │  │    RECENT ACTIVITY          │   │
│  ├─────────────────────────┤   │ │  ├─────────────────────────────┤   │
│  │ Database   ● Operational│   │ │  │ 📄 Agent Cooper created     │   │
│  │ Uptime: 99.97%          │   │ │  │    SIGINT-2026-0147         │   │
│  │                         │   │ │  │    15m ago      [Pending]   │   │
│  │ Encryption ● Operational│   │ │  │                             │   │
│  │ Uptime: 100.0%          │   │ │  │ ✓ Director Hayes approved   │   │
│  │                         │   │ │  │    Operation Darkstar       │   │
│  │ Network    ◐ Degraded   │   │ │  │    30m ago      [Approved]  │   │
│  │ Uptime: 98.45%          │   │ │  │                             │   │
│  │                         │   │ │  │ 👁️ Analyst Martinez viewed  │   │
│  │ Authentication          │   │ │  │    Classified Briefing 12-A │   │
│  │           ● Operational │   │ │  │    1h ago       [Logged]    │   │
│  │ Uptime: 99.99%          │   │ │  │                             │   │
│  └─────────────────────────┘   │ │  │ 🔍 System updated           │   │
│                                 │ │  │    Subject BL-4471          │   │
│  ┌─────────────────────────┐   │ │  │    1.5h ago     [Active]    │   │
│  │    ACTIVE ALERTS        │   │ │  │                             │   │
│  ├─────────────────────────┤   │ │  │ 🗄️ Agent Thompson archived  │   │
│  │ [CRITICAL]      20m ago │   │ │  │    Q4 2025 Reports          │   │
│  │ Unauthorized access     │   │ │  │    2h ago       [Archived]  │   │
│  │ attempt detected -      │   │ │  └─────────────────────────────┘   │
│  │ IP: 185.220.101.42      │   │ │                                     │
│  │                [Active] │   │ │  ┌─────────────────────────────┐   │
│  │                         │   │ │  │  SYSTEM CONSOLE      ● Live │   │
│  │ [WARNING]        1h ago │   │ │  ├─────────────────────────────┤   │
│  │ Encryption key expires  │   │ │  │ 14:23:45 [SYS] ARCHIVE-X   │   │
│  │ in 7 days - rotation    │   │ │  │ Intelligence Platform init  │   │
│  │ required                │   │ │  │                             │   │
│  │          [Acknowledged] │   │ │  │ 14:23:43 [AUTH] User auth  │   │
│  │                         │   │ │  │ verified - TS/SCI confirmed │   │
│  │ [CRITICAL]       2h ago │   │ │  │                             │   │
│  │ Watchlist subject       │   │ │  │ 14:23:40 [DB] Database     │   │
│  │ BL-4471 activity in     │   │ │  │ connection pool: 8/12      │   │
│  │ Zone 7                  │   │ │  │ connections active          │   │
│  │                [Active] │   │ │  │                             │   │
│  │                         │   │ │  │ 14:23:35 [SEC] Security    │   │
│  │ [INFO]           4h ago │   │ │  │ scan completed - No threats │   │
│  │ Scheduled maintenance   │   │ │  │                             │   │
│  │ window: 23:00-01:00 EST │   │ │  │ 14:23:30 [SYNC] Data sync  │   │
│  │          [Acknowledged] │   │ │  │ completed - 247 records     │   │
│  │                         │   │ │  │                             │   │
│  │ [WARNING]        6h ago │   │ │  │ [Auto-scrolling...]         │   │
│  │ Database replication    │   │ │  └─────────────────────────────┘   │
│  │ lag: 4.2 seconds        │   │ │                                     │
│  │            [Resolved]   │   │ │                                     │
│  └─────────────────────────┘   │ │                                     │
└─────────────────────────────────┘ └─────────────────────────────────────┘
```

---

## Color Coding Legend

### Status Indicators

**System Status:**
- ● Green = Operational
- ◐ Amber = Degraded  
- ○ Red = Critical

**Alert Levels:**
- 🔴 Red background tint = CRITICAL
- 🟠 Amber background tint = WARNING
- 🔵 Blue background tint = INFO

**Activity Status:**
- 🟢 Green badge = Approved/Success
- 🟡 Amber badge = Pending/Warning
- 🔵 Blue badge = Info/Active
- ⚪ Gray badge = Neutral/Logged

---

## Component Dimensions

### Dashboard Header
- Height: ~100px
- Padding: 24px 32px
- Layout: Flex space-between

### Metric Cards
- Min Width: 240px
- Height: Auto (~120px)
- Gap: 16px between cards
- Grid: 4 columns (responsive)

### Two-Column Grid
- Columns: 1fr 1fr (50/50 split)
- Gap: 24px
- Responsive: Stacks at 1200px

### System Status Panel
- Height: Auto (~300px)
- 4 system items
- Each item: 16px gap

### Alerts Panel
- Max Height: 400px
- Scrollable: Yes
- Shows: 5 most recent alerts

### Activity Panel
- Max Height: 400px
- Scrollable: Yes
- Shows: 5 most recent activities

### System Console
- Max Height: 300px
- Scrollable: Yes
- Shows: Last 15 log entries
- New entry: Every 6 seconds

---

## Interactive Elements

### Hover States

**Metric Cards:**
```
Normal:    Border: subtle, Y: 0
Hover:     Border: brighter, Y: -2px, Shadow: enhanced
```

**Alert Items:**
```
Normal:    X: 0, Background: subtle
Hover:     X: +4px, Background: brighter
```

**Activity Items:**
```
Normal:    Border: faint
Hover:     Border: visible, Background: enhanced
```

### Active Animations

**Status Indicator Pulse:**
```
Animation: pulse 2s infinite
0%, 100%:  opacity: 1
50%:       opacity: 0.7
```

**Console Auto-scroll:**
- Triggered: Every new log entry
- Behavior: Smooth scroll to bottom
- Speed: Instant (no animation)

---

## Responsive Breakpoints

### Desktop (1200px+)
```
Metrics Grid:    4 columns
Dashboard Grid:  2 columns (50/50)
Header:          Horizontal flex
```

### Tablet (768px - 1199px)
```
Metrics Grid:    2 columns
Dashboard Grid:  1 column (stacked)
Header:          Horizontal flex
```

### Mobile (< 768px)
```
Metrics Grid:    1 column
Dashboard Grid:  1 column (stacked)
Header:          Vertical flex
```

---

## Typography Hierarchy

```
Level 1: Dashboard Title        1.75em (28px) / Bold 600
Level 2: Section Titles         1.1em  (17.6px) / Semi-bold 600
Level 3: Metric Values          2em    (32px) / Bold 700
Level 4: Card Labels            0.85em (13.6px) / Medium 500
Level 5: Body Text              0.9em  (14.4px) / Regular 400
Level 6: Metadata/Timestamps    0.75em (12px) / Regular 400
```

---

## Spacing System

```
Component Margins:     24px
Card Padding:          20px
Item Padding:          16px
Small Padding:         12px
Tiny Padding:          8px
Gaps:                  12-24px
```

---

## Visual Hierarchy Flow

```
1. Dashboard Header (Eye entry point)
   └─> Title establishes context
   └─> Timestamp shows real-time nature

2. Metric Cards (Quick stats scan)
   └─> Large numbers grab attention
   └─> Color borders show status at glance
   └─> Icons provide visual anchors

3. Left Column (System health)
   └─> Status panel shows operational state
   └─> Alerts demand immediate attention
   └─> Red/Amber colors draw eye to issues

4. Right Column (Activity & logs)
   └─> Activity feed shows recent events
   └─> Console provides detail/context
   └─> Live indicator shows real-time updates
```

---

## Accessibility Features

✅ **Color Contrast:**
- All text meets WCAG AA standards
- Minimum 4.5:1 ratio for body text
- Minimum 3:1 ratio for large text

✅ **Status Communication:**
- Uses shapes + colors (not color alone)
- Icons supplement color coding
- Text labels for all statuses

✅ **Keyboard Navigation:**
- Logical tab order
- Focus visible on interactive elements

✅ **Screen Readers:**
- Semantic HTML structure
- Descriptive labels
- ARIA attributes (where needed)

---

## Data Update Frequencies

```
Dashboard Timestamp:   1 second
System Console:        6 seconds
Metric Values:         10 seconds (random)
Status Panels:         Static (until refresh)
Alerts:                Static (until refresh)
Activity Feed:         Static (until refresh)
```

**Note:** In production, these would be WebSocket/API driven with real data.

---

**Layout Version:** 1.0  
**Last Updated:** January 20, 2026  
**Optimized For:** 1920x1080 and 1440p displays
