/**
 * Navigation State Manager
 * Handles tab switching and maintains application state
 */

class NavigationManager {
    constructor() {
        this.currentTab = 'overview';
        this.tabs = ['overview', 'documents', 'restricted', 'intelligence', 'logs', 'research', 'archive', 'watchlists', 'leaked-files'];
        this.components = {};
        this.initialized = false;
    }

    /**
     * Initialize navigation system
     */
    init() {
        if (this.initialized) return;
        
        this.setupEventListeners();
        this.registerComponents();
        this.initialized = true;
        
        // Load initial tab
        this.switchTab('overview');
    }

    /**
     * Register all tab components
     */
    registerComponents() {
        // Import and register each component
        this.components.overview = new OverviewComponent();
        this.components.documents = new DocumentsComponent();
        this.components.restricted = new RestrictedComponent();
        this.components.intelligence = new IntelligenceComponent();
        this.components.logs = new LogsComponent();
        this.components.research = new ResearchComponent();
        this.components.archive = new ArchiveComponent();
        this.components.watchlists = new WatchlistsComponent();
        // Componente de archivos filtrados - Investigación Girasol Rojo
        this.components['leaked-files'] = new LeakedFilesComponent();
    }

    /**
     * Setup navigation event listeners
     */
    setupEventListeners() {
        // Header navigation buttons (standalone) - Support both old and new class names
        const headerNavBtns = document.querySelectorAll('.header-nav-btn:not(.dropdown-trigger), .enhanced-header__nav-btn:not(.dropdown-trigger)');
        
        headerNavBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                if (tab) {
                    this.switchTab(tab);
                    this.closeAllDropdowns();
                }
            });
        });

        // Dropdown items - Support both old and new class names
        const dropdownItems = document.querySelectorAll('.dropdown-item, .enhanced-header__dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                if (tab) {
                    this.switchTab(tab);
                    this.closeAllDropdowns();
                }
            });
        });

        // Dropdown triggers - Support both old and new class names
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = trigger.closest('.header-dropdown, .enhanced-header__dropdown');
                const isActive = dropdown.classList.contains('active');
                
                this.closeAllDropdowns();
                
                if (!isActive) {
                    dropdown.classList.add('active');
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header-dropdown') && !e.target.closest('.enhanced-header__dropdown')) {
                this.closeAllDropdowns();
            }
        });

        // Sidebar navigation items (legacy support)
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                if (tab) {
                    this.switchTab(tab);
                }
            });
        });
    }

    /**
     * Close all dropdown menus
     */
    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.header-dropdown, .enhanced-header__dropdown');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }

    /**
     * Switch to a different tab
     * @param {string} tabName - Name of the tab to switch to
     */
    switchTab(tabName) {
        if (!this.tabs.includes(tabName)) {
            console.error(`Tab "${tabName}" does not exist`);
            return;
        }

        console.log(`Switching to tab: ${tabName}`);

        // Update current tab
        const previousTab = this.currentTab;
        this.currentTab = tabName;

        // Unmount previous component
        if (previousTab && this.components[previousTab]) {
            console.log(`Unmounting: ${previousTab}`);
            this.components[previousTab].unmount();
        }

        // Update navigation UI
        this.updateNavigation(tabName);
        
        // Update breadcrumb
        this.updateBreadcrumb(tabName);

        // Hide all content views
        this.hideAllViews();

        // Mount new component
        if (this.components[tabName]) {
            console.log(`Mounting: ${tabName}`);
            this.components[tabName].mount();
        } else {
            console.error(`Component for ${tabName} not found`);
        }
    }

    /**
     * Update navigation active state
     */
    updateNavigation(activeTab) {
        // Update header navigation buttons - Support both old and new class names
        const headerNavBtns = document.querySelectorAll('.header-nav-btn, .enhanced-header__nav-btn');
        headerNavBtns.forEach(btn => {
            const tab = btn.dataset.tab;
            if (tab === activeTab) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update sidebar navigation items (legacy)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const tab = item.dataset.tab;
            if (tab === activeTab) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Update breadcrumb navigation
     */
    updateBreadcrumb(tabName) {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            const tabTranslations = {
                'overview': 'Resumen',
                'documents': 'Documentos',
                'restricted': 'Restringido',
                'intelligence': 'Inteligencia',
                'logs': 'Registros',
                'research': 'Investigación',
                'archive': 'Archivo',
                'watchlists': 'Listas de Vigilancia',
                'leaked-files': 'Archivos Filtrados - Girasol Rojo'
            };
            const formattedName = tabTranslations[tabName] || (tabName.charAt(0).toUpperCase() + tabName.slice(1));
            breadcrumb.textContent = `Inicio / ${formattedName}`;
        }
    }

    /**
     * Hide all tab content views
     */
    hideAllViews() {
        const allViews = document.querySelectorAll('.tab-content');
        allViews.forEach(view => {
            view.classList.remove('active');
        });
    }

    /**
     * Get current tab name
     */
    getCurrentTab() {
        return this.currentTab;
    }
}

// Create global navigation instance
const navManager = new NavigationManager();
