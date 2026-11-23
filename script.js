const INTRO_KEY = 'wunian-intro-seen';

function introSeen() {
  try { return localStorage.getItem(INTRO_KEY) === '1'; } catch { return false; }
}

function markIntroSeen() {
  try { localStorage.setItem(INTRO_KEY, '1'); } catch {}
}

document.addEventListener('DOMContentLoaded', () => {
  const unian = document.querySelector('.unian');
  if (unian) {
    const intro = document.querySelector('.intro');
    const nav   = intro.querySelector('nav');

    if (introSeen()) {
      intro.classList.add('skip');
      unian.classList.add('visible');
      nav.classList.add('visible');
    } else {
      setTimeout(() => {
        unian.classList.add('visible');
        markIntroSeen();
        setTimeout(() => nav.classList.add('visible'), 1800);
      }, 1200);
    }
  }

  const wNav = document.getElementById('wNav');
  if (wNav) {
    const btn = wNav.querySelector('.w-btn');
    const setOpen = open => {
      wNav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    };

    btn.addEventListener('click', () => setOpen(!wNav.classList.contains('open')));
    document.addEventListener('click', e => {
      // a click on the mask (a pseudo-element) targets wNav itself
      if (e.target === wNav || !wNav.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && wNav.classList.contains('open')) {
        setOpen(false);
        btn.focus();
      }
    });
  }
});
