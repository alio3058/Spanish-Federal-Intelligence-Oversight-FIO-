# Quick Start Guide - Tab Navigation System

## What Was Implemented

✅ **8 Functional Tabs:**
1. **Overview** - Dashboard with system status, activity, quick access, live logs
2. **Documents** - Document database with classification badges
3. **Restricted** - High-security access area with authorization checks
4. **Intelligence** - Intelligence reports and signal intercepts
5. **Logs** - System logs archive with terminal viewer
6. **Research** - Research papers and analytical documents
7. **Archive** - Historical data archives and file bundles
8. **Watchlists** - Subject monitoring and leak events

---

## How to Use

### Opening the Application
1. Open `index.html` in a modern web browser
2. Wait for the loading screen (2 seconds)
3. Default view: **Overview** tab

### Navigating Tabs
1. Click any navigation item in the left sidebar
2. Tab content will fade in smoothly
3. Active tab highlighted with blue left border
4. Breadcrumb updates automatically

### Tab-Specific Features

**Overview Tab:**
- Live system logs update every 5 seconds
- View system status cards
- Quick access to pinned files

**Documents Tab:**
- Browse all documents and archives
- View classification levels
- See file statuses

**Restricted Tab:**
- Click "Request Temporary Access" 
- Triggers access denied modal
- Demonstrates security clearance system

**Intelligence Tab:**
- View intelligence reports
- See threat assessments
- Browse signal intercepts

**Logs Tab:**
- View system log archive
- Color-coded log levels (INFO/WARN/ERROR)
- Export and filter controls

**Research Tab:**
- Browse research papers
- Grid card layout
- Publication status indicators

**Archive Tab:**
- View historical archives
- File size information
- Download and view index actions

**Watchlists Tab:**
- View internal watchlist table
- **Click any row** to view subject profile
- View leak events timeline
- Risk level indicators

---

## Architecture Highlights

### Component-Based System
- Each tab is a separate JavaScript component
- Clean separation of concerns
- Easy to extend and maintain

### State Management
- Single `NavigationManager` instance
- Predictable state transitions
- No conflicting updates

### Styling
- Federal/internal app aesthetic
- Dark theme with subtle accents
- Professional typography
- Smooth CSS transitions

---

## File Structure

```
js/
├── navigation.js                    # State manager
└── components/
    ├── BaseComponent.js             # Base class
    ├── OverviewComponent.js         # Tab 1
    ├── DocumentsComponent.js        # Tab 2
    ├── RestrictedComponent.js       # Tab 3
    ├── IntelligenceComponent.js     # Tab 4
    ├── LogsComponent.js             # Tab 5
    ├── ResearchComponent.js         # Tab 6
    ├── ArchiveComponent.js          # Tab 7
    └── WatchlistsComponent.js       # Tab 8
```

---

## Testing

### Verify All Tabs Work:
1. ✓ Click **Overview** - See dashboard
2. ✓ Click **Documents** - See document list
3. ✓ Click **Restricted** - See access notice
4. ✓ Click **Intelligence** - See reports
5. ✓ Click **Logs** - See log viewer
6. ✓ Click **Research** - See research grid
7. ✓ Click **Archive** - See archive list
8. ✓ Click **Watchlists** - See watchlist table

### Check Active States:
- Blue left border on active tab
- Breadcrumb shows current tab name
- Only one tab visible at a time
- Smooth fade transitions

### Interactive Features:
- **Restricted tab:** Click "Request Access" → Modal appears
- **Watchlists tab:** Click table row → Profile panel opens
- **Overview tab:** Logs update every 5 seconds

---

## Common Issues & Solutions

### Tabs Not Switching
**Symptom:** Clicking nav item does nothing  
**Solution:** Check browser console for errors, verify all JS files loaded

### No Content Visible
**Symptom:** Tab area is blank  
**Solution:** Check that component `render()` method is working

### Styles Not Applied
**Symptom:** Layout looks broken  
**Solution:** Verify `style.css` is loaded, clear browser cache

### Active State Not Showing
**Symptom:** No blue indicator on active tab  
**Solution:** Check `.active` class is being added to nav item

---

## Browser Developer Tools

### Check Navigation State:
```javascript
// In browser console:
navManager.getCurrentTab()  // See current tab
navManager.tabs             // See all available tabs
```

### Debug Component:
```javascript
// Check if component is mounted:
navManager.components.overview.mounted  // true/false
```

---

## Next Steps

### Recommended Enhancements:
1. Add URL routing (e.g., `#/documents`)
2. Implement search across all tabs
3. Add data export functionality
4. Create user preferences panel
5. Add keyboard shortcuts (Tab, Arrow keys)
6. Implement drag-and-drop for files

### Customization:
- Edit component `render()` methods for different layouts
- Modify `mockFiles` data in `script_v2.js`
- Adjust colors in `:root` CSS variables
- Change transition speeds in CSS

---

## Performance Notes

- Components only render when active (lazy loading)
- Intervals cleaned up when switching tabs
- CSS animations GPU-accelerated
- No memory leaks from event listeners

---

## Support

For detailed architecture documentation, see:
- `NAVIGATION_ARCHITECTURE.md` - Complete system documentation
- Component files - Inline code comments
- CSS file - Organized by section

---

**Status:** ✅ Fully Functional  
**Version:** 2.0.0  
**Last Updated:** January 20, 2026
