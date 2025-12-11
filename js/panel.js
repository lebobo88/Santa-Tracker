/**
 * Santa Tracker - Mobile Panel Controller
 * Handles bottom sheet behavior on mobile devices
 */

// Panel state
let panel = null;
let handle = null;
let isExpanded = false;
let isMobile = false;
let touchStartY = 0;
let touchCurrentY = 0;
let isDragging = false;

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768;

/**
 * Initialize the panel controller
 */
export function initPanel() {
  panel = document.getElementById('info-panel');
  handle = document.getElementById('panel-handle');

  if (!panel || !handle) {
    console.warn('Panel elements not found');
    return;
  }

  // Check initial screen size
  checkMobile();

  // Set up event listeners
  setupEventListeners();

  // Listen for resize events
  window.addEventListener('resize', debounce(handleResize, 150));

  console.log('📱 Panel controller initialized');
}

/**
 * Check if we're on mobile
 */
function checkMobile() {
  const wasMobile = isMobile;
  isMobile = window.innerWidth < MOBILE_BREAKPOINT;

  if (isMobile && !wasMobile) {
    // Switched to mobile - collapse by default
    collapsePanel();
  } else if (!isMobile && wasMobile) {
    // Switched to desktop - ensure expanded
    panel.classList.remove('collapsed', 'expanded');
  }
}

/**
 * Handle window resize
 */
function handleResize() {
  checkMobile();
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Handle click/tap
  handle.addEventListener('click', togglePanel);

  // Touch events for swipe gestures
  panel.addEventListener('touchstart', handleTouchStart, { passive: true });
  panel.addEventListener('touchmove', handleTouchMove, { passive: false });
  panel.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Keyboard support
  handle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePanel();
    }
  });

  // Click outside to collapse (on mobile)
  document.addEventListener('click', (e) => {
    if (isMobile && isExpanded && !panel.contains(e.target)) {
      collapsePanel();
    }
  });
}

/**
 * Toggle panel state
 */
function togglePanel() {
  if (!isMobile) return;

  if (isExpanded) {
    collapsePanel();
  } else {
    expandPanel();
  }
}

/**
 * Expand the panel
 */
export function expandPanel() {
  if (!isMobile) return;

  panel.classList.remove('collapsed');
  panel.classList.add('expanded');
  handle.setAttribute('aria-expanded', 'true');
  isExpanded = true;
}

/**
 * Collapse the panel
 */
export function collapsePanel() {
  if (!isMobile) return;

  panel.classList.remove('expanded');
  panel.classList.add('collapsed');
  handle.setAttribute('aria-expanded', 'false');
  isExpanded = false;
}

/**
 * Handle touch start
 */
function handleTouchStart(e) {
  if (!isMobile) return;

  // Only track if touching the handle or top area
  const touch = e.touches[0];
  const panelRect = panel.getBoundingClientRect();
  const touchInHandle = touch.clientY < panelRect.top + 100;

  if (touchInHandle || e.target === handle || handle.contains(e.target)) {
    touchStartY = touch.clientY;
    isDragging = true;
  }
}

/**
 * Handle touch move
 */
function handleTouchMove(e) {
  if (!isMobile || !isDragging) return;

  touchCurrentY = e.touches[0].clientY;
  const deltaY = touchCurrentY - touchStartY;

  // Determine swipe direction
  if (Math.abs(deltaY) > 10) {
    // Prevent scroll while swiping
    e.preventDefault();
  }
}

/**
 * Handle touch end
 */
function handleTouchEnd(e) {
  if (!isMobile || !isDragging) return;

  const deltaY = touchCurrentY - touchStartY;
  const threshold = 50; // Minimum swipe distance

  if (deltaY < -threshold) {
    // Swiped up - expand
    expandPanel();
  } else if (deltaY > threshold) {
    // Swiped down - collapse
    collapsePanel();
  }

  // Reset
  isDragging = false;
  touchStartY = 0;
  touchCurrentY = 0;
}

/**
 * Update peek content with current Santa location
 * Called from santa.js when location updates
 */
export function updatePeekContent(cityName, countryName, countdown) {
  const peekCity = document.getElementById('peek-city');
  const peekCountry = document.getElementById('peek-country');
  const peekCountdown = document.getElementById('peek-countdown');

  if (peekCity && cityName) {
    peekCity.textContent = cityName;
  }

  if (peekCountry && countryName) {
    peekCountry.textContent = countryName;
  }

  if (peekCountdown && countdown) {
    peekCountdown.textContent = countdown;
  }
}

/**
 * Debounce helper
 */
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Check if panel is currently in mobile mode
 */
export function isPanelMobile() {
  return isMobile;
}

/**
 * Check if panel is expanded
 */
export function isPanelExpanded() {
  return isExpanded;
}

