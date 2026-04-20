/* ===== NFL PT — SHARED JAVASCRIPT ===== */

// ── THEME ──────────────────────────────────────────────
const THEME_KEY = 'nflpt-theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeBtn(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeBtn(next);
}

function updateThemeBtn(theme) {
  document.querySelectorAll('.btn-theme').forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
  });
}

// ── NAVBAR ─────────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Set active link
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

function toggleMobileNav() {
  const nav = document.querySelector('.mobile-nav');
  if (nav) nav.classList.toggle('open');
}

// ── SCROLL REVEAL ──────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
}

// ── COUNTER ANIMATION ──────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent);
  const duration = 1500;
  const start = performance.now();
  const run = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
  });
  counters.forEach(c => obs.observe(c));
}

// ── TABS ───────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tabs]') || btn.parentElement.parentElement;
      const target = btn.dataset.tab;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const content = group.querySelector(`[data-tab-content="${target}"]`);
      if (content) content.classList.add('active');
    });
  });
}

// ── ACCORDION ──────────────────────────────────────────
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
      const item = h.parentElement;
      item.classList.toggle('open');
    });
  });
}

// ── NEWSLETTER ─────────────────────────────────────────
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value) return;
      const email = input.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Por favor, insere um email válido.', 'error');
        return;
      }
      // Store in localStorage
      const key = 'nflpt-subscribers';
      const subs = JSON.parse(localStorage.getItem(key) || '[]');
      if (subs.includes(email)) {
        showToast('Este email já está subscrito! 📬', 'error');
        return;
      }
      subs.push(email);
      localStorage.setItem(key, JSON.stringify(subs));
      // Visual feedback
      input.value = '';
      const btn = form.querySelector('button');
      if (btn) { const orig = btn.textContent; btn.textContent = '✓ Subscrito!'; btn.disabled = true; setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000); }
      showToast('Subscrito com sucesso! Bem-vindo à família NFL PT! 🏈', 'success');
    });
  });
}

// ── CONTACT FORM ───────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
    form.reset();
  });
}

// ── TOAST ──────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:2rem; right:2rem; z-index:9999;
    background: ${type === 'success' ? '#22c55e' : '#e63946'};
    color: white; padding: 1rem 1.5rem; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3); max-width: 350px;
    animation: fadeInDown 0.4s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'fadeIn 0.3s ease reverse'; setTimeout(() => toast.remove(), 300); }, 4000);
}

// ── ESPN API ───────────────────────────────────────────
const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl';
const ESPN_V2 = 'https://site.api.espn.com/apis/v2/sports/football/nfl';

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function getNFLScoreboard() {
  return fetchJSON(`${ESPN_BASE}/scoreboard`);
}

async function getNFLStandings() {
  return fetchJSON(`${ESPN_V2}/standings?season=2025`);
}

async function getNFLNews(limit = 12) {
  return fetchJSON(`${ESPN_BASE}/news?limit=${limit}`);
}

async function getNFLTeams() {
  return fetchJSON(`${ESPN_BASE}/teams`);
}

// ── NFL DATA (REAL 2024-25 SEASON) ─────────────────────
const NFL_TEAMS = [
  { abbr: 'ari', name: 'Arizona Cardinals', city: 'Arizona', conf: 'NFC', div: 'West' },
  { abbr: 'atl', name: 'Atlanta Falcons', city: 'Atlanta', conf: 'NFC', div: 'South' },
  { abbr: 'bal', name: 'Baltimore Ravens', city: 'Baltimore', conf: 'AFC', div: 'North' },
  { abbr: 'buf', name: 'Buffalo Bills', city: 'Buffalo', conf: 'AFC', div: 'East' },
  { abbr: 'car', name: 'Carolina Panthers', city: 'Carolina', conf: 'NFC', div: 'South' },
  { abbr: 'chi', name: 'Chicago Bears', city: 'Chicago', conf: 'NFC', div: 'North' },
  { abbr: 'cin', name: 'Cincinnati Bengals', city: 'Cincinnati', conf: 'AFC', div: 'North' },
  { abbr: 'cle', name: 'Cleveland Browns', city: 'Cleveland', conf: 'AFC', div: 'North' },
  { abbr: 'dal', name: 'Dallas Cowboys', city: 'Dallas', conf: 'NFC', div: 'East' },
  { abbr: 'den', name: 'Denver Broncos', city: 'Denver', conf: 'AFC', div: 'West' },
  { abbr: 'det', name: 'Detroit Lions', city: 'Detroit', conf: 'NFC', div: 'North' },
  { abbr: 'gb', name: 'Green Bay Packers', city: 'Green Bay', conf: 'NFC', div: 'North' },
  { abbr: 'hou', name: 'Houston Texans', city: 'Houston', conf: 'AFC', div: 'South' },
  { abbr: 'ind', name: 'Indianapolis Colts', city: 'Indianapolis', conf: 'AFC', div: 'South' },
  { abbr: 'jax', name: 'Jacksonville Jaguars', city: 'Jacksonville', conf: 'AFC', div: 'South' },
  { abbr: 'kc', name: 'Kansas City Chiefs', city: 'Kansas City', conf: 'AFC', div: 'West' },
  { abbr: 'lv', name: 'Las Vegas Raiders', city: 'Las Vegas', conf: 'AFC', div: 'West' },
  { abbr: 'lac', name: 'Los Angeles Chargers', city: 'Los Angeles', conf: 'AFC', div: 'West' },
  { abbr: 'lar', name: 'Los Angeles Rams', city: 'Los Angeles', conf: 'NFC', div: 'West' },
  { abbr: 'mia', name: 'Miami Dolphins', city: 'Miami', conf: 'AFC', div: 'East' },
  { abbr: 'min', name: 'Minnesota Vikings', city: 'Minnesota', conf: 'NFC', div: 'North' },
  { abbr: 'ne', name: 'New England Patriots', city: 'New England', conf: 'AFC', div: 'East' },
  { abbr: 'no', name: 'New Orleans Saints', city: 'New Orleans', conf: 'NFC', div: 'South' },
  { abbr: 'nyg', name: 'New York Giants', city: 'New York', conf: 'NFC', div: 'East' },
  { abbr: 'nyj', name: 'New York Jets', city: 'New York', conf: 'AFC', div: 'East' },
  { abbr: 'phi', name: 'Philadelphia Eagles', city: 'Philadelphia', conf: 'NFC', div: 'East' },
  { abbr: 'pit', name: 'Pittsburgh Steelers', city: 'Pittsburgh', conf: 'AFC', div: 'North' },
  { abbr: 'sf', name: 'San Francisco 49ers', city: 'San Francisco', conf: 'NFC', div: 'West' },
  { abbr: 'sea', name: 'Seattle Seahawks', city: 'Seattle', conf: 'NFC', div: 'West' },
  { abbr: 'tb', name: 'Tampa Bay Buccaneers', city: 'Tampa Bay', conf: 'NFC', div: 'South' },
  { abbr: 'ten', name: 'Tennessee Titans', city: 'Tennessee', conf: 'AFC', div: 'South' },
  { abbr: 'wsh', name: 'Washington Commanders', city: 'Washington', conf: 'NFC', div: 'East' },
];

function getTeamLogo(abbr) {
  return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/${abbr}.png&w=150&h=150`;
}

function getPlayerPhoto(espnId) {
  return `https://a.espncdn.com/i/headshots/nfl/players/full/${espnId}.png`;
}

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initScrollReveal();
  initCounters();
  initTabs();
  initAccordion();
  initNewsletter();
  initContactForm();
});

window.toggleTheme = toggleTheme;
window.toggleMobileNav = toggleMobileNav;
window.showToast = showToast;
window.getTeamLogo = getTeamLogo;
window.getPlayerPhoto = getPlayerPhoto;
window.getNFLScoreboard = getNFLScoreboard;
window.getNFLStandings = getNFLStandings;
window.getNFLNews = getNFLNews;
window.NFL_TEAMS = NFL_TEAMS;
