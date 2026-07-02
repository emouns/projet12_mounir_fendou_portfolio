/*  LOADER / SPLASH SCREEN */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Attendre 2 secondes puis disparition en fondu doux
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2000);
});


/*  MENU HAMBURGER (MOBILE) */
const burgerBtn = document.getElementById('burgerBtn');
const navMenu   = document.getElementById('navMenu');

burgerBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  burgerBtn.classList.toggle('open', isOpen);
  burgerBtn.setAttribute('aria-expanded', isOpen);
  burgerBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

// Fermer le menu quand on clique sur un lien
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
  });
});


/*  SCROLL REVEAL */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Délai progressif pour les éléments dans la même section
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


/*  NAVIGATION ACTIVE AU SCROLL  */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => sectionObserver.observe(section));

