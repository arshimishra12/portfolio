/* ==========================================================================
   ARSHI MISHRA — MAIN INTERACTIVITY & GAME HUD LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. INTRO PRELOADER CONTROLLER
  initPreloader();

  // 2. AUDIO SYNTHESIZER FOR GAME HUD SOUNDS (Web Audio API)
  const soundSynth = initAudioSynth();

  // 3. CUSTOM CURSOR MOTION & STATE TRACKING
  initCustomCursor();

  // 4. GAME MENU NAVIGATION & SECTION TRACKER
  initGameMenu(soundSynth);

  // 5. PROJECT DETAIL MODAL VIEWER
  initProjectModal(soundSynth);
});

/* --------------------------------------------------------------------------
   1. PRELOADER CONTROLLER
   -------------------------------------------------------------------------- */
function initPreloader() {
  const loader = document.getElementById('intro-loader');
  const barFill = document.getElementById('loader-bar-fill');

  if (!loader || !barFill) return;

  // Simulate progress loading animation
  setTimeout(() => {
    barFill.style.width = '100%';
  }, 100);

  setTimeout(() => {
    loader.classList.add('fade-out');
    document.body.classList.remove('loading-active');
  }, 1300);
}

/* --------------------------------------------------------------------------
   2. AUDIO SYNTHESIZER (Cyberpunk Web Audio API sound blips)
   -------------------------------------------------------------------------- */
function initAudioSynth() {
  let audioCtx = null;
  let soundEnabled = true;

  const toggleBtn = document.getElementById('sound-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      toggleBtn.querySelector('.sound-state').textContent = soundEnabled ? 'ON' : 'OFF';
      toggleBtn.style.opacity = soundEnabled ? '1' : '0.5';
    });
  }

  function playBlip(freq = 440, type = 'sine', duration = 0.08) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }

  return {
    playHover: () => playBlip(680, 'sine', 0.05),
    playSelect: () => {
      playBlip(520, 'triangle', 0.06);
      setTimeout(() => playBlip(880, 'sine', 0.08), 60);
    },
    playModal: () => playBlip(320, 'square', 0.1)
  };
}

/* --------------------------------------------------------------------------
   3. CUSTOM CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');
  const cursorText = document.getElementById('custom-cursor-text');

  // Disable on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.remove('custom-cursor-enabled');
    return;
  }
  document.body.classList.add('custom-cursor-enabled');

  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
  });

  function animateFollower() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    if (follower) {
      follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover targets state change
  const hoverElements = document.querySelectorAll('a, button, .project-item, .skill-card-primary, .menu-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      if (el.classList.contains('project-item')) {
        cursorText.textContent = 'VIEW';
      } else {
        cursorText.textContent = 'OPEN';
      }
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      cursorText.textContent = '';
    });
  });
}

/* --------------------------------------------------------------------------
   4. GAME MENU & SECTION TRACKER
   -------------------------------------------------------------------------- */
function initGameMenu(soundSynth) {
  const menuItems = document.querySelectorAll('.game-menu-nav .menu-item');
  const sections = document.querySelectorAll('section[id]');

  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      soundSynth.playHover();
    });

    item.addEventListener('click', (e) => {
      e.preventDefault();
      soundSynth.playSelect();

      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Active section indicator on scroll
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 300;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentId = '#' + section.getAttribute('id');
      }
    });

    menuItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === currentId) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. PROJECT DETAIL MODAL VIEWER
   -------------------------------------------------------------------------- */
const projectsData = {
  'project-1': {
    title: 'NEW COLLECTION — Fashion Editorial Poster',
    category: 'Fashion & Editorial Graphic Design',
    tool: 'Figma & Canva',
    year: '2025',
    image: './project-01.jpg',
    description: 'A striking fashion promotional poster design built with modern editorial typography, vibrant crimson color accents, textured photo masks, and clean badge highlights. Designed to explore layout rhythm, negative space balance, and layered imagery.'
  },
  'project-2': {
    title: 'BLUEBERRY SMOOTHIE — Brand Poster',
    category: 'Branding & Product Typography',
    tool: 'Figma & Canva',
    year: '2025',
    image: './project-02.jpg',
    description: 'An aesthetic beverage promotion poster featuring vertical stacked typography overlaying cut-out product imagery. Designed to explore monochromatic gradient backgrounds, typography masks, and high-impact editorial aesthetics.'
  },
  'project-3': {
    title: 'BILLIE EILISH — Music Editorial Poster',
    category: 'Pop Culture & Graphic Design',
    tool: 'Figma & Canva',
    year: '2025',
    image: './project-03.jpg',
    description: 'A vibrant editorial pop poster featuring bold yellow typography stacked behind a portrait cutout with lyric accents and high-contrast green backgrounds. Focused on typography hierarchy and image-text layering.'
  },
  'project-4': {
    title: 'TEDxKIET — Core Team & Executive Poster',
    category: 'Event & Brand Graphic Design',
    tool: 'Figma & Canva',
    year: '2025',
    image: './project-04.jpg',
    description: 'Official executive showcase poster design created for TEDxKIET featuring bold red graphic boxes, background text masks, leadership badges, and dynamic photo composition.'
  },
  'project-5': {
    title: 'NIKHIL CHINAPA — Concert Event Flyer',
    category: 'Music & Event Graphic Design',
    tool: 'Figma & Canva',
    year: '2025',
    image: './project-05.jpg',
    description: 'A gritty techno event flyer design featuring textured typography masks, high-contrast monochrome portrait imagery, date badges, and energetic red background tones.'
  },
  'project-6': {
    title: 'JACOB BETHELL — Sports Editorial Poster',
    category: 'Sports & Athlete Editorial Design',
    tool: 'Figma & Canva',
    year: '2025',
    image: './project-06.jpg',
    description: 'A dynamic sports promotional graphic poster featuring Jacob Bethell, layered typography, player signature graphics, quote blocks, and multi-angle action cutouts.'
  }
};

function initProjectModal(soundSynth) {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');

  if (!modal) return;

  const modalImg = document.getElementById('modal-img');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTool = document.getElementById('modal-tool');
  const modalYear = document.getElementById('modal-year');

  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', () => {
      const projKey = item.getAttribute('data-project');
      const data = projectsData[projKey];

      if (data) {
        soundSynth.playModal();
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalTag.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;
        modalTool.textContent = data.tool;
        modalYear.textContent = data.year;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
