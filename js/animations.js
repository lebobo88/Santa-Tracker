/**
 * Santa Tracker - Animations Module
 * Canvas-based snowfall and twinkling stars
 */

let snowCanvas, snowCtx;
let snowflakes = [];
let animationId = null;
let isReducedMotion = false;

// Snowflake configuration
const SNOWFLAKE_COUNT = 150;
const MIN_SIZE = 2;
const MAX_SIZE = 5;
const MIN_SPEED = 0.5;
const MAX_SPEED = 2;

/**
 * Initialize all animations
 */
export function initAnimations() {
  // Check for reduced motion preference
  isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReducedMotion) {
    console.log('Reduced motion preference detected - animations disabled');
    return;
  }

  // Initialize snowfall
  initSnowfall();

  // Initialize twinkling stars
  initStars();

  // Handle resize
  window.addEventListener('resize', handleResize);

  // Start animation loop
  animate();
}

/**
 * Initialize canvas snowfall
 */
function initSnowfall() {
  snowCanvas = document.getElementById('snow-canvas');
  if (!snowCanvas) return;

  snowCtx = snowCanvas.getContext('2d');

  // Set canvas size
  resizeCanvas();

  // Create snowflakes
  createSnowflakes();
}

/**
 * Resize canvas to window size
 */
function resizeCanvas() {
  if (!snowCanvas) return;

  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;
}

/**
 * Create initial snowflakes
 */
function createSnowflakes() {
  snowflakes = [];

  for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
    snowflakes.push(createSnowflake(true));
  }
}

/**
 * Create a single snowflake
 * @param {boolean} randomY - Whether to randomize Y position
 * @returns {Object} Snowflake object
 */
function createSnowflake(randomY = false) {
  return {
    x: Math.random() * window.innerWidth,
    y: randomY ? Math.random() * window.innerHeight : -10,
    size: Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE,
    speed: Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED,
    wind: Math.random() * 0.5 - 0.25,
    opacity: Math.random() * 0.5 + 0.3,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.02 + 0.01
  };
}

/**
 * Update snowflake positions
 */
function updateSnowflakes() {
  snowflakes.forEach((flake, index) => {
    // Update position
    flake.y += flake.speed;
    flake.x += flake.wind + Math.sin(flake.wobble) * 0.5;
    flake.wobble += flake.wobbleSpeed;

    // Reset if off screen
    if (flake.y > window.innerHeight + 10) {
      snowflakes[index] = createSnowflake(false);
      snowflakes[index].x = Math.random() * window.innerWidth;
    }

    // Wrap horizontally
    if (flake.x > window.innerWidth + 10) {
      flake.x = -10;
    } else if (flake.x < -10) {
      flake.x = window.innerWidth + 10;
    }
  });
}

/**
 * Draw snowflakes on canvas
 */
function drawSnowflakes() {
  if (!snowCtx) return;

  // Clear canvas
  snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);

  // Draw each snowflake
  snowflakes.forEach(flake => {
    snowCtx.beginPath();
    snowCtx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
    snowCtx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
    snowCtx.fill();
  });
}

/**
 * Initialize twinkling stars
 */
function initStars() {
  const starsContainer = document.getElementById('stars-container');
  if (!starsContainer) return;

  // Clear existing stars
  starsContainer.innerHTML = '';

  // Create stars
  const starCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random size
    const sizeClass = ['small', 'small', 'small', 'medium', 'medium', 'large'][
      Math.floor(Math.random() * 6)
    ];
    star.classList.add(sizeClass);

    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    // Random animation timing
    star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
    star.style.setProperty('--delay', `${Math.random() * 5}s`);

    starsContainer.appendChild(star);
  }
}

/**
 * Main animation loop
 */
function animate() {
  if (isReducedMotion) return;

  updateSnowflakes();
  drawSnowflakes();

  animationId = requestAnimationFrame(animate);
}

/**
 * Handle window resize
 */
function handleResize() {
  resizeCanvas();

  // Recreate stars for new screen size
  initStars();
}

/**
 * Pause animations (for performance when tab is hidden)
 */
export function pauseAnimations() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

/**
 * Resume animations
 */
export function resumeAnimations() {
  if (!animationId && !isReducedMotion) {
    animate();
  }
}

/**
 * Create burst effect at coordinates
 * @param {number} x - X position
 * @param {number} y - Y position
 */
export function createBurstEffect(x, y) {
  if (isReducedMotion) return;

  const particles = 12;
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#ffffff', '#c41e3a'];

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';

    const angle = (i / particles) * Math.PI * 2;
    const velocity = 50 + Math.random() * 50;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    document.body.appendChild(particle);

    // Animate particle
    particle.animate([
      {
        transform: 'translate(0, 0) scale(1)',
        opacity: 1
      },
      {
        transform: `translate(${dx}px, ${dy}px) scale(0)`,
        opacity: 0
      }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
    }).onfinish = () => {
      particle.remove();
    };
  }
}

// Handle visibility change to pause/resume animations
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pauseAnimations();
  } else {
    resumeAnimations();
  }
});
