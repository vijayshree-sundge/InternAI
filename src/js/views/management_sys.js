import { InternService, ManagementService } from '../services.js';
import { exportCSV, formatDate } from '../utils.js';

export function renderAnalytics() {
    return `<div class="dashboard-grid"><div class="card"><span class="card-title">Analytics</span></div></div>`;
}

export function renderReports() {
    return `
        <div class="dashboard-grid">
            <div class="card-title-row" style="margin-bottom: 0;">
                <span class="card-title" style="font-size: 1.5rem;">Data Reports</span>
            </div>
            
            <div class="card">
                <div style="margin-bottom: 2rem;">
                    <h3 class="font-medium text-lg text-dark">Organizational Data Exports</h3>
                    <p class="text-sm text-muted mt-2">Generate and export organizational data as standard CSV formats.</p>
                </div>
                
                <div class="p-6 flex justify-between items-center" style="border: 1px solid var(--border); border-radius: 8px;">
                    <div class="flex gap-4 items-center">
                        <div class="avatar-header" style="background: var(--primary-light); color: var(--primary); width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 8px;"><i data-lucide="file-text"></i></div>
                        <div>
                            <div class="font-medium text-dark">Intern Performance Report</div>
                            <div class="text-sm text-muted mt-1">Complete directory with key operational metrics.</div>
                        </div>
                    </div>
                    <button class="btn btn-secondary" id="export-interns">Generate CSV</button>
                </div>
            </div>
        </div>
    `;
}

export function initReports() {
    document.getElementById('export-interns')?.addEventListener('click', () => {
        const interns = InternService.getAll();
        const rows = [['ID', 'Name', 'Email', 'Attendance (%)', 'Performance (%)', 'Status']];
        interns.forEach(i => rows.push([i.id, i.name, i.email, i.attendance, i.performance, i.status]));
        exportCSV('intern_report.csv', rows);
    });
}

export function renderNotifications() { return `<div class="dashboard-grid"><div class="card"><span class="card-title">System Notifications</span></div></div>`; }
export function renderAudit() { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Audit Logs</span></div></div>`; }
export function renderSettings() { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Organization Settings</span></div></div>`; }
