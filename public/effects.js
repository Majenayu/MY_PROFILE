/* ══════════════════════════════════════════════════════════════
   MISSION DECK FX — Cinematic interactions
   Matrix rain · Boot sequence · Typewriter · Glitch · 3D Tilt
   Magnetic buttons · Counter · Scramble · Command palette · Cursor
   ══════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const $  = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  // ══════════════════════════════════════════════════════
  // 1) BOOT SEQUENCE — Terminal intro on first load
  // ══════════════════════════════════════════════════════
  function runBootSequence() {
    if (sessionStorage.getItem('booted')) return;
    sessionStorage.setItem('booted', '1');

    const boot = document.createElement('div');
    boot.id = 'bootScreen';
    boot.innerHTML = `
      <div class="boot-inner">
        <div class="boot-header">
          <span class="boot-dot r"></span>
          <span class="boot-dot y"></span>
          <span class="boot-dot g"></span>
          <span class="boot-title">ayush.dev — mission control</span>
        </div>
        <div class="boot-body" id="bootBody"></div>
        <div class="boot-progress"><div class="boot-progress-bar" id="bootBar"></div></div>
      </div>`;
    document.body.appendChild(boot);

    const lines = [
      { t: '$ initialize portfolio.exe',            d: 140, cls: 'cmd' },
      { t: '[ OK ] Aurora engine :: loaded',         d: 180, cls: 'ok' },
      { t: '[ OK ] Matrix rain     :: streaming',    d: 160, cls: 'ok' },
      { t: '[ OK ] Neural mesh     :: synced',       d: 180, cls: 'ok' },
      { t: '[ OK ] JARVIS core     :: online',       d: 160, cls: 'ok' },
      { t: '[ OK ] Tech stack      :: armed',        d: 140, cls: 'ok' },
      { t: '[ OK ] Comms channel   :: open',         d: 140, cls: 'ok' },
      { t: '> handshake :: CODEBREAKERS mainframe',  d: 160, cls: 'cmd' },
      { t: '> authenticated as OPERATOR :: MAJEN',   d: 140, cls: 'cmd' },
      { t: '[ READY ] Welcome, P G Ayush Rai.',      d: 200, cls: 'ready' },
    ];

    const body = $('#bootBody');
    const bar  = $('#bootBar');
    let total = 0; lines.forEach(l => total += l.d);
    let progressed = 0;

    let delay = 50;
    lines.forEach((l, i) => {
      setTimeout(() => {
        const row = document.createElement('div');
        row.className = `boot-line ${l.cls}`;
        row.textContent = l.t;
        body.appendChild(row);
        progressed += l.d;
        bar.style.width = Math.min(100, (progressed / total) * 100) + '%';
      }, delay);
      delay += l.d;
    });

    setTimeout(() => {
      boot.classList.add('boot-out');
      setTimeout(() => boot.remove(), 700);
    }, delay + 400);
  }

  // ══════════════════════════════════════════════════════
  // 2) MATRIX RAIN — canvas behind hero
  // ══════════════════════════════════════════════════════
  function initMatrixRain() {
    const canvas = $('#matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, cols, drops;
    const fontSize = 14;
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]</>∆◈◉#$%&*+=?';

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cols = Math.floor(W / fontSize);
      drops = new Array(cols).fill(1).map(() => Math.random() * -50);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.fillStyle = 'rgba(5, 6, 15, 0.07)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient trail effect
        const gradient = ctx.createLinearGradient(x, y - 80, x, y);
        gradient.addColorStop(0, 'rgba(22, 241, 208, 0)');
        gradient.addColorStop(0.6, 'rgba(22, 241, 208, 0.25)');
        gradient.addColorStop(1, 'rgba(22, 241, 208, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillText(ch, x, y);

        // Bright head
        if (Math.random() > 0.985) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(ch, x, y);
        }

        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ══════════════════════════════════════════════════════
  // 3) TYPEWRITER — hero title
  // ══════════════════════════════════════════════════════
  function initTypewriter() {
    const el = $('.rail-name-main');
    if (!el) return;
    const full = el.textContent;
    el.textContent = '';
    el.classList.add('tw-caret');
    let i = 0;
    const step = () => {
      if (i <= full.length) {
        el.textContent = full.slice(0, i);
        i++;
        setTimeout(step, 70 + Math.random() * 40);
      } else {
        setTimeout(() => el.classList.remove('tw-caret'), 1200);
      }
    };
    setTimeout(step, 800);
  }

  // ══════════════════════════════════════════════════════
  // 4) SCRAMBLE TEXT — on hover for section titles
  // ══════════════════════════════════════════════════════
  const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';
  function scrambleText(el) {
    const original = el.dataset.original || el.textContent;
    el.dataset.original = original;
    const queue = [];
    const length = Math.max(original.length, el.textContent.length);
    for (let i = 0; i < length; i++) {
      const from = el.textContent[i] || '';
      const to   = original[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end   = start + Math.floor(Math.random() * 20);
      queue.push({ from, to, start, end });
    }
    let frame = 0;
    function update() {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        let { char } = queue[i];
        if (frame >= end) { complete++; output += to; }
        else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            queue[i].char = char;
          }
          output += `<span style="color:var(--mint)">${char}</span>`;
        } else { output += from; }
      }
      el.innerHTML = output;
      if (complete !== queue.length) { frame++; requestAnimationFrame(update); }
      else { el.textContent = original; }
    }
    update();
  }
  function initScramble() {
    $$('.deck-title, .deck-num').forEach(el => {
      el.addEventListener('mouseenter', () => scrambleText(el));
    });
  }

  // ══════════════════════════════════════════════════════
  // 5) COUNTER — stats count up from 0
  // ══════════════════════════════════════════════════════
  function animateCount(el, to, dur = 1600) {
    if (!el || to < 1) return;
    const start = performance.now();
    const from = 0;
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function observeCounters() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.counted) {
          const n = parseInt(e.target.textContent) || 0;
          e.target.dataset.counted = '1';
          animateCount(e.target, n);
        }
      });
    }, { threshold: 0.4 });
    // Defer observation so data loads first
    setTimeout(() => $$('.rs-num, .stat-number').forEach(el => obs.observe(el)), 2500);
  }

  // ══════════════════════════════════════════════════════
  // 6) 3D TILT — cards follow cursor
  // ══════════════════════════════════════════════════════
  function initTilt() {
    $$('.bento-card, .skill-card, .contact-tile, .rail-stat').forEach(card => {
      let rafId;
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (0.5 - y) * 8;
        const ry = (x - 0.5) * 10;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(2px)`;
          card.style.setProperty('--mx', `${x * 100}%`);
          card.style.setProperty('--my', `${y * 100}%`);
        });
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
      });
    });
  }

  // ══════════════════════════════════════════════════════
  // 7) MAGNETIC CTA buttons
  // ══════════════════════════════════════════════════════
  function initMagnetic() {
    $$('.cta, .nav-btn, .deck-action, .footer-btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ══════════════════════════════════════════════════════
  // 8) CURSOR SPOTLIGHT + TRAIL
  // ══════════════════════════════════════════════════════
  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot); document.body.appendChild(ring);
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px)`; });
    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    }
    loop();
    $$('a, button, .node, .vball, .chip, [onclick]').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  // ══════════════════════════════════════════════════════
  // 9) COMMAND PALETTE — press '/' to open
  // ══════════════════════════════════════════════════════
  function initCmdPalette() {
    const palette = document.createElement('div');
    palette.id = 'cmdPalette';
    palette.innerHTML = `
      <div class="cmdp-inner">
        <div class="cmdp-header">
          <span class="cmdp-prompt">$</span>
          <input type="text" id="cmdpInput" placeholder="Type to filter · ↑↓ navigate · ⏎ jump · ESC close" autocomplete="off" />
          <span class="cmdp-hint">ESC</span>
        </div>
        <div class="cmdp-list" id="cmdpList"></div>
        <div class="cmdp-footer">
          <span><kbd>/</kbd> open</span>
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>⏎</kbd> select</span>
        </div>
      </div>`;
    document.body.appendChild(palette);

    const cmds = [
      { label: 'Go to Hero',         icon: '◈', action: () => scrollTo('#hero') },
      { label: 'About',              icon: '◉', action: () => scrollTo('#about') },
      { label: 'Wins & Achievements',icon: '★', action: () => scrollTo('#achievements') },
      { label: 'Tech Stack',         icon: '</>', action: () => scrollTo('#skills') },
      { label: 'Projects',           icon: '▢', action: () => scrollTo('#projects') },
      { label: 'Events',             icon: '◆', action: () => scrollTo('#events') },
      { label: 'Contact',            icon: '✉', action: () => scrollTo('#contact') },
      { label: 'Open GitHub',        icon: '⌥', action: () => window.open('https://github.com/Majenayu','_blank') },
      { label: 'Open LinkedIn',      icon: 'in', action: () => window.open('https://www.linkedin.com/in/p-g-ayush-rai-8b90082a9/','_blank') },
      { label: 'Open YouTube',       icon: '▶', action: () => window.open('https://www.youtube.com/channel/UCjioxN6gRm-o3SHBBlR6vhw','_blank') },
      { label: 'Copy email address', icon: '✉', action: () => copyEmail() },
      { label: 'Toggle theme',       icon: '☾', action: () => window.toggleTheme && window.toggleTheme() },
      { label: 'Play Tech Stack Blaster', icon: '🕹', action: () => window._openPortfolioGame && window._openPortfolioGame() },
      { label: 'View Resume',        icon: '📄', action: () => window.open('https://www.canva.com/design/DAGnTB1gSSg/yaJ5iSTqmJVcGWfpTqO5fA/view','_blank') },
      { label: 'Admin login',        icon: '⚙', action: () => window.location.href = '/login' },
    ];
    const list  = $('#cmdpList');
    const input = $('#cmdpInput');
    let active = 0;

    function render(filter = '') {
      list.innerHTML = '';
      const q = filter.toLowerCase();
      const filtered = cmds.filter(c => c.label.toLowerCase().includes(q));
      if (!filtered.length) {
        list.innerHTML = '<div class="cmdp-empty">No matches · try /help</div>';
        return;
      }
      filtered.forEach((c, i) => {
        const row = document.createElement('div');
        row.className = 'cmdp-row' + (i === active ? ' active' : '');
        row.innerHTML = `<span class="cmdp-icon">${c.icon}</span><span class="cmdp-label">${c.label}</span><span class="cmdp-enter">⏎</span>`;
        row.addEventListener('click', () => { c.action(); close(); });
        row.addEventListener('mouseenter', () => { active = i; update(); });
        list.appendChild(row);
      });
      window._cmdpFiltered = filtered;
    }
    function update() { $$('.cmdp-row', list).forEach((r, i) => r.classList.toggle('active', i === active)); }
    function open() { palette.classList.add('open'); input.value = ''; active = 0; render(''); setTimeout(() => input.focus(), 10); }
    function close() { palette.classList.remove('open'); input.blur(); }

    window.addEventListener('keydown', e => {
      if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !palette.classList.contains('open')) {
        e.preventDefault(); open();
      } else if (palette.classList.contains('open')) {
        if (e.key === 'Escape') { e.preventDefault(); close(); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, (window._cmdpFiltered||[]).length - 1); update(); }
        else if (e.key === 'ArrowUp')   { e.preventDefault(); active = Math.max(active - 1, 0); update(); }
        else if (e.key === 'Enter')     { e.preventDefault(); const c = (window._cmdpFiltered||[])[active]; if (c) { c.action(); close(); } }
      }
    });
    input.addEventListener('input', e => { active = 0; render(e.target.value); });
    palette.addEventListener('click', e => { if (e.target === palette) close(); });
    window._openCmdPalette = open;

    // Add floating trigger button
    const trig = document.createElement('button');
    trig.className = 'cmdp-trigger';
    trig.innerHTML = '<span class="cmdp-trig-icon">⌘</span><span class="cmdp-trig-text">Press <kbd>/</kbd></span>';
    trig.addEventListener('click', open);
    document.body.appendChild(trig);
  }
  function scrollTo(sel) {
    const el = $(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText('pgayushrai@gmail.com'); toast('✓ Email copied to clipboard'); }
    catch { toast('Copy failed'); }
  }
  function toast(text) {
    const t = document.createElement('div');
    t.className = 'mission-toast';
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2200);
  }
  window.missionToast = toast;
  window.copyEmail = copyEmail;

  // ══════════════════════════════════════════════════════
  // 10) SCROLL PROGRESS BAR (top of page)
  // ══════════════════════════════════════════════════════
  function initScrollBar() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    });
  }

  // ══════════════════════════════════════════════════════
  // 11) SKILL BAR GROWTH on scroll
  // ══════════════════════════════════════════════════════
  function observeSkillBars() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target.querySelector('.skill-bar span');
          if (bar && !bar.dataset.grown) {
            const w = bar.style.width;
            bar.dataset.grown = '1';
            bar.style.width = '0';
            setTimeout(() => { bar.style.width = w; }, 80);
          }
        }
      });
    }, { threshold: 0.3 });
    $$('.skill-card').forEach(c => obs.observe(c));
  }

  // ══════════════════════════════════════════════════════
  // 12) COPY EMAIL buttons
  // ══════════════════════════════════════════════════════
  function initCopyButtons() {
    $$('[data-copy]').forEach(el => {
      el.addEventListener('click', async e => {
        e.preventDefault();
        try { await navigator.clipboard.writeText(el.dataset.copy); toast('✓ Copied: ' + el.dataset.copy); }
        catch { toast('Copy failed'); }
      });
    });
  }

  // ══════════════════════════════════════════════════════
  // 13) LIVE UPTIME COUNTER
  // ══════════════════════════════════════════════════════
  function initUptime() {
    const el = $('#uptimeCounter');
    if (!el) return;
    const start = Date.now();
    setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(s / 3600)).padStart(2, '0');
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
      const sec = String(s % 60).padStart(2, '0');
      el.textContent = `${h}:${m}:${sec}`;
    }, 1000);
  }

  // ══════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════
  function init() {
    runBootSequence();
    initMatrixRain();
    initTypewriter();
    initScramble();
    observeCounters();
    initTilt();
    initMagnetic();
    initCursor();
    initCmdPalette();
    initScrollBar();
    observeSkillBars();
    initCopyButtons();
    initUptime();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
