export function getLogoSVG() {
    return `
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="var(--primary)" opacity="0.9"/>
        <circle cx="20" cy="12" r="8" fill="var(--teal)" opacity="0.8"/>
        <circle cx="12" cy="20" r="6" fill="var(--violet)" opacity="0.9"/>
        <path d="M14 10l6 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
}

export function renderAppLayout(user, contentHTML) {
    const isIntern = user.role === 'intern';
    const currentHash = window.location.hash || '#/';
    
    const navLinks = isIntern ? [
        { path: '#/intern/dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
        { path: '#/intern/tasks', label: 'My Tasks', icon: 'check-circle' },
        { path: '#/intern/performance', label: 'Performance', icon: 'trending-up' },
        { path: '#/intern/chat', label: 'Messages', icon: 'message-square' }
    ] : [
        { path: '#/management/dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
        { path: '#/management/tasks', label: 'Work', icon: 'briefcase' },
        { path: '#/management/interns', label: 'People', icon: 'users' },
        { path: '#/management/performance', label: 'Insights', icon: 'pie-chart' }
    ];

    const bottomLinks = [
        { path: '#/profile', label: 'Profile', icon: 'user' },
        { path: '#/settings', label: 'Settings', icon: 'settings' }
    ];

    const renderNav = (links) => links.map(l => {
        const isActive = currentHash.startsWith(l.path) || (currentHash === '#/' && l.path.includes('dashboard'));
        return `
            <a href="${l.path}" class="nav-item ${isActive ? 'active' : ''}">
                <i data-lucide="${l.icon}"></i>
                <span>${l.label}</span>
            </a>
        `;
    }).join('');

    return `
        <!-- Ambient Background Glows -->
        <div class="ambient-bg">
            <div class="ambient-glow glow-blue"></div>
            <div class="ambient-glow glow-teal"></div>
            <div class="ambient-glow glow-violet"></div>
        </div>

        <div class="app-layout">
            <!-- Left Sidebar -->
            <aside class="sidebar">
                <div class="sidebar-header">
                    ${getLogoSVG()}
                    <div class="brand-text-col">
                        <span class="brand-title">InternAI</span>
                        <span class="brand-subtitle">Strides Software</span>
                    </div>
                </div>
                
                <div class="sidebar-profile" id="logout-btn" title="Click to Logout">
                    <div class="profile-avatar">${user.name.charAt(0)}</div>
                    <div class="profile-info">
                        <span class="profile-name">${user.name}</span>
                        <span class="profile-role">${isIntern ? 'Software Intern' : 'Management'}</span>
                    </div>
                    <i data-lucide="more-horizontal" class="text-light" style="width:16px;"></i>
                </div>

                <nav class="sidebar-nav">
                    ${renderNav(navLinks)}
                </nav>

                <div style="padding: 1.5rem 1.5rem 0.5rem;"><div style="border-top: 1px solid var(--border);"></div></div>
                
                <nav class="sidebar-nav" style="flex: 0; padding-bottom: 1.5rem;">
                    ${renderNav(bottomLinks)}
                </nav>
            </aside>

            <!-- Main Right Section -->
            <div class="main-wrapper">
                <header class="top-header">
                    <div class="search-container">
                        <i data-lucide="search" class="search-icon"></i>
                        <input type="text" class="search-input" placeholder="Search workspace...">
                        <div class="search-shortcut">⌘ K</div>
                    </div>
                    <div class="header-actions">
                        <button class="glass-btn" title="Notifications">
                            <i data-lucide="bell"></i>
                            <div class="notification-dot"></div>
                        </button>
                    </div>
                </header>
                
                <main class="content-canvas">
                    ${contentHTML}
                </main>
            </div>
        </div>
    `;
}

export function getBadgeClass(status) {
    if(!status) return 'pill-neutral';
    const s = status.toLowerCase();
    if (s.includes('completed') || s.includes('approved') || s.includes('present') || s.includes('active') || s.includes('permanent')) return 'pill-success';
    if (s.includes('progress') || s.includes('review') || s.includes('medium') || s.includes('contract')) return 'pill-warning';
    if (s.includes('overdue') || s.includes('absent') || s.includes('rejected') || s.includes('needs') || s.includes('high')) return 'pill-danger';
    if (s.includes('analytics') || s.includes('ai') || s.includes('insight')) return 'pill-violet';
    return 'pill-neutral';
}

export function renderBadge(text) {
    return `<span class="status-pill ${getBadgeClass(text)}">${text}</span>`;
}

export function renderModal(id, title, contentHTML, actionsHTML = '') {
    return `
        <div class="modal-overlay" id="${id}">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="btn btn-ghost" onclick="window.closeModal('${id}')" style="padding: 0.375rem;"><i data-lucide="x" style="width: 20px;"></i></button>
                </div>
                <div class="modal-body">
                    ${contentHTML}
                </div>
                ${actionsHTML ? `<div class="modal-footer">${actionsHTML}</div>` : ''}
            </div>
        </div>
    `;
}
