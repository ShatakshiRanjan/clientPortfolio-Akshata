/* ─────────────────────────────
  HAMBURGER MENU TOGGLE
───────────────────────────── */
const toggle = document.getElementById('menu-toggle');
const nav    = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  toggle.classList.toggle('open');
});

/* ─────────────────────────────
  SMOOTH SCROLL TO #ABOUT
───────────────────────────── */
function scrollToAbout () {
  document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
}

/* ─────────────────────────────
  PARALLAX FOR STORY BLOCKS
───────────────────────────── */
const clamp  = (v, min, max) => Math.max(min, Math.min(max, v));
const blocks = [...document.querySelectorAll('.story-block')];

function parallax () {
  if (window.innerWidth < 769) {
   blocks.forEach(b => {
    const txt = b.querySelector('.text');
    txt.style.transform = '';
    txt.style.opacity   = '';
   });
   return;
  }

  const header       = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  const viewportH    = window.innerHeight - headerHeight;

  blocks.forEach(block => {
   const img = block.querySelector('.image');
   const txt = block.querySelector('.text');
   const travel = img.offsetHeight - txt.offsetHeight;
   if (travel <= 0) return;

   const rect     = block.getBoundingClientRect();
   const start    = viewportH;
   const end      = -window.innerHeight;
   const progress = clamp((start - rect.top) / (start - end), 0, 1);

   txt.style.transform = `translateY(${progress * travel}px)`;
   txt.style.opacity   = 1 - Math.abs(progress - 0.5) * 2;
  });
}

/* ─────────────────────────────
  SPEECH BUBBLE ANIMATION
───────────────────────────── */
const aboutSection = document.getElementById('about');
const bubble       = document.querySelector('.speech-bubble');

function animateBubble () {
  if (!bubble) return; // prevent error if bubble missing

  if (window.innerWidth < 600) {
   bubble.style.opacity   = 1;
   bubble.style.transform = 'translate(0,0) rotate(-5deg)';
   return;
  }

  const rect     = aboutSection.getBoundingClientRect();
  const vh       = window.innerHeight;
  const start    = vh;
  const end      = -rect.height;
  const progress = clamp((start - rect.top) / (start - end), 0, 1);

  const y = (0.5 - progress) * 240;                     // vertical float
  const x = Math.sin(progress * Math.PI) * -40;         // gentle arc

  bubble.style.transform =
   `translate(${x}px, ${y}px) rotate(-5deg)`;

  bubble.style.opacity =
   1 - Math.abs(progress - 0.5) * 2;
}

/* ─────────────────────────────
  INIT + EVENT LISTENERS
───────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  parallax();
  animateBubble();

  window.addEventListener('scroll', () => {
   requestAnimationFrame(parallax);
   requestAnimationFrame(animateBubble);
  });

  window.addEventListener('resize', () => {
   parallax();
   animateBubble();
  });
});
