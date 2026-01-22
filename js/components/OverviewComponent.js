/**
 * Overview Component
 * Intelligence Dashboard with Summary Panels, Alerts, and System Monitoring
 */

class OverviewComponent extends BaseComponent {
    constructor() {
        super('overview-content');
        this.logInterval = null;
        this.statsInterval = null;
        this.dashboardData = this.initializeDashboardData();
    }

    initializeDashboardData() {
        return {
            stats: {
                activeDocuments: 247,
                pendingReviews: 18,
                criticalAlerts: 3,
                archivedItems: 1842
            },
            systemHealth: {
                database: { status: 'operational', uptime: 99.97 },
                encryption: { status: 'operational', uptime: 100.0 },
                network: { status: 'degraded', uptime: 98.45 },
                authentication: { status: 'operational', uptime: 99.99 }
            },
            alerts: [
                { id: 1, level: 'critical', message: 'Intento de acceso no autorizado detectado - IP: 185.220.101.42', timestamp: new Date(Date.now() - 1200000), status: 'active' },
                { id: 2, level: 'warning', message: 'Clave de cifrado expira en 7 días - rotación requerida', timestamp: new Date(Date.now() - 3600000), status: 'acknowledged' },
                { id: 3, level: 'critical', message: 'Actividad del sujeto de vigilancia BL-4471 en Zona 7', timestamp: new Date(Date.now() - 7200000), status: 'active' },
                { id: 4, level: 'info', message: 'Ventana de mantenimiento programada: 23:00-01:00 EST', timestamp: new Date(Date.now() - 14400000), status: 'acknowledged' },
                { id: 5, level: 'warning', message: 'Retraso en replicación de base de datos: 4.2 segundos', timestamp: new Date(Date.now() - 21600000), status: 'resolved' }
            ],
            recentActivity: [
                { type: 'document', action: 'creado', item: 'SIGINT-2026-0147', user: 'Agente Cooper', timestamp: new Date(Date.now() - 900000), status: 'pending' },
                { type: 'review', action: 'aprobado', item: 'Operación Estrella Oscura', user: 'Director Hayes', timestamp: new Date(Date.now() - 1800000), status: 'approved' },
                { type: 'access', action: 'visto', item: 'Informe Clasificado 12-A', user: 'Analista Martínez', timestamp: new Date(Date.now() - 3600000), status: 'logged' },
                { type: 'watchlist', action: 'actualizado', item: 'Sujeto BL-4471', user: 'Sistema', timestamp: new Date(Date.now() - 5400000), status: 'active' },
                { type: 'archive', action: 'archivado', item: 'Informes T4 2025', user: 'Agente Thompson', timestamp: new Date(Date.now() - 7200000), status: 'archived' }
            ]
        };
    }

    render() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <!-- Encabezado del Panel -->
            <div class="dashboard-header">
                <div class="dashboard-title-section">
                    <h1 class="dashboard-title">Panel de Inteligencia</h1>
                    <p class="dashboard-subtitle">Plataforma de monitoreo y análisis en tiempo real</p>
                </div>
                <div class="dashboard-timestamp">
                    <span class="timestamp-label">Última Actualización:</span>
                    <span class="timestamp-value" id="dashboard-timestamp">${this.formatTimestamp(new Date())}</span>
                </div>
            </div>

            <!-- Banner de Ayuda Rápida -->
            <div class="help-banner">
                <div class="help-banner-icon">💡</div>
                <div class="help-banner-content">
                    <strong>¿Nuevo en el sistema?</strong> Consulte nuestra 
                    <a href="QUICK_START_DOCUMENTS.html" target="_blank">Guía de Inicio Rápido</a> o 
                    <a href="DEMO_INTERACTIVE_DOCUMENTS.html" target="_blank">Demo Interactiva</a> 
                    para aprender cómo usar el visor de documentos clasificados.
                </div>
                <button class="help-banner-close" onclick="this.parentElement.style.display='none'">✕</button>
            </div>

            <!-- Cuadrícula de Métricas Resumen -->
            <section class="dashboard-section">
                <h2 class="section-title">Métricas Resumen</h2>
                <div class="metrics-grid">
                    <div class="metric-card" data-status="info">
                        <div class="metric-icon">📄</div>
                        <div class="metric-content">
                            <div class="metric-value" id="metric-documents">${this.dashboardData.stats.activeDocuments}</div>
                            <div class="metric-label">Documentos Activos</div>
                            <div class="metric-trend positive">+12 esta semana</div>
                        </div>
                    </div>
                    <div class="metric-card" data-status="warning">
                        <div class="metric-icon">⚠️</div>
                        <div class="metric-content">
                            <div class="metric-value" id="metric-pending">${this.dashboardData.stats.pendingReviews}</div>
                            <div class="metric-label">Revisiones Pendientes</div>
                            <div class="metric-trend neutral">4 urgentes</div>
                        </div>
                    </div>
                    <div class="metric-card" data-status="critical">
                        <div class="metric-icon">🔔</div>
                        <div class="metric-content">
                            <div class="metric-value" id="metric-alerts">${this.dashboardData.stats.criticalAlerts}</div>
                            <div class="metric-label">Alertas Críticas</div>
                            <div class="metric-trend negative">Requiere atención</div>
                        </div>
                    </div>
                    <div class="metric-card" data-status="success">
                        <div class="metric-icon">🗄️</div>
                        <div class="metric-content">
                            <div class="metric-value" id="metric-archived">${this.dashboardData.stats.archivedItems.toLocaleString()}</div>
                            <div class="metric-label">Elementos Archivados</div>
                            <div class="metric-trend neutral">Total de registros</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Diseño de Dos Columnas -->
            <div class="dashboard-grid">
                <!-- Columna Izquierda: Estado del Sistema y Alertas -->
                <div class="dashboard-column">
                    <!-- Estado de Salud del Sistema -->
                    <section class="dashboard-section">
                        <h2 class="section-title">Estado del Sistema</h2>
                        <div class="status-panel">
                            ${this.renderSystemStatus()}
                        </div>
                    </section>

                    <!-- Alertas Activas -->
                    <section class="dashboard-section">
                        <h2 class="section-title">Alertas Activas</h2>
                        <div class="alerts-panel">
                            ${this.renderAlerts()}
                        </div>
                    </section>
                </div>

                <!-- Columna Derecha: Actividad y Registros -->
                <div class="dashboard-column">
                    <!-- Actividad Reciente -->
                    <section class="dashboard-section">
                        <h2 class="section-title">Actividad Reciente</h2>
                        <div class="activity-panel">
                            ${this.renderRecentActivity()}
                        </div>
                    </section>

                    <!-- Consola del Sistema -->
                    <section class="dashboard-section">
                        <div class="console-header">
                            <h2 class="section-title">Consola del Sistema</h2>
                            <div class="console-status">
                                <span class="status-indicator active"></span>
                                <span class="console-label">En Vivo</span>
                            </div>
                        </div>
                        <div class="system-console">
                            <div class="console-output" id="console-output">
                                <div class="console-line info">
                                    <span class="console-time">${this.formatTime(new Date())}</span>
                                    <span class="console-tag">[SIS]</span>
                                    <span class="console-message">Plataforma de Inteligencia ARCHIVE-X inicializada</span>
                                </div>
                                <div class="console-line success">
                                    <span class="console-time">${this.formatTime(new Date(Date.now() - 2000))}</span>
                                    <span class="console-tag">[AUT]</span>
                                    <span class="console-message">Autenticación de usuario verificada - autorización TS/SCI confirmada</span>
                                </div>
                                <div class="console-line info">
                                    <span class="console-time">${this.formatTime(new Date(Date.now() - 5000))}</span>
                                    <span class="console-tag">[BD]</span>
                                    <span class="console-message">Pool de conexiones de base de datos: 8/12 conexiones activas</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;

        this.startDashboardUpdates();
    }

    renderSystemStatus() {
        const systemNames = {
            database: 'Base de Datos',
            encryption: 'Cifrado',
            network: 'Red',
            authentication: 'Autenticación'
        };
        const statusNames = {
            operational: 'operativo',
            degraded: 'degradado',
            offline: 'fuera de línea'
        };
        const statusItems = Object.entries(this.dashboardData.systemHealth).map(([system, data]) => {
            const statusClass = data.status === 'operational' ? 'success' : 
                               data.status === 'degraded' ? 'warning' : 'critical';
            const statusIcon = data.status === 'operational' ? '●' : 
                              data.status === 'degraded' ? '◐' : '○';
            const systemName = systemNames[system] || this.capitalize(system);
            const statusName = statusNames[data.status] || data.status;
            
            return `
                <div class="status-item">
                    <div class="status-item-header">
                        <span class="status-name">${systemName}</span>
                        <span class="status-badge ${statusClass}">${statusIcon} ${this.capitalize(statusName)}</span>
                    </div>
                    <div class="status-item-footer">
                        <span class="status-uptime">Tiempo activo: ${data.uptime}%</span>
                    </div>
                </div>
            `;
        }).join('');

        return statusItems;
    }

    renderAlerts() {
        return this.dashboardData.alerts.slice(0, 5).map(alert => {
            const levelClass = alert.level === 'critical' ? 'critical' : 
                              alert.level === 'warning' ? 'warning' : 'info';
            const statusBadge = alert.status === 'active' ? 'Activo' : 
                               alert.status === 'acknowledged' ? 'Reconocido' : 'Resuelto';
            
            return `
                <div class="alert-item ${levelClass}">
                    <div class="alert-header">
                        <span class="alert-level">${alert.level === 'critical' ? 'CRÍTICO' : alert.level === 'warning' ? 'ADVERTENCIA' : 'INFO'}</span>
                        <span class="alert-time">${this.formatRelativeTime(alert.timestamp)}</span>
                    </div>
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-footer">
                        <span class="alert-status status-${alert.status}">${statusBadge}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderRecentActivity() {
        return this.dashboardData.recentActivity.map(activity => {
            const typeIcons = {
                document: '📄',
                review: '✓',
                access: '👁️',
                watchlist: '🔍',
                archive: '🗄️'
            };
            
            const statusClass = activity.status === 'approved' ? 'success' : 
                               activity.status === 'pending' ? 'warning' : 
                               activity.status === 'active' ? 'info' : 'neutral';
            
            return `
                <div class="activity-item">
                    <div class="activity-icon">${typeIcons[activity.type] || '•'}</div>
                    <div class="activity-content">
                        <div class="activity-main">
                            <span class="activity-user">${activity.user}</span>
                            <span class="activity-action">${activity.action}</span>
                            <span class="activity-target">${activity.item}</span>
                        </div>
                        <div class="activity-meta">
                            <span class="activity-time">${this.formatRelativeTime(activity.timestamp)}</span>
                            <span class="activity-status status-${statusClass}">${this.capitalize(activity.status)}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    startDashboardUpdates() {
        // Update timestamp every second
        this.updateTimestamp();
        
        // Update console logs
        this.startConsoleSimulation();
        
        // Update metrics occasionally
        this.startMetricsUpdate();
    }

    updateTimestamp() {
        setInterval(() => {
            const timestampEl = document.getElementById('dashboard-timestamp');
            if (timestampEl) {
                timestampEl.textContent = this.formatTimestamp(new Date());
            }
        }, 1000);
    }

    startConsoleSimulation() {
        const consoleOutput = document.getElementById('console-output');
        if (!consoleOutput) return;

        const consoleMessages = [
            { tag: '[BD]', message: 'Verificación de integridad de base de datos completada - Todos los sistemas nominales', level: 'success' },
            { tag: '[SEG]', message: 'Escaneo de seguridad completado - No se detectaron amenazas', level: 'success' },
            { tag: '[RED]', message: 'Latencia de red: 12ms - Rendimiento óptimo', level: 'info' },
            { tag: '[AUT]', message: 'Token de sesión actualizado para usuario activo', level: 'info' },
            { tag: '[SYNC]', message: 'Sincronización de datos completada - 247 registros actualizados', level: 'success' },
            { tag: '[RESP]', message: 'Copia de seguridad incremental completada exitosamente', level: 'success' },
            { tag: '[VIG]', message: 'Escaneo de monitoreo de lista de vigilancia en progreso', level: 'info' },
            { tag: '[CIF]', message: 'Validación de clave de cifrado aprobada', level: 'success' },
            { tag: '[API]', message: 'Verificación de salud de API externa - Todos los endpoints responden', level: 'info' },
            { tag: '[SIS]', message: 'Uso de memoria: 64% - Dentro de parámetros normales', level: 'info' }
        ];

        this.logInterval = setInterval(() => {
            const randomMsg = consoleMessages[Math.floor(Math.random() * consoleMessages.length)];
            const consoleLine = document.createElement('div');
            consoleLine.className = `console-line ${randomMsg.level}`;
            consoleLine.innerHTML = `
                <span class="console-time">${this.formatTime(new Date())}</span>
                <span class="console-tag">${randomMsg.tag}</span>
                <span class="console-message">${randomMsg.message}</span>
            `;
            
            consoleOutput.appendChild(consoleLine);
            
            // Keep only last 15 lines
            while (consoleOutput.children.length > 15) {
                consoleOutput.removeChild(consoleOutput.firstChild);
            }
            
            // Auto-scroll
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }, 6000);
    }

    startMetricsUpdate() {
        this.statsInterval = setInterval(() => {
            // Randomly update metrics slightly for realism
            const docEl = document.getElementById('metric-documents');
            const alertEl = document.getElementById('metric-alerts');
            
            if (docEl && Math.random() > 0.7) {
                this.dashboardData.stats.activeDocuments += Math.random() > 0.5 ? 1 : -1;
                docEl.textContent = this.dashboardData.stats.activeDocuments;
            }
            
            if (alertEl && Math.random() > 0.9) {
                this.dashboardData.stats.criticalAlerts = Math.max(0, this.dashboardData.stats.criticalAlerts + (Math.random() > 0.5 ? 1 : -1));
                alertEl.textContent = this.dashboardData.stats.criticalAlerts;
            }
        }, 10000);
    }

    formatTimestamp(date) {
        return date.toLocaleString('es-ES', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        });
    }

    formatTime(date) {
        return date.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        });
    }

    formatRelativeTime(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        if (seconds < 60) return 'Ahora mismo';
        if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`;
        if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
        return `hace ${Math.floor(seconds / 86400)}d`;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    unmount() {
        if (this.logInterval) {
            clearInterval(this.logInterval);
            this.logInterval = null;
        }
        if (this.statsInterval) {
            clearInterval(this.statsInterval);
            this.statsInterval = null;
        }
        super.unmount();
    }
}
