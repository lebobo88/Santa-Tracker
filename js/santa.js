/**
 * Santa Tracker - Santa Tracking Logic
 * Handles Santa's movement, presents count, and state management
 */

import { getNewRandomLocation, getLocalTime } from './locations.js';
import { updateSantaPosition, addVisitedMarker, showArrivalEffect } from './map.js';

// Santa state
let currentLocation = null;
let presentsDelivered = 0;
let citiesVisited = 0;
let moveTimer = null;
let countdownTimer = null;
let nextMoveTime = 0;

// Configuration
const MIN_MOVE_INTERVAL = 30000; // 30 seconds minimum
const MAX_MOVE_INTERVAL = 60000; // 60 seconds maximum
const MIN_PRESENTS_PER_STOP = 10000;
const MAX_PRESENTS_PER_STOP = 50000;

// DOM elements
let cityNameEl, countryNameEl, localTimeEl, presentsCountEl, citiesCountEl, countdownEl;

/**
 * Initialize Santa tracking
 */
export function initSanta() {
  // Cache DOM elements
  cityNameEl = document.getElementById('city-name');
  countryNameEl = document.getElementById('country-name');
  localTimeEl = document.getElementById('local-time');
  presentsCountEl = document.getElementById('presents-count');
  citiesCountEl = document.getElementById('cities-count');
  countdownEl = document.getElementById('countdown');

  // Start with initial location
  moveToNextLocation(false);

  // Start the movement cycle
  scheduleNextMove();

  // Update local time every second
  setInterval(updateLocalTime, 1000);
}

/**
 * Move Santa to the next random location
 * @param {boolean} animate - Whether to animate the transition
 */
function moveToNextLocation(animate = true) {
  const previousLocation = currentLocation;
  currentLocation = getNewRandomLocation(currentLocation);

  // Update map
  updateSantaPosition(currentLocation.lat, currentLocation.lng, animate);

  // Show arrival effect
  if (animate) {
    setTimeout(() => {
      showArrivalEffect(currentLocation.lat, currentLocation.lng);
    }, 1500);
  }

  // Add visited marker at previous location
  if (previousLocation && animate) {
    addVisitedMarker(previousLocation.lat, previousLocation.lng, previousLocation.city);
  }

  // Update UI
  updateLocationUI();

  // Update presents count
  if (animate) {
    const presentsThisStop = Math.floor(
      Math.random() * (MAX_PRESENTS_PER_STOP - MIN_PRESENTS_PER_STOP) + MIN_PRESENTS_PER_STOP
    );
    animatePresentsCount(presentsThisStop);
    citiesVisited++;
    updateCitiesCount();
  }

  // Announce for screen readers
  announceLocation();
}

/**
 * Schedule the next Santa movement
 */
function scheduleNextMove() {
  // Clear existing timers
  if (moveTimer) clearTimeout(moveTimer);
  if (countdownTimer) clearInterval(countdownTimer);

  // Random interval between MIN and MAX
  const interval = Math.floor(
    Math.random() * (MAX_MOVE_INTERVAL - MIN_MOVE_INTERVAL) + MIN_MOVE_INTERVAL
  );

  nextMoveTime = Date.now() + interval;

  // Update countdown every 100ms
  countdownTimer = setInterval(updateCountdown, 100);

  // Schedule move
  moveTimer = setTimeout(() => {
    moveToNextLocation(true);
    scheduleNextMove();
  }, interval);
}

/**
 * Update the countdown display
 */
function updateCountdown() {
  const remaining = Math.max(0, nextMoveTime - Date.now());
  const seconds = Math.ceil(remaining / 1000);

  if (countdownEl) {
    countdownEl.textContent = `${seconds}s`;

    // Add pulse effect when close
    if (seconds <= 5) {
      countdownEl.classList.add('animate-pulse-glow');
    } else {
      countdownEl.classList.remove('animate-pulse-glow');
    }
  }
}

/**
 * Update location display in UI
 */
function updateLocationUI() {
  if (cityNameEl) {
    cityNameEl.textContent = currentLocation.city;
    cityNameEl.classList.add('animate-santa-arrive');
    setTimeout(() => cityNameEl.classList.remove('animate-santa-arrive'), 800);
  }

  if (countryNameEl) {
    countryNameEl.textContent = currentLocation.country;
  }

  updateLocalTime();
}

/**
 * Update local time display
 */
function updateLocalTime() {
  if (localTimeEl && currentLocation) {
    localTimeEl.textContent = getLocalTime(currentLocation.timezone);
  }
}

/**
 * Animate presents count incrementing
 * @param {number} amount - Amount to add
 */
function animatePresentsCount(amount) {
  const startCount = presentsDelivered;
  const endCount = presentsDelivered + amount;
  const duration = 1500;
  const startTime = Date.now();

  function tick() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const eased = 1 - Math.pow(1 - progress, 3);

    const current = Math.floor(startCount + (endCount - startCount) * eased);

    if (presentsCountEl) {
      presentsCountEl.textContent = formatNumber(current);
      presentsCountEl.classList.add('animate-number-tick');
      setTimeout(() => presentsCountEl.classList.remove('animate-number-tick'), 300);
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      presentsDelivered = endCount;
    }
  }

  requestAnimationFrame(tick);
}

/**
 * Update cities visited count
 */
function updateCitiesCount() {
  if (citiesCountEl) {
    citiesCountEl.textContent = formatNumber(citiesVisited);
    citiesCountEl.classList.add('animate-number-tick');
    setTimeout(() => citiesCountEl.classList.remove('animate-number-tick'), 300);
  }
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

/**
 * Announce location change for screen readers
 */
function announceLocation() {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = `Santa has arrived in ${currentLocation.city}, ${currentLocation.country}!`;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Get current Santa state for sharing
 * @returns {Object} Current state
 */
export function getSantaState() {
  return {
    location: currentLocation,
    presentsDelivered,
    citiesVisited
  };
}

/**
 * Force move to a specific location (for testing)
 * @param {Object} location - Location object
 */
export function forceMove(location) {
  currentLocation = location;
  updateSantaPosition(location.lat, location.lng, true);
  updateLocationUI();
}
