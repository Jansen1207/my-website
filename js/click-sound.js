// js/click-sound.js
(function () {
  const base = document.getElementById('click-sound');
  if (!base) return;

  function playOneShot() {
    try {
      const shot = base.cloneNode(true);
      shot.volume = base.volume ?? 1;
      document.body.appendChild(shot);
      shot.play().catch(() => {});
      setTimeout(() => shot.remove(), 1500);
    } catch (e) {}
  }

  // Only <a> links get the click sound
  document.querySelectorAll('.icon a').forEach(link => {
    link.addEventListener('click', () => {
      if (link.closest('.icon')?.classList.contains('dragging')) return;
      playOneShot();
    });
  });
})();
