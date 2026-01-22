/**
 * Componente de Archivos Filtrados
 * Sección de investigación sobre archivos clasificados liberados por Agente Girasol Rojo
 * 
 * ========================================================================
 * NOTA PARA DESARROLLADORES / DEVELOPER NOTE:
 * Los archivos clasificados están ocultos en el HTML dentro de comentarios
 * y atributos data-*. Buscar: "GIRASOL-ROJO" en index.html
 * ========================================================================
 */

class LeakedFilesComponent extends BaseComponent {
    constructor() {
        super('leaked-files-content');
        this.leakedFiles = [];
        this.selectedFile = null;
        this.discoveredFiles = new Set();
        this.initializeLeakedFiles();
    }

    /**
     * Inicializa los archivos filtrados ocultos en el DOM
     * Los archivos están escondidos en comentarios HTML y atributos data
     */
    initializeLeakedFiles() {
        // Archivos filtrados por Agente Girasol Rojo
        // Estos datos también están ocultos en el HTML para descubrimiento
        this.leakedFiles = [
            {
                id: 'GR-001',
                codename: 'EXPEDIENTE AURORA',
                filename: 'FIO-AURORA-2025-CONFIDENCIAL.pdf',
                classification: 'ULTRA SECRETO',
                releaseLocation: 'Foro cifrado en la dark web conocido como "La Colmena"',
                releaseMethod: 'Publicación anónima mediante nodo Tor con cifrado de múltiples capas',
                releaseDate: '2026-01-05',
                description: 'Informe completo de vigilancia sobre operaciones de inteligencia extranjera en territorio nacional. Contiene nombres de agentes encubiertos y rutas de comunicación seguras.',
                impact: 'CRÍTICO - Compromiso de 12 identidades de operativos activos',
                status: 'CONTENIDO PARCIALMENTE',
                discoveryHint: 'Buscar comentario HTML con código "GR-001"'
            },
            {
                id: 'GR-002',
                codename: 'PROTOCOLO SOMBRA',
                filename: 'PROTOCOLO-SOMBRA-OPERACIONES.docx',
                classification: 'SECRETO',
                releaseLocation: 'Canal de Telegram "Voces Libres" (ahora suspendido)',
                releaseMethod: 'Mensaje programado con autodestrucción que fue capturado antes de eliminarse',
                releaseDate: '2026-01-08',
                description: 'Manual de procedimientos para operaciones de infiltración en organizaciones criminales transnacionales.',
                impact: 'ALTO - Metodologías operacionales expuestas',
                status: 'BAJO INVESTIGACIÓN',
                discoveryHint: 'Buscar atributo data-expediente en el DOM'
            },
            {
                id: 'GR-003',
                codename: 'RED ESCARLATA',
                filename: 'INTEL-RED-ESCARLATA-ACTIVOS.xlsx',
                classification: 'ULTRA SECRETO',
                releaseLocation: 'Servidor FTP comprometido en infraestructura gubernamental aliada',
                releaseMethod: 'Exfiltración mediante malware personalizado "Serpiente Digital"',
                releaseDate: '2026-01-12',
                description: 'Base de datos de activos de inteligencia humana (HUMINT) desplegados en regiones conflictivas.',
                impact: 'CRÍTICO - Riesgo de vida para 8 activos identificados',
                status: 'EMERGENCIA ACTIVA',
                discoveryHint: 'Buscar JSON oculto en script inline'
            },
            {
                id: 'GR-004',
                codename: 'OPERACIÓN FANTASMA',
                filename: 'OP-FANTASMA-COMUNICACIONES.zip',
                classification: 'CONFIDENCIAL',
                releaseLocation: 'Repositorio público de código (GitHub) bajo usuario anónimo',
                releaseMethod: 'Commits fragmentados en múltiples repositorios aparentemente inocuos',
                releaseDate: '2026-01-15',
                description: 'Archivo de comunicaciones interceptadas entre células criminales y posibles contactos internos.',
                impact: 'MEDIO - Investigaciones en curso comprometidas',
                status: 'CONTENIDO',
                discoveryHint: 'Buscar en metadatos de imágenes del sitio'
            },
            {
                id: 'GR-005',
                codename: 'ARCHIVO OMEGA',
                filename: 'OMEGA-PERFILES-SUJETOS.json',
                classification: 'ULTRA SECRETO',
                releaseLocation: 'Plataforma de intercambio de archivos cifrados "SecureDrop" modificado',
                releaseMethod: 'Entrega fragmentada a múltiples periodistas de investigación',
                releaseDate: '2026-01-18',
                description: 'Perfiles psicológicos y patrones de comportamiento de sujetos de alto interés bajo vigilancia activa.',
                impact: 'CRÍTICO - Sujetos alertados, múltiples desapariciones reportadas',
                status: 'CRISIS',
                discoveryHint: 'Buscar localStorage o cookies ocultas'
            }
        ];
    }

    render() {
        if (!this.container) return;

        const panel = this.container.querySelector('.panel-content');
        if (!panel) return;

        panel.innerHTML = this.renderLayout();
        this.attachEventListeners();
    }

    renderLayout() {
        return `
            <!-- Banner de Alerta de Seguridad -->
            <div class="leaked-alert-banner">
                <div class="alert-icon-pulse">🚨</div>
                <div class="alert-content">
                    <h3>ALERTA DE BRECHA DE SEGURIDAD</h3>
                    <p>Agente <strong>Rafael Vega</strong> ha sido notificado: <span class="agent-codename">Agente Girasol Rojo</span> ha liberado archivos clasificados.</p>
                </div>
                <div class="alert-timestamp">
                    <span>Detectado: ${new Date().toLocaleDateString('es-ES')}</span>
                    <span class="blink">● EN VIVO</span>
                </div>
            </div>

            <!-- Panel de Información del Incidente -->
            <div class="incident-info-panel">
                <div class="incident-header">
                    <div class="incident-badge critical">INCIDENTE ACTIVO</div>
                    <h2>Filtración de Documentos Clasificados</h2>
                </div>
                <div class="incident-details-grid">
                    <div class="detail-card">
                        <span class="detail-label">Agente Responsable</span>
                        <span class="detail-value codename">GIRASOL ROJO</span>
                        <span class="detail-sublabel">Identidad: CLASIFICADA</span>
                    </div>
                    <div class="detail-card">
                        <span class="detail-label">Agente Asignado</span>
                        <span class="detail-value">Rafael Vega</span>
                        <span class="detail-sublabel">División de Contrainteligencia</span>
                    </div>
                    <div class="detail-card">
                        <span class="detail-label">Archivos Comprometidos</span>
                        <span class="detail-value count">${this.leakedFiles.length}</span>
                        <span class="detail-sublabel">Documentos Filtrados</span>
                    </div>
                    <div class="detail-card">
                        <span class="detail-label">Estado de Contención</span>
                        <span class="detail-value status-critical">PARCIAL</span>
                        <span class="detail-sublabel">Amenaza Activa</span>
                    </div>
                </div>
            </div>

            <!-- Instrucciones de Descubrimiento -->
            <div class="discovery-hint-panel">
                <div class="hint-icon">🔍</div>
                <div class="hint-content">
                    <h4>Protocolo de Investigación</h4>
                    <p>Los archivos filtrados contienen referencias ocultas en el código fuente de este sistema. 
                    Los analistas pueden inspeccionar el DOM, comentarios HTML y atributos de datos para localizar 
                    información adicional sobre cada filtración.</p>
                    <code>Sugerencia: Inspeccionar elemento → Buscar "GIRASOL-ROJO"</code>
                </div>
            </div>

            <!-- Lista de Archivos Filtrados -->
            <div class="leaked-files-section">
                <div class="section-header">
                    <h3>📁 Archivos Clasificados Filtrados</h3>
                    <span class="file-count">${this.leakedFiles.length} archivos identificados</span>
                </div>
                <div class="leaked-files-grid">
                    ${this.leakedFiles.map(file => this.renderFileCard(file)).join('')}
                </div>
            </div>

            <!-- Modal de Detalle de Archivo -->
            <div id="leaked-file-modal" class="leaked-file-modal hidden">
                <div class="leaked-modal-content">
                    <button class="modal-close-btn" id="close-leaked-modal">✕</button>
                    <div id="leaked-modal-body"></div>
                </div>
            </div>
        `;
    }

    renderFileCard(file) {
        const classificationClass = file.classification === 'ULTRA SECRETO' ? 'ultra-secret' :
                                   file.classification === 'SECRETO' ? 'secret' : 'confidential';
        
        const statusClass = file.status === 'CRISIS' || file.status === 'EMERGENCIA ACTIVA' ? 'critical' :
                           file.status === 'BAJO INVESTIGACIÓN' ? 'warning' : 'contained';

        return `
            <div class="leaked-file-card clickable" data-file-id="${file.id}" 
                 data-expediente-girasol="${file.codename}"
                 aria-label="Archivo filtrado: ${file.codename}">
                <div class="file-classification-strip ${classificationClass}"></div>
                <div class="file-card-header">
                    <span class="file-codename">${file.codename}</span>
                    <span class="file-classification-badge ${classificationClass}">${file.classification}</span>
                </div>
                <div class="file-card-body">
                    <p class="file-name"><span class="label">Archivo:</span> ${file.filename}</p>
                    <p class="file-release-location"><span class="label">Ubicación de filtración:</span> ${file.releaseLocation.substring(0, 50)}...</p>
                    <p class="file-date"><span class="label">Fecha:</span> ${file.releaseDate}</p>
                </div>
                <div class="file-card-footer">
                    <span class="file-status ${statusClass}">${file.status}</span>
                    <span class="file-impact">Impacto: ${file.impact.split(' - ')[0]}</span>
                </div>
                <div class="file-action-hint">
                    <span>🔓 Click para ver detalles completos</span>
                </div>
            </div>
        `;
    }

    renderFileDetail(file) {
        const classificationClass = file.classification === 'ULTRA SECRETO' ? 'ultra-secret' :
                                   file.classification === 'SECRETO' ? 'secret' : 'confidential';

        return `
            <div class="leaked-file-detail">
                <!-- Encabezado del Documento -->
                <div class="detail-header ${classificationClass}">
                    <div class="classification-banner">${file.classification}</div>
                    <h2>${file.codename}</h2>
                    <p class="file-id">Identificador: ${file.id}</p>
                </div>

                <!-- Información del Archivo -->
                <div class="detail-section">
                    <h3>📄 Información del Archivo</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Nombre del Archivo:</label>
                            <span class="mono">${file.filename}</span>
                        </div>
                        <div class="info-item">
                            <label>Clasificación:</label>
                            <span class="classification-text ${classificationClass}">${file.classification}</span>
                        </div>
                        <div class="info-item">
                            <label>Fecha de Filtración:</label>
                            <span>${file.releaseDate}</span>
                        </div>
                        <div class="info-item">
                            <label>Estado Actual:</label>
                            <span class="status-badge-detail">${file.status}</span>
                        </div>
                    </div>
                </div>

                <!-- Descripción del Contenido -->
                <div class="detail-section">
                    <h3>📋 Descripción del Contenido</h3>
                    <p class="content-description">${file.description}</p>
                </div>

                <!-- Información de la Filtración -->
                <div class="detail-section release-info">
                    <h3>🌐 Dónde Fue Liberado</h3>
                    <div class="release-details">
                        <div class="release-item">
                            <label>Plataforma / Ubicación:</label>
                            <p class="release-location">${file.releaseLocation}</p>
                        </div>
                        <div class="release-item">
                            <label>Método de Distribución:</label>
                            <p class="release-method">${file.releaseMethod}</p>
                        </div>
                    </div>
                </div>

                <!-- Evaluación de Impacto -->
                <div class="detail-section impact-section">
                    <h3>⚠️ Evaluación de Impacto</h3>
                    <div class="impact-display">
                        <span class="impact-level">${file.impact.split(' - ')[0]}</span>
                        <p class="impact-description">${file.impact.split(' - ')[1] || file.impact}</p>
                    </div>
                </div>

                <!-- Nota de Investigación -->
                <div class="detail-section discovery-note">
                    <h3>🔍 Nota para Investigadores</h3>
                    <p class="hint-text">${file.discoveryHint}</p>
                    <p class="investigation-note">
                        Este archivo forma parte de la investigación activa sobre la brecha de seguridad 
                        perpetrada por el agente con nombre clave <strong>Girasol Rojo</strong>. 
                        Toda la información está siendo rastreada y el personal de contrainteligencia 
                        ha sido desplegado para contener la situación.
                    </p>
                </div>

                <!-- Advertencia de Seguridad -->
                <div class="security-warning-box">
                    <span class="warning-icon">🔒</span>
                    <div class="warning-text">
                        <strong>ADVERTENCIA DE SEGURIDAD</strong>
                        <p>El acceso a esta información está siendo monitoreado. Cualquier divulgación 
                        no autorizada será procesada bajo las leyes federales aplicables.</p>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Click en tarjetas de archivos
        const fileCards = this.container.querySelectorAll('.leaked-file-card');
        fileCards.forEach(card => {
            card.addEventListener('click', () => {
                const fileId = card.dataset.fileId;
                this.showFileDetail(fileId);
            });

            // Accesibilidad: permitir activación con teclado
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const fileId = card.dataset.fileId;
                    this.showFileDetail(fileId);
                }
            });
        });

        // Cerrar modal
        const closeBtn = this.container.querySelector('#close-leaked-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Cerrar modal al hacer clic fuera
        const modal = this.container.querySelector('#leaked-file-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    showFileDetail(fileId) {
        const file = this.leakedFiles.find(f => f.id === fileId);
        if (!file) return;

        this.selectedFile = file;
        this.discoveredFiles.add(fileId);

        const modal = this.container.querySelector('#leaked-file-modal');
        const modalBody = this.container.querySelector('#leaked-modal-body');
        
        if (modal && modalBody) {
            modalBody.innerHTML = this.renderFileDetail(file);
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.add('active'), 10);

            // Log de acceso para simulación
            console.log(`[FIO-SISTEMA] Acceso registrado: Archivo ${file.id} - ${file.codename}`);
        }
    }

    closeModal() {
        const modal = this.container.querySelector('#leaked-file-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
    }

    destroy() {
        super.destroy();
    }
}

// Registrar componente globalmente
if (typeof window !== 'undefined') {
    window.LeakedFilesComponent = LeakedFilesComponent;
}
