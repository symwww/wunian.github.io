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
      closeTimer = setTimeout(() => setOpen(false), 150);
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

// Tension at the top and end of every page: content resists, then eases back
document.addEventListener('DOMContentLoaded', () => {
  const sheets = document.querySelectorAll('main, .w-nav ~ .project, .bottom-bar');
  if (!sheets.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root   = document.documentElement;
  const LIMIT  = 120;
  const TICK   = 30;
  let pull     = 0;    // positive past the end, negative past the top
  let shown    = 0;
  let touchY   = null;
  let touching = false;
  let ticked   = false;
  let short    = false;
  let last     = 0;
  let frame    = 0;

  const atTop    = () => short || scrollY <= 1;
  const atEnd    = () => short || scrollY + innerHeight >= root.scrollHeight - 1;
  const menuOpen = () => document.querySelector('.w-nav.open') !== null;
  const resist   = x => Math.sign(x) * LIMIT * (1 - 1 / (Math.abs(x) * 0.55 / LIMIT + 1));

  // measured at rest only, since moving content changes the scroll height
  const measure = () => {
    if (!frame) short = root.scrollHeight - innerHeight <= 1;
    root.classList.toggle('at-edge', atTop() || atEnd());
  };

  const step = now => {
    const dt = Math.min(now - last, 32);
    last = now;
    if (!touching) pull *= Math.exp(-dt / 70);
    shown += (resist(pull) - shown) * (1 - Math.exp(-dt / 20));

    if (!ticked && Math.abs(shown) > TICK) {
      ticked = true;
      if (touching && navigator.vibrate && navigator.userActivation?.hasBeenActive) navigator.vibrate(8);
    }

    if (!touching && Math.abs(pull) < 0.5 && Math.abs(shown) < 0.3) {
      pull = shown = frame = 0;
      ticked = false;
      root.style.overflow = '';
      sheets.forEach(s => { s.style.transform = s.style.willChange = ''; });
      measure();
      return;
    }
    sheets.forEach(s => { s.style.transform = `translate3d(0, ${-shown}px, 0)`; });
    frame = requestAnimationFrame(step);
  };

  const start = () => {
    if (frame) return;
    last = performance.now();
    // keeps short pages from growing a scrollbar while content moves
    if (short) root.style.overflow = 'hidden';
    sheets.forEach(s => { s.style.willChange = 'transform'; });
    frame = requestAnimationFrame(step);
  };

  const allowed = delta => (delta > 0 ? atEnd() : atTop());

  measure();
  addEventListener('scroll', measure, { passive: true });
  addEventListener('resize', measure);
  addEventListener('load', measure);

  addEventListener('wheel', e => {
    if (e.ctrlKey || e.deltaY === 0 || menuOpen()) return;
    if (!allowed(e.deltaY)) { pull = 0; return; }
    const unit  = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1;
    const delta = Math.max(-60, Math.min(60, e.deltaY * unit));
    pull = Math.max(-400, Math.min(400, pull + delta));
    start();
  }, { passive: true });

  addEventListener('touchstart', () => { touchY = null; }, { passive: true });
  addEventListener('touchmove', e => {
    if (e.touches.length !== 1 || menuOpen()) return;
    if (!atTop() && !atEnd()) {
      touchY = null;
      pull = 0;
      return;
    }
    const y = e.touches[0].clientY;
    if (touchY === null) touchY = y;
    const delta = touchY - y;
    pull = delta !== 0 && allowed(delta) ? delta : 0;
    if (pull) {
      touching = true;
      start();
    }
  }, { passive: true });
  const release = () => { touching = false; touchY = null; };
  addEventListener('touchend', release);
  addEventListener('touchcancel', release);
});
