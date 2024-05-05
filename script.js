// Create a canvas element for the stars and rockets
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Function to create stars
function createStars(count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3,
      velocity: Math.random() * 0.5
    };
    stars.push(star);
  }
  return stars;
}

// Function to create rockets
function createRockets(count) {
  const rockets = [];
  for (let i = 0; i < count; i++) {
    const rocket = {
      x: Math.random() * canvas.width,
      y: canvas.height,
      size: Math.random() * 5 + 5,
      velocity: Math.random() * 2 + 2
    };
    rockets.push(rocket);
  }
  return rockets;
}

// Draw stars on canvas
function drawStars(stars) {
  ctx.fillStyle = '#ffffff';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Draw rockets on canvas
function drawRockets(rockets) {
  rockets.forEach(rocket => {
    ctx.beginPath();
    ctx.moveTo(rocket.x, rocket.y);
    ctx.lineTo(rocket.x, rocket.y - rocket.size * 2);
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = rocket.size / 2;
    ctx.stroke();
  });
}

// Update star positions
function updateStars(stars) {
  stars.forEach(star => {
    star.y += star.velocity;
    if (star.y > canvas.height) {
      star.y = 0;
    }
  });
}

// Update rocket positions
function updateRockets(rockets) {
  rockets.forEach(rocket => {
    rocket.y -= rocket.velocity;
    if (rocket.y < -rocket.size * 2) {
      rocket.y = canvas.height;
      rocket.x = Math.random() * canvas.width;
    }
  });
}

// Animate stars and rockets
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const stars = createStars(150);
  const rockets = createRockets(5);
  function frame() {
    updateStars(stars);
    drawStars(stars);
    updateRockets(rockets);
    drawRockets(rockets);
    requestAnimationFrame(frame);
  }
  frame();
}

// Start the animation
animate();

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawStars(createStars(150));
  drawRockets(createRockets(5));
});
