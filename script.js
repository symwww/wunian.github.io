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

    let closeTimer;
    let pointerType = '';

    const cancelClose = () => clearTimeout(closeTimer);
    const closeSoon = () => {
      cancelClose();
      closeTimer = setTimeout(() => setOpen(false), 80);
    };

    // the mask and strip are pseudo-elements, so hovering them targets wNav itself
    wNav.addEventListener('pointerover', e => {
      if (e.pointerType !== 'mouse') return;
      if (e.target === wNav) return closeSoon();
      cancelClose();
      if (e.target === btn) setOpen(true);
    });
    wNav.addEventListener('pointerleave', e => {
      if (e.pointerType === 'mouse') closeSoon();
    });

    btn.addEventListener('pointerdown', e => { pointerType = e.pointerType; });
    btn.addEventListener('click', e => {
      const touched = pointerType === 'touch' || pointerType === 'pen';
      pointerType = '';
      if (touched && !wNav.classList.contains('open')) {
        e.preventDefault();
        setOpen(true);
      }
    });

    wNav.addEventListener('focusin', e => {
      if (e.target.matches(':focus-visible')) setOpen(true);
    });
    wNav.addEventListener('focusout', e => {
      if (e.relatedTarget && !wNav.contains(e.relatedTarget)) setOpen(false);
    });
    document.addEventListener('click', e => {
      if (e.target === wNav || !wNav.contains(e.target)) setOpen(false);
    });
    window.addEventListener('pageshow', e => { if (e.persisted) setOpen(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && wNav.classList.contains('open')) {
        btn.focus();
        setOpen(false);
      }
    });
  }
});
