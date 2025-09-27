// js/main.js
(function () {
  const grid = document.querySelector('.desktop-grid');
  if (!grid) return;

  const HOLD_MS  = 300; // long-press for touch
  const MOVE_PX  = 6;   // immediate drag threshold for mouse

  grid.querySelectorAll('.icon').forEach(icon => {
    const link = icon.querySelector('a');

    let isDown = false, dragging = false;
    let holdTimer = null;
    let startX = 0, startY = 0, offsetX = 0, offsetY = 0;
    let placeholder = null;

    // convenience
    const pt = (e) => {
      const t = e.touches?.[0] || e.changedTouches?.[0];
      return { x: t?.clientX ?? e.clientX, y: t?.clientY ?? e.clientY };
    };

    const makePlaceholder = (src) => {
      const ph = document.createElement('div');
      ph.className = 'icon placeholder';
      // keep layout stable while the real icon is absolute
      ph.style.width  = src.offsetWidth + 'px';
      ph.style.height = src.offsetHeight + 'px';
      return ph;
    };

    const cancelEarlyDetect = () => {
      document.removeEventListener('mousemove', detectMoveEarly);
      document.removeEventListener('mouseup', cancelHold);
      document.removeEventListener('touchmove', detectMoveEarly);
      document.removeEventListener('touchend', cancelHold);
    };

    const beginDrag = (p) => {
      cancelEarlyDetect(); // stop early detectors
      dragging = true;
      icon.classList.add('dragging');
      icon.style.position = 'absolute';
      icon.style.pointerEvents = 'none';
      if (link) link.style.pointerEvents = 'none';

      const ir = icon.getBoundingClientRect();
      const gr = grid.getBoundingClientRect();
      offsetX = p.x - ir.left;
      offsetY = p.y - ir.top;

      icon.style.left = (ir.left - gr.left) + 'px';
      icon.style.top  = (ir.top  - gr.top ) + 'px';

      placeholder = makePlaceholder(icon);
      grid.insertBefore(placeholder, icon.nextSibling);

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onUp);
    };

    // start drag quickly if user moves > threshold (desktop feel)
    const detectMoveEarly = (e) => {
      if (!isDown || dragging) return;
      const p = pt(e);
      if (Math.abs(p.x - startX) > MOVE_PX || Math.abs(p.y - startY) > MOVE_PX) {
        clearTimeout(holdTimer);
        beginDrag(p);
        e.preventDefault();
      }
    };

    const cancelHold = () => {
      isDown = false;
      clearTimeout(holdTimer);
      cancelEarlyDetect();
    };

    const onDown = (e) => {
      isDown = true; dragging = false;
      const p = pt(e);
      startX = p.x; startY = p.y;

      clearTimeout(holdTimer);
      // long-press path (better for touch)
      holdTimer = setTimeout(() => {
        if (!isDown || dragging) return;
        beginDrag(pt(e));
      }, HOLD_MS);

      // quick-move path (better for mouse)
      document.addEventListener('mousemove', detectMoveEarly);
      document.addEventListener('mouseup', cancelHold);
      document.addEventListener('touchmove', detectMoveEarly, { passive: false });
      document.addEventListener('touchend', cancelHold);
    };

    const onMove = (e) => {
      if (!dragging) return;
      e.preventDefault();

      const p = pt(e);
      const gr = grid.getBoundingClientRect();
      const x = p.x - gr.left - offsetX;
      const y = p.y - gr.top  - offsetY;

      icon.style.left = x + 'px';
      icon.style.top  = y + 'px';

      // live reordering with placeholder
      const el = document.elementFromPoint(p.x, p.y);
      const target = el && el.closest('.icon:not(.dragging):not(.placeholder)');
      if (target && placeholder) {
        const tr = target.getBoundingClientRect();
        const centerX = tr.left + tr.width / 2;
        if (p.x < centerX) {
          grid.insertBefore(placeholder, target);
        } else {
          grid.insertBefore(placeholder, target.nextSibling);
        }
      }
    };

    const onUp = () => {
      isDown = false;
      clearTimeout(holdTimer);

      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);

      if (dragging) {
        dragging = false;
        icon.classList.remove('dragging');
        icon.style.pointerEvents = '';
        if (link) link.style.pointerEvents = '';

        if (placeholder && placeholder.parentNode) {
          placeholder.parentNode.insertBefore(icon, placeholder);
          placeholder.remove();
        }
        icon.style.position = '';
        icon.style.left = '';
        icon.style.top  = '';
      }
    };

    // block clicks only while actively dragging
    icon.addEventListener('click', (e) => {
      if (icon.classList.contains('dragging')) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    icon.addEventListener('mousedown', onDown);
    icon.addEventListener('touchstart', onDown, { passive: true });
  });
})();
