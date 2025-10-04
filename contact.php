<?php include 'bg.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kurt — Contact</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/contact.css" />
</head>
<body class="contact-screen">
  <div id="page-fader" aria-hidden="true"></div>

  <?php include 'chain.php'; ?> <!-- If you're using chains for consistency -->

  <div class="contact-panel">
    <h1 class="contact-title">Get in Touch</h1>

    <p class="contact-text">
      Whether it’s <strong>collaboration, hiring</strong>, or just to say hi —
      I’m always open to new opportunities.
    </p>

    <form class="contact-form" method="POST" action="send-mail.php">
      <label class="form-label">Name</label>
      <input type="text" name="name" class="form-input" placeholder="Your name" required>

      <label class="form-label">Email</label>
      <input type="email" name="email" class="form-input" placeholder="you@example.com" required>

      <label class="form-label">Message</label>
      <textarea name="message" class="form-textarea" placeholder="Write your message..." required></textarea>

      <button type="submit" class="menu-btn">Send Message</button>
    </form>

    <div class="contact-links">
      <a href="mailto:kurtjansendullon@gmail.com" class="contact-link">📧 kurtjansendullon@gmail.com</a>
      <a href="https://github.com/Jansen1207" class="contact-link" target="_blank">🐙 GitHub</a>
      <a href="https://www.linkedin.com/in/kurt-jansen-dullon-74a115266/" class="contact-link" target="_blank">💼 LinkedIn</a>
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
