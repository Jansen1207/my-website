(function () {
  const grid = document.querySelector('.desktop-grid');
  if (!grid) return;

  const HOLD_MS  = 300;   // long-press for touch
  const MOVE_PX  = 6;     // move threshold for desktop
  const COOLDOWN = 250;   // ignore clicks right after drop

  let lastDragAt = 0;

  grid.querySelectorAll('.icon').forEach(icon => {
    const link = icon.querySelector('a');
    let holdTimer = null, isDown = false, dragging = false;

    let startX = 0, startY = 0, offsetX = 0, offsetY = 0;
    let dragW = 0, dragH = 0;
    let placeholder = null;

    const pt = (e) => {
      if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      return { x: e.clientX, y: e.clientY };
    };

    const makePlaceholder = (src) => {
      const ph = document.createElement('div');
      ph.className = 'icon placeholder';
      ph.style.width  = src.offsetWidth + 'px';
      ph.style.height = src.offsetHeight + 'px';
      return ph;
    };

    const beginDrag = (p) => {
      dragging = true;
      icon.classList.add('dragging');
      icon.style.position = 'absolute';
      icon.style.pointerEvents = 'none';     // allow hit-testing under it
      if (link) link.style.pointerEvents = 'none';

      // lock current position
      const ir = icon.getBoundingClientRect();
      const gr = grid.getBoundingClientRect();
      offsetX = p.x - ir.left;
      offsetY = p.y - ir.top;
      icon.style.left = (ir.left - gr.left) + 'px';
      icon.style.top  = (ir.top  - gr.top ) + 'px';
      dragW = ir.width; dragH = ir.height;

      // insert placeholder at icon's place
      placeholder = makePlaceholder(icon);
      grid.insertBefore(placeholder, icon.nextSibling);

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onUp);
    };

    const onDown = (e) => {
      if (Date.now() - lastDragAt < COOLDOWN) { e.preventDefault(); return; }
      isDown = true; dragging = false;

      const p = pt(e);
      startX = p.x; startY = p.y;

      clearTimeout(holdTimer);
      holdTimer = setTimeout(() => {
        if (!isDown || dragging) return;
        beginDrag(pt(e));
      }, HOLD_MS);

      document.addEventListener('mousemove', detectMoveEarly);
      document.addEventListener('mouseup', cancelIfNeeded);
      document.addEventListener('touchmove', detectMoveEarly, { passive: false });
      document.addEventListener('touchend', cancelIfNeeded);
    };

    const detectMoveEarly = (e) => {
      if (!isDown || dragging) return;
      const p = pt(e);
      const dx = Math.abs(p.x - startX);
      const dy = Math.abs(p.y - startY);
      if (dx > MOVE_PX || dy > MOVE_PX) {
        clearTimeout(holdTimer);
        beginDrag(p);
        e.preventDefault();
      }
    };

    const onMove = (e) => {
      if (!dragging) return;
      e.preventDefault();

      const p = pt(e);
      const gr = grid.getBoundingClientRect();

      // move (clamped inside grid)
      let x = p.x - gr.left - offsetX;
      let y = p.y - gr.top  - offsetY;
      x = Math.max(0, Math.min(x, gr.width  - dragW));
      y = Math.max(0, Math.min(y, gr.height - dragH));
      icon.style.left = x + 'px';
      icon.style.top  = y + 'px';

      // find nearest target under pointer (excluding dragged icon)
      const el = document.elementFromPoint(p.x, p.y);
      const target = el && el.closest('.icon:not(.dragging):not(.placeholder)');

      if (target && placeholder) {
        const tr = target.getBoundingClientRect();
        const cx = p.x;
        const centerX = tr.left + tr.width / 2;
        // decide before/after by pointer vs center
        if (cx < centerX) {
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

        // drop: place icon into placeholder position
        if (placeholder && placeholder.parentNode) {
          placeholder.parentNode.insertBefore(icon, placeholder);
        }
        // cleanup positioning styles so it flows again
        icon.style.position = '';
        icon.style.left = '';
        icon.style.top  = '';

        // remove placeholder
        if (placeholder && placeholder.parentNode) {
          placeholder.parentNode.removeChild(placeholder);
        }
        placeholder = null;

        lastDragAt = Date.now();
        icon.dataset.dragged = '1';
        setTimeout(() => { icon.dataset.dragged = '0'; }, 0);
      }
    };

    const cancelIfNeeded = () => {
      isDown = false;
      clearTimeout(holdTimer);
      document.removeEventListener('mousemove', detectMoveEarly);
      document.removeEventListener('mouseup', cancelIfNeeded);
      document.removeEventListener('touchmove', detectMoveEarly);
      document.removeEventListener('touchend', cancelIfNeeded);
    };

    // swallow click right after drag
    icon.addEventListener('click', (e) => {
      if (icon.dataset.dragged === '1' || (Date.now() - lastDragAt < COOLDOWN)) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    icon.addEventListener('mousedown', onDown);
    icon.addEventListener('touchstart', onDown, { passive: true });
  });
})();
