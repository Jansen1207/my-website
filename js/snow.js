const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flakes = [];

function SnowFlake(x, y, radius, speed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = speed;
}

function createFlakes() {
  flakes = [];
  for (let i = 0; i < 100; i++) {
    flakes.push(new SnowFlake(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 3 + 2,
      Math.random() + 0.5
    ));
  }
}

function drawFlakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  flakes.forEach(flake => {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
  });
  ctx.fill();
  moveFlakes();
}

function moveFlakes() {
  flakes.forEach(flake => {
    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  });
}

function loop() {
  drawFlakes();
  requestAnimationFrame(loop);
}

createFlakes();
loop();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createFlakes();
});
