/**
 * Watchlists Component
 * Internal watchlist subjects and leak events
 */

class WatchlistsComponent extends BaseComponent {
    constructor() {
        super('watchlists-content');
        this.watchlist = [];
    }

    render() {
        if (!this.container) return;

        this.watchlist = mockWatchlist || [];

        // Update the header badge count
        const headerBadge = document.querySelector('#watchlists-content .badge');
        if (headerBadge) {
            const activeCount = this.watchlist.filter(s => 
                s.status === 'ACTIVE SURVEILLANCE' || s.status === 'PRIORITY TARGET'
            ).length;
            headerBadge.textContent = `${activeCount} Prioritarios`;
        }

        const watchlistEntries = this.container.querySelector('#watchlist-entries');
        if (!watchlistEntries) return;

        watchlistEntries.innerHTML = '';

        this.watchlist.forEach(subject => {
            const row = this.createWatchlistRow(subject);
            watchlistEntries.appendChild(row);
        });

        // Render leak events
        this.renderLeakEvents();
    }

    createWatchlistRow(subject) {
        const tr = document.createElement('tr');
        tr.className = 'watchlist-row';
        tr.dataset.subjectId = subject.id;

        const riskClass = subject.riskLevel.toLowerCase().replace(/\s/g, '-');
        
        tr.innerHTML = `
            <td><strong>${subject.id}</strong></td>
            <td>${subject.name || 'Desconocido'} ${subject.alias ? `<span class="text-muted">(${subject.alias})</span>` : ''}</td>
            <td><span class="risk-badge ${riskClass}">${subject.riskLevel}</span></td>
            <td>${subject.flagReason}</td>
            <td class="text-muted">${subject.assignedDivision}</td>
            <td><span class="status-badge status-${subject.status.toLowerCase().replace(/\s/g, '-')}">${subject.status}</span></td>
        `;

        return tr;
    }

    renderLeakEvents() {
        const leakTimeline = this.container.querySelector('#leak-events-timeline');
        if (!leakTimeline) return;

        const leakEvents = mockLeakIncidents || [];

        leakTimeline.innerHTML = leakEvents.map(event => `
            <div class="leak-event">
                <div class="leak-event-header">
                    <h3 class="leak-event-title">${event.title}</h3>
                    <span class="leak-event-id">${event.id}</span>
                </div>
                <div class="leak-event-body">
                    <p class="leak-description">${event.description}</p>
                    <div class="leak-metadata">
                        <span>🕒 ${event.detectionTime}</span>
                        <span>📍 ${event.impactRadius}</span>
                        <span class="leak-status status-${event.responseStatus.toLowerCase().replace(/\s/g, '-')}">${event.responseStatus}</span>
                    </div>
                    <div class="leak-affected-files">
                        <strong>Archivos Afectados:</strong> ${event.affectedFiles.join(', ')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    attachEventListeners() {
        const watchlistRows = this.container.querySelectorAll('.watchlist-row');
        watchlistRows.forEach(row => {
            row.addEventListener('click', (e) => {
                const subjectId = e.currentTarget.dataset.subjectId;
                this.showSubjectProfile(subjectId);
            });
        });
    }

    showSubjectProfile(subjectId) {
        const subject = this.watchlist.find(s => s.id === subjectId);
        if (!subject) return;

        const profilePanel = document.getElementById('subject-profile-panel');
        if (!profilePanel) return;

        // Update profile panel content
        document.getElementById('profile-name').textContent = subject.name || subject.alias || 'Desconocido';
        document.getElementById('profile-id').textContent = `ID: ${subject.id}`;
        document.getElementById('profile-risk').textContent = subject.riskLevel;
        document.getElementById('profile-risk').className = `risk-badge ${subject.riskLevel.toLowerCase()}`;
        
        // Render timeline
        const timelineContainer = document.getElementById('timeline-events');
        if (timelineContainer && subject.events) {
            timelineContainer.innerHTML = subject.events.map(event => `
                <div class="timeline-item">
                    <div class="timeline-date">${event.date}</div>
                    <div class="timeline-description">${event.description}</div>
                </div>
            `).join('');
        }

        // Show status
        const statusStamp = document.getElementById('profile-status-stamp');
        if (statusStamp) {
            statusStamp.textContent = subject.status;
            statusStamp.className = `status-stamp status-${subject.status.toLowerCase()}`;
        }

        // Show panel
        profilePanel.classList.remove('hidden');
    }

    removeEventListeners() {
        const watchlistRows = this.container.querySelectorAll('.watchlist-row');
        watchlistRows.forEach(row => {
            row.removeEventListener('click', this.showSubjectProfile);
        });
    }
}
