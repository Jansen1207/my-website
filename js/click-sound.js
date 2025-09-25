(function () {
  const clickAudio = document.getElementById('click-sound');
  if (!clickAudio) return;

  document.querySelectorAll('.icon a').forEach(link => {
    link.addEventListener('click', () => {
      try {
        clickAudio.currentTime = 0;
        clickAudio.play();
      } catch (e) {}
    });
  });
})();
