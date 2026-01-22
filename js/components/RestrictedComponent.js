/**
 * Restricted Component
 * High-security access area with authorization checks
 */

class RestrictedComponent extends BaseComponent {
    constructor() {
        super('restricted-content');
        this.accessGranted = true; // Set to true to show content
        this.restrictedFiles = [];
        this.filteredFiles = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
    }

    render() {
        if (!this.container) return;

        const panel = this.container.querySelector('.panel-content');
        if (!panel) return;

        if (!this.accessGranted) {
            panel.innerHTML = `
                <div class="restricted-access-notice">
                    <div class="access-icon">🔒</div>
                    <h3>ACCESO RESTRINGIDO</h3>
                    <p class="text-muted">Esta sección requiere autorización TS/SCI mejorada.</p>
                    <p class="text-warning">Nivel de Autorización Requerido: <strong>TS/SCI + ULTRA SECRETO CÓSMICO</strong></p>
                    <button class="btn btn-primary" id="request-access-btn">Solicitar Acceso Temporal</button>
                </div>
            `;
        } else {
            // Get restricted files (high-tier only)
            this.restrictedFiles = mockFiles.filter(f => 
                f.category === 'restricted' || f.classification === 1
            );
            
            this.applyFilters();

            panel.innerHTML = this.renderLayout();

            // Populate grid
            const gridContainer = this.container.querySelector('.restricted-grid');
            if (gridContainer) {
                gridContainer.innerHTML = '';
                this.filteredFiles.forEach(file => {
                    const card = this.createRestrictedCard(file);
                    gridContainer.appendChild(card);
                });

                // Show empty state if no results
                if (this.filteredFiles.length === 0) {
                    gridContainer.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-state-icon">🔒</div>
                            <h3>No Se Encontraron Archivos Restringidos</h3>
                            <p class="text-muted">Intente ajustar sus filtros</p>
                        </div>
                    `;
                }
            }
        }
    }

    renderLayout() {
        return `
            <div class="warning-banner">
                <div class="warning-icon">⚠️</div>
                <div class="warning-content">
                    <strong>MATERIAL CLASIFICADO - MANEJAR CON EXTREMA PRECAUCIÓN</strong>
                    <p>El acceso no autorizado, divulgación o distribución de estos materiales está estrictamente prohibido y puede resultar en sanciones severas bajo la ley federal.</p>
                </div>
            </div>
            
            <div class="section-toolbar">
                <div class="toolbar-left">
                    <div class="search-bar">
                        <input type="text" 
                               id="restricted-search" 
                               class="search-input" 
                               placeholder="🔍 Buscar archivos restringidos..."
                               value="${this.searchQuery}">
                    </div>
                </div>
                <div class="toolbar-right">
                    <div class="filter-group">
                        <label class="filter-label">Nivel:</label>
                        <button class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">Todos</button>
                        <button class="filter-btn tier-1-btn ${this.currentFilter === 'tier1' ? 'active' : ''}" data-filter="tier1">Nivel 1</button>
                        <button class="filter-btn tier-2-btn ${this.currentFilter === 'tier2' ? 'active' : ''}" data-filter="tier2">Nivel 2</button>
                        <button class="filter-btn tier-3-btn ${this.currentFilter === 'tier3' ? 'active' : ''}" data-filter="tier3">Nivel 3</button>
                    </div>
                    <div class="count-badge danger">
                        <span class="count-number">${this.filteredFiles.length}</span>
                        <span class="count-label">Clasificados</span>
                    </div>
                </div>
            </div>
            
            <div class="restricted-grid"></div>
        `;
    }

    applyFilters() {
        this.filteredFiles = this.restrictedFiles.filter(file => {
            // Apply tier filter
            let tierMatch = true;
            if (this.currentFilter === 'tier1') tierMatch = file.classification === 1;
            else if (this.currentFilter === 'tier2') tierMatch = file.classification === 2;
            else if (this.currentFilter === 'tier3') tierMatch = file.classification === 3;

            // Apply search filter
            let searchMatch = true;
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                searchMatch = file.name.toLowerCase().includes(query) ||
                             (file.summary && file.summary.toLowerCase().includes(query));
            }

            return tierMatch && searchMatch;
        });
    }

    createRestrictedCard(file) {
        const div = document.createElement('div');
        div.className = 'restricted-card clickable';
        div.dataset.fileId = file.id;
        
        const classificationClass = file.classification === 1 ? 'tier-1' : 
                                   file.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = file.classification === 1 ? 'ULTRA SECRETO' :
                                  file.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';

        div.innerHTML = `
            <div class="card-warning-strip ${classificationClass}"></div>
            <div class="card-header">
                <div class="classification-badge ${classificationClass}">${classificationText}</div>
                <div class="restricted-icon">🔒</div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${file.name}</h3>
                ${file.summary ? `<p class="card-summary">${file.summary}</p>` : ''}
            </div>
            <div class="card-footer">
                <span class="card-meta">
                    <span class="meta-icon">📅</span>
                    <span class="meta-text">${file.lastModified}</span>
                </span>
                <span class="status-badge status-${file.status.toLowerCase().replace(/\s/g, '-')}">${file.status}</span>
            </div>
            <div class="card-access-warning">
                <span class="warning-text">⚠️ Acceso Registrado</span>
            </div>
        `;

        div.addEventListener('click', () => {
            this.showRestrictedDetail(file);
        });

        return div;
    }

    showRestrictedDetail(file) {
        this.selectedDocument = file;
        const modal = document.getElementById('restricted-detail-modal');
        if (!modal) {
            this.createDetailModal();
        }

        const classificationClass = file.classification === 1 ? 'tier-1' : 
                                   file.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = file.classification === 1 ? 'ULTRA SECRETO' :
                                  file.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';
        const tierText = file.classification === 1 ? 'Nivel 1 - Ultra Secreto' :
                        file.classification === 2 ? 'Nivel 2 - Confidencial' : 'Nivel 3 - Restringido';

        const detailModal = document.getElementById('restricted-detail-modal');
        detailModal.querySelector('#restricted-summary-classification').className = `file-classification ${classificationClass}`;
        detailModal.querySelector('#restricted-summary-classification').textContent = classificationText;
        detailModal.querySelector('#restricted-summary-title').textContent = file.name;
        detailModal.querySelector('#restricted-summary-tier').textContent = tierText;
        detailModal.querySelector('#restricted-summary-status').textContent = file.status;
        detailModal.querySelector('#restricted-summary-date').textContent = file.lastModified;
        detailModal.querySelector('#restricted-summary-access').textContent = file.access === 'granted' ? '✓ Acceso Concedido' : '✗ Acceso Denegado';
        detailModal.querySelector('#restricted-summary-executive-text').textContent = file.summary || 'No hay resumen disponible.';

        detailModal.classList.remove('hidden');
        setTimeout(() => detailModal.classList.add('active'), 10);
        
        // Update admin controls visibility
        if (window.authManager) {
            window.authManager.updateAdminControls();
        }
    }

    createDetailModal() {
        let modal = document.getElementById('restricted-detail-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'restricted-detail-modal';
            modal.className = 'document-summary-modal hidden';
            modal.innerHTML = `
                <div class="document-summary-content">
                    <div class="modal-warning-header">
                        <span class="warning-icon">⚠️</span>
                        <span>ACCESO CLASIFICADO - TODA LA ACTIVIDAD ESTÁ MONITOREADA</span>
                    </div>
                    <button class="modal-close-btn">✕</button>
                    <div class="summary-header">
                        <div id="restricted-summary-classification" class="file-classification"></div>
                        <h2 id="restricted-summary-title"></h2>
                    </div>
                    <div class="summary-body">
                        <div class="summary-info-grid">
                            <div class="summary-info-item">
                                <label>Nivel de Clasificación:</label>
                                <span id="restricted-summary-tier"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Estado:</label>
                                <span id="restricted-summary-status"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Última Modificación:</label>
                                <span id="restricted-summary-date"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Nivel de Acceso:</label>
                                <span id="restricted-summary-access"></span>
                            </div>
                        </div>
                        <div class="summary-executive">
                            <h3>Resumen del Documento</h3>
                            <p id="restricted-summary-executive-text"></p>
                        </div>
                        <div class="access-log-notice">
                            <p>🔒 Este acceso ha sido registrado en el rastro de auditoría del sistema</p>
                            <p class="text-muted">ID de Usuario: ANALISTA-7394 | Marca de Tiempo: ${new Date().toISOString()}</p>
                        </div>
                    </div>
                    <div class="summary-actions">
                        <button class="btn btn-secondary" id="restricted-btn-view-summary">📄 Ver Resumen</button>
                        <button class="btn btn-primary" id="restricted-btn-open-document">📂 Abrir Documento Completo</button>
                        <button class="btn btn-primary admin-override-btn admin-only-control" id="restricted-btn-admin-override" style="margin-left: auto;">
                            <span>🔓</span>
                            <span>Anulación de Admin</span>
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const closeBtn = modal.querySelector('.modal-close-btn');
            closeBtn.addEventListener('click', () => this.closeDetailModal());

            const openBtn = modal.querySelector('#restricted-btn-open-document');
            openBtn.addEventListener('click', () => this.openDocumentViewer());

            const adminOverrideBtn = modal.querySelector('#restricted-btn-admin-override');
            if (adminOverrideBtn) {
                adminOverrideBtn.addEventListener('click', () => this.openDocumentViewerWithOverride());
            }

            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeDetailModal();
            });
            
            // Update admin controls visibility
            if (window.authManager) {
                window.authManager.updateAdminControls();
            }
        }
    }

    createDocumentViewer() {
        let viewer = document.getElementById('restricted-viewer-modal');
        if (!viewer) {
            viewer = document.createElement('div');
            viewer.id = 'restricted-viewer-modal';
            viewer.className = 'document-viewer-modal hidden';
            viewer.innerHTML = `
                <div class="document-viewer-container">
                    <div class="viewer-toolbar">
                        <button class="viewer-close-btn">✕ Cerrar Documento</button>
                        <h3 id="restricted-viewer-doc-title" class="viewer-title"></h3>
                        <div class="viewer-toolbar-actions">
                            <button class="viewer-btn" title="Imprimir" onclick="alert('Funcionalidad de impresión restringida para materiales clasificados')">🖨️</button>
                            <button class="viewer-btn" title="Exportar" onclick="alert('Funcionalidad de exportación restringida')">💾</button>
                        </div>
                    </div>
                    <div class="document-viewer-content">
                        <div id="restricted-viewer-body" class="classified-document-wrapper"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(viewer);

            const closeBtn = viewer.querySelector('.viewer-close-btn');
            closeBtn.addEventListener('click', () => this.closeDocumentViewer());

            viewer.addEventListener('click', (e) => {
                if (e.target === viewer) this.closeDocumentViewer();
            });
        }
    }

    generateFullContent(doc) {
        const classificationText = doc.classification === 1 ? 'ULTRA SECRETO' :
                                  doc.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';
        const docId = `SIS-2026-SFI-${String(doc.id).padStart(5, '0')}`;
        const dateObj = new Date(doc.lastModified);
        const formattedDate = dateObj.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        }).toUpperCase();
        
        return `
            <div class="classification-banner top-banner">
                ULTRA SECRETO CÓSMICO // ${classificationText} // ICS
            </div>

            <header class="document-header">
                <div class="header-grid">
                    <div class="header-item">
                        <span class="label">CLASIFICACIÓN:</span>
                        <span class="value classification-level">CÓSMICO / ${classificationText}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">ID DOCUMENTO:</span>
                        <span class="value">${docId}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">FECHA:</span>
                        <span class="value">${formattedDate}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">COMPARTIMENTO:</span>
                        <span class="value"><span class="redacted">████████████</span></span>
                    </div>
                </div>
                
                <div class="warning-banner">
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-text">
                        <strong>EXTREMA PRECAUCIÓN:</strong> Este documento contiene información compartimentada especial altamente clasificada. Acceso restringido a personal con autorizaciones compartimentadas específicas. La divulgación no autorizada está sujeta a sanciones penales severas.
                    </div>
                </div>
            </header>

            <h1 class="document-title">
                DOCUMENTO DE ACCESO RESTRINGIDO: ${doc.name.replace('.pdf', '').toUpperCase()}
            </h1>

            <section class="document-section">
                <h2 class="section-title">RESUMEN EJECUTIVO</h2>
                <div class="section-content">
                    <p>${doc.summary}</p>
                    <p>
                        Este documento contiene información derivada de 
                        <span class="redacted-long">████████████████████████████████████</span> 
                        fuentes y programas clasificados bajo designación de programa de acceso especial (PAE) 
                        <span class="redacted-block">████████████████</span>. 
                        Distribución limitada a individuos con necesidad de conocer documentada y 
                        autorizaciones de acceso compartimentado apropiadas.
                    </p>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">INFORMACIÓN COMPARTIMENTADA</h2>
                <div class="section-content">
                    <div class="incident-box">
                        <div class="incident-header">
                            <span class="incident-label">COMPARTIMENTO:</span> 
                            <span class="redacted-block">████████████████</span>
                            <span class="incident-label">DESIGNACIÓN PAE:</span> 
                            <span class="severity-critical">CÓSMICO</span>
                        </div>
                        
                        <p>
                            Información compartimentada especial relacionada con 
                            <span class="redacted-long">████████████████████████████████████</span> 
                            actividades y capacidades del programa. Este material es derivado de:
                        </p>
                        
                        <ul>
                            <li>Fuentes SIGINT extremadamente sensibles con protección de palabra clave <span class="redacted-block">████████████████</span></li>
                            <li>Activos de inteligencia humana operando bajo cobertura profunda en <span class="redacted">████████████</span></li>
                            <li>Sistemas de recolección técnica designados <span class="redacted-long">████████████████████████████</span></li>
                            <li>Intercambio de inteligencia con naciones asociadas bajo acuerdo <span class="redacted">████████████</span></li>
                            <li>Hallazgos de investigación del programa de acceso especial <span class="redacted-block">████████████████</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">DETALLES DEL PROGRAMA</h2>
                <div class="section-content">
                    <table class="intel-table">
                        <thead>
                            <tr>
                                <th>Elemento del Programa</th>
                                <th>Clasificación</th>
                                <th>Estado</th>
                                <th>Compartimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span class="redacted-long">████████████████████████████</span></td>
                                <td><span class="threat-critical">ULTRA SECRETO CÓSMICO</span></td>
                                <td>Activo</td>
                                <td><span class="redacted">████████</span></td>
                            </tr>
                            <tr>
                                <td><span class="redacted-long">████████████████████████████</span></td>
                                <td><span class="threat-critical">ULTRA SECRETO CÓSMICO</span></td>
                                <td>Desarrollo</td>
                                <td><span class="redacted">████████</span></td>
                            </tr>
                            <tr>
                                <td><span class="redacted-long">████████████████████████████</span></td>
                                <td><span class="threat-high">ULTRA SECRETO / ICS</span></td>
                                <td>Operacional</td>
                                <td><span class="redacted">████████</span></td>
                            </tr>
                            <tr>
                                <td><span class="redacted-long">████████████████████████████</span></td>
                                <td><span class="threat-critical">ULTRA SECRETO CÓSMICO</span></td>
                                <td>Planificación</td>
                                <td><span class="redacted">████████</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">OPERATIONAL PARAMETERS</h2>
                <div class="section-content">
                    <div class="subsection">
                        <h3 class="subsection-title">Mission Objectives</h3>
                        <p>
                            Primary mission focuses on 
                            <span class="redacted-long">████████████████████████████████████</span> 
                            capabilities targeting <span class="redacted-block">████████████████</span> 
                            adversary systems. Secondary objectives include:
                        </p>
                        <ul class="timeline-list">
                            <li><span class="redacted-long">████████████████████████████████████</span> platform deployment</li>
                            <li>Development of <span class="redacted-block">████████████████</span> countermeasures</li>
                            <li>Integration with <span class="redacted">████████████</span> collection architecture</li>
                            <li>Coordination with <span class="redacted-block">████████████████</span> partner programs</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h3 class="subsection-title">Technical Capabilities</h3>
                        <div class="redacted-paragraph">
                            <p class="fully-redacted">████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████</p>
                            <p class="fully-redacted">████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████</p>
                        </div>
                        <p>
                            System performance metrics indicate capability to 
                            <span class="redacted-long">████████████████████████████████████</span> 
                            with precision of <span class="redacted">██.█%</span> under optimal conditions.
                        </p>
                    </div>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">REQUISITOS DE ACCESO ESPECIAL</h2>
                <div class="section-content">
                    <ol class="recommendations-list">
                        <li>El personal debe poseer autorización ULTRA SECRETO CÓSMICO con acceso compartimentado específico para <span class="redacted-block">████████████████</span></li>
                        <li>Se requiere examen de polígrafo dentro de los últimos <span class="redacted">██</span> meses para acceso al programa</li>
                        <li>La inscripción en evaluación continua es obligatoria para todo el personal del programa</li>
                        <li>El acceso requiere autorización del gerente del programa <span class="redacted-block">████████████████</span></li>
                        <li>Todos los materiales deben almacenarse en instalación segura aprobada <span class="redacted">████████████</span></li>
                        <li>La discusión de información del programa solo está permitida en ubicaciones SCIF designadas</li>
                        <li>Los viajes al extranjero requieren aprobación previa y sesión informativa por parte del oficial de seguridad <span class="redacted">████████████</span></li>
                    </ol>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">PROTOCOLOS DE SEGURIDAD</h2>
                <div class="section-content">
                    <div class="subsection">
                        <h3 class="subsection-title">Manejo y Almacenamiento</h3>
                        <p>
                            Todos los materiales clasificados CÓSMICOS deben manejarse de acuerdo con 
                            la directiva <span class="redacted">████████████</span>. Los requisitos específicos incluyen:
                        </p>
                        <ul class="timeline-list">
                            <li>Almacenamiento en caja fuerte aprobada por GSA <span class="redacted">████████</span> con acceso de doble control</li>
                            <li>Verificación de inventario cada <span class="redacted">██</span> horas cuando no esté en uso</li>
                            <li>Destrucción solo por personal autorizado usando métodos aprobados <span class="redacted">████████████</span></li>
                            <li>Reproducción prohibida sin autorización del gerente de seguridad del programa</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h3 class="subsection-title">Procedimientos de Compromiso</h3>
                        <p>
                            Cualquier sospecha de compromiso de este material debe reportarse inmediatamente a 
                            <span class="redacted-block">████████████████</span> dentro de <span class="redacted">██</span> 
                            horas. Seguir los procedimientos de emergencia descritos en el manual de seguridad <span class="redacted">████████████</span> 
                            sección <span class="redacted">██.█</span>.
                        </p>
                    </div>
                </div>
            </section>

            <footer class="document-footer">
                <div class="footer-grid">
                    <div class="footer-item">
                        <span class="label">ORIGINADOR:</span>
                        <span class="value"><span class="redacted-block">████████████████</span></span>
                    </div>
                    <div class="footer-item">
                        <span class="label">AUTORIDAD APROBADORA:</span>
                        <span class="value"><span class="redacted-block">████████████████</span></span>
                    </div>
                    <div class="footer-item">
                        <span class="label">NÚMERO DE CONTROL:</span>
                        <span class="value"><span class="redacted">████-████-████</span></span>
                    </div>
                </div>
                <div class="declassification-note">
                    DESCLASIFICACIÓN: PROHIBIDA | EXENTO DE DESCLASIFICACIÓN AUTOMÁTICA
                </div>
            </footer>
        `;
    }

    openDocumentViewer() {
        if (!this.selectedDocument) return;

        // Check if user has permission to access restricted content
        if (window.authManager && !window.authManager.canAccessRestricted()) {
            const user = window.authManager.getCurrentUser();
            const message = user 
                ? `${user.agentName}, no tiene autorización suficiente para acceder a este material clasificado. Este intento ha sido registrado.`
                : 'No tiene privilegios suficientes para acceder a este recurso. Este incidente será registrado y reportado.';
            
            window.authManager.showAccessDenied(message);
            this.closeDetailModal();
            return;
        }

        const viewer = document.getElementById('restricted-viewer-modal');
        if (!viewer) {
            this.createDocumentViewer();
        }

        const doc = this.selectedDocument;
        
        document.getElementById('restricted-viewer-doc-title').textContent = doc.name;
        
        // Regular access - shows redacted version
        const fullContent = this.generateFullContent(doc, false);
        document.getElementById('restricted-viewer-body').innerHTML = fullContent;

        this.closeDetailModal();
        
        const viewerElement = document.getElementById('restricted-viewer-modal');
        viewerElement.classList.remove('hidden');
        setTimeout(() => viewerElement.classList.add('active'), 10);
    }

    openDocumentViewerWithOverride() {
        if (!this.selectedDocument) return;
        
        // Admin override - bypass permission checks and show unredacted content
        const viewer = document.getElementById('restricted-viewer-modal');
        if (!viewer) {
            this.createDocumentViewer();
        }

        const doc = this.selectedDocument;
        
        document.getElementById('restricted-viewer-doc-title').textContent = doc.name + ' [ADMIN OVERRIDE - UNREDACTED]';
        
        // Admin override - shows FULL unredacted version
        const fullContent = this.generateFullContent(doc, true);
        document.getElementById('restricted-viewer-body').innerHTML = fullContent;

        this.closeDetailModal();
        
        const viewerElement = document.getElementById('restricted-viewer-modal');
        viewerElement.classList.remove('hidden');
        setTimeout(() => viewerElement.classList.add('active'), 10);
    }

    closeDocumentViewer() {
        const viewer = document.getElementById('restricted-viewer-modal');
        if (viewer) {
            viewer.classList.remove('active');
            setTimeout(() => viewer.classList.add('hidden'), 300);
        }
    }

    openDocumentViewerWithOverride() {
        if (!this.selectedDocument) return;

        // Admin bypass - directly open document with FULL UNREDACTED content
        const viewer = document.getElementById('restricted-viewer-modal');
        if (!viewer) {
            this.createDocumentViewer();
        }

        const doc = this.selectedDocument;
        
        document.getElementById('restricted-viewer-doc-title').textContent = doc.name + ' [ADMIN OVERRIDE - UNREDACTED]';
        
        // Use unredacted content generator
        const fullContent = window.generateUnredactedContent 
            ? window.generateUnredactedContent(doc) 
            : this.generateFullContent(doc);
        document.getElementById('restricted-viewer-body').innerHTML = fullContent;

        this.closeDetailModal();
        
        const viewerElement = document.getElementById('restricted-viewer-modal');
        viewerElement.classList.remove('hidden');
        setTimeout(() => viewerElement.classList.add('active'), 10);
    }

    closeDetailModal() {
        const modal = document.getElementById('restricted-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }


    attachEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#restricted-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.render();
            });
        }

        // Filter buttons
        const filterButtons = this.container.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        const requestBtn = document.getElementById('request-access-btn');
        if (requestBtn) {
            requestBtn.addEventListener('click', () => this.showAccessDenied());
        }
    }

    showAccessDenied() {
        const accessDeniedOverlay = document.getElementById('access-denied-overlay');
        if (accessDeniedOverlay) {
            accessDeniedOverlay.classList.remove('hidden');
        }
    }

    removeEventListeners() {
        // Component cleanup
    }
}
