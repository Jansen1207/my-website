// js/toggle.js
document.addEventListener("DOMContentLoaded", () => {
  // <audio id="bgm"> MUST exist in the page (index.php, menu.php, about.php, etc.)
  const bgm = document.getElementById("bgm");
  if (!bgm) return;

  // Optional Music icon (exists on index.php; may not exist on every page)
  const musicImg  = document.querySelector('.icon img.avatar-img[alt^="Music"]');
  const musicIcon = musicImg ? musicImg.closest(".icon") : null;

  // ---- Single looping track ----
  const TRACK_SRC = "sfx/wc3music.mp3";

  // Detect a real browser reload (Cmd+R, F5)
  const navEntry = (performance.getEntriesByType?.("navigation") || [])[0];
  const isReload = navEntry ? (navEntry.type === "reload")
                            : (performance.navigation && performance.navigation.type === 1);

  // ---- State from localStorage ----
  let isMuted  = localStorage.getItem("bgm_muted") === "true";
  let lastTime = parseFloat(localStorage.getItem("bgm_time") || "0");

  // Force MUTE on hard refresh to match your requirement
  if (isReload) {
    isMuted = true;
    localStorage.setItem("bgm_muted", "true");
    // Don't resume time on a forced mute; leave lastTime as-is for later resume
  }

  // ---- Base audio setup ----
  bgm.src    = TRACK_SRC;
  bgm.loop   = true;     // loop forever
  bgm.volume = 0.7;

  // Resume to saved position (after metadata known; Safari/WebKit quirk)
  const setResumeTime = () => {
    if (!Number.isNaN(lastTime) && lastTime > 0 && (isFinite(bgm.duration) ? lastTime < bgm.duration : true)) {
      try { bgm.currentTime = lastTime; } catch (_) {}
    }
  };
  if (bgm.readyState >= 1) setResumeTime();
  else bgm.addEventListener("loadedmetadata", setResumeTime, { once: true });

  // Autoplay helper: start only if not muted; fall back to user gesture
  const tryPlay = () => {
    if (isMuted) return;
    bgm.play().catch(() => {
      const kick = () => { if (!isMuted) bgm.play().catch(()=>{}); window.removeEventListener("pointerdown", kick, true); };
      window.addEventListener("pointerdown", kick, { once: true, capture: true });
    });
  };

  // Apply initial state
  if (isMuted) {
    bgm.pause();
    bgm.muted = true; // keep muted until user unmutes
  } else {
    bgm.muted = false;
    tryPlay();
  }

  // ---- Persist time efficiently ----
  const saveTime = () => {
    if (!Number.isNaN(bgm.currentTime)) {
      localStorage.setItem("bgm_time", String(bgm.currentTime));
    }
  };
  // Use timeupdate (fires ~4–5/sec) and also lifecycle saves
  bgm.addEventListener("timeupdate", saveTime);
  document.addEventListener("visibilitychange", saveTime);
  window.addEventListener("pagehide", saveTime);
  window.addEventListener("beforeunload", saveTime);

  // Save state right before any navigation (most reliable)
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    saveTime();
    localStorage.setItem("bgm_muted", String(isMuted));
  }, true);

  // ---- Icon sync helper ----
  const syncIcon = () => {
    if (!musicImg) return;
    if (isMuted) {
      musicImg.src = "img/silenced.png";
      musicImg.alt = "Music (Muted)";
    } else {
      musicImg.src = "img/shouting.png";
      musicImg.alt = "Music";
    }
  };
  syncIcon();

  // ---- Toggle by clicking the Music icon (if present on this page) ----
  if (musicIcon) {
    musicIcon.addEventListener("click", () => {
      // optional click SFX
      const clickAudio = document.getElementById("click-sound");
      if (clickAudio) { try { clickAudio.currentTime = 0; clickAudio.play(); } catch (_) {} }

      isMuted = !isMuted;
      localStorage.setItem("bgm_muted", String(isMuted));

      if (isMuted) {
        bgm.pause();
        bgm.muted = true;
        saveTime(); // keep position for seamless resume
      } else {
        bgm.muted = false;
        setResumeTime();
        tryPlay();
      }
      syncIcon();
    });
  }

  // ---- Force MUTE when clicking your Refresh icon → index.php ----
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute("href") || "";
    // match index.php (with or without query)
    if (/index\.php(\?.*)?\bpage=ref\b/.test(href)) {
      isMuted = true;
      localStorage.setItem("bgm_muted", "true");
      saveTime();
      bgm.pause();
      bgm.muted = true;
      syncIcon();
    }
  }, true);
});
