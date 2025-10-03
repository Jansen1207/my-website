<?php
include 'bg.php';
?>

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
  <!-- Frozen Throne rafters (visual bar where chains attach) -->
  <!-- put this where your .menu-panel currently is in menu.php -->

<?php
include 'chain.php';
?>

  <!-- Panel held by chains -->
  <div class="menu-panel">
  <a href="about.php" class="menu-btn" data-sfx>About Me</a>
  <a href="skills.php" class="menu-btn" data-sfx>Skills</a>
  <a href="projects.php" class="menu-btn" data-sfx>Projects</a>
  <a href="contact.php" class="menu-btn" data-sfx>Contact</a>
  <a href="index.php" class="menu-btn quit" data-sfx>Quit</a>
</div>

</div>

  <!-- click sound -->
  <audio id="click-sound" src="/sfx/jobs-done.mp3" preload="auto"></audio>
<script src="/js/click-sound.js" defer></script>


  <!-- scripts -->
  <script src="js/main.js"></script>  
  <script src="js/toggle.js"></script>
  <script src="js/click-sound.js"></script>





</body>
</html>
