(function () {
  'use strict';
  var toggle = document.querySelector('.js-colorlib-nav-toggle');
  function syncMenu() {
    toggle.setAttribute('aria-expanded', String(document.body.classList.contains('offcanvas')));
  }
  new MutationObserver(syncMenu).observe(document.body, {attributes:true, attributeFilter:['class']});
  toggle.addEventListener('keydown', function (event) {
    if (event.key === ' ') { event.preventDefault(); toggle.click(); }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      document.body.classList.remove('offcanvas'); toggle.classList.remove('active'); syncMenu();
    }
  });
  document.getElementById('gform').addEventListener('submit', function (event) {
    event.preventDefault();
    if (!this.reportValidity()) return;
    var data = new FormData(this);
    var body = 'From: ' + data.get('name') + '\nReply email: ' + data.get('email') + '\n\n' + data.get('message');
    window.location.href = 'mailto:mukhiddinsolijonov101@gmail.com?subject=' + encodeURIComponent(data.get('subject')) + '&body=' + encodeURIComponent(body);
  });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    jQuery.fx.off = true;
    jQuery('.animate-box').addClass('animated');
  }
}());
