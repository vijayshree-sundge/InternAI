import { getLogoSVG } from '../components.js';

export function renderLogin(el) {
    el.innerHTML = `
        <div class="ambient-bg">
            <div class="ambient-glow glow-blue"></div>
            <div class="ambient-glow glow-teal"></div>
            <div class="ambient-glow glow-violet"></div>
        </div>
        
        <div class="login-wrap">
            <div class="login-box">
                <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 2.5rem;">
                    <div style="margin-bottom: 1.5rem; filter: drop-shadow(0 4px 12px rgba(37, 99, 235, 0.2));">
                        ${getLogoSVG()}
                    </div>
                    <h1 style="font-size: 1.75rem; font-weight: 700; color: var(--primary-deep); margin-bottom: 0.5rem; letter-spacing: -0.02em;">Sign in to InternAI</h1>
                    <p style="color: var(--text-muted); font-size: 0.9rem; font-weight: 500;">Strides Software Solutions</p>
                </div>
                
                <div id="login-error" style="color: var(--danger); font-size: 0.875rem; text-align: center; margin-bottom: 1rem; display: none; font-weight: 600; padding: 0.75rem; background: var(--danger-light); border-radius: 8px;"></div>
                
                <div class="form-group mb-4">
                    <label>Email</label>
                    <input type="email" id="login-email" class="form-input" placeholder="Enter your email" value="management@stridessoftware.com">
                </div>
                
                <div class="form-group mb-6">
                    <label>Password</label>
                    <input type="password" class="form-input" placeholder="••••••••" value="password">
                </div>
                
                <div class="form-group mb-8">
                    <label style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Demo Access Role</label>
                    <select id="login-role" class="form-input">
                        <option value="management">Management / HR</option>
                        <option value="intern">Intern</option>
                    </select>
                </div>

                <button id="login-btn" class="btn btn-primary w-full" style="padding: 1rem; font-size: 1rem;">Access Workspace &rarr;</button>
            </div>
        </div>
    `;
}

export function initLogin(onSuccess) {
    document.getElementById('login-role').addEventListener('change', (e) => {
        document.getElementById('login-email').value = e.target.value === 'intern' ? 'intern1@stridessoftware.com' : 'management@stridessoftware.com';
    });

    document.getElementById('login-btn').addEventListener('click', () => {
        const role = document.getElementById('login-role').value;
        const btn = document.getElementById('login-btn');
        btn.innerHTML = `<i data-lucide="loader" class="spin" style="width: 18px;"></i> Authenticating...`;
        btn.style.opacity = '0.8';
        
        // Simulate network delay
        setTimeout(() => {
            if(role === 'intern') {
                onSuccess({ id: 1, name: 'Rahul Sharma', email: 'intern1@stridessoftware.com', role: 'intern', attendance: 92, performance: 88 });
            } else {
                onSuccess({ id: 0, name: 'Admin User', email: 'management@stridessoftware.com', role: 'management' });
            }
        }, 600);
    });
}
