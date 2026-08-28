/* ═══════════════════════════════════════════
   FRIZZANTEO — MAIN JS (GSAP + Interactions)
═══════════════════════════════════════════ */

'use strict';

// ── Wait for GSAP and ScrollTrigger to load ──
document.addEventListener('DOMContentLoaded', () => {

  /* ─── GSAP SETUP ─── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initGSAP();
  } else {
    // fallback: try again after scripts settle
    window.addEventListener('load', () => {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initGSAP();
      }
    });
  }

  initCustomCursor();
  initNavSmooth();

});

/* ═══════════════════════════════════════════
   GSAP ANIMATIONS
═══════════════════════════════════════════ */
function initGSAP() {

  /* ── 1. Hero entrance ── */
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroEmail = document.querySelector('.hero-email');

  if (heroTitle) {
    gsap.from([heroTitle, heroSubtitle, heroEmail].filter(Boolean), {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.2,
    });
  }

  /* ── 2. Floating elements — yoyo hover animation ── */
  const floatEls = document.querySelectorAll('.float-el');

  const floatConfigs = [
    { y: -18, rotation: 4, duration: 3.8 },
    { y: -14, rotation: -6, duration: 4.2 },
    { y: -20, rotation: 5, duration: 3.5 },
    { y: -12, rotation: -3, duration: 4.6 },
    { y: -16, rotation: 7, duration: 3.9 },
  ];

  floatEls.forEach((el, i) => {
    const cfg = floatConfigs[i % floatConfigs.length];

    // entrance fade
    gsap.from(el, {
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      delay: 0.4 + i * 0.15,
      ease: 'power2.out',
    });

    // continuous yoyo float
    gsap.to(el, {
      y: cfg.y,
      rotation: cfg.rotation,
      duration: cfg.duration,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.4,
    });
  });

  /* ── 3. Parallax on mouse move ── */
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    let mouseX = 0, mouseY = 0;
    const parallaxStrength = [0.018, 0.012, 0.022, 0.01, 0.016];

    document.addEventListener('mousemove', (e) => {
      const { innerWidth: W, innerHeight: H } = window;
      mouseX = (e.clientX / W - 0.5) * 2;
      mouseY = (e.clientY / H - 0.5) * 2;

      floatEls.forEach((el, i) => {
        const s = parallaxStrength[i % parallaxStrength.length];
        gsap.to(el, {
          x: mouseX * s * 100,
          y: mouseY * s * 100,
          duration: 0.8,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      });
    });
  }

  /* ── 4. Curriculum card — scroll reveal ── */
  const currCard = document.querySelector('.curriculum-card');
  if (currCard) {
    gsap.from(currCard, {
      scrollTrigger: {
        trigger: currCard,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  }

  /* ── 5. Archive rows — staggered scroll reveal ── */
  const archiveRows = document.querySelectorAll('.archivio-row:not(.archivio-head)');

  if (archiveRows.length) {
    gsap.from(archiveRows, {
      scrollTrigger: {
        trigger: '.archivio-table',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      x: -30,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
      stagger: 0.06,
    });
  }

  /* ── 6. Footer entrance ── */
  const footer = document.querySelector('.site-footer');
  if (footer) {
    gsap.from(footer, {
      scrollTrigger: {
        trigger: footer,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
    });
  }
}


/* ═══════════════════════════════════════════
   CUSTOM CURSOR WITH HOVER IMAGES
═══════════════════════════════════════════ */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  // Hover-image map per project row
  const hoverImages = {
    'tapedesign': 'images/hover_images/hover_tapedesign.webp',
    'scacchiera': 'images/hover_images/hover_scacchiera.webp',
    'sienapedia': 'images/hover_images/hover_sienapedia.webp',
    'moltitudine': 'images/hover_images/hover_moltitudine.webp',
    'socialmedia': 'images/hover_images/hover_socialmediabadthing.webp',
    'carefull': 'images/hover_images/hover_carefull.webp',
    'aeking': 'images/hover_images/hover_aeking.webp',
    'ducky': 'images/hover_images/hover_ducky.webp',
  };

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Activate custom image on archive rows with hover data
  const rows = document.querySelectorAll('.archivio-row[data-hover]');
  rows.forEach((row) => {
    const key = row.dataset.hover;
    if (!key || key === 'none') return;
    const imgSrc = hoverImages[key];
    if (!imgSrc) return;

    row.addEventListener('mouseenter', () => {
      cursor.style.backgroundImage = `url('${imgSrc}')`;
      document.body.classList.add('custom-cursor-active');
      if (row.dataset.hoverSize === 'large') {
        cursor.classList.add('cursor--large');
      } else if (row.dataset.hoverSize === 'small') {
        cursor.classList.add('cursor--small');
      }
    });

    row.addEventListener('mouseleave', () => {
      cursor.style.backgroundImage = 'none';
      document.body.classList.remove('custom-cursor-active');
      cursor.classList.remove('cursor--large', 'cursor--small');
    });
  });
}


/* ═══════════════════════════════════════════
   SMOOTH ANCHOR SCROLL
═══════════════════════════════════════════ */
function initNavSmooth() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
