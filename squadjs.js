// Fix image fallbacks pour Maître TOUAME
document.addEventListener('DOMContentLoaded', function() {
  const touameImg = document.querySelector('#touame .membre-portrait img');
  const touameFallback = document.querySelector('#touame .membre-initial-wrap');
  if (touameImg) {
    touameImg.addEventListener('error', function() {
      touameImg.style.display = 'none';
      if (touameFallback) touameFallback.style.display = 'flex';
    });
    // Si l'image est déjà en erreur (cas cache)
    if (touameImg.complete && touameImg.naturalWidth === 0) {
      touameImg.style.display = 'none';
      if (touameFallback) touameFallback.style.display = 'flex';
    }
  }

  // Navigation active au scroll
  const sections = document.querySelectorAll('.membre-section');
  const navItems = document.querySelectorAll('.membre-nav-item');

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          const isActive = item.getAttribute('href') === '#' + id;
          item.style.borderBottomColor = isActive ? 'var(--or)' : 'transparent';
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObs.observe(s));
});