const header = document.querySelector('[data-header]');
const navigation = document.querySelector('.navigation');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('#navigation-links');
const mobileViewport = window.matchMedia('(max-width: 64rem)');

// Without JavaScript, the navigation remains visible and usable.
navigation.classList.add('is-enhanced');
toggle.hidden = false;

function setMenuOpen(open, restoreFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  links.classList.toggle('is-open', open);
  header.classList.toggle('is-menu-open', open);
  if (restoreFocus) toggle.focus();
}

toggle.addEventListener('click', () => {
  setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || toggle.getAttribute('aria-expanded') !== 'true') return;
  const destination = link.hash && link.origin === location.origin
    ? document.getElementById(link.hash.slice(1))
    : null;
  // Keep focus out of the hidden menu, including while future sections are absent.
  setMenuOpen(false, !destination);
  if (destination) {
    if (!destination.hasAttribute('tabindex')) destination.tabIndex = -1;
    destination.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false, true);
  }
});

document.addEventListener('click', (event) => {
  if (!header.contains(event.target) && toggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false, links.contains(document.activeElement));
  }
});

navigation.addEventListener('focusout', (event) => {
  if (event.relatedTarget && !navigation.contains(event.relatedTarget)) setMenuOpen(false);
});

mobileViewport.addEventListener('change', () => {
  const focusWillHide = mobileViewport.matches && links.contains(document.activeElement);
  const toggleWillHide = !mobileViewport.matches && document.activeElement === toggle;
  setMenuOpen(false, focusWillHide);
  if (toggleWillHide) navigation.querySelector('.logo').focus();
});

function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Active-section observation will be added when the remaining sections exist.
