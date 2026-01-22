// Datos de archivos simulados
const mockFiles = [
    // ============ SECCIÓN DE DOCUMENTOS ============
    {
        id: 1,
        name: "Operación Nightfall - Informe de Misión.pdf",
        classification: 1,
        lastModified: "2026-01-18",
        status: "Activo",
        category: "documents",
        access: "granted",
        summary: "Operación de vigilancia encubierta dirigida al sindicato criminal 'Velo Rojo' que opera en redes financieras de Europa del Este. Los objetivos de la misión incluyen identificación de activos, intercepción de comunicaciones y planificación de disrupciones estratégicas."
    },
    {
        id: 2,
        name: "Memorando de Seguridad Interna 2026-003.docx",
        classification: 2,
        lastModified: "2026-01-15",
        status: "Aprobado",
        category: "documents",
        access: "granted",
        summary: "Protocolos de seguridad actualizados para operativos de campo tras el incidente de compromiso de diciembre de 2025. Estándares de cifrado obligatorios y procedimientos de rotación de canales de comunicación ahora en vigor."
    },
    {
        id: 3,
        name: "Evaluación de Amenaza - Grupo Cibernético 'Phantom Wire'.pdf",
        classification: 1,
        lastModified: "2026-01-12",
        status: "En Revisión",
        category: "documents",
        access: "granted",
        summary: "Análisis integral de amenazas de un colectivo de hackers sofisticado que ataca infraestructura crítica. La evaluación incluye matriz de capacidades, afiliaciones conocidas, patrones de ataque y contramedidas recomendadas."
    },
    {
        id: 4,
        name: "Resumen de Inteligencia Trimestral Q4-2025.pdf",
        classification: 2,
        lastModified: "2025-12-28",
        status: "Aprobado",
        category: "documents",
        access: "granted",
        summary: "Informe ejecutivo que cubre los principales desarrollos de inteligencia en el último trimestre de 2025. Incluye vectores de amenazas emergentes, resumen de operaciones exitosas y prioridades estratégicas para 2026."
    },
    {
        id: 5,
        name: "Operación Glass Echo - Informe Post-Acción.docx",
        classification: 1,
        lastModified: "2025-12-20",
        status: "Aprobado",
        category: "documents",
        access: "granted",
        summary: "Análisis post-operación de la intercepción exitosa de una red de tráfico de armas ilegal. Documenta cronología, despliegue de activos, inteligencia recopilada y lecciones aprendidas para futuras operaciones."
    },
    {
        id: 6,
        name: "Actualización de Protocolo Clasificado - Serie Delta.pdf",
        classification: 1,
        lastModified: "2025-12-15",
        status: "Activo",
        category: "documents",
        access: "granted",
        summary: "Protocolos operacionales actualizados para operaciones de campo clase Delta. Incluye nuevas reglas de enfrentamiento, procedimientos de extracción y metodologías de recopilación de inteligencia tras reformas de coordinación interagencial."
    },
    {
        id: 7,
        name: "Análisis de Riesgo Geopolítico - Región 7.pdf",
        classification: 2,
        lastModified: "2025-12-10",
        status: "En Revisión",
        category: "documents",
        access: "granted",
        summary: "Evaluación estratégica de inestabilidad política y amenazas de seguridad en la Región 7 designada. El análisis incluye dinámicas de poder, grupos militantes emergentes y áreas de enfoque de inteligencia recomendadas."
    },
    {
        id: 8,
        name: "Informe de Auditoría Interna - Seguridad de Información.pdf",
        classification: 2,
        lastModified: "2025-12-05",
        status: "Aprobado",
        category: "documents",
        access: "granted",
        summary: "Hallazgos y recomendaciones de la auditoría anual de seguridad de información. Cubre vulnerabilidades de red, efectividad del control de acceso y cumplimiento con procedimientos de manejo de material clasificado."
    },
    {
        id: 9,
        name: "Operación Crimson Dawn - Plan Operacional.pdf",
        classification: 1,
        lastModified: "2025-11-28",
        status: "Pendiente de Aprobación",
        category: "documents",
        access: "granted",
        summary: "Operación multifase propuesta para infiltrar y desmantelar red de contrabando organizado que opera a través de canales marítimos. Incluye asignación de recursos, cronología y evaluación de riesgos."
    },
    {
        id: 10,
        name: "Acuerdo de Intercambio de Inteligencia - Revisión de Protocolo.docx",
        classification: 2,
        lastModified: "2025-11-20",
        status: "Aprobado",
        category: "documents",
        access: "granted",
        summary: "Marco revisado para compartir inteligencia con agencias aliadas. Actualiza procedimientos de manejo de clasificación, políticas de retención de datos y protocolos de comunicación de emergencia."
    },
    {
        id: 11,
        name: "Manual de Operaciones de Campo - Edición 2026.pdf",
        classification: 2,
        lastModified: "2025-11-15",
        status: "Activo",
        category: "documents",
        access: "granted",
        summary: "Guía completa de operaciones de campo que cubre procedimientos operativos estándar, protocolos de emergencia, manejo de activos, técnicas de vigilancia y requisitos de seguridad operacional."
    },
    {
        id: 12,
        name: "Informe de Contrainteligencia - Evaluación de Amenaza Interna.pdf",
        classification: 1,
        lastModified: "2025-11-10",
        status: "Activo",
        category: "documents",
        access: "granted",
        summary: "Análisis de indicadores de amenaza interna y estrategias de mitigación. Incluye reconocimiento de patrones de comportamiento, recomendaciones de monitoreo de acceso y procedimientos de respuesta a incidentes."
    },

    // ============ SECCIÓN DE INTELIGENCIA ============
    {
        id: 20,
        name: "Informe SIGINT - Paquete de Intercepción 447-B.txt",
        classification: 1,
        lastModified: "2026-01-19",
        status: "Prioridad Crítica",
        category: "intelligence",
        access: "granted",
        summary: "Intercepción de inteligencia de señales de presunta organización criminal. Las comunicaciones hacen referencia a una reunión planificada en ubicación 'Nido del Cuervo' el 2026-01-25. Descifrado en curso, contenido parcial analizado."
    },
    {
        id: 21,
        name: "Informe de Campo - Activo HALCÓN-12 (Sector Este).pdf",
        classification: 2,
        lastModified: "2026-01-18",
        status: "Verificado",
        category: "intelligence",
        access: "granted",
        summary: "Inteligencia humana de activo infiltrado sobre rutas de tráfico de armas a través de instalaciones portuarias industriales. El activo informa actividad aumentada y nuevos métodos de contrabando usando contenedores de envío comercial."
    },
    {
        id: 22,
        name: "Inteligencia Cibernética - Monitoreo Web Oscura Ene 2026.pdf",
        classification: 1,
        lastModified: "2026-01-17",
        status: "Bajo Análisis",
        category: "intelligence",
        access: "granted",
        summary: "Informe mensual de vigilancia de la web oscura. Hallazgos notables incluyen mercado vendiendo credenciales robadas, discusión de vulnerabilidades de infraestructura crítica y coordinación de ataques distribuidos de denegación de servicio."
    },
    {
        id: 23,
        name: "Resumen de Vigilancia - Sujeto MERCURIO (Período de 12 Días).docx",
        classification: 2,
        lastModified: "2026-01-16",
        status: "En Curso",
        category: "intelligence",
        access: "granted",
        summary: "Vigilancia física y electrónica del objetivo de alto valor MERCURIO. El sujeto se reunió con asociados conocidos en cuatro ocasiones. El análisis de patrones sugiere coordinación para operación de fraude financiero."
    },
    {
        id: 24,
        name: "Análisis GEOINT - Sitio de Construcción de Instalación 'Epsilon'.pdf",
        classification: 1,
        lastModified: "2026-01-15",
        status: "Verificado",
        category: "intelligence",
        access: "granted",
        summary: "Análisis de inteligencia geoespacial de actividad de construcción sospechosa en ubicación remota. Imágenes satelitales revelan perímetro fortificado, sistema de comunicaciones y expansión de instalación subterránea."
    },
    {
        id: 25,
        name: "Inteligencia Financiera - Red de Lavado de Dinero 'Meridian'.pdf",
        classification: 2,
        lastModified: "2026-01-14",
        status: "Investigación Activa",
        category: "intelligence",
        access: "granted",
        summary: "Análisis de transacciones financieras revelando esquema complejo de lavado de dinero. La red involucra empresas fantasma, exchanges de criptomonedas y transferencias bancarias internacionales totalizando $47M en seis meses."
    },
    {
        id: 26,
        name: "Intercepción de Comunicaciones - Canal Cifrado 'DELTA-9'.txt",
        classification: 1,
        lastModified: "2026-01-13",
        status: "Descifrado Parcial",
        category: "intelligence",
        access: "granted",
        summary: "Comunicaciones cifradas interceptadas entre presuntos operativos. El descifrado parcial revela referencias a 'llegada de cargamento' y 'activación de red de distribución' programada para finales de enero."
    },
    {
        id: 27,
        name: "Inteligencia de Fuentes Abiertas - Informe de Análisis de Redes Sociales.pdf",
        classification: 2,
        lastModified: "2026-01-12",
        status: "Completado",
        category: "intelligence",
        access: "granted",
        summary: "Análisis OSINT de actividad pública en redes sociales vinculada a personas de interés. Datos de geolocalización, mapeo de relaciones y patrones de comportamiento identificados mediante herramientas de análisis automatizado."
    },
    {
        id: 28,
        name: "Inteligencia de Seguridad Fronteriza - Patrones de Tránsito Inusuales.pdf",
        classification: 2,
        lastModified: "2026-01-11",
        status: "En Revisión",
        category: "intelligence",
        access: "granted",
        summary: "Análisis de patrones anómalos de movimiento transfronterizo. Múltiples individuos con documentación presuntamente falsa detectados en puntos de entrada. Coordinación con agencias de control fronterizo."
    },
    {
        id: 29,
        name: "Inteligencia Técnica - Análisis de Muestra de Malware.pdf",
        classification: 1,
        lastModified: "2026-01-10",
        status: "Crítico",
        category: "intelligence",
        access: "granted",
        summary: "Análisis forense de malware de amenaza persistente avanzada descubierto en sistema comprometido. El análisis de código revela capacidades sofisticadas de exfiltración de datos e infraestructura de comando y control."
    },
    {
        id: 30,
        name: "Informe de Contraterrorismo - Indicadores de Amenaza Emergente.pdf",
        classification: 1,
        lastModified: "2026-01-09",
        status: "Monitoreo Activo",
        category: "intelligence",
        access: "granted",
        summary: "Resumen de inteligencia sobre indicadores de radicalización y potenciales actores de amenaza. Incluye monitoreo de actividad en línea, patrones de viaje y análisis de redes de comunicación."
    },
    {
        id: 31,
        name: "Boletín de Inteligencia Regional - Sector Sureste.pdf",
        classification: 2,
        lastModified: "2026-01-08",
        status: "Distribuido",
        category: "intelligence",
        access: "granted",
        summary: "Compilación semanal de inteligencia para el sector operacional del Sureste. Cubre actividad de organizaciones criminales, coordinación con fuerzas del orden y preocupaciones de seguridad emergentes."
    },

    // ============ OTRAS CATEGORÍAS ============
    {
        id: 40,
        name: "Registro de Actividad del Servidor_2026-01-14.log",
        classification: 1,
        lastModified: "2026-01-14",
        status: "Normal",
        category: "logs",
        access: "granted"
    },
    {
        id: 41,
        name: "Archivo Histórico Q4-2025 Operaciones.zip",
        classification: 1,
        lastModified: "2026-01-01",
        status: "Archivado",
        category: "archive",
        access: "granted"
    },
    {
        id: 42,
        name: "Proyecto Quimera - Operaciones Clasificadas.pdf",
        classification: 3,
        lastModified: "2025-10-01",
        status: "Acceso Restringido",
        category: "restricted",
        access: "denied"
    },
    {
        id: 43,
        name: "Documento de Investigación de Criptografía Cuántica.pdf",
        classification: 1,
        lastModified: "2025-09-15",
        status: "Publicado",
        category: "research",
        access: "granted",
        summary: "Investigación avanzada sobre protocolos de distribución de claves cuánticas para comunicaciones ultra seguras. Incluye marco teórico, desafíos de implementación práctica y recomendaciones para despliegue en redes clasificadas."
    },
    {
        id: 44,
        name: "Estudio de Metodologías de Análisis de Inteligencia.pdf",
        classification: 2,
        lastModified: "2025-08-20",
        status: "En Revisión",
        category: "research",
        access: "granted",
        summary: "Estudio integral de técnicas modernas de análisis de inteligencia incluyendo reconocimiento de patrones, modelado predictivo y fusión de inteligencia de múltiples fuentes. Propone marcos analíticos mejorados para evaluaciones de amenazas complejas."
    },
    {
        id: 45,
        name: "Aplicaciones de Inteligencia Artificial en Detección de Amenazas.pdf",
        classification: 1,
        lastModified: "2025-12-10",
        status: "Publicado",
        category: "research",
        access: "granted",
        summary: "Investigación sobre algoritmos de aprendizaje automático para detección automatizada de amenazas e identificación de anomalías. Cubre arquitecturas de redes neuronales, metodologías de entrenamiento y consideraciones de despliegue en el mundo real."
    },
    {
        id: 46,
        name: "Psicología Conductual en Operaciones de Contrainteligencia.pdf",
        classification: 2,
        lastModified: "2025-11-25",
        status: "Publicado",
        category: "research",
        access: "granted",
        summary: "Análisis de técnicas de perfilado psicológico para identificar amenazas internas y operativos de inteligencia hostil. Incluye indicadores de comportamiento, sesgos cognitivos y metodologías de interrogación."
    },
    {
        id: 47,
        name: "Sistemas de Identificación Biométrica de Próxima Generación.pdf",
        classification: 1,
        lastModified: "2025-10-30",
        status: "En Revisión",
        category: "research",
        access: "granted",
        summary: "Investigación técnica sobre tecnologías biométricas avanzadas incluyendo análisis de marcha, reconocimiento de patrones venosos y sistemas de autenticación multifactor para entornos de alta seguridad."
    },
    {
        id: 48,
        name: "Análisis del Panorama de Amenazas de Ciberseguridad 2025.pdf",
        classification: 2,
        lastModified: "2025-12-28",
        status: "Publicado",
        category: "research",
        access: "granted",
        summary: "Revisión anual integral de amenazas cibernéticas emergentes, vectores de ataque y estrategias defensivas. Incluye estudios de casos de incidentes de seguridad importantes y recomendaciones para fortalecer la infraestructura."
    },
    {
        id: 49,
        name: "Análisis de Redes Sociales para Investigación Criminal.pdf",
        classification: 1,
        lastModified: "2025-09-05",
        status: "Publicado",
        category: "research",
        access: "granted",
        summary: "Investigación sobre teoría de grafos y aplicaciones de análisis de redes para mapear organizaciones criminales. Presenta algoritmos para identificar actores clave, patrones de comunicación y vulnerabilidades organizacionales."
    },
    {
        id: 50,
        name: "Evaluación de Tecnología de Vigilancia con Drones.pdf",
        classification: 1,
        lastModified: "2025-11-12",
        status: "En Revisión",
        category: "research",
        access: "granted",
        summary: "Evaluación de plataformas de vehículos aéreos no tripulados para operaciones de recopilación de inteligencia. Cubre capacidades de sensores, navegación autónoma y consideraciones legales/operacionales."
    },
    
    // ============ SECCIÓN DE ARCHIVO (Mejorada) ============
    {
        id: 60,
        name: "Archivo Histórico Q4-2025 Operaciones.zip",
        classification: 1,
        lastModified: "2026-01-01",
        status: "Archivado",
        category: "archive",
        access: "granted",
        summary: "Archivo operacional completo del cuarto trimestre de 2025 incluyendo informes de misión, resúmenes de inteligencia y productos analíticos. Contiene 1,247 documentos clasificados totalizando 12.8 GB."
    },
    {
        id: 61,
        name: "Base de Datos de Casos Sin Resolver 2015-2020.zip",
        classification: 2,
        lastModified: "2025-12-15",
        status: "Archivado",
        category: "archive",
        access: "granted",
        summary: "Archivos de investigación de casos sin resolver del período 2015-2020. Incluye declaraciones de testigos, evidencia forense, registros de vigilancia y notas de casos para posible revisión futura."
    },
    {
        id: 62,
        name: "Operación Protocolo Fantasma - Archivo Completo.zip",
        classification: 1,
        lastModified: "2025-11-28",
        status: "Archivado",
        category: "archive",
        access: "granted",
        summary: "Archivo completo de la Operación Protocolo Fantasma incluyendo documentos de planificación, informes de campo, productos de inteligencia y análisis post-operación. Misión concluida exitosamente en noviembre de 2025."
    },
    {
        id: 63,
        name: "Archivo de Informes de Inteligencia Q3-2025.zip",
        classification: 1,
        lastModified: "2025-10-05",
        status: "Archivado",
        category: "archive",
        access: "granted",
        summary: "Archivo trimestral de todos los informes de inteligencia del Q3 2025. Incluye productos SIGINT, HUMINT, GEOINT y OSINT de todas las divisiones operacionales totalizando 8,934 informes individuales."
    },
    {
        id: 64,
        name: "Archivo de Materiales de Capacitación 2024-2025.zip",
        classification: 2,
        lastModified: "2025-09-20",
        status: "Archivado",
        category: "archive",
        access: "granted",
        summary: "Currículos de capacitación archivados, materiales instructivos y registros de certificación para personal de operaciones clasificadas. Incluye procedimientos tácticos, técnicas analíticas y protocolos de seguridad operacional."
    },
    {
        id: 65,
        name: "Archivo de Operaciones Contraterroristas 2023.zip",
        classification: 1,
        lastModified: "2025-08-10",
        status: "Archivado",
        category: "archive",
        access: "granted",
        summary: "Archivo integral de operaciones contraterroristas realizadas en 2023. Contiene evaluaciones de amenazas, planificación operacional, registros de vigilancia y resultados de misiones de 47 operaciones separadas."
    },
    {
        id: 66,
        name: "Archivos de Investigación de Delitos Financieros 2022-2024.zip",
        classification: 2,
        lastModified: "2025-07-25",
        status: "Archivado",
        category: "archive",
        access: "granted",
        summary: "Archivo de investigaciones de delitos financieros incluyendo casos de lavado de dinero, fraude y corrupción. Contiene registros de transacciones, informes de contabilidad forense y materiales de procesamiento de casos."
    },
    {
        id: 67,
        name: "Repositorio de Datos de Vigilancia Histórica 2020-2023.zip",
        classification: 1,
        lastModified: "2025-06-15",
        status: "Archivado",
        category: "archive",
        access: "granted",
        summary: "Almacenamiento a largo plazo de datos de vigilancia de operaciones cerradas. Incluye grabaciones de video, grabaciones de audio, evidencia fotográfica y datos de seguimiento de geolocalización abarcando tres años."
    },
    
    // ============ SECCIÓN RESTRINGIDA (Mejorada) ============
    {
        id: 80,
        name: "Proyecto Quimera - Operaciones Clasificadas.pdf",
        classification: 1,
        lastModified: "2025-10-01",
        status: "Activo",
        category: "restricted",
        access: "granted",
        summary: "Programa de acceso especial altamente clasificado que involucra métodos avanzados de recopilación de inteligencia. Detalla capacidades operacionales compartimentadas y protocolos de despliegue para misiones sensibles."
    },
    {
        id: 81,
        name: "CÓSMICO ULTRA SECRETO - Informe de Inteligencia Estratégica.pdf",
        classification: 1,
        lastModified: "2026-01-10",
        status: "Activo",
        category: "restricted",
        access: "granted",
        summary: "Inteligencia CÓSMICO ULTRA SECRETO de la OTAN sobre amenazas estratégicas a la seguridad de la alianza. Contiene fusión de inteligencia de múltiples fuentes sobre espionaje patrocinado por estados y capacidades militares."
    },
    {
        id: 82,
        name: "Programa de Presupuesto Negro - Análisis Fiscal.pdf",
        classification: 1,
        lastModified: "2025-12-20",
        status: "Clasificado",
        category: "restricted",
        access: "granted",
        summary: "Análisis financiero de programas de acceso especial financiados a través de asignación presupuestaria clasificada. Detalla distribución de recursos para operaciones de inteligencia sensibles y desarrollo de tecnología."
    },
    {
        id: 83,
        name: "Fuentes de Inteligencia Compartimentadas - Informe del Controlador.pdf",
        classification: 1,
        lastModified: "2025-11-30",
        status: "Activo",
        category: "restricted",
        access: "granted",
        summary: "Informe sobre fuentes de inteligencia humana compartimentadas que proporcionan información crítica sobre servicios de inteligencia extranjeros. Contiene evaluaciones de fuentes, producción de inteligencia y protocolos de seguridad."
    },
    {
        id: 84,
        name: "Tecnologías de Vigilancia Avanzada - Capacidades Clasificadas.pdf",
        classification: 1,
        lastModified: "2025-10-15",
        status: "Restringido",
        category: "restricted",
        access: "granted",
        summary: "Documentación técnica de capacidades de vigilancia clasificadas incluyendo intercepción de señales, seguimiento de ubicación y monitoreo encubierto de comunicaciones. Se requiere autorización de despliegue."
    },
    {
        id: 85,
        name: "Enlace de Inteligencia Extranjera - Coordinación Sensible.pdf",
        classification: 1,
        lastModified: "2025-09-28",
        status: "Activo",
        category: "restricted",
        access: "granted",
        summary: "Protocolos de coordinación para compartir inteligencia con servicios socios extranjeros. Contiene acuerdos clasificados, procedimientos de manejo de información y marcos de operación conjunta."
    }
];

const mockWatchlist = [
    {
        id: "WL-7821",
        name: "Viktor Kozlov",
        alias: "El Arquitecto",
        riskLevel: "SEVERO",
        flagReason: "Liderazgo de red de cibercrimen internacional",
        assignedDivision: "Unidad de Análisis de Amenazas Cibernéticas",
        status: "VIGILANCIA ACTIVA",
        lastActivity: "2026-01-18",
        events: [
            { date: "2025-09-12", description: "Sujeto identificado por primera vez a través de comunicaciones interceptadas en la web oscura discutiendo operación de violación de datos a gran escala." },
            { date: "2025-10-03", description: "Inteligencia financiera vincula al sujeto con billeteras de criptomonedas que reciben pagos de ransomware totalizando $12.3M." },
            { date: "2025-11-15", description: "Vigilancia física confirma reunión con asociados cibercriminales conocidos en ubicación <span class=\"redacted\">[CENSURADO]</span>." },
            { date: "2025-12-20", description: "Intercepción SIGINT revela que el sujeto coordina operación de hackeo multinacional dirigida a instituciones financieras." },
            { date: "2026-01-18", description: "Sujeto detectado accediendo a plataforma de comunicación cifrada. Monitoreo en tiempo real autorizado. Estado: VIGILANCIA ACTIVA." }
        ]
    },
    {
        id: "WL-5634",
        name: "Amara Okafor",
        alias: "Belladona",
        riskLevel: "ALTO",
        flagReason: "Operaciones de tráfico y contrabando de armas",
        assignedDivision: "División de Crimen Transnacional",
        status: "MONITOREADO",
        lastActivity: "2026-01-15",
        events: [
            { date: "2025-08-05", description: "Sujeto marcado por sistemas de seguridad fronteriza por patrones repetidos de viaje internacional a regiones de alto riesgo." },
            { date: "2025-09-22", description: "Inteligencia de aduanas reporta envíos de carga sospechosos vinculados a entidades comerciales del sujeto." },
            { date: "2025-11-08", description: "Análisis financiero revela red de empresas fantasma usadas para ocultar fuente de fondos. Valor estimado de operación: $8.5M anuales." },
            { date: "2025-12-14", description: "Comunicaciones interceptadas hacen referencia a 'entrega de carga' y 'mercancía especial' usando lenguaje codificado conocido." },
            { date: "2026-01-15", description: "Sujeto se reunió con individuo marcado en investigación separada. Conexión siendo analizada. Estado: MONITOREADO." }
        ]
    },
    {
        id: "WL-4103",
        name: "Chen Wei",
        alias: "Zorro Plateado",
        riskLevel: "ALTO",
        flagReason: "Espionaje corporativo y robo de propiedad intelectual",
        assignedDivision: "División de Seguridad Económica",
        status: "BAJO INVESTIGACIÓN",
        lastActivity: "2026-01-17",
        events: [
            { date: "2025-07-19", description: "Sujeto identificado como persona de interés tras reporte de violación de datos en instalación de investigación tecnológica." },
            { date: "2025-09-02", description: "Historial laboral revela patrón de posiciones a corto plazo en empresas que desarrollan tecnologías sensibles." },
            { date: "2025-10-28", description: "Análisis forense digital indica que el sujeto accedió a bases de datos de investigación clasificada fuera del horario laboral autorizado." },
            { date: "2025-12-05", description: "Sujeto contactado por presunto operativo de inteligencia extranjera. Monitoreo de comunicaciones iniciado." },
            { date: "2026-01-17", description: "Transferencia de datos reciente a servidor externo detectada. Contenido bajo análisis. Estado: BAJO INVESTIGACIÓN." }
        ]
    },
    {
        id: "WL-9247",
        name: "Dimitri Volkov",
        alias: "Fantasma",
        riskLevel: "SEVERO",
        flagReason: "Operaciones de sindicato del crimen organizado",
        assignedDivision: "Fuerza de Tarea de Crimen Organizado",
        status: "OBJETIVO PRIORITARIO",
        lastActivity: "2026-01-19",
        events: [
            { date: "2025-06-10", description: "Sujeto identificado como miembro de alto rango de organización criminal transnacional 'Sindicato Velo Rojo'." },
            { date: "2025-08-15", description: "Equipos de vigilancia reportan que el sujeto coordina operaciones a través de múltiples células en diferentes regiones geográficas." },
            { date: "2025-10-20", description: "Inteligencia financiera revela red de lavado de dinero que procesa aproximadamente $25M trimestralmente." },
            { date: "2025-12-08", description: "Comunicación interceptada sugiere que el sujeto planea operación mayor para Q1 2026. Detalles permanecen poco claros." },
            { date: "2026-01-19", description: "Sujeto entró en jurisdicción. Todas las unidades de campo alertadas. Protocolos de vigilancia mejorados activados. Estado: OBJETIVO PRIORITARIO." }
        ]
    },
    {
        id: "WL-3398",
        name: "Desconocido",
        alias: "Nodo Fantasma",
        riskLevel: "CRÍTICO",
        flagReason: "Actor de amenaza persistente avanzada",
        assignedDivision: "Operaciones de Defensa Cibernética",
        status: "IDENTIFICACIÓN EN CURSO",
        lastActivity: "2026-01-20",
        events: [
            { date: "2025-10-01", description: "Actividad de red anómala detectada. Intentos de intrusión sofisticados usando exploits de día cero identificados." },
            { date: "2025-10-15", description: "Análisis de patrones vincula actividad a múltiples intrusiones cibernéticas previas. Firma de código coincide con grupo APT 'Nodo Fantasma'." },
            { date: "2025-11-20", description: "Análisis de infraestructura revela servidores de comando y control operando a través de sistemas legítimos comprometidos." },
            { date: "2025-12-28", description: "Análisis de atribución en curso. Posible actor patrocinado por estado o colectivo criminal altamente capacitado." },
            { date: "2026-01-20", description: "Nuevo intento de intrusión detectado y bloqueado. Muestra de malware obtenida para análisis. Estado: IDENTIFICACIÓN EN CURSO." }
        ]
    },
    {
        id: "WL-6789",
        name: "Isabella Marquez",
        alias: "La Sombra",
        riskLevel: "ALTO",
        flagReason: "Coordinadora de cartel de narcotráfico",
        assignedDivision: "Unidad de Inteligencia de Narcóticos",
        status: "VIGILANCIA ACTIVA",
        lastActivity: "2026-01-16",
        events: [
            { date: "2025-07-22", description: "Sujeto identificado a través de inteligencia de informante como coordinadora logística para organización de tráfico importante." },
            { date: "2025-09-10", description: "Vigilancia confirma que el sujeto gestiona red de distribución a través de tres regiones usando comunicaciones cifradas." },
            { date: "2025-11-05", description: "Intercepción fronteriza de cargamento rastreado a la red del sujeto. Valor de calle estimado: $4.2M." },
            { date: "2025-12-18", description: "Sujeto reubicado a nueva área de operaciones. Equipos de vigilancia redespliegados para mantener cobertura." },
            { date: "2026-01-16", description: "Intercepción de comunicaciones indica cargamento a gran escala planificado. Coordinación con equipos de interdicción en curso. Estado: VIGILANCIA ACTIVA." }
        ]
    },
    {
        id: "WL-2156",
        name: "Marcus Kane",
        alias: "Cipher",
        riskLevel: "MEDIO",
        flagReason: "Fraude de criptomonedas y delitos financieros",
        assignedDivision: "División de Delitos Financieros",
        status: "MONITOREADO",
        lastActivity: "2026-01-14",
        events: [
            { date: "2025-08-30", description: "Sujeto reportado en conexión con esquema de fraude de inversión en criptomonedas que afecta a más de 200 víctimas." },
            { date: "2025-10-12", description: "Análisis de blockchain revela red compleja de billeteras y exchanges usados para ocultar movimientos de fondos." },
            { date: "2025-11-28", description: "Sujeto creó múltiples entidades comerciales falsas y personas en línea para perpetrar esquemas de fraude." },
            { date: "2025-12-22", description: "Monto total de fraude estimado supera $3.8M. Recuento de víctimas continúa aumentando a medida que avanza la investigación." },
            { date: "2026-01-14", description: "Sujeto intentando liquidar tenencias de criptomonedas. Solicitud de congelación de activos presentada. Estado: MONITOREADO." }
        ]
    },
    {
        id: "WL-8502",
        name: "Nadia Volkova",
        alias: "Cuervo",
        riskLevel: "ALTO",
        flagReason: "Operaciones de red de tráfico humano",
        assignedDivision: "Fuerza de Tarea de Tráfico Humano",
        status: "BAJO INVESTIGACIÓN",
        lastActivity: "2026-01-18",
        events: [
            { date: "2025-06-18", description: "Sujeto identificado a través de testimonio de víctima como reclutadora para red de tráfico internacional." },
            { date: "2025-08-25", description: "Vigilancia revela que el sujeto opera en múltiples ciudades, usando negocios legítimos como fachada." },
            { date: "2025-10-30", description: "Interceptos de comunicación muestran que el sujeto coordina con operadores de la red en jurisdicciones extranjeras." },
            { date: "2025-12-12", description: "Sujeto vinculado a al menos 15 casos documentados de tráfico. Cooperación internacional solicitada." },
            { date: "2026-01-18", description: "Nueva víctima rescatada; información proporcionada implica al sujeto. Cargos adicionales siendo preparados. Estado: BAJO INVESTIGACIÓN." }
        ]
    },
    {
        id: "WL-1923",
        name: "Omar Rashid",
        alias: "El Corredor",
        riskLevel: "SEVERO",
        flagReason: "Red de adquisición de armas ilícitas",
        assignedDivision: "Unidad de Proliferación de Armas",
        status: "OBJETIVO PRIORITARIO",
        lastActivity: "2026-01-19",
        events: [
            { date: "2025-05-14", description: "Sujeto identificado como facilitador clave en red de tráfico ilegal de armas que abarca múltiples continentes." },
            { date: "2025-07-20", description: "Comunicaciones interceptadas revelan que el sujeto negocia acuerdos para sistemas de armas de grado militar." },
            { date: "2025-09-28", description: "Inteligencia financiera muestra pagos totalizando $18M por actividades de adquisición de armas." },
            { date: "2025-11-16", description: "Sujeto reuniéndose con traficantes de armas conocidos y usuarios finales. Varias transacciones documentadas." },
            { date: "2026-01-19", description: "Inteligencia sugiere transferencia importante de armas inminente. Operación de interdicción siendo planificada. Estado: OBJETIVO PRIORITARIO." }
        ]
    },
    {
        id: "WL-5471",
        name: "Yuki Tanaka",
        alias: "Zero",
        riskLevel: "MEDIO",
        flagReason: "Operación de robo de identidad y falsificación de documentos",
        assignedDivision: "Unidad de Fraude de Identidad",
        status: "MONITOREADO",
        lastActivity: "2026-01-13",
        events: [
            { date: "2025-09-05", description: "Sujeto arrestado por posesión de documentos falsificados. Liberado en espera de juicio; monitoreo iniciado." },
            { date: "2025-10-18", description: "Vigilancia revela que el sujeto continúa operaciones, ahora usando técnicas más sofisticadas." },
            { date: "2025-11-22", description: "Sujeto conectado a red que produce pasaportes fraudulentos, licencias de conducir y credenciales de identidad." },
            { date: "2025-12-30", description: "Documentos producidos por la red del sujeto usados en investigaciones criminales separadas." },
            { date: "2026-01-13", description: "Sujeto se reunió con individuos buscando credenciales falsas. Documentación de transacción obtenida. Estado: MONITOREADO." }
        ]
    }
];

const mockLeakIncidents = [
    {
        id: "E-1029",
        title: "Exposición de Subconjunto de Archivo",
        detectionTime: "2025-12-10 09:30 AM",
        impactRadius: "Servidores Internos, Equipo Proyecto Ruiseñor",
        affectedFiles: ["PN-Doc-001.pdf", "PN-Informe-Alfa.docx"],
        responseStatus: "CONTENIDO",
        description: "Un subconjunto no cifrado del archivo del Proyecto Ruiseñor fue brevemente expuesto debido a un servidor mal configurado. El acceso fue rápidamente revocado."
    },
    {
        id: "E-1103",
        title: "Espejo Externo Detectado",
        detectionTime: "2025-11-28 02:15 PM",
        impactRadius: "Proveedor de Alojamiento Externo",
        affectedFiles: ["Manual-OPS-V3.pdf", "Lista-Equipo.xlsx"],
        responseStatus: "BAJO INVESTIGACIÓN",
        description: "Un espejo externo de documentos operacionales críticos fue detectado en un servicio en la nube no aprobado. El origen de la filtración es actualmente desconocido."
    },
    {
        id: "E-1138",
        title: "Vector de Compromiso de Credenciales",
        detectionTime: "2025-11-15 11:00 AM",
        impactRadius: "Portal de Inicio de Sesión de Analistas",
        affectedFiles: ["Fragmento-BD-Usuarios.json"],
        responseStatus: "SIN RESOLVER",
        description: "Múltiples credenciales de analistas fueron comprometidas a través de un ataque de phishing sofisticado. El impacto total y las cuentas de usuario afectadas están bajo revisión."
    },
    {
        id: "E-1150",
        title: "Anomalía en Base de Datos SFI",
        detectionTime: "2025-12-05 06:45 PM",
        impactRadius: "Base de Datos Segura SFI",
        affectedFiles: ["SFI-Informe-Intel_Q4.pdf"],
        responseStatus: "CONTENIDO",
        description: "Un intento de consulta no autorizado fue registrado contra la base de datos segura SFI. No se detectó exfiltración de datos. Amenaza neutralizada."
    }
];

const mockTerminalLogs = [
    "> ARCHIVO-X Inicializando...",
    "> Estableciendo conexión segura...",
    "> Flujos de datos en línea.",
    `> ${new Date().toLocaleString()} - Canal SFI establecido.`, 
    `> ${new Date().toLocaleString()} - Correlación de lista negra coincidente: Sujeto LN-4471.`, 
    `> ${new Date().toLocaleString()} - Sujeto LN-4471 escalado. División de Amenazas Internas notificada.`, 
    `> ${new Date().toLocaleString()} - Vector de exposición externa aislado. Incidente #E-1103.`, 
    `> ${new Date().toLocaleString()} - Protocolo NDPO iniciado para comunicaciones sospechosas.`, 
];


let currentFilter = "overview";
let currentSearchTerm = "";

const loadingScreen = document.getElementById("loading-screen");
const accessDeniedOverlay = document.getElementById("access-denied-overlay");
const closeDeniedButton = document.getElementById("close-denied");
const fileListContainer = document.getElementById("file-list");
const searchInput = document.getElementById("search-input");
const sidebarNav = document.querySelector(".sidebar nav ul");
const documentViewerModal = document.getElementById("document-viewer-modal");
const viewerFileName = document.getElementById("viewer-file-name");
const viewerClassification = document.getElementById("viewer-classification");
const viewerLastModified = document.getElementById("viewer-last-modified");
const closeViewerButton = document.getElementById("close-viewer");
const emptyState = document.getElementById("empty-state");
const breadcrumb = document.querySelector(".breadcrumb");

const overviewContent = document.getElementById("overview-content");
const watchlistsContent = document.getElementById("watchlists-content");
const watchlistEntriesContainer = document.getElementById("watchlist-entries");
const subjectProfilePanel = document.getElementById("subject-profile-panel");
const closeProfilePanelButton = document.querySelector(".close-profile-panel");
const profileName = document.getElementById("profile-name");
const profileId = document.getElementById("profile-id");
const profileRisk = document.getElementById("profile-risk");
const timelineEvents = document.getElementById("timeline-events");
const profileStatusStamp = document.getElementById("profile-status-stamp");
const leakEventsTimeline = document.getElementById("leak-events-timeline");
const federalNoticeOverlay = document.getElementById("federal-notice-overlay");
const logOutput = document.getElementById("log-output");
const terminalLogsSection = document.getElementById("terminal-logs");

// Function to simulate loading
function showLoadingScreen() {
    loadingScreen.style.opacity = "1";
    loadingScreen.style.display = "flex";
    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 500); // Wait for fade out to complete
    }, 2000); // Display for 2 seconds
}

// Render files based on filter and search term
function renderFiles() {
    fileListContainer.innerHTML = "";
    let filteredFiles = mockFiles.filter(file => {
        const matchesCategory = currentFilter === "overview" || file.category === currentFilter;
        const matchesSearch = file.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredFiles.length === 0) {
        emptyState.style.display = "block";
        return;
    } else {
        emptyState.style.display = "none";
    }

    filteredFiles.forEach(file => {
        const fileCard = document.createElement("div");
        fileCard.classList.add("file-card");
        fileCard.dataset.fileId = file.id;

        let statusColor = "grey";
        if (file.status === "Aprobado" || file.status === "Normal" || file.status === "Publicado") {
            statusColor = "green";
        } else if (file.status === "Pendiente de Revisión" || file.status === "Bajo Investigación" || file.status === "En Revisión") {
            statusColor = "yellow";
        } else if (file.status === "Crítico" || file.status === "Restringido") {
            statusColor = "red";
        }

        fileCard.innerHTML = `
            <h3>${file.name}</h3>
            <div class="file-card-meta">
                <div>Clasificación: <span class="classification-tier tier-${file.classification}">Nivel ${file.classification}</span></div>
                <div>Última Modificación: ${file.lastModified}</div>
                <div>Estado: ${file.status} <span class="status-indicator-small ${statusColor}"></span></div>
            </div>
        `;
        fileListContainer.appendChild(fileCard);
    });
}

// Render Watchlist entries
function renderWatchlist() {
    watchlistEntriesContainer.innerHTML = "";
    mockWatchlist.forEach(subject => {
        const row = document.createElement("tr");
        let riskClass = "";
        if (subject.riskLevel === "SEVERE") {
            riskClass = "risk-severe pulse-animate";
        } else if (subject.riskLevel === "HIGH") {
            riskClass = "risk-high";
        }

        if (riskClass.length > 0) {
            riskClass.split(" ").forEach(cls => row.classList.add(cls));
        }
        row.dataset.subjectId = subject.id;

        row.innerHTML = `
            <td>${subject.id}</td>
            <td>${subject.name !== "N/A" ? subject.name : subject.alias}</td>
            <td class="${riskClass.includes("risk-severe") ? "risk-severe" : (riskClass.includes("risk-high") ? "risk-high" : "")}">${subject.riskLevel}</td>
            <td>${subject.flagReason}</td>
            <td>${subject.assignedDivision}</td>
            <td>${subject.status}</td>
        `;
        watchlistEntriesContainer.appendChild(row);
    });
}

// Open subject profile panel
function openSubjectProfile(subjectId) {
    const subject = mockWatchlist.find(s => s.id === subjectId);
    if (!subject) return;

    profileName.textContent = subject.name !== "N/A" ? subject.name : subject.alias;
    profileId.textContent = subject.id;
    profileRisk.textContent = subject.riskLevel;
    profileRisk.className = ""; // Clear existing classes
    if (subject.riskLevel === "SEVERE") {
        profileRisk.classList.add("risk-severe");
    } else if (subject.riskLevel === "HIGH") {
        profileRisk.classList.add("risk-high");
    }

    timelineEvents.innerHTML = "";
    subject.events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("timeline-event");
        eventDiv.innerHTML = `<span class="event-date">${event.date}</span> ${event.description}`;
        timelineEvents.appendChild(eventDiv);
    });

    profileStatusStamp.textContent = subject.status;
    profileStatusStamp.className = "status-stamp"; // Reset classes
    if (subject.status === "MONITORED") {
        profileStatusStamp.classList.add("monitored");
    } else if (subject.status === "SUSPENDED") {
        profileStatusStamp.classList.add("suspended");
    } else if (subject.status === "ESCALATED") {
        profileStatusStamp.classList.add("escalated");
    }

    subjectProfilePanel.classList.add("open");

    // Add event listener for redaction reveals
    timelineEvents.querySelectorAll(".redacted").forEach(el => {
        el.addEventListener("click", () => {
            el.classList.toggle("revealed");
        });
    });
}

// Close subject profile panel
function closeSubjectProfile() {
    subjectProfilePanel.classList.remove("open");
}

// Render Leak Incidents
function renderLeakIncidents() {
    leakEventsTimeline.innerHTML = "";
    mockLeakIncidents.forEach(incident => {
        const incidentDiv = document.createElement("div");
        incidentDiv.classList.add("leak-incident");

        let statusClass = "";
        if (incident.responseStatus === "CONTAINED") {
            statusClass = "contained";
        } else if (incident.responseStatus === "BAJO INVESTIGACIÓN") {
            statusClass = "investigation";
        } else if (incident.responseStatus === "UNRESOLVED") {
            statusClass = "unresolved";
        }

        incidentDiv.innerHTML = `
            <h4>Incidente #${incident.id} — ${incident.title}</h4>
            <p><strong>Hora de Detección:</strong> ${incident.detectionTime}</p>
            <p><strong>Radio de Impacto:</strong> ${incident.impactRadius}</p>
            <p><strong>Archivos Afectados:</strong> ${incident.affectedFiles.join(", ")}</p>
            <p><strong>Estado de Respuesta:</strong> <span class="leak-status-tag ${statusClass}">${incident.responseStatus}</span></p>
            <p>${incident.description}</p>
        `;
        leakEventsTimeline.appendChild(incidentDiv);
    });
}

// Show Federal Notice
function showFederalNotice(message, duration = 5000) {
    federalNoticeOverlay.innerHTML = `<p>${message}</p>`;
    federalNoticeOverlay.classList.add("active");
    setTimeout(() => {
        federalNoticeOverlay.classList.remove("active");
    }, duration);
}

// Add log entry to terminal
function addTerminalLog(message) {
    const p = document.createElement("p");
    p.textContent = `> ${new Date().toLocaleString()} - ${message}`;
    logOutput.appendChild(p);
    logOutput.scrollTop = logOutput.scrollHeight; // Scroll to bottom
}

// Function to switch tabs
function switchTab(filter) {
    // Hide all tab content
    document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.remove("active");
    });

    // Remove active class from all sidebar items
    sidebarNav.querySelectorAll("li").forEach(li => li.classList.remove("active"));

    // Show the selected tab content and activate sidebar item
    if (filter === "overview") {
        overviewContent.classList.add("active");
        document.querySelector("[data-filter=\"overview\"]").classList.add("active");
        breadcrumb.textContent = "Inicio / Resumen";
        renderFiles();
    } else if (filter === "watchlists") {
        watchlistsContent.classList.add("active");
        document.querySelector("[data-filter=\"watchlists\"]").classList.add("active");
        breadcrumb.textContent = "Inicio / Listas de Vigilancia";
        renderWatchlist();
        renderLeakIncidents();
        closeSubjectProfile(); // Close profile if open when switching tabs
    } else {
        overviewContent.classList.add("active"); // Predeterminado a resumen para otros filtros
        document.querySelector("[data-filter=\"overview\"]").classList.add("active");
        breadcrumb.textContent = `Inicio / ${filter.charAt(0).toUpperCase() + filter.slice(1)}`;
        currentFilter = filter;
        renderFiles();
    }
    currentFilter = filter;
}


// Open document viewer modal
function openDocumentViewer(fileId) {
    const file = mockFiles.find(f => f.id == fileId);
    if (!file) return;

    if (file.access === "denied") {
        accessDeniedOverlay.style.display = "flex";
        accessDeniedOverlay.style.opacity = "1";
        addTerminalLog(`ACCESO DENEGADO: Intento de acceso a archivo restringido ${file.name}.`);
        return;
    }

    viewerFileName.textContent = file.name;
    viewerClassification.textContent = `Clasificación: Nivel ${file.classification}`;
    viewerLastModified.textContent = `Última Modificación: ${file.lastModified}`;
    documentViewerModal.classList.add("open");
    addTerminalLog(`Visor de documento abierto para ${file.name}.`);
}

// Close document viewer modal
function closeDocumentViewer() {
    documentViewerModal.classList.remove("open");
}

// Event Listeners (Moved inside DOMContentLoaded)
document.addEventListener("DOMContentLoaded", () => {
    showLoadingScreen();

    searchInput.addEventListener("input", (e) => {
        currentSearchTerm = e.target.value;
        renderFiles();
        addTerminalLog(`Búsqueda iniciada para: ${currentSearchTerm}`);
    });

    sidebarNav.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            const filter = e.target.dataset.filter;
            switchTab(filter);
            addTerminalLog(`Cambiado a pestaña: ${filter.charAt(0).toUpperCase() + filter.slice(1)}`);
        }
    });

    if (fileListContainer) {
        fileListContainer.addEventListener("click", (e) => {
            const fileCard = e.target.closest(".file-card");
            if (fileCard) {
                openDocumentViewer(fileCard.dataset.fileId);
            }
        });
    }

    if (watchlistEntriesContainer) {
        watchlistEntriesContainer.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            if (row && row.dataset.subjectId) {
                openSubjectProfile(row.dataset.subjectId);
                addTerminalLog(`Perfil abierto para ID de sujeto: ${row.dataset.subjectId}`);
            }
        });
    }

    if (closeProfilePanelButton) {
        closeProfilePanelButton.addEventListener("click", closeSubjectProfile);
    }

    if (closeViewerButton) {
        closeViewerButton.addEventListener("click", closeDocumentViewer);
    }

    if (closeDeniedButton) {
        closeDeniedButton.addEventListener("click", () => {
            accessDeniedOverlay.style.opacity = "0";
            setTimeout(() => {
                accessDeniedOverlay.style.display = "none";
            }, 300); // Wait for fade out
        });
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        if (e.altKey && e.key === "5") {
            e.preventDefault();
            switchTab("watchlists");
            showFederalNotice("SUPERVISIÓN FEDERAL ACTIVA: Listas de vigilancia accedidas vía atajo.", 7000);
            addTerminalLog("Atajo de teclado (Alt+5) usado para acceder a Listas de Vigilancia.");
        }
    });

    // Command palette simulation (for interaction enhancement)
    window.executeCommand = function(command) { // Expose to global scope for easy testing
        switch (command.toLowerCase()) {
            case "open watchlists":
                switchTab("watchlists");
                showFederalNotice("REVISIÓN DE AMENAZAS INTERNAS EN PROGRESO: Listas de vigilancia abiertas por comando.", 7000);
                addTerminalLog("Comando: \'Abrir Listas de Vigilancia\' ejecutado.");
                break;
            case "view leak incidents":
                switchTab("watchlists"); // Asumiendo que los incidentes de filtración están dentro de la pestaña de listas de vigilancia
                // Desplazarse a la sección de incidentes de filtración si es necesario
                document.getElementById("leak-events-timeline").scrollIntoView({ behavior: "smooth" });
                addTerminalLog("Comando: \'Ver Incidentes de Filtración\' ejecutado.");
                break;
            case "initiate internal review":
                showFederalNotice("RIESGO DE EXPOSICIÓN DE DATOS DETECTADO: Iniciando revisión interna.", 10000);
                addTerminalLog("Comando: \'Iniciar Revisión Interna\' ejecutado.");
                break;
            case "lock system":
                addTerminalLog("Comando: \'Bloquear Sistema\' ejecutado. Simulando bloqueo del sistema...");
                showLoadingScreen(); // Reutilizar pantalla de carga para simulación de bloqueo
                break;
            default:
                addTerminalLog(`Comando desconocido: \'${command}\'`);
                break;
        }
    };

    renderFiles();
    renderWatchlist();
    renderLeakIncidents();

    // Notificación federal inicial
    showFederalNotice("SUPERVISIÓN FEDERAL DE INTELIGENCIA (SFI) - ESTADO DEL SISTEMA: OPERACIONAL", 5000);
});
