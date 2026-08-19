const fallback = {
  projects: [
    { name: 'Secure Vision Lab', description: 'A computer vision toolkit for real-time posture and activity detection, designed as a clear bridge between raw camera data and useful feedback.', techStack: ['Python', 'OpenCV', 'MediaPipe'], github: 'https://github.com/Majenayu', website: '' },
    { name: 'Civic Route', description: 'A live bus tracking concept that turns messy transport signals into a calmer, more useful experience for everyday commuters.', techStack: ['Node.js', 'MongoDB', 'Maps API'], github: 'https://github.com/Majenayu', website: '' },
    { name: 'Face Recognition Pipeline', description: 'An experiment in identity verification with an emphasis on clear data flow, sensible constraints, and explainable results.', techStack: ['Python', 'TensorFlow', 'Computer Vision'], github: 'https://github.com/Majenayu', website: '' },
    { name: 'Line Follower', description: 'A compact autonomous navigation build where hardware, sensors, and small decisions have to work together in real time.', techStack: ['Arduino', 'Embedded C', 'Sensors'], github: 'https://github.com/Majenayu', website: '' },
  ],
  awards: [
    { title: 'Teck Spark', rating: 'FIRST PLACE', description: 'Won first place at a competitive tech showcase with a practical demo and clear engineering.', date: '2025', image: '/attached_assets/award-placeholder.png' },
    { title: 'Prayog', rating: 'WINNER', description: 'Hackathon victory through rapid prototyping and public problem-solving under time pressure.', date: '2025', image: '/attached_assets/award-placeholder.png' },
    { title: 'Anveshan', rating: 'FINALIST', description: 'State-level recognition for research-driven innovation and experimental methodology.', date: '2025', image: '/attached_assets/award-placeholder.png' },
    { title: 'Smart India Hackathon', rating: 'PARTICIPANT', description: 'National-level hackathon focused on building solutions for real government problem statements.', date: '2024', image: '/attached_assets/award-placeholder.png' },
    { title: 'Google Cloud Skills Boost', rating: 'CERTIFIED', description: 'Completed multiple skill badges across BigQuery, Dataflow, and cloud data engineering.', date: '2024', image: '/attached_assets/award-placeholder.png' },
    { title: 'IEEE Paper Publication', rating: 'PUBLISHED', description: 'Co-authored a research paper on intelligent systems submitted to an IEEE conference.', date: '2025', image: '/attached_assets/award-placeholder.png' },
    { title: 'CTF Challenge', rating: 'TOP 10', description: 'Capture-the-flag cybersecurity competition testing exploitation, forensics, and cryptography.', date: '2024', image: '/attached_assets/award-placeholder.png' },
    { title: 'CodeChef Contest', rating: 'RATED', description: 'Competitive programming contest improving algorithmic thinking and time complexity skills.', date: '2024', image: '/attached_assets/award-placeholder.png' },
    { title: 'VVCE Hackathon', rating: 'WINNER', description: 'Built and shipped a working prototype in 24 hours under intense competition at VVCE.', date: '2025', image: '/attached_assets/award-placeholder.png' },
    { title: 'TechFest Project Expo', rating: 'BEST PROJECT', description: 'Showcased an end-to-end IoT + ML project recognized as best in category.', date: '2024', image: '/attached_assets/award-placeholder.png' },
    { title: 'Cloud Computing Workshop', rating: 'CERTIFIED', description: 'Hands-on workshop covering AWS/GCP services, deployment pipelines, and serverless.', date: '2024', image: '/attached_assets/award-placeholder.png' },
    { title: 'Cybersecurity Workshop', rating: 'CERTIFIED', description: 'Practical training in ethical hacking, network security, and vulnerability assessment.', date: '2024', image: '/attached_assets/award-placeholder.png' },
    { title: 'AI/ML Bootcamp', rating: 'COMPLETED', description: 'Intensive bootcamp covering neural networks, computer vision, and model deployment.', date: '2024', image: '/attached_assets/award-placeholder.png' },
    { title: 'Open Source Contribution', rating: 'CONTRIBUTOR', description: 'Meaningful contributions to open-source projects with merged pull requests.', date: '2024', image: '/attached_assets/award-placeholder.png' },
    { title: 'College Tech Lead', rating: 'LEADERSHIP', description: 'Led a technical team organizing workshops, hackathons, and peer learning sessions.', date: '2024', image: '/attached_assets/award-placeholder.png' },
  ],
};

const roles = ['SOC Analyst', 'Python / AI-ML Engineer', 'Full-Stack Developer', 'Data & Cloud Analyst', 'Backend Developer'];
const aboutProfiles = {
  cybersecurity: {
    theme: 'crimson',
    resumeUrl: 'https://canva.link/uqthr9u4ufgtcn5',
    title: 'SOC ANALYST · CYBERSECURITY BUILDER',
    bio: 'Hands-on security practitioner focused on real-time threat detection, incident triage, vulnerability assessment, and hardening enterprise attack surfaces.',
    description: 'From packet-level analysis to identity governance — I investigate alerts, simulate adversary tactics, and build defenses that reduce mean-time-to-detect.',
    visualTitle: 'THREAT INTELLIGENCE MAP',
    visualMetric: 'SCORE 88',
    visualType: 'threat',
    visualCaption: 'SECURITY FEED / 01',
    terminal: ['> nmap -sV 10.0.0.0/24', 'PORT 443 / HTTPS / SECURE', 'PORT 22  / SSH   / REVIEW', '> threat_scan --active', '3 SIGNALS FLAGGED / 0 BREACHES'],
    missionLabel: 'CYBERSECURITY CHRONICLES',
    missionTitle: 'DEFENDING THE DIGITAL FRONTIER',
    summary: "Security isn't just prevention — it's visibility. I map attack surfaces, validate controls, and make the safer path the default path.",
    detail: 'I combine offensive testing with defensive engineering — running penetration tests to find weaknesses, then building monitoring and response playbooks to catch what slips through.',
    signal: 'DEFENSE NODE / ACTIVE',
    arsenalLabel: 'CYBERSECURITY TOOLKIT',
    skills: { security: 88, ai: 70, fullstack: 76, data: 68 },
    tools: [
      ['NMAP / WIRESHARK', 'Network recon, port enumeration, and deep packet inspection.'],
      ['KALI LINUX', 'Primary offensive security environment for labs and live assessments.'],
      ['METASPLOIT / HYDRA', 'Exploitation frameworks and credential-based attack validation.'],
      ['WAF / IAM / DMARC', 'Perimeter defense, access control policies, and email security hardening.']
    ]
  },
  ai: {
    theme: 'gold',
    resumeUrl: 'https://canva.link/uqthr9u4ufgtcn5',
    title: 'PYTHON / AI-ML ENGINEER',
    bio: 'Building real-time intelligent systems — from pose estimation and voice coaching to autonomous AI agents — with a focus on inference speed and practical utility.',
    description: 'I design end-to-end ML pipelines: data collection, model training, real-time inference, and deployment — specializing in computer vision and human-interaction AI.',
    visualTitle: 'MODEL TRAINING PROGRESS',
    visualMetric: 'EPOCH 42 / 50',
    visualType: 'training',
    visualCaption: 'INFERENCE FEED / 02',
    terminal: ['> python train_model.py', 'DATASET / 48,200 RECORDS', 'LOSS     0.082  ↓', 'ACCURACY 94.7% ↑', '> checkpoint --save READY'],
    missionLabel: 'INTELLIGENCE SYSTEMS',
    missionTitle: 'MAKING COMPLEXITY LEGIBLE',
    summary: 'A model that works in a notebook means nothing — I ship AI that runs in real-time, explains its decisions, and adapts to real users.',
    detail: 'From AsanMinds (pose-estimation yoga coach) to voice-driven AI agents, I build systems where machine intelligence meets human context at interactive speed.',
    signal: 'INFERENCE NODE / READY',
    arsenalLabel: 'INTELLIGENCE TOOLKIT',
    skills: { security: 74, ai: 88, fullstack: 78, data: 82 },
    tools: [
      ['PYTHON / JUPYTER', 'Rapid prototyping, data exploration, and production scripting.'],
      ['TENSORFLOW / MOVENET', 'Pose estimation, real-time skeletal tracking, and model optimization.'],
      ['GROQ / LLM APIs', 'High-speed inference, prompt engineering, and AI-agent orchestration.'],
      ['OPENCV / MEDIAPIPE', 'Computer vision pipelines, gesture recognition, and video processing.']
    ]
  },
  fullstack: {
    theme: 'teal',
    resumeUrl: 'https://canva.link/uqthr9u4ufgtcn5',
    title: 'FULL-STACK · BACKEND DEVELOPER',
    bio: 'Shipping complete products from pixel to database — REST APIs, real-time features, auth flows, and deployment pipelines that actually go to production.',
    description: 'I architect systems end-to-end: React interfaces, Node.js microservices, MongoDB data modeling, Cloudinary media pipelines, and CI/CD-driven deployments.',
    visualTitle: 'SYSTEM ARCHITECTURE',
    visualMetric: 'NODES 06 / ONLINE',
    visualType: 'architecture',
    visualCaption: 'ARCHITECTURE FEED / 03',
    terminal: ['> deploy --stack production', 'CLIENT  →  API  →  DATABASE', 'CACHE    /  HIT RATE 98.4%', 'WORKERS  /  06 ONLINE', '> health_check --all PASS'],
    missionLabel: 'PRODUCT SYSTEMS',
    missionTitle: 'FROM FIRST IDEA TO LIVE SYSTEM',
    summary: 'Code without users is a hobby. I build products people rely on — with clean APIs, predictable state, and infrastructure that scales without surprises.',
    detail: 'Evalify (AICTE activity-point platform), this portfolio, and multiple client projects — each one pushed from idea to deployment with auth, file handling, and real user feedback loops.',
    signal: 'STACK NODE / ONLINE',
    arsenalLabel: 'FULL-STACK TOOLKIT',
    skills: { security: 76, ai: 73, fullstack: 90, data: 75 },
    tools: [
      ['NODE.JS / EXPRESS', 'RESTful APIs, middleware architecture, and server-side logic.'],
      ['REACT / JAVASCRIPT', 'Component-driven UIs, state management, and SPA routing.'],
      ['MONGODB / MONGOOSE', 'Schema design, aggregation pipelines, and data modeling.'],
      ['DOCKER / GITHUB CI', 'Containerized deployments, automated testing, and release workflows.']
    ]
  },
  data: {
    theme: 'blue',
    resumeUrl: 'https://canva.link/uqthr9u4ufgtcn5',
    title: 'DATA ANALYST · CLOUD DATA BUILDER',
    bio: 'Transforming raw data into actionable intelligence — building warehouses, dashboards, and automated pipelines on Google Cloud Platform.',
    description: 'I design data workflows end-to-end: ingestion with Dataflow, transformation in Dataform, warehousing in BigQuery, and storytelling through Looker Studio dashboards.',
    visualTitle: 'SIGNAL ANALYTICS',
    visualMetric: 'DATA POINTS 12.4K',
    visualType: 'analytics',
    visualCaption: 'ANALYTICS FEED / 04',
    terminal: ['> aggregate --window 30d', 'PROJECTS   42%  /  ACTIVE', 'RESEARCH   31%  /  RISING', 'COMMUNITY  27%  /  STEADY', '> insight_report --ready'],
    missionLabel: 'DATA CHRONICLES',
    missionTitle: 'GIVING SIGNALS A SHAPE',
    summary: 'Data without context is noise. I build pipelines that clean, structure, and visualize information so decision-makers see signal, not spreadsheets.',
    detail: 'From SQL queries to interactive dashboards — I work across the full analytics stack, turning messy source data into governed, version-controlled insight layers.',
    signal: 'SIGNAL NODE / TRACKING',
    arsenalLabel: 'DATA & CLOUD TOOLKIT',
    skills: { security: 68, ai: 80, fullstack: 74, data: 91 },
    tools: [
      ['BIGQUERY / SQL', 'Petabyte-scale analytics, window functions, and complex joins.'],
      ['LOOKER STUDIO', 'Interactive dashboards, calculated fields, and stakeholder reporting.'],
      ['DATAFORM / DBT', 'SQL-based transformations, dependency graphs, and data testing.'],
      ['PYTHON / PANDAS', 'Data wrangling, exploratory analysis, and ETL scripting.']
    ]
  }
};
let roleIndex = 0;
let projectIndex = 0;
let activeAboutTheme = aboutProfiles.cybersecurity.theme;
let awards = fallback.awards.slice();
let projects = fallback.projects.slice();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

function initNavigation() {
  const header = $('#site-header');
  const menu = $('#mobile-nav');
  const toggle = $('#menu-toggle');
  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('.mobile-nav a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 22);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $('#site-progress').style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }, { passive: true });
}

function initHeroMedia() {
  const media = $('.hero-media');
  const video = $('#hero-video');
  const source = media?.dataset.videoSrc;
  if (!media || !video || !source) return;

  fetch(source, { method: 'HEAD', cache: 'no-store' })
    .then((response) => {
      if (!response.ok) return;
      video.src = source;
      media.closest('.hero-console')?.classList.add('has-video');
      video.play().catch(() => {});
    })
    .catch(() => {});
}

function initReadoutHud() {
  const panel = $('.hero-right-panel');
  if (!panel) return;

  const ticker = $('#readout-ticker');
  const metrics = ['LATENCY: 12ms', 'SECURITY: S-RANK', 'NODE: ONLINE'];
  let metricIndex = 0;
  window.setInterval(() => {
    metricIndex = (metricIndex + 1) % metrics.length;
    if (ticker) {
      ticker.classList.remove('ticker-in');
      ticker.classList.add('ticker-out');
      window.setTimeout(() => {
        ticker.textContent = metrics[metricIndex];
        ticker.classList.remove('ticker-out');
        ticker.classList.add('ticker-in');
      }, 220);
    }
  }, 2400);

  panel.addEventListener('pointermove', (event) => {
    const bounds = panel.getBoundingClientRect();
    panel.style.setProperty('--hud-x', `${event.clientX - bounds.left}px`);
    panel.style.setProperty('--hud-y', `${event.clientY - bounds.top}px`);
    panel.classList.add('hud-tracking');
  });

  panel.addEventListener('pointerleave', () => {
    panel.classList.remove('hud-tracking');
  });
}

function initThemeTracking() {
  const sections = $$('[data-theme]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.id === 'about') {
        document.body.dataset.theme = activeAboutTheme;
        return;
      }
      document.body.dataset.theme = entry.target.dataset.theme;
    });
  }, { rootMargin: '-38% 0px -48% 0px' });
  sections.forEach((section) => observer.observe(section));
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  $$('.reveal').forEach((element) => observer.observe(element));
}

function initTypewriter() {
  const target = $('#role-text');
  if (!target) return;
  let char = 0;
  let deleting = false;
  const tick = () => {
    const role = roles[roleIndex];
    target.textContent = deleting ? role.slice(0, --char) : role.slice(0, ++char);
    let delay = deleting ? 42 : 78;
    if (!deleting && char === role.length) { delay = 1500; deleting = true; }
    if (deleting && char === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 350; }
    window.setTimeout(tick, delay);
  };
  window.setTimeout(tick, 900);
}

function renderAboutVisual(type) {
  const visuals = {
    threat: `<div class="threat-map"><span class="map-grid"></span><i class="map-dot dot-one"></i><i class="map-dot dot-two"></i><i class="map-dot dot-three"></i><i class="map-dot dot-four"></i><span class="map-route route-one"></span><span class="map-route route-two"></span><div class="map-legend"><span><i></i> ACTIVE SIGNALS</span><span>DEFENSE NODE / 01</span></div></div>`,
    training: `<div class="training-chart"><div class="training-axis"><span>100</span><span>50</span><span>0</span></div><div class="training-lines"><i style="height:34%"></i><i style="height:48%"></i><i style="height:61%"></i><i style="height:72%"></i><i style="height:84%"></i><i style="height:94%"></i></div><div class="chart-caption"><span>LOSS ↓ 0.082</span><span>ACCURACY ↑ 94.7%</span></div></div>`,
    architecture: `<div class="architecture-map"><span class="architecture-line line-a"></span><span class="architecture-line line-b"></span><span class="architecture-line line-c"></span><i class="architecture-node node-client">CLIENT</i><i class="architecture-node node-api">API</i><i class="architecture-node node-db">DB</i><i class="architecture-node node-auth">AUTH</i><span class="architecture-caption">REQUEST PATH / HEALTHY</span></div>`,
    analytics: `<div class="analytics-chart"><div class="analytics-donut"><span>12.4K<small>POINTS</small></span></div><div class="analytics-bars"><i style="height:78%"><b>42</b></i><i style="height:57%"><b>31</b></i><i style="height:45%"><b>27</b></i><small><span>BUILD</span><span>RESEARCH</span><span>COMMUNITY</span></small></div></div>`
  };
  return visuals[type] || visuals.threat;
}

function scrambleCyberText(element, finalText, speed = 35, delay = 0, step = 0.55) {
  if (!element) return;
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン零一二三四五六七八九十百千ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  let iterations = 0;
  const total = finalText.length;
  element.textContent = finalText.split('').map((char) => char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join('');
  window.setTimeout(() => {
    const interval = window.setInterval(() => {
      element.textContent = finalText.split('').map((char, index) => {
        if (char === ' ') return ' ';
        if (index < iterations) return finalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (iterations >= total) {
        window.clearInterval(interval);
        element.textContent = finalText;
      }
      iterations += step;
    }, speed);
  }, delay);
}

function animateCybersecurityDashboard() {
  scrambleCyberText($('#cyber-name'), 'P G AYUSH RAI', 38, 120);
  scrambleCyberText($('#cyber-role'), 'SOC Analyst · Cybersecurity Builder', 32, 520);
  scrambleCyberText($('#cyber-description'), 'From packet-level analysis to identity governance — I investigate alerts, simulate adversary tactics, and build defenses that reduce mean-time-to-detect across the entire kill chain.', 12, 260, 1.8);
  scrambleCyberText($('#cyber-focus-label'), 'CORE FOCUS AREAS', 40, 760);
  scrambleCyberText($('#cyber-focus-1'), 'Threat Detection & Incident Triage', 30, 900);
  scrambleCyberText($('#cyber-focus-2'), 'WAF, Firewall & Network Defense', 30, 1050);
  scrambleCyberText($('#cyber-focus-3'), 'IAM, SSO & Zero-Trust Access', 30, 1200);
  scrambleCyberText($('#cyber-focus-4'), 'SPF, DKIM, DMARC & Phishing Defense', 30, 1350);
  scrambleCyberText($('#cyber-location'), 'MYSURU, INDIA', 35, 1600);
  scrambleCyberText($('#cyber-status'), 'OPEN TO OPPORTUNITIES', 35, 1750);
}

let dataDashboardAnimation = 0;

function startDataDashboard() {
  $('#data-live-video')?.play().catch(() => {});
  animateDataDashboard();
}

function stopDataDashboard() {
  const video = $('#data-live-video');
  video?.pause();
  if (video) video.currentTime = 0;
}

function animateDataDashboard() {
  const run = ++dataDashboardAnimation;
  const later = (callback, delay) => window.setTimeout(() => {
    if (run === dataDashboardAnimation) callback();
  }, delay);
  const description = 'I design data workflows end-to-end: ingestion with Dataflow, transformation in Dataform, warehousing in BigQuery, and storytelling through Looker Studio dashboards — turning messy sources into governed insight layers.';
  const profile = $('#data-profile');
  const graph = $('#data-graph-fill');
  const workLabel = $('#data-work-label');
  const descriptionElement = $('#data-description');
  const processSteps = $$('.data-process > div');
  const focusItems = $$('.data-focus-grid > div');
  const techTags = $$('.data-tech-stack span');
  const meta = $('.data-meta-row');

  profile?.classList.remove('show');
  graph?.classList.remove('active');
  workLabel?.classList.remove('show');
  descriptionElement.textContent = '';
  processSteps.forEach((step) => step.classList.remove('show'));
  focusItems.forEach((item) => item.classList.remove('show'));
  techTags.forEach((tag) => tag.classList.remove('show'));
  meta?.classList.remove('show');

  let character = 0;
  const type = () => {
    if (run !== dataDashboardAnimation || !descriptionElement) return;
    descriptionElement.textContent = description.slice(0, character);
    character += 1;
    if (character <= description.length) window.setTimeout(type, 16);
  };

  later(() => profile?.classList.add('show'), 180);
  later(() => {
    graph?.classList.add('active');
    type();
  }, 500);
  later(() => workLabel?.classList.add('show'), 2600);
  processSteps.forEach((step, index) => later(() => step.classList.add('show'), 2800 + index * 160));
  later(() => document.querySelectorAll('.data-section-label')[1]?.classList.add('show'), 3600);
  focusItems.forEach((item, index) => later(() => item.classList.add('show'), 3800 + index * 140));
  later(() => {
    document.querySelectorAll('.data-section-label')[2]?.classList.add('show');
    techTags.forEach((tag) => tag.classList.add('show'));
  }, 4500);
  later(() => meta?.classList.add('show'), 5000);
}

let aiAnimationRun = 0;

function animateAiDashboard() {
  const run = ++aiAnimationRun;
  const later = (callback, delay) => window.setTimeout(() => {
    if (run === aiAnimationRun) callback();
  }, delay);
  const description = 'End-to-end ML pipelines: data collection, model training, real-time inference, and deployment — specializing in computer vision, pose estimation, voice-driven AI agents, and human-interaction systems.';
  const descriptionElement = $('#ai-description');
  const focusLabel = $('#ai-focus-label');
  const focusItems = $$('.ai-focus-grid > div');
  const techStack = $('.ai-tech-stack');
  const techTags = $$('.ai-tech-stack span');
  const meta = $('.ai-meta-row');

  descriptionElement.textContent = '';
  descriptionElement.classList.add('typing');
  focusLabel?.classList.remove('show');
  focusItems.forEach((item) => item.classList.remove('show'));
  techStack?.classList.remove('show');
  techTags.forEach((tag) => tag.classList.remove('show'));
  meta?.classList.remove('show');

  let character = 0;
  const type = () => {
    if (run !== aiAnimationRun || !descriptionElement) return;
    descriptionElement.textContent = description.slice(0, character);
    character += 1;
    if (character <= description.length) window.setTimeout(type, 16);
    else descriptionElement.classList.remove('typing');
  };

  later(type, 700);
  later(() => focusLabel?.classList.add('show'), 3800);
  focusItems.forEach((item, index) => later(() => item.classList.add('show'), 4000 + index * 140));
  later(() => {
    document.querySelectorAll('.ai-section-label')[1]?.classList.add('show');
    techStack?.classList.add('show');
    techTags.forEach((tag, index) => later(() => tag.classList.add('show'), 4600 + index * 70));
  }, 4600);
  later(() => meta?.classList.add('show'), 5200);
}

function startAiDashboard() {
  const video = $('#ai-live-video');
  const dashboard = $('#ai-dashboard-shell');
  if (!dashboard) return;
  dashboard.classList.add('show');
  video?.play().catch(() => {});
  animateAiDashboard();
}

function stopAiDashboard() {
  const video = $('#ai-live-video');
  video?.pause();
  if (video) video.currentTime = 0;
}

function startFullstackDashboard() {
  $('#fullstack-live-video')?.play().catch(() => {});
  animateFullstackDashboard();
}

function stopFullstackDashboard() {
  const video = $('#fullstack-live-video');
  video?.pause();
  if (video) video.currentTime = 0;
}

let fullstackAnimationRun = 0;

function animateFullstackDashboard() {
  const run = ++fullstackAnimationRun;
  const later = (callback, delay) => window.setTimeout(() => {
    if (run === fullstackAnimationRun) callback();
  }, delay);
  const phases = {
    boot: $('#fs-phase-boot'),
    pkg: $('#fs-phase-pkg'),
    net: $('#fs-phase-net'),
    layers: $('#fs-phase-layers'),
    final: $('#fs-phase-final')
  };
  const label = $('#fs-phase-label');
  const status = $('#fs-phase-status');
  const showPhase = (name, phaseLabel, phaseStatus) => {
    Object.values(phases).forEach((phase) => phase?.classList.remove('active'));
    phases[name]?.classList.add('active');
    if (label) label.textContent = phaseLabel;
    if (status) status.textContent = phaseStatus;
  };

  $('#fs-boot-log').innerHTML = '';
  $('#fs-pkg-list').innerHTML = '';
  $('#fs-build-success').classList.remove('show');
  $('#fs-net-label').classList.remove('show');
  $('#fs-net-label').textContent = '';
  $('#fs-net-dot').className = 'fs-net-dot';
  ['client', 'api', 'db'].forEach((node) => {
    $(`#fs-net-${node}`).className = 'fs-net-node';
  });
  ['fe', 'be', 'db'].forEach((layer) => {
    $(`#fs-layer-${layer}`)?.classList.remove('show');
    const bar = $(`#fs-bar-${layer}`);
    if (bar) bar.style.width = '0';
  });
  $('#fs-final-arch').classList.remove('show');
  $('#fs-final-msg').classList.remove('show');
  $$('.fs-tech-stack span').forEach((item) => item.classList.remove('show'));

  showPhase('boot', 'System Boot', 'Loading…');
  const bootLines = [
    ['> system.boot()', 'info'],
    ['  loading kernel modules...', ''],
    ['  ✓ memory check passed', 'ok'],
    ['  ✓ network interface up', 'ok'],
    ['  mounting volumes...', ''],
    ['  ✓ /data mounted', 'ok'],
    ['  starting services...', 'warn'],
    ['  ready.', 'ok']
  ];
  bootLines.forEach(([text, tone], index) => later(() => {
    const line = document.createElement('div');
    line.className = 'fs-boot-line show';
    line.innerHTML = `<span class="${tone}">${text}</span>`;
    $('#fs-boot-log')?.appendChild(line);
  }, 180 + index * 180));

  const packages = ['react@18.2.0', 'express@4.18.2', 'mongoose@7.0.3', 'typescript@5.0.4', 'docker-compose'];
  later(() => {
    showPhase('pkg', 'Package Install', 'npm install');
    packages.forEach((name, index) => {
      later(() => {
        const row = document.createElement('div');
        row.className = 'fs-pkg-row show';
        row.innerHTML = `<span>${name}</span><b><i></i></b><small>installing</small>`;
        $('#fs-pkg-list')?.appendChild(row);
        later(() => {
          row.querySelector('i')?.style.setProperty('width', '100%');
          const state = row.querySelector('small');
          if (state) {
            state.textContent = 'done';
            state.classList.add('done');
          }
        }, 260);
      }, index * 410);
    });
    later(() => {
      $('#fs-build-success')?.classList.add('show');
      if (status) status.textContent = 'Build Successful';
    }, 2150);
  }, 2100);

  later(() => {
    showPhase('net', 'Network Request', 'Tracing…');
    ['client', 'api', 'db'].forEach((node, index) => later(() => {
      $(`#fs-net-${node}`)?.classList.add('show');
    }, 150 + index * 200));
    later(() => {
      $('#fs-net-label')?.classList.add('show');
      $('#fs-net-label').textContent = '→ POST /api/auth  ·  sending…';
      $('#fs-net-client')?.classList.add('pulse-ring');
      $('#fs-net-dot').className = 'fs-net-dot travel1';
    }, 750);
    later(() => {
      $('#fs-net-api')?.classList.add('pulse-ring');
      $('#fs-net-label').textContent = '→ API validated  ·  forwarding…';
      $('#fs-net-dot').className = 'fs-net-dot travel2';
    }, 1500);
    later(() => {
      $('#fs-net-db')?.classList.add('pulse-ring');
      $('#fs-net-label').textContent = '← 200 OK  ·  38ms';
      if (status) status.textContent = 'Online';
    }, 2300);
  }, 5000);

  later(() => {
    showPhase('layers', 'System Layers', 'Assembling…');
    ['fe', 'be', 'db'].forEach((layer, index) => later(() => {
      $(`#fs-layer-${layer}`)?.classList.add('show');
      later(() => $(`#fs-bar-${layer}`)?.style.setProperty('width', '100%'), 180);
    }, 180 + index * 280));
    later(() => { if (status) status.textContent = 'Ready'; }, 1150);
  }, 7700);

  later(() => {
    showPhase('final', 'Request Flow', 'Nodes 04 / Online');
    later(() => $('#fs-final-arch')?.classList.add('show'), 100);
    later(() => $('#fs-final-msg')?.classList.add('show'), 400);
  }, 9500);

  $$('.fs-tech-stack span').forEach((item, index) => later(() => item.classList.add('show'), 4800 + index * 70));
}

function initAboutProfiles() {
  const tabs = $$('.role-tab');
  const arsenal = $('#about-arsenal');
  if (!tabs.length || !arsenal) return;

  const update = (key) => {
    const profile = aboutProfiles[key] || aboutProfiles.cybersecurity;
    activeAboutTheme = profile ? profile.theme : 'cyan';
    document.body.dataset.theme = activeAboutTheme;
    const showCybersecurityDashboard = key === 'cybersecurity';
    const showDataDashboard = key === 'data';
    const showAiDashboard = key === 'ai';
    const showFullstackDashboard = key === 'fullstack';
    const showGithubDashboard = key === 'github';
    const showLeadershipDashboard = key === 'leadership';
    $('#cybersecurity-dashboard').hidden = !showCybersecurityDashboard;
    $('#data-analyst-dashboard').hidden = !showDataDashboard;
    $('#ai-ml-dashboard').hidden = !showAiDashboard;
    $('#fullstack-dashboard').hidden = !showFullstackDashboard;
    $('#github-dashboard').hidden = !showGithubDashboard;
    $('#leadership-dashboard').hidden = !showLeadershipDashboard;
    $('#about-profile-modes').hidden = showCybersecurityDashboard || showDataDashboard || showAiDashboard || showFullstackDashboard || showGithubDashboard || showLeadershipDashboard;
    if (showCybersecurityDashboard) animateCybersecurityDashboard();
    if (showDataDashboard) startDataDashboard();
    else stopDataDashboard();
    if (showAiDashboard) startAiDashboard();
    else stopAiDashboard();
    if (showFullstackDashboard) startFullstackDashboard();
    else stopFullstackDashboard();
    if (showGithubDashboard) { activeAboutTheme = 'violet'; document.body.dataset.theme = 'violet'; }
    if (showLeadershipDashboard) { activeAboutTheme = 'gold'; document.body.dataset.theme = 'gold'; }
    if (!profile) { tabs.forEach((tab) => { tab.classList.toggle('active', tab.dataset.role === key); tab.setAttribute('aria-selected', String(tab.dataset.role === key)); }); return; }
    $('#about-role-title').textContent = profile.title;
    if (profile.resumeUrl) {
      const navResume = $('#nav-resume-link');
      const mobileResume = $('#mobile-resume-link');
      if (navResume) navResume.href = profile.resumeUrl;
      if (mobileResume) mobileResume.href = profile.resumeUrl;
    }
    $('#about-bio').textContent = profile.bio;
    $('#about-description').textContent = profile.description;
    $('#about-mission-label').textContent = profile.missionLabel;
    $('#about-mission-title').textContent = profile.missionTitle;
    $('#about-mission-summary').textContent = profile.summary;
    $('#about-mission-detail').textContent = profile.detail;
    $('#about-signal-caption').textContent = profile.signal;
    $('#about-arsenal-label').textContent = profile.arsenalLabel;
    $('#about-visual-title').textContent = profile.visualTitle;
    $('#about-visual-metric').textContent = profile.visualMetric;
    $('#about-visual-content').innerHTML = renderAboutVisual(profile.visualType);
    $('#about-visual-caption').textContent = profile.visualCaption;
    $('#about-terminal-lines').innerHTML = profile.terminal.map((line, index) => `<span style="--line-index:${index}">${escapeHtml(line)}</span>`).join('');
    $('#about-profile-visual').setAttribute('aria-label', `${profile.title} animated profile feed`);
    $('#about-stack').innerHTML = profile.tools.map(([name]) => `<span>${escapeHtml(name)}</span>`).join('');
    $$('.skill-row').forEach((row) => {
      const value = profile.skills[row.dataset.skill];
      const fill = row.querySelector('b');
      const percent = row.querySelector('strong');
      if (value == null || !fill || !percent) return;
      fill.style.width = `${value}%`;
      percent.textContent = `${value}%`;
    });
    arsenal.innerHTML = profile.tools.map(([name, description]) => `<div class="arsenal-item"><span class="arsenal-icon">◈</span><div><strong>${escapeHtml(name)}</strong><p>${escapeHtml(description)}</p></div></div>`).join('');
    tabs.forEach((tab) => {
      const active = tab.dataset.role === key;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => update(tab.dataset.role)));
  update('cybersecurity');
}

function initProjects() {
  const projectData = [
    { name: 'AsanMinds — Sunday', desc: 'AI-powered AR yoga instructor. Real-time pose correction via TensorFlow.js MoveNet at 30fps, voice coach with 40+ commands, 6-semester course, verified PDF certificates.', tags: ['TensorFlow.js', 'Flask', 'MongoDB', 'MoveNet'], type: 'AI / AR', status: 'LIVE', github: 'https://github.com/Majenayu/AsanaMind', live: 'https://asanaminds.onrender.com', demo: 'https://youtu.be/1zfEa6RNBq4' },
    { name: 'Secure Vision Lab', desc: 'Real-time posture and activity detection toolkit bridging camera data to actionable feedback.', tags: ['Python', 'OpenCV', 'MediaPipe'], type: 'COMPUTER VISION', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Civic Route', desc: 'Live bus tracking concept turning messy transport signals into a calmer commuter experience.', tags: ['Node.js', 'MongoDB', 'Maps API'], type: 'FULL-STACK', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Face Recognition Pipeline', desc: 'Identity verification with clear data flow, sensible constraints, and explainable results.', tags: ['Python', 'TensorFlow', 'CV'], type: 'ML', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Line Follower Bot', desc: 'Autonomous navigation where hardware, sensors, and real-time decisions work together.', tags: ['Arduino', 'Embedded C', 'Sensors'], type: 'HARDWARE', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Cyber Sentinel', desc: 'Cybersecurity tooling and security research — active threat detection and network defense.', tags: ['Python', 'Kali', 'Nmap'], type: 'SECURITY', status: 'ACTIVE', github: 'https://github.com/Majenayu/Cyber-Sentinel', live: '', demo: '' },
    { name: 'Evalify', desc: 'AICTE activity-points platform with evidence uploads, mentor verification, and support workflows.', tags: ['Node.js', 'MongoDB', 'Express'], type: 'EDTECH', status: 'LIVE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'CodeBreakers VVCE', desc: 'AI-powered Virtual Try-On System using real-time pose detection and webcam overlay.', tags: ['JavaScript', 'MediaPipe', 'WebRTC'], type: 'AI / AR', status: 'DONE', github: 'https://github.com/Majenayu/CodeBreakers-vvce', live: '', demo: '' },
    { name: 'Voice Agent System', desc: 'Conversational AI agent with wake-word detection, offline knowledge base, and LLM fallback.', tags: ['Python', 'Groq API', 'LangChain'], type: 'AI AGENT', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Threat Intel Dashboard', desc: 'Real-time threat intelligence visualization with signal tracking and anomaly detection.', tags: ['Python', 'Splunk', 'Flask'], type: 'SECURITY', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Smart Parking System', desc: 'IoT-based parking slot detection with real-time availability display and mobile alerts.', tags: ['Arduino', 'IoT', 'Node.js'], type: 'IOT', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Portfolio v2', desc: 'This cyberpunk command-console portfolio with six profile modes and live video feeds.', tags: ['JavaScript', 'Node.js', 'CSS'], type: 'WEB', status: 'LIVE', github: 'https://github.com/Majenayu/MY_PROFILE', live: 'https://pgayushrai.onrender.com', demo: '' },
    { name: 'Chat Encryption Tool', desc: 'End-to-end encrypted messaging prototype using RSA + AES hybrid encryption.', tags: ['Python', 'Cryptography', 'Flask'], type: 'SECURITY', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Data Pipeline GCP', desc: 'Automated data ingestion and transformation pipeline on Google Cloud Platform.', tags: ['BigQuery', 'Dataflow', 'Python'], type: 'DATA', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Attendance System', desc: 'Face-based attendance tracking with anti-spoofing measures and admin dashboard.', tags: ['Python', 'OpenCV', 'Flask'], type: 'ML', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'E-Commerce API', desc: 'RESTful backend with JWT auth, cart management, payment integration, and order tracking.', tags: ['Express', 'MongoDB', 'Stripe'], type: 'BACKEND', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Phishing Detector', desc: 'ML model to classify phishing URLs using feature extraction and random forests.', tags: ['Python', 'Scikit-learn', 'NLP'], type: 'SECURITY', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Weather Station', desc: 'ESP32-based weather monitoring with temperature, humidity, and pressure sensors.', tags: ['ESP32', 'IoT', 'MQTT'], type: 'IOT', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Gesture Controller', desc: 'Hand gesture recognition for controlling presentations and media playback.', tags: ['Python', 'MediaPipe', 'PyAutoGUI'], type: 'CV', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Quiz Platform', desc: 'Timed quiz app with question banks, leaderboards, and performance analytics.', tags: ['React', 'Node.js', 'MongoDB'], type: 'EDTECH', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Network Scanner', desc: 'Automated network reconnaissance tool with port scanning and service detection.', tags: ['Python', 'Nmap', 'Socket'], type: 'SECURITY', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Blog CMS', desc: 'Markdown-based blog with admin panel, image uploads, and SEO optimization.', tags: ['Node.js', 'MongoDB', 'EJS'], type: 'WEB', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Expense Tracker', desc: 'Personal finance app with category breakdowns, monthly graphs, and budget alerts.', tags: ['React', 'Chart.js', 'Firebase'], type: 'WEB', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Drone Navigation', desc: 'Autonomous drone path planning using A* algorithm with obstacle avoidance.', tags: ['Python', 'ROS', 'Simulation'], type: 'ROBOTICS', status: 'PROTOTYPE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Sentiment Analyzer', desc: 'NLP-based tweet sentiment classification with real-time streaming dashboard.', tags: ['Python', 'NLTK', 'Streamlit'], type: 'NLP', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'File Vault', desc: 'Encrypted file storage with access control, sharing links, and audit logging.', tags: ['Node.js', 'AES-256', 'MongoDB'], type: 'SECURITY', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Task Automation Bot', desc: 'Discord bot automating team tasks, reminders, code reviews, and deployment alerts.', tags: ['Python', 'Discord.py', 'Cron'], type: 'AUTOMATION', status: 'ACTIVE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'AR Campus Tour', desc: 'Augmented reality campus navigation with 3D markers and indoor positioning.', tags: ['Unity', 'ARCore', 'C#'], type: 'AR', status: 'PROTOTYPE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Health Monitor', desc: 'Wearable data aggregation with heart rate analysis and anomaly detection.', tags: ['Python', 'BLE', 'Flask'], type: 'IOT / ML', status: 'DONE', github: 'https://github.com/Majenayu', live: '', demo: '' },
    { name: 'Anveshan Research', desc: 'State-level research project on intelligent systems — finalist at Anveshan competition.', tags: ['Python', 'ML', 'Research'], type: 'RESEARCH', status: 'PUBLISHED', github: 'https://github.com/Majenayu/Anveshan', live: '', demo: '' },
  ];

  const scene = $('#pj-stack-scene');
  const counter = $('#pj-stack-counter');
  const stackView = $('#pj-stack-view');
  const detailView = $('#pj-detail-view');
  if (!scene) return;

  let activeIndex = 0;
  const VISIBLE_CARDS = 5; // how many cards visible in stack

  const cardColors = ['#58ebe0','#ff4655','#a87cff','#5ee59c','#ff8f42','#e3c266','#3b82f6','#dc9466','#77e9d0'];

  function renderStack() {
    scene.innerHTML = projectData.map((p, i) => {
      const color = cardColors[i % cardColors.length];
      return `<div class="pj-stack-card" data-index="${i}" style="--card-color:${color}">
      <div class="pj-stack-card-top"><span class="pj-stack-card-num">${String(i + 1).padStart(2, '0')}</span><span class="pj-stack-card-status">${escapeHtml(p.status)}</span></div>
      <h4 class="pj-stack-card-title">${escapeHtml(p.name)}</h4>
      <p class="pj-stack-card-desc">${escapeHtml(p.desc)}</p>
      <div class="pj-stack-card-tags">${p.tags.slice(0, 3).map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
      <div class="pj-stack-card-footer"><span class="pj-stack-card-type">${escapeHtml(p.type)}</span><span class="pj-stack-card-hint">CLICK TO EXPAND</span></div>
    </div>`;
    }).join('');

    scene.querySelectorAll('.pj-stack-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index);
        if (idx === activeIndex) {
          expandProject(idx);
        } else {
          activeIndex = idx;
          positionCards();
        }
      });
    });

    positionCards();
  }

  function positionCards() {
    const cards = scene.querySelectorAll('.pj-stack-card');
    cards.forEach((card, i) => {
      const offset = i - activeIndex;
      const absOffset = Math.abs(offset);

      if (absOffset > VISIBLE_CARDS) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.transform = `translateX(${offset > 0 ? 600 : -600}px) scale(0.7) rotateY(${offset > 0 ? -25 : 25}deg)`;
      } else {
        const translateX = offset * 60;
        const translateZ = -absOffset * 50;
        const rotateY = offset * -8;
        const scale = 1 - absOffset * 0.06;
        const opacity = 1 - absOffset * 0.15;

        card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = String(Math.max(0.3, opacity));
        card.style.pointerEvents = 'auto';
        card.style.zIndex = String(projectData.length - absOffset);
      }

      card.classList.toggle('active', i === activeIndex);
    });

    counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(projectData.length).padStart(2, '0')}`;
  }

  function expandProject(idx) {
    const p = projectData[idx];
    if (!detailView || !stackView) return;

    // Hide stack, show detail in same spot
    stackView.classList.add('hide');
    detailView.hidden = false;

    // Reset to website tab
    detailView.querySelectorAll('.pj-preview-tab').forEach(t => t.classList.toggle('active', t.dataset.preview === 'site'));
    $('#pj-site-panel')?.classList.add('active');
    $('#pj-video-panel')?.classList.remove('active');

    $('#pj-detail-title').textContent = p.name.toUpperCase();
    $('#pj-detail-desc').textContent = p.desc;
    $('#pj-detail-tags').innerHTML = p.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('');
    $('#pj-detail-badges').innerHTML = `<span>${escapeHtml(p.status)}</span><span>${escapeHtml(p.type)}</span>`;
    $('#pj-detail-meta').innerHTML = `<div><span>TYPE</span><strong>${escapeHtml(p.type)}</strong></div><div><span>STATUS</span><strong>${escapeHtml(p.status)}</strong></div>`;

    // Embed live website preview
    const siteFrame = $('#pj-site-frame');
    const siteUrl = $('#pj-site-url');
    if (siteFrame) {
      if (p.live) {
        if (siteUrl) siteUrl.textContent = p.live.replace(/https?:\/\//, '');
        siteFrame.innerHTML = `<iframe class="pj-frame-scaled" src="${escapeHtml(p.live)}" loading="lazy" sandbox="allow-scripts allow-same-origin" title="Live website preview"></iframe>`;
      } else {
        if (siteUrl) siteUrl.textContent = 'NO LIVE URL';
        siteFrame.innerHTML = `<div style="display:grid;place-items:center;height:100%;color:#5e7a7c;font:9px var(--mono);letter-spacing:.06em">NO LIVE PREVIEW AVAILABLE</div>`;
      }
    }

    // Embed YouTube video
    const videoFrame = $('#pj-video-frame');
    if (videoFrame) {
      if (p.demo) {
        const videoId = p.demo.match(/(?:youtu\.be\/|v=)([^&]+)/);
        if (videoId) {
          videoFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId[1]}?rel=0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen title="Video demo"></iframe>`;
        } else {
          videoFrame.innerHTML = `<iframe src="${escapeHtml(p.demo)}" allowfullscreen title="Video demo"></iframe>`;
        }
      } else {
        videoFrame.innerHTML = `<div style="display:grid;place-items:center;height:100%;color:#5e7a7c;font:9px var(--mono);letter-spacing:.06em">NO VIDEO DEMO</div>`;
      }
    }

    // Action buttons (still keep as fallback links)
    let actions = '';
    if (p.live) actions += `<a class="pj-detail-act-primary" href="${escapeHtml(p.live)}" target="_blank" rel="noreferrer">OPEN SITE ↗</a>`;
    if (p.demo) actions += `<a class="pj-detail-act-secondary" href="${escapeHtml(p.demo)}" target="_blank" rel="noreferrer">FULL VIDEO ↗</a>`;
    actions += `<a class="pj-detail-act-secondary" href="${escapeHtml(p.github)}" target="_blank" rel="noreferrer">SOURCE ↗</a>`;
    $('#pj-detail-actions').innerHTML = actions;
  }

  function closeDetail() {
    if (!detailView || !stackView) return;
    detailView.hidden = true;
    stackView.classList.remove('hide');
    // Clean up iframes to stop loading
    const siteFrame = $('#pj-site-frame');
    const videoFrame = $('#pj-video-frame');
    if (siteFrame) siteFrame.innerHTML = '';
    if (videoFrame) videoFrame.innerHTML = '';
  }

  // Preview tab switching (using event delegation on detail view for reliability)
  if (detailView) {
    detailView.addEventListener('click', (e) => {
      const tab = e.target.closest('.pj-preview-tab');
      if (!tab) return;
      e.stopPropagation();
      const allTabs = detailView.querySelectorAll('.pj-preview-tab');
      const sPanel = detailView.querySelector('#pj-site-panel');
      const vPanel = detailView.querySelector('#pj-video-panel');
      allTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.preview === 'site') {
        sPanel?.classList.add('active');
        vPanel?.classList.remove('active');
      } else {
        vPanel?.classList.add('active');
        sPanel?.classList.remove('active');
      }
    });
  }

  // Back button
  $('#pj-detail-back')?.addEventListener('click', closeDetail);

  // Arrows
  $('#pj-stack-next')?.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % projectData.length;
    positionCards();
  });
  $('#pj-stack-prev')?.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + projectData.length) % projectData.length;
    positionCards();
  });

  // Keyboard navigation
  scene.setAttribute('tabindex', '0');
  scene.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { activeIndex = (activeIndex + 1) % projectData.length; positionCards(); }
    if (e.key === 'ArrowLeft') { activeIndex = (activeIndex - 1 + projectData.length) % projectData.length; positionCards(); }
    if (e.key === 'Enter') expandProject(activeIndex);
  });

  renderStack();
}

function renderAwards() {
  $('#award-count').textContent = `${String(awards.length).padStart(2, '0')} RECORDS`;
  const track = $('#awards-track');
  if (!track) return;

  const cardColors = ['#58ebe0','#ff4655','#a87cff','#5ee59c','#ff8f42','#e3c266','#3b82f6','#dc9466','#77e9d0'];

  track.innerHTML = awards.map((award, index) => {
    const color = cardColors[index % cardColors.length];
    return `<article class="award-slide" style="--card-color:${color}">
    <div class="award-slide-image">${award.image ? `<img src="${escapeHtml(award.image)}" alt="${escapeHtml(award.title)}" loading="lazy" />` : `<div class="award-slide-placeholder"><span>★</span><small>${String(index + 1).padStart(2, '0')}</small></div>`}</div>
    <div class="award-slide-content">
      <div class="award-slide-head">
        <span class="award-slide-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="award-slide-badge">${escapeHtml(award.rating)}</span>
      </div>
      <h4 class="award-slide-title">${escapeHtml(award.title)}</h4>
      <p class="award-slide-desc">${escapeHtml(award.description)}</p>
      <div class="award-slide-footer">
        <span class="award-slide-date">${escapeHtml(award.date)}</span>
      </div>
    </div>
  </article>`;
  }).join('');

  renderAwardDots();
  updateCarouselPosition(false);
}

let awardPage = 0;

function getVisibleSlides() {
  const width = window.innerWidth;
  if (width <= 600) return 1;
  if (width <= 900) return 2;
  return 3;
}

function getTotalPages() {
  return Math.max(1, Math.ceil(awards.length / getVisibleSlides()));
}

function updateCarouselPosition(animate = true) {
  const track = $('#awards-track');
  if (!track) return;
  const slide = track.querySelector('.award-slide');
  if (!slide) return;
  const slideWidth = slide.offsetWidth + 18; // gap
  const offset = awardPage * getVisibleSlides() * slideWidth;
  track.style.transition = animate ? 'transform .5s cubic-bezier(.4,0,.2,1)' : 'none';
  track.style.transform = `translateX(-${offset}px)`;
  updateAwardDots();
}

function renderAwardDots() {
  const dotsContainer = $('#awards-dots');
  if (!dotsContainer) return;
  const total = getTotalPages();
  dotsContainer.innerHTML = Array.from({ length: total }, (_, i) =>
    `<button class="carousel-dot ${i === awardPage ? 'active' : ''}" type="button" aria-label="Page ${i + 1}" data-page="${i}"></button>`
  ).join('');
  dotsContainer.querySelectorAll('.carousel-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      awardPage = parseInt(dot.dataset.page);
      updateCarouselPosition();
    });
  });
}

function updateAwardDots() {
  $$('.carousel-dot').forEach((dot, i) => dot.classList.toggle('active', i === awardPage));
}

function initAwardCube() {
  $('#award-next')?.addEventListener('click', () => {
    if (awardPage < getTotalPages() - 1) {
      awardPage++;
      updateCarouselPosition();
    } else {
      awardPage = 0;
      updateCarouselPosition();
    }
  });
  $('#award-prev')?.addEventListener('click', () => {
    if (awardPage > 0) {
      awardPage--;
      updateCarouselPosition();
    } else {
      awardPage = getTotalPages() - 1;
      updateCarouselPosition();
    }
  });

  // Drag to scroll
  const wrapper = document.querySelector('.awards-carousel-track-wrapper');
  const track = $('#awards-track');
  let isDragging = false;
  let startX = 0;
  let startScroll = 0;
  let dragDelta = 0;

  function getTrackOffset() {
    const transform = track?.style.transform || '';
    const match = transform.match(/translateX\((-?\d+\.?\d*)px\)/);
    return match ? parseFloat(match[1]) : 0;
  }

  wrapper?.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startScroll = getTrackOffset();
    dragDelta = 0;
    track.style.transition = 'none';
    wrapper.style.cursor = 'grabbing';
    wrapper.setPointerCapture(e.pointerId);
  });

  wrapper?.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    dragDelta = e.clientX - startX;
    track.style.transform = `translateX(${startScroll + dragDelta}px)`;
  });

  wrapper?.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.cursor = '';
    wrapper.releasePointerCapture(e.pointerId);

    const slideWidth = track.querySelector('.award-slide')?.offsetWidth + 18 || 338;
    if (Math.abs(dragDelta) > slideWidth * 0.25) {
      if (dragDelta < 0 && awardPage < getTotalPages() - 1) awardPage++;
      else if (dragDelta > 0 && awardPage > 0) awardPage--;
    }
    updateCarouselPosition(true);
  });

  wrapper?.addEventListener('pointerleave', (e) => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.cursor = '';
    updateCarouselPosition(true);
  });

  // Prevent image drag
  wrapper?.addEventListener('dragstart', (e) => e.preventDefault());

  // Auto-scroll
  let autoTimer = setInterval(() => $('#award-next')?.click(), 5000);
  const container = document.querySelector('.awards-carousel-container');
  container?.addEventListener('pointerenter', () => clearInterval(autoTimer));
  container?.addEventListener('pointerleave', () => { autoTimer = setInterval(() => $('#award-next')?.click(), 5000); });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    if (awardPage >= getTotalPages()) awardPage = getTotalPages() - 1;
    renderAwardDots();
    updateCarouselPosition(false);
  });
}

async function enrichFromApi() {
  const get = async (path) => {
    try {
      const response = await fetch(path);
      return response.ok ? response.json() : null;
    } catch { return null; }
  };
  const [projectData, achievementData] = await Promise.all([get('/api/projects'), get('/api/achievements')]);
  if (Array.isArray(projectData) && projectData.length) { projects = projectData; $('#stat-projects').textContent = String(projects.length).padStart(2, '0'); }
  if (Array.isArray(achievementData) && achievementData.length) {
    awards = achievementData.map((item) => ({
      title: item.eventName,
      rating: String(item.place || 'RECOGNITION').toUpperCase(),
      description: item.description || 'A hard-earned mark in the journey.',
      date: item.date ? new Date(item.date).toLocaleDateString('en-IN', { year: 'numeric' }) : 'ARCHIVE',
      image: (item.photos && item.photos[0]) || '/attached_assets/award-placeholder.png',
      postUrl: item.postUrl || item.postLink || item.linkedPost,
      certificateUrl: item.certificateUrl || item.certificateLink || item.driveUrl || item.certificate,
      links: item.links
    }));
    renderAwards();
    $('#stat-awards').textContent = String(awards.length).padStart(2, '0');
  }

  // GitHub stats are set directly in the HTML
}

function initLeadershipTabs() {
  // All timelines visible on same page — no tab switching needed
}

function initContact() {
  $('#contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\nReply to: ${data.get('email')}`);
    $('#contact-submit-label').textContent = 'OPENING MAIL CLIENT...';
    $('#form-status').textContent = 'TRANSMISSION READY — YOUR MAIL CLIENT WILL OPEN.';
    window.location.href = `mailto:pgayushrai@gmail.com?subject=${subject}&body=${body}`;
    window.setTimeout(() => { $('#contact-submit-label').textContent = 'INITIATE TRANSMISSION'; }, 1400);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroMedia();
  initReadoutHud();
  initThemeTracking();
  initReveal();
  initTypewriter();
  initAboutProfiles();
  initProjects();
  renderAwards();
  initAwardCube();
  initLeadershipTabs();
  initContact();
  enrichFromApi();
});