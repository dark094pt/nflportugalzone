/* NFL PT — SHARED JS */
const getTheme=()=>localStorage.getItem('nflpt-theme')||'dark';
const setTheme=t=>{document.documentElement.setAttribute('data-theme',t);localStorage.setItem('nflpt-theme',t)};

document.addEventListener('DOMContentLoaded',()=>{
  setTheme(getTheme());
  initNav();initScrollReveal();initBackToTop();initTabs();initAccordion();setActiveNav();
});

function initNav(){
  const navbar=document.querySelector('.navbar')||document.querySelector('.site-header');
  const hamburger=document.querySelector('.hamburger');
  const mobileMenu=document.querySelector('.mobile-menu')||document.querySelector('.mobile-nav');
  const themeToggle=document.querySelector('.theme-toggle');
  window.addEventListener('scroll',()=>{navbar?.classList.toggle('scrolled',scrollY>20);updateBackToTop()});
  hamburger?.addEventListener('click',()=>{
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
    document.body.style.overflow=mobileMenu?.classList.contains('open')?'hidden':'';
  });
  document.querySelectorAll('.mobile-menu-link,.mobile-nav a').forEach(l=>l.addEventListener('click',()=>{
    hamburger?.classList.remove('open');mobileMenu?.classList.remove('open');document.body.style.overflow='';
  }));
  themeToggle?.addEventListener('click',()=>setTheme(getTheme()==='dark'?'light':'dark'));
}

function setActiveNav(){
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-link,.mobile-menu-link,.mobile-nav a').forEach(l=>{const h=l.getAttribute('href');if(h===path||(path===''&&h==='index.html'))l.classList.add('active')});
}

function initScrollReveal(){
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

function initBackToTop(){document.querySelector('.back-to-top')?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}))}
function updateBackToTop(){document.querySelector('.back-to-top')?.classList.toggle('visible',scrollY>400)}

function initTabs(){
  document.querySelectorAll('.tabs').forEach(g=>g.querySelectorAll('.tab-btn').forEach(btn=>btn.addEventListener('click',()=>{
    const t=btn.dataset.tab;const c=btn.closest('.tabs-container')||btn.closest('section')||document;
    g.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    c.querySelectorAll('.tab-content').forEach(tc=>tc.classList.toggle('active',tc.dataset.tab===t));
  })));
}

function initAccordion(){
  document.querySelectorAll('.accordion-header').forEach(h=>h.addEventListener('click',()=>{
    const b=h.nextElementSibling,isOpen=h.classList.contains('open');
    const g=h.closest('.accordion-group');
    if(g){g.querySelectorAll('.accordion-header').forEach(x=>{x.classList.remove('open');x.nextElementSibling?.classList.remove('open')})}
    if(!isOpen){h.classList.add('open');b?.classList.add('open');}
  }));
}

function showNotification(msg,type='success'){
  document.querySelector('.notification')?.remove();
  const n=document.createElement('div');n.className='notification';
  n.style.cssText=`position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(20px);background:${type==='success'?'#16a34a':'#d50a0a'};color:#fff;padding:1rem 1.75rem;border-radius:10px;font-weight:600;font-size:.9rem;box-shadow:0 8px 30px rgba(0,0,0,.3);z-index:10000;opacity:0;transition:all .3s;max-width:90vw;text-align:center;`;
  n.textContent=msg;document.body.appendChild(n);
  requestAnimationFrame(()=>{n.style.opacity='1';n.style.transform='translateX(-50%) translateY(0)'});
  setTimeout(()=>{n.style.opacity='0';n.style.transform='translateX(-50%) translateY(20px)';setTimeout(()=>n.remove(),300)},4000);
}

function initNewsletter(id){
  const f=document.getElementById(id);if(!f)return;
  f.addEventListener('submit',e=>{e.preventDefault();const em=f.querySelector('input[type="email"]').value;
    if(!em||!em.includes('@')){showNotification('Email inválido.','error');return}
    showNotification('✅ Subscrito com sucesso! Bem-vindo(a) à família NFL PT!');f.reset();
  });
}

function initContactForm(id){
  const f=document.getElementById(id);if(!f)return;
  f.addEventListener('submit',e=>{e.preventDefault();
    const n=f.querySelector('[name="name"]')?.value;const em=f.querySelector('[name="email"]')?.value;const m=f.querySelector('[name="message"]')?.value;
    if(!n||!em||!m){showNotification('Preenche todos os campos.','error');return}
    if(!em.includes('@')){showNotification('Email inválido.','error');return}
    const san=s=>s.replace(/[<>"'&]/g,c=>({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','&':'&amp;'}[c]));
    showNotification(`✅ Mensagem enviada! Obrigado, ${san(n)}!`);f.reset();
  });
}

function animateCounter(el,target,dur=1500){
  const s=Date.now(),u=()=>{const p=Math.min((Date.now()-s)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(e*target).toLocaleString();if(p<1)requestAnimationFrame(u)};
  requestAnimationFrame(u);
}


window.NFLPT={showNotification,animateCounter,initNewsletter,initContactForm,getTeamLogo:null};

// Global wrappers for onclick= usage
function toggleTheme(){setTheme(getTheme()==="dark"?"light":"dark");}
