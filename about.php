<?php
include 'bg.php';
?>

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
  
<?php
include 'chain.php';
?>

  <!-- About Panel -->
  <div class="about-panel">
    <h1 class="about-title">About Me</h1>
<p class="about-text">
  Hi, I’m <strong>Kurt Jansen Dullon</strong> — fresh out of José Rizal University and currently
  grinding for my first official dev job like it’s a Mythic rank placement match. My dad was a senior
  PHP developer, so I basically spawned with <em>debug mode</em> unlocked (minus the salary).
</p>
<p class="about-text">
  I’m an aspiring full-stack developer, always eager to learn new tech, level up my skills,
  and hopefully stop explaining to relatives that “IT” doesn’t mean I fix printers for a living.
  Once I land that first company, consider my final form loading… ⏳
</p>
<p class="about-text">
  Before coding, I was out here collecting achievements IRL — varsity chess player, 
  <strong>2x NCAA gold medalist</strong>, and full-time scholar. Then Mobile Legends said,
  “Side quest?” and I accidentally became a pro player under <strong>Blacklist International</strong>
  in MPL. Apparently, I don’t know how to be casual in anything.
</p>
<p class="about-text highlight">
  🎮 Now I’m focused on becoming a top-tier developer — just one job offer away from 
  upgrading my keyboard, unlocking my potential, and maybe buying coffee with my own money 😂
</p>

    <a href="menu.php" class="menu-btn quit">Back to Menu</a>
  </div>
</div>


   
  <!-- click sound -->
  <audio id="click-sound" src="sfx/click.wav" preload="auto"></audio>

  <!-- scripts -->
  <script src="js/main.js"></script>
  <script src="js/toggle.js"></script>
</body>
</html>
