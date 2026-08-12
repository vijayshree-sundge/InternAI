import { store } from './store.js';
import { Router } from './router.js';
import { renderLogin } from './views/auth.js';
import { setupInternRoutes } from './views/intern.js';
import { setupManagementRoutes } from './views/management.js';
import { initLucide } from './utils.js';
import { AuthService } from './services.js';

store.init();
const router = new Router('app');
export const appRouter = router;

const originalHandle = router.handleRoute.bind(router);
router.handleRoute = () => {
    originalHandle();
    setTimeout(initLucide, 10);
    setupThemeToggle();
};

function setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if(btn) {
        btn.onclick = () => {
            const html = document.documentElement;
            if(html.classList.contains('light')) {
                html.classList.remove('light');
                html.classList.add('dark');
                localStorage.setItem('internai_theme', 'dark');
            } else {
                html.classList.remove('dark');
                html.classList.add('light');
                localStorage.setItem('internai_theme', 'light');
            }
        };
    }
}

const savedTheme = 'light';
document.documentElement.className = savedTheme;

function checkAuth() {
    const user = AuthService.getCurrentUser();
    const hash = window.location.hash || '#/';
    
    if (!user) {
        if (hash !== '#/') router.navigate('/');
    } else {
        if (hash === '#/') {
            router.navigate(user.role === 'intern' ? '/intern/dashboard' : '/management/dashboard');
        } else if (user.role === 'intern' && hash.includes('/management')) {
            router.navigate('/intern/dashboard');
        } else if (user.role === 'management' && hash.includes('/intern/')) {
            router.navigate('/management/dashboard');
        }
    }
}

router.add('/', (el) => { renderLogin(el); });

window.addEventListener('load', () => {
    if (typeof setupInternRoutes === 'function') setupInternRoutes(router);
    if (typeof setupManagementRoutes === 'function') setupManagementRoutes(router);
    
    checkAuth();
    router.handleRoute();
});

window.addEventListener('hashchange', checkAuth);

document.addEventListener('click', (e) => {
    if (e.target.closest('#mobile-toggle')) {
        document.getElementById('sidebar').classList.toggle('open');
    } else if (!e.target.closest('#sidebar') && window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('open');
    }
});
