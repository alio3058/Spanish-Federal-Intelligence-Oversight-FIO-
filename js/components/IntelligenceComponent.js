/**
 * Intelligence Component
 * Intelligence reports and signal intercepts - briefings, summaries, analytical reports
 */

class IntelligenceComponent extends BaseComponent {
    constructor() {
        super('intelligence-content');
        this.reports = [];
        this.filteredReports = [];
        this.selectedReport = null;
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.viewMode = 'grid'; // 'grid' or 'list'
    }

    render() {
        if (!this.container) return;

        this.reports = mockFiles.filter(file => file.category === 'intelligence');

        this.applyFilters();

        const intelligenceList = this.container.querySelector('#intelligence-list');
        if (!intelligenceList) return;

        intelligenceList.innerHTML = this.renderLayout();

        // Populate the container based on view mode
        const container = this.container.querySelector(`.intelligence-${this.viewMode}`);
        if (container) {
            container.innerHTML = '';
            this.filteredReports.forEach(report => {
                const reportCard = this.createIntelligenceCard(report);
                container.appendChild(reportCard);
            });

            // Show empty state if no results
            if (this.filteredReports.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🔍</div>
                        <h3>No Se Encontraron Informes de Inteligencia</h3>
                        <p class="text-muted">Intente ajustar sus filtros o término de búsqueda</p>
                    </div>
                `;
            }
        }

        // Create detail modal
        this.createDetailModal();
    }

    renderLayout() {
        return `
            <div class="section-toolbar">
                <div class="toolbar-left">
                    <div class="search-bar">
                        <input type="text" 
                               id="intelligence-search" 
                               class="search-input" 
                               placeholder="🔍 Buscar informes de inteligencia..."
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
                    <div class="view-toggle">
                        <button class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}" data-view="grid" title="Vista de Cuadrícula">⊞</button>
                        <button class="view-btn ${this.viewMode === 'list' ? 'active' : ''}" data-view="list" title="Vista de Lista">☰</button>
                    </div>
                    <div class="count-badge intel-badge">
                        <span class="count-number">${this.filteredReports.length}</span>
                        <span class="count-label">Informes</span>
                    </div>
                </div>
            </div>
            <div class="intelligence-${this.viewMode}"></div>
        `;
    }

    applyFilters() {
        this.filteredReports = this.reports.filter(report => {
            // Apply tier filter
            let tierMatch = true;
            if (this.currentFilter === 'tier1') tierMatch = report.classification === 1;
            else if (this.currentFilter === 'tier2') tierMatch = report.classification === 2;
            else if (this.currentFilter === 'tier3') tierMatch = report.classification === 3;

            // Apply search filter
            let searchMatch = true;
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                searchMatch = report.name.toLowerCase().includes(query) ||
                             (report.summary && report.summary.toLowerCase().includes(query));
            }

            return tierMatch && searchMatch;
        });
    }

    createIntelligenceCard(report) {
        const div = document.createElement('div');
        div.className = this.viewMode === 'grid' ? 'intelligence-card clickable' : 'intelligence-list-item clickable';
        div.dataset.reportId = report.id;
        
        const classificationClass = report.classification === 1 ? 'tier-1' : 
                                   report.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = report.classification === 1 ? 'ULTRA SECRETO' :
                                  report.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';

        if (this.viewMode === 'grid') {
            div.innerHTML = `
                <div class="card-header">
                    <div class="classification-badge ${classificationClass}">${classificationText}</div>
                    <div class="intel-type-badge">📊 ANALÍTICO</div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${report.name}</h3>
                    ${report.summary ? `<p class="card-summary">${report.summary}</p>` : ''}
                </div>
                <div class="card-footer">
                    <span class="card-meta">
                        <span class="meta-icon">📅</span>
                        <span class="meta-text">${report.lastModified}</span>
                    </span>
                    <span class="status-badge status-${report.status.toLowerCase().replace(/\s/g, '-')}">${report.status}</span>
                </div>
                <div class="card-actions">
                    <button class="card-action-btn" title="Ver Informe Completo">👁️</button>
                    <button class="card-action-btn" title="Añadir al Briefing">📋</button>
                    <button class="card-action-btn" title="Compartir">🔗</button>
                </div>
            `;
        } else {
            div.innerHTML = `
                <div class="list-item-left">
                    <div class="classification-badge ${classificationClass}">${classificationText}</div>
                    <div class="list-item-content">
                        <h3 class="list-item-title">${report.name}</h3>
                        ${report.summary ? `<p class="list-item-summary">${report.summary}</p>` : ''}
                    </div>
                </div>
                <div class="list-item-right">
                    <span class="card-meta">
                        <span class="meta-icon">📅</span>
                        <span class="meta-text">${report.lastModified}</span>
                    </span>
                    <span class="status-badge status-${report.status.toLowerCase().replace(/\s/g, '-')}">${report.status}</span>
                    <button class="btn-icon" title="Ver Detalles">→</button>
                </div>
            `;
        }

        div.addEventListener('click', (e) => {
            // Don't trigger if clicking action buttons
            if (e.target.classList.contains('card-action-btn')) {
                e.stopPropagation();
                return;
            }
            this.showIntelligenceDetail(report);
        });

        return div;
    }

    showIntelligenceDetail(report) {
        this.selectedReport = report;
        const modal = document.getElementById('intelligence-detail-modal');
        if (!modal) return;
        const classificationClass = report.classification === 1 ? 'tier-1' : 
                                   report.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = report.classification === 1 ? 'ULTRA SECRETO' :
                                  report.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';

        modal.querySelector('#intel-detail-classification').className = `classification-badge ${classificationClass}`;
        modal.querySelector('#intel-detail-classification').textContent = classificationText;
        modal.querySelector('#intel-detail-name').textContent = report.name;
        modal.querySelector('#intel-detail-status').textContent = report.status;
        modal.querySelector('#intel-detail-date').textContent = report.lastModified;
        modal.querySelector('#intel-detail-type').textContent = 'Informe Analítico';
        modal.querySelector('#intel-detail-summary').textContent = report.summary || 'No hay resumen disponible.';

        modal.classList.remove('hidden');
    }

    attachEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#intelligence-search');
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

        // View toggle buttons
        const viewButtons = this.container.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.viewMode = e.target.dataset.view;
                this.render();
            });
        });

        // Modal close
        const modalClose = document.querySelector('#intelligence-detail-modal .detail-modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                document.getElementById('intelligence-detail-modal').classList.add('hidden');
            });
        }
    }

    removeEventListeners() {
        // Event listeners are attached to elements that get recreated on render
    }

    createDetailModal() {
        let modal = document.getElementById('intelligence-detail-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'intelligence-detail-modal';
            modal.className = 'document-summary-modal hidden';
            modal.innerHTML = `
                <div class="document-summary-content">
                    <button class="modal-close-btn">✕</button>
                    <div class="summary-header">
                        <div id="intel-summary-classification" class="file-classification"></div>
                        <h2 id="intel-summary-title"></h2>
                    </div>
                    <div class="summary-body">
                        <div class="summary-info-grid">
                            <div class="summary-info-item">
                                <label>Nivel de Clasificación:</label>
                                <span id="intel-summary-tier"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Estado:</label>
                                <span id="intel-summary-status"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Fecha del Informe:</label>
                                <span id="intel-summary-date"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Nivel de Acceso:</label>
                                <span id="intel-summary-access"></span>
                            </div>
                        </div>
                        <div class="summary-executive">
                            <h3>Resumen de Inteligencia</h3>
                            <p id="intel-summary-executive-text"></p>
                        </div>
                    </div>
                    <div class="summary-actions">
                        <button class="btn btn-secondary" id="intel-btn-view-summary">📄 Ver Resumen</button>
                        <button class="btn btn-primary" id="intel-btn-open-document">📂 Abrir Informe Completo</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const closeBtn = modal.querySelector('.modal-close-btn');
            closeBtn.addEventListener('click', () => this.closeDetailModal());

            const openBtn = modal.querySelector('#intel-btn-open-document');
            openBtn.addEventListener('click', () => this.openDocumentViewer());

            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeDetailModal();
            });
        }
    }

    createDocumentViewer() {
        let viewer = document.getElementById('intel-viewer-modal');
        if (!viewer) {
            viewer = document.createElement('div');
            viewer.id = 'intel-viewer-modal';
            viewer.className = 'document-viewer-modal hidden';
            viewer.innerHTML = `
                <div class="document-viewer-container">
                    <div class="viewer-toolbar">
                        <button class="viewer-close-btn">✕ Cerrar Informe</button>
                        <h3 id="intel-viewer-doc-title" class="viewer-title"></h3>
                        <div class="viewer-toolbar-actions">
                            <button class="viewer-btn" title="Imprimir" onclick="window.print()">🖨️</button>
                            <button class="viewer-btn" title="Exportar" onclick="alert('Funcionalidad de exportación restringida')">💾</button>
                        </div>
                    </div>
                    <div class="document-viewer-content">
                        <div id="intel-viewer-body" class="classified-document-wrapper"></div>
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
        const docId = `INT-2026-SFI-${String(doc.id).padStart(5, '0')}`;
        const dateObj = new Date(doc.lastModified);
        const formattedDate = dateObj.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        }).toUpperCase();
        
        return `
            <div class="classification-banner top-banner">
                ${classificationText} // INFORME DE INTELIGENCIA
            </div>

            <header class="document-header">
                <div class="header-grid">
                    <div class="header-item">
                        <span class="label">CLASIFICACIÓN:</span>
                        <span class="value classification-level">${classificationText}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">ID DEL INFORME:</span>
                        <span class="value">${docId}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">FECHA DEL INFORME:</span>
                        <span class="value">${formattedDate}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">DISTRIBUCIÓN:</span>
                        <span class="value">RESTRINGIDO</span>
                    </div>
                </div>
                
                <div class="warning-banner">
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-text">
                        <strong>ADVERTENCIA:</strong> Este informe de inteligencia contiene información clasificada. La divulgación no autorizada está prohibida. Manejar de acuerdo con los protocolos de seguridad aplicables.
                    </div>
                </div>
            </header>

            <h1 class="document-title">
                INFORME ANALÍTICO DE INTELIGENCIA: ${doc.name.replace('.pdf', '').toUpperCase()}
            </h1>

            <section class="document-section">
                <h2 class="section-title">RESUMEN EJECUTIVO</h2>
                <div class="section-content">
                    <p>${doc.summary}</p>
                    <p>
                        Este informe sintetiza inteligencia de 
                        <span class="redacted">███</span> fuentes incluyendo SIGINT, HUMINT e informes de fuentes abiertas. Análisis realizado por <span class="redacted-block">████████████████</span> 
                        con apoyo de agencias de inteligencia asociadas. Los hallazgos representan una evaluación de alta confianza 
                        basada en corroboración de múltiples fuentes.
                    </p>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">FUENTES DE INTELIGENCIA</h2>
                <div class="section-content">
                    <table class="intel-table">
                        <thead>
                            <tr>
                                <th>Tipo de Fuente</th>
                                <th>Método de Recolección</th>
                                <th>Fiabilidad</th>
                                <th>Confianza</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>SIGINT</td>
                                <td><span class="redacted-long">████████████████████████</span></td>
                                <td><span class="threat-high">Altamente Fiable</span></td>
                                <td>95%</td>
                            </tr>
                            <tr>
                                <td>HUMINT</td>
                                <td>Activo de Campo <span class="redacted">████-████</span></td>
                                <td><span class="threat-high">Altamente Fiable</span></td>
                                <td>90%</td>
                            </tr>
                            <tr>
                                <td>OSINT</td>
                                <td>Fuentes Públicas y Análisis de Medios</td>
                                <td><span class="threat-medium">Moderadamente Fiable</span></td>
                                <td>75%</td>
                            </tr>
                            <tr>
                                <td>TECHINT</td>
                                <td><span class="redacted-block">████████████████</span></td>
                                <td><span class="threat-critical">Extremadamente Fiable</span></td>
                                <td>98%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">KEY FINDINGS</h2>
                <div class="section-content">
                    <div class="incident-box">
                        <div class="incident-header">
                            <span class="incident-label">PRIORITY FINDING:</span> 
                            <span class="severity-critical">CRITICAL</span>
                        </div>
                        
                        <p>
                            Intelligence indicates <span class="redacted-long">████████████████████████████████████</span>
                            operation targeting <span class="redacted-block">████████████████</span>. 
                            Multiple sources confirm elevated threat posture and accelerated timeline.
                        </p>
                        
                        <ul>
                            <li><strong>Threat Actor:</strong> <span class="redacted-block">████████████████</span> (Nation-State affiliated)</li>
                            <li><strong>Target Set:</strong> <span class="redacted-long">████████████████████████████</span></li>
                            <li><strong>Capability Assessment:</strong> Advanced persistent threat with demonstrated cyber capabilities</li>
                            <li><strong>Intent:</strong> <span class="redacted">████████████████</span> operations for strategic advantage</li>
                            <li><strong>Timeline:</strong> Indicators suggest activity within <span class="redacted">██-██</span> days</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h3 class="subsection-title">Supporting Analysis</h3>
                        <p>
                            SIGINT collection from <span class="redacted-block">████████████████</span> 
                            platform identified <span class="redacted">███</span> communications between 
                            known threat actors. Traffic analysis reveals coordination patterns consistent 
                            with pre-operational planning phase.
                        </p>
                        <p>
                            HUMINT reporting from asset <span class="redacted">████-████</span> corroborates 
                            technical intelligence. Source reports direct observation of 
                            <span class="redacted-long">████████████████████████████████</span> activities 
                            at facility near <span class="redacted">████████████</span>.
                        </p>
                        <div class="redacted-paragraph">
                            <p class="fully-redacted">████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">EVALUACIÓN DE AMENAZA</h2>
                <div class="section-content">
                    <div class="subsection">
                        <h3 class="subsection-title">Análisis de Capacidad</h3>
                        <ul class="timeline-list">
                            <li><strong>Sofisticación Técnica:</strong> Capacidades avanzadas demostradas en el dominio <span class="redacted">████████████</span></li>
                            <li><strong>Acceso a Recursos:</strong> Apoyo a nivel estatal proporcionando financiamiento estimado en <span class="redacted">$██M - $███M</span></li>
                            <li><strong>Seguridad Operacional:</strong> Compartimentación de alto nivel y tradecraft sugieren entrenamiento profesional de inteligencia</li>
                            <li><strong>Infraestructura:</strong> Aprovechando la red <span class="redacted-block">████████████████</span> para operaciones</li>
                        </ul>
                    </div>

                    <div class="subsection">
                        <h3 class="subsection-title">Evaluación de Intención</h3>
                        <p>
                            El análisis de patrones de selección de objetivos y preparaciones operacionales indica intención de 
                            <span class="redacted-long">████████████████████████████████████</span>. 
                            Los objetivos probablemente incluyen:
                        </p>
                        <ul class="recommendations-list">
                            <li>Recolección de inteligencia <span class="redacted">████████████</span> para ventaja estratégica</li>
                            <li>Interrupción de capacidades <span class="redacted-block">████████████████</span></li>
                            <li>Posicionamiento para operaciones de seguimiento durante escenario de crisis</li>
                            <li>Prueba de respuestas defensivas y capacidades de detección</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">BRECHAS DE INTELIGENCIA</h2>
                <div class="section-content">
                    <ol class="recommendations-list">
                        <li>El cronograma específico para la ejecución operacional permanece poco claro - se requiere asignación adicional de SIGINT</li>
                        <li>El alcance completo del conjunto de objetivos aún no ha sido identificado - se recomienda vigilancia mejorada de <span class="redacted">████████████</span></li>
                        <li>Se necesita confirmación de la participación de <span class="redacted-block">████████████████</span> a través del desarrollo de HUMINT</li>
                        <li>Se requiere análisis técnico para determinar el alcance completo de las capacidades <span class="redacted">████████████</span></li>
                        <li>Se necesita intercambio de inteligencia con naciones asociadas para completar el panorama de amenazas</li>
                    </ol>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">ACCIONES RECOMENDADAS</h2>
                <div class="section-content">
                    <ol class="recommendations-list">
                        <li>Elevar la postura defensiva para el conjunto de objetivos potenciales identificados a nivel de seguridad mejorado</li>
                        <li>Aumentar la recolección SIGINT contra los nodos de comunicación <span class="redacted-block">████████████████</span></li>
                        <li>Asignar activos HUMINT adicionales para confirmación de actividades e intención del actor de amenaza</li>
                        <li>Coordinar con agencias asociadas <span class="redacted">████████████</span> para intercambio de información</li>
                        <li>Preparar planes de respuesta de contingencia para escenarios de amenaza identificados</li>
                        <li>Informar a las partes interesadas relevantes y responsables de políticas sobre la evaluación de amenazas</li>
                    </ol>
                </div>
            </section>

            <footer class="document-footer">
                <div class="footer-grid">
                    <div class="footer-item">
                        <span class="label">PREPARADO POR:</span>
                        <span class="value"><span class="redacted">████████████████</span>, Unidad Analítica</span>
                    </div>
                    <div class="footer-item">
                        <span class="label">REVISADO POR:</span>
                        <span class="value"><span class="redacted">████████████████</span>, Analista Jefe</span>
                    </div>
                    <div class="footer-item">
                        <span class="label">DISTRIBUCIÓN:</span>
                        <span class="value">RESTRINGIDO - NOFORN</span>
                    </div>
                </div>
                <div class="declassification-note">
                    DESCLASIFICAR EL: <span class="redacted">████████████</span> | PROTECCIÓN DE FUENTE REQUERIDA
                </div>
            </footer>
        `;
    }

    showIntelligenceDetail(report) {
        this.selectedReport = report;
        const modal = document.getElementById('intelligence-detail-modal');
        if (!modal) return;

        const classificationClass = report.classification === 1 ? 'tier-1' : 
                                   report.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = report.classification === 1 ? 'ULTRA SECRETO' :
                                  report.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';
        const tierText = report.classification === 1 ? 'Nivel 1 - Ultra Secreto' :
                        report.classification === 2 ? 'Nivel 2 - Confidencial' : 'Nivel 3 - Restringido';

        document.getElementById('intel-summary-classification').className = `file-classification ${classificationClass}`;
        document.getElementById('intel-summary-classification').textContent = classificationText;
        document.getElementById('intel-summary-title').textContent = report.name;
        document.getElementById('intel-summary-tier').textContent = tierText;
        document.getElementById('intel-summary-status').textContent = report.status;
        document.getElementById('intel-summary-date').textContent = report.lastModified;
        document.getElementById('intel-summary-access').textContent = report.access === 'granted' ? '✓ Acceso Concedido' : '✗ Acceso Denegado';
        document.getElementById('intel-summary-executive-text').textContent = report.summary || 'No hay resumen disponible.';

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
    }

    openDocumentViewer() {
        if (!this.selectedReport) return;

        const viewer = document.getElementById('intel-viewer-modal');
        const doc = this.selectedReport;
        
        document.getElementById('intel-viewer-doc-title').textContent = doc.name;
        
        const fullContent = this.generateFullContent(doc);
        document.getElementById('intel-viewer-body').innerHTML = fullContent;

        this.closeDetailModal();
        
        viewer.classList.remove('hidden');
        setTimeout(() => viewer.classList.add('active'), 10);
    }

    closeDocumentViewer() {
        const viewer = document.getElementById('intel-viewer-modal');
        viewer.classList.remove('active');
        setTimeout(() => viewer.classList.add('hidden'), 300);
    }

    closeDetailModal() {
        const modal = document.getElementById('intelligence-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }

    render() {
        if (!this.container) return;

        this.reports = mockFiles.filter(file => file.category === 'intelligence');

        this.applyFilters();

        const intelligenceList = this.container.querySelector('#intelligence-list');
        if (!intelligenceList) return;

        intelligenceList.innerHTML = this.renderLayout();

        // Populate the container based on view mode
        const container = this.container.querySelector(`.intelligence-${this.viewMode}`);
        if (container) {
            container.innerHTML = '';
            this.filteredReports.forEach(report => {
                const reportCard = this.createIntelligenceCard(report);
                container.appendChild(reportCard);
            });

            // Show empty state if no results
            if (this.filteredReports.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🔍</div>
                        <h3>No Se Encontraron Informes de Inteligencia</h3>
                        <p class="text-muted">Intente ajustar sus filtros o término de búsqueda</p>
                    </div>
                `;
            }
        }

        // Create modals
        this.createDetailModal();
        this.createDocumentViewer();
    }
}

