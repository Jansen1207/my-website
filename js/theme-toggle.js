// js/theme-toggle.js
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon   = themeToggle?.querySelector("img");

  // Load stored theme, default to day
  let theme = localStorage.getItem("theme") || "day";
  applyTheme(theme);

  function applyTheme(mode) {
    document.body.classList.remove("theme-day", "theme-moon");
    if (mode === "moon") {
      document.body.classList.add("theme-moon");
      if (themeIcon) {
        themeIcon.src = "img/moon.png";
        themeIcon.alt = "Theme: Night";
      }
    } else {
      document.body.classList.add("theme-day");
      if (themeIcon) {
        themeIcon.src = "img/sun.png";
        themeIcon.alt = "Theme: Day";
      }
    }
    theme = mode;
    localStorage.setItem("theme", mode);
  }

  // Toggle icon click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(theme === "day" ? "moon" : "day");
    });
  }

  // 🔄 Force reset to "day" when Refresh (index.php) is clicked
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (/(^|\/)ref\.php(\?|$)/.test(href)) {
      // Reset theme
      applyTheme("day");
    }
  }, true);
});
