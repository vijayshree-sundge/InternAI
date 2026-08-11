import { InternService, TaskService } from '../services.js';
import { renderBadge, renderModal } from '../components.js';

export function renderDashboard() {
    const interns = InternService.getAll();
    const tasks = TaskService.getAll();
    
    // Derived stats
    const totalInterns = interns.length;
    const activeTasks = tasks.filter(t => t.status === 'In Progress').length;
    const pendingReviews = tasks.filter(t => t.status === 'In Review' || t.status === 'Under Review').length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;

    const chartBars = [
        { label: 'Jan', val: 120, total: 300 },
        { label: 'Feb', val: 150, total: 300 },
        { label: 'Mar', val: 230, total: 300 },
        { label: 'Apr', val: 180, total: 300 },
        { label: 'May', val: 280, total: 300 },
        { label: 'Jun', val: 210, total: 300 },
        { label: 'Jul', val: 190, total: 300 },
    ];

    return `
        <div class="hero-section" style="min-height: 100px; padding: 1.5rem 2rem; margin-bottom: 1.5rem;">
            <div class="hero-bg-wash" style="opacity: 0.5;"></div>
            <div class="hero-content flex justify-between items-center">
                <div>
                    <h1 class="hero-title" style="font-size: 1.75rem;">Program Overview</h1>
                    <p class="text-muted mt-1 font-medium">Monitor performance and operational metrics.</p>
                </div>
                <div class="hero-pill"><div class="hero-pill-dot"></div> Systems Nominal</div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="grid-row-4">
                <div class="card metric-card card-soft-blue">
                    <div class="metric-header">
                        <span class="metric-title" style="color: var(--primary-deep);">Total Interns</span>
                        <div class="trend-badge trend-up"><i data-lucide="trending-up"></i> +12%</div>
                    </div>
                    <span class="metric-val text-primary">${totalInterns}</span>
                    <span class="metric-sub">Active in program</span>
                </div>
                
                <div class="card metric-card">
                    <div class="metric-header">
                        <span class="metric-title">Active Tasks</span>
                        <div class="trend-badge trend-up"><i data-lucide="trending-up"></i> +5%</div>
                    </div>
                    <span class="metric-val">${activeTasks}</span>
                    <span class="metric-sub">Currently in progress</span>
                </div>
                
                <div class="card metric-card card-soft-violet">
                    <div class="metric-header">
                        <span class="metric-title" style="color: var(--primary-deep);">Pending Reviews</span>
                        <div class="trend-badge trend-down"><i data-lucide="alert-circle"></i></div>
                    </div>
                    <span class="metric-val text-violet">${pendingReviews}</span>
                    <span class="metric-sub font-semibold text-violet">Requires attention</span>
                </div>

                <div class="card metric-card card-soft-teal">
                    <div class="metric-header">
                        <span class="metric-title" style="color: var(--primary-deep);">Task Completion</span>
                        <div class="trend-badge trend-up"><i data-lucide="trending-up"></i> +8%</div>
                    </div>
                    <span class="metric-val text-teal">${completedTasks}</span>
                    <span class="metric-sub">Completed successfully</span>
                </div>
            </div>

            <div class="grid-row-2-split">
                <!-- Bar Chart Component -->
                <div class="card card-glass">
                    <div class="card-title-row">
                        <span class="card-title">Employee Composition</span>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2 text-xs font-bold text-muted uppercase">
                                <span style="display:inline-block; width:10px; height:10px; background:var(--primary); border-radius:3px;"></span> Permanent
                                <span style="display:inline-block; width:10px; height:10px; background:var(--violet); border-radius:3px; margin-left:8px;"></span> Contract
                            </div>
                        </div>
                    </div>
                    
                    <div class="bar-chart-container">
                        ${chartBars.map(b => {
                            const pct = (b.val / b.total) * 100;
                            return `
                            <div class="chart-col">
                                <div class="bar-track" style="height: 100%;">
                                    <div class="bar-fill" style="height: ${pct}%;"></div>
                                    <div class="chart-tooltip">${b.val} Interns</div>
                                </div>
                                <span class="chart-lbl">${b.label}</span>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Donut Chart Component -->
                <div class="card card-glass">
                    <div class="card-title-row">
                        <span class="card-title">Role Distribution</span>
                    </div>
                    <div class="donut-container">
                        <svg class="donut-svg" viewBox="0 0 32 32">
                            <!-- Background ring -->
                            <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="var(--primary-light)" stroke-width="6"></circle>
                            <!-- Foreground ring -->
                            <circle r="15.915" cx="16" cy="16" fill="transparent" stroke="var(--primary)" stroke-width="6" stroke-dasharray="65 35" stroke-dashoffset="25"></circle>
                        </svg>
                        <div class="donut-center">
                            <span class="donut-total-val">349</span>
                            <span class="donut-total-lbl">Total Interns</span>
                        </div>
                        <div style="position:absolute; top: 10%; right: -5%; padding: 0.375rem 0.75rem; background: var(--surface); border-radius: 12px; font-size: 0.875rem; font-weight: 700; box-shadow: var(--shadow-sm); display:flex; align-items:center; gap:0.5rem; border: 1px solid var(--border);">
                            <span style="display:inline-block; width:8px; height:8px; background:var(--primary); border-radius:2px;"></span> 65%
                        </div>
                        <div style="position:absolute; bottom: 10%; left: -5%; padding: 0.375rem 0.75rem; background: var(--surface); border-radius: 12px; font-size: 0.875rem; font-weight: 700; box-shadow: var(--shadow-sm); display:flex; align-items:center; gap:0.5rem; border: 1px solid var(--border);">
                            <span style="display:inline-block; width:8px; height:8px; background:var(--primary-light); border-radius:2px;"></span> 35%
                        </div>
                    </div>
                    <div style="display:flex; justify-content:center; gap:1.5rem; margin-top:2rem;">
                        <div class="flex items-center gap-2 text-xs font-bold text-muted uppercase"><span style="display:inline-block; width:10px; height:10px; background:var(--primary); border-radius:3px;"></span> Frontend</div>
                        <div class="flex items-center gap-2 text-xs font-bold text-muted uppercase"><span style="display:inline-block; width:10px; height:10px; background:var(--primary-light); border-radius:3px;"></span> Backend</div>
                    </div>
                </div>
            </div>

            <!-- Table Component -->
            <div class="card card-glass">
                <div class="card-title-row">
                    <span class="card-title">Intern Directory</span>
                    <button class="btn btn-secondary"><i data-lucide="download" style="width: 16px;"></i> Export CSV</button>
                </div>
                <div class="data-table-wrap">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>ID No.</th>
                                <th>Role Type</th>
                                <th>Position</th>
                                <th>Performance</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${interns.slice(0, 5).map(intern => `
                                <tr>
                                    <td>
                                        <div class="table-profile">
                                            <div class="table-avatar">${intern.name.charAt(0)}</div>
                                            <span class="font-bold">${intern.name}</span>
                                        </div>
                                    </td>
                                    <td class="text-muted font-medium">#INT-${intern.id.toString().padStart(4, '0')}</td>
                                    <td>${Math.random() > 0.5 ? '<span class="status-pill pill-violet">Permanent</span>' : '<span class="status-pill pill-neutral">Contract</span>'}</td>
                                    <td class="font-medium">${intern.department || 'Engineering'}</td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <span class="${Math.random() > 0.3 ? 'text-success' : 'text-danger'} font-bold">
                                                ${Math.random() > 0.3 ? '+' : '-'}${Math.floor(Math.random() * 15)}%
                                            </span>
                                        </div>
                                    </td>
                                    <td><span class="status-pill pill-success">Active</span></td>
                                    <td><button class="btn btn-ghost" style="padding: 0.375rem;"><i data-lucide="more-horizontal" style="width: 18px;"></i></button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        ${renderAddInternModal()}
    `;
}

export function initDashboard() {
    document.getElementById('add-intern-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-intern-name').value;
        const email = document.getElementById('new-intern-email').value;
        if(name && email) {
            InternService.add({ name, email, department: 'Engineering' });
            window.closeModal('add-intern-modal');
            window.location.reload();
        }
    });
}

function renderAddInternModal() {
    return renderModal('add-intern-modal', 'Add New Intern', `
        <form id="add-intern-form" class="flex-col gap-4">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="new-intern-name" class="form-input" required>
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="new-intern-email" class="form-input" required>
            </div>
            <div class="form-group">
                <label>Department</label>
                <select class="form-input">
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Product</option>
                </select>
            </div>
        </form>
    `, `
        <button class="btn btn-ghost" onclick="window.closeModal('add-intern-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="document.getElementById('add-intern-form').dispatchEvent(new Event('submit'))">Add Intern</button>
    `);
}

export function renderInterns() {
    const interns = InternService.getAll();
    return `
        <div class="dashboard-grid">
            <div class="card card-glass">
                <div class="card-title-row">
                    <span class="card-title">Intern Directory</span>
                    <div class="flex items-center gap-4">
                        <div class="search-container" style="width: 280px; margin: 0;">
                            <i data-lucide="search" class="search-icon"></i>
                            <input type="text" class="search-input" placeholder="Search interns...">
                        </div>
                        <button class="btn btn-primary" onclick="window.openModal('add-intern-modal')"><i data-lucide="plus" style="width:16px;"></i> Add Intern</button>
                    </div>
                </div>
                <div class="data-table-wrap">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Education</th>
                                <th>Attendance</th>
                                <th>Performance</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${interns.map(i => `
                                <tr>
                                    <td>
                                        <div class="table-profile">
                                            <div class="table-avatar">${i.name.charAt(0)}</div>
                                            <span class="font-bold">${i.name}</span>
                                        </div>
                                    </td>
                                    <td class="text-muted font-medium">${i.email}</td>
                                    <td class="text-muted font-medium">${i.college || 'N/A'}</td>
                                    <td><span class="font-bold ${i.attendance < 80 ? 'text-danger' : 'text-primary-deep'}">${i.attendance}%</span></td>
                                    <td><span class="font-bold text-primary-deep">${i.performance}%</span></td>
                                    <td>${renderBadge(i.status)}</td>
                                    <td><button class="btn btn-secondary" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;">Profile</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        ${renderAddInternModal()}
    `;
}

export function initInterns() {
    initDashboard(); 
}

export function renderMentors() { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Mentors</span></div></div>`; }
export function renderBatches() { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Batches</span></div></div>`; }
export function renderDepartments() { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Departments</span></div></div>`; }
