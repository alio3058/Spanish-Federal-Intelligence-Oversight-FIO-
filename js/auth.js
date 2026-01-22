/**
 * Authentication and Authorization System
 * Manages user accounts, roles, and permissions
 */

class AuthenticationManager {
    constructor() {
        this.currentUser = null;
        this.users = {
            'girasol.rojo': {
                username: 'girasol.rojo',
                agentName: 'Agente Girasol Rojo',
                role: 'standard',
                clearance: 'SECRETO',
                profileInitials: 'GR',
                permissions: {
                    canAccessRestricted: false,
                    canBypassRestrictions: false,
                    canAccessTopSecret: false,
                    canViewAdminControls: false
                },
                securityFlags: {
                    hasIncident: true,
                    incidentType: 'FILTRACION_DOCUMENTO_CLASIFICADO',
                    incidentStatus: 'BAJO_INVESTIGACION'
                }
            },
            'rafael.vega': {
                username: 'rafael.vega',
                agentName: 'Agente Rafael Vega',
                role: 'administrator',
                clearance: 'TS/SCI',
                profileInitials: 'RV',
                permissions: {
                    canAccessRestricted: true,
                    canBypassRestrictions: true,
                    canAccessTopSecret: true,
                    canViewAdminControls: true
                },
                securityFlags: {
                    hasIncident: false
                }
            }
        };

        this.loginModalShown = false;
        this.incidentPopupShown = false;
    }

    /**
     * Initialize authentication system
     */
    init() {
        this.createLoginModal();
        this.setupUserMenuDropdown();
        this.showLoginModal();
    }

    /**
     * Setup user menu dropdown with logout
     * Uses fixed positioning (portal pattern) to avoid stacking context issues
     */
    setupUserMenuDropdown() {
        const userMenuTrigger = document.getElementById('user-menu-trigger');
        const userDropdown = document.getElementById('user-dropdown');
        const logoutBtn = document.getElementById('menu-logout');
        const sessionInfoBtn = document.getElementById('menu-session-info');

        if (userMenuTrigger && userDropdown) {
            // Position dropdown using fixed coordinates relative to trigger
            const positionDropdown = () => {
                const triggerRect = userMenuTrigger.getBoundingClientRect();
                userDropdown.style.top = `${triggerRect.bottom + 8}px`;
                userDropdown.style.right = `${window.innerWidth - triggerRect.right}px`;
                userDropdown.style.left = 'auto';
            };

            userMenuTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isVisible = userDropdown.style.display === 'block';
                if (!isVisible) {
                    positionDropdown();
                    userDropdown.style.display = 'block';
                } else {
                    userDropdown.style.display = 'none';
                }
            });

            // Reposition on window resize
            window.addEventListener('resize', () => {
                if (userDropdown.style.display === 'block') {
                    positionDropdown();
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.enhanced-header__user-menu')) {
                    userDropdown.style.display = 'none';
                }
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && userDropdown.style.display === 'block') {
                    userDropdown.style.display = 'none';
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                userDropdown.style.display = 'none';
                this.logout();
            });
        }

        if (sessionInfoBtn) {
            sessionInfoBtn.addEventListener('click', () => {
                this.showSessionInfo();
                userDropdown.style.display = 'none';
            });
        }
    }

    /**
     * Create login modal UI
     */
    createLoginModal() {
        const modalHTML = `
            <div id="login-modal" class="modal-overlay" style="display: none;">
                <div class="modal-content login-modal">
                    <div class="modal-header">
                        <h2>🔐 AUTENTICACIÓN FIO</h2>
                        <p class="login-subtitle">Supervisión Federal de Inteligencia - Inicio de Sesión Seguro</p>
                    </div>
                    <div class="modal-body">
                        <div class="login-form">
                            <div class="form-group">
                                <label for="login-username">Nombre de Usuario</label>
                                <input 
                                    type="text" 
                                    id="login-username" 
                                    class="form-input" 
                                    placeholder="Ingrese nombre de usuario"
                                    autocomplete="username"
                                />
                            </div>
                            <div class="form-group">
                                <label for="login-password">Contraseña</label>
                                <input 
                                    type="password" 
                                    id="login-password" 
                                    class="form-input" 
                                    placeholder="Ingrese contraseña"
                                    autocomplete="current-password"
                                />
                            </div>
                            <div id="login-error" class="login-error" style="display: none;"></div>
                            <div class="login-hint">
                                <p><strong>Cuentas Disponibles:</strong></p>
                                <ul>
                                    <li><code>girasol.rojo</code> - Usuario Estándar</li>
                                    <li><code>rafael.vega</code> - Administrador</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="login-submit-btn" class="btn btn-primary">
                            <span class="btn-icon">🔓</span>
                            <span>Iniciar Sesión</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupLoginListeners();
    }

    /**
     * Setup login event listeners
     */
    setupLoginListeners() {
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        const submitBtn = document.getElementById('login-submit-btn');
        const loginError = document.getElementById('login-error');

        const attemptLogin = () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            if (!username || !password) {
                this.showLoginError('Por favor ingrese nombre de usuario y contraseña');
                return;
            }

            // Validate password (internal check only - never display this value)
            if (password !== '1234') {
                this.showLoginError('Credenciales inválidas. Por favor intente de nuevo.');
                return;
            }

            if (this.users[username]) {
                this.login(username);
            } else {
                this.showLoginError('Credenciales inválidas. Por favor intente de nuevo.');
            }
        };

        submitBtn.addEventListener('click', attemptLogin);

        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                attemptLogin();
            }
        });

        usernameInput.addEventListener('input', () => {
            loginError.style.display = 'none';
        });
    }

    /**
     * Show login error message
     */
    showLoginError(message) {
        const loginError = document.getElementById('login-error');
        loginError.textContent = message;
        loginError.style.display = 'block';
    }

    /**
     * Show login modal
     */
    showLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'flex';
            this.loginModalShown = true;
            document.getElementById('login-username').focus();
        }
    }

    /**
     * Hide login modal
     */
    hideLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Login user
     */
    login(username) {
        const user = this.users[username];
        if (!user) return;

        this.currentUser = user;
        this.hideLoginModal();
        
        // Update UI with user info
        this.updateUserInterface();
        
        // Show security incident popup if applicable
        if (user.securityFlags.hasIncident && !this.incidentPopupShown) {
            setTimeout(() => {
                this.showSecurityIncidentPopup();
            }, 500);
        }

        // Emit login event for other components
        window.dispatchEvent(new CustomEvent('user-login', { 
            detail: { user: this.currentUser } 
        }));
    }

    /**
     * Logout user with smooth transition
     */
    logout() {
        // Show logout transition
        this.showLogoutTransition();
        
        // Wait for transition, then complete logout
        setTimeout(() => {
            this.currentUser = null;
            this.incidentPopupShown = false;
            this.updateUserInterface();
            this.showLoginModal();
            
            window.dispatchEvent(new CustomEvent('user-logout'));
        }, 1500);
    }

    /**
     * Show logout transition screen
     */
    showLogoutTransition() {
        const transition = document.createElement('div');
        transition.id = 'logout-transition';
        transition.className = 'logout-transition';
        transition.innerHTML = `
            <div class="logout-content">
                <div class="logout-spinner"></div>
                <p class="logout-text">Finalizando Sesión Segura...</p>
                <p class="logout-subtext">Cerrando sesión de ${this.currentUser?.agentName || 'Usuario'}</p>
            </div>
        `;
        document.body.appendChild(transition);
        
        setTimeout(() => transition.classList.add('active'), 10);
        
        setTimeout(() => {
            transition.classList.remove('active');
            setTimeout(() => transition.remove(), 300);
        }, 1200);
    }

    /**
     * Show session info modal
     */
    showSessionInfo() {
        if (!this.currentUser) return;

        const sessionModal = document.createElement('div');
        sessionModal.className = 'modal-overlay';
        sessionModal.style.display = 'flex';
        sessionModal.innerHTML = `
            <div class="modal-content session-info-modal">
                <div class="modal-header">
                    <h2>📊 Información de Sesión</h2>
                </div>
                <div class="modal-body">
                    <div class="session-info-grid">
                        <div class="session-info-item">
                            <span class="field-label">Agente:</span>
                            <span class="field-value">${this.currentUser.agentName}</span>
                        </div>
                        <div class="session-info-item">
                            <span class="field-label">Usuario:</span>
                            <span class="field-value">${this.currentUser.username}</span>
                        </div>
                        <div class="session-info-item">
                            <span class="field-label">Rol:</span>
                            <span class="field-value">${this.currentUser.role === 'administrator' ? 'Administrador' : 'Usuario Estándar'}</span>
                        </div>
                        <div class="session-info-item">
                            <span class="field-label">Autorización:</span>
                            <span class="field-value">${this.currentUser.clearance}</span>
                        </div>
                        <div class="session-info-item">
                            <span class="field-label">Inicio de Sesión:</span>
                            <span class="field-value">${new Date().toLocaleString('es-ES')}</span>
                        </div>
                        <div class="session-info-item">
                            <span class="field-label">Sistema:</span>
                            <span class="field-value">Plataforma de Inteligencia FIO</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" id="close-session-info">Cerrar</button>
                </div>
            </div>
        `;

        document.body.appendChild(sessionModal);

        const closeBtn = sessionModal.querySelector('#close-session-info');
        closeBtn.addEventListener('click', () => {
            sessionModal.remove();
        });

        sessionModal.addEventListener('click', (e) => {
            if (e.target === sessionModal) {
                sessionModal.remove();
            }
        });
    }

    /**
     * Update UI with current user information
     */
    updateUserInterface() {
        const analystName = document.querySelector('.analyst-name');
        const clearanceBadge = document.querySelector('.clearance-badge');
        const profileBadge = document.querySelector('.profile-badge');
        const userDropdownName = document.querySelector('.user-dropdown-name');
        const userDropdownRole = document.querySelector('.user-dropdown-role');
        const userDropdownClearance = document.querySelector('.user-dropdown-clearance');
        const profileBadgeLarge = document.querySelector('.profile-badge-large');

        if (this.currentUser) {
            if (analystName) analystName.textContent = this.currentUser.agentName;
            if (clearanceBadge) clearanceBadge.textContent = this.currentUser.clearance;
            if (profileBadge) profileBadge.textContent = this.currentUser.profileInitials;
            if (userDropdownName) userDropdownName.textContent = this.currentUser.agentName;
            if (userDropdownRole) userDropdownRole.textContent = this.currentUser.role === 'administrator' ? 'Administrador' : 'Usuario Estándar';
            if (userDropdownClearance) userDropdownClearance.textContent = this.currentUser.clearance;
            if (profileBadgeLarge) profileBadgeLarge.textContent = this.currentUser.profileInitials;

            // Add role indicator for administrators
            if (this.currentUser.role === 'administrator') {
                clearanceBadge?.classList.add('admin-clearance');
            } else {
                clearanceBadge?.classList.remove('admin-clearance');
            }

            // Show/hide admin controls
            this.updateAdminControls();
        } else {
            // Reset to default when no user
            if (analystName) analystName.textContent = 'Analista';
            if (clearanceBadge) {
                clearanceBadge.textContent = 'TS/SCI';
                clearanceBadge.classList.remove('admin-clearance');
            }
            if (profileBadge) profileBadge.textContent = 'OM';
            if (userDropdownName) userDropdownName.textContent = 'Analista';
            if (userDropdownRole) userDropdownRole.textContent = 'Usuario Estándar';
            if (userDropdownClearance) userDropdownClearance.textContent = 'TS/SCI';
            if (profileBadgeLarge) profileBadgeLarge.textContent = 'OM';
        }
    }

    /**
     * Update admin-only controls visibility
     */
    updateAdminControls() {
        const adminControls = document.querySelectorAll('.admin-only-control');
        const isAdmin = this.currentUser?.permissions.canViewAdminControls || false;

        adminControls.forEach(control => {
            control.style.display = isAdmin ? 'flex' : 'none';
        });
    }

    /**
     * Show security incident popup
     */
    showSecurityIncidentPopup() {
        if (!this.currentUser || !this.currentUser.securityFlags.hasIncident) return;

        const popupHTML = `
            <div id="security-incident-modal" class="modal-overlay" style="display: flex;">
                <div class="modal-content security-incident-modal">
                    <div class="modal-header danger">
                        <div class="incident-icon">⚠️</div>
                        <h2>ALERTA DE INCIDENTE DE SEGURIDAD</h2>
                    </div>
                    <div class="modal-body">
                        <div class="incident-details">
                            <div class="incident-field">
                                <span class="field-label">AGENTE:</span>
                                <span class="field-value">${this.currentUser.agentName}</span>
                            </div>
                            <div class="incident-field">
                                <span class="field-label">TIPO DE INCIDENTE:</span>
                                <span class="field-value incident-type">Filtración de Documento Clasificado</span>
                            </div>
                            <div class="incident-field">
                                <span class="field-label">ESTADO:</span>
                                <span class="field-value status-badge-warning">Bajo Investigación</span>
                            </div>
                            <div class="incident-message">
                                <p><strong>${this.currentUser.agentName}</strong> ha sido marcado por divulgación no autorizada de información clasificada.</p>
                                <p>Esta cuenta está bajo monitoreo activo por la División de Amenazas Internas.</p>
                                <p>Todo acceso y actividades del sistema están siendo registrados y revisados.</p>
                            </div>
                            <div class="incident-warning">
                                <p>⚠️ El acceso a recursos restringidos está actualmente limitado mientras se esperan los resultados de la investigación.</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="close-security-incident" class="btn btn-danger">
                            <span>Aceptar</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHTML);
        this.incidentPopupShown = true;

        const closeBtn = document.getElementById('close-security-incident');
        const modal = document.getElementById('security-incident-modal');

        const closePopup = () => {
            if (modal) {
                modal.style.display = 'none';
                modal.remove();
            }
        };

        closeBtn.addEventListener('click', closePopup);

        // Allow ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    /**
     * Check if current user has specific permission
     */
    hasPermission(permission) {
        if (!this.currentUser) return false;
        return this.currentUser.permissions[permission] || false;
    }

    /**
     * Check if current user is administrator
     */
    isAdmin() {
        return this.currentUser?.role === 'administrator';
    }

    /**
     * Check if current user can access restricted content
     */
    canAccessRestricted() {
        return this.hasPermission('canAccessRestricted');
    }

    /**
     * Check if current user can bypass restrictions
     */
    canBypassRestrictions() {
        return this.hasPermission('canBypassRestrictions');
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Show access denied message
     */
    showAccessDenied(message = null) {
        const overlay = document.getElementById('access-denied-overlay');
        const modalBody = overlay?.querySelector('.modal-body p');

        if (modalBody && message) {
            modalBody.textContent = message;
        }

        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }
}

// Create global auth manager instance
window.authManager = new AuthenticationManager();
