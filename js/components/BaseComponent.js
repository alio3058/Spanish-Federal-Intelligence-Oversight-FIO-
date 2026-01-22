/**
 * Base Component Class
 * All tab components extend from this base class
 */

class BaseComponent {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.mounted = false;
    }

    /**
     * Mount component and render content
     */
    mount() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error(`Container #${this.containerId} not found`);
            return;
        }

        this.container.classList.add('active');
        this.mounted = true;
        this.render();
        this.attachEventListeners();
    }

    /**
     * Unmount component and cleanup
     */
    unmount() {
        if (!this.mounted) return;
        
        this.removeEventListeners();
        if (this.container) {
            this.container.classList.remove('active');
        }
        this.mounted = false;
    }

    /**
     * Render component content (override in child classes)
     */
    render() {
        // Override in child classes
    }

    /**
     * Attach event listeners (override in child classes)
     */
    attachEventListeners() {
        // Override in child classes
    }

    /**
     * Remove event listeners (override in child classes)
     */
    removeEventListeners() {
        // Override in child classes
    }

    /**
     * Update component content
     */
    update() {
        if (!this.mounted) return;
        this.render();
    }
}
