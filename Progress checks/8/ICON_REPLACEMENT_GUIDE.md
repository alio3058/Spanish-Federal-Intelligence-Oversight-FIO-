# Icon System - SVG Icon Replacement Guide

## 🎯 Replace Emoji Icons with Professional SVG Icons

### Current Issues
- Emoji icons (📊, 📂, 🔍, etc.) appear inconsistent across platforms
- Not scalable or customizable
- Unprofessional appearance

---

## 🔄 Icon Replacement Map

### Navigation Icons

| Current Emoji | Replacement | SVG Icon Name (Lucide) |
|--------------|-------------|------------------------|
| 📊 | Overview | `BarChart3` or `LayoutDashboard` |
| 📂 | Documents | `FolderOpen` or `Files` |
| 📄 | Document Item | `File` or `FileText` |
| 🔍 | Intelligence | `Search` or `Eye` |
| 👁️ | Watchlist | `Eye` or `Shield` |
| 🔬 | Research | `Microscope` or `FlaskConical` |
| 🗄️ | Archive | `Archive` or `Database` |
| 🚫 | Restricted | `ShieldX` or `Lock` |
| 📋 | Logs | `FileText` or `ScrollText` |

### Action Icons

| Current Emoji | Replacement | SVG Icon Name (Lucide) |
|--------------|-------------|------------------------|
| ✅ | Success/Complete | `CheckCircle` or `Check` |
| ⚠️ | Warning | `AlertTriangle` |
| ❌ | Error/Danger | `XCircle` or `AlertCircle` |
| 🔒 | Locked | `Lock` |
| 🔓 | Unlocked | `Unlock` |
| ⏱️ | Time/Date | `Clock` or `Calendar` |
| 📥 | Download | `Download` |
| 📤 | Upload | `Upload` |
| 🔄 | Refresh | `RefreshCw` |
| ➕ | Add | `Plus` or `PlusCircle` |
| ✏️ | Edit | `Edit` or `Pencil` |
| 🗑️ | Delete | `Trash2` |

### Status Icons

| Current Emoji | Replacement | SVG Icon Name (Lucide) |
|--------------|-------------|------------------------|
| 🟢 | Status Green | `Circle` with green fill |
| 🟡 | Status Yellow | `Circle` with yellow fill |
| 🔴 | Status Red | `Circle` with red fill |
| 📌 | Pinned | `Pin` |
| ⭐ | Starred | `Star` |
| 🏷️ | Tag | `Tag` |

---

## 📦 Implementation - Lucide Icons (Recommended)

### Step 1: Add Lucide CDN

```html
<!-- Add to index.html <head> -->
<script src="https://unpkg.com/lucide@latest"></script>
```

### Step 2: Create Icon Component Helper

```javascript
// Add to navigation.js or create icons.js

const Icons = {
    create(name, size = 20, className = '') {
        const iconElement = document.createElement('i');
        iconElement.setAttribute('data-lucide', name);
        iconElement.className = `icon ${className}`;
        if (size) {
            iconElement.style.width = `${size}px`;
            iconElement.style.height = `${size}px`;
        }
        return iconElement;
    },
    
    init() {
        // Initialize all Lucide icons on the page
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
};

// Call after DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    Icons.init();
});
```

### Step 3: Replace in HTML

**Old:**
```html
<button class="header-nav-btn active" data-tab="overview">
    <span class="nav-icon">📊</span>
    <span>Overview</span>
</button>
```

**New:**
```html
<button class="header-nav-btn active" data-tab="overview">
    <i data-lucide="layout-dashboard" class="nav-icon"></i>
    <span>Overview</span>
</button>
```

### Step 4: Add Icon Styles

```css
/* Icon Styling */
.icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    stroke-width: 2;
    transition: all var(--transition-fast);
}

.nav-icon {
    width: 20px;
    height: 20px;
}

.icon-sm {
    width: 16px;
    height: 16px;
}

.icon-lg {
    width: 24px;
    height: 24px;
}

/* Icon Colors */
.icon-primary { stroke: var(--color-accent-blue); }
.icon-success { stroke: var(--color-success); }
.icon-warning { stroke: var(--color-warning); }
.icon-danger { stroke: var(--color-danger); }
.icon-muted { stroke: var(--color-text-tertiary); }
```

---

## 🎨 Alternative: Heroicons (Outline Style)

### CDN Include
```html
<!-- Using Heroicons via CDN -->
<script src="https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/index.js"></script>
```

### Usage Example
```html
<svg class="icon">
  <use href="#heroicons-outline-document-text"></use>
</svg>
```

---

## 🔧 Specific Replacements for Key Components

### Header Navigation
```html
<!-- Overview -->
<i data-lucide="layout-dashboard"></i>

<!-- Documents -->
<i data-lucide="folder-open"></i>

<!-- Intelligence -->
<i data-lucide="search"></i>

<!-- Watchlist -->
<i data-lucide="eye"></i>

<!-- Research -->
<i data-lucide="flask-conical"></i>

<!-- Archive -->
<i data-lucide="archive"></i>

<!-- Restricted -->
<i data-lucide="shield-x"></i>

<!-- Logs -->
<i data-lucide="scroll-text"></i>
```

### Status Indicators
```html
<!-- Active/Success -->
<i data-lucide="check-circle" class="icon-success"></i>

<!-- Warning -->
<i data-lucide="alert-triangle" class="icon-warning"></i>

<!-- Error -->
<i data-lucide="x-circle" class="icon-danger"></i>
```

### Action Buttons
```html
<!-- View/Open -->
<i data-lucide="external-link"></i>

<!-- Edit -->
<i data-lucide="edit-2"></i>

<!-- Delete -->
<i data-lucide="trash-2"></i>

<!-- Download -->
<i data-lucide="download"></i>

<!-- Refresh -->
<i data-lucide="refresh-cw"></i>
```

---

## 📝 Icon Initialization Script

Add this to your main JavaScript file:

```javascript
// icons.js or add to navigation.js

class IconManager {
    constructor() {
        this.initialized = false;
    }
    
    init() {
        if (typeof lucide !== 'undefined' && !this.initialized) {
            lucide.createIcons({
                attrs: {
                    'stroke-width': 2,
                    'width': '20',
                    'height': '20'
                }
            });
            this.initialized = true;
            console.log('✓ Icons initialized');
        }
    }
    
    refresh() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Create icon programmatically
    create(iconName, options = {}) {
        const {
            size = 20,
            className = '',
            strokeWidth = 2,
            color = 'currentColor'
        } = options;
        
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', iconName);
        icon.className = `icon ${className}`;
        icon.style.width = `${size}px`;
        icon.style.height = `${size}px`;
        icon.style.strokeWidth = strokeWidth;
        icon.style.color = color;
        
        return icon;
    }
}

const iconManager = new IconManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    iconManager.init();
});

// Refresh after dynamic content loads
const refreshIcons = () => iconManager.refresh();

export { iconManager, refreshIcons };
```

---

## ✅ Benefits of SVG Icons

1. **Scalable** - Perfect at any size
2. **Customizable** - Full control over color, size, stroke
3. **Performance** - Lightweight and cached
4. **Accessibility** - Can add aria-labels
5. **Consistency** - Same appearance across all platforms
6. **Professional** - Modern, clean aesthetic

---

## 🎯 Priority Replacement Order

1. **Phase 1**: Header navigation icons
2. **Phase 2**: Action buttons (view, edit, delete)
3. **Phase 3**: Status indicators
4. **Phase 4**: Card/component icons
5. **Phase 5**: Inline icons and decorative elements

---

**Last Updated**: January 2026  
**Recommended Library**: Lucide Icons v0.303.0
