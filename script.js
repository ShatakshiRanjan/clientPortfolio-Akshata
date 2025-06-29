const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  toggle.classList.toggle('open');
});

function scrollToAbout() {
  const aboutSection = document.querySelector('#about');
  aboutSection.scrollIntoView({ behavior: 'smooth' });
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* bubble & section refs */
const aboutSection = document.getElementById('about');
const bubble       = document.querySelector('.speech-bubble');

function animateBubble() {
  /* disable effect on small and medium screens */
  if (window.innerWidth < 768) {
    bubble.style.opacity   = 1;
    bubble.style.transform = 'translate(0,0) rotate(-5deg)';
    return;
  }

  const rect = aboutSection.getBoundingClientRect();
  const vh   = window.innerHeight;

  /* progress: 0 when section bottom meets viewport top
               1 when section top meets viewport bottom */
  const start    = vh;
  const end      = -rect.height;
  const progress = clamp((start - rect.top) / (start - end), 0, 1);

  /* translate bubble ±120 px on a soft arc (up on entry, down on exit) */
  const y = (0.5 - progress) * 240;                     //  -120 → 0 → +120
  const x = Math.sin(progress * Math.PI) * -40;         // small sideways arc

  bubble.style.transform =
    `translate(${x}px, ${y}px) rotate(-5deg)`;

  /* fade near edges */
  bubble.style.opacity =
    1 - Math.abs(progress - 0.5) * 2;                   // 1 → 0 → 1
}

/* ---------- hook it up ---------- */
animateBubble();                                        // initial position
window.addEventListener('scroll',  () => requestAnimationFrame(animateBubble));
window.addEventListener('resize', animateBubble);