import { store } from './store.js';

// Centralized API configuration for future REST integration
export const API_CONFIG = {
    BASE_URL: '/api/v1',
    USE_MOCK: true // Set to false to switch to a real backend (e.g., ASP.NET Core)
};

// Generic Data Provider handling the mock -> real transition boundary
class DataProvider {
    static get(table) { return store.getTable(table); }
    static insert(table, data) { return store.insert(table, data); }
    static update(table, id, data) { return store.update(table, id, data); }
    static saveTable(table, data) { return store.saveTable(table, data); }
}

export const AuthService = {
    login: (email, role) => store.login(email, role),
    logout: () => store.logout(),
    getCurrentUser: () => store.getCurrentUser()
};

export const InternService = {
    getAll: () => DataProvider.get('users').filter(u => u.role === 'intern'),
    getById: (id) => DataProvider.get('users').find(u => u.id === id),
    create: (data) => DataProvider.insert('users', { ...data, role: 'intern', status: 'Active', attendance: 100, performance: 100 }),
    updateProfile: (id, data) => {
        DataProvider.update('users', id, data);
        const user = AuthService.getCurrentUser();
        if(user && user.id === id) {
            localStorage.setItem('currentUser', JSON.stringify({...user, ...data}));
        }
    }
};

export const TaskService = {
    getAll: () => DataProvider.get('tasks'),
    getByInternId: (internId) => DataProvider.get('tasks').filter(t => t.internId === internId),
    create: (data) => DataProvider.insert('tasks', { ...data, status: 'Not Started', priority: 'Medium' }),
    updateStatus: (taskId, status) => DataProvider.update('tasks', taskId, { status })
};

export const SubmissionService = {
    getAll: () => DataProvider.get('submissions'),
    getByInternId: (internId) => DataProvider.get('submissions').filter(s => s.internId === internId),
    create: (data) => {
        const id = DataProvider.insert('submissions', { ...data, date: new Date().toISOString(), status: 'Pending', aiScore: 0, mentorScore: 0 });
        TaskService.updateStatus(data.taskId, 'Under Review');
        return id;
    },
    approve: (submissionId) => {
        const sub = DataProvider.get('submissions').find(s => s.id === submissionId);
        if(sub) {
            DataProvider.update('submissions', submissionId, { status: 'Approved', mentorScore: 100 });
            TaskService.updateStatus(sub.taskId, 'Completed');
        }
    }
};

export const AttendanceService = {
    getByInternId: (internId) => DataProvider.get('attendance').filter(a => a.internId === internId)
};

export const NotificationService = {
    getByUserId: (userId) => DataProvider.get('notifications').filter(n => n.userId === userId),
    markAllRead: (userId) => {
        let notifs = DataProvider.get('notifications');
        notifs = notifs.map(n => n.userId === userId ? {...n, read:true} : n);
        DataProvider.saveTable('notifications', notifs);
    }
};

export const ManagementService = {
    getMentors: () => DataProvider.get('users').filter(u => u.role === 'mentor'),
    getBatches: () => DataProvider.get('batches'),
    getDepartments: () => DataProvider.get('departments'),
    getAuditLogs: () => DataProvider.get('logs')
};
