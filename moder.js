document.addEventListener("DOMContentLoaded", function() {

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

function openMenu() {
  mobileMenu.style.display = 'flex';
  mobileOverlay.style.display = 'block';
  requestAnimationFrame(() => {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
  });
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    mobileMenu.style.display = 'none';
    mobileOverlay.style.display = 'none';
  }, 450);
}

if (hamburger) hamburger.addEventListener('click', openMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    }, 60);
  });
  document.querySelectorAll('a, button, .domaine-card, .avocat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursor.style.background = 'rgba(200,169,110,0.5)';
      ring.style.width = '60px'; ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'var(--or)';
      ring.style.width = '36px'; ring.style.height = '36px';
    });
  });
}

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
});

// ── REVEAL ON SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── SLIDER TEMOIGNAGES ──
const track = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

if (track) {
  const slides = Array.from(track.children);
  let currentIndex = 0;
  let autoSlide;

  // Creer les dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      clearInterval(autoSlide);
      currentIndex = i;
      scrollToIndex(i);
      startAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  function getDots() { return document.querySelectorAll('.dot'); }

  function scrollToIndex(i) {
    track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
  }

  function updateDots(index) {
    getDots().forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    scrollToIndex(currentIndex);
  }

  function startAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(goNext, 3500);
  }

  startAutoSlide();

  track.addEventListener('scroll', () => {
    const slideW = slides[0].offsetWidth;
    if (slideW > 0) {
      const index = Math.round(track.scrollLeft / slideW);
      currentIndex = index;
      updateDots(index);
    }
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, slides.length - 1);
    scrollToIndex(currentIndex);
    startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(currentIndex);
    startAutoSlide();
  });

  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', startAutoSlide);
}

// ── HERO SLIDESHOW ──
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 0) {
  let heroIndex = 0;
  function nextHeroSlide() {
    heroSlides[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add('active');
  }
  setInterval(nextHeroSlide, 6000);
}

}); // fin DOMContentLoaded