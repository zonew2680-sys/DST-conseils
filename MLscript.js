const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorRing.style.width = '56px'; cursorRing.style.height = '56px'; });
    el.addEventListener('mouseleave', () => { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; });
  });
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 60); });
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileOverlay = document.getElementById('mobileOverlay');
  function openMenu() { mobileMenu.style.display = 'flex'; mobileOverlay.style.display = 'block'; document.body.style.overflow = 'hidden'; hamburger.classList.add('active'); }
  function closeMenu() { mobileMenu.style.display = 'none'; mobileOverlay.style.display = 'none'; document.body.style.overflow = ''; hamburger.classList.remove('active'); }
  hamburger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileOverlay.addEventListener('click', closeMenu);

  // ── LOADER ──
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2200);
});