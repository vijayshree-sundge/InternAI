import { generateMockData } from './mockData.js';

export const store = {
    init() {
        if (!localStorage.getItem('strides_db')) {
            localStorage.setItem('strides_db', JSON.stringify(generateMockData()));
        }
    },
    getDb() { return JSON.parse(localStorage.getItem('strides_db')); },
    saveDb(db) { localStorage.setItem('strides_db', JSON.stringify(db)); },
    getTable(table) { return this.getDb()[table] || []; },
    saveTable(table, data) {
        const db = this.getDb();
        db[table] = data;
        this.saveDb(db);
    },
    insert(table, item) {
        const data = this.getTable(table);
        item.id = Date.now() + Math.floor(Math.random()*1000);
        data.push(item);
        this.saveTable(table, data);
        this.logAction(`Created item in ${table}`);
        return item;
    },
    update(table, id, updates) {
        const data = this.getTable(table);
        const idx = data.findIndex(i => i.id == id);
        if (idx !== -1) {
            data[idx] = { ...data[idx], ...updates };
            this.saveTable(table, data);
            this.logAction(`Updated item in ${table}`);
        }
    },
    delete(table, id) {
        const data = this.getTable(table);
        const newData = data.filter(i => i.id != id);
        this.saveTable(table, newData);
        this.logAction(`Deleted item from ${table}`);
    },
    logAction(action) {
        const logs = this.getTable('logs');
        const user = this.getCurrentUser();
        logs.unshift({ id: Date.now(), date: new Date().toISOString(), user: user ? user.name : 'System', action });
        this.saveTable('logs', logs);
    },
    getCurrentUser() { 
        const u = localStorage.getItem('currentUser');
        return u ? JSON.parse(u) : null;
    },
    login(email, role) {
        const users = this.getTable('users');
        const user = users.find(u => u.email === email && u.role === role);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.logAction('Logged in');
            return true;
        }
        return false;
    },
    logout() {
        this.logAction('Logged out');
        localStorage.removeItem('currentUser');
    }
};
