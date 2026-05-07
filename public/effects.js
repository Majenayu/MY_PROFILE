/* ════════════════════════════════════════════════════════════
   Portfolio v7 — Minimal FX layer
   Cursor glow, counter animation, scroll reveal, copy-toast
   ════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $  = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  // ── 1) Cursor glow: smooth follow ──────────────────────────
  const glow = $('#cursorGlow');
  if (glow && !window.matchMedia('(pointer: coarse)').matches) {
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let sx = tx, sy = ty;
    window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      sx += (tx - sx) * 0.14;
      sy += (ty - sy) * 0.14;
      glow.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }

  // ── 2) Counter animation (stats count up from 0) ───────────
  function animateCount(el, to, dur = 1400) {
    if (!el || !to || to < 1) return;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        const n = parseInt(e.target.textContent) || 0;
        e.target.dataset.counted = '1';
        if (n > 0) animateCount(e.target, n);
      }
    });
  }, { threshold: 0.4 });
  setTimeout(() => $$('.hs-num, .stat-number, .proj-count').forEach(el => countObs.observe(el)), 2000);

  // ── 3) Scroll reveal for sections ──────────────────────────
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); reveal.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  $$('.sect').forEach(el => reveal.observe(el));

  // ── 4) Copy-to-clipboard with toast ───────────────────────
  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'mission-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2200);
  }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-copy]');
    if (!el) return;
    if (el.tagName === 'A' && el.getAttribute('href') && !el.getAttribute('href').startsWith('#')) {
      // Allow the link to work normally, but still copy on click
    } else {
      e.preventDefault();
    }
    const val = el.dataset.copy;
    if (navigator.clipboard && val) {
      navigator.clipboard.writeText(val).then(() => toast('✓ Copied: ' + val)).catch(() => toast('Copy failed'));
    }
  });
  window.missionToast = toast;

  // ── 5) Subtle 3D tilt for cards on cursor move ─────────────
  $$('.skill-card, .ctile, .side-card, .tl-item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5);
      const y = ((e.clientY - r.top) / r.height - 0.5);
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });

  // ── 6) Typewriter for hero "products" word rotation ────────
  const host = $('.type-host');
  if (host) {
    const words = ['products', 'systems', 'interfaces', 'tools', 'experiences'];
    let idx = 0, cur = words[0], charIdx = cur.length, deleting = false;
    function type() {
      const word = words[idx];
      if (!deleting) {
        cur = word.slice(0, ++charIdx);
        if (charIdx === word.length) { deleting = true; setTimeout(type, 2200); return; }
      } else {
        cur = word.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; idx = (idx + 1) % words.length; }
      }
      host.textContent = cur;
      setTimeout(type, deleting ? 40 : 90);
    }
    // Start after hero animations finish
    setTimeout(() => { host.textContent = ''; charIdx = 0; type(); }, 2000);
  }
})();


/* ════════════════════════════════════════════════════════════
   v7.1 — Extras: scroll progress, back-to-top, GitHub stats
   ════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);

  // ── Scroll progress bar ───────────────────────────────────
  const bar = $('#scrollProgress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = Math.min(p, 100) + '%';
    }, { passive: true });
  }

  // ── Back-to-top button ────────────────────────────────────
  const top = $('#backToTop');
  if (top) {
    window.addEventListener('scroll', () => {
      top.classList.toggle('visible', window.scrollY > 480);
    }, { passive: true });
    top.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Live GitHub stats fetch ───────────────────────────────
  const ghRepos = $('#ghRepos');
  const ghFollowers = $('#ghFollowers');
  const ghStars = $('#ghStars');
  if (ghRepos && ghFollowers && ghStars) {
    // Animate number helper
    function animateNum(el, to, dur = 1200) {
      if (to < 1) { el.textContent = '0'; return; }
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    fetch('https://api.github.com/users/Majenayu')
      .then(r => r.ok ? r.json() : null)
      .then(user => {
        if (!user) return;
        animateNum(ghRepos, user.public_repos || 0);
        animateNum(ghFollowers, user.followers || 0);
        return fetch('https://api.github.com/users/Majenayu/repos?per_page=100');
      })
      .then(r => r ? r.json() : null)
      .then(repos => {
        if (!repos || !Array.isArray(repos)) return;
        const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        animateNum(ghStars, totalStars);
      })
      .catch(() => {
        // Fallback: show a dash if API fails (rate limit etc.)
        ghRepos.textContent = '—';
        ghFollowers.textContent = '—';
        ghStars.textContent = '—';
      });
  }
})();
