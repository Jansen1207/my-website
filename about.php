<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kurt — About Me</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/about.css" />

</head>
<body class="about-screen">
  <div id="page-fader" aria-hidden="true"></div>
  <div class="wallpaper"></div>
  <canvas id="snow-canvas"></canvas>

  <div class="menu-hang">
  <!-- Chains -->
  <div class="chain-big left"></div>
  <div class="chain-big right"></div>

  <!-- About Panel -->
  <div class="about-panel">
    <h1 class="about-title">About Me</h1>
    <p class="about-text">
      Hi, I’m <strong>Kurt Jansen Dullon</strong> — a PHP & MySQL full-stack developer,
      game enthusiast, and former professional esports player. I love building immersive
      systems, whether that’s <em>interactive web apps</em>, <em>custom CMS tools</em>,
      or <em>game mechanics</em> like the one you’re exploring here.
    </p>
    <p class="about-text">
      I’m passionate about blending creativity and logic — from coding dynamic dashboards
      to experimenting with game design ideas.
    </p>
    <p class="about-text highlight">
      🎮 <em>Fun fact:</em> I once competed in the Mobile Legends MPL under
      Blacklist International — so strategy and performance run in my code too.
    </p>
    <a href="menu.php" class="menu-btn quit">Back to Menu</a>
  </div>
</div>


   
  <!-- click sound -->
  <audio id="click-sound" src="sfx/click.wav" preload="auto"></audio>
  <audio id="bgm" preload="auto"></audio>

  <!-- scripts -->
  <script src="js/main.js"></script>
  <script src="js/snow.js"></script>
  <script src="js/transition.js"></script>
  <script src="js/toggle.js"></script>
</body>
</html>
