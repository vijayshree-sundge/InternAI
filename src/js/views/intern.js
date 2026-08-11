import { TaskService, SubmissionService, InternService } from '../services.js';
import { renderBadge, renderModal } from '../components.js';
import { formatDate } from '../utils.js';

export function renderDashboard(user) {
    const tasks = TaskService.getByInternId(user.id);
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const pending = tasks.length - completed;
    const progress = tasks.length > 0 ? Math.floor((completed / tasks.length) * 100) : 0;
    
    return `
        <div class="hero-section">
            <div class="hero-bg-wash"></div>
            <div class="hero-content">
                <h1 class="hero-title">Good morning, ${user.name.split(' ')[0]}.</h1>
                <div style="margin-top: 1rem;">
                    <div class="hero-pill">
                        <div class="hero-pill-dot"></div>
                        Internship &middot; Day 42 of 90
                    </div>
                </div>
            </div>
        </div>

        <div class="dashboard-grid">
            <!-- Premium Journey Component -->
            <div class="card card-glass" style="padding: 1.5rem 2.5rem;">
                <div class="card-title-row" style="margin-bottom: 0;">
                    <span class="card-title">Your Journey</span>
                    <span class="text-violet font-bold">${progress}% Complete</span>
                </div>
                <div class="premium-journey">
                    <div class="journey-track-line"></div>
                    
                    <div class="journey-node completed">
                        <div class="j-ring"><i data-lucide="check"></i></div>
                        <span class="j-label">Onboarding</span>
                    </div>
                    
                    <div class="journey-node completed">
                        <div class="j-ring"><i data-lucide="check"></i></div>
                        <span class="j-label">Learning</span>
                    </div>
                    
                    <div class="journey-node current">
                        <div class="j-ring"></div>
                        <span class="j-label">Project Work</span>
                    </div>
                    
                    <div class="journey-node">
                        <div class="j-ring"></div>
                        <span class="j-label">Review</span>
                    </div>
                    
                    <div class="journey-node">
                        <div class="j-ring"></div>
                        <span class="j-label">Completion</span>
                    </div>
                </div>
            </div>

            <div class="grid-row-4">
                <div class="card metric-card card-soft-blue">
                    <div class="metric-header">
                        <span class="metric-title" style="color: var(--primary-deep)">Program Progress</span>
                        <div class="trend-badge trend-neutral"><i data-lucide="trending-up"></i></div>
                    </div>
                    <span class="metric-val">${progress}%</span>
                    <div class="mt-4" style="width: 100%; height: 6px; background: rgba(255,255,255,0.6); border-radius: 3px; overflow: hidden; border: 1px solid rgba(255,255,255,0.8);">
                        <div style="height: 100%; width: ${progress}%; background: var(--primary);"></div>
                    </div>
                </div>
                
                <div class="card metric-card">
                    <div class="metric-header">
                        <span class="metric-title">Tasks Pending</span>
                        <div class="trend-badge trend-down"><i data-lucide="alert-circle"></i></div>
                    </div>
                    <span class="metric-val">${pending}</span>
                    <span class="metric-sub text-danger font-semibold">Action required</span>
                </div>
                
                <div class="card metric-card card-soft-teal">
                    <div class="metric-header">
                        <span class="metric-title" style="color: var(--primary-deep)">Tasks Completed</span>
                        <div class="trend-badge trend-up"><i data-lucide="check"></i></div>
                    </div>
                    <span class="metric-val">${completed}</span>
                    <span class="metric-sub text-teal font-semibold">Great job!</span>
                </div>

                <div class="card metric-card">
                    <div class="metric-header">
                        <span class="metric-title">Performance</span>
                    </div>
                    <span class="metric-val text-violet">88%</span>
                    <span class="metric-sub">Top 15% of Batch</span>
                </div>
            </div>

            <div class="grid-row-2-split">
                <!-- Tasks List -->
                <div class="card">
                    <div class="card-title-row">
                        <span class="card-title">Today's Work</span>
                        <a href="#/intern/tasks" style="font-size: 0.875rem; color: var(--primary); font-weight: 700;">View All &rarr;</a>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        ${tasks.filter(t=>t.status!=='Completed').slice(0, 3).map(t => `
                            <div style="padding: 1.25rem; border: 1px solid var(--border); border-radius: 16px; display: flex; justify-content: space-between; align-items: center; transition: var(--transition); background: var(--surface-alt);">
                                <div>
                                    <div class="font-bold text-dark" style="font-size: 1rem; margin-bottom: 0.25rem;">${t.title}</div>
                                    <div class="text-xs text-muted flex items-center gap-1">
                                        <i data-lucide="calendar" style="width: 14px;"></i> Due ${formatDate(t.deadline)}
                                    </div>
                                </div>
                                ${renderBadge(t.status)}
                            </div>
                        `).join('')}
                        ${pending === 0 ? '<div style="text-align: center; color: var(--text-muted); padding: 2rem 0;">No pending tasks. Great work!</div>' : ''}
                    </div>
                </div>
                
                <!-- Feedback/Insights -->
                <div class="card">
                    <div class="card-title-row">
                        <span class="card-title">Intelligence</span>
                    </div>
                    
                    <div class="ai-insight mb-6">
                        <div class="ai-icon-wrap"><i data-lucide="sparkles"></i></div>
                        <p>"Your technical execution speed has increased by 12% over the last sprint. Focus on code documentation to push your overall quality score even higher."</p>
                    </div>
                    
                    <div>
                        <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--text-muted); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">Recent Activity</h4>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem;">
                            <span style="font-size: 0.875rem; color: var(--primary-deep); font-weight: 600;">Safetrans Module 1</span>
                            ${renderBadge('Approved')}
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.875rem; color: var(--primary-deep); font-weight: 600;">API Integration</span>
                            ${renderBadge('Pending Review')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderTasks(user) {
    const tasks = TaskService.getByInternId(user.id);
    return `
        <div class="dashboard-grid">
            <div class="card-title-row" style="margin-bottom: 0;">
                <span class="card-title" style="font-size: 1.75rem;">My Tasks</span>
            </div>
            
            <div class="card card-glass">
                <div class="data-table-wrap">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tasks.map(t => `
                                <tr>
                                    <td class="font-bold">${t.title}</td>
                                    <td>${renderBadge(t.priority)}</td>
                                    <td class="text-muted font-medium"><i data-lucide="calendar" style="width: 14px; margin-right: 4px; vertical-align: middle;"></i>${formatDate(t.deadline)}</td>
                                    <td>${renderBadge(t.status)}</td>
                                    <td>
                                        <button class="btn btn-primary btn-submit-task" style="padding: 0.5rem 1rem; font-size: 0.75rem;" data-id="${t.id}" ${(t.status==='Completed' || t.status==='Under Review') ? 'disabled':''}>Submit Work</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        ${renderModal('submit-modal', 'Submit Work', `
            <input type="hidden" id="submit-task-id">
            <div class="form-group mb-4">
                <label>Submission Link (GitHub, Drive, etc)</label>
                <input type="url" id="submit-task-link" class="form-input" placeholder="https://...">
            </div>
            <div class="form-group mb-4">
                <label>Notes for Mentor</label>
                <textarea id="submit-task-notes" class="form-input" rows="4" placeholder="Briefly describe what you completed..."></textarea>
            </div>
            <div class="form-group">
                <label>Upload File (Optional)</label>
                <input type="file" id="submit-task-file" class="form-input" style="padding: 0.5rem;">
            </div>
        `, `
            <button class="btn btn-ghost" onclick="window.closeModal('submit-modal')">Cancel</button>
            <button class="btn btn-primary" id="confirm-submit-btn">Submit Work</button>
        `)}
    `;
}

export function initTasks(user) {
    document.querySelectorAll('.btn-submit-task').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.getElementById('submit-task-id').value = e.target.dataset.id;
            window.openModal('submit-modal');
        });
    });

    document.getElementById('confirm-submit-btn')?.addEventListener('click', () => {
        const taskId = parseInt(document.getElementById('submit-task-id').value);
        SubmissionService.add({
            internId: user.id,
            taskId: taskId,
            link: document.getElementById('submit-task-link').value,
            notes: document.getElementById('submit-task-notes').value
        });
        TaskService.updateStatus(taskId, 'Under Review');
        window.closeModal('submit-modal');
        window.location.reload();
    });
}

export function renderSubmissions(user) { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Submissions</span></div></div>`; }
export function renderAttendance(user) { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Attendance</span></div></div>`; }
export function renderPerformance(user) { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Performance Insights</span></div></div>`; }
export function renderChat(user) { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Communication</span></div></div>`; }
export function initChat(user) {}
export function renderNotifications(user) { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Notifications</span></div></div>`; }
export function initNotifications(user) {}
export function renderCertificates(user) { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Certificates</span></div></div>`; }
export function initCertificates(user) {}
export function renderProfile(user) { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Profile</span></div></div>`; }
export function initProfile(user) {}

export function setupInternRoutes(router) {
    const wrap = (contentFn, initFn) => {
        return (el) => {
            import('../services.js').then(({ AuthService }) => {
                const user = AuthService.getCurrentUser();
                if(!user || user.role !== 'intern') return router.navigate('/');
                import('../components.js').then(({ renderAppLayout }) => {
                    el.innerHTML = renderAppLayout(user, contentFn(user));
                    document.getElementById('logout-btn').addEventListener('click', () => {
                        AuthService.logout();
                        router.navigate('/');
                    });
                    if(initFn) setTimeout(() => initFn(user), 0);
                });
            });
        };
    };

    router.add('/intern/dashboard', wrap(renderDashboard));
    router.add('/intern/tasks', wrap(renderTasks, initTasks));
    router.add('/intern/submissions', wrap(renderSubmissions));
    router.add('/intern/attendance', wrap(renderAttendance));
    router.add('/intern/performance', wrap(renderPerformance));
    router.add('/intern/chat', wrap(renderChat, initChat));
    router.add('/intern/notifications', wrap(renderNotifications, initNotifications));
    router.add('/intern/certificates', wrap(renderCertificates, initCertificates));
    router.add('/intern/profile', wrap(renderProfile, initProfile));
}
