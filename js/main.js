const sidebar = document.querySelector('[data-sidebar]');
const navigation = document.querySelector('.navigation');
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('#navigation-links');
const content = document.querySelector('.portfolio-content');
const mobileViewport = window.matchMedia('(max-width: 64rem)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.getElementById(link.hash.slice(1)))
  .filter(Boolean);
let hashNavigation = false;
let hashNavigationTimer;

function finishHashNavigation() {
  clearTimeout(hashNavigationTimer);
  hashNavigation = false;
}

function trackHashNavigation() {
  hashNavigation = true;
  clearTimeout(hashNavigationTimer);
  // Renewed by scroll events until an anchor/history scroll has settled.
  hashNavigationTimer = setTimeout(finishHashNavigation, 180);
}

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// Without JavaScript, the mobile navigation remains expanded and usable.
sidebar.classList.add('is-enhanced');
toggle.hidden = false;

function setMenuOpen(open, restoreFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  panel.classList.toggle('is-open', open);
  if (restoreFocus) toggle.focus();
}

function setActiveSection(id) {
  sectionLinks.forEach((link) => {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function scrollToHash(hash, behavior = reducedMotion.matches ? 'auto' : 'smooth') {
  if (!hash || hash === '#main') {
    content.focus({ preventScroll: true });
    return;
  }

  const destination = document.getElementById(hash.slice(1));
  if (!destination) return;
  trackHashNavigation();

  if (behavior === 'auto') {
    const destinationTop = destination.getBoundingClientRect().top;
    const scrollMargin = Number.parseFloat(getComputedStyle(destination).scrollMarginTop) || 0;

    if (mobileViewport.matches) {
      const scrollPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      window.scrollTo({
        top: window.scrollY + destinationTop - scrollPadding - scrollMargin,
        behavior: 'instant',
      });
    } else {
      const contentTop = content.getBoundingClientRect().top;
      const scrollPadding = Number.parseFloat(getComputedStyle(content).scrollPaddingTop) || 0;
      content.scrollTo({
        top: content.scrollTop + destinationTop - contentTop - scrollPadding - scrollMargin,
        behavior: 'instant',
      });
    }
  } else {
    destination.scrollIntoView({ behavior, block: 'start' });
  }
  destination.focus({ preventScroll: true });
  setActiveSection(destination.id);
}

toggle.addEventListener('click', () => {
  setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const destination = document.getElementById(link.hash.slice(1));
  if (mobileViewport.matches && sidebar.contains(link)) setMenuOpen(false);
  if (!destination && link.hash !== '#main') return;

  event.preventDefault();
  if (location.hash !== link.hash) history.pushState(null, '', link.hash);
  scrollToHash(link.hash);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false, true);
  }
});

document.addEventListener('click', (event) => {
  if (mobileViewport.matches && !sidebar.contains(event.target) && toggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false, panel.contains(document.activeElement));
  }
});

sidebar.addEventListener('focusout', (event) => {
  if (mobileViewport.matches && event.relatedTarget && !sidebar.contains(event.relatedTarget)) {
    setMenuOpen(false);
  }
});

mobileViewport.addEventListener('change', () => {
  const focusWillHide = mobileViewport.matches && panel.contains(document.activeElement);
  const toggleWillHide = !mobileViewport.matches && document.activeElement === toggle;
  setMenuOpen(false, focusWillHide);
  if (toggleWillHide) sidebar.querySelector('.logo').focus();
  requestAnimationFrame(updateActiveSection);
});

let trackingFrame;
let scrolledManually = false;
function updateActiveSection() {
  trackingFrame = undefined;
  const syncHash = scrolledManually && !hashNavigation;
  scrolledManually = false;
  const rootTop = mobileViewport.matches ? 0 : content.getBoundingClientRect().top;
  const viewportHeight = mobileViewport.matches ? window.innerHeight : content.clientHeight;
  const trackingLine = rootTop + viewportHeight * 0.3;
  let active = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= trackingLine) active = section;
  });

  if (active) {
    setActiveSection(active.id);
    if (syncHash && location.hash !== `#${active.id}`) {
      history.replaceState(history.state, '', `#${active.id}`);
    }
  }
}

function requestTrackingUpdate(event) {
  if (event.type === 'scroll') {
    if (hashNavigation) trackHashNavigation();
    else scrolledManually = true;
  }
  if (trackingFrame) return;
  trackingFrame = requestAnimationFrame(updateActiveSection);
}

content.addEventListener('scroll', requestTrackingUpdate, { passive: true });
window.addEventListener('scroll', requestTrackingUpdate, { passive: true });
window.addEventListener('resize', requestTrackingUpdate, { passive: true });

// User input can interrupt a smooth anchor scroll and resume hash syncing.
window.addEventListener('wheel', finishHashNavigation, { passive: true });
window.addEventListener('touchstart', finishHashNavigation, { passive: true });
window.addEventListener('pointerdown', finishHashNavigation, { passive: true });
document.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)
      && !event.target.closest('input, textarea, select, [contenteditable="true"]')) {
    finishHashNavigation();
  }
});

let historyFrame;
function restoreHashPosition() {
  cancelAnimationFrame(historyFrame);
  const hash = location.hash || '#home';
  trackHashNavigation();
  historyFrame = requestAnimationFrame(() => {
    scrollToHash(hash, 'auto');
    historyFrame = requestAnimationFrame(() => scrollToHash(hash, 'auto'));
  });
}

window.addEventListener('popstate', restoreHashPosition);
window.addEventListener('hashchange', restoreHashPosition);

requestAnimationFrame(() => {
  if (location.hash) scrollToHash(location.hash, 'auto');
  else setActiveSection('home');
  updateActiveSection();
});

// Reveal content once, with a root matching the active scrolling layout.
// No initial hidden markup: unavailable/failed enhancement leaves content readable.
const revealTargets = [...content.querySelectorAll([
  '.about-content', '.expertise-intro', '.section-header',
  '.pawpal-intro > .section-eyebrow', '.pawpal-intro > .project-identifier',
  '.pawpal-intro > h2', '.venturo-header', '.enginx-content',
  '.pawpal-technology > h3', '.pawpal-features > h3',
  '.project-engineering h3', '.pawpal-architecture > h3',
  '.venturo-section-heading', '.project-browser',
  '.expertise-group', '.pawpal-feature-grid > article',
  '.engineering-decisions > div', '.venturo-decisions > article',
  '.career-entry', '.career-content li', '.education-entry',
  '.contact-header', '.contact-details', '.contact-footer',
].join(','))];
let revealObserver;

function showReveal(target) {
  target.classList.remove('is-pending');
  target.classList.add('is-visible');
  revealObserver?.unobserve(target);
}

function showAllReveals() {
  revealObserver?.disconnect();
  revealTargets.forEach(showReveal);
}

function configureReveals() {
  revealObserver?.disconnect();
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    showAllReveals();
    return;
  }

  try {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) showReveal(entry.target);
      });
    }, {
      root: mobileViewport.matches ? null : content,
      rootMargin: '0px 0px -24px 0px',
      threshold: 0,
    });

    const viewportBottom = mobileViewport.matches
      ? window.innerHeight
      : content.getBoundingClientRect().bottom;

    revealTargets.forEach((target) => {
      if (target.classList.contains('is-visible')) return;
      // Already read / initially visible content never flashes or replays.
      if (target.getBoundingClientRect().top < viewportBottom - 24) {
        showReveal(target);
        return;
      }
      revealObserver.observe(target);
      target.classList.add('reveal', 'is-pending');
      if (target.matches('.project-browser')) target.classList.add('reveal--image');
    });
  } catch {
    showAllReveals();
  }
}

content.querySelectorAll('.expertise-grid, .pawpal-feature-grid, .engineering-decisions, .venturo-decisions, .career-content ul')
  .forEach((group) => {
    [...group.children].forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 60}ms`);
    });
  });

// Tabbing to a link reveals its containing block immediately.
content.addEventListener('focusin', (event) => {
  for (let target = event.target; target && target !== content; target = target.parentElement) {
    if (target.classList.contains('is-pending')) showReveal(target);
  }
});
mobileViewport.addEventListener('change', configureReveals);
reducedMotion.addEventListener('change', configureReveals);
configureReveals();
