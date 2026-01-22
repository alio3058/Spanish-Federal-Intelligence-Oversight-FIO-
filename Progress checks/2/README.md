# ARCHIVE-X - Federal Intelligence Dashboard
## Tab Navigation System v2.0.0

![Status](https://img.shields.io/badge/status-complete-brightgreen)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow)
![Framework](https://img.shields.io/badge/framework-vanilla-orange)

---

## 🎯 Project Overview

A fully functional federal intelligence dashboard with 8 distinct tab-based views, implementing a professional component-based architecture using vanilla JavaScript.

**Purpose:** Educational simulation of an internal government/intelligence platform interface.

---

## ✨ Features

### 8 Functional Tabs
- **Overview** - System dashboard with live logs
- **Documents** - Document database browser
- **Restricted** - High-security access area
- **Intelligence** - Intelligence reports feed
- **Logs** - System log archive viewer
- **Research** - Research papers archive
- **Archive** - Historical data storage
- **Watchlists** - Subject monitoring & leak events

### Professional UI/UX
- Federal/internal app aesthetic
- Dark theme with subtle blue accents
- Smooth CSS transitions
- Active tab highlighting
- Responsive design
- Classification badges
- Risk level indicators

### Clean Architecture
- Component-based system
- Single state manager
- Modular file structure
- Easy to extend
- Well-documented code

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required
- No npm install needed

### Running the Application

1. **Open in Browser:**
   ```
   Double-click index.html
   ```
   Or open with a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

2. **Wait for Loading Screen** (2 seconds)

3. **Start Navigating:**
   - Click any tab in the left sidebar
   - Explore different views
   - Try interactive features

---

## 📁 Project Structure

```
Spanish Project FBI/
├── index.html                          # Main HTML
├── style.css                           # All styles
├── script_v2.js                        # Mock data
│
├── js/
│   ├── navigation.js                   # State manager
│   └── components/
│       ├── BaseComponent.js            # Base class
│       ├── OverviewComponent.js        # Tab 1
│       ├── DocumentsComponent.js       # Tab 2
│       ├── RestrictedComponent.js      # Tab 3
│       ├── IntelligenceComponent.js    # Tab 4
│       ├── LogsComponent.js            # Tab 5
│       ├── ResearchComponent.js        # Tab 6
│       ├── ArchiveComponent.js         # Tab 7
│       └── WatchlistsComponent.js      # Tab 8
│
└── Documentation/
    ├── NAVIGATION_ARCHITECTURE.md      # Technical docs
    ├── TAB_NAVIGATION_GUIDE.md         # User guide
    ├── IMPLEMENTATION_SUMMARY.md       # Summary
    ├── VISUAL_ARCHITECTURE.md          # Diagrams
    └── README.md                        # This file
```

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [NAVIGATION_ARCHITECTURE.md](NAVIGATION_ARCHITECTURE.md) | Complete technical documentation |
| [TAB_NAVIGATION_GUIDE.md](TAB_NAVIGATION_GUIDE.md) | User guide and quick start |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | Implementation overview |
| [VISUAL_ARCHITECTURE.md](VISUAL_ARCHITECTURE.md) | Architecture diagrams |

---

## 🎨 Design System

### Color Palette
```css
--color-bg-primary: #0f1419        /* Main background */
--color-bg-secondary: #1a1f2e      /* Panel background */
--color-bg-tertiary: #252d3d       /* Card background */
--color-accent-blue: #4a90e2       /* Primary accent */
--color-success: #4a9d6f           /* Success states */
--color-warning: #d4945e           /* Warning states */
--color-danger: #c0544a            /* Danger states */
```

### Typography
- **Primary:** Inter (sans-serif)
- **Monospace:** IBM Plex Mono (technical content)

### Components
- Classification badges
- Status indicators
- Risk level badges
- Terminal viewers
- Grid layouts
- Card components

---

## 🔧 Technical Details

### Architecture
- **Pattern:** Component-based
- **Framework:** Vanilla JavaScript
- **State:** Single manager instance
- **Styling:** CSS with custom properties
- **Animation:** CSS transitions & keyframes

### Browser Support
- Chrome/Edge (Chromium) ✓
- Firefox ✓
- Safari ✓
- Opera ✓

**Requirements:** ES6+ support

### Performance
- Lazy component loading
- Event listener cleanup
- GPU-accelerated animations
- Optimized DOM queries

---

## 💡 Usage Examples

### Basic Navigation
```javascript
// Access navigation manager in console
navManager.getCurrentTab()  // Returns: "overview"

// Switch to a different tab
navManager.switchTab('documents')
```

### Component Lifecycle
```javascript
class MyComponent extends BaseComponent {
    constructor() {
        super('my-content-id');
    }
    
    render() {
        // Custom rendering logic
    }
    
    attachEventListeners() {
        // Bind events
    }
    
    removeEventListeners() {
        // Cleanup
    }
}
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] All 8 tabs switch correctly
- [ ] Active indicator appears
- [ ] Breadcrumb updates
- [ ] No console errors
- [ ] Smooth animations
- [ ] Access denied modal works
- [ ] Watchlist profile panel opens
- [ ] Log simulation runs on Overview

### Interactive Features
1. **Restricted Tab:** Click "Request Access" → Modal appears
2. **Watchlists Tab:** Click table row → Profile panel opens
3. **Overview Tab:** Logs auto-update every 5 seconds

---

## 🎓 Key Learnings

This project demonstrates:
- Component-based architecture without frameworks
- State management patterns
- Event-driven programming
- Professional UI/UX design
- Federal/government interface design
- Clean code organization
- Comprehensive documentation

---

## 🚀 Future Enhancements

### Potential Features
- URL routing (hash-based navigation)
- Global search functionality
- Data persistence (localStorage)
- Real-time updates (WebSocket)
- Export functionality (PDF, CSV)
- User preferences system
- Role-based access control
- Keyboard shortcuts

---

## 🤝 Contributing

This is an educational project. Feel free to:
- Fork and experiment
- Add new tabs
- Improve styling
- Enhance components
- Add features

---

## 📝 License

Educational/Demonstration Project - Free to use and modify.

---

## 🙏 Credits

**Design Philosophy:** Inspired by federal/intelligence agency interfaces  
**Aesthetic:** Professional, minimal, serious  
**Implementation:** Vanilla JavaScript component system  

---

## 📞 Support

For questions or issues:
- Read the documentation files
- Check browser console for errors
- Review component code comments
- Test in different browsers

---

## 🎯 Project Goals Achieved

✅ **8 functional tabs** with distinct views  
✅ **Active tab highlighting** with visual indicator  
✅ **Consistent layout** across all views  
✅ **Federal app styling** - professional and serious  
✅ **Component structure** - modular and maintainable  
✅ **Clean folder structure** - organized and logical  
✅ **State management** - single source of truth  
✅ **Comprehensive documentation** - detailed and helpful  

---

**Version:** 2.0.0  
**Last Updated:** January 20, 2026  
**Status:** ✅ Complete and Production-Ready
