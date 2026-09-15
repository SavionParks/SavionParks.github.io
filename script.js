// Flag that JS is available so reveal animations can safely start hidden.
// Without this class the content stays visible, so a JS failure never blanks the page.
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cursor glow follows the pointer. This tracks the cursor rather than animating
// on its own, so it runs regardless of the reduced-motion setting.
const glow = document.querySelector('.cursor-glow');
if (glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

// Mobile navigation toggle.
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close the menu after tapping a link, and on Escape.
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Typing animation in the terminal card. Small, stationary, and part of the
// page's character, so it runs for everyone; only the large scroll-reveal
// movement is suppressed under reduced motion.
const typed = document.getElementById('typed');
if (typed) {
  const words = ['skills', 'projects', 'experience', 'contact', 'github', 'linkedin'];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeLoop = () => {
    // Pause while the tab is hidden to avoid pointless CPU/battery use.
    if (document.hidden) {
      setTimeout(typeLoop, 500);
      return;
    }
    const word = words[wordIndex];
    if (!deleting) {
      typed.textContent = word.slice(0, ++charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(typeLoop, 900);
        return;
      }
    } else {
      typed.textContent = word.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 55 : 90);
  };
  typeLoop();
}

// Footer year.
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll reveal.
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback for older browsers or reduced motion: show everything immediately.
  revealEls.forEach((el) => el.classList.add('visible'));
}
