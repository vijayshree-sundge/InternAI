import { store } from '../store.js';
import { renderAppLayout } from '../components.js';
import { renderDashboard, renderInterns, initInterns, renderMentors, renderBatches, renderDepartments } from './management_core.js';
import { renderTasks, initTasks, renderSubmissions, initSubmissions, renderAttendance, renderPerformance } from './management_work.js';
import { renderAnalytics, renderReports, initReports, renderNotifications, renderAudit, renderSettings } from './management_sys.js';
import { AuthService } from '../services.js';

export function setupManagementRoutes(router) {
    const wrap = (contentFn, initFn) => {
        return (el) => {
            const user = AuthService.getCurrentUser();
            if(!user || user.role !== 'management') return router.navigate('/');
            el.innerHTML = renderAppLayout(user, contentFn());
            document.getElementById('logout-btn').addEventListener('click', () => {
                AuthService.logout();
                router.navigate('/');
            });
            if(initFn) setTimeout(() => initFn(), 0);
        };
    };

    router.add('/management/dashboard', wrap(renderDashboard));
    router.add('/management/interns', wrap(renderInterns, initInterns));
    router.add('/management/mentors', wrap(renderMentors));
    router.add('/management/batches', wrap(renderBatches));
    router.add('/management/departments', wrap(renderDepartments));
    router.add('/management/tasks', wrap(renderTasks, initTasks));
    router.add('/management/submissions', wrap(renderSubmissions, initSubmissions));
    router.add('/management/attendance', wrap(renderAttendance));
    router.add('/management/performance', wrap(renderPerformance));
    router.add('/management/analytics', wrap(renderAnalytics));
    router.add('/management/reports', wrap(renderReports, initReports));
    router.add('/management/notifications', wrap(renderNotifications));
    router.add('/management/audit', wrap(renderAudit));
    router.add('/management/settings', wrap(renderSettings));
}
