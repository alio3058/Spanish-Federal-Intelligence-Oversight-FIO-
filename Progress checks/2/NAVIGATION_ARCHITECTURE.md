# Navigation System Architecture

## Overview
This document describes the redesigned tab navigation system for the ARCHIVE-X Federal Intelligence Dashboard. The system uses a component-based architecture with vanilla JavaScript for clean, maintainable code.

---

## Component Structure

### 1. **NavigationManager** (`js/navigation.js`)
**Purpose:** Central state management for tab navigation

**Responsibilities:**
- Manage current active tab state
- Handle tab switching logic
- Update UI (navigation highlight, breadcrumbs)
- Mount/unmount components
- Initialize event listeners

**Key Methods:**
- `init()` - Initialize the navigation system
- `switchTab(tabName)` - Switch to a different tab
- `updateNavigation(activeTab)` - Update nav item active states
- `updateBreadcrumb(tabName)` - Update breadcrumb display
- `hideAllViews()` - Hide all tab content containers

**Usage:**
```javascript
const navManager = new NavigationManager();
navManager.init(); // Initialize on page load
```

---

### 2. **BaseComponent** (`js/components/BaseComponent.js`)
**Purpose:** Abstract base class for all tab components

**Lifecycle Methods:**
- `mount()` - Called when tab becomes active
- `unmount()` - Called when tab becomes inactive
- `render()` - Update component display
- `attachEventListeners()` - Bind event handlers
- `removeEventListeners()` - Cleanup event handlers

**Pattern:**
```javascript
class MyComponent extends BaseComponent {
    constructor() {
        super('my-content-id');
    }
    
    render() {
        // Custom rendering logic
    }
}
```

---

## Tab Components

### 3. **OverviewComponent** (`js/components/OverviewComponent.js`)
- **Container:** `#overview-content`
- **Features:**
  - System status cards
  - Recent activity feed
  - Quick access files
  - Live system logs with auto-updating terminal
- **Special:** Manages interval for log simulation

### 4. **DocumentsComponent** (`js/components/DocumentsComponent.js`)
- **Container:** `#documents-content`
- **Features:**
  - Document database listing
  - Classification badges
  - File metadata display
- **Data Source:** Filters `mockFiles` for documents/archives

### 5. **RestrictedComponent** (`js/components/RestrictedComponent.js`)
- **Container:** `#restricted-content`
- **Features:**
  - Access control notice
  - Request access functionality
  - Triggers access denied modal
- **Security:** Demonstrates clearance-based access control

### 6. **IntelligenceComponent** (`js/components/IntelligenceComponent.js`)
- **Container:** `#intelligence-content`
- **Features:**
  - Intelligence reports listing
  - Signal intercept analysis
  - Threat assessments
- **Data Source:** Filters `mockFiles` for intelligence category

### 7. **LogsComponent** (`js/components/LogsComponent.js`)
- **Container:** `#logs-content`
- **Features:**
  - System logs archive viewer
  - Log entry filtering by level (INFO/WARN/ERROR)
  - Export/refresh controls
- **Display:** Terminal-style log viewer with color coding

### 8. **ResearchComponent** (`js/components/ResearchComponent.js`)
- **Container:** `#research-content`
- **Features:**
  - Research papers archive
  - Academic/analytical documents
  - Grid-based card layout
- **Dynamic:** Creates panel structure if not present

### 9. **ArchiveComponent** (`js/components/ArchiveComponent.js`)
- **Container:** `#archive-content`
- **Features:**
  - Historical data archives
  - Large file bundles (.zip)
  - Download and view index actions
- **Display:** List view with file size indicators

### 10. **WatchlistsComponent** (`js/components/WatchlistsComponent.js`)
- **Container:** `#watchlists-content`
- **Features:**
  - Internal watchlist subjects table
  - Subject profile panel (click to view)
  - Leak events timeline
  - Risk level indicators
- **Interactive:** Click watchlist rows to view detailed profiles

---

## Folder Structure

```
Spanish Project FBI/
├── index.html              # Main HTML structure
├── style.css               # Styles + tab transition CSS
├── script_v2.js            # Legacy script with mock data
├── js/
│   ├── navigation.js       # Navigation state manager
│   └── components/
│       ├── BaseComponent.js
│       ├── OverviewComponent.js
│       ├── DocumentsComponent.js
│       ├── RestrictedComponent.js
│       ├── IntelligenceComponent.js
│       ├── LogsComponent.js
│       ├── ResearchComponent.js
│       ├── ArchiveComponent.js
│       └── WatchlistsComponent.js
```

---

## State Management

### Approach: **Single NavigationManager Instance**

The navigation state is managed by a single `NavigationManager` instance:

```javascript
class NavigationManager {
    currentTab: string          // Active tab name
    tabs: string[]              // Available tab names
    components: Object          // Component instances
    initialized: boolean        // Init state
}
```

**State Flow:**
1. User clicks navigation item
2. `NavigationManager.switchTab()` called
3. Previous component unmounted
4. Navigation UI updated
5. New component mounted and rendered

**Benefits:**
- Single source of truth
- Predictable state transitions
- Easy to debug
- No conflicting state updates

---

## Navigation Event Handling

### HTML Structure:
```html
<li data-tab="overview" class="nav-item active">Overview</li>
<li data-tab="documents" class="nav-item">Documents</li>
```

### Event Binding:
```javascript
setupEventListeners() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            this.switchTab(tab);
        });
    });
}
```

### Active State Styling:
- `.nav-item.active` - Blue left border indicator
- Smooth transitions via CSS animations
- Hover states for non-active items

---

## CSS Tab Transitions

### Animation System:
```css
.tab-content {
    display: none;
    opacity: 0;
}

.tab-content.active {
    display: block;
    opacity: 1;
    animation: fadeIn 300ms ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Navigation Indicator:
```css
.nav-item::before {
    content: '';
    position: absolute;
    left: 0;
    width: 3px;
    height: 0;
    background: var(--color-accent-blue);
    transition: height 150ms;
}

.nav-item.active::before {
    height: 70%;
}
```

---

## Design Philosophy

### Federal/Internal App Aesthetic:
- **Minimal animations** - Fast, functional transitions
- **Muted color palette** - Dark backgrounds, subtle accents
- **Monospace fonts** - IBM Plex Mono for technical content
- **Classification badges** - Clear security indicators
- **Structured layouts** - Grid-based, consistent spacing
- **Professional typography** - Inter font family

### Key Visual Elements:
- Classification tier badges (TOP SECRET, CONFIDENTIAL, RESTRICTED)
- Status indicators (green/yellow/red dots)
- Breadcrumb navigation
- Risk level badges (SEVERE, HIGH, MEDIUM)
- Terminal-style log viewers

---

## Extending the System

### Adding a New Tab:

1. **Create Component:**
```javascript
// js/components/NewTabComponent.js
class NewTabComponent extends BaseComponent {
    constructor() {
        super('newtab-content');
    }
    
    render() {
        // Your rendering logic
    }
}
```

2. **Add HTML Container:**
```html
<div id="newtab-content" class="tab-content">
    <!-- Content here -->
</div>
```

3. **Register in NavigationManager:**
```javascript
registerComponents() {
    this.components.newtab = new NewTabComponent();
}
```

4. **Add Navigation Item:**
```html
<li data-tab="newtab" class="nav-item">New Tab</li>
```

5. **Update tabs array:**
```javascript
this.tabs = ['overview', 'documents', ..., 'newtab'];
```

---

## Best Practices

1. **Component Cleanup:** Always cleanup in `unmount()` (intervals, listeners)
2. **Null Checks:** Verify DOM elements exist before manipulation
3. **Data Filtering:** Use `mockFiles.filter()` for category-specific data
4. **Consistent Styling:** Use existing CSS classes for uniformity
5. **Progressive Enhancement:** Graceful degradation if elements missing

---

## Performance Considerations

- **Lazy Rendering:** Components only render when mounted
- **Event Delegation:** Single listener per navigation section
- **DOM Caching:** Components cache container references
- **Interval Cleanup:** Timers cleared on unmount
- **CSS Transitions:** GPU-accelerated transforms

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features (classes, arrow functions, template literals)
- CSS Grid and Flexbox
- CSS Custom Properties (CSS Variables)

---

## Testing Checklist

- [ ] All 8 tabs switch correctly
- [ ] Active tab indicator appears
- [ ] Breadcrumb updates on tab change
- [ ] No console errors
- [ ] Components unmount properly (no memory leaks)
- [ ] Animations smooth and consistent
- [ ] Navigation responsive on mobile
- [ ] Access denied modal works from Restricted tab
- [ ] Watchlist profile panel opens on row click
- [ ] Log simulation runs only on Overview tab

---

## Troubleshooting

**Issue:** Tab doesn't switch
- Check `data-tab` attribute matches tab name
- Verify component registered in `NavigationManager`
- Check container ID exists in HTML

**Issue:** Component not rendering
- Check container element exists
- Verify `render()` method implemented
- Check for JavaScript errors in console

**Issue:** Animations not working
- Verify `.active` class added to container
- Check CSS file loaded properly
- Ensure transitions defined in CSS

---

## Future Enhancements

- Add routing support (URL-based navigation)
- Implement search/filter across all tabs
- Add data persistence (localStorage)
- Create admin configuration panel
- Add user preferences system
- Implement real-time data updates via WebSocket
- Add export functionality for all data views

---

**Last Updated:** January 20, 2026  
**Version:** 2.0.0  
**Architecture:** Vanilla JS Component-Based System
