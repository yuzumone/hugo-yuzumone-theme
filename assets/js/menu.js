const header = document.querySelector('.site-header');
const toggle = header?.querySelector('.menu-toggle');
const menu = header?.querySelector('#site-menu');

if (toggle && menu) {
  const mobile = window.matchMedia('(max-width: 640px)');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setOpen(false);
  });

  menu.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });

  mobile.addEventListener('change', () => {
    if (mobile.matches && menu.contains(document.activeElement)) toggle.focus();
    setOpen(false);
  });

  header.classList.add('has-menu-toggle');
  toggle.hidden = false;
}
