export class Router {
    constructor(appId) {
        this.routes = {};
        this.appEl = document.getElementById(appId);
        window.addEventListener('hashchange', () => this.handleRoute());
    }
    add(path, handler) { this.routes[path] = handler; }
    navigate(path) { window.location.hash = path; }
    handleRoute() {
        const path = window.location.hash.slice(1) || '/';
        const handler = this.routes[path] || this.routes['/'];
        if (handler) {
            handler(this.appEl);
        } else {
            this.appEl.innerHTML = '<div class="content" style="text-align:center; padding-top: 5rem;"><h2>404 Not Found</h2><p class="text-muted mt-4">The page you are looking for does not exist.</p><button class="btn btn-primary mt-6" onclick="window.history.back()">Go Back</button></div>';
        }
    }
}
