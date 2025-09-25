(function () {
  const hoverAudio = document.getElementById('hover-sound');
  if (!hoverAudio) return;

  let lastPlayed = 0;
  const COOLDOWN = 120; // ms to avoid spam

  const playSound = () => {
    const now = Date.now();
    if (now - lastPlayed < COOLDOWN) return; // throttle
    try {
      hoverAudio.currentTime = 0;
      hoverAudio.play();
      lastPlayed = now;
    } catch (e) {}
  };

  const icons = document.querySelectorAll('.icon');

  // Only attach hover sounds if the device really supports hover
  if (window.matchMedia('(hover: hover)').matches) {
    icons.forEach(icon => {
      icon.addEventListener('mouseenter', playSound);
    });
  } else {
    // On touch devices, skip hover sound completely
    // (Optional) If you want accessibility via keyboard:
    icons.forEach(icon => {
      icon.addEventListener('focus', playSound, true);
    });
  }
})();
