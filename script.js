// Datos de archivos simulados
const mockFiles = [
    {
        id: 1,
        name: "Proyecto Anochecer – Resumen.pdf",
        classification: 1,
        lastModified: "2024-01-15",
        status: "Aprobado",
        category: "documents",
        access: "granted"
    },
    {
        id: 2,
        name: "Análisis de Interceptación de Señales_07.txt",
        classification: 2,
        lastModified: "2023-12-20",
        status: "Revisión Pendiente",
        category: "intelligence",
        access: "granted"
    },
    {
        id: 3,
        name: "Informe Operacional Eco de Cristal.docx",
        classification: 1,
        lastModified: "2024-01-01",
        status: "Aprobado",
        category: "restricted",
        access: "granted"
    },
    {
        id: 4,
        name: "Registro de Prueba de Inteligencia Sintética.json",
        classification: 3,
        lastModified: "2024-01-10",
        status: "Crítico",
        category: "logs",
        access: "denied"
    },
    {
        id: 5,
        name: "Protocolo de Cifrado Cuántico.pdf",
        classification: 1,
        lastModified: "2023-11-25",
        status: "Aprobado",
        category: "documents",
        access: "granted"
    },
    {
        id: 6,
        name: "Informe de Evaluación de Amenazas_Alfa.docx",
        classification: 2,
        lastModified: "2024-01-05",
        status: "Bajo Investigación",
        category: "intelligence",
        access: "granted"
    },
    {
        id: 7,
        name: "Registro de Actividad del Servidor_2024-01-14.log",
        classification: 1,
        lastModified: "2024-01-14",
        status: "Normal",
        category: "logs",
        access: "granted"
    },
    {
        id: 8,
        name: "Archivo de Datos Históricos_T4_2023.zip",
        classification: 1,
        lastModified: "2024-01-01",
        status: "Archivado",
        category: "archive",
        access: "granted"
    },
    {
        id: 9,
        name: "Proyecto Quimera - Fase 1.pdf",
        classification: 3,
        lastModified: "2023-10-01",
        status: "Crítico",
        category: "restricted",
        access: "denied"
    },
    {
        id: 10,
        name: "Documento de Investigación - Ética de IA.pdf",
        classification: 1,
        lastModified: "2023-09-15",
        status: "Publicado",
        category: "research",
        access: "granted"
    }
];

const mockWatchlist = [
    {
        id: "BL-4471",
        name: "Adrián Colé",
        alias: "",
        riskLevel: "GRAVE",
        flagReason: "Extracción de datos no autorizada",
        assignedDivision: "División de Amenazas Internas",
        status: "ESCALADO",
        events: [
            { date: "2025-11-01", description: "Marcado inicial por actividad de red inusual." },
            { date: "2025-11-05", description: "Los registros de acceso indican transferencia de datos no autorizada a <span class=\"redacted\">[REDACTADO]</span>. Unidad Cibernética FIO notificada." },
            { date: "2025-11-10", description: "Sujeto entrevistado. Proporcionó <span class=\"redacted\">[REDACTADO]</span>. Respuesta considerada insatisfactoria." },
            { date: "2025-11-12", description: "Estado actualizado a ESCALADO. Participación de BDS iniciada." }
        ]
    },
    {
        id: "BL-3398",
        name: "N/D",
        alias: "Nodo Fantasma",
        riskLevel: "ALTO",
        flagReason: "Correlación con filtración de datos externos",
        assignedDivision: "Unidad Cibernética FIO",
        status: "MONITOREADO",
        events: [
            { date: "2025-10-20", description: "Anomalía detectada en flujos de datos externos, posiblemente vinculada a firma de red interna." },
            { date: "2025-10-22", description: "Correlación de inteligencia entre agencias sugiere actividad de 'Nodo Fantasma'. NDPO alertado." },
            { date: "2025-10-28", description: "Análisis de patrones confirma coincidencia de alta probabilidad. Monitoreo continuo iniciado." }
        ]
    },
    {
        id: "BL-5012",
        name: "Elara Vance",
        alias: "Corredor de Sombras",
        riskLevel: "MEDIO",
        flagReason: "Patrones de comunicación sospechosos",
        assignedDivision: "Oficina Nacional de Protección de Datos (NDPO)",
        status: "SUSPENDIDO",
        events: [
            { date: "2025-12-01", description: "Comunicaciones cifradas inusuales detectadas originadas desde la red interna. BDS alertado." },
            { date: "2025-12-03", description: "Análisis de tráfico muestra conexiones a foros de la web oscura conocidos vía <span class=\"redacted\">[REDACTADO]</span>." },
            { date: "2025-12-05", description: "Acceso de red del sujeto suspendido temporalmente pendiente de investigación completa." }
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
        impactRadius: "Proveedor de Hosting Externo",
        affectedFiles: ["Manual-OPS-V3.pdf", "Lista-Equipo.xlsx"],
        responseStatus: "BAJO INVESTIGACIÓN",
        description: "Se detectó un espejo externo de documentos operacionales críticos en un servicio de nube no aprobado. El origen de la filtración es actualmente desconocido."
    },
    {
        id: "E-1138",
        title: "Vector de Compromiso de Credenciales",
        detectionTime: "2025-11-15 11:00 AM",
        impactRadius: "Portal de Inicio de Sesión de Analistas",
        affectedFiles: ["BD-Usuario-Fragmento.json"],
        responseStatus: "SIN RESOLVER",
        description: "Múltiples credenciales de analistas fueron comprometidas a través de un sofisticado ataque de phishing. El impacto total y las cuentas de usuario afectadas están bajo revisión."
    },
    {
        id: "E-1150",
        title: "Anomalía en Base de Datos FIO",
        detectionTime: "2025-12-05 06:45 PM",
        impactRadius: "Base de Datos Segura FIO",
        affectedFiles: ["FIO-Informe-Intel_T4.pdf"],
        responseStatus: "CONTENIDO",
        description: "Se registró un intento de consulta no autorizada contra la base de datos segura FIO. No se detectó exfiltración de datos. Amenaza neutralizada."
    }
];

const mockTerminalLogs = [
    "> ARCHIVE-X Inicializando...",
    "> Estableciendo conexión segura...",
    "> Flujos de datos en línea.",
    `> ${new Date().toLocaleString('es-ES')} - Canal FIO establecido.`, 
    `> ${new Date().toLocaleString('es-ES')} - Correlación de lista negra coincidente: Sujeto BL-4471.`, 
    `> ${new Date().toLocaleString('es-ES')} - Sujeto BL-4471 escalado. División de Amenazas Internas notificada.`, 
    `> ${new Date().toLocaleString('es-ES')} - Vector de exposición externa aislado. Incidente #E-1103.`, 
    `> ${new Date().toLocaleString('es-ES')} - Protocolo NDPO iniciado para comunicaciones sospechosas.`, 
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
        } else if (file.status === "Revisión Pendiente" || file.status === "Bajo Investigación") {
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
            <td class="${riskClass.includes("risk") ? riskClass : ""}">${subject.riskLevel}</td>
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
    if (subject.status === "MONITOREADO") {
        profileStatusStamp.classList.add("monitored");
    } else if (subject.status === "SUSPENDIDO") {
        profileStatusStamp.classList.add("suspended");
    } else if (subject.status === "ESCALADO") {
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
        if (incident.responseStatus === "CONTENIDO") {
            statusClass = "contained";
        } else if (incident.responseStatus === "BAJO INVESTIGACIÓN") {
            statusClass = "investigation";
        } else if (incident.responseStatus === "SIN RESOLVER") {
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
        overviewContent.classList.add("active"); // Default to overview for other filters
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
    addTerminalLog(`Visor de documentos abierto para ${file.name}.`);
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
            showFederalNotice("SUPERVISIÓN FEDERAL ACTIVA: Listas de vigilancia accedidas mediante atajo.", 7000);
            addTerminalLog("Atajo de teclado (Alt+5) usado para acceder a Listas de Vigilancia.");
        }
    });

    // Command palette simulation (for interaction enhancement)
    window.executeCommand = function(command) { // Expose to global scope for easy testing
        switch (command.toLowerCase()) {
            case "abrir listas de vigilancia":
                switchTab("watchlists");
                showFederalNotice("REVISIÓN DE AMENAZAS INTERNAS EN PROGRESO: Listas de vigilancia abiertas por comando.", 7000);
                addTerminalLog("Comando: 'Abrir Listas de Vigilancia' ejecutado.");
                break;
            case "ver incidentes de filtración":
                switchTab("watchlists"); // Assuming leak incidents are within watchlists tab
                // Scroll to leak incidents section if needed
                document.getElementById("leak-events-timeline").scrollIntoView({ behavior: "smooth" });
                addTerminalLog("Comando: 'Ver Incidentes de Filtración' ejecutado.");
                break;
            case "iniciar revisión interna":
                showFederalNotice("RIESGO DE EXPOSICIÓN DE DATOS DETECTADO: Iniciando revisión interna.", 10000);
                addTerminalLog("Comando: 'Iniciar Revisión Interna' ejecutado.");
                break;
            case "bloquear sistema":
                addTerminalLog("Comando: 'Bloquear Sistema' ejecutado. Simulando bloqueo del sistema...");
                showLoadingScreen(); // Re-use loading screen for lock simulation
                break;
            default:
                addTerminalLog(`Comando desconocido: '${command}'`);
                break;
        }
    };

    renderFiles();
    renderWatchlist();
    renderLeakIncidents();

    // Initial federal notice
    showFederalNotice("SUPERVISIÓN FEDERAL DE INTELIGENCIA (SFI) - ESTADO DEL SISTEMA: OPERATIVO", 5000);
});
