document.addEventListener("DOMContentLoaded", function() {

// ── LOADER ──
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2200);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

function openMenu() {
  mobileMenu.style.display = 'flex';
  requestAnimationFrame(() => {
    mobileMenu.classList.add('open');
  });
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    mobileMenu.style.display = 'none';
  }, 500);
}

if (hamburger) hamburger.addEventListener('click', openMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
if (cursor && ring) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .domaine-card, .avocat-card, select').forEach(el => {
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
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  // Stagger cards in the same grid
  const parent = el.parentElement;
  const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  if (parent.classList.contains('domaines-grid') || parent.classList.contains('equipe-grid') || parent.classList.contains('about-values')) {
    el.dataset.delay = (idx * 0.1).toFixed(1);
  }
  observer.observe(el);
});

// ── COUNTER ANIMATION ──
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.chiffre-num');
      if (!numEl || numEl.dataset.animated) return;
      numEl.dataset.animated = '1';
      const target = parseInt(numEl.dataset.target);
      const duration = 2000;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        numEl.textContent = Math.round(ease * target).toLocaleString('fr-FR');
        if (progress < 1) requestAnimationFrame(tick);
        else numEl.textContent = target.toLocaleString('fr-FR');
      }
      requestAnimationFrame(tick);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.chiffre-item').forEach(el => counterObserver.observe(el));

// ── SLIDER TÉMOIGNAGES ──
const track = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

if (track) {
  const slides = Array.from(track.children);
  let currentIndex = 0;
  let autoSlide;

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
    autoSlide = setInterval(goNext, 4000);
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
const counterFill = document.getElementById('counterFill');
const slideCurrentNum = document.getElementById('slideCurrentNum');
const slideTotalNum = document.getElementById('slideTotalNum');

if (heroSlides.length > 0) {
  let heroIndex = 0;
  const total = heroSlides.length;

  if (slideTotalNum) slideTotalNum.textContent = String(total).padStart(2, '0');
  if (counterFill) counterFill.style.width = '0%';
  // Start first fill
  setTimeout(() => { if (counterFill) counterFill.style.width = '100%'; }, 100);

  setInterval(() => {
    heroSlides[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + 1) % total;
    heroSlides[heroIndex].classList.add('active');
    if (slideCurrentNum) slideCurrentNum.textContent = String(heroIndex + 1).padStart(2, '0');
    if (counterFill) {
      counterFill.style.transition = 'none';
      counterFill.style.width = '0%';
      setTimeout(() => {
        counterFill.style.transition = 'width 6s linear';
        counterFill.style.width = '100%';
      }, 50);
    }
  }, 6000);
}

// ── SMOOTH ACTIVE NAV LINKS ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id ? 'var(--or)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// ── PARALLAX HERO ──
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
  }
});

}); // fin DOMContentLoaded