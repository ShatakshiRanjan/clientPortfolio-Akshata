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

// utilities ------------------------------------------------------
const clamp  = (v,min,max) => Math.max(min, Math.min(max, v));
const blocks = Array.from(document.querySelectorAll('.story-block'));
// core routine ---------------------------------------------------
function parallax() {
  if (window.innerWidth < 769) { // disable on mobile
    blocks.forEach(b => b.querySelector('.text').style.transform = '');
    return;
  }

  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  const vh = window.innerHeight - headerHeight;

  blocks.forEach(block => {
    const img = block.querySelector('.image');
    const txt = block.querySelector('.text');

    // how far can the text travel?
    const travel = img.offsetHeight - txt.offsetHeight;
    if (travel <= 0) return; // nothing to animate

    // progress (0 → 1) while the block is on-screen
    const rect = block.getBoundingClientRect();
    const start = vh; // block's top hits bottom of viewport (below header)
    const end = -window.innerHeight; // block's bottom hits top of viewport (end at 100vh above)
    const progress = clamp((start - rect.top) / (start - end), 0, 1);

    // apply translation (positive = move downward)
    txt.style.transform = `translateY(${progress * travel}px)`;

    // subtle fade-in/out (optional — delete if unwanted)
    txt.style.opacity = 1 - Math.abs(progress - 0.5) * 2;
  });
}

// run once and on scroll/resize ----------------------------------
parallax();
window.addEventListener('scroll', () => requestAnimationFrame(parallax));
window.addEventListener('resize', parallax);
