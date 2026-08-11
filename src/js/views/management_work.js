import { TaskService, InternService } from '../services.js';
import { renderBadge, renderModal } from '../components.js';
import { formatDate } from '../utils.js';

export function renderTasks() {
    const tasks = TaskService.getAll();
    const interns = InternService.getAll();
    
    const notStarted = tasks.filter(t => t.status === 'Not Started');
    const inProgress = tasks.filter(t => t.status === 'In Progress' || t.status === 'In Review' || t.status === 'Under Review');
    const completed = tasks.filter(t => t.status === 'Completed');
    
    const renderKanbanCard = (t) => {
        const intern = interns.find(i => i.id == t.internId);
        return `
            <div class="card" style="margin-bottom: 1rem; padding: 1.25rem; border-radius: 16px; cursor: pointer;">
                <div class="flex justify-between items-center mb-3">
                    ${renderBadge(t.priority)}
                    <span class="text-xs text-muted font-bold flex items-center gap-1"><i data-lucide="calendar" style="width: 14px;"></i>${formatDate(t.deadline)}</span>
                </div>
                <h4 class="font-bold text-primary-deep mt-1" style="font-size: 1rem;">${t.title}</h4>
                <div class="flex justify-between items-center mt-4 pt-3" style="border-top: 1px dashed var(--border-dark);">
                    <div class="table-profile">
                        <div class="table-avatar" style="width: 28px; height: 28px; font-size: 10px; border-radius: 8px;">${intern ? intern.name.charAt(0) : '?'}</div>
                        <span class="text-xs font-bold text-muted">${intern ? intern.name.split(' ')[0] : 'Unknown'}</span>
                    </div>
                    ${t.status === 'Under Review' ? '<span class="status-pill pill-violet">Review Req</span>' : ''}
                </div>
            </div>
        `;
    };
    
    return `
        <div class="dashboard-grid">
            <div class="card-title-row" style="margin-bottom: 0;">
                <span class="card-title" style="font-size: 1.75rem;">Task Management</span>
                <button class="btn btn-primary" onclick="window.openModal('add-task-modal')"><i data-lucide="plus" style="width: 16px;"></i> Create Task</button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                <!-- Backlog Column -->
                <div class="card card-glass" style="padding: 1.5rem;">
                    <div class="flex justify-between items-center mb-4">
                        <span class="font-bold text-primary-deep" style="font-size: 1.125rem;">Backlog</span>
                        <span class="status-pill pill-neutral">${notStarted.length}</span>
                    </div>
                    ${notStarted.map(renderKanbanCard).join('')}
                </div>
                
                <!-- In Progress Column -->
                <div class="card card-glass" style="padding: 1.5rem; background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(232, 240, 255, 0.4));">
                    <div class="flex justify-between items-center mb-4">
                        <span class="font-bold text-primary-deep" style="font-size: 1.125rem;">In Progress</span>
                        <span class="status-pill pill-neutral">${inProgress.length}</span>
                    </div>
                    ${inProgress.map(renderKanbanCard).join('')}
                </div>
                
                <!-- Completed Column -->
                <div class="card card-glass" style="padding: 1.5rem; background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(220, 252, 231, 0.4));">
                    <div class="flex justify-between items-center mb-4">
                        <span class="font-bold text-primary-deep" style="font-size: 1.125rem;">Completed</span>
                        <span class="status-pill pill-neutral">${completed.length}</span>
                    </div>
                    ${completed.map(renderKanbanCard).join('')}
                </div>
            </div>
        </div>
        
        ${renderModal('add-task-modal', 'Create New Task', `
            <form id="add-task-form" class="flex-col gap-4">
                <div class="form-group">
                    <label>Task Title</label>
                    <input type="text" id="new-task-title" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Assign To (Intern)</label>
                    <select id="new-task-intern" class="form-input">
                        ${interns.map(i => `<option value="${i.id}">${i.name}</option>`).join('')}
                    </select>
                </div>
                <div class="grid-row-2-split">
                    <div class="form-group">
                        <label>Deadline</label>
                        <input type="date" id="new-task-date" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label>Priority</label>
                        <select id="new-task-priority" class="form-input">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                </div>
            </form>
        `, `
            <button class="btn btn-ghost" onclick="window.closeModal('add-task-modal')">Cancel</button>
            <button class="btn btn-primary" onclick="document.getElementById('add-task-form').dispatchEvent(new Event('submit'))">Create Task</button>
        `)}
    `;
}

export function initTasks() {
    document.getElementById('add-task-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('new-task-title').value;
        const internId = document.getElementById('new-task-intern').value;
        const deadline = document.getElementById('new-task-date').value;
        const priority = document.getElementById('new-task-priority').value;
        
        if(title && deadline) {
            TaskService.add({
                title, internId, deadline, priority, status: 'Not Started'
            });
            window.closeModal('add-task-modal');
            window.location.reload();
        }
    });
}

export function renderSubmissions() {
    return `<div class="dashboard-grid"><div class="card"><span class="card-title">Reviews</span></div></div>`;
}

export function initSubmissions() {}
export function renderAttendance() { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Attendance</span></div></div>`; }
export function renderPerformance() { return `<div class="dashboard-grid"><div class="card"><span class="card-title">Performance Analytics</span></div></div>`; }
