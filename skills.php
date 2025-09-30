<?php
include 'bg.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kurt — Skills</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/skills.css" />
</head>
<body class="menu-screen">
  <!-- page fade -->
  <div id="page-fader" aria-hidden="true"></div>


  <!-- hanging group: chains + panel -->
  <div class="menu-hang">
    <div class="chain-big left" aria-hidden="true"></div>
    <div class="chain-big right" aria-hidden="true"></div>

    <section class="menu-panel about-panel">
      <h1 class="about-title">Skills</h1>

      <!-- Tag chips -->
      <div class="skills-tags">
        <span class="chip">PHP</span>
        <span class="chip">MySQL</span>
        <span class="chip">HTML</span>
        <span class="chip">CSS</span>
        <span class="chip">JavaScript</span>
        <span class="chip">Git/GitHub</span>
        <span class="chip">Laravel</span>
        <span class="chip">UI/UX Polish</span>
      </div>

      <!-- Meters -->
      <div class="skills-grid">
        <!-- Example rows: change data-pct to set value -->
        <div class="skill-item">
          <div class="skill-label">PHP</div>
          <div class="meter" data-pct="78"><span></span></div>
        </div>

        <div class="skill-item">
          <div class="skill-label">MySQL</div>
          <div class="meter" data-pct="75"><span></span></div>
        </div>

        <div class="skill-item">
          <div class="skill-label">HTML</div>
          <div class="meter" data-pct="80"><span></span></div>
        </div>

        <div class="skill-item">
          <div class="skill-label">CSS</div>
          <div class="meter" data-pct="80"><span></span></div>
        </div>

        <div class="skill-item">
          <div class="skill-label">JavaScript</div>
          <div class="meter" data-pct="76"><span></span></div>
        </div>

        <div class="skill-item">
          <div class="skill-label">Git/GitHub</div>
          <div class="meter" data-pct="74"><span></span></div>
        </div>

        <div class="skill-item">
          <div class="skill-label">Laravel</div>
          <div class="meter" data-pct="70"><span></span></div>
        </div>

        <div class="skill-item">
          <div class="skill-label">UI/UX Polish</div>
          <div class="meter" data-pct="77"><span></span></div>
        </div>
      </div>

      <!-- CTA row -->
      <div class="skills-cta">
        <a href="menu.php" class="menu-btn quit" data-sfx>Back to Menu</a>
      </div>
    </section>
  </div>

  <!-- sounds (click) -->
  <audio id="click-sound" src="sfx/click.wav" preload="auto"></audio>


  <!-- scripts -->
  <script src="js/toggle.js"></script>

  <!-- Animate meters when visible -->
  <script>
    (function(){
      const meters = document.querySelectorAll('.meter');
      if (!('IntersectionObserver' in window)) {
        meters.forEach(m => {
          const pct = +m.dataset.pct || 0;
          m.querySelector('span').style.width = pct + '%';
        });
        return;
      }
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(ent => {
          if (ent.isIntersecting) {
            const el = ent.target;
            const pct = +el.dataset.pct || 0;
            el.querySelector('span').style.width = pct + '%';
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.35 });
      meters.forEach(m => io.observe(m));
    })();
  </script>
</body>
</html>
