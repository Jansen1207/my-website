// Respect system "reduce motion" setting
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Use 100ms if reduced motion, otherwise 1.5s
const delay = prefersReducedMotion ? 100 : 1500;

// Restart the CSS progress bar animation (important if page was cached)
const bar = document.querySelector('.bar');
if (bar) {
  bar.style.animation = 'none';
  void bar.offsetWidth;      // force reflow
  bar.style.animation = '';  // re-apply animation
}

// After the delay, mark as booted and go to desktop
setTimeout(() => {
  // Store boot state in both cookie + sessionStorage
  document.cookie = "booted=1; path=/; max-age=86400"; // valid for 1 day
  sessionStorage.setItem('booted', 'true');

  // Redirect to desktop with boot flag
  window.location.href = 'index.php';
}, delay);
