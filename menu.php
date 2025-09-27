<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kurt — Menu</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="menu-screen">
  <div id="page-fader" aria-hidden="true"></div>
  <div class="wallpaper"></div>
  <canvas id="snow-canvas"></canvas>

  <!-- Frozen Throne rafters (visual bar where chains attach) -->
  <!-- put this where your .menu-panel currently is in menu.php -->
<div class="menu-hang">
  <!-- Left Chain -->
  <div class="chain-big left"></div>
  <!-- Right Chain -->
  <div class="chain-big right"></div>

  <!-- Panel held by chains -->
  <div class="menu-panel">

    <a href="about.php" class="menu-btn" data-sfx>About Me</a>
    <button class="menu-btn" data-sfx>Skills</button>
    <button class="menu-btn" data-sfx>Projects</button>
    <button class="menu-btn" data-sfx>Contact</button>
    <a href="desktop.php" class="menu-btn quit" data-sfx>Quit</a>
  </div>
</div>




  <!-- click sound -->
  <audio id="click-sound" src="sfx/click.wav" preload="auto"></audio>

  <!-- background music (shared across pages) -->
  <audio id="bgm" preload="auto"></audio>

  <!-- scripts -->
  <script src="js/main.js"></script>
  <script src="js/snow.js"></script>
  <script src="js/transition.js"></script>
  
  <script src="js/toggle.js"></script>


</body>
</html>
