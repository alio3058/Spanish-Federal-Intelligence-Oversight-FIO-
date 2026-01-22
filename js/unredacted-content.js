/**
 * Unredacted Content Generator
 * Provides full, unredacted document content for Admin Override
 */

function generateUnredactedContent(doc) {
    const classificationText = doc.classification === 1 ? 'ULTRA SECRETO' :
                              doc.classification === 2 ? 'CONFIDENCIAL' : 'RESTRINGIDO';
    const docId = `SYS-2026-FIO-${String(doc.id).padStart(5, '0')}`;
    const dateObj = new Date(doc.lastModified);
    const formattedDate = dateObj.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    }).toUpperCase();
    
    return `
        <div class="classification-banner top-banner admin-override-banner">
            SIN REDACCIÓN - ANULACIÓN ADMIN // CÓSMICO ULTRA SECRETO // ${classificationText} // SCI
        </div>

        <header class="document-header">
            <div class="header-grid">
                <div class="header-item">
                    <span class="label">CLASIFICACIÓN:</span>
                    <span class="value classification-level">CÓSMICO / ${classificationText}</span>
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
                    <span class="label">COMPARTIMENTO:</span>
                    <span class="value">NIGHTFALL-SIGMA</span>
                </div>
            </div>
            
            <div class="warning-banner admin-override-banner">
                <div class="warning-icon">🔓</div>
                <div class="warning-text">
                    <strong>ANULACIÓN DE ADMIN ACTIVA:</strong> Documento completo sin redacción mostrado. Toda la información compartimentada visible. Este acceso está registrado y monitoreado.
                </div>
            </div>
        </header>

        <h1 class="document-title">
            SIN REDACCIÓN: ${doc.name.replace('.pdf', '').toUpperCase()}
        </h1>

        <section class="document-section">
            <h2 class="section-title">RESUMEN EJECUTIVO</h2>
            <div class="section-content">
                <p>${doc.summary}</p>
                <p>
                    Este documento contiene información derivada de 
                    fuentes y programas de la <strong>red de vigilancia global ECHELON</strong> 
                    clasificados bajo la designación de programa de acceso especial (SAP) 
                    <strong>NIGHTFALL-SIGMA</strong>. 
                    La distribución está limitada a individuos con necesidad documentada de conocer y 
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
                        <span class="severity-critical">NIGHTFALL-SIGMA</span>
                        <span class="incident-label">DESIGNACIÓN SAP:</span> 
                        <span class="severity-critical">CÓSMICO</span>
                    </div>
                    
                    <p>
                        Información compartimentada especial relacionada con 
                        actividades y capacidades del programa de <strong>vigilancia cuántica avanzada y capacidades criptográficas</strong>. 
                        Este material se deriva de:
                    </p>
                    
                    <ul>
                        <li>Fuentes SIGINT extremadamente sensibles con protección de palabra clave <strong>PRISM-EMERALD</strong></li>
                        <li>Activos de inteligencia humana operando bajo cobertura profunda en <strong>Valoria y Kronstadt</strong></li>
                        <li>Sistemas de recolección técnica designados <strong>red de satélites QUANTUM REACH</strong></li>
                        <li>Intercambio de inteligencia de naciones socias bajo acuerdo <strong>FIVE EYES EXTENDED</strong></li>
                        <li>Hallazgos de investigación del programa de acceso especial <strong>SHADOW NEXUS</strong></li>
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
                            <td><strong>Plataforma de Intercepción de Red Neuronal</strong></td>
                            <td><span class="threat-critical">CÓSMICO ULTRA SECRETO</span></td>
                            <td>Activo</td>
                            <td><strong>SIGMA-7</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Sistema de Array de Descifrado Cuántico</strong></td>
                            <td><span class="threat-critical">CÓSMICO ULTRA SECRETO</span></td>
                            <td>Desarrollo</td>
                            <td><strong>SIGMA-12</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Red Global de Monitoreo de Comunicaciones</strong></td>
                            <td><span class="threat-high">ULTRA SECRETO / SCI</span></td>
                            <td>Operacional</td>
                            <td><strong>SIGMA-3</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Sistema Avanzado de Seguimiento Biométrico</strong></td>
                            <td><span class="threat-critical">CÓSMICO ULTRA SECRETO</span></td>
                            <td>Planificación</td>
                            <td><strong>SIGMA-9</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="document-section">
            <h2 class="section-title">PARÁMETROS OPERACIONALES</h2>
            <div class="section-content">
                <div class="subsection">
                    <h3 class="subsection-title">Objetivos de Misión</h3>
                    <p>
                        La misión principal se enfoca en capacidades de 
                        <strong>intercepción y descifrado en tiempo real de comunicaciones encriptadas</strong> 
                        dirigidas a sistemas adversarios de <strong>inteligencia y militares de Kronstadt</strong>. 
                        Los objetivos secundarios incluyen:
                    </p>
                    <ul class="timeline-list">
                        <li>Despliegue de plataforma de <strong>vigilancia satelital cuántica</strong></li>
                        <li>Desarrollo de contramedidas de <strong>detección de amenazas con IA de próxima generación</strong></li>
                        <li>Integración con arquitectura de recolección <strong>ECHELON Mark VII</strong></li>
                        <li>Coordinación con programas de <strong>socios SIGINT de la OTAN</strong></li>
                    </ul>
                </div>

                <div class="subsection">
                    <h3 class="subsection-title">Capacidades Técnicas</h3>
                    <p>
                        <strong>Núcleo de Procesamiento Cuántico:</strong> Array de computador cuántico avanzado capaz de romper encriptación RSA de 4096 bits en menos de 3 horas. El sistema opera a 1,024 qubits con 99.97% de fidelidad. La aplicación principal se enfoca en el descifrado en tiempo real de comunicaciones interceptadas del Servicio de Inteligencia de Kronstadt y actores de amenaza aliados.
                    </p>
                    <p>
                        <strong>Reconocimiento de Patrones Neuronales:</strong> Sistema impulsado por IA que procesa 2.4 mil millones de comunicaciones por día, identificando automáticamente objetivos de interés con 94.3% de precisión usando análisis de patrones de comportamiento. Los algoritmos de aprendizaje automático entrenados en más de 15 años de datos SIGINT permiten evaluaciones de inteligencia predictiva.
                    </p>
                    <p>
                        Las métricas de rendimiento del sistema indican capacidad para 
                        <strong>interceptar y descifrar comunicaciones objetivo</strong> 
                        con precisión de <strong>94.3%</strong> bajo condiciones óptimas.
                    </p>
                </div>
            </div>
        </section>

        <section class="document-section">
            <h2 class="section-title">REQUISITOS DE ACCESO ESPECIAL</h2>
            <div class="section-content">
                <ol class="recommendations-list">
                    <li>El personal debe poseer autorización CÓSMICO ULTRA SECRETO con acceso compartimentado específico para <strong>NIGHTFALL-SIGMA</strong></li>
                    <li>Examen de polígrafo dentro de los últimos <strong>12</strong> meses requerido para acceso al programa</li>
                    <li>Inscripción en evaluación continua obligatoria para todo el personal del programa</li>
                    <li>El acceso requiere autorización del gerente de programa <strong>Director del Programa NIGHTFALL</strong></li>
                    <li>Todos los materiales deben almacenarse en instalación segura aprobada <strong>SCIF Nivel 5</strong></li>
                    <li>La discusión de información del programa está permitida solo en ubicaciones SCIF designadas</li>
                    <li>Viajes al extranjero requieren pre-aprobación y briefing por oficial de seguridad de la <strong>División de Seguridad de la FIO</strong></li>
                </ol>
            </div>
        </section>

        <section class="document-section">
            <h2 class="section-title">PROTOCOLOS DE SEGURIDAD</h2>
            <div class="section-content">
                <div class="subsection">
                    <h3 class="subsection-title">Manejo y Almacenamiento</h3>
                    <p>
                        Todos los materiales clasificados CÓSMICO deben manejarse de acuerdo con 
                        la directiva <strong>Directiva FIO 2024-17</strong>. Los requisitos específicos incluyen:
                    </p>
                    <ul class="timeline-list">
                        <li>Almacenamiento en caja fuerte aprobada por GSA <strong>Clase 6</strong> con acceso de control dual</li>
                        <li>Verificación de inventario cada <strong>24</strong> horas cuando no esté en uso</li>
                        <li>Integridad de dos personas mantenida en todo momento al acceder a materiales</li>
                        <li>Seguimiento electrónico vía <strong>sistema de gestión de documentos habilitado con RFID</strong></li>
                        <li>Trituración obligatoria usando <strong>trituradoras de corte cruzado aprobadas por la NSA</strong> para eliminación</li>
                    </ul>
                </div>

                <div class="subsection">
                    <h3 class="subsection-title">Personal Autorizado</h3>
                    <p>
                        Lista de acceso actual mantenida por <strong>Oficina de Seguridad de la FIO (OOS)</strong>. 
                        A partir de <strong>enero de 2026</strong>, las siguientes posiciones están autorizadas:
                    </p>
                    <ul class="timeline-list">
                        <li><strong>Subdirector, Operaciones de Inteligencia</strong></li>
                        <li><strong>Jefe, División de Inteligencia de Señales</strong></li>
                        <li><strong>Gerente del Programa NIGHTFALL y Adjuntos (3 posiciones)</strong></li>
                        <li><strong>Analistas Senior con acceso compartimentado SIGMA (12 posiciones)</strong></li>
                        <li><strong>Especialistas en Operaciones Técnicas (8 posiciones)</strong></li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="document-section">
            <h2 class="section-title">EVALUACIÓN Y RECOMENDACIONES</h2>
            <div class="section-content">
                <p>
                    El programa NIGHTFALL-SIGMA continúa proporcionando ventajas críticas de inteligencia 
                    contra objetivos prioritarios. Éxitos recientes incluyen el descifrado de 
                    comunicaciones del <strong>Ministerio de Defensa de Kronstadt</strong> revelando planes de modernización militar 
                    y la identificación de <strong>17 operativos de inteligencia previamente desconocidos</strong> 
                    mediante análisis de patrones de vida.
                </p>
                <p>
                    Las recomendaciones de expansión del programa para el Año Fiscal 2027 incluyen:
                </p>
                <ol class="recommendations-list">
                    <li>Aumentar la capacidad de procesamiento cuántico en 40% para manejar el creciente volumen de comunicaciones</li>
                    <li>Desplegar nodos de recolección adicionales en el <strong>teatro de Europa del Este</strong></li>
                    <li>Integración mejorada con <strong>plataformas de inteligencia satelital de la Fuerza Espacial</strong></li>
                    <li>Asociación expandida con <strong>GCHQ del Reino Unido</strong> y <strong>Dirección Australiana de Señales</strong></li>
                    <li>Desarrollo de algoritmos de predicción de amenazas con IA de próxima generación</li>
                </ol>
            </div>
        </section>

        <div class="classification-banner bottom-banner admin-override-banner">
            SIN REDACCIÓN - ANULACIÓN ADMIN // CÓSMICO ULTRA SECRETO // ${classificationText} // SCI
        </div>
    `;
}

// Export for use in RestrictedComponent
window.generateUnredactedContent = generateUnredactedContent;
