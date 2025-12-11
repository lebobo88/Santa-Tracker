/**
 * Santa Tracker - Animations Module
 * Canvas-based snowfall, twinkling stars, and floating decorations
 */

let snowCanvas, snowCtx;
let snowflakes = [];
let animationId = null;
let isReducedMotion = false;

// Enhanced snowflake configuration - MORE SNOW!
const SNOWFLAKE_COUNT = 250;
const MIN_SIZE = 2;
const MAX_SIZE = 8;
const MIN_SPEED = 0.5;
const MAX_SPEED = 3;

// Floating decorations
const FLOATING_EMOJIS = ['🎄', '⭐', '🎁', '❄️', '✨', '🔔', '🍪', '🦌', '☃️', '🌟'];

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

  // Initialize floating decorations
  initFloatingDecorations();

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
 * Draw snowflakes on canvas - enhanced with variety
 */
function drawSnowflakes() {
  if (!snowCtx) return;

  // Clear canvas
  snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);

  // Draw each snowflake
  snowflakes.forEach((flake, index) => {
    snowCtx.save();
    snowCtx.translate(flake.x, flake.y);
    snowCtx.rotate(flake.wobble);
    
    // Vary snowflake style based on size
    if (flake.size > 5) {
      // Large flakes - draw as star/crystal shape
      drawSnowflakeCrystal(snowCtx, flake.size, flake.opacity);
    } else if (flake.size > 3) {
      // Medium flakes - simple sparkle
      drawSparkle(snowCtx, flake.size, flake.opacity);
    } else {
      // Small flakes - dots with glow
      snowCtx.beginPath();
      snowCtx.arc(0, 0, flake.size, 0, Math.PI * 2);
      snowCtx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
      snowCtx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      snowCtx.shadowBlur = 3;
      snowCtx.fill();
    }
    
    snowCtx.restore();
  });
}

/**
 * Draw a snowflake crystal shape
 */
function drawSnowflakeCrystal(ctx, size, opacity) {
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  
  // Draw 6 arms
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 3);
    
    // Main arm
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -size);
    ctx.stroke();
    
    // Small branches
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.5);
    ctx.lineTo(-size * 0.3, -size * 0.7);
    ctx.moveTo(0, -size * 0.5);
    ctx.lineTo(size * 0.3, -size * 0.7);
    ctx.stroke();
    
    ctx.restore();
  }
}

/**
 * Draw a sparkle/star shape
 */
function drawSparkle(ctx, size, opacity) {
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
  ctx.shadowBlur = 5;
  
  // 4-point star
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const outerX = Math.cos(angle) * size;
    const outerY = Math.sin(angle) * size;
    const innerAngle = angle + Math.PI / 4;
    const innerX = Math.cos(innerAngle) * (size * 0.3);
    const innerY = Math.sin(innerAngle) * (size * 0.3);
    
    if (i === 0) {
      ctx.moveTo(outerX, outerY);
    } else {
      ctx.lineTo(outerX, outerY);
    }
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.fill();
}

/**
 * Initialize twinkling stars
 */
function initStars() {
  const starsContainer = document.getElementById('stars-container');
  if (!starsContainer) return;

  // Clear existing stars
  starsContainer.innerHTML = '';

  // Create more stars for magical effect
  const starCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random size - more variety
    const sizeClass = ['small', 'small', 'small', 'medium', 'medium', 'large'][
      Math.floor(Math.random() * 6)
    ];
    star.classList.add(sizeClass);

    // Random position - only in upper 70% of screen
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 70}%`;

    // Random animation timing
    star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
    star.style.setProperty('--delay', `${Math.random() * 5}s`);

    starsContainer.appendChild(star);
  }
}

/**
 * Initialize floating decorations (emojis)
 */
function initFloatingDecorations() {
  const container = document.getElementById('floating-decorations');
  if (!container) return;

  // Clear existing
  container.innerHTML = '';

  // Create floating decorations
  const decorationCount = Math.min(12, Math.floor(window.innerWidth / 150));

  for (let i = 0; i < decorationCount; i++) {
    const decoration = document.createElement('div');
    decoration.className = 'floating-decoration';
    decoration.textContent = FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)];
    
    // Random position around edges
    const side = Math.floor(Math.random() * 4);
    switch(side) {
      case 0: // Top
        decoration.style.top = `${5 + Math.random() * 15}%`;
        decoration.style.left = `${10 + Math.random() * 80}%`;
        break;
      case 1: // Right
        decoration.style.top = `${10 + Math.random() * 60}%`;
        decoration.style.right = `${2 + Math.random() * 10}%`;
        break;
      case 2: // Bottom left
        decoration.style.bottom = `${15 + Math.random() * 20}%`;
        decoration.style.left = `${2 + Math.random() * 15}%`;
        break;
      case 3: // Bottom right
        decoration.style.bottom = `${15 + Math.random() * 20}%`;
        decoration.style.right = `${2 + Math.random() * 15}%`;
        break;
    }
    
    // Random size
    const size = 1.5 + Math.random() * 1.5;
    decoration.style.fontSize = `${size}rem`;
    
    // Random animation delay and duration
    decoration.style.animationDelay = `${Math.random() * 10}s`;
    decoration.style.animationDuration = `${15 + Math.random() * 10}s`;
    
    // Slight opacity variation
    decoration.style.opacity = `${0.6 + Math.random() * 0.4}`;
    
    container.appendChild(decoration);
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
