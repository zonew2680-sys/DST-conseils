document.addEventListener("DOMContentLoaded", function() {

  // ── LOADER ──
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => { loader.classList.add('hidden'); }, 2200);
  });

  // ── HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  function openMenu() {
    mobileMenu.style.display = 'flex';
    mobileMenu.style.flexDirection = 'column';
    requestAnimationFrame(() => { mobileMenu.classList.add('open'); });
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { mobileMenu.style.display = 'none'; }, 500);
  }
  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // ── CURSOR ──
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (cursor && ring) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.8)';
        cursor.style.background = 'rgba(200,169,110,0.6)';
        ring.style.width = '64px'; ring.style.height = '64px';
        ring.style.borderColor = 'rgba(200,169,110,0.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--or)';
        ring.style.width = '36px'; ring.style.height = '36px';
        ring.style.borderColor = 'var(--or)';
      });
    });
  }

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });

  // ── REVEAL ON SCROLL ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = (i * 0.05).toFixed(2);
    observer.observe(el);
  });

});