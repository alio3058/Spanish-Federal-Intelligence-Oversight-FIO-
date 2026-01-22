# Visual Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                              │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    Top Command Bar                            │  │
│  │  ARCHIVE-X │ Search │ Analyst Profile                        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────┬──────────────────────────────────────────────┐  │
│  │   SIDEBAR    │           MAIN WORKSPACE                     │  │
│  │              │                                              │  │
│  │ [MAIN]       │  ┌────────────────────────────────────────┐ │  │
│  │ ► Overview   │  │   Breadcrumb: Home / Overview          │ │  │
│  │   Documents  │  └────────────────────────────────────────┘ │  │
│  │   Intell...  │                                              │  │
│  │   Watchlists │  ┌────────────────────────────────────────┐ │  │
│  │              │  │                                        │ │  │
│  │ [DATA]       │  │      TAB CONTENT AREA                  │ │  │
│  │   Research   │  │      (Component Renders Here)          │ │  │
│  │   Archive    │  │                                        │ │  │
│  │              │  │   - Overview Dashboard                 │ │  │
│  │ [SYSTEMS]    │  │   - Document List                      │ │  │
│  │   Logs       │  │   - Intelligence Reports               │ │  │
│  │   Restricted │  │   - etc...                             │ │  │
│  │              │  │                                        │ │  │
│  └──────────────┘  └────────────────────────────────────────┘ │  │
└─────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                   COMPONENT ARCHITECTURE                            │
└─────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────┐
                    │  NavigationManager      │
                    │  (State Controller)     │
                    │                         │
                    │  - currentTab           │
                    │  - tabs[]               │
                    │  - components{}         │
                    │  - switchTab()          │
                    │  - updateNavigation()   │
                    └───────────┬─────────────┘
                                │
                                │ manages
                                │
        ┌───────────────────────┴───────────────────────┐
        │                                               │
        ▼                                               ▼
┌───────────────┐                               ┌───────────────┐
│ BaseComponent │◄──────────────────────────────┤  8 Tab        │
│               │      extends                  │  Components   │
│ - mount()     │                               │               │
│ - unmount()   │                               │ - Overview    │
│ - render()    │                               │ - Documents   │
│ - attach...() │                               │ - Restricted  │
└───────────────┘                               │ - Intell...   │
                                                │ - Logs        │
                                                │ - Research    │
                                                │ - Archive     │
                                                │ - Watchlists  │
                                                └───────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                      DATA FLOW DIAGRAM                              │
└─────────────────────────────────────────────────────────────────────┘

    User Action                State Manager              Component
        │                            │                         │
        │  Click Nav Item           │                         │
        ├──────────────────────────►│                         │
        │                            │                         │
        │                            │  Unmount Previous      │
        │                            ├────────────────────────►│
        │                            │                         │
        │                            │  Update Active State   │
        │                            │  (CSS classes)          │
        │                            │                         │
        │                            │  Mount New Component   │
        │                            ├────────────────────────►│
        │                            │                         │
        │                            │                         │  render()
        │                            │                         ├───────┐
        │                            │                         │       │
        │                            │                         │◄──────┘
        │                            │                         │
        │  Visual Update            │                         │
        │◄──────────────────────────┴─────────────────────────┤
        │                                                      │


┌─────────────────────────────────────────────────────────────────────┐
│                    FILE STRUCTURE TREE                              │
└─────────────────────────────────────────────────────────────────────┘

Spanish Project FBI/
│
├── index.html                          # Main HTML structure
├── style.css                           # Styles + tab transitions
├── script_v2.js                        # Mock data & legacy code
│
├── js/
│   ├── navigation.js                   # NavigationManager class
│   │
│   └── components/
│       ├── BaseComponent.js            # Abstract base class
│       ├── OverviewComponent.js        # Tab 1: Dashboard
│       ├── DocumentsComponent.js       # Tab 2: Documents
│       ├── RestrictedComponent.js      # Tab 3: Access Control
│       ├── IntelligenceComponent.js    # Tab 4: Intel Reports
│       ├── LogsComponent.js            # Tab 5: System Logs
│       ├── ResearchComponent.js        # Tab 6: Research Papers
│       ├── ArchiveComponent.js         # Tab 7: Archives
│       └── WatchlistsComponent.js      # Tab 8: Watchlists
│
└── Documentation/
    ├── NAVIGATION_ARCHITECTURE.md      # Technical docs
    ├── TAB_NAVIGATION_GUIDE.md         # User guide
    ├── IMPLEMENTATION_SUMMARY.md       # Summary
    └── VISUAL_ARCHITECTURE.md          # This file


┌─────────────────────────────────────────────────────────────────────┐
│                   COMPONENT LIFECYCLE                               │
└─────────────────────────────────────────────────────────────────────┘

    Constructor                mount()              unmount()
        │                         │                      │
        │                         │                      │
        ▼                         ▼                      ▼
    ┌─────────┐            ┌──────────┐          ┌──────────┐
    │ Create  │            │ Get DOM  │          │ Remove   │
    │ Instance│───────────►│ Element  │          │ Listeners│
    └─────────┘            └────┬─────┘          └────┬─────┘
                                │                      │
                                ▼                      ▼
                         ┌──────────┐          ┌──────────┐
                         │  Add     │          │ Clear    │
                         │ .active  │          │ Intervals│
                         └────┬─────┘          └────┬─────┘
                              │                      │
                              ▼                      ▼
                         ┌──────────┐          ┌──────────┐
                         │ render() │          │ Remove   │
                         │          │          │ .active  │
                         └────┬─────┘          └──────────┘
                              │
                              ▼
                         ┌──────────┐
                         │ attach   │
                         │ Events   │
                         └──────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                    TAB SWITCHING SEQUENCE                           │
└─────────────────────────────────────────────────────────────────────┘

Step 1: User clicks "Documents" nav item
    │
    ▼
Step 2: NavigationManager.switchTab('documents') called
    │
    ▼
Step 3: Unmount current component (e.g., OverviewComponent)
    │   └─ Remove event listeners
    │   └─ Clear intervals
    │   └─ Remove .active class
    │
    ▼
Step 4: Update navigation UI
    │   └─ Remove .active from all nav items
    │   └─ Add .active to "Documents" nav item
    │
    ▼
Step 5: Update breadcrumb
    │   └─ Change text to "Home / Documents"
    │
    ▼
Step 6: Hide all tab content containers
    │   └─ Remove .active from all .tab-content
    │
    ▼
Step 7: Mount new component (DocumentsComponent)
    │   └─ Get container element
    │   └─ Add .active class (triggers CSS animation)
    │   └─ Call render()
    │   └─ Attach event listeners
    │
    ▼
Step 8: User sees Documents tab with smooth fade-in animation


┌─────────────────────────────────────────────────────────────────────┐
│                      CSS ANIMATION FLOW                             │
└─────────────────────────────────────────────────────────────────────┘

    Initial State              Transition           Final State
    (display: none)                                (display: block)
         │                                              │
         │  .active class added                         │
         ├────────────────────────────►                 │
         │                                              │
         │  CSS Animation triggers:                     │
         │  - fadeIn 300ms                              │
         │  - opacity: 0 → 1                            │
         │  - translateY(10px) → 0                      │
         │                                              │
         └──────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                   NAVIGATION ACTIVE INDICATOR                       │
└─────────────────────────────────────────────────────────────────────┘

    Inactive Nav Item              Active Nav Item
    
    ┌──────────────┐              ┌──────────────┐
    │              │              │█             │ ◄── Blue left border
    │  Overview    │              │█  Overview   │     (3px × 70% height)
    │              │              │█             │
    └──────────────┘              └──────────────┘
    
    CSS:                          CSS:
    .nav-item {                   .nav-item.active {
      ...                           background: rgba(...);
    }                             }
                                  
    .nav-item::before {           .nav-item.active::before {
      height: 0;                    height: 70%;
    }                             }


┌─────────────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT MODEL                           │
└─────────────────────────────────────────────────────────────────────┘

                   ┌───────────────────────┐
                   │  NavigationManager    │
                   │  ─────────────────    │
                   │  currentTab: string   │
                   │  tabs: string[]       │
                   │  components: Object   │
                   └───────────┬───────────┘
                               │
                               │ Single Source of Truth
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
    ┌────────┐           ┌────────┐           ┌────────┐
    │  DOM   │           │  URL   │           │ Local  │
    │  State │           │ (future)│           │Storage │
    │        │           │        │           │(future)│
    └────────┘           └────────┘           └────────┘
    
    - Active classes      - Hash routing      - Preferences
    - Visibility          - Deep linking      - Last viewed
    - Event listeners     - History API       - User settings


┌─────────────────────────────────────────────────────────────────────┐
│                    COMPONENT RELATIONSHIPS                          │
└─────────────────────────────────────────────────────────────────────┘

                    NavigationManager
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    BaseComponent      BaseComponent      BaseComponent
        │                  │                  │
        ▼                  ▼                  ▼
    Overview          Documents          Restricted
    Component         Component          Component
        │                  │                  │
        ├─ render()       ├─ render()       ├─ render()
        ├─ mount()        ├─ mount()        ├─ mount()
        └─ unmount()      └─ unmount()      └─ unmount()

    (Same pattern for remaining 5 components)


┌─────────────────────────────────────────────────────────────────────┐
│                         SUMMARY                                     │
└─────────────────────────────────────────────────────────────────────┘

Architecture Type:    Component-Based (Vanilla JS)
State Management:     Single Manager Instance
UI Framework:         None (Pure JavaScript)
Styling Approach:     CSS with Custom Properties
Animation:            CSS Transitions & Keyframes
Data Source:          Mock Data (mockFiles, mockWatchlist)
Browser Target:       Modern Browsers (ES6+)

Key Principles:
✓ Separation of Concerns
✓ Single Responsibility
✓ Component Lifecycle
✓ State Centralization
✓ Progressive Enhancement
✓ Performance Optimization
```
