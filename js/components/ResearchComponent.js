/**
 * Research Component
 * Research papers and analytical documents
 */

class ResearchComponent extends BaseComponent {
    constructor() {
        super('research-content');
        this.research = [];
        this.filteredResearch = [];
        this.selectedDocument = null;
        this.currentFilter = 'all';
        this.searchQuery = '';
    }

    render() {
        if (!this.container) return;

        this.research = mockFiles.filter(file => file.category === 'research');
        this.applyFilters();

        // Create container if it doesn't exist
        let researchPanel = this.container.querySelector('.panel');
        if (!researchPanel) {
            this.container.innerHTML = `
                <section class="panel-section">
                    <div class="panel">
                        <div class="panel-header">
                            <h2>Archivo de Investigación</h2>
                            <span class="badge">${this.filteredResearch.length} Documentos</span>
                        </div>
                        <div class="panel-content">
                            <div class="section-toolbar">
                                <div class="toolbar-left">
                                    <div class="search-bar">
                                        <input type="text" 
                                               id="research-search" 
                                               class="search-input" 
                                               placeholder="🔍 Buscar documentos de investigación..."
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
                                </div>
                            </div>
                            <div id="research-grid" class="research-grid"></div>
                        </div>
                    </div>
                </section>
            `;
        }

        const researchGrid = this.container.querySelector('#research-grid');
        if (!researchGrid) return;

        researchGrid.innerHTML = '';
        this.filteredResearch.forEach(item => {
            const card = this.createResearchCard(item);
            researchGrid.appendChild(card);
        });

        if (this.filteredResearch.length === 0) {
            researchGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📄</div>
                    <h3>No Se Encontraron Documentos de Investigación</h3>
                    <p class="text-muted">Intente ajustar sus filtros o términos de búsqueda</p>
                </div>
            `;
        }

        this.createDetailModal();
        this.createDocumentViewer();
    }

    applyFilters() {
        this.filteredResearch = this.research.filter(item => {
            let tierMatch = true;
            if (this.currentFilter === 'tier1') tierMatch = item.classification === 1;
            else if (this.currentFilter === 'tier2') tierMatch = item.classification === 2;
            else if (this.currentFilter === 'tier3') tierMatch = item.classification === 3;

            let searchMatch = true;
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                searchMatch = item.name.toLowerCase().includes(query) ||
                             (item.summary && item.summary.toLowerCase().includes(query));
            }

            return tierMatch && searchMatch;
        });
    }

    createResearchCard(item) {
        const div = document.createElement('div');
        div.className = 'research-card clickable';
        div.dataset.docId = item.id;

        div.innerHTML = `
            <div class="file-classification tier-${item.classification}">${this.getClassificationText(item.classification)}</div>
            <h3 class="research-title">${item.name}</h3>
            ${item.summary ? `<p class="card-summary">${item.summary.substring(0, 100)}...</p>` : ''}
            <p class="research-meta">
                <span>📄 Documento de Investigación</span>
                <span>📅 ${item.lastModified}</span>
            </p>
            <div class="research-status">
                <span class="status-badge">${item.status}</span>
            </div>
        `;

        div.addEventListener('click', () => this.showDocumentDetail(item.id));

        return div;
    }

    getClassificationText(level) {
        switch(level) {
            case 1: return 'ULTRA SECRETO';
            case 2: return 'CONFIDENCIAL';
            case 3: return 'RESTRINGIDO';
            default: return 'NO CLASIFICADO';
        }
    }

    createDetailModal() {
        let modal = document.getElementById('research-detail-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'research-detail-modal';
            modal.className = 'document-summary-modal hidden';
            modal.innerHTML = `
                <div class="document-summary-content">
                    <button class="modal-close-btn">✕</button>
                    <div class="summary-header">
                        <div id="research-summary-classification" class="file-classification"></div>
                        <h2 id="research-summary-title"></h2>
                    </div>
                    <div class="summary-body">
                        <div class="summary-info-grid">
                            <div class="summary-info-item">
                                <label>Nivel de Clasificación:</label>
                                <span id="research-summary-tier"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Estado:</label>
                                <span id="research-summary-status"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Última Modificación:</label>
                                <span id="research-summary-date"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Nivel de Acceso:</label>
                                <span id="research-summary-access"></span>
                            </div>
                        </div>
                        <div class="summary-executive">
                            <h3>Resumen Ejecutivo</h3>
                            <p id="research-summary-executive-text"></p>
                        </div>
                    </div>
                    <div class="summary-actions">
                        <button class="btn btn-secondary" id="research-btn-view-summary">📄 Ver Resumen</button>
                        <button class="btn btn-primary" id="research-btn-open-document">📂 Abrir Documento</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const closeBtn = modal.querySelector('.modal-close-btn');
            closeBtn.addEventListener('click', () => this.closeDetailModal());

            const openBtn = modal.querySelector('#research-btn-open-document');
            openBtn.addEventListener('click', () => this.openDocumentViewer());

            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeDetailModal();
            });
        }
    }

    createDocumentViewer() {
        let viewer = document.getElementById('research-viewer-modal');
        if (!viewer) {
            viewer = document.createElement('div');
            viewer.id = 'research-viewer-modal';
            viewer.className = 'document-viewer-modal hidden';
            viewer.innerHTML = `
                <div class="document-viewer-container">
                    <div class="viewer-toolbar">
                        <button class="viewer-close-btn">✕ Cerrar Documento</button>
                        <h3 id="research-viewer-doc-title" class="viewer-title"></h3>
                        <div class="viewer-toolbar-actions">
                            <button class="viewer-btn" title="Imprimir" onclick="window.print()">🖨️</button>
                            <button class="viewer-btn" title="Exportar" onclick="alert('Funcionalidad de exportación restringida')">💾</button>
                        </div>
                    </div>
                    <div class="document-viewer-content">
                        <div id="research-viewer-body" class="classified-document-wrapper"></div>
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
        const docId = `RS-2026-FIO-${String(doc.id).padStart(5, '0')}`;
        const dateObj = new Date(doc.lastModified);
        const formattedDate = dateObj.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        }).toUpperCase();
        
        return `
            <div class="classification-banner top-banner">
                ${classificationText} // ACCESO ESPECIAL REQUERIDO
            </div>

            <header class="document-header">
                <div class="header-grid">
                    <div class="header-item">
                        <span class="label">CLASIFICACIÓN:</span>
                        <span class="value classification-level">${classificationText}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">ID DE DOCUMENTO:</span>
                        <span class="value">${docId}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">FECHA:</span>
                        <span class="value">${formattedDate}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">CATEGORÍA:</span>
                        <span class="value">INVESTIGACIÓN Y DESARROLLO</span>
                    </div>
                </div>
                
                <div class="warning-banner">
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-text">
                        <strong>ADVERTENCIA:</strong> Este documento de investigación contiene información que afecta la seguridad nacional. La distribución está limitada al personal con las autorizaciones de seguridad apropiadas y autorización de necesidad de conocer.
                    </div>
                </div>
            </header>

            <h1 class="document-title">
                ${doc.name.replace('.pdf', '').replace('.docx', '').toUpperCase()}
            </h1>

            <section class="document-section">
                <h2 class="section-title">RESUMEN</h2>
                <div class="section-content">
                    <p>${doc.summary}</p>
                    <p>
                        Esta investigación fue realizada bajo el programa clasificado 
                        <span class="redacted">████████████</span> con financiamiento de 
                        <span class="redacted-block">████████████████</span>. Los hallazgos de la investigación tienen 
                        implicaciones significativas para las capacidades operacionales en el 
                        dominio <span class="redacted">████████</span>.
                    </p>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">OBJETIVOS DE INVESTIGACIÓN</h2>
                <div class="section-content">
                    <p>
                        Los objetivos principales de investigación incluyen el desarrollo de metodologías avanzadas para 
                        <span class="redacted-block">████████████████████</span> con aplicaciones en 
                        operaciones de recolección y análisis de inteligencia.
                    </p>
                    <ul class="timeline-list">
                        <li>Establecer marco teórico para <span class="redacted-long">████████████████████████████</span></li>
                        <li>Desarrollar protocolos de implementación práctica para despliegue en campo</li>
                        <li>Validar efectividad mediante pruebas controladas con <span class="redacted">███</span> unidades operacionales</li>
                        <li>Evaluar implicaciones de seguridad y requisitos de contramedidas</li>
                    </ul>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">METODOLOGÍA</h2>
                <div class="section-content">
                    <p>
                        La metodología de investigación empleó un enfoque multidisciplinario combinando 
                        técnicas de análisis <span class="redacted">████████████</span> con 
                        protocolos de validación <span class="redacted-block">████████████████</span>.
                    </p>
                    
                    <div class="subsection">
                        <h3 class="subsection-title">Fases de Investigación</h3>
                        <table class="intel-table">
                            <thead>
                                <tr>
                                    <th>Fase</th>
                                    <th>Área de Enfoque</th>
                                    <th>Duración</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Fase 1</td>
                                    <td>Desarrollo Teórico</td>
                                    <td><span class="redacted">██</span> meses</td>
                                    <td><span class="threat-medium">COMPLETADO</span></td>
                                </tr>
                                <tr>
                                    <td>Fase 2</td>
                                    <td>Pruebas de Prototipo</td>
                                    <td><span class="redacted">██</span> meses</td>
                                    <td><span class="threat-medium">COMPLETADO</span></td>
                                </tr>
                                <tr>
                                    <td>Fase 3</td>
                                    <td>Validación de Campo</td>
                                    <td><span class="redacted">██</span> meses</td>
                                    <td><span class="threat-high">EN PROGRESO</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="redacted-paragraph">
                        <p class="fully-redacted">████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████</p>
                    </div>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">HALLAZGOS Y ANÁLISIS</h2>
                <div class="section-content">
                    <div class="incident-box">
                        <div class="incident-header">
                            <span class="incident-label">CLASIFICACIÓN:</span> ${classificationText}
                            <span class="incident-label">SENSIBILIDAD:</span> 
                            <span class="severity-high">ALTA</span>
                        </div>
                        
                        <p>
                            Los hallazgos clave de la investigación demuestran un avance significativo en 
                            capacidades de <span class="redacted-long">████████████████████████████████████</span>. 
                            Los resultados de las pruebas superaron las métricas de rendimiento proyectadas en 
                            <span class="redacted">███</span>%.
                        </p>
                        
                        <h3>Observaciones Críticas</h3>
                        <ul>
                            <li>La implementación de protocolos <span class="redacted-block">████████████████</span> resultó en eficiencia operacional mejorada</li>
                            <li>La integración con sistemas existentes <span class="redacted">████████</span> se validó exitosamente</li>
                            <li>La evaluación de seguridad identificó <span class="redacted">███</span> vulnerabilidades potenciales que requieren mitigación</li>
                            <li>El análisis costo-beneficio indica escenarios de despliegue favorables para <span class="redacted-long">████████████████████████████</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">CONCLUSIONES Y RECOMENDACIONES</h2>
                <div class="section-content">
                    <ol class="recommendations-list">
                        <li>Proceder con despliegue operacional limitado bajo condiciones controladas</li>
                        <li>Establecer programa de capacitación para <span class="redacted">███</span> personal operacional</li>
                        <li>Implementar protocolos de seguridad mejorados para <span class="redacted-block">████████████████</span></li>
                        <li>Continuar investigación sobre oportunidades de mejora de <span class="redacted-long">████████████████████████████</span></li>
                        <li>Coordinar con agencias asociadas para compartir información bajo protocolos existentes</li>
                        <li>Mantener estado de clasificación pendiente de revisión de seguridad operacional</li>
                    </ol>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">REFERENCIAS</h2>
                <div class="section-content">
                    <ul>
                        <li><span class="redacted">████████████████</span> (${formattedDate.split(' ')[2]}) - Informe Técnico Interno</li>
                        <li><span class="redacted-block">████████████████████</span> - Base de Datos de Investigación Clasificada</li>
                        <li>Estándares Federales de Investigación <span class="redacted">███-███-████</span></li>
                    </ul>
                </div>
            </section>

            <footer class="document-footer">
                <div class="footer-grid">
                    <div class="footer-item">
                        <span class="label">INVESTIGADOR PRINCIPAL:</span>
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
                    DESCLASIFICAR EL: <span class="redacted">████████████</span> O 25 AÑOS DESDE LA FECHA DE PUBLICACIÓN
                </div>
            </footer>
        `;
    }

    showDocumentDetail(docId) {
        const doc = this.research.find(d => d.id === parseInt(docId));
        if (!doc) return;

        this.selectedDocument = doc;
        const modal = document.getElementById('research-detail-modal');
        
        const classificationClass = doc.classification === 1 ? 'tier-1' : 
                                   doc.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = this.getClassificationText(doc.classification);
        const tierText = doc.classification === 1 ? 'Nivel 1 - Ultra Secreto' :
                        doc.classification === 2 ? 'Nivel 2 - Confidencial' : 'Nivel 3 - Restringido';

        document.getElementById('research-summary-classification').className = `file-classification ${classificationClass}`;
        document.getElementById('research-summary-classification').textContent = classificationText;
        document.getElementById('research-summary-title').textContent = doc.name;
        document.getElementById('research-summary-tier').textContent = tierText;
        document.getElementById('research-summary-status').textContent = doc.status;
        document.getElementById('research-summary-date').textContent = doc.lastModified;
        document.getElementById('research-summary-access').textContent = doc.access === 'granted' ? '✓ Acceso Concedido' : '✗ Acceso Denegado';
        document.getElementById('research-summary-executive-text').textContent = doc.summary || 'No hay resumen disponible.';

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
    }

    openDocumentViewer() {
        if (!this.selectedDocument) return;

        const viewer = document.getElementById('research-viewer-modal');
        const doc = this.selectedDocument;
        
        document.getElementById('research-viewer-doc-title').textContent = doc.name;
        
        const fullContent = this.generateFullContent(doc);
        document.getElementById('research-viewer-body').innerHTML = fullContent;

        this.closeDetailModal();
        
        viewer.classList.remove('hidden');
        setTimeout(() => viewer.classList.add('active'), 10);
    }

    closeDocumentViewer() {
        const viewer = document.getElementById('research-viewer-modal');
        viewer.classList.remove('active');
        setTimeout(() => viewer.classList.add('hidden'), 300);
    }

    closeDetailModal() {
        const modal = document.getElementById('research-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }

    attachEventListeners() {
        const searchInput = this.container.querySelector('#research-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.render();
            });
        }

        const filterBtns = this.container.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
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

