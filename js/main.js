document.documentElement.classList.add('js');

const content = document.querySelector('.content-pane');
const sidebar = document.querySelector('[data-sidebar]');
const panel = document.querySelector('#sidebar-panel');
const toggle = document.querySelector('.menu-toggle');
const mobileQuery = window.matchMedia('(max-width: 64rem)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);

function setMenu(open, returnFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  panel.classList.toggle('is-open', open);
  if (returnFocus) toggle.focus();
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));

document.addEventListener('click', (event) => {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) {
    if (mobileQuery.matches && !sidebar.contains(event.target)) setMenu(false);
    return;
  }

  const target = document.querySelector(anchor.hash);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', anchor.hash);
  if (mobileQuery.matches) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});

mobileQuery.addEventListener('change', () => setMenu(false));

let activeFrame;
function updateActiveNav() {
  activeFrame = null;
  const rootTop = mobileQuery.matches ? 0 : content.getBoundingClientRect().top;
  const marker = rootTop + window.innerHeight * .28;
  let active = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= marker) active = section;
  });

  navLinks.forEach((link) => {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

function scheduleActiveNav() {
  if (!activeFrame) activeFrame = requestAnimationFrame(updateActiveNav);
}

content.addEventListener('scroll', scheduleActiveNav, { passive: true });
window.addEventListener('scroll', scheduleActiveNav, { passive: true });
window.addEventListener('resize', scheduleActiveNav, { passive: true });

let revealObserver;
function setupReveals() {
  revealObserver?.disconnect();
  const targets = [...document.querySelectorAll('.reveal')];

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
    rootMargin: '0px 0px -8% 0px',
    threshold: .05,
  });

  targets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min(index % 3, 2) * 55}ms`;
    revealObserver.observe(target);
  });
}

mobileQuery.addEventListener('change', setupReveals);
reducedMotion.addEventListener('change', setupReveals);

requestAnimationFrame(() => {
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ block: 'start' });
  updateActiveNav();
  setupReveals();
});
