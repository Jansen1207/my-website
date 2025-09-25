<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kurt — Menu</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="menu-screen">
  <div class="menu-panel">
    <button class="menu-btn" data-sfx>About Me</button>
    <button class="menu-btn" data-sfx>Skills</button>
    <button class="menu-btn" data-sfx>Projects</button>
    <button class="menu-btn" data-sfx>Contact</button>


    <!-- Quit back to desktop (no loader) -->
<a href="desktop.php" class="menu-btn quit" data-sfx>Quit</a>
  </div>

  <audio id="click-sound" src="sfx/click.wav" preload="auto"></audio>
  <script src="js/main.js"></script>
</body>
</html>
