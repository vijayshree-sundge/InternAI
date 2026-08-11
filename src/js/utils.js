export function formatDate(isoStr) {
    if(!isoStr) return 'N/A';
    return new Date(isoStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatTime(isoStr) {
    if(!isoStr) return 'N/A';
    return new Date(isoStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export function exportCSV(filename, rows) {
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function renderRadialProgress(percent, size = 120, stroke = 8, color = 'var(--accent)') {
    const radius = (size - stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100) * circumference;
    return `
        <div class="radial-chart" style="width:${size}px; height:${size}px; position: relative; display: inline-flex; align-items: center; justify-content: center;">
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                <circle cx="${size/2}" cy="${size/2}" r="${radius}" stroke="var(--border)" stroke-width="${stroke}" fill="none" />
                <circle cx="${size/2}" cy="${size/2}" r="${radius}" stroke="${color}" stroke-width="${stroke}" fill="none" 
                        stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round"
                        style="transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 1s ease-out;" />
            </svg>
            <div class="radial-chart-content" style="position: absolute; text-align: center;">
                <span style="font-size: ${size*0.25}px; font-weight: 600; color: var(--text-main); font-variant-numeric: tabular-nums; letter-spacing: -0.02em;">${percent}%</span>
            </div>
        </div>
    `;
}

export function openModal(id) {
    const el = document.getElementById(id);
    if(el) {
        el.classList.remove('hidden');
        // Force reflow
        void el.offsetWidth;
        el.classList.add('open');
    }
}

export function closeModal(id) {
    const el = document.getElementById(id);
    if(el) {
        el.classList.remove('open');
        setTimeout(() => el.classList.add('hidden'), 200);
    }
}

export function initLucide() {
    if(window.lucide) {
        window.lucide.createIcons();
    }
}

window.openModal = openModal;
window.closeModal = closeModal;
