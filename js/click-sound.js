// js/click-sound.js
(function () {
  // Must exist on BOTH pages (desktop.php and menu.php):
  // <audio id="click-sound" src="/sfx/jobs-done.mp3" preload="auto"></audio>
  const audio = document.getElementById('click-sound');
  if (!audio) return;

  const KEY = 'sfxCarryV1';   // sessionStorage key
  const TTL_MS = 2500;        // only resume if navigation happened within 2.5s

  // SOURCE PAGE: when an <a data-sfx> is clicked, record timestamp + settings.
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest('a[data-sfx]');
    if (!a) return;

    // Ignore new-tab/middle/modified clicks
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0 || a.target === '_blank') return;

    const offset = parseFloat(a.dataset.sfxOffset || '0') || 0; // optional: trim leading silence
    const rate   = parseFloat(a.dataset.sfxRate   || '1') || 1; // optional playback speed
    const vol    = ('volume' in audio) ? Math.max(0, Math.min(1, audio.volume)) : 1;

    try {
      sessionStorage.setItem(KEY, JSON.stringify({
        ts: Date.now(),
        src: audio.currentSrc || audio.src || '',
        offset, rate, vol
      }));
    } catch (_) {}
    // Do NOT preventDefault — navigate immediately.
  });

  // DESTINATION PAGE: resume the audio as if it kept playing during navigation.
  function resumeIfCarried() {
    let data;
    try {
      const raw = sessionStorage.getItem(KEY);
      if (!raw) return;
      sessionStorage.removeItem(KEY);
      data = JSON.parse(raw);
    } catch (_) { return; }
    if (!data || !data.ts) return;

    const elapsed = Date.now() - data.ts;
    if (elapsed < 0 || elapsed > TTL_MS) return; // too old, skip

    // Ensure same source path (handles relative path differences)
    if (data.src) {
      const want = new URL(data.src, location.href).href;
      const cur  = audio.currentSrc || audio.src || '';
      if (cur !== want) audio.src = data.src;
    }

    const startAt = Math.max(0, (data.offset || 0) + (elapsed / 1000) * (data.rate || 1));
    const rate = data.rate || 1;
    const vol  = (typeof data.vol === 'number') ? Math.max(0, Math.min(1, data.vol)) : 1;

    const startPlayback = () => {
      try {
        audio.playbackRate = rate;
        // Guard against seeking past end
        const endGuard = Math.max(0, (audio.duration || startAt + 1) - 0.05);
        audio.currentTime = Math.min(startAt, endGuard);
        audio.volume = vol;
        audio.play().catch(() => {});
      } catch (_) {}
    };

    if (audio.readyState >= 1) startPlayback();
    else audio.addEventListener('loadedmetadata', startPlayback, { once: true });

    // If autoplay is blocked, retry on first regular click (still no pointerdown).
    const unlock = () => { startPlayback(); window.removeEventListener('click', unlock, true); };
    setTimeout(() => {
      if (audio.paused) window.addEventListener('click', unlock, true);
    }, 50);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    resumeIfCarried();
  } else {
    document.addEventListener('DOMContentLoaded', resumeIfCarried, { once: true });
  }
  window.addEventListener('pageshow', resumeIfCarried, { once: true }); // bfcache support
})();
