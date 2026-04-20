// ===== SHARED NAV HTML =====
const NAV_HTML = `
<nav class="navbar">
  <a href="index.html" class="nav-logo">
    <img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/nfl.png&w=100&h=100" alt="NFL">
    NFL <span>PT</span>
  </a>
  <div class="nav-links">
    <a href="index.html" data-i18n="nav-home">Home</a>
    <a href="nfl.html" data-i18n="nav-nfl">NFL</a>
    <a href="portugal.html" data-i18n="nav-portugal">Portugal</a>
    <a href="equipas.html" data-i18n="nav-equipas">Equipas</a>
    <a href="jogadores.html" data-i18n="nav-jogadores">Jogadores</a>
    <a href="treinadores.html" data-i18n="nav-treinadores">Treinadores</a>
    <a href="classificacoes.html" data-i18n="nav-classificacoes">Classificações</a>
    <a href="estatisticas.html" data-i18n="nav-estatisticas">Estatísticas</a>
    <a href="calendario.html" data-i18n="nav-calendario">Calendário</a>
    <a href="noticias.html" data-i18n="nav-noticias">Notícias</a>
    <a href="quiz.html" data-i18n="nav-quiz">Quiz</a>
    <a href="sobre.html" data-i18n="nav-sobre">Sobre</a>
  </div>
  <div class="nav-actions">
    <button class="btn-lang" onclick="toggleLang()" title="Switch to English" style="background:var(--bg-card,#111827);border:1px solid var(--border,rgba(255,255,255,.15));color:var(--text-primary,#f0f4ff);font-family:inherit;font-size:0.78rem;font-weight:700;letter-spacing:0.04em;padding:0.35rem 0.65rem;border-radius:6px;cursor:pointer;transition:all 0.2s;white-space:nowrap;">🌐 EN</button>
    <button class="btn-theme" onclick="toggleTheme()" title="Mudar Tema">☀️</button>
    <button class="hamburger" onclick="toggleMobileNav()">☰</button>
  </div>
</nav>
<div class="mobile-nav">
  <a href="index.html" data-i18n="nav-home">🏠 Home</a>
  <a href="nfl.html" data-i18n="nav-nfl">🏈 NFL</a>
  <a href="portugal.html" data-i18n="nav-portugal">🇵🇹 Portugal</a>
  <a href="equipas.html" data-i18n="nav-equipas">🏟 Equipas</a>
  <a href="jogadores.html" data-i18n="nav-jogadores">👤 Jogadores</a>
  <a href="treinadores.html" data-i18n="nav-treinadores">🧑‍🏫 Treinadores</a>
  <a href="classificacoes.html" data-i18n="nav-classificacoes">📊 Classificações</a>
  <a href="estatisticas.html" data-i18n="nav-estatisticas">📈 Estatísticas</a>
  <a href="calendario.html" data-i18n="nav-calendario">📅 Calendário</a>
  <a href="noticias.html" data-i18n="nav-noticias">📰 Notícias</a>
  <a href="quiz.html" data-i18n="nav-quiz">🧠 Quiz</a>
  <a href="contactos.html" data-i18n="nav-contactos">📞 Contactos</a>
  <a href="sobre.html" data-i18n="nav-sobre">ℹ️ Sobre</a>
  <a href="admin.html">⚙️ Admin</a>
</div>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo">NFL <span>PT</span></span>
        <p data-i18n="footer-desc">O destino português para o futebol americano. Notícias, estatísticas, classificações e muito mais sobre a NFL e o futebol americano em Portugal.</p>
        <div class="footer-social">
          <a href="#" title="Instagram">📸</a>
          <a href="#" title="Twitter/X">𝕏</a>
          <a href="#" title="YouTube">▶</a>
          <a href="#" title="Facebook">f</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>NFL</h4>
        <ul>
          <li><a href="nfl.html">Sobre a NFL</a></li>
          <li><a href="equipas.html" data-i18n="nav-equipas">Equipas</a></li>
          <li><a href="jogadores.html" data-i18n="nav-jogadores">Jogadores</a></li>
          <li><a href="treinadores.html" data-i18n="nav-treinadores">Treinadores</a></li>
          <li><a href="classificacoes.html" data-i18n="nav-classificacoes">Classificações</a></li>
          <li><a href="calendario.html" data-i18n="nav-calendario">Calendário</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Portugal</h4>
        <ul>
          <li><a href="portugal.html">FPFA</a></li>
          <li><a href="portugal.html#historia">História</a></li>
          <li><a href="portugal.html#competicoes">Competições</a></li>
          <li><a href="portugal.html#flag">Flag Football</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Site</h4>
        <ul>
          <li><a href="sobre.html" data-i18n="nav-sobre">Sobre o Projeto</a></li>
          <li><a href="quiz.html" data-i18n="nav-quiz">Quiz NFL</a></li>
          <li><a href="noticias.html" data-i18n="nav-noticias">Notícias</a></li>
          <li><a href="contactos.html" data-i18n="nav-contactos">Contactos</a></li>
          <li><a href="termos.html">Privacidade</a></li>
          <li><a href="admin.html">Admin</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p data-i18n="footer-copy">© 2025 NFL PT. Todos os direitos reservados. Projeto Académico — PAP.</p>
      <p data-i18n="footer-disc">NFL™ e todos os logos são propriedade da National Football League.</p>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.innerHTML = NAV_HTML;
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;
});
