/*  LOADER / SPLASH SCREEN on attend que TOUT soit chargé (images, CSS, polices) avant de démarrer le countdown de 2 secondes   */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Attendre 2 secondes puis disparition en fondu doux
  setTimeout(() => {
  // C'est le CSS qui fait l'animation, pas JS, meilleure performance GPU  
    loader.classList.add('hidden');
  }, 2000);
});


/*  MENU HAMBURGER (MOBILE) * toggle : ajoute .open si absente, retire si présente, isOpen stocke l'état pour mettre à jour aria-expanded et le label du bouton en même temps */
const burgerBtn = document.getElementById('burgerBtn');
const navMenu   = document.getElementById('navMenu');
// aria-expanded informe les lecteurs d'écran si le menu est ouvert et aria-label change selon l'état accessibilité clavier complète
burgerBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  burgerBtn.classList.toggle('open', isOpen);
  burgerBtn.setAttribute('aria-expanded', isOpen);
  burgerBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

// Fermer le menu quand on clique sur un lien de navigation sans ça, le menu resterait ouvert après avoir cliqué 
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
 /* IntersectionObserver plus performant que l'événement scroll, qui se déclenche des centaines de fois par seconde threshold animation quand 12% de l'élément est visible rootMargin démarre légèrement avant d'arriver en bas d'écran*/
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
// Délai progressif pour les éléments dans la même section Résultat un effet de cascade, les éléments apparaissent l'un après l'autre
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
// unobserve : arrête d'observer cet élément une fois animé, Libère les ressources — inutile de surveiller ce qui est déjà visible.
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
/* réinitialise la couleur de TOUS les liens avant d'en colorer un seul sans ça, plusieurs liens resteraient colorés en même temps*/      
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

/*  FORMULAIRE DE CONTACT */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {  // e.preventDefault()  empêche le rechargement de page natif du formulaire sans ça, les erreurs affichées disparaissent immédiatement
    e.preventDefault();

    const nameField    = document.getElementById('name');
    const emailField   = document.getElementById('email');
    const messageField = document.getElementById('message');
    const formSuccess  = document.getElementById('formSuccess');

    let isValid = true;

    // Réinitialiser les erreurs
    clearError(nameField, 'name-error');
    clearError(emailField, 'email-error');
    clearError(messageField, 'message-error');
    formSuccess.textContent = '';

    // Validation nom
    if (!nameField.value.trim()) {
      showError(nameField, 'name-error', 'Veuillez entrer votre nom.');
      isValid = false;
    }

    // Validation email vérifie le format de l'adresse email retourne true si l'email correspond au pattern.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim()) {
      showError(emailField, 'email-error', 'Veuillez entrer votre email.');
      isValid = false;
    } else if (!emailRegex.test(emailField.value.trim())) {
      showError(emailField, 'email-error', 'Veuillez entrer un email valide.');
      isValid = false;
    }

    // Validation message  showError : ajoute la classe .error ) et écrit le message dans le span role='alert'clearError : remet à l'état initial avant chaque revalidation 
    // avec Principe DRY une seule fonction réutilisée pour tous les champs.
    if (!messageField.value.trim()) {
      showError(messageField, 'message-error', 'Veuillez écrire un message.');
      isValid = false;
    }

    // Si tout est valide
    if (isValid) {
      formSuccess.textContent = '✓ Message envoyé ! Je vous répondrai dès que possible.';
      contactForm.reset();
    }
  });
}

function showError(field, errorId, message) {
  field.classList.add('error');
  document.getElementById(errorId).textContent = message;
}

function clearError(field, errorId) {
  field.classList.remove('error');
  document.getElementById(errorId).textContent = '';
}
