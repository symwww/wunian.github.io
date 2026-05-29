document.addEventListener('DOMContentLoaded', () => {
  const unian = document.querySelector('.unian');
  const nav   = document.querySelector('nav');

  setTimeout(() => {
    unian.classList.add('visible');
    setTimeout(() => nav.classList.add('visible'), 1800);
  }, 1200);
});
