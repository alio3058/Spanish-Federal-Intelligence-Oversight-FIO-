/**
 * Logs Component
 * System logs archive and monitoring
 */

class LogsComponent extends BaseComponent {
    constructor() {
        super('logs-content');
        this.logs = [];
    }

    render() {
        if (!this.container) return;

        this.logs = mockFiles.filter(file => file.category === 'logs');

        const logArchive = this.container.querySelector('#log-archive');
        if (!logArchive) return;

        const logEntries = this.getLogEntries();
        const stats = this.getLogStats(logEntries);

        logArchive.innerHTML = `
            <div class="log-viewer">
                <div class="log-stats">
                    <div class="log-stat">
                        <span class="log-stat-icon">🔵</span>
                        <span class="log-stat-label">Información:</span>
                        <span class="log-stat-value">${stats.info}</span>
                    </div>
                    <div class="log-stat">
                        <span class="log-stat-icon">🟡</span>
                        <span class="log-stat-label">Advertencias:</span>
                        <span class="log-stat-value">${stats.warn}</span>
                    </div>
                    <div class="log-stat">
                        <span class="log-stat-icon">🟠</span>
                        <span class="log-stat-label">Errores:</span>
                        <span class="log-stat-value">${stats.error}</span>
                    </div>
                    <div class="log-stat critical">
                        <span class="log-stat-icon">🔴</span>
                        <span class="log-stat-label">Crítico:</span>
                        <span class="log-stat-value">${stats.critical}</span>
                    </div>
                </div>
                <div class="log-controls">
                    <button class="btn btn-secondary">📥 Exportar Registros</button>
                    <button class="btn btn-secondary">🔄 Actualizar</button>
                    <button class="btn btn-secondary">🔍 Filtrar</button>
                </div>
                <div class="log-entries">
                    ${this.renderLogEntries(logEntries)}
                </div>
            </div>
        `;
    }

    getLogEntries() {
        return [
            { time: '2026-01-20 14:23:15', level: 'CRITICAL', message: 'Múltiples intentos de autenticación fallidos detectados desde IP: 45.142.XXX.XXX - Posible ataque de fuerza bruta', source: 'ALERTA_SEGURIDAD', user: 'SISTEMA' },
            { time: '2026-01-20 14:22:01', level: 'INFO', message: 'Respaldo automático de base de datos completado exitosamente - Tamaño: 2.4GB', source: 'RESPALDO_BD', user: 'svc_backup' },
            { time: '2026-01-20 14:20:33', level: 'INFO', message: 'Sesión de usuario establecida - Analista OM inició sesión desde estación de trabajo WS-7821', source: 'SIS_AUTH', user: 'analyst_om' },
            { time: '2026-01-20 14:18:47', level: 'ERROR', message: 'Intento de inicio de sesión fallido - Usuario: [CENSURADO] - Cuenta bloqueada temporalmente', source: 'SIS_AUTH', user: 'desconocido' },
            { time: '2026-01-20 14:15:22', level: 'INFO', message: 'Verificación de integridad del sistema aprobada - Todas las firmas verificadas', source: 'MON_SIS', user: 'SISTEMA' },
            { time: '2026-01-20 14:12:08', level: 'WARN', message: 'Alto uso de memoria detectado en servidor BD-PRIMARIO - Actual: 87% - Umbral: 85%', source: 'MON_SIS', user: 'SISTEMA' },
            { time: '2026-01-20 14:10:00', level: 'INFO', message: 'Rotación de clave de cifrado iniciada para bóveda DOCS_CLASIFICADOS_V3', source: 'SIS_CRIPTO', user: 'svc_crypto' },
            { time: '2026-01-20 14:05:33', level: 'INFO', message: 'Escaneo de seguridad de red completado - Sin anomalías detectadas - 1,247 hosts escaneados', source: 'SEG_RED', user: 'svc_scanner' },
            { time: '2026-01-20 13:58:19', level: 'WARN', message: 'Patrón de transferencia de datos inusual detectado - Usuario: analyst_jk - Volumen: 450MB - Destino: USB Externo', source: 'MON_DLP', user: 'analyst_jk' },
            { time: '2026-01-20 13:45:02', level: 'INFO', message: 'Documento WL-9247 accedido por usuario: supervisor_ac - Clasificación: SEVERO', source: 'ACCESO_DOC', user: 'supervisor_ac' },
            { time: '2026-01-20 13:32:44', level: 'ERROR', message: 'Fallo al establecer túnel seguro a sitio remoto OFICINA_CAMPO_OESTE - Reintento programado', source: 'TUNEL_RED', user: 'SISTEMA' },
            { time: '2026-01-20 13:28:15', level: 'CRITICAL', message: 'Intento de acceso no autorizado a área restringida BOVEDA_ALFA - Seguridad física notificada', source: 'CONTROL_ACCESO', user: 'desconocido' },
            { time: '2026-01-20 13:15:09', level: 'INFO', message: 'Ventana de mantenimiento programado del sistema iniciada - Duración: 30 minutos', source: 'MANTENIMIENTO', user: 'svc_maint' },
            { time: '2026-01-20 12:57:33', level: 'WARN', message: 'Advertencia de expiración de certificado - Cert SSL para *.sfi.internal expira en 14 días', source: 'MON_CERT', user: 'SISTEMA' },
            { time: '2026-01-20 12:45:21', level: 'INFO', message: 'Base de datos de lista de vigilancia sincronizada con oficinas de campo - 10 sujetos, 52 eventos actualizados', source: 'SYNC_BD', user: 'svc_sync' },
            { time: '2026-01-20 12:30:08', level: 'ERROR', message: 'Escaneo antivirus detectó amenaza potencial en cuarentena - Archivo: documento_sospechoso.exe - Estado: CONTENIDO', source: 'ESCAN_AV', user: 'SISTEMA' },
            { time: '2026-01-20 12:15:47', level: 'INFO', message: 'Informe de inteligencia IR-2026-0120 publicado a lista de distribución DL_ANALISTAS', source: 'SIS_INTEL', user: 'analyst_mw' },
            { time: '2026-01-20 11:58:22', level: 'WARN', message: 'Advertencia de espacio en disco en servidor ARCHIVO_01 - Espacio libre: 12% (480GB restantes)', source: 'MON_SIS', user: 'SISTEMA' },
            { time: '2026-01-20 11:42:15', level: 'CRITICAL', message: 'Protocolo de apagado de emergencia activado para equipo de laboratorio SERVIDOR_LAB_03 - Sobrecalentamiento detectado', source: 'MON_INSTALACION', user: 'SISTEMA' },
            { time: '2026-01-20 11:30:00', level: 'INFO', message: 'Acceso biométrico concedido - Usuario: director_rb - Ubicación: ALA_EJECUTIVA - Dispositivo: ESCAN_14', source: 'SIS_BIOMETRICO', user: 'director_rb' },
            { time: '2026-01-20 11:18:44', level: 'INFO', message: 'Transferencia segura de archivo completada - Documento: BRIEFING_OP_NIGHTFALL.pdf - Destinatario: OFICINA_CAMPO_ESTE', source: 'FTP_SEGURO', user: 'analyst_jd' },
            { time: '2026-01-20 10:55:33', level: 'WARN', message: 'Múltiples sesiones concurrentes detectadas para usuario: analyst_tk - Sesiones: 3 - Límite de política: 2', source: 'MON_SESION', user: 'analyst_tk' },
            { time: '2026-01-20 10:40:19', level: 'INFO', message: 'Acceso a casillero de evidencia registrado - Casillero: EV-4729 - Oficial: agent_sp - Caso: CS-2025-8834', source: 'SIS_EVIDENCIA', user: 'agent_sp' },
            { time: '2026-01-20 10:22:07', level: 'ERROR', message: 'Fallo de comunicación con enlace satelital SAT_COMM_2 - Cambiando a canal de respaldo', source: 'SIS_COMM', user: 'SISTEMA' },
            { time: '2026-01-20 10:05:51', level: 'INFO', message: 'Nuevo archivo de caso creado - ID de Caso: CS-2026-0183 - Clasificación: CONFIDENCIAL - Asignado: equipo_delta', source: 'GEST_CASOS', user: 'supervisor_lh' }
        ];
    }

    getLogStats(logs) {
        return {
            info: logs.filter(log => log.level === 'INFO').length,
            warn: logs.filter(log => log.level === 'WARN').length,
            error: logs.filter(log => log.level === 'ERROR').length,
            critical: logs.filter(log => log.level === 'CRITICAL').length
        };
    }

    renderLogEntries(logEntries) {
        if (!logEntries || logEntries.length === 0) {
            return `<div class="empty-state"><p class="text-muted">No hay entradas de registro disponibles.</p></div>`;
        }

        return logEntries.map(log => {
            const levelClass = log.level.toLowerCase();
            const severityIcon = this.getSeverityIcon(log.level);
            return `
                <div class="log-entry log-${levelClass}">
                    <span class="log-severity">${severityIcon}</span>
                    <span class="log-time">[${log.time}]</span>
                    <span class="log-level ${levelClass}">${log.level}</span>
                    <span class="log-source">[${log.source}]</span>
                    <span class="log-user">[${log.user}]</span>
                    <span class="log-message">${log.message}</span>
                </div>
            `;
        }).join('');
    }

    getSeverityIcon(level) {
        const icons = {
            'CRITICAL': '🔴',
            'ERROR': '🟠',
            'WARN': '🟡',
            'INFO': '🔵'
        };
        return icons[level] || '⚪';
    }
}
