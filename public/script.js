// ════════════════════════════════════════════════════════════
//  BACKGROUND PARTICLE CANVAS
// ════════════════════════════════════════════════════════════
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx    = bgCanvas.getContext('2d');
let particles  = [];
let time       = 0;

function resizeBg() { bgCanvas.width = window.innerWidth; bgCanvas.height = window.innerHeight; }
resizeBg();
window.addEventListener('resize', resizeBg);

function createParticle() {
    return {
        x: Math.random() * bgCanvas.width, y: Math.random() * bgCanvas.height,
        vx: (Math.random() - 0.5) * 0.8,  vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        life: Math.random() * 300 + 200,
        pulse: Math.random() * Math.PI * 2
    };
}
for (let i = 0; i < 80; i++) particles.push(createParticle());

function animateBackground() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    time += 0.01;

    bgCtx.strokeStyle = 'rgba(0,212,255,0.03)';
    bgCtx.lineWidth   = 0.5;
    const gs = 50;
    for (let x = 0; x < bgCanvas.width;  x += gs) { bgCtx.beginPath(); bgCtx.moveTo(x,0); bgCtx.lineTo(x,bgCanvas.height); bgCtx.stroke(); }
    for (let y = 0; y < bgCanvas.height; y += gs) { bgCtx.beginPath(); bgCtx.moveTo(0,y); bgCtx.lineTo(bgCanvas.width,y); bgCtx.stroke(); }

    particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.life--; p.pulse += 0.05;
        if (p.x < 0 || p.x > bgCanvas.width)  p.vx *= -0.8;
        if (p.y < 0 || p.y > bgCanvas.height)  p.vy *= -0.8;
        if (p.life <= 0) { particles[i] = createParticle(); return; }
        const pAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        bgCtx.beginPath(); bgCtx.arc(p.x, p.y, p.r,     0, Math.PI*2);
        bgCtx.fillStyle = `rgba(0,212,255,${pAlpha})`; bgCtx.fill();
        bgCtx.beginPath(); bgCtx.arc(p.x, p.y, p.r * 2, 0, Math.PI*2);
        bgCtx.fillStyle = `rgba(0,212,255,${pAlpha*0.2})`; bgCtx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 120) {
                const opacity = (1 - dist/120) * 0.15;
                bgCtx.beginPath();
                bgCtx.moveTo(particles[i].x, particles[i].y);
                bgCtx.lineTo(particles[j].x, particles[j].y);
                const g = bgCtx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                g.addColorStop(0, `rgba(0,212,255,${opacity})`);
                g.addColorStop(0.5, `rgba(0,255,170,${opacity*0.8})`);
                g.addColorStop(1, `rgba(0,212,255,${opacity})`);
                bgCtx.strokeStyle = g; bgCtx.lineWidth = 0.8; bgCtx.stroke();
            }
        }
    }
    requestAnimationFrame(animateBackground);
}
animateBackground();

// ════════════════════════════════════════════════════════════
//  JARVIS SYSTEM
// ════════════════════════════════════════════════════════════
function initInterface() {
    document.getElementById('mainInterface').classList.add('visible');
    setTimeout(() => jarvis.activate(), 500);
}

const jarvis = {
    active: false,
    activate() {
        if (this.active) return;
        this.active = true;
        this.spawnNodesFromCoin();
        this.showNotification('CODEBREAKERS SYSTEM ONLINE');
    },
    spawnNodesFromCoin() {
        const nodes = document.querySelectorAll('.node');
        const coin  = document.getElementById('rotatingCoin');
        coin.style.animationDuration = '0.5s';
        nodes.forEach((node, i) => {
            setTimeout(() => {
                node.classList.add('spawning');
                setTimeout(() => { node.classList.add('positioned'); node.classList.add('visible'); }, 1500);
            }, i * 200);
        });
        setTimeout(() => { coin.style.animationDuration = '8s'; }, 2000);
    },
    showNotification(message) {
        const n = document.createElement('div');
        n.style.cssText = `
            position:fixed;top:20px;right:20px;z-index:10000;
            padding:12px 18px;background:rgba(0,6,18,0.95);
            border:1px solid var(--cyan);border-left:3px solid var(--cyan);
            color:var(--cyan);font-size:0.78rem;letter-spacing:0.1em;
            backdrop-filter:blur(10px);box-shadow:0 0 20px rgba(0,212,255,0.3);
            animation:slideInRight 0.3s ease;font-family:'Space Mono',monospace;
        `;
        n.textContent = message;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 3000);
    }
};

// ════════════════════════════════════════════════════════════
//  PANEL CONTENT DEFINITIONS
// ════════════════════════════════════════════════════════════
const panels = {
    resume: {
        title: 'RESUME',
        content: `<div style="text-align:center;padding:20px 16px;">
            <div style="font-size:2.5rem;margin-bottom:16px;">📄</div>
            <h3 style="color:var(--cyan);margin-bottom:10px;letter-spacing:0.15em;font-family:'Bebas Neue',sans-serif;font-size:1.4rem;">PROFESSIONAL RESUME</h3>
            <p style="font-size:0.82rem;color:rgba(0,212,255,0.6);line-height:1.6;margin-bottom:22px;">View my complete professional resume<br>with experience, skills, and achievements.</p>
            <div style="margin-bottom:20px;">
                <iframe src="https://www.canva.com/design/DAGnTB1gSSg/yaJ5iSTqmJVcGWfpTqO5fA/view?embed" 
                        style="width:100%;height:400px;border:1px solid rgba(0,212,255,0.3);border-radius:8px;background:rgba(0,212,255,0.03);"
                        allowfullscreen>
                </iframe>
            </div>
            <div style="text-align:center;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
                <button class="panel-btn" data-url="https://www.canva.com/design/DAGnTB1gSSg/yaJ5iSTqmJVcGWfpTqO5fA/view?utm_content=DAGnTB1gSSg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink">VIEW FULL RESUME</button>
                <button class="panel-btn" data-url="https://www.canva.com/design/DAGnTB1gSSg/yaJ5iSTqmJVcGWfpTqO5fA/view?utm_content=DAGnTB1gSSg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview">DOWNLOAD PDF</button>
            </div></div>`
    },
    youtube: {
        title: 'YOUTUBE',
        content: `<div style="text-align:center;margin-bottom:22px;">
            <div style="width:70px;height:70px;border-radius:50%;background:#ff0000;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"/></svg>
            </div>
            <h2 style="color:var(--bright);margin-bottom:4px;">MAJEN</h2>
            <p style="color:rgba(0,212,255,0.6);font-size:0.78rem;">CodeBreakers Channel</p></div>
            <div style="text-align:center;">
                <button class="panel-btn" data-url="https://www.youtube.com/channel/UCjioxN6gRm-o3SHBBlR6vhw">▶ VISIT CHANNEL</button></div>`
    },
    github: {
        title: 'GITHUB',
        content: `<div style="text-align:center;margin-bottom:22px;">
            <div style="width:70px;height:70px;border-radius:50%;background:#161b22;border:2px solid rgba(0,212,255,0.4);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg>
            </div>
            <h2 style="color:var(--bright);margin-bottom:4px;">Majenayu</h2>
            <p style="color:rgba(0,212,255,0.6);font-size:0.78rem;">@Majenayu</p></div>
            <div style="text-align:center;">
                <button class="panel-btn" data-url="https://github.com/Majenayu">VIEW PROFILE</button></div>`
    },
    linkedin: {
        title: 'LINKEDIN',
        content: `<div style="text-align:center;margin-bottom:22px;">
            <div style="width:70px;height:70px;border-radius:50%;background:#0077b5;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/></svg>
            </div>
            <h2 style="color:var(--bright);margin-bottom:4px;">P G Ayush Rai</h2>
            <p style="color:rgba(0,212,255,0.6);font-size:0.78rem;">linkedin.com/in/p-g-ayush-rai-8b90082a9</p></div>
            <div style="text-align:center;">
                <button class="panel-btn" data-url="https://www.linkedin.com/in/p-g-ayush-rai-8b90082a9/">CONNECT</button></div>`
    },
    contact: {
        title: 'CONTACT',
        content: `<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px;">
            <div style="display:flex;align-items:center;gap:14px;padding:14px;border:1px solid rgba(0,212,255,0.2);background:rgba(0,212,255,0.05);">
                <div style="width:40px;height:40px;border-radius:50%;background:rgba(0,212,255,0.15);border:1px solid var(--cyan);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--cyan)"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>
                </div>
                <div><div style="color:var(--bright);font-weight:bold;font-size:0.82rem;">EMAIL</div>
                <div style="color:rgba(0,212,255,0.7);font-size:0.76rem;">pgayushrai@gmail.com</div></div></div>
            <div style="display:flex;align-items:center;gap:14px;padding:14px;border:1px solid rgba(0,212,255,0.2);background:rgba(0,212,255,0.05);">
                <div style="width:40px;height:40px;border-radius:50%;background:rgba(0,255,136,0.1);border:1px solid var(--green);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--green)"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg>
                </div>
                <div><div style="color:var(--bright);font-weight:bold;font-size:0.82rem;">GITHUB</div>
                <div style="color:rgba(0,212,255,0.7);font-size:0.76rem;">github.com/Majenayu</div></div></div></div>
            <div style="text-align:center;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
                <button class="panel-btn" data-url="mailto:pgayushrai@gmail.com">SEND EMAIL</button>
                <button class="panel-btn" data-url="https://github.com/Majenayu">GITHUB</button>
                <button class="panel-btn" data-url="https://www.linkedin.com/in/p-g-ayush-rai-8b90082a9/">LINKEDIN</button></div>`
    },
    settings: {
        title: 'SETTINGS',
        content: `<div style="display:flex;flex-direction:column;gap:0;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(0,212,255,0.1);">
                <div><div style="font-size:0.82rem;color:var(--bright);">Lightning Effects</div>
                <div style="font-size:0.68rem;color:rgba(0,212,255,0.4);margin-top:2px;">Electric discharge on hover</div></div>
                <div class="toggle active" data-key="lightning" style="width:40px;height:20px;background:var(--green);border-radius:10px;position:relative;cursor:pointer;transition:background .3s;">
                    <div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;top:2px;right:2px;transition:right .3s;"></div></div></div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(0,212,255,0.1);">
                <div><div style="font-size:0.82rem;color:var(--bright);">Particle Network</div>
                <div style="font-size:0.68rem;color:rgba(0,212,255,0.4);margin-top:2px;">Background particle connections</div></div>
                <div class="toggle active" data-key="particles" style="width:40px;height:20px;background:var(--green);border-radius:10px;position:relative;cursor:pointer;transition:background .3s;">
                    <div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;top:2px;right:2px;transition:right .3s;"></div></div></div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(0,212,255,0.1);">
                <div><div style="font-size:0.82rem;color:var(--bright);">Coin Auto-Rotate</div>
                <div style="font-size:0.68rem;color:rgba(0,212,255,0.4);margin-top:2px;">Continuous 3D coin spin</div></div>
                <div class="toggle active" data-key="coinrotate" style="width:40px;height:20px;background:var(--green);border-radius:10px;position:relative;cursor:pointer;transition:background .3s;">
                    <div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;top:2px;right:2px;transition:right .3s;"></div></div></div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;">
                <div><div style="font-size:0.82rem;color:var(--bright);">Node Orbit</div>
                <div style="font-size:0.68rem;color:rgba(0,212,255,0.4);margin-top:2px;">Orbit ring animation</div></div>
                <div class="toggle active" data-key="nodeorbit" style="width:40px;height:20px;background:var(--green);border-radius:10px;position:relative;cursor:pointer;transition:background .3s;">
                    <div style="width:16px;height:16px;background:white;border-radius:50%;position:absolute;top:2px;right:2px;transition:right .3s;"></div></div></div></div>
        <div style="margin-top:16px;padding:8px;border:1px solid rgba(0,212,255,0.2);background:rgba(0,212,255,0.03);font-size:0.64rem;color:rgba(0,212,255,0.4);letter-spacing:0.08em;">
            CODEBREAKERS SYSTEM • USER: MAJEN • BUILD 2025</div>`
    }
};

// ════════════════════════════════════════════════════════════
//  PANEL DISPLAY SYSTEM
// ════════════════════════════════════════════════════════════
function showPanel(panelName) {
    const panel = panels[panelName];
    if (!panel) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = `position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.8);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;animation:fadeIn .3s ease;`;
    const panelDiv = document.createElement('div');
    panelDiv.style.cssText = `width:min(560px,90vw);max-height:80vh;overflow-y:auto;background:rgba(0,6,18,0.97);border:2px solid var(--cyan);backdrop-filter:blur(20px);box-shadow:0 0 40px rgba(0,212,255,0.3);animation:slideIn .4s ease;font-family:'Syne',sans-serif;border-radius:4px 4px 16px 4px;`;
    panelDiv.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 20px;border-bottom:1px solid rgba(0,212,255,0.3);background:rgba(0,212,255,0.05);">
            <h2 style="color:var(--bright);font-size:1.1rem;letter-spacing:0.1em;font-family:'Bebas Neue',sans-serif;">${panel.title}</h2>
            <button class="close-panel-btn" style="background:transparent;border:1px solid var(--cyan);color:var(--cyan);padding:6px 14px;cursor:pointer;font-size:0.75rem;font-family:'Space Mono',monospace;letter-spacing:.08em;">✕ CLOSE</button>
        </div>
        <div style="padding:22px;">${panel.content}</div>`;
    overlay.appendChild(panelDiv);
    overlay.className = 'panel-overlay';
    document.body.appendChild(overlay);
    panelDiv.querySelector('.close-panel-btn').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    // Settings toggles
    panelDiv.querySelectorAll('.toggle').forEach(tog => {
        tog.addEventListener('click', () => {
            const key  = tog.dataset.key;
            const isOn = tog.classList.toggle('active');
            tog.style.background = isOn ? 'var(--green)' : 'rgba(0,212,255,0.15)';
            tog.querySelector('div').style.right = isOn ? '2px' : '';
            tog.querySelector('div').style.left  = isOn ? '' : '2px';
            if (key === 'lightning')  { ltActive = false; clearInterval(ltInterval); ltCanvas.style.display = isOn ? '' : 'none'; }
            if (key === 'particles')  { bgCanvas.style.opacity = isOn ? '0.8' : '0'; }
            if (key === 'coinrotate') { document.getElementById('rotatingCoin').style.animationPlayState = isOn ? 'running' : 'paused'; }
            if (key === 'nodeorbit')  { document.querySelector('.menu-nodes').style.animationPlayState = isOn ? 'running' : 'paused'; }
        });
    });

    // URL buttons
    panelDiv.querySelectorAll('.panel-btn').forEach(btn => {
        btn.addEventListener('click', e => { const url = e.target.dataset.url; if (url) { if (url.startsWith('/')) window.location.href = url; else window.open(url,'_blank'); } });
    });
    jarvis.showNotification(`${panel.title} MODULE ACCESSED`);
}

// ════════════════════════════════════════════════════════════
//  COIN CLICK & NODE EVENTS
// ════════════════════════════════════════════════════════════
document.getElementById('rotatingCoin').addEventListener('click', () => {
    if (!jarvis.active) jarvis.activate();
});

document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('mouseenter', () => {
        if (!jarvis.active) return;
        const rect = node.getBoundingClientRect();
        const nx = rect.left + rect.width/2, ny = rect.top + rect.height/2;
        for (let i = 0; i < 2; i++) {
            setTimeout(() => { createLightning(nx+(Math.random()-0.5)*30, ny+(Math.random()-0.5)*30); }, i*100);
        }
    });
    node.addEventListener('click', e => {
        e.stopPropagation();
        if (!jarvis.active) return;
        const rect = node.getBoundingClientRect();
        const nx = rect.left + rect.width/2, ny = rect.top + rect.height/2;
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const a = (i/8)*Math.PI*2, rad = 55 + Math.random()*45;
                createLightning(nx + Math.cos(a)*rad, ny + Math.sin(a)*rad);
            }, i*45);
        }
        setTimeout(() => createLightning(nx,ny), 180);
        setTimeout(() => createLightning(nx,ny), 360);
        // Game node — open blaster directly
        if (node.dataset.action === 'game') {
            setTimeout(() => { if (window._openPortfolioGame) window._openPortfolioGame(); }, 420);
            return;
        }
        showPanel(node.dataset.panel);
    });
});

document.addEventListener('keydown', e => {
    if (e.code === 'Escape') { const p = document.querySelector('.panel-overlay'); if (p) p.remove(); }
    if (e.ctrlKey && e.code === 'KeyE') { e.preventDefault(); window.location.href = '/profile-editor.html'; }
    if (e.ctrlKey && e.code === 'KeyB') { e.preventDefault(); window.location.href = '/badge-register.html'; }
});

// ════════════════════════════════════════════════════════════
//  FRACTAL LIGHTNING ENGINE
// ════════════════════════════════════════════════════════════
const ltCanvas = document.createElement('canvas');
ltCanvas.style.cssText = 'position:fixed;inset:0;z-index:4;pointer-events:none;';
document.body.appendChild(ltCanvas);
const ltCtx = ltCanvas.getContext('2d');

function resizeLtCanvas() { ltCanvas.width = window.innerWidth; ltCanvas.height = window.innerHeight; }
resizeLtCanvas();
window.addEventListener('resize', resizeLtCanvas);

const activeBolts = [];

function fractalPath(x1,y1,x2,y2,roughness,minSegLen) {
    let points = [{x:x1,y:y1},{x:x2,y:y2}];
    for (let iter=0; iter<5; iter++) {
        const next=[];
        for (let i=0; i<points.length-1; i++) {
            const a=points[i], b=points[i+1];
            const mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
            const len=Math.hypot(b.x-a.x, b.y-a.y);
            if (len<minSegLen){ next.push(a); continue; }
            const nx=-(b.y-a.y)/len, ny=(b.x-a.x)/len;
            const disp=(Math.random()-0.5)*len*roughness;
            next.push(a,{x:mx+nx*disp, y:my+ny*disp});
        }
        next.push(points[points.length-1]);
        points=next; roughness*=0.62;
    }
    return points;
}
function buildBolt(sx,sy,tx,ty) {
    const roughness=0.55, minSeg=4;
    const mainPts=fractalPath(sx,sy,tx,ty,roughness,minSeg);
    const branches=[]; const bc=2+Math.floor(Math.random()*3);
    for (let b=0; b<bc; b++) {
        const startIdx=Math.floor(mainPts.length*(0.2+Math.random()*0.6));
        const origin=mainPts[startIdx];
        const mainAngle=Math.atan2(ty-sy,tx-sx);
        const side=Math.random()>0.5?1:-1;
        const divAngle=mainAngle+side*(0.52+Math.random()*0.6);
        const bLen=Math.hypot(tx-sx,ty-sy)*(0.18+Math.random()*0.28);
        branches.push({pts:fractalPath(origin.x,origin.y,origin.x+Math.cos(divAngle)*bLen,origin.y+Math.sin(divAngle)*bLen,roughness*0.8,minSeg)});
    }
    return {mainPts,branches};
}
function drawPath(pts,width,color,alpha) {
    if (pts.length<2) return;
    ltCtx.globalAlpha=alpha; ltCtx.lineWidth=width; ltCtx.strokeStyle=color;
    ltCtx.lineJoin='round'; ltCtx.lineCap='round';
    ltCtx.beginPath(); ltCtx.moveTo(pts[0].x,pts[0].y);
    for (let i=1; i<pts.length; i++) ltCtx.lineTo(pts[i].x,pts[i].y);
    ltCtx.stroke(); ltCtx.globalAlpha=1;
}
function renderBolt(bolt,phase,phaseT) {
    const {mainPts,branches}=bolt.structure; const n=mainPts.length;
    const end=Math.max(2,Math.floor(n*(phase===0?phaseT*0.7:1)));
    const vis=mainPts.slice(0,end);
    let outerA,midA,coreA,outerW=10,midW=3,coreW=1;
    if (phase===0) { outerA=0.06*phaseT; midA=0.20*phaseT; coreA=0.30*phaseT; }
    else if (phase===1) { const f=0.75+Math.random()*0.25; outerA=0.18*f; midA=0.65*f; coreA=f; outerW=14; midW=4; coreW=1.2; }
    else { const fade=1-phaseT,f=Math.random()>0.6?0.6:1; outerA=0.12*fade*f; midA=0.45*fade*f; coreA=0.8*fade*f; }
    function dc(pts,ws,as) {
        drawPath(pts,outerW*ws,'rgba(255,20,80,1)',outerA*as);
        drawPath(pts,midW*ws,'rgba(255,80,160,1)',midA*as);
        drawPath(pts,coreW*ws,'#ffffff',coreA*as);
    }
    dc(vis,1,1);
    if (phase>=1) branches.forEach(br=>{ dc(br.pts,0.5,0.6*(phase===2?Math.max(0,1-phaseT):1)); });
}

let lastLtFrame=0;
function lightningLoop(ts) {
    requestAnimationFrame(lightningLoop);
    if (!activeBolts.length) return;
    if (ts-lastLtFrame<24) return; lastLtFrame=ts;
    ltCtx.clearRect(0,0,ltCanvas.width,ltCanvas.height);
    const LEADER=100,STRIKE=150,GLOW=250,TOTAL=LEADER+STRIKE+GLOW;
    for (let i=activeBolts.length-1; i>=0; i--) {
        const bolt=activeBolts[i], age=ts-bolt.birth;
        if (age>TOTAL){ activeBolts.splice(i,1); continue; }
        let phase,phaseT;
        if (age<LEADER)              { phase=0; phaseT=age/LEADER; }
        else if (age<LEADER+STRIKE)  { phase=1; phaseT=(age-LEADER)/STRIKE; }
        else                         { phase=2; phaseT=(age-LEADER-STRIKE)/GLOW; }
        renderBolt(bolt,phase,phaseT);
    }
}
requestAnimationFrame(lightningLoop);

function createLightning(targetX,targetY) {
    if (activeBolts.length>=6) return;
    const coin=document.getElementById('rotatingCoin');
    const rect=coin.getBoundingClientRect();
    const cx=rect.left+rect.width/2, cy=rect.top+rect.height/2, r=rect.width/2;
    const angle=Math.atan2(targetY-cy,targetX-cx);
    activeBolts.push({structure:buildBolt(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,targetX,targetY),birth:performance.now()});
}

let mousePos={x:0,y:0}, ltInterval=null, ltActive=false;
document.addEventListener('mousemove', e => {
    if (!jarvis.active) return;
    mousePos={x:e.clientX,y:e.clientY};
    const coin=document.getElementById('rotatingCoin');
    const rect=coin.getBoundingClientRect();
    const cx=rect.left+rect.width/2, cy=rect.top+rect.height/2, r=rect.width/2;
    const dist=Math.hypot(e.clientX-cx,e.clientY-cy);
    const inZone=dist>r+15&&dist<420;
    if (inZone) {
        if (Math.random()>0.88) createLightning(e.clientX,e.clientY);
        if (!ltActive) {
            ltActive=true;
            ltInterval=setInterval(()=>{ createLightning(mousePos.x+(Math.random()-0.5)*10,mousePos.y+(Math.random()-0.5)*10); },220);
        }
    } else if (ltActive) { ltActive=false; clearInterval(ltInterval); ltInterval=null; }
});
document.addEventListener('mouseleave',()=>{ ltActive=false; clearInterval(ltInterval); ltInterval=null; });

// ════════════════════════════════════════════════════════════
//  MODAL HELPERS
// ════════════════════════════════════════════════════════════
window.openModal  = id => { const m=document.getElementById(id); if(m) m.style.display='flex'; };
window.closeModal = id => { const m=document.getElementById(id); if(m) m.style.display='none'; };
document.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) e.target.style.display='none';
});

// ════════════════════════════════════════════════════════════
//  ACHIEVEMENT SLIDESHOW STATE
// ════════════════════════════════════════════════════════════
let achievements=[], courses=[];
let curAchieve=0, curPhoto=0;
let photoTimer=null, achieveTimer=null, userPaused=false;
const PHOTO_INTERVAL=5000, ACHIEVE_INTERVAL=5000;

const stopAll=()=>{ clearInterval(photoTimer); clearTimeout(achieveTimer); photoTimer=achieveTimer=null; };
const priorityColors={ high:'rgba(255,77,109,0.9)', medium:'rgba(0,240,255,0.8)', low:'rgba(79,96,128,0.8)' };
const priorityFg    ={ high:'#fff', medium:'#020810', low:'#fff' };

function notify(msg, ok=true) {
    const n=document.createElement('div');
    n.style.cssText=`position:fixed;top:20px;right:20px;z-index:9999;
        background:rgba(2,8,16,0.95);border:1px solid ${ok?'#00ff88':'#ff4d6d'};
        color:${ok?'#00ff88':'#ff4d6d'};padding:10px 18px;
        font-family:'Space Mono',monospace;font-size:0.75rem;letter-spacing:0.06em;
        border-radius:4px;animation:slideInRight 0.3s ease;`;
    n.textContent=msg;
    document.body.appendChild(n);
    setTimeout(()=>n.remove(),3500);
}

function showAchievement(idx,resetPhoto=true) {
    if(!achievements.length) return;
    curAchieve=((idx%achievements.length)+achievements.length)%achievements.length;
    const ss=document.getElementById('achievementSlideshow');
    if(ss) ss.style.transform=`translateX(-${curAchieve*100}%)`;
    updateAchieveIndicators();
    if(resetPhoto){ curPhoto=0; syncPhoto(curAchieve,0); }
}
window.addEventListener('resize',()=>{ if(achievements.length) showAchievement(curAchieve,false); });

function showPhoto(achIdx,pIdx) {
    const ach=achievements[achIdx]; if(!ach||!ach.photos?.length) return;
    curPhoto=((pIdx%ach.photos.length)+ach.photos.length)%ach.photos.length;
    syncPhoto(achIdx,curPhoto);
}
function syncPhoto(achIdx,pIdx) {
    const photos=achievements[achIdx]?.photos||[]; if(!photos.length) return;
    const img=document.getElementById(`mainPhoto_${achIdx}`); if(img) img.src=photos[pIdx];
    const ctr=document.getElementById(`photoCounter_${achIdx}`); if(ctr) ctr.textContent=`${pIdx+1} / ${photos.length}`;
}
function startAutoSlide() {
    stopAll(); if(userPaused||!achievements.length) return;
    const photoCount=achievements[curAchieve]?.photos?.length||0;
    if(photoCount>1) {
        photoTimer=setInterval(()=>{
            if(userPaused){ stopAll(); return; }
            const next=curPhoto+1;
            if(next>=photoCount){ clearInterval(photoTimer); photoTimer=null; achieveTimer=setTimeout(()=>{ if(!userPaused){ showAchievement(curAchieve+1); startAutoSlide(); }},800); }
            else showPhoto(curAchieve,next);
        },PHOTO_INTERVAL);
    } else {
        achieveTimer=setTimeout(()=>{ if(!userPaused){ showAchievement(curAchieve+1); startAutoSlide(); }},ACHIEVE_INTERVAL);
    }
}
function pauseAutoSlide() {
    userPaused=true; stopAll();
    clearTimeout(window._resumeT);
    window._resumeT=setTimeout(()=>{ userPaused=false; startAutoSlide(); },30000);
}
window.changeSlide = dir       => { pauseAutoSlide(); showAchievement(curAchieve+dir); };
window.goToSlide   = i         => { pauseAutoSlide(); showAchievement(i); };
window.changePhoto = (idx,dir) => { pauseAutoSlide(); showPhoto(idx,curPhoto+dir); };
window.goToPhoto   = (idx,i)   => { pauseAutoSlide(); showPhoto(idx,i); };

function updateAchieveIndicators() {
    const el=document.getElementById('slideIndicators'); if(!el) return;
    el.innerHTML=''; achievements.forEach((_,i)=>{ const d=document.createElement('div'); d.className='indicator'+(i===curAchieve?' active':''); d.onclick=()=>goToSlide(i); el.appendChild(d); });
}

// ════════════════════════════════════════════════════════════
//  BUILD ACHIEVEMENT SLIDES
// ════════════════════════════════════════════════════════════
function displayAchievements(data) {
    achievements=data;
    const ss=document.getElementById('achievementSlideshow'); if(!ss) return;
    ss.innerHTML='';
    if(!achievements.length) {
        ss.innerHTML=`<div class="slide empty-slide"><div style="text-align:center;color:var(--muted);">
            <p style="font-family:var(--mono);font-size:.68rem;margin-bottom:12px;letter-spacing:.08em;">NO ACHIEVEMENTS YET</p>
            <a href="/register.html" style="color:var(--accent);text-decoration:none;font-family:var(--mono);font-size:.62rem;padding:6px 14px;border:1px solid rgba(0,240,255,.25);">+ ADD ACHIEVEMENT</a>
        </div></div>`;
        return;
    }
    achievements.forEach((ach,idx)=>{
        const photos=ach.photos||[];
        const dateStr=ach.date?new Date(ach.date).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}):'';
        let photoHTML;
        if(photos.length) {
            const dots=photos.length>1?`<p id="photoCounter_${idx}" class="photo-counter">1 / ${photos.length}</p>`:'';
            photoHTML=`<div class="photo-frame">
                <img id="mainPhoto_${idx}" src="${photos[0]}" alt="photo" class="main-photo" onclick="openFullPhoto(${idx})" onerror="this.style.opacity='.1'">
            </div>${dots}`;
        } else { photoHTML=`<div class="no-photo-box">📷 NO PHOTOS</div>`; }
        const slide=document.createElement('div'); slide.className='slide';
        slide.innerHTML=`<div class="slide-inner">
            <div class="slide-header">
                <h2 class="slide-title">${ach.eventName}</h2>
                <div class="slide-header-right">
                    ${dateStr?`<span class="slide-header-date">${dateStr}</span>`:''}
                    ${ach.priority?`<span class="priority-badge" style="background:${priorityColors[ach.priority]};color:${priorityFg[ach.priority]};">${ach.priority.toUpperCase()}</span>`:''}
                </div>
            </div>
            <div class="slide-photo-area">${photoHTML}</div>
            <div class="slide-footer">
                <div class="place-badge">🏆 ${ach.place}</div>
                ${ach.description?`<p class="slide-description">${ach.description}</p>`:''}
            </div>
            <div class="slide-counter">${idx+1} / ${achievements.length}</div>
        </div>`;
        ss.appendChild(slide);
        ;(function(slideEl,achIdx){
            const pa=slideEl.querySelector('.slide-photo-area'); if(!pa) return;
            pa.addEventListener('click', e=>{
                if(e.target.closest('.main-photo')){ openFullPhoto(achIdx); return; }
                const rect=pa.getBoundingClientRect(), goLeft=e.clientX<rect.left+rect.width/2;
                pauseAutoSlide();
                const ph=achievements[achIdx]?.photos||[];
                if(ph.length>1){ const nextP=goLeft?curPhoto-1:curPhoto+1; if(nextP<0||nextP>=ph.length) showAchievement(curAchieve+(goLeft?-1:1)); else showPhoto(achIdx,nextP); }
                else showAchievement(curAchieve+(goLeft?-1:1));
            });
            pa.addEventListener('dblclick',e=>{ const rect=pa.getBoundingClientRect(),goLeft=e.clientX<rect.left+rect.width/2; pauseAutoSlide(); showAchievement(curAchieve+(goLeft?-1:1)); });
        })(slide,idx);
    });
    curAchieve=0; curPhoto=0;
    requestAnimationFrame(()=>{ showAchievement(0); updateAchieveIndicators(); startAutoSlide(); });
    const el=document.getElementById('totalAchievements'); if(el) el.textContent=achievements.length;
}

window.openFullPhoto=function(achIdx) {
    const url=achievements[achIdx]?.photos?.[curPhoto]; if(!url) return;
    const ov=document.createElement('div');
    ov.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.97);display:flex;align-items:center;justify-content:center;z-index:10000;cursor:zoom-out;`;
    ov.innerHTML=`<img src="${url}" style="max-width:94vw;max-height:92vh;object-fit:contain;border-radius:4px;box-shadow:0 24px 80px rgba(0,0,0,0.9);pointer-events:none;">
        <button onclick="event.stopPropagation();this.parentElement.remove()" style="position:fixed;top:16px;right:22px;background:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:1.5rem;width:38px;height:38px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;">&times;</button>`;
    ov.onclick=()=>ov.remove(); document.body.appendChild(ov);
};
window.openEditAchievement=id=>{ window.location.href='/register.html?edit=achievement&id='+id; };

// ════════════════════════════════════════════════════════════
//  ACHIEVEMENT FORM SUBMIT
// ════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded',()=>{
    const af=document.getElementById('achievementForm');
    if(af) af.addEventListener('submit', async e=>{
        e.preventDefault();
        const fd=new FormData();
        fd.append('eventName',document.getElementById('eventName').value.trim());
        fd.append('place',document.getElementById('place').value.trim());
        fd.append('description',document.getElementById('achievementDescription').value.trim());
        fd.append('priority',document.getElementById('priority').value);
        const photos=document.getElementById('photos').files;
        for(const f of photos) fd.append('photos',f);
        try {
            const r=await fetch('/api/achievements',{method:'POST',body:fd});
            const d=await r.json();
            if(d._id||d.eventName){ notify('✓ Achievement added!'); closeModal('achievementModal'); af.reset(); loadPortfolioData(); }
            else notify('Error: '+(d.error||'Failed'),'');
        } catch(err){ notify('Network error',''); }
    });

    const cf=document.getElementById('courseForm');
    if(cf) cf.addEventListener('submit', async e=>{
        e.preventDefault();
        const fd=new FormData();
        fd.append('courseName',document.getElementById('courseName').value.trim());
        fd.append('description',document.getElementById('courseDescription').value.trim());
        fd.append('priority',document.getElementById('coursePriority').value);
        fd.append('rank',document.getElementById('courseRank').value||'0');
        const cert=document.getElementById('certificate').files[0];
        if(cert) fd.append('certificate',cert);
        try {
            const r=await fetch('/api/courses',{method:'POST',body:fd});
            const d=await r.json();
            if(d._id||d.courseName){ notify('✓ Course added!'); closeModal('courseModal'); cf.reset(); loadPortfolioData(); }
            else notify('Error: '+(d.error||'Failed'),'');
        } catch(err){ notify('Network error',''); }
    });
});

// ════════════════════════════════════════════════════════════
//  BUILD COURSES LIST
// ════════════════════════════════════════════════════════════
function displayCourses(data) {
    courses=data;
    const list=document.getElementById('coursesList'); if(!list) return;
    list.innerHTML='';
    if(!courses.length) {
        list.innerHTML=`<div style="text-align:center;padding:24px 8px;color:var(--muted);">
            <p style="margin-bottom:8px;font-family:var(--mono);font-size:.6rem;letter-spacing:.08em;">NO COURSES YET</p>
            <a href="/register.html?tab=course" style="color:var(--accent);text-decoration:none;font-family:var(--mono);font-size:.58rem;border:1px solid rgba(0,240,255,.2);padding:5px 12px;">ADD FIRST COURSE</a>
        </div>`;
        return;
    }
    const sorted=[...courses].sort((a,b)=>{ if(a.rank&&b.rank) return a.rank-b.rank; if(a.rank) return -1; if(b.rank) return 1; return 0; });
    sorted.forEach((course,displayIdx)=>{
        const rankNum=course.rank||(displayIdx+1);
        const item=document.createElement('div'); item.className='course-item';
        const preview=course.description.length>80?course.description.substring(0,80)+'…':course.description;
        const date=course.completionDate?new Date(course.completionDate).toLocaleDateString('en-US',{year:'numeric',month:'short'}):'';
        const pc=priorityColors[course.priority]||'rgba(79,96,128,0.8)';
        const pf=priorityFg[course.priority]||'#fff';
        item.innerHTML=`
            <div class="course-rank">${rankNum}</div>
            <div class="course-content">
                <div class="course-top-row">
                    <h4>${course.courseName}</h4>
                    <div class="course-badges">
                        ${course.priority?`<span class="priority-badge" style="background:${pc};color:${pf};font-size:.48rem;">${course.priority.toUpperCase()}</span>`:''}
                    </div>
                </div>
                <p class="course-preview">${preview}</p>
                ${date?`<p class="course-date">${date}</p>`:''}
                <div class="course-details">
                    <p style="color:var(--p-text);font-family:var(--body);font-size:.78rem;line-height:1.55;margin-bottom:8px;">${course.description}</p>
                    ${course.certificate?`<a href="${course.certificate}" target="_blank" style="color:var(--accent);font-family:var(--mono);font-size:.62rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;">📜 VIEW CERTIFICATE →</a>`:''}
                </div>
            </div>`;
        item.addEventListener('click',e=>{ document.querySelectorAll('.course-item.expanded').forEach(el=>{ if(el!==item) el.classList.remove('expanded'); }); item.classList.toggle('expanded'); });
        item.addEventListener('dblclick',e=>{ if(course.certificate) window.open(course.certificate,'_blank'); });
        list.appendChild(item);
    });
    const el=document.getElementById('totalCourses'); if(el) el.textContent=courses.length;
}

window.openEditCourse=id=>{ window.location.href='/register.html?edit=course&id='+id; };

// ════════════════════════════════════════════════════════════
//  BADGE TUBE (profile panel)
// ════════════════════════════════════════════════════════════
const PALETTE=[
    ['#f7c948','#e69b00'],['#00f0ff','#0088cc'],['#a855f7','#7c3aed'],
    ['#4ade80','#16a34a'],['#f97316','#c2410c'],['#facc15','#ca8a04'],
    ['#38bdf8','#0284c7'],['#fb7185','#e11d48'],['#34d399','#059669'],['#f472b6','#db2777']
];
const DEFAULT_BADGES=[
    {_id:'d1',title:'Hackathon Winner',  desc:'1st place at a national-level hackathon with an AI solution.',tag:'National · AI',emoji:'🏆',color:'#f7c948',imgUrl:''},
    {_id:'d2',title:'Academic Excellence',desc:'Top academic performance across engineering curriculum.',   tag:'Academics',   emoji:'⭐',color:'#00f0ff',imgUrl:''},
    {_id:'d3',title:'Open Source',        desc:'Active contributions to multiple GitHub repositories.',     tag:'GitHub · Dev', emoji:'🚀',color:'#a855f7',imgUrl:''},
    {_id:'d4',title:'Certified Dev',      desc:'Industry-recognised cloud & development certifications.',   tag:'Certification',emoji:'🎓',color:'#4ade80',imgUrl:''},
    {_id:'d5',title:'Coding Olympiad',    desc:'Top-tier rank in national competitive programming.',        tag:'Competitive',  emoji:'🏅',color:'#f97316',imgUrl:''},
];

async function fetchBadges() {
    try { const r=await fetch('/api/badges'); const d=await r.json(); return (d.success&&d.badges.length)?d.badges:DEFAULT_BADGES; }
    catch(e){ return DEFAULT_BADGES; }
}

function buildBalls(badges) {
    const shaft=document.getElementById('shaft'); if(!shaft) return;
    shaft.innerHTML='';
    const card=document.getElementById('card'), hint=document.getElementById('hint');
    const cimg=document.getElementById('cimg'), ct=document.getElementById('ct');
    const cd=document.getElementById('cd'),   ctag=document.getElementById('ctag');

    badges.forEach((a,i)=>{
        const col=a.color?[a.color,a.color+'bb']:PALETTE[i%PALETTE.length];
        const c0=Array.isArray(col)?col[0]:col, c1=Array.isArray(col)?col[1]:col+'bb';
        const b=document.createElement('div'); b.className='vball';
        b.style.animationDelay=i*90+'ms';
        b.style.background=`radial-gradient(circle at 35% 30%,rgba(255,255,255,.3) 0%,transparent 50%),radial-gradient(circle at 65% 70%,${c0}55 0%,transparent 60%),linear-gradient(135deg,${c0},${c1})`;
        b.style.boxShadow=`0 0 10px ${c0}80,inset 0 -5px 10px rgba(0,0,0,.3),inset 0 5px 7px rgba(255,255,255,.2)`;
        const be=document.createElement('div'); be.className='be';
        if(a.imgUrl||a.imageUrl){ const im=document.createElement('img'); im.src=a.imgUrl||a.imageUrl; im.alt=''; be.appendChild(im); }
        else { be.textContent=a.emoji||'🏅'; }
        const bs=document.createElement('div'); bs.className='bs';
        b.appendChild(bs); b.appendChild(be); shaft.appendChild(b);
        
        // Add tooltip functionality
        let tooltip = null;
        b.addEventListener('mouseenter', () => {
            // Create tooltip
            tooltip = document.createElement('div');
            tooltip.className = 'badge-tooltip';
            tooltip.innerHTML = `
                <div class="badge-tooltip-title">${a.title}</div>
                <div class="badge-tooltip-desc">${a.desc || 'No description available'}</div>
                <div class="badge-tooltip-tag">${a.tag || 'Achievement'}</div>
            `;
            document.body.appendChild(tooltip);
            
            // Position tooltip above the badge
            const rect = b.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            const top = rect.top - tooltipRect.height - 12;
            
            tooltip.style.left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10)) + 'px';
            tooltip.style.top = Math.max(10, top) + 'px';
            
            // Show tooltip with animation
            setTimeout(() => tooltip.classList.add('show'), 10);
        });
        
        b.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                    tooltip = null;
                }, 300);
            }
        });
        
        b.addEventListener('click',()=>{
            cimg.innerHTML='';
            if(a.imgUrl||a.imageUrl){ const im=document.createElement('img'); im.src=a.imgUrl||a.imageUrl; cimg.appendChild(im); }
            else { cimg.textContent=a.emoji||'🏅'; }
            cimg.style.borderColor=c0+'44'; cimg.style.background=c0+'18';
            ct.textContent=a.title; cd.textContent=a.desc;
            ctag.textContent=a.tag||'Achievement';
            ctag.style.color=c0; ctag.style.borderColor=c0+'55'; ctag.style.background=c0+'11';
            card.style.borderColor=c0+'44'; card.classList.add('show');
            if(hint) hint.style.display='none';
            document.querySelectorAll('.vball').forEach(x=>x.style.filter='brightness(.5)');
            b.style.filter='brightness(1.3)';
        });
    });
    document.addEventListener('click',e=>{ if(!e.target.closest('.vball')&&!e.target.closest('#card')){ if(card) card.classList.remove('show'); if(hint) hint.style.display=''; document.querySelectorAll('.vball').forEach(x=>x.style.filter=''); }});
    setInterval(()=>{ const t=Date.now()/1000; document.querySelectorAll('.vball').forEach((b,i)=>{ b.style.marginLeft=Math.sin(t*1.1+i*1.3)*1.4+'px'; }); },50);
}

// ════════════════════════════════════════════════════════════
//  PROFILE DATA LOADING
// ════════════════════════════════════════════════════════════
const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDgiIGZpbGw9InVybCgjZ3JhZGllbnQpIiBzdHJva2U9IiMwMGYwZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjgiLz48cGF0aCBkPSJNMzAgNzBjMC0xMSA5LTIwIDIwLTIwczIwIDkgMjAgMjAiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuOCIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMGYwZmYiIHN0b3Atb3BhY2l0eT0iMC4yIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjN2MzYWVkIiBzdG9wLW9wYWNpdHk9IjAuMiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==';

async function loadProfileData() {
    try {
        console.log('Loading profile data...');
        const r=await fetch('/api/profile'); 
        console.log('Profile API response status:', r.status);
        const d=await r.json();
        console.log('Profile data:', d);
        
        if(d.success&&d.profile) {
            const p=d.profile;
            const nameEl=document.getElementById('profileName');
            const titleEl=document.getElementById('profileTitle');
            const aboutEl=document.getElementById('profileAbout');
            const charEl=document.getElementById('profileCharImg');
            const chipStatus=document.getElementById('chipStatus');
            const chipLocation=document.getElementById('chipLocation');
            const chipEdu=document.getElementById('chipEdu');
            
            // Update text content
            if(nameEl)  nameEl.textContent=p.fullName||'P G AYUSH RAI';
            if(titleEl) titleEl.textContent=p.title||'B.Tech · Developer · Builder';
            if(aboutEl) aboutEl.innerHTML=`<strong>${p.fullName||'P G Ayush Rai'}</strong> — ${p.description||'technologist &amp; builder.'}`;
            
            // Character image handling - NEVER change the animation in index.html
            if(charEl) {
                console.log('Preserving fixed Anirive animation in index.html');
                // Don't touch the character image - it's fixed in the HTML
            }
            
            // Update status chips
            const statusTexts={open:'● Open to Opportunities',busy:'⚡ Currently Busy',available:'✓ Available for Projects',learning:'📚 Learning & Growing'};
            if(chipStatus)   chipStatus.textContent=statusTexts[p.status]||'● Open to Opportunities';
            if(chipLocation) chipLocation.textContent=`📍 ${p.location||'India'}`;
            if(chipEdu)      chipEdu.textContent=`🚀 ${p.education||'B.Tech'}`;
        } else {
            console.log('No profile data found, keeping defaults');
        }
    } catch(e){ 
        console.error('Profile loading error:', e);
    }
}

// ════════════════════════════════════════════════════════════
//  PORTFOLIO DATA LOADING (achievements + courses)
// ════════════════════════════════════════════════════════════
async function loadPortfolioData() {
    try {
        const [aRes,cRes]=await Promise.all([fetch('/api/achievements'),fetch('/api/courses')]);
        if(aRes.ok) displayAchievements(await aRes.json());
        if(cRes.ok) displayCourses(await cRes.json());
    } catch(e){ console.error('Portfolio load error:',e); }
}

// ════════════════════════════════════════════════════════════
//  THEME TOGGLE
// ════════════════════════════════════════════════════════════
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button text
    const themeBtn = document.querySelector('[onclick="toggleTheme()"]');
    if (themeBtn) {
        themeBtn.innerHTML = newTheme === 'light' ? '🌙 Dark' : '☀️ Light';
    }
    
    console.log('Theme switched to:', newTheme);
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update button text
    const themeBtn = document.querySelector('[onclick="toggleTheme()"]');
    if (themeBtn) {
        themeBtn.innerHTML = savedTheme === 'light' ? '🌙 Dark' : '☀️ Light';
    }
}

// ════════════════════════════════════════════════════════════
//  BOOT
// ════════════════════════════════════════════════════════════
loadTheme(); // Load theme first
initInterface();
loadProfileData(); // Auto-load profile data but never touch the animation
loadPortfolioData();
fetchBadges().then(buildBalls);




// ════════════════════════════════════════════════════════════
//  TECH BRAND COLOURS
// ════════════════════════════════════════════════════════════
const TECH_COLORS = {
  'HTML':           { bg:'rgba(228,77,38,0.15)',   border:'#e44d26', color:'#e44d26' },
  'CSS':            { bg:'rgba(38,77,228,0.15)',    border:'#264de4', color:'#4a90f5' },
  'JavaScript':     { bg:'rgba(247,223,30,0.15)',   border:'#f7df1e', color:'#f7df1e' },
  'TypeScript':     { bg:'rgba(49,120,198,0.15)',   border:'#3178c6', color:'#5b9bd5' },
  'React':          { bg:'rgba(97,218,251,0.15)',   border:'#61dafb', color:'#61dafb' },
  'Vue.js':         { bg:'rgba(65,184,131,0.15)',   border:'#41b883', color:'#41b883' },
  'Angular':        { bg:'rgba(221,0,49,0.15)',     border:'#dd0031', color:'#ff4d6d' },
  'Svelte':         { bg:'rgba(255,62,0,0.15)',     border:'#ff3e00', color:'#ff6a3d' },
  'Next.js':        { bg:'rgba(255,255,255,0.06)',  border:'#aaa',    color:'#ddd'    },
  'Nuxt.js':        { bg:'rgba(0,220,130,0.15)',    border:'#00dc82', color:'#00dc82' },
  'Gatsby':         { bg:'rgba(102,51,153,0.15)',   border:'#663399', color:'#a855f7' },
  'jQuery':         { bg:'rgba(0,100,163,0.15)',    border:'#0064a3', color:'#0090d4' },
  'Bootstrap':      { bg:'rgba(121,82,179,0.15)',   border:'#7952b3', color:'#a87aff' },
  'Tailwind CSS':   { bg:'rgba(56,189,248,0.15)',   border:'#38bdf8', color:'#38bdf8' },
  'Sass':           { bg:'rgba(207,100,154,0.15)',  border:'#cf6499', color:'#cf6499' },
  'Webpack':        { bg:'rgba(142,214,251,0.15)',  border:'#8ed6fb', color:'#8ed6fb' },
  'Vite':           { bg:'rgba(189,52,254,0.15)',   border:'#bd34fe', color:'#c757ff' },
  'Node.js':        { bg:'rgba(104,160,99,0.15)',   border:'#68a063', color:'#7ec97a' },
  'Express.js':     { bg:'rgba(200,200,200,0.08)',  border:'#888',    color:'#ccc'    },
  'Python':         { bg:'rgba(55,118,171,0.15)',   border:'#3776ab', color:'#5ba3d9' },
  'Django':         { bg:'rgba(9,128,76,0.15)',     border:'#09804c', color:'#0db860' },
  'Flask':          { bg:'rgba(200,200,200,0.08)',  border:'#999',    color:'#ddd'    },
  'FastAPI':        { bg:'rgba(5,150,105,0.15)',    border:'#059669', color:'#34d399' },
  'Java':           { bg:'rgba(234,50,35,0.15)',    border:'#ea3223', color:'#f86b5f' },
  'Spring Boot':    { bg:'rgba(109,179,63,0.15)',   border:'#6db33f', color:'#7ecf4a' },
  'PHP':            { bg:'rgba(119,123,180,0.15)',  border:'#777bb4', color:'#9999cc' },
  'Laravel':        { bg:'rgba(255,45,32,0.15)',    border:'#ff2d20', color:'#ff5a52' },
  'Ruby':           { bg:'rgba(204,52,45,0.15)',    border:'#cc342d', color:'#e05a55' },
  'Ruby on Rails':  { bg:'rgba(204,52,45,0.15)',    border:'#cc342d', color:'#e05a55' },
  'C#':             { bg:'rgba(104,33,122,0.15)',   border:'#68217a', color:'#b073d1' },
  '.NET':           { bg:'rgba(81,43,212,0.15)',    border:'#512bd4', color:'#9b72ff' },
  'Go':             { bg:'rgba(0,173,216,0.15)',    border:'#00add8', color:'#00c8f8' },
  'Rust':           { bg:'rgba(222,165,132,0.15)',  border:'#dea584', color:'#dea584' },
  'Kotlin':         { bg:'rgba(127,82,255,0.15)',   border:'#7f52ff', color:'#a07fff' },
  'Scala':          { bg:'rgba(220,50,50,0.15)',    border:'#dc3232', color:'#f06060' },
  'MongoDB':        { bg:'rgba(71,162,72,0.15)',    border:'#47a248', color:'#5dc45e' },
  'MySQL':          { bg:'rgba(0,117,143,0.15)',    border:'#00758f', color:'#00a8c8' },
  'PostgreSQL':     { bg:'rgba(51,103,145,0.15)',   border:'#336791', color:'#4287c8' },
  'SQLite':         { bg:'rgba(68,121,161,0.15)',   border:'#44799f', color:'#5da0d0' },
  'Redis':          { bg:'rgba(220,49,49,0.15)',    border:'#dc3131', color:'#ff5555' },
  'Firebase':       { bg:'rgba(255,202,40,0.15)',   border:'#ffca28', color:'#ffca28' },
  'Supabase':       { bg:'rgba(62,207,142,0.15)',   border:'#3ecf8e', color:'#3ecf8e' },
  'DynamoDB':       { bg:'rgba(82,157,204,0.15)',   border:'#4a90d9', color:'#4a90d9' },
  'Elasticsearch':  { bg:'rgba(254,204,0,0.15)',    border:'#fecc00', color:'#fecc00' },
  'AWS':            { bg:'rgba(255,153,0,0.15)',    border:'#ff9900', color:'#ff9900' },
  'Google Cloud':   { bg:'rgba(66,133,244,0.15)',   border:'#4285f4', color:'#6aa3f5' },
  'Azure':          { bg:'rgba(0,137,214,0.15)',    border:'#0089d6', color:'#00a8ff' },
  'Docker':         { bg:'rgba(13,183,237,0.15)',   border:'#0db7ed', color:'#0db7ed' },
  'Kubernetes':     { bg:'rgba(50,108,229,0.15)',   border:'#326ce5', color:'#5b8fff' },
  'Terraform':      { bg:'rgba(95,42,211,0.15)',    border:'#5f2ad3', color:'#9b59ff' },
  'Vercel':         { bg:'rgba(200,200,200,0.08)',  border:'#888',    color:'#ddd'    },
  'Netlify':        { bg:'rgba(0,206,209,0.15)',    border:'#00ced1', color:'#00ced1' },
  'Nginx':          { bg:'rgba(0,153,0,0.15)',      border:'#009900', color:'#00cc00' },
  'React Native':   { bg:'rgba(97,218,251,0.15)',   border:'#61dafb', color:'#61dafb' },
  'Flutter':        { bg:'rgba(84,182,240,0.15)',   border:'#54b6f0', color:'#54b6f0' },
  'Swift':          { bg:'rgba(250,84,28,0.15)',    border:'#fa541c', color:'#ff7043' },
  'Ionic':          { bg:'rgba(59,130,246,0.15)',   border:'#3b82f6', color:'#60a5fa' },
  'Git':            { bg:'rgba(240,80,51,0.15)',    border:'#f05033', color:'#f05033' },
  'GraphQL':        { bg:'rgba(229,53,171,0.15)',   border:'#e535ab', color:'#e535ab' },
  'REST API':       { bg:'rgba(0,200,150,0.15)',    border:'#00c896', color:'#00c896' },
  'Figma':          { bg:'rgba(162,89,255,0.15)',   border:'#a259ff', color:'#a259ff' },
  'Postman':        { bg:'rgba(255,108,55,0.15)',   border:'#ff6c37', color:'#ff6c37' },
  'Jest':           { bg:'rgba(198,59,89,0.15)',    border:'#c63b59', color:'#e05577' },
  'Socket.io':      { bg:'rgba(200,200,200,0.08)',  border:'#888',    color:'#ccc'    },
  'WebRTC':         { bg:'rgba(0,175,240,0.15)',    border:'#00aff0', color:'#00aff0' },
  'OpenAI API':     { bg:'rgba(16,163,127,0.15)',   border:'#10a37f', color:'#10a37f' },
  'TensorFlow':     { bg:'rgba(255,110,0,0.15)',    border:'#ff6e00', color:'#ff8c33' },
  'PyTorch':        { bg:'rgba(238,76,44,0.15)',    border:'#ee4c2c', color:'#f07055' },
};

function getProjTechStyle(tech) {
  if (TECH_COLORS[tech]) return TECH_COLORS[tech];
  let hash = 0;
  for (let i = 0; i < tech.length; i++) hash = tech.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return { bg:`hsla(${hue},65%,50%,0.12)`, border:`hsl(${hue},65%,55%)`, color:`hsl(${hue},75%,68%)` };
}

// ════════════════════════════════════════════════════════════
//  TECH STACK BLASTER GAME
// ════════════════════════════════════════════════════════════
class TechGame {
  constructor(canvas, techStack, scoreId, levelId, livesId) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.W      = canvas.width;
    this.H      = canvas.height;
    this.tech   = (techStack && techStack.length) ? [...techStack] : ['HTML','CSS','JS','React'];
    this._sId   = scoreId  || 'projGameScore';
    this._lId   = levelId  || 'projGameLevel';
    this._liId  = livesId  || 'projGameLives';

    this.score = 0; this.level = 1; this.lives = 3;
    this.over  = false;
    this.bullets  = []; this.eBullets = []; this.enemies = []; this.fx = [];
    this.eDir  = 1; this.eSpeed = 0; this.dropStep = 18;
    this.lastFire = 0; this.fireRate = 2000;
    this.px    = this.W / 2; this.pCool = 0; this.pSpeed = 5;
    this.keys  = {};
    this._down = e => { this.keys[e.code] = true;  if (e.code==='Space') e.preventDefault(); };
    this._up   = e => { this.keys[e.code] = false; };
    window.addEventListener('keydown', this._down);
    window.addEventListener('keyup',   this._up);
    this._spawnLevel();
    this._updateHUD();
    this._raf  = null;
    this._tick = this._tick.bind(this);
    this._raf  = requestAnimationFrame(this._tick);
  }
  destroy() {
    window.removeEventListener('keydown', this._down);
    window.removeEventListener('keyup',   this._up);
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
  }
  _spawnLevel() {
    this.enemies = []; this.bullets = []; this.eBullets = [];
    const cols = Math.min(this.tech.length, 7);
    const rows = Math.ceil(this.tech.length / cols);
    const padX = 50; const cellW = (this.W - padX*2) / cols; const cellH = 40;
    let idx = 0;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols && idx < this.tech.length; c++, idx++) {
        const t = this.tech[idx]; const st = getProjTechStyle(t);
        this.enemies.push({ x: padX+c*cellW+cellW/2, y: 30+r*cellH, w: Math.min(cellW-6,80), h: 24, t, st, alive: true });
      }
    this.eDir   = 1;
    this.eSpeed = 0.45 + (this.level-1)*0.1;
    this.fireRate = Math.max(400, 2200-(this.level-1)*160);
  }
  _tick() { this._update(); this._draw(); this._raf = requestAnimationFrame(this._tick); }
  _update() {
    if (this.over) { if (this.keys['KeyR']) this._restart(); return; }
    if (this.keys['ArrowLeft']  || this.keys['KeyA']) this.px = Math.max(18, this.px - this.pSpeed);
    if (this.keys['ArrowRight'] || this.keys['KeyD']) this.px = Math.min(this.W-18, this.px + this.pSpeed);
    if ((this.keys['Space'] || this.keys['ArrowUp']) && this.pCool===0) {
      this.bullets.push({ x: this.px, y: this.H-52, vy: -11 }); this.pCool = 12;
    }
    if (this.pCool > 0) this.pCool--;
    const alive = this.enemies.filter(e => e.alive);
    if (!alive.length) { this.level++; this._spawnLevel(); this._updateHUD(); return; }
    let edgeHit = false;
    alive.forEach(e => { e.x += this.eDir * this.eSpeed; if (e.x+e.w/2>this.W-6||e.x-e.w/2<6) edgeHit=true; });
    if (edgeHit) { this.eDir *= -1; alive.forEach(e => e.y += this.dropStep); }
    const now = Date.now();
    if (now-this.lastFire > this.fireRate && alive.length) {
      const s = alive[Math.floor(Math.random()*alive.length)];
      this.eBullets.push({ x:s.x, y:s.y+s.h/2+2, vy:4.5+this.level*0.2 });
      this.lastFire = now;
    }
    this.bullets = this.bullets.filter(b => {
      b.y += b.vy; if (b.y<0) return false;
      for (const e of this.enemies) {
        if (!e.alive) continue;
        if (b.x>e.x-e.w/2 && b.x<e.x+e.w/2 && b.y>e.y-e.h/2 && b.y<e.y+e.h/2) {
          e.alive=false; this.score+=100*this.level; this._burst(e.x,e.y,e.st.color); this._updateHUD(); return false;
        }
      }
      return true;
    });
    const pTop=this.H-52, pBot=this.H-36;
    this.eBullets = this.eBullets.filter(b => {
      b.y += b.vy; if (b.y>this.H) return false;
      if (b.x>this.px-16 && b.x<this.px+16 && b.y>pTop && b.y<pBot) {
        this.lives--; this._burst(this.px,pTop+8,'#ff4d6d',16); this._updateHUD();
        if (this.lives<=0) this.over=true; return false;
      }
      return true;
    });
    this.enemies.forEach(e => { if (e.alive && e.y+e.h/2>pTop) this.over=true; });
    this.fx = this.fx.filter(p => { p.x+=p.vx; p.y+=p.vy; p.vy+=0.08; p.life--; return p.life>0; });
  }
  _restart() { this.score=0; this.lives=3; this.level=1; this.over=false; this.px=this.W/2; this.fx=[]; this._spawnLevel(); this._updateHUD(); }
  _burst(x,y,color,n=10) { for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=1+Math.random()*3; this.fx.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:22+Math.random()*12,color});} }
  _updateHUD() {
    const g = id => document.getElementById(id);
    const s=g(this._sId), l=g(this._lId), li=g(this._liId);
    if(s)  s.textContent  = String(this.score).padStart(6,'0');
    if(l)  l.textContent  = String(this.level).padStart(2,'0');
    if(li) li.textContent = this.lives>0 ? '♥ '.repeat(this.lives).trim() : '—';
  }
  _draw() {
    const {ctx,W,H} = this;
    ctx.fillStyle='#020810'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(0,212,255,0.2)';
    for(let i=0;i<55;i++) ctx.fillRect((i*139+5)%W,(i*97+13)%H,1,1);
    if (this.over) {
      ctx.save();
      ctx.fillStyle='rgba(255,77,109,0.08)'; ctx.fillRect(0,0,W,H);
      ctx.textAlign='center';
      ctx.fillStyle='#ff4d6d'; ctx.font='bold 26px monospace';
      ctx.shadowColor='#ff4d6d'; ctx.shadowBlur=18;
      ctx.fillText('GAME OVER',W/2,H/2-22); ctx.shadowBlur=0;
      ctx.fillStyle='#00d4ff'; ctx.font='13px monospace';
      ctx.fillText('SCORE  '+String(this.score).padStart(6,'0'),W/2,H/2+8);
      ctx.fillStyle='rgba(0,212,255,0.5)'; ctx.font='11px monospace';
      ctx.fillText('PRESS  R  TO  RESTART',W/2,H/2+32);
      ctx.restore(); return;
    }
    this.enemies.forEach(e => {
      if(!e.alive) return;
      ctx.save();
      ctx.fillStyle=e.st.bg; ctx.strokeStyle=e.st.border; ctx.lineWidth=1.5;
      this._rr(ctx,e.x-e.w/2,e.y-e.h/2,e.w,e.h,4); ctx.fill(); ctx.stroke();
      ctx.fillStyle=e.st.color; ctx.font='bold 8px monospace';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.shadowColor=e.st.color; ctx.shadowBlur=4;
      ctx.fillText(e.t.length>11?e.t.slice(0,10)+'…':e.t,e.x,e.y); ctx.restore();
    });
    const py=H-44;
    ctx.save(); ctx.fillStyle='#00f0ff'; ctx.shadowColor='#00f0ff'; ctx.shadowBlur=14;
    ctx.beginPath(); ctx.moveTo(this.px,py); ctx.lineTo(this.px+16,py+20);
    ctx.lineTo(this.px+7,py+15); ctx.lineTo(this.px-7,py+15); ctx.lineTo(this.px-16,py+20);
    ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.fillStyle='#00f0ff'; ctx.shadowColor='#00f0ff'; ctx.shadowBlur=7;
    this.bullets.forEach(b=>ctx.fillRect(b.x-2,b.y,4,12)); ctx.restore();
    ctx.save(); ctx.fillStyle='#ff4d6d'; ctx.shadowColor='#ff4d6d'; ctx.shadowBlur=7;
    this.eBullets.forEach(b=>ctx.fillRect(b.x-2,b.y,4,9)); ctx.restore();
    this.fx.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life/34);ctx.fillStyle=p.color;ctx.fillRect(p.x-2,p.y-2,4,4);});
    ctx.globalAlpha=1;
    ctx.strokeStyle='rgba(0,240,255,0.15)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(0,H-28); ctx.lineTo(W,H-28); ctx.stroke();
  }
  _rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
}

// ════════════════════════════════════════════════════════════
//  PROJECTS PANEL APP
// ════════════════════════════════════════════════════════════
(function () {
  'use strict';

  let projects   = [];
  let idx        = 0;
  let slideTimer = null;
  let paused     = false;
  let game       = null;
  let resumeT    = null;
  const SLIDE_MS  = 10000;
  const RESUME_MS = 4000;
  const $ = id => document.getElementById(id);

  // ── Boot ──
  function init() {
    setupListeners();
    loadProjects();
    startSlide();
  }

  // ── Auto-slide ──
  function startSlide() {
    if (slideTimer) clearInterval(slideTimer);
    slideTimer = setInterval(() => {
      if (!paused && !game && projects.length > 1) navigate(1);
    }, SLIDE_MS);
  }
  function userInteracted() {
    paused = true;
    if (resumeT) clearTimeout(resumeT);
    resumeT = setTimeout(() => { paused = false; }, RESUME_MS);
  }
  function forceResume() {
    if (resumeT) clearTimeout(resumeT);
    paused = false;
  }

  // ── Listeners ──
  function setupListeners() {
    const on = (id, ev, fn) => $(id)?.addEventListener(ev, fn);

    on('projGameBtn',       'click', openGame);
    on('projCloseGame',     'click', closeGame);

    // Drag / swipe on drag area
    const da = $('projDragArea');
    if (da) {
      da.addEventListener('mouseenter', userInteracted);
      let sx = 0, dragging = false;
      da.addEventListener('mousedown', e => {
        if (!e.target.closest('a,button')) { sx = e.clientX; dragging = true; }
        userInteracted();
      });
      window.addEventListener('mouseup', e => {
        if (!dragging) return; dragging = false;
        const dx = e.clientX - sx;
        if (Math.abs(dx) >= 40) {
          dx < 0 ? navigate(1) : navigate(-1);
          $('projDragHint')?.classList.add('hidden');
        }
      });
      da.addEventListener('touchstart', e => { sx = e.touches[0].clientX; dragging = true; userInteracted(); }, { passive: true });
      da.addEventListener('touchend',   e => {
        if (!dragging) return; dragging = false;
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) >= 40) dx < 0 ? navigate(1) : navigate(-1);
      }, { passive: true });
    }

    // Preview section hover pause
    $('projPreviewSection')?.addEventListener('mouseenter', userInteracted);

    // Keyboard — Alt+Arrow to avoid conflicting with JARVIS arrows
    document.addEventListener('keydown', e => {
      if ($('projGameConsole')?.style.display !== 'none') {
        if (e.code === 'Escape') { closeGame(); return; }
        return; // game eats other keys
      }
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.altKey && e.key === 'ArrowRight') { userInteracted(); navigate(1); }
      if (e.altKey && e.key === 'ArrowLeft')  { userInteracted(); navigate(-1); }
    });

    // Indicator dots click
    $('projDots')?.addEventListener('click', e => {
      const dot = e.target.closest('.proj-dot[data-i]');
      if (!dot) return;
      userInteracted();
      const newIdx = parseInt(dot.dataset.i);
      const dir = newIdx > idx ? 1 : -1;
      idx = newIdx;
      refresh(dir);
    });

    // Panel hover — pause while browsing
    $('projectsPanel')?.addEventListener('mouseenter', () => { paused = true; });
    $('projectsPanel')?.addEventListener('mouseleave', () => { paused = false; });
  }

  // ── Game ──
  function openGame() {
    const gc = $('projGameConsole');
    const cv = $('projGameCanvas');
    if (!gc || !cv) return;
    gc.style.display = 'flex';
    userInteracted();
    cv.width  = 520;
    cv.height = 340;
    const tech = projects[idx]?.techStack?.length
      ? projects[idx].techStack
      : ['HTML','CSS','JavaScript','React','Node.js'];
    if (game) { game.destroy(); game = null; }
    game = new TechGame(cv, tech, 'projGameScore', 'projGameLevel', 'projGameLives');
  }
  window._openPortfolioGame = openGame;  // expose for game node
  function closeGame() {
    if ($('projGameConsole')) $('projGameConsole').style.display = 'none';
    if (game) { game.destroy(); game = null; }
    forceResume();
  }

  // ── Data ──
  async function loadProjects() {
    try {
      const res  = await fetch('/api/projects');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      projects = Array.isArray(data) ? data : [];
      idx = 0;
      refresh(0);
      buildDots();
      startSlide();
    } catch (e) {
      console.error('[Projects] load error:', e);
      projects = [];
      renderEmpty();
    }
  }

  // ── Navigation ──
  window.changeProject = function (dir) {
    if (!projects.length) return;
    userInteracted(); navigate(dir);
  };

  function navigate(dir) {
    if (!projects.length) return;
    idx = ((idx + dir) % projects.length + projects.length) % projects.length;
    refresh(dir);
  }

  function refresh(dir = 0) {
    if (!projects.length) { renderEmpty(); buildDots(); return; }
    if (dir !== 0) {
      const da = $('projDragArea');
      if (da) {
        da.classList.remove('proj-anim-right','proj-anim-left');
        void da.offsetWidth;
        da.classList.add(dir > 0 ? 'proj-anim-right' : 'proj-anim-left');
      }
    }
    showProject(projects[idx]);
    buildDots();
    updateCount();
  }

  // ── Display project ──
  function showProject(p) {
    const g = id => $(id);

    if (g('projName')) g('projName').textContent = p.name || '—';
    if (g('projDesc')) g('projDesc').textContent = p.description || '—';


    // Links
    const wl = g('projWebLink'), gl = g('projGithubLink');
    if (wl) { if(p.website){wl.href=p.website;wl.style.display='';}else wl.style.display='none'; }
    if (gl) { if(p.github) {gl.href=p.github; gl.style.display='';}else gl.style.display='none'; }

    // Meta tags
    const metaEl = g('projMetaRow');
    if (metaEl) {
      metaEl.innerHTML = '';
      if (p.hardware) { const s=document.createElement('span');s.className='proj-meta-tag';s.textContent='⚙ '+p.hardware;metaEl.appendChild(s); }
      if (p.software) { const s=document.createElement('span');s.className='proj-meta-tag';s.textContent='◈ '+p.software;metaEl.appendChild(s); }
    }

    // Tech tags with brand colors
    const techEl = g('projTechTags');
    if (techEl) {
      techEl.innerHTML = '';
      (p.techStack||[]).forEach(t => {
        const st  = getProjTechStyle(t);
        const tag = document.createElement('span');
        tag.className = 'proj-tech-tag';
        tag.textContent = t;
        tag.style.cssText = `background:${st.bg};border-color:${st.border};color:${st.color}`;
        techEl.appendChild(tag);
      });
    }

    // Preview: iframe > image > placeholder
    const iframe = g('projWebsitePreview');
    const img    = g('projPreviewImg');
    const ph     = g('projPreviewPh');
    if (p.website) {
      if (iframe) { iframe.src = p.website; iframe.style.display = 'block'; }
      if (img)    img.style.display = 'none';
      if (ph)     ph.style.display  = 'none';
    } else if (p.previewImage) {
      if (iframe) { iframe.src = ''; iframe.style.display = 'none'; }
      if (img)    { img.src = p.previewImage; img.alt = p.name; img.style.display = 'block'; }
      if (ph)     ph.style.display = 'none';
    } else {
      if (iframe) { iframe.src = ''; iframe.style.display = 'none'; }
      if (img)    img.style.display = 'none';
      if (ph)     ph.style.display  = 'flex';
    }
  }

  // ── Empty state ──
  function renderEmpty() {
    if ($('projName')) $('projName').textContent = 'No Projects Yet';
    if ($('projDesc')) $('projDesc').textContent = 'Add your first project from the Dashboard.';
    ['projWebLink','projGithubLink'].forEach(id => { const el=$(id); if(el) el.style.display='none'; });
    const techEl = $('projTechTags'); if (techEl) techEl.innerHTML='';
    const metaEl = $('projMetaRow');  if (metaEl) metaEl.innerHTML='';
    if ($('projWebsitePreview')) { $('projWebsitePreview').src=''; $('projWebsitePreview').style.display='none'; }
    if ($('projPreviewImg'))  $('projPreviewImg').style.display  = 'none';
    if ($('projPreviewPh'))   $('projPreviewPh').style.display   = 'flex';
    updateCount();
  }

  // ── Dots ──
  function buildDots() {
    const c = $('projDots'); if (!c) return;
    c.innerHTML = '';
    projects.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'proj-dot' + (i===idx?' active':'');
      d.dataset.i = i;
      c.appendChild(d);
    });
  }

  function updateCount() {
    const el = $('projCount');
    if (!el) return;
    el.textContent = projects.length ? `${idx+1}/${projects.length}` : '0';
  }

  // ── Edit mode (removed — use Dashboard) ──

  // ── Delete ──
  async function confirmDelete(id, name) {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      const r = await fetch('/api/projects/'+id, { method:'DELETE' });
      if (r.ok) { notify('Project deleted', true); loadProjects(); }
      else      { const d=await r.json(); notify('Error: '+(d.error||'Failed'), false); }
    } catch(e) { notify('Network error', false); }
  }

  // ── Init ──
  init();
})();


// ════════════════════════════════════════════════════════════
//  EVENTS WIDGET — auto-rotates like achievements
// ════════════════════════════════════════════════════════════
(function () {
  'use strict';

  let evList = [], curEvt = 0, curPhoto = 0;
  let ewAutoTimer = null, ewProgressTimer = null;
  const EW_INTERVAL = 6000;   // ms between events (same feel as achievements)
  const EW_PHOTO_MS = 2500;   // ms between photos within an event
  let ewPhotoTimer  = null;
  const $$ = id => document.getElementById(id);

  // ── BOOT ─────────────────────────────────────────────────
  async function ewBoot() {
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error();
      evList = await res.json();
      if (!evList.length) return;
      $$('eventsWidget').style.display = 'flex';
      ewBuildSlides();
      ewBuildDots();
      // Double rAF: ensure layout is painted before measuring
      requestAnimationFrame(() => requestAnimationFrame(() => {
        ewResizeCarousel();
        ewShowEvent(0, false);
        ewStartAuto();
        window.addEventListener('resize', ewResizeCarousel);
      }));
    } catch (e) { /* no events — widget stays hidden */ }
  }

  // ── BUILD SLIDE DOM ───────────────────────────────────────
  function ewBuildSlides() {
    const track = $$('ewCarouselTrack');
    if (!track) return;
    track.innerHTML = '';
    evList.forEach((evt, ei) => {
      const slide = document.createElement('div');
      slide.className = 'ew-carousel-slide';
      slide.id = `ewCslide-${ei}`;
      if (evt.photos && evt.photos.length) {
        evt.photos.forEach((p, pi) => {
          const img = document.createElement('img');
          img.src = p; img.alt = evt.eventName || '';
          img.style.opacity = pi === 0 ? '1' : '0';
          img.style.transition = 'opacity .35s ease';
          slide.appendChild(img);
        });
      } else {
        slide.innerHTML = '<div class="no-photo-ph"><div class="icon">◈</div><div class="txt">No Photos</div></div>';
      }
      track.appendChild(slide);
    });
  }

  // ── PIXEL-BASED RESIZE ───────────────────────────────────
  function ewResizeCarousel() {
    const col   = $$('ewPhotoCol');
    const track = $$('ewCarouselTrack');
    if (!col || !track || !evList.length) return;
    const W = col.offsetWidth;
    if (!W) return;
    track.style.transition = 'none';
    track.style.width = `${evList.length * W}px`;
    document.querySelectorAll('.ew-carousel-slide').forEach(sl => { sl.style.width = `${W}px`; });
    track.style.transform = `translateX(${-curEvt * W}px)`;
    requestAnimationFrame(() => { track.style.transition = 'transform .55s cubic-bezier(0.4,0,0.2,1)'; });
  }

  // ── SHOW EVENT ───────────────────────────────────────────
  function ewShowEvent(idx, animate = true) {
    curEvt   = ((idx % evList.length) + evList.length) % evList.length;
    curPhoto = 0;
    const evt = evList[curEvt];

    // Move carousel
    const col = $$('ewPhotoCol');
    const W   = col ? col.offsetWidth : 0;
    const track = $$('ewCarouselTrack');
    if (track) track.style.transform = `translateX(${-curEvt * W}px)`;

    // Photo pips & arrows
    ewBuildPhotoStrip(evt);
    const multi = evt.photos && evt.photos.length > 1;
    const pl = $$('ewPhotoLeft');  if (pl) pl.style.display = multi ? '' : 'none';
    const pr = $$('ewPhotoRight'); if (pr) pr.style.display = multi ? '' : 'none';

    // Stamp & counter
    const stamp = $$('ewStamp');       if (stamp) stamp.textContent = String(curEvt + 1).padStart(2, '0');
    const pill  = $$('ewCounterPill'); if (pill)  pill.textContent  = `${curEvt + 1} / ${evList.length}`;

    // Dots
    document.querySelectorAll('.evt-dot').forEach((d, i) => d.classList.toggle('active', i === curEvt));

    // Fill info col with fade
    if (animate) {
      const ic = $$('ewInfoCol');
      if (ic) {
        ic.classList.add('fade-out');
        setTimeout(() => {
          ewFillInfo(evt);
          ic.classList.remove('fade-out');
          ic.classList.add('fade-in');
          setTimeout(() => ic.classList.remove('fade-in'), 300);
        }, 160);
      }
    } else {
      ewFillInfo(evt);
    }

    // Start auto-advancing photos within this event
    ewStartPhotoAuto(evt);
    ewResetProgress();
  }

  // ── FILL INFO COLUMN ─────────────────────────────────────
  function ewFillInfo(evt) {
    const date = evt.participatedDate
      ? new Date(evt.participatedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '—';

    const set = (id, val) => { const el = $$(id); if (el) el.textContent = val; };
    set('ewLabel',   'CodeBreakers · Event');
    set('ewName',    evt.eventName   || '—');
    set('ewTeamTag', evt.teamName    ? `🏷 ${evt.teamName}` : '');
    set('ewDesc',    evt.description || '—');

    const meta = $$('ewMeta');
    if (meta) {
      meta.innerHTML = `
        <span class="ew-chip hi">📅 ${date}</span>
        ${evt.photos?.length      ? `<span class="ew-chip">📷 ${evt.photos.length}</span>` : ''}
        ${evt.teamMembers?.length ? `<span class="ew-chip">👥 ${evt.teamMembers.length}</span>` : ''}`;
    }

    // Team members inline below description
    const ti = $$('ewTeamInline');
    if (ti) {
      const members = evt.teamMembers || [];
      if (members.length) {
        ti.innerHTML = `
          <div class="ew-team-inline-heading">Team</div>
          ${members.map(m => `
            <div class="ew-member-inline">
              <div class="ew-member-av">${(m.name||'?')[0].toUpperCase()}</div>
              <div class="ew-member-detail">
                <div class="ew-m-name">${esc(m.name)}</div>
                <div class="ew-m-role">${esc(m.role)}</div>
              </div>
            </div>`).join('')}`;
      } else {
        ti.innerHTML = '';
      }
    }

    // Project link
    const pl = $$('ewProjLink');
    if (pl) {
      if (evt.projectLink) { pl.href = evt.projectLink; pl.style.display = ''; }
      else pl.style.display = 'none';
    }

    // Scroll info col back to top on new event
    const scroll = $$('ewInfoCol')?.querySelector('.ew-info-scroll');
    if (scroll) scroll.scrollTop = 0;
  }

  // ── PHOTO PIPS ───────────────────────────────────────────
  function ewBuildPhotoStrip(evt) {
    const strip = $$('ewPhotoStrip');
    if (!strip) return;
    strip.innerHTML = '';
    if (!evt.photos || evt.photos.length <= 1) { strip.style.display = 'none'; return; }
    strip.style.display = 'flex';
    evt.photos.forEach((_, i) => {
      const pip = document.createElement('div');
      pip.className = 'photo-pip' + (i === 0 ? ' active' : '');
      pip.onclick = () => { clearInterval(ewPhotoTimer); ewShowPhoto(i); };
      strip.appendChild(pip);
    });
  }

  function ewShowPhoto(pi) {
    const evt = evList[curEvt];
    if (!evt || !evt.photos || !evt.photos.length) return;
    curPhoto = ((pi % evt.photos.length) + evt.photos.length) % evt.photos.length;
    const slide = document.getElementById(`ewCslide-${curEvt}`);
    if (slide) slide.querySelectorAll('img').forEach((img, i) => { img.style.opacity = i === curPhoto ? '1' : '0'; });
    document.querySelectorAll('#ewPhotoStrip .photo-pip').forEach((p, i) => p.classList.toggle('active', i === curPhoto));
  }

  // ── AUTO-ADVANCE PHOTOS within current event ──────────────
  function ewStartPhotoAuto(evt) {
    clearInterval(ewPhotoTimer);
    if (!evt.photos || evt.photos.length <= 1) return;
    ewPhotoTimer = setInterval(() => {
      ewShowPhoto(curPhoto + 1);
    }, EW_PHOTO_MS);
  }

  // ── DOTS ─────────────────────────────────────────────────
  function ewBuildDots() {
    const track = $$('ewDotTrack');
    if (!track) return;
    track.innerHTML = '';
    evList.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'evt-dot' + (i === 0 ? ' active' : '');
      // Click dot to jump to that event
      d.onclick = () => { ewStopAuto(); ewShowEvent(i); ewStartAuto(); };
      track.appendChild(d);
    });
  }

  // ── AUTO-ROTATE EVENTS (like achievements) ────────────────
  function ewStartAuto() {
    clearInterval(ewAutoTimer);
    ewAutoTimer = setInterval(() => ewShowEvent(curEvt + 1), EW_INTERVAL);
    ewResetProgress();
  }
  function ewStopAuto() {
    clearInterval(ewAutoTimer); ewAutoTimer = null;
    clearTimeout(ewProgressTimer);
    const bar = $$('ewProgressBar');
    if (bar) { bar.style.transition = 'none'; bar.style.width = '0%'; }
  }
  function ewResetProgress() {
    const bar = $$('ewProgressBar');
    if (!bar) return;
    bar.style.transition = 'none'; bar.style.width = '0%';
    clearTimeout(ewProgressTimer);
    ewProgressTimer = setTimeout(() => {
      bar.style.transition = `width ${EW_INTERVAL}ms linear`;
      bar.style.width = '100%';
    }, 30);
  }

  // ── DRAG INFO COL to manually jump ───────────────────────
  function ewSetupDrag() {
    const col = $$('ewInfoCol');
    if (!col) return;
    let sx = 0, dragging = false;
    col.addEventListener('mousedown', e => {
      if (e.target.closest('a,button,.ew-info-scroll')) return;
      sx = e.clientX; dragging = true;
    });
    window.addEventListener('mouseup', e => {
      if (!dragging) return; dragging = false;
      const dx = e.clientX - sx;
      if (Math.abs(dx) >= 36) { ewStopAuto(); dx < 0 ? ewShowEvent(curEvt + 1) : ewShowEvent(curEvt - 1); ewStartAuto(); }
    });
    col.addEventListener('touchstart', e => { sx = e.touches[0].clientX; dragging = true; }, { passive: true });
    col.addEventListener('touchend', e => {
      if (!dragging) return; dragging = false;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) >= 36) { ewStopAuto(); dx < 0 ? ewShowEvent(curEvt + 1) : ewShowEvent(curEvt - 1); ewStartAuto(); }
    }, { passive: true });
  }

  // ── HELPERS ──────────────────────────────────────────────
  function esc(s) {
    return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : '';
  }

  // ── PHOTO NAV (manual arrows still work) ─────────────────
  function ewBindPhotoArrows() {
    const bind = (id, fn) => { const el = $$(id); if (el) el.addEventListener('click', fn); };
    bind('ewPhotoLeft',  () => { clearInterval(ewPhotoTimer); ewShowPhoto(curPhoto - 1); });
    bind('ewPhotoRight', () => { clearInterval(ewPhotoTimer); ewShowPhoto(curPhoto + 1); });
  }

  // ── INIT ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    ewBindPhotoArrows();
    ewSetupDrag();
    ewBoot();
  });

  // ── JARVIS PANEL ENTRY ───────────────────────────────────
  if (typeof panels !== 'undefined') {
    panels.events = {
      title: 'EVENTS',
      content: `<div style="text-align:center;padding:10px 0 18px;">
        <div style="width:60px;height:60px;border-radius:12px;background:linear-gradient(135deg,rgba(0,240,255,.1),rgba(124,58,237,.15));border:1px solid rgba(0,240,255,.25);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(0,240,255,.8)"><path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M7,10H12V15H7V10Z"/></svg>
        </div>
        <h2 style="color:var(--bright);margin-bottom:5px;font-family:'Bebas Neue',sans-serif;letter-spacing:.1em;font-size:1.2rem;">EVENT TIMELINE</h2>
        <p style="font-size:.72rem;color:rgba(0,212,255,.55);line-height:1.6;margin-bottom:20px;">Competitions, hackathons &amp; workshops<br>auto-cycling in the bottom-right panel.</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button class="panel-btn" data-url="/event-display">◈ VIEW ALL EVENTS</button>
          <button class="panel-btn" data-url="/event-register" style="background:rgba(124,58,237,.1);border-color:rgba(124,58,237,.35);color:rgba(200,180,255,.75);">+ REGISTER EVENT</button>
        </div></div>`
    };
  }
})();