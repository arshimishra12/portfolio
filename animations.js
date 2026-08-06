/* ==========================================================================
   ARSHI MISHRA — SCROLL & INTERACTIVE ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. SCROLL REVEAL OBSERVER
  initScrollReveal();

  // 2. 3D CARD TILT ON HOVER
  initCard3DTilt();

  // 3. DYNAMIC GLOW SPOTLIGHT ON CARDS
  initGlowSpotlight();
});

/* --------------------------------------------------------------------------
   1. SCROLL REVEAL OBSERVER
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   2. 3D CARD TILT EFFECT
   -------------------------------------------------------------------------- */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('.portrait-card, .project-item, .skill-card-primary');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* --------------------------------------------------------------------------
   3. MOUSE SPOTLIGHT GLOW ON CARDS
   -------------------------------------------------------------------------- */
function initGlowSpotlight() {
  const glowCards = document.querySelectorAll('.about-card, .skill-card-primary, .exploring-box, .contact-info-card, .potential-box');

  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 240, 255, 0.08), rgba(12, 19, 38, 0.65) 40%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
}
