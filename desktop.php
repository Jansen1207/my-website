<?php
// allow if: came from loader (?boot=1) OR we have the booted cookie
$bootedCookie = isset($_COOKIE['booted']) && $_COOKIE['booted'] === '1';
$fromBoot     = isset($_GET['boot']);

if (!$bootedCookie && !$fromBoot) {
  header("Location: index.php");
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kurt — Desktop</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="desktop">
  <div id="page-fader" aria-hidden="true"></div>
  <div class="wallpaper"></div>



  <main class="desktop-grid" role="navigation" aria-label="Desktop icons">

    <div class="icon">
      <a href="menu.php" data-sfx>
        <img src="img/rd.jpg" alt="Kurt Profile" class="avatar-img" />
      </a>
      <span class="label">Profile</span>
    </div>

       <!-- Refresh icon -->
<div class="icon">
  <a href="index.php" data-sfx>
    <img src="img/refresh.png" alt="Refresh" class="avatar-img" />
  </a>
  <span class="label">Refresh</span>
</div>






  </main>

  <!-- startup sound -->
  <audio id="startup-sound" src="sfx/startup.mp3" preload="auto"></audio>

  <script src="js/main.js"></script>

  <script>
    const params = new URLSearchParams(location.search);
    if (params.has('boot')) {
      const audio = document.getElementById('startup-sound');
      if (audio) {
        audio.volume = 0.7;
        audio.play().catch(() => {
          console.log("Autoplay blocked, will wait for first click.");
          document.addEventListener('click', () => {
            audio.play().catch(()=>{});
          }, { once:true });
        });
      }
      // clean ?boot=1 from URL
      history.replaceState(null, '', 'desktop.php');
    }
  </script>

  <!-- hover sound -->
  <audio id="hover-sound" src="sfx/hover.ogg" preload="auto">
  </audio>
<script src="js/hover-sound.js"></script>

<!-- click sound -->
<audio id="click-sound" src="sfx/click.mp3" preload="auto">
  </audio>
  <script src="js/click-sound.js"></script>

<!-- bg -->
<canvas id="snow-canvas"></canvas>
<script src="js/snow.js"></script>
<script src="js/transition.js"></script>




</body>
</html>
