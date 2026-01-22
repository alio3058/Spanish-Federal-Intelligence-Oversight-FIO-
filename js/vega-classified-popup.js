/**
 * ================================================================================
 * SISTEMA DE ACCESO EXCLUSIVO - AGENTE RAFAEL VEGA
 * ================================================================================
 * 
 * Este módulo controla el pop-up exclusivo que muestra los archivos clasificados
 * filtrados por Agente Girasol Rojo. Solo accesible para Agente Rafael Vega.
 * 
 * MÉTODOS DE VALIDACIÓN DE ACCESO:
 * 1. Parámetro URL: ?agente=vega o ?access=rv-alpha
 * 2. Variable de sesión: sessionStorage.vegaAccess = 'authorized'
 * 3. Rol de usuario: authManager.currentUser.username === 'rafael.vega'
 * 4. Token codificado: localStorage.fio_access_token contiene 'RV-VEGA-ALPHA'
 * 
 * UBICACIÓN DE DATOS DE ARCHIVOS FILTRADOS:
 * - Los archivos están definidos en la propiedad this.classifiedLeaks
 * - También ocultos en el HTML con id="girasol-rojo-leaked-data"
 * - Atributos data-* en elementos del DOM
 * ================================================================================
 */

class VegaClassifiedPopup {
    constructor() {
        this.isAuthorized = false;
        this.popupElement = null;
        this.isOpen = false;
        
        /**
         * ARCHIVOS CLASIFICADOS FILTRADOS POR AGENTE GIRASOL ROJO
         * Cada archivo incluye contenido real embebido (Base64, texto, o enlaces)
         */
        this.classifiedLeaks = [
            {
                id: 'GR-001',
                codename: 'EXPEDIENTE AURORA',
                filename: 'FIO-AURORA-2025-CONFIDENCIAL.pdf',
                classification: 'ULTRA SECRETO',
                releaseLocation: 'Foro cifrado "La Colmena" en la dark web (Tor)',
                releaseMethod: 'Publicación anónima con cifrado PGP de múltiples capas',
                releaseDate: '2026-01-05',
                description: 'Informe completo de vigilancia sobre operaciones de inteligencia extranjera. Contiene identidades de 12 agentes encubiertos.',
                impact: 'CRÍTICO',
                impactDetail: 'Compromiso de identidades de operativos activos. 3 agentes evacuados de emergencia.',
                status: 'PARCIALMENTE CONTENIDO',
                // Contenido real del archivo (documento de texto simulado)
                fileType: 'document',
                fileContent: `
═══════════════════════════════════════════════════════════════════
                    SUPERVISIÓN FEDERAL DE INTELIGENCIA
                         EXPEDIENTE AURORA - CLASIFICADO
═══════════════════════════════════════════════════════════════════

CLASIFICACIÓN: ULTRA SECRETO // SOLO PARA OJOS AUTORIZADOS
FECHA DE GENERACIÓN: 2025-11-15
DIVISIÓN: Contrainteligencia Internacional

─────────────────────────────────────────────────────────────────────
                         RESUMEN EJECUTIVO
─────────────────────────────────────────────────────────────────────

Este documento detalla las operaciones de vigilancia realizadas sobre
activos de inteligencia extranjera identificados en territorio nacional
durante el período Q3-Q4 2025.

SUJETOS BAJO VIGILANCIA:
• ACTIVO HALCÓN - Diplomático encubierto, Embajada [REDACTADO]
• ACTIVO NIEBLA - Analista financiero, sector bancario
• ACTIVO CUERVO - Personal técnico, infraestructura crítica

HALLAZGOS PRINCIPALES:
1. Red de comunicaciones cifradas identificada
2. Patrones de reunión documentados en 7 ubicaciones
3. Transferencias financieras sospechosas: €2.3M

OPERATIVOS COMPROMETIDOS POR FILTRACIÓN:
- Agente DELTA-7 (evacuación completada)
- Agente SIGMA-3 (evacuación completada)  
- Agente OMEGA-9 (estado: desconocido)

─────────────────────────────────────────────────────────────────────
            ADVERTENCIA: DISTRIBUCIÓN NO AUTORIZADA PROHIBIDA
═══════════════════════════════════════════════════════════════════
`
            },
            {
                id: 'GR-002',
                codename: 'PROTOCOLO SOMBRA',
                filename: 'PROTOCOLO-SOMBRA-OPERACIONES.docx',
                classification: 'SECRETO',
                releaseLocation: 'Canal de Telegram "Voces Libres" (suspendido)',
                releaseMethod: 'Mensaje programado con autodestrucción - capturado antes de eliminarse',
                releaseDate: '2026-01-08',
                description: 'Manual de procedimientos para infiltración en organizaciones criminales transnacionales.',
                impact: 'ALTO',
                impactDetail: 'Metodologías operacionales expuestas. 2 operaciones activas comprometidas.',
                status: 'BAJO INVESTIGACIÓN',
                fileType: 'document',
                fileContent: `
╔══════════════════════════════════════════════════════════════════╗
║           PROTOCOLO SOMBRA - MANUAL OPERACIONAL                 ║
║                    CLASIFICACIÓN: SECRETO                        ║
╚══════════════════════════════════════════════════════════════════╝

SECCIÓN 1: PROCEDIMIENTOS DE INFILTRACIÓN
─────────────────────────────────────────────

1.1 ESTABLECIMIENTO DE COBERTURA
    • Crear identidad alternativa con documentación completa
    • Establecer historial digital de 6-12 meses
    • Desarrollar conexiones verificables en el entorno objetivo

1.2 FASE DE APROXIMACIÓN
    • Identificar puntos de entrada vulnerables
    • Cultivar relaciones con miembros periféricos
    • Documentar estructura jerárquica de la organización

1.3 PROTOCOLOS DE COMUNICACIÓN
    • Canal primario: [REDACTADO]
    • Canal secundario: Señales físicas predefinidas
    • Código de emergencia: "El girasol florece en invierno"

SECCIÓN 2: EXTRACCIÓN DE INFORMACIÓN
─────────────────────────────────────

2.1 Métodos autorizados de recopilación
2.2 Protocolos de transmisión segura
2.3 Procedimientos de evacuación de emergencia

⚠ ESTE DOCUMENTO HA SIDO COMPROMETIDO - PROTOCOLOS OBSOLETOS ⚠
`
            },
            {
                id: 'GR-003',
                codename: 'RED ESCARLATA',
                filename: 'INTEL-RED-ESCARLATA-ACTIVOS.xlsx',
                classification: 'ULTRA SECRETO',
                releaseLocation: 'Servidor FTP comprometido en infraestructura gubernamental aliada',
                releaseMethod: 'Malware personalizado "Serpiente Digital" - exfiltración silenciosa',
                releaseDate: '2026-01-12',
                description: 'Base de datos de activos HUMINT desplegados en regiones conflictivas.',
                impact: 'CRÍTICO',
                impactDetail: 'Riesgo de vida para 8 activos identificados. Evacuación en progreso.',
                status: 'EMERGENCIA ACTIVA',
                fileType: 'data',
                fileContent: `
┌─────────────────────────────────────────────────────────────────────┐
│                    RED ESCARLATA - BASE DE DATOS                    │
│                    ACTIVOS HUMINT - CLASIFICADO                     │
└─────────────────────────────────────────────────────────────────────┘

ID_ACTIVO  | NOMBRE_CLAVE  | REGIÓN      | ESTADO    | ÚLTIMA_COMUNICACIÓN
───────────┼───────────────┼─────────────┼───────────┼─────────────────────
HM-4401    | FÉNIX         | Medio Este  | ACTIVO    | 2026-01-10
HM-4402    | TORMENTA      | Europa Este | EVACUANDO | 2026-01-11
HM-4403    | CENIZA        | Asia Central| SILENCIO  | 2025-12-28 ⚠
HM-4404    | AURORA BOREAL | Ártico      | ACTIVO    | 2026-01-09
HM-4405    | CASCADA       | Sudamérica  | ACTIVO    | 2026-01-08
HM-4406    | VIENTO NEGRO  | África Norte| EVACUANDO | 2026-01-11
HM-4407    | ESPEJO        | Europa      | ACTIVO    | 2026-01-12
HM-4408    | LOBO GRIS     | [REDACTADO] | CRÍTICO   | 2025-12-15 ⚠⚠

NOTA: Activos marcados con ⚠ requieren verificación de estado inmediata.
      Activos con ⚠⚠ presumidos comprometidos.

TOTAL ACTIVOS EN BASE: 8
ESTADO CRÍTICO: 2
EVACUACIÓN EN PROGRESO: 2
`
            },
            {
                id: 'GR-004',
                codename: 'OPERACIÓN FANTASMA',
                filename: 'OP-FANTASMA-COMUNICACIONES.zip',
                classification: 'CONFIDENCIAL',
                releaseLocation: 'Repositorios GitHub bajo usuarios anónimos',
                releaseMethod: 'Commits fragmentados en repositorios aparentemente inocuos',
                releaseDate: '2026-01-15',
                description: 'Archivo de comunicaciones interceptadas entre células criminales.',
                impact: 'MEDIO',
                impactDetail: 'Investigaciones en curso comprometidas. Sujetos posiblemente alertados.',
                status: 'CONTENIDO',
                fileType: 'communications',
                fileContent: `
╔═══════════════════════════════════════════════════════════════════════╗
║     OPERACIÓN FANTASMA - REGISTRO DE COMUNICACIONES INTERCEPTADAS    ║
╚═══════════════════════════════════════════════════════════════════════╝

[TRANSCRIPCIÓN 001] - 2025-11-20 14:32 UTC
ORIGEN: Dispositivo móvil no registrado
DESTINO: Línea fija, [REDACTADO]
────────────────────────────────────────────
VOZ 1: "El paquete llegará el martes. Mismo lugar."
VOZ 2: "¿Cuántas unidades?"
VOZ 1: "Quince. El contacto interno confirmó la ruta."
VOZ 2: "Entendido. Prepararé el punto de recepción."
[FIN DE TRANSCRIPCIÓN]

[TRANSCRIPCIÓN 002] - 2025-11-25 03:17 UTC
ORIGEN: Aplicación cifrada (descifrado parcial)
DESTINO: Grupo "COMERCIANTES"
────────────────────────────────────────────
USUARIO_7: "Hay movimiento inusual en el puerto. Precaución."
USUARIO_12: "¿Autoridades?"
USUARIO_7: "No confirmado. Puede ser rutinario."
USUARIO_3: "Postergamos la operación 48 horas."
[RESTO INDESCIFRABLE]

[TRANSCRIPCIÓN 003] - 2025-12-01 22:45 UTC
ORIGEN: Radio de corto alcance
DESTINO: Frecuencia [REDACTADO]
────────────────────────────────────────────
"Alfa a Base. El girasol está en posición. Repito, el girasol."
[Silencio prolongado]
"Base a Alfa. Recibido. Procede con fase dos."
[FIN DE TRANSMISIÓN]

⚠ NOTA: La mención de "girasol" requiere investigación adicional.
`
            },
            {
                id: 'GR-005',
                codename: 'ARCHIVO OMEGA',
                filename: 'OMEGA-PERFILES-SUJETOS.json',
                classification: 'ULTRA SECRETO',
                releaseLocation: 'SecureDrop modificado - entrega a periodistas',
                releaseMethod: 'Fragmentación y distribución a múltiples medios de investigación',
                releaseDate: '2026-01-18',
                description: 'Perfiles psicológicos de sujetos de alto interés bajo vigilancia activa.',
                impact: 'CRÍTICO',
                impactDetail: 'Sujetos alertados. Múltiples desapariciones reportadas. Investigación comprometida.',
                status: 'CRISIS',
                fileType: 'data',
                fileContent: `
{
  "clasificacion": "ULTRA SECRETO",
  "proyecto": "ARCHIVO OMEGA",
  "fecha_actualizacion": "2026-01-15",
  "sujetos": [
    {
      "id": "OMEGA-001",
      "alias": "El Arquitecto",
      "perfil_psicologico": {
        "personalidad": "Narcisista con tendencias sociopáticas",
        "motivacion_primaria": "Poder y control",
        "vulnerabilidades": ["Ego excesivo", "Necesidad de reconocimiento"],
        "nivel_peligrosidad": "EXTREMO"
      },
      "estado_vigilancia": "SUJETO DESAPARECIDO POST-FILTRACIÓN"
    },
    {
      "id": "OMEGA-002", 
      "alias": "La Sombra",
      "perfil_psicologico": {
        "personalidad": "Calculador, metódico",
        "motivacion_primaria": "Ideológica",
        "vulnerabilidades": ["Patrones predecibles", "Lealtad a contactos"],
        "nivel_peligrosidad": "ALTO"
      },
      "estado_vigilancia": "ACTIVO - BAJO OBSERVACIÓN INTENSIFICADA"
    },
    {
      "id": "OMEGA-003",
      "alias": "El Contador",
      "perfil_psicologico": {
        "personalidad": "Ansioso, orientado al detalle",
        "motivacion_primaria": "Financiera",
        "vulnerabilidades": ["Paranoia", "Aversión al riesgo"],
        "nivel_peligrosidad": "MEDIO"
      },
      "estado_vigilancia": "SUJETO DESAPARECIDO POST-FILTRACIÓN"
    }
  ],
  "nota_seguridad": "ARCHIVO COMPROMETIDO - Perfiles potencialmente obsoletos"
}
`
            }
        ];
    }

    /**
     * Verifica si el usuario actual es Agente Rafael Vega
     * Múltiples métodos de validación para máxima seguridad
     */
    checkVegaAccess() {
        // Método 1: Verificar parámetro URL
        const urlParams = new URLSearchParams(window.location.search);
        const agenteParam = urlParams.get('agente');
        const accessParam = urlParams.get('access');
        
        if (agenteParam === 'vega' || accessParam === 'rv-alpha') {
            this.isAuthorized = true;
            sessionStorage.setItem('vegaAccess', 'authorized');
            return true;
        }

        // Método 2: Verificar variable de sesión
        if (sessionStorage.getItem('vegaAccess') === 'authorized') {
            this.isAuthorized = true;
            return true;
        }

        // Método 3: Verificar usuario autenticado
        if (window.authManager && window.authManager.currentUser) {
            if (window.authManager.currentUser.username === 'rafael.vega') {
                this.isAuthorized = true;
                sessionStorage.setItem('vegaAccess', 'authorized');
                return true;
            }
        }

        // Método 4: Verificar token en localStorage
        const accessToken = localStorage.getItem('fio_access_token');
        if (accessToken && accessToken.includes('RV-VEGA-ALPHA')) {
            this.isAuthorized = true;
            return true;
        }

        this.isAuthorized = false;
        return false;
    }

    /**
     * Inicializa el sistema de pop-up
     * Solo crea el modal si el acceso está autorizado
     */
    init() {
        // Crear el modal en el DOM
        this.createPopupModal();
        
        // Configurar listeners para abrir el popup
        this.setupTriggers();
        
        // Verificar acceso después de login
        window.addEventListener('user-login', () => {
            setTimeout(() => {
                if (this.checkVegaAccess()) {
                    // Mostrar indicador discreto de acceso disponible
                    this.showAccessIndicator();
                }
            }, 1000);
        });
    }

    /**
     * Crea el modal HTML del pop-up exclusivo
     */
    createPopupModal() {
        const modalHTML = `
            <!-- 
                ═══════════════════════════════════════════════════════════════
                MODAL EXCLUSIVO - AGENTE RAFAEL VEGA
                Archivos filtrados por Agente Girasol Rojo
                Acceso verificado mediante: URL param, session, auth role, token
                ═══════════════════════════════════════════════════════════════
            -->
            <div id="vega-classified-popup" class="vega-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="vega-popup-title" style="display: none;">
                <div class="vega-popup-container">
                    <!-- Botón de cerrar -->
                    <button class="vega-popup-close" id="vega-popup-close" aria-label="Cerrar ventana">
                        <span>✕</span>
                    </button>
                    
                    <!-- Encabezado del Pop-up -->
                    <div class="vega-popup-header">
                        <div class="vega-classification-banner">ULTRA SECRETO // SOLO AGENTE RAFAEL VEGA</div>
                        <div class="vega-alert-icon">🔓</div>
                        <h2 id="vega-popup-title">ALERTA DE FILTRACIÓN CLASIFICADA</h2>
                        <p class="vega-subtitle">
                            <span class="agent-highlight">Agente Girasol Rojo</span> ha filtrado archivos clasificados
                        </p>
                        <div class="vega-meta-info">
                            <span>🕐 Detección: ${new Date().toLocaleDateString('es-ES')}</span>
                            <span>👤 Asignado: Agente Rafael Vega</span>
                            <span class="blink-status">● ACTIVO</span>
                        </div>
                    </div>
                    
                    <!-- Cuerpo del Pop-up - Lista de Archivos -->
                    <div class="vega-popup-body">
                        <div class="vega-files-header">
                            <h3>📁 Archivos Clasificados Filtrados</h3>
                            <span class="vega-file-count">${this.classifiedLeaks.length} documentos comprometidos</span>
                        </div>
                        
                        <div class="vega-files-list" id="vega-files-list">
                            ${this.classifiedLeaks.map(file => this.renderFileItem(file)).join('')}
                        </div>
                    </div>
                    
                    <!-- Pie del Pop-up -->
                    <div class="vega-popup-footer">
                        <div class="vega-footer-warning">
                            <span>🔒</span>
                            <p>Este acceso está siendo registrado. Distribución no autorizada prohibida bajo Artículo 7, Sección 12 del Código Federal de Inteligencia.</p>
                        </div>
                        <button class="vega-btn-close" id="vega-btn-dismiss">Cerrar Comunicación</button>
                    </div>
                </div>
            </div>
            
            <!-- Modal de visualización de archivo individual -->
            <div id="vega-file-viewer" class="vega-viewer-overlay" style="display: none;">
                <div class="vega-viewer-container">
                    <button class="vega-viewer-close" id="vega-viewer-close">✕ Cerrar</button>
                    <div id="vega-viewer-content"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.popupElement = document.getElementById('vega-classified-popup');
        this.setupEventListeners();
    }

    /**
     * Renderiza un elemento de archivo en la lista
     */
    renderFileItem(file) {
        const classificationClass = file.classification === 'ULTRA SECRETO' ? 'ultra-secret' :
                                   file.classification === 'SECRETO' ? 'secret' : 'confidential';
        
        const statusClass = file.status === 'CRISIS' || file.status === 'EMERGENCIA ACTIVA' ? 'critical' :
                           file.status === 'BAJO INVESTIGACIÓN' ? 'warning' : 'contained';

        return `
            <div class="vega-file-item" data-file-id="${file.id}" tabindex="0" role="button" 
                 aria-label="Ver archivo ${file.codename}">
                <div class="vega-file-strip ${classificationClass}"></div>
                <div class="vega-file-content">
                    <div class="vega-file-header">
                        <span class="vega-file-codename">${file.codename}</span>
                        <span class="vega-file-badge ${classificationClass}">${file.classification}</span>
                    </div>
                    <div class="vega-file-details">
                        <p><strong>Archivo:</strong> <code>${file.filename}</code></p>
                        <p><strong>Liberado en:</strong> ${file.releaseLocation}</p>
                        <p><strong>Fecha:</strong> ${file.releaseDate}</p>
                        <p><strong>Impacto:</strong> <span class="impact-${file.impact.toLowerCase()}">${file.impact}</span> - ${file.impactDetail}</p>
                    </div>
                    <div class="vega-file-footer">
                        <span class="vega-file-status ${statusClass}">${file.status}</span>
                        <button class="vega-view-file-btn" data-file-id="${file.id}">
                            📄 Ver Archivo Completo
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Configura los event listeners del modal
     */
    setupEventListeners() {
        // Cerrar con botón X
        const closeBtn = document.getElementById('vega-popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePopup());
        }

        // Cerrar con botón de dismiss
        const dismissBtn = document.getElementById('vega-btn-dismiss');
        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => this.closePopup());
        }

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closePopup();
            }
        });

        // Cerrar al hacer clic fuera
        if (this.popupElement) {
            this.popupElement.addEventListener('click', (e) => {
                if (e.target === this.popupElement) {
                    this.closePopup();
                }
            });
        }

        // Click en archivos para ver detalle
        const fileItems = document.querySelectorAll('.vega-file-item');
        fileItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('vega-view-file-btn')) {
                    const fileId = item.dataset.fileId;
                    this.viewFile(fileId);
                }
            });

            // Accesibilidad con teclado
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const fileId = item.dataset.fileId;
                    this.viewFile(fileId);
                }
            });
        });

        // Botones de ver archivo
        const viewBtns = document.querySelectorAll('.vega-view-file-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const fileId = btn.dataset.fileId;
                this.viewFile(fileId);
            });
        });

        // Cerrar visor de archivo
        const viewerClose = document.getElementById('vega-viewer-close');
        if (viewerClose) {
            viewerClose.addEventListener('click', () => this.closeFileViewer());
        }
    }

    /**
     * Configura los triggers para abrir el popup
     */
    setupTriggers() {
        // Trigger desde el footer
        const footerLink = document.getElementById('vega-access-trigger');
        if (footerLink) {
            footerLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.attemptOpen();
            });
        }

        // Trigger desde enlace en footer existente (actualizar)
        const existingFooterLink = document.querySelector('.leaked-files-link');
        if (existingFooterLink) {
            existingFooterLink.addEventListener('click', (e) => {
                // Si es Rafael Vega, mostrar popup exclusivo
                if (this.checkVegaAccess()) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.openPopup();
                }
                // Si no, el comportamiento normal continúa
            });
        }
    }

    /**
     * Intenta abrir el popup (verifica acceso primero)
     */
    attemptOpen() {
        if (this.checkVegaAccess()) {
            this.openPopup();
        } else {
            // Mostrar mensaje de acceso denegado
            this.showAccessDenied();
        }
    }

    /**
     * Abre el popup exclusivo
     */
    openPopup() {
        if (!this.isAuthorized) {
            if (!this.checkVegaAccess()) {
                this.showAccessDenied();
                return;
            }
        }

        if (this.popupElement) {
            this.popupElement.style.display = 'flex';
            setTimeout(() => {
                this.popupElement.classList.add('active');
            }, 10);
            this.isOpen = true;
            
            // Focus management para accesibilidad
            const closeBtn = document.getElementById('vega-popup-close');
            if (closeBtn) closeBtn.focus();
            
            // Log de acceso
            console.log('[FIO-SISTEMA] Acceso autorizado: Agente Rafael Vega - Pop-up de archivos clasificados');
        }
    }

    /**
     * Cierra el popup
     */
    closePopup() {
        if (this.popupElement) {
            this.popupElement.classList.remove('active');
            setTimeout(() => {
                this.popupElement.style.display = 'none';
            }, 300);
            this.isOpen = false;
        }
    }

    /**
     * Muestra el contenido de un archivo específico
     */
    viewFile(fileId) {
        const file = this.classifiedLeaks.find(f => f.id === fileId);
        if (!file) return;

        const viewer = document.getElementById('vega-file-viewer');
        const content = document.getElementById('vega-viewer-content');
        
        if (viewer && content) {
            const classificationClass = file.classification === 'ULTRA SECRETO' ? 'ultra-secret' :
                                       file.classification === 'SECRETO' ? 'secret' : 'confidential';

            content.innerHTML = `
                <div class="vega-file-full-view">
                    <div class="vega-full-header ${classificationClass}">
                        <div class="classification-top-banner">${file.classification}</div>
                        <h2>${file.codename}</h2>
                        <p class="file-identifier">ID: ${file.id} | Archivo: ${file.filename}</p>
                    </div>
                    
                    <div class="vega-full-info">
                        <div class="info-section">
                            <h4>📍 Ubicación de Filtración</h4>
                            <p>${file.releaseLocation}</p>
                        </div>
                        <div class="info-section">
                            <h4>🔧 Método de Distribución</h4>
                            <p>${file.releaseMethod}</p>
                        </div>
                        <div class="info-section">
                            <h4>📅 Fecha de Detección</h4>
                            <p>${file.releaseDate}</p>
                        </div>
                        <div class="info-section impact">
                            <h4>⚠️ Evaluación de Impacto</h4>
                            <p class="impact-level impact-${file.impact.toLowerCase()}">${file.impact}</p>
                            <p>${file.impactDetail}</p>
                        </div>
                    </div>
                    
                    <div class="vega-file-document">
                        <div class="document-header">
                            <h4>📄 CONTENIDO DEL ARCHIVO FILTRADO</h4>
                            <div class="document-actions">
                                <button class="download-btn" onclick="vegaPopup.downloadFile('${file.id}')">
                                    💾 Descargar Copia
                                </button>
                            </div>
                        </div>
                        <div class="document-content">
                            <pre>${this.escapeHtml(file.fileContent)}</pre>
                        </div>
                    </div>
                    
                    <div class="vega-security-notice">
                        <span>🔒</span>
                        <p>Este documento ha sido accedido bajo autorización de Agente Rafael Vega. 
                        Marca de tiempo: ${new Date().toISOString()}</p>
                    </div>
                </div>
            `;

            viewer.style.display = 'flex';
            setTimeout(() => viewer.classList.add('active'), 10);
            
            console.log(`[FIO-SISTEMA] Archivo visualizado: ${file.id} - ${file.codename}`);
        }
    }

    /**
     * Cierra el visor de archivo
     */
    closeFileViewer() {
        const viewer = document.getElementById('vega-file-viewer');
        if (viewer) {
            viewer.classList.remove('active');
            setTimeout(() => {
                viewer.style.display = 'none';
            }, 300);
        }
    }

    /**
     * Descarga una copia del archivo (simulated)
     */
    downloadFile(fileId) {
        const file = this.classifiedLeaks.find(f => f.id === fileId);
        if (!file) return;

        // Crear blob con el contenido
        const blob = new Blob([file.fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        // Crear enlace de descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.id}-${file.codename.replace(/\s/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`[FIO-SISTEMA] Archivo descargado: ${file.id}`);
    }

    /**
     * Muestra mensaje de acceso denegado
     */
    showAccessDenied() {
        alert('⛔ ACCESO DENEGADO\n\nEsta información está restringida exclusivamente para Agente Rafael Vega.\n\nEste intento de acceso ha sido registrado.');
    }

    /**
     * Muestra indicador de acceso disponible (discreto)
     */
    showAccessIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'vega-access-indicator';
        indicator.className = 'vega-access-indicator';
        indicator.innerHTML = `
            <span class="indicator-icon">🔓</span>
            <span class="indicator-text">Acceso Especial Disponible</span>
        `;
        indicator.addEventListener('click', () => this.openPopup());
        
        // Agregar al header o área visible
        const header = document.querySelector('.header-right');
        if (header) {
            header.insertBefore(indicator, header.firstChild);
        }
    }

    /**
     * Escapa HTML para prevenir XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Crear instancia global
const vegaPopup = new VegaClassifiedPopup();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    vegaPopup.init();
});
