<?php
include 'bg.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kurt — Projects</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/projects.css" /> <!-- You can customize this later -->
</head>

<body class="projects-screen">
  <div id="page-fader" aria-hidden="true"></div>

  <?php include 'chain.php'; ?>

  <!-- Projects Panel -->
  <div class="projects-panel">
    <h1 class="projects-title">My Projects</h1>

    <div class="project-item">
      <h2 class="project-name">📦 Inventory Management System</h2>
      <p class="project-desc">Full-stack PHP/MySQL CRUD with role-based access & analytics dashboard.</p>
      <a href="#" class="project-link">View Demo →</a>
    </div>

    <div class="project-item">
      <h2 class="project-name">🎮 MLBB Tournament Bracket Tool</h2>
      <p class="project-desc">Custom-built bracket system used during my time in Blacklist International scrims.</p>
      <a href="#" class="project-link">Showcase →</a>
    </div>

    <div class="project-item">
      <h2 class="project-name">🛠 Custom CMS Builder</h2>
      <p class="project-desc">Modular admin dashboard built using pure PHP — no frameworks.</p>
      <a href="#" class="project-link">Preview →</a>
    </div>

    <a href="index.php?page=menu" class="menu-btn quit">Back to Menu</a>
  </div>

  <!-- click sound -->
  <audio id="click-sound" src="sfx/click.wav" preload="auto"></audio>

  <!-- scripts -->
  <script src="js/main.js"></script>
  <script src="js/toggle.js"></script>
</body>
</html>
