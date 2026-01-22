/**
 * Archive Component
 * Historical data and archived documents
 */

class ArchiveComponent extends BaseComponent {
    constructor() {
        super('archive-content');
        this.archives = [];
        this.filteredArchives = [];
        this.selectedDocument = null;
        this.currentFilter = 'all';
        this.searchQuery = '';
    }

    render() {
        if (!this.container) return;

        this.archives = mockFiles.filter(file => file.category === 'archive');
        this.applyFilters();

        // Create container if it doesn't exist
        let archivePanel = this.container.querySelector('.panel');
        if (!archivePanel) {
            this.container.innerHTML = `
                <section class="panel-section">
                    <div class="panel">
                        <div class="panel-header">
                            <h2>Base de Datos de Archivos</h2>
                            <span class="badge">${this.filteredArchives.length} Archivos</span>
                        </div>
                        <div class="panel-content">
                            <div class="section-toolbar">
                                <div class="toolbar-left">
                                    <div class="search-bar">
                                        <input type="text" 
                                               id="archive-search" 
                                               class="search-input" 
                                               placeholder="🔍 Buscar archivos..."
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
                            <div id="archive-list" class="archive-list"></div>
                        </div>
                    </div>
                </section>
            `;
        }

        const archiveList = this.container.querySelector('#archive-list');
        if (!archiveList) return;

        archiveList.innerHTML = '';
        this.filteredArchives.forEach(item => {
            const archiveItem = this.createArchiveItem(item);
            archiveList.appendChild(archiveItem);
        });

        if (this.filteredArchives.length === 0) {
            archiveList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <h3>No Se Encontraron Archivos</h3>
                    <p class="text-muted">Intente ajustar sus filtros o términos de búsqueda</p>
                </div>
            `;
        }

        this.createDetailModal();
        this.createDocumentViewer();
    }

    applyFilters() {
        this.filteredArchives = this.archives.filter(item => {
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

    createArchiveItem(item) {
        const div = document.createElement('div');
        div.className = 'archive-item clickable';
        div.dataset.docId = item.id;

        div.innerHTML = `
            <div class="archive-icon">📦</div>
            <div class="archive-details">
                <div class="archive-header">
                    <h3 class="archive-name">${item.name}</h3>
                    <div class="file-classification tier-${item.classification}">${this.getClassificationText(item.classification)}</div>
                </div>
                ${item.summary ? `<p class="archive-summary">${item.summary.substring(0, 120)}...</p>` : ''}
                <div class="archive-metadata">
                    <span class="archive-date">📅 Archivado: ${item.lastModified}</span>
                    <span class="archive-status">${item.status}</span>
                </div>
            </div>
            <div class="archive-actions">
                <button class="btn btn-primary btn-sm view-archive-btn" data-doc-id="${item.id}">Ver Índice</button>
            </div>
        `;

        const viewBtn = div.querySelector('.view-archive-btn');
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showDocumentDetail(item.id);
        });

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
        let modal = document.getElementById('archive-detail-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'archive-detail-modal';
            modal.className = 'document-summary-modal hidden';
            modal.innerHTML = `
                <div class="document-summary-content">
                    <button class="modal-close-btn">✕</button>
                    <div class="summary-header">
                        <div id="archive-summary-classification" class="file-classification"></div>
                        <h2 id="archive-summary-title"></h2>
                    </div>
                    <div class="summary-body">
                        <div class="summary-info-grid">
                            <div class="summary-info-item">
                                <label>Nivel de Clasificación:</label>
                                <span id="archive-summary-tier"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Estado:</label>
                                <span id="archive-summary-status"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Fecha de Archivo:</label>
                                <span id="archive-summary-date"></span>
                            </div>
                            <div class="summary-info-item">
                                <label>Nivel de Acceso:</label>
                                <span id="archive-summary-access"></span>
                            </div>
                        </div>
                        <div class="summary-executive">
                            <h3>Resumen del Archivo</h3>
                            <p id="archive-summary-executive-text"></p>
                        </div>
                    </div>
                    <div class="summary-actions">
                        <button class="btn btn-secondary" id="archive-btn-view-summary">📄 Ver Resumen</button>
                        <button class="btn btn-primary" id="archive-btn-open-document">📂 Abrir Índice de Archivo</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const closeBtn = modal.querySelector('.modal-close-btn');
            closeBtn.addEventListener('click', () => this.closeDetailModal());

            const openBtn = modal.querySelector('#archive-btn-open-document');
            openBtn.addEventListener('click', () => this.openDocumentViewer());

            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeDetailModal();
            });
        }
    }

    createDocumentViewer() {
        let viewer = document.getElementById('archive-viewer-modal');
        if (!viewer) {
            viewer = document.createElement('div');
            viewer.id = 'archive-viewer-modal';
            viewer.className = 'document-viewer-modal hidden';
            viewer.innerHTML = `
                <div class="document-viewer-container">
                    <div class="viewer-toolbar">
                        <button class="viewer-close-btn">✕ Cerrar Archivo</button>
                        <h3 id="archive-viewer-doc-title" class="viewer-title"></h3>
                        <div class="viewer-toolbar-actions">
                            <button class="viewer-btn" title="Imprimir" onclick="window.print()">🖨️</button>
                            <button class="viewer-btn" title="Exportar" onclick="alert('Funcionalidad de exportación restringida')">💾</button>
                        </div>
                    </div>
                    <div class="document-viewer-content">
                        <div id="archive-viewer-body" class="classified-document-wrapper"></div>
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
        const docId = `AR-2026-FIO-${String(doc.id).padStart(5, '0')}`;
        const dateObj = new Date(doc.lastModified);
        const formattedDate = dateObj.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        }).toUpperCase();
        
        return `
            <div class="classification-banner top-banner">
                ${classificationText} // REGISTROS ARCHIVADOS
            </div>

            <header class="document-header">
                <div class="header-grid">
                    <div class="header-item">
                        <span class="label">CLASIFICACIÓN:</span>
                        <span class="value classification-level">${classificationText}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">ID DE ARCHIVO:</span>
                        <span class="value">${docId}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">FECHA DE ARCHIVO:</span>
                        <span class="value">${formattedDate}</span>
                    </div>
                    <div class="header-item">
                        <span class="label">REPOSITORIO:</span>
                        <span class="value">DIVISIÓN DE ARCHIVOS CLASIFICADOS</span>
                    </div>
                </div>
                
                <div class="warning-banner">
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-text">
                        <strong>AVISO:</strong> Este archivo contiene materiales históricos clasificados. El acceso está restringido al personal con las autorizaciones de seguridad apropiadas. Todos los materiales permanecen sujetos a las marcas de clasificación originales y requisitos de manejo.
                    </div>
                </div>
            </header>

            <h1 class="document-title">
                ÍNDICE DE ARCHIVO: ${doc.name.replace('.zip', '').toUpperCase()}
            </h1>

            <section class="document-section">
                <h2 class="section-title">RESUMEN DEL ARCHIVO</h2>
                <div class="section-content">
                    <p>${doc.summary}</p>
                    <p>
                        Paquete de archivo procesado bajo política de retención 
                        <span class="redacted">████████████</span> y almacenado en instalación segura 
                        <span class="redacted-block">████████████████</span>. Todos los contenidos verificados para 
                        integridad y completitud antes del archivado.
                    </p>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">CONTENIDOS DEL ARCHIVO</h2>
                <div class="section-content">
                    <table class="intel-table">
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Cantidad de Documentos</th>
                                <th>Clasificación</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Informes Operacionales</td>
                                <td><span class="redacted">███</span> documentos</td>
                                <td><span class="threat-critical">ULTRA SECRETO</span></td>
                                <td>Verificado</td>
                            </tr>
                            <tr>
                                <td>Resúmenes de Inteligencia</td>
                                <td><span class="redacted">███</span> documentos</td>
                                <td><span class="threat-high">CONFIDENCIAL</span></td>
                                <td>Verificado</td>
                            </tr>
                            <tr>
                                <td>Informes de Campo</td>
                                <td><span class="redacted">████</span> documentos</td>
                                <td><span class="threat-medium">RESTRINGIDO</span></td>
                                <td>Verificado</td>
                            </tr>
                            <tr>
                                <td>Productos Analíticos</td>
                                <td><span class="redacted">███</span> documentos</td>
                                <td><span class="threat-high">CONFIDENCIAL</span></td>
                                <td>Verificado</td>
                            </tr>
                            <tr>
                                <td>Materiales de Apoyo</td>
                                <td><span class="redacted">████</span> documentos</td>
                                <td><span class="threat-medium">RESTRINGIDO</span></td>
                                <td>Verificado</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">ELEMENTOS DESTACADOS</h2>
                <div class="section-content">
                    <div class="incident-box">
                        <div class="incident-header">
                            <span class="incident-label">ARCHIVO:</span> ${docId}
                            <span class="incident-label">PRIORIDAD:</span> 
                            <span class="severity-high">ALTO VALOR</span>
                        </div>
                        
                        <p>
                            El archivo contiene materiales relacionados con 
                            <span class="redacted-long">████████████████████████████████████</span> 
                            operaciones realizadas durante el período especificado. Los elementos clave incluyen:
                        </p>
                        
                        <ul>
                            <li>Documentos de planificación de misión para Operación <span class="redacted-block">████████████████</span></li>
                            <li>Informes post-acción de <span class="redacted">███</span> operaciones de campo</li>
                            <li>Evaluaciones de inteligencia cubriendo la región <span class="redacted">████████</span></li>
                            <li>Registros de coordinación con agencias asociadas <span class="redacted-block">████████████████</span></li>
                            <li>Informes técnicos sobre <span class="redacted-long">████████████████████████████</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">METADATOS DE ARCHIVO</h2>
                <div class="section-content">
                    <div class="subsection">
                        <h3 class="subsection-title">Información de Procesamiento</h3>
                        <ul class="timeline-list">
                            <li><strong>Fecha de Archivo:</strong> ${formattedDate}</li>
                            <li><strong>Personal de Procesamiento:</strong> <span class="redacted">████████████</span></li>
                            <li><strong>Estado de Verificación:</strong> Completo</li>
                            <li><strong>Ubicación de Almacenamiento:</strong> <span class="redacted-block">████████████████</span></li>
                            <li><strong>Período de Retención:</strong> <span class="redacted">██</span> años</li>
                            <li><strong>Calendario de Revisión:</strong> Cada <span class="redacted">█</span> años</li>
                        </ul>
                    </div>

                    <div class="redacted-paragraph">
                        <p class="fully-redacted">████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████</p>
                    </div>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">RESTRICCIONES DE ACCESO</h2>
                <div class="section-content">
                    <ol class="recommendations-list">
                        <li>El acceso requiere autorización ${classificationText} o superior con acceso compartimentado apropiado</li>
                        <li>Todo acceso debe ser registrado y justificado con requisito documentado de necesidad de conocer</li>
                        <li>Los materiales no pueden ser removidos de la instalación de visualización segura sin autorización</li>
                        <li>Acceso digital restringido a <span class="redacted">████████</span> terminales autorizadas</li>
                        <li>La copia o reproducción requiere aprobación de <span class="redacted-block">████████████████</span></li>
                        <li>Se requiere revisión del archivo antes de cualquier consideración de desclasificación</li>
                    </ol>
                </div>
            </section>

            <section class="document-section">
                <h2 class="section-title">INSTRUCCIONES DE RECUPERACIÓN</h2>
                <div class="section-content">
                    <p>
                        Para solicitar materiales de este archivo, envíe el Formulario 
                        <span class="redacted">███-███</span> a la División de Archivos Clasificados con 
                        justificación y autorizaciones requeridas. Tiempo de procesamiento: 
                        <span class="redacted">██</span> días hábiles. Recuperación acelerada disponible 
                        para requisitos operacionales urgentes.
                    </p>
                </div>
            </section>

            <footer class="document-footer">
                <div class="footer-grid">
                    <div class="footer-item">
                        <span class="label">ARCHIVADO POR:</span>
                        <span class="value"><span class="redacted">████████████████</span></span>
                    </div>
                    <div class="footer-item">
                        <span class="label">VERIFICADO POR:</span>
                        <span class="value"><span class="redacted">████████████████</span></span>
                    </div>
                    <div class="footer-item">
                        <span class="label">CUSTODIO:</span>
                        <span class="value"><span class="redacted">████████████████</span></span>
                    </div>
                </div>
                <div class="declassification-note">
                    FECHA DE REVISIÓN: <span class="redacted">████████████</span> | RETENCIÓN: PERMANENTE
                </div>
            </footer>
        `;
    }

    showDocumentDetail(docId) {
        const doc = this.archives.find(d => d.id === parseInt(docId));
        if (!doc) return;

        this.selectedDocument = doc;
        const modal = document.getElementById('archive-detail-modal');
        
        const classificationClass = doc.classification === 1 ? 'tier-1' : 
                                   doc.classification === 2 ? 'tier-2' : 'tier-3';
        const classificationText = this.getClassificationText(doc.classification);
        const tierText = doc.classification === 1 ? 'Nivel 1 - Ultra Secreto' :
                        doc.classification === 2 ? 'Nivel 2 - Confidencial' : 'Nivel 3 - Restringido';

        document.getElementById('archive-summary-classification').className = `file-classification ${classificationClass}`;
        document.getElementById('archive-summary-classification').textContent = classificationText;
        document.getElementById('archive-summary-title').textContent = doc.name;
        document.getElementById('archive-summary-tier').textContent = tierText;
        document.getElementById('archive-summary-status').textContent = doc.status;
        document.getElementById('archive-summary-date').textContent = doc.lastModified;
        document.getElementById('archive-summary-access').textContent = doc.access === 'granted' ? '✓ Acceso Concedido' : '✗ Acceso Denegado';
        document.getElementById('archive-summary-executive-text').textContent = doc.summary || 'No hay resumen disponible.';

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
    }

    openDocumentViewer() {
        if (!this.selectedDocument) return;

        const viewer = document.getElementById('archive-viewer-modal');
        const doc = this.selectedDocument;
        
        document.getElementById('archive-viewer-doc-title').textContent = doc.name;
        
        const fullContent = this.generateFullContent(doc);
        document.getElementById('archive-viewer-body').innerHTML = fullContent;

        this.closeDetailModal();
        
        viewer.classList.remove('hidden');
        setTimeout(() => viewer.classList.add('active'), 10);
    }

    closeDocumentViewer() {
        const viewer = document.getElementById('archive-viewer-modal');
        viewer.classList.remove('active');
        setTimeout(() => viewer.classList.add('hidden'), 300);
    }

    closeDetailModal() {
        const modal = document.getElementById('archive-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }

    attachEventListeners() {
        const searchInput = this.container.querySelector('#archive-search');
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
