/**
 * Documents Component
 * Displays document database and file management
 */

class DocumentsComponent extends BaseComponent {
    constructor() {
        super('documents-content');
        this.documents = [];
        this.selectedDocument = null;
        this.filteredDocuments = [];
        this.currentFilter = 'all'; // 'all', 'tier1', 'tier2', 'tier3'
        this.searchQuery = '';
    }

    render() {
        if (!this.container) return;

        // Get mock documents
        this.documents = mockFiles.filter(file => 
            file.category === 'documents' || file.category === 'archive'
        );

        // Apply filters
        this.applyFilters();

        const fileListContainer = this.container.querySelector('#file-list');
        if (!fileListContainer) return;

        // Render the complete layout with filters and search
        fileListContainer.innerHTML = this.renderLayout();

        // Populate the grid
        const gridContainer = this.container.querySelector('.documents-grid');
        if (gridContainer) {
            gridContainer.innerHTML = '';
            this.filteredDocuments.forEach(doc => {
                const fileCard = this.createFileCard(doc);
                gridContainer.appendChild(fileCard);
            });

            // Show empty state if no results
            if (this.filteredDocuments.length === 0) {
                gridContainer.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📄</div>
                        <h3>No Se Encontraron Documentos</h3>
                        <p class="text-muted">Intente ajustar sus filtros o consulta de búsqueda</p>
                    </div>
                `;
            }
        }

        // Update count
        this.updateCount();

        // Create modals
        this.createDetailModal();
    }

    renderLayout() {
        return `
            <div class="section-toolbar">
                <div class="toolbar-left">
                    <div class="search-bar">
                        <input type="text" 
                               id="documents-search" 
                               class="search-input" 
                               placeholder="🔍 Buscar documentos..."
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
                    <div class="count-badge" id="documents-count">
                        <span class="count-number">${this.filteredDocuments.length}</span>
                        <span class="count-label">Documentos</span>
                    </div>
                </div>
            </div>
            <div class="documents-grid"></div>
        `;
    }

    applyFilters() {
        this.filteredDocuments = this.documents.filter(doc => {
            // Apply tier filter
            let tierMatch = true;
            if (this.currentFilter === 'tier1') tierMatch = doc.classification === 1;
            else if (this.currentFilter === 'tier2') tierMatch = doc.classification === 2;
            else if (this.currentFilter === 'tier3') tierMatch = doc.classification === 3;

            // Apply search filter
            let searchMatch = true;
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                searchMatch = doc.name.toLowerCase().includes(query) ||
                             (doc.summary && doc.summary.toLowerCase().includes(query));
            }

            return tierMatch && searchMatch;
        });
    }

    updateCount() {
        const countBadge = this.container.querySelector('#documents-count .count-number');
        if (countBadge) {
            countBadge.textContent = this.filteredDocuments.length;
        }
    }

    createFileCard(doc) {
        const div = document.createElement('div');
        div.className = 'document-card clickable';
        div.dataset.docId = doc.id;
        
        const classificationClass = doc.classification === 1 ? 'tier-1' : 
                                   doc.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = doc.classification === 1 ? 'ULTRA SECRETO' :
                                  doc.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';

        div.innerHTML = `
            <div class="card-header">
                <div class="classification-badge ${classificationClass}">${classificationText}</div>
                <div class="status-badge status-${doc.status.toLowerCase().replace(/\s/g, '-')}">${doc.status}</div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${doc.name}</h3>
                ${doc.summary ? `<p class="card-summary">${doc.summary}</p>` : ''}
            </div>
            <div class="card-footer">
                <span class="card-meta">
                    <span class="meta-icon">📅</span>
                    <span class="meta-text">${doc.lastModified}</span>
                </span>
                <button class="btn btn-sm btn-primary view-doc-btn">Ver →</button>
            </div>
        `;

        // Click handler for View button
        const viewBtn = div.querySelector('.view-doc-btn');
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectedDocument = doc;
            this.openDocumentViewer();
        });

        // Click handler for whole card
        div.addEventListener('click', () => {
            this.selectedDocument = doc;
            this.openDocumentViewer();
        });

        return div;
    }

    showDocumentDetail(doc) {
        this.selectedDocument = doc;
        const modal = document.getElementById('document-detail-modal');
        if (!modal) return;

        const classificationClass = doc.classification === 1 ? 'tier-1' : 
                                   doc.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = doc.classification === 1 ? 'TOP SECRET' :
                                  doc.classification === 2 ? 'CONFIDENTIAL' : 'RESTRICTED';
        const tierText = doc.classification === 1 ? 'Tier 1 - Top Secret' :
                        doc.classification === 2 ? 'Tier 2 - Confidential' : 'Tier 3 - Restricted';

        document.getElementById('summary-classification').className = `file-classification ${classificationClass}`;
        document.getElementById('summary-classification').textContent = classificationText;
        document.getElementById('summary-title').textContent = doc.name;
        document.getElementById('summary-tier').textContent = tierText;
        document.getElementById('summary-status').textContent = doc.status;
        document.getElementById('summary-date').textContent = doc.lastModified;
        document.getElementById('summary-access').textContent = doc.access === 'granted' ? '✓ Acceso Concedido' : '✗ Acceso Denegado';
        document.getElementById('summary-executive-text').textContent = doc.summary || 'No hay resumen ejecutivo disponible.';

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
    }

    attachEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#documents-search');
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
    }

    removeEventListeners() {
        // Event listeners are attached to elements that get recreated on render
        // So cleanup happens automatically
    }

    createDetailModal() {
        let modal = document.getElementById('document-detail-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'document-detail-modal';
            modal.className = 'document-summary-modal hidden';
            modal.innerHTML = `
                <div class="document-summary-content">
                    <button class="modal-close-btn">✕</button>
                    <div class="summary-header">
                        <div id="summary-classification" class="file-classification"></div>
                        <h2 id="summary-title"></h2>
                    </div>
                    <div class="summary-body">
                        <div class="summary-info-grid">
                            <div class="summary-info-item">
                                <label>Nivel de Clasificación:</label>
                                <span id="summary-tier"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Estado:</label>
                                <span id="summary-status"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Última Modificación:</label>
                                <span id="summary-date"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Nivel de Acceso:</label>
                                <span id="summary-access"></span>
                            </div>
                        </div>
                        <div class="summary-executive">
                            <h3>Resumen Ejecutivo</h3>
                            <p id="summary-executive-text"></p>
                        </div>
                    </div>
                    <div class="summary-actions">
                        <button class="btn btn-secondary" id="btn-view-summary">📄 Ver Resumen</button>
                        <button class="btn btn-primary" id="btn-open-document">📂 Abrir Documento Completo</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const closeBtn = modal.querySelector('.modal-close-btn');
            closeBtn.addEventListener('click', () => this.closeDetailModal());

            const openBtn = modal.querySelector('#btn-open-document');
            openBtn.addEventListener('click', () => this.openDocumentViewer());

            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeDetailModal();
            });
        }

        // Create document viewer modal
        this.createDocumentViewer();
    }

    createDocumentViewer() {
        let viewer = document.getElementById('document-viewer-modal');
        if (!viewer) {
            viewer = document.createElement('div');
            viewer.id = 'document-viewer-modal';
            viewer.className = 'document-viewer-modal hidden';
            viewer.innerHTML = `
                <div class="document-viewer-container">
                    <div class="viewer-toolbar">
                        <button class="viewer-close-btn">✕ Cerrar Documento</button>
                        <h3 id="viewer-doc-title" class="viewer-title"></h3>
                        <div class="viewer-toolbar-actions">
                            <button class="viewer-btn" title="Imprimir" onclick="window.print()">🖨️</button>
                            <button class="viewer-btn" title="Exportar" onclick="alert('Función de exportación restringida')">💾</button>
                        </div>
                    </div>
                    <div class="document-viewer-content">
                        <div id="document-viewer-body" class="classified-document-wrapper"></div>
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

    showDocumentDetail(doc) {
        this.selectedDocument = doc;
        const modal = document.getElementById('document-detail-modal');
        
        const classificationClass = doc.classification === 1 ? 'tier-1' : 
                                   doc.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = doc.classification === 1 ? 'ULTRA SECRETO' :
                                  doc.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';
        const tierText = doc.classification === 1 ? 'Nivel 1 - Ultra Secreto' :
                        doc.classification === 2 ? 'Nivel 2 - Confidencial' : 'Nivel 3 - Restringido';

        document.getElementById('summary-classification').className = `file-classification ${classificationClass}`;
        document.getElementById('summary-classification').textContent = classificationText;
        document.getElementById('summary-title').textContent = doc.name;
        document.getElementById('summary-tier').textContent = tierText;
        document.getElementById('summary-status').textContent = doc.status;
        document.getElementById('summary-date').textContent = doc.lastModified;
        document.getElementById('summary-access').textContent = doc.access === 'granted' ? '✓ Acceso Concedido' : '✗ Acceso Denegado';
        document.getElementById('summary-executive-text').textContent = doc.summary || 'Resumen ejecutivo no disponible.';

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
    }

    openDocumentViewer() {
        if (!this.selectedDocument) return;

        const viewer = document.getElementById('document-viewer-modal');
        const doc = this.selectedDocument;
        
        document.getElementById('viewer-doc-title').textContent = doc.name;
        
        const fullContent = this.generateFullContent(doc);
        document.getElementById('document-viewer-body').innerHTML = fullContent;

        this.closeDetailModal();
        
        viewer.classList.remove('hidden');
        setTimeout(() => viewer.classList.add('active'), 10);
    }

    closeDocumentViewer() {
        const viewer = document.getElementById('document-viewer-modal');
        viewer.classList.remove('active');
        setTimeout(() => viewer.classList.add('hidden'), 300);
    }

    closeDetailModal() {
        const modal = document.getElementById('document-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }

    generateFullContent(doc) {
        const classificationText = doc.classification === 1 ? 'ULTRA SECRETO' :
                                  doc.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';
        const docId = `DOC-2026-FIO-${String(doc.id).padStart(5, '0')}`;
        const dateObj = new Date(doc.lastModified);
        const formattedDate = dateObj.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        }).toUpperCase();
        
        // Generate realistic declassified document content with enhanced styling
        return `
            <!-- Banner de Clasificación Superior -->
            <div class="classification-banner top-banner">
                ${classificationText} // ACCESO ESPECIAL REQUERIDO
            </div>

            <!-- Encabezado del Documento -->
            <header class="document-header">
                <div class="header-grid">
                    <div class="header-item">
                        <span class="label">CLASIFICACIÓN:</span>
                        <span class="value classification-level">${classificationText}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">ID DEL DOCUMENTO:</span>
                        <span class="value">${docId}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">FECHA:</span>
                        <span class="value">${formattedDate}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">ORIGINADOR:</span>
                        <span class="value">SUPERVISIÓN FEDERAL DE INTELIGENCIA</span>
                    </div>
                </div>
                
                <!-- Banner de Advertencia -->
                <div class="warning-banner">
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-text">
                        <strong>ADVERTENCIA:</strong> Este documento contiene información que afecta la seguridad nacional dentro del significado de las Leyes de Espionaje. La transmisión o revelación de su contenido de cualquier manera a una persona no autorizada está prohibida por ley.
                    </div>
                </div>
            </header>

            <!-- Título del Documento -->
            <h1 class="document-title">
                ${doc.name.replace('.pdf', '').replace('.docx', '').toUpperCase()}
            </h1>

            <!-- Sección de Resumen Ejecutivo -->
            <section class="document-section">
                <h2 class="section-title">RESUMEN EJECUTIVO</h2>
                <div class="section-content">
                    <p>${doc.summary}</p>
                    <p>
                        Esta evaluación de inteligencia fue compilada de múltiples fuentes clasificadas incluyendo 
                        <span class="redacted">████████████</span> y cubre actividades observadas durante 
                        ${this.getDateRange(doc.lastModified)}. Los hallazgos clave requieren atención inmediata de 
                        <span class="redacted-block">████████████████</span> oficinas de campo.
                    </p>
                </div>
            </section>

            <!-- Background Section -->
            <section class="document-section">
                <h2 class="section-title">BACKGROUND</h2>
            <!-- Sección de Antecedentes -->
            <section class="document-section">
                <h2 class="section-title">ANTECEDENTES</h2>
                <div class="section-content">
                    <p>
                        Las operaciones de recopilación de inteligencia realizadas entre ${this.getDateRange(doc.lastModified)} 
                        han arrojado hallazgos significativos relevantes para los intereses de seguridad nacional. El sujeto 
                        <span class="redacted">████████████</span> (designado: CARDINAL) fue observado haciendo 
                        contacto con <span class="redacted-block">████████████████████</span>.
                    </p>
                    
                    <div class="subsection">
                        <h3 class="subsection-title">Fuentes de Inteligencia Clave</h3>
                        <ul class="timeline-list">
                            <li><strong>HUMINT:</strong> Inteligencia humana de <span class="redacted">███</span> activos de campo</li>
                            <li><strong>SIGINT:</strong> Inteligencia de señales vía <span class="redacted-block">████████████</span></li>
                            <li><strong>OSINT:</strong> Correlación y análisis de inteligencia de fuentes abiertas</li>
                            <li><strong>TECHINT:</strong> Inteligencia técnica de <span class="redacted-long">████████████████████████████</span></li>
                        </ul>
                    </div>

                    <p>
                        Múltiples fuentes han sido correlacionadas para establecer una evaluación integral de amenazas. 
                        El despliegue de activos incluyó <span class="redacted">███</span> agentes de campo y coordinación 
                        con <span class="redacted-block">████████████████</span> servicios de inteligencia extranjeros.
                    </p>
                </div>
            </section>

            <!-- Sección de Informe de Incidente -->
            <section class="document-section">
                <h2 class="section-title">ANÁLISIS DETALLADO</h2>
                <div class="section-content">
                    <div class="incident-box">
                        <div class="incident-header">
                            <span class="incident-label">Nº DE CASO:</span> ${docId}
                            <span class="incident-label">PRIORIDAD:</span> 
                            <span class="severity-high">${doc.classification === 1 ? 'CRÍTICO' : 'ALTO'}</span>
                        </div>
                        
                        <p>
                            El <span class="redacted">██/██/████</span> aproximadamente a las 
                            <span class="redacted">████</span> horas, los equipos de vigilancia observaron actividades 
                            consistentes con <span class="redacted-block">████████████████████████</span> 
                            en la ubicación designada CASA SEGURA BRAVO.
                        </p>
                        
                        <div class="redacted-paragraph">
                            <p class="fully-redacted">████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████</p>
                        </div>
                        
                        <p>
                            Después del incidente, los equipos tácticos exitosamente 
                            <span class="redacted">████████████████</span> sin bajas civiles. 
                            La evidencia recuperada incluye <span class="redacted">███</span> dispositivos encriptados, 
                            <span class="redacted-block">████████████████</span>, y documentación.
                        </p>
                    </div>

                    <h3>Hallazgos Clave</h3>
                    <ul>
                        <li>La inteligencia operacional indica niveles de amenaza elevados en sectores designados</li>
                        <li>Protocolos de identificación y rastreo de activos implementados exitosamente</li>
                        <li>Interceptaciones de comunicaciones revelan actividades coordinadas en <span class="redacted-block">████████████</span></li>
                        <li>Contramedidas recomendadas distribuidas a <span class="redacted">███</span> oficinas de campo</li>
                        <li>Protocolos de vigilancia mejorados activados para sujetos <span class="redacted-long">████████████████████████████</span></li>
                    </ul>
                </div>
            </section>

            <!-- Evaluación de Inteligencia -->
            <section class="document-section">
                <h2 class="section-title">EVALUACIÓN DE INTELIGENCIA</h2>
                <div class="section-content">
                    <table class="intel-table">
                        <thead>
                            <tr>
                                <th>Sujeto</th>
                                <th>Designación</th>
                                <th>Nivel de Amenaza</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span class="redacted">████████████</span></td>
                                <td>CARDINAL</td>
                                <td><span class="threat-critical">CRÍTICO</span></td>
                                <td>BAJO VIGILANCIA</td>
                            </tr>
                            <tr>
                                <td><span class="redacted">████████████</span></td>
                                <td>SPARROW</td>
                                <td><span class="threat-high">ALTO</span></td>
                                <td>MONITOREADO</td>
                            </tr>
                            <tr>
                                <td><span class="redacted">████████████</span></td>
                                <td>RAVEN</td>
                                <td><span class="threat-medium">MEDIO</span></td>
                                <td>EN INVESTIGACIÓN</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Recomendaciones -->
            <section class="document-section">
                <h2 class="section-title">RECOMENDACIONES</h2>
                <div class="section-content">
                    <ol class="recommendations-list">
                        <li>Mantener vigilancia intensificada sobre objetivos identificados y redes asociadas</li>
                        <li>Coordinar con <span class="redacted-block">████████████████</span> para cobertura integral</li>
                        <li>Implementar protocolos de seguridad mejorados para operaciones sensibles en la región <span class="redacted">████████</span></li>
                        <li>Desplegar recursos adicionales para monitorear al sujeto RAVEN y contactos afiliados</li>
                        <li>Continuar recolección de inteligencia con alcance ampliado según autorización <span class="redacted">████████</span></li>
                        <li>Mantener estado clasificado pendiente de revisión y aprobación de <span class="redacted">████████</span></li>
                    </ol>
                </div>
            </section>

            <!-- Distribución -->
            <section class="document-section">
                <h2 class="section-title">DISTRIBUCIÓN</h2>
                <div class="section-content">
                    <p>
                        Este documento está autorizado para distribución al personal con autorización de seguridad apropiada 
                        (${classificationText} o superior) y necesidad de conocer demostrada. 
                        La divulgación no autorizada puede resultar en sanciones severas bajo la ley federal.
                    </p>
                </div>
            </section>

            <!-- Pie de Documento -->
            <footer class="document-footer">
                <div class="footer-grid">
                    <div class="footer-item">
                        <span class="label">PREPARADO POR:</span>
                        <span class="value"><span class="redacted">████████████████</span></span>
                    </div>
                    <div class="footer-item">
                        <span class="label">REVISADO POR:</span>
                        <span class="value"><span class="redacted">████████████████</span></span>
                    </div>
                    <div class="footer-item">
                        <span class="label">APROBADO POR:</span>
                        <span class="value"><span class="redacted">████████████████</span></span>
                    </div>
                </div>
                <div class="declassification-note">
                    DESCLASIFICAR EL: <span class="redacted">████████████</span> O AL COMPLETAR LA INVESTIGACIÓN
                </div>
            </footer>
        `;
    }

    getDateRange(endDate) {
        const end = new Date(endDate);
        const start = new Date(end);
        start.setMonth(start.getMonth() - 3);
        return `${start.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })} - ${end.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}`;
    }

    attachEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#documents-search');
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
    }

    removeEventListeners() {
        // Component cleanup
    }
}
