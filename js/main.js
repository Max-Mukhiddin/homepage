const content = document.querySelector('.content-pane');
const sidebar = document.querySelector('[data-sidebar]');
const panel = document.querySelector('#sidebar-panel');
const toggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);
const mobileQuery = window.matchMedia('(max-width: 64rem)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeFrame = 0;
let lockedSection = null;
let lockTimer = 0;

function setMenu(open, returnFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  panel.classList.toggle('is-open', open);
  if (returnFocus) toggle.focus();
}

function setActiveSection(id) {
  navLinks.forEach((link) => {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

function unlockSection() {
  window.clearTimeout(lockTimer);
  lockedSection = null;
}

function updateActiveSection() {
  activeFrame = 0;
  if (lockedSection) return;

  const viewportTop = mobileQuery.matches ? 0 : content.getBoundingClientRect().top;
  const marker = viewportTop + window.innerHeight * .3;
  let current = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= marker) current = section;
  });

  if (current) setActiveSection(current.id);
}

function scheduleActiveSection() {
  if (!activeFrame) activeFrame = window.requestAnimationFrame(updateActiveSection);
}

function goToSection(target, updateHistory = true) {
  lockedSection = target.id;
  window.clearTimeout(lockTimer);
  lockTimer = window.setTimeout(unlockSection, reducedMotion.matches ? 50 : 900);
  setActiveSection(target.id);

  if (updateHistory && window.location.hash !== `#${target.id}`) {
    window.history.pushState(null, '', `#${target.id}`);
  }

  target.scrollIntoView({
    behavior: reducedMotion.matches ? 'auto' : 'smooth',
    block: 'start',
  });
}

toggle.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('click', (event) => {
  const anchor = event.target.closest('a[href^="#"]');

  if (!anchor) {
    if (mobileQuery.matches && !sidebar.contains(event.target)) setMenu(false);
    return;
  }

  const target = document.querySelector(anchor.hash);
  if (!target) return;
  event.preventDefault();
  goToSection(target);
  if (mobileQuery.matches) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false, true);
  }
});

window.addEventListener('popstate', () => {
  const target = document.querySelector(window.location.hash || '#home');
  if (target) goToSection(target, false);
});

content.addEventListener('scroll', scheduleActiveSection, { passive: true });
window.addEventListener('scroll', scheduleActiveSection, { passive: true });
window.addEventListener('resize', scheduleActiveSection, { passive: true });
window.addEventListener('wheel', unlockSection, { passive: true });
window.addEventListener('touchstart', unlockSection, { passive: true });
mobileQuery.addEventListener('change', () => {
  setMenu(false);
  setupReveals();
  scheduleActiveSection();
});

let revealObserver;

function setupReveals() {
  revealObserver?.disconnect();
  const targets = [...document.querySelectorAll('.reveal:not(.is-visible)')];

  document.querySelectorAll('.strength-item').forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${index * 90}ms`);
  });

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {
    root: mobileQuery.matches ? null : content,
    rootMargin: '0px 0px -9% 0px',
    threshold: .06,
  });

  targets.forEach((target) => revealObserver.observe(target));
}

reducedMotion.addEventListener('change', setupReveals);

window.requestAnimationFrame(() => {
  const initialTarget = document.querySelector(window.location.hash || '#home');
  if (initialTarget && initialTarget.id !== 'home') {
    initialTarget.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  setActiveSection(initialTarget?.id || 'home');
  setupReveals();
  scheduleActiveSection();
});
