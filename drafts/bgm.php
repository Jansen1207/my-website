<!DOCTYPE html>
<html>
<body>
  <audio id="bgm" src="sfx/tests.mp3" preload="auto" loop></audio>

  <script>
    const bgm = document.getElementById("bgm");
    bgm.volume = 0.7;

    // Autoplay fallback
    const tryPlay = () => {
      bgm.play().catch(() => {
        const kick = () => { bgm.play().catch(()=>{}); window.removeEventListener("pointerdown", kick, true); };
        window.addEventListener("pointerdown", kick, { once: true, capture: true });
      });
    };

    // Start muted until JS tells it to play
    bgm.pause();

    window.addEventListener("message", (e) => {
      if (e.data === "play") tryPlay();
      if (e.data === "pause") bgm.pause();
    });
  </script>
</body>
</html>
