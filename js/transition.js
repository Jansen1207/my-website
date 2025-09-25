// js/transition.js
(function () {
  const fader = document.getElementById('page-fader');

  // helper: is same-tab, same-origin left-click on an <a>
  function isSameDocNav(e, a) {
    if (!a) return false;
    if (a.target && a.target !== '_self') return false;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    if (a.origin !== location.origin) return false;
    return true;
  }

  // navigate with View Transitions API if available; else use CSS fader
  function smoothNavigate(href) {
    if (document.startViewTransition) {
      document.startViewTransition(() => { location.href = href; });
    } else {
      if (fader) {
        fader.classList.add('active');
        setTimeout(() => { location.href = href; }, 280); // match CSS duration
      } else {
        location.href = href;
      }
    }
  }

  // click handler: play nice with your drag logic on .icon
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!isSameDocNav(e, a)) return;

    // if it's inside an icon that was just dragged, skip navigation here
    const icon = a.closest('.icon');
    if (icon && (icon.classList.contains('dragging') || icon.dataset.dragged === '1')) {
      e.preventDefault();
      return;
    }

    // delay navigation slightly so click sound can fire (if you use click-sound.js)
    e.preventDefault();
    // kick off transition
    smoothNavigate(a.href);
  }, true);

  // Optional enter-fade (nice polish): add page-enter on load and clear it
  const enableEnterFade = true;
  if (enableEnterFade && fader) {
    document.body.classList.add('page-enter');
    // force reflow then drop the veil
    requestAnimationFrame(() => {
      fader.classList.add('page-enter-done');
      setTimeout(() => {
        document.body.classList.remove('page-enter');
        fader.classList.remove('page-enter-done');
      }, 300);
    });
  }
})();
