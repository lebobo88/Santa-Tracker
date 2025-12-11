/**
 * Santa Tracker - Santa Tracking Logic
 * Handles Santa's movement, presents count, and state management
 * 
 * Santa delivers presents ONLY on December 25th!
 * Rest of the year he's at the North Pole with the elves.
 */

import { getNewRandomLocation, getLocalTime } from './locations.js';
import { updateSantaPosition, addVisitedMarker, showArrivalEffect, addFlightPath } from './map.js';
import { updatePeekContent } from './panel.js';
import { onSantaArrival } from './features.js';

// Santa state
let currentLocation = null;
let presentsDelivered = 0;
let citiesVisited = 0;
let moveTimer = null;
let countdownTimer = null;
let nextMoveTime = 0;
let isChristmasDay = false;
let isWorkshopMode = false;

// North Pole Workshop location
const NORTH_POLE = {
  city: "Santa's Workshop",
  country: "North Pole",
  lat: 90,
  lng: 0,
  timezone: 'UTC'
};

// Configuration
const MIN_MOVE_INTERVAL = 30000; // 30 seconds minimum
const MAX_MOVE_INTERVAL = 60000; // 60 seconds maximum
const MIN_PRESENTS_PER_STOP = 10000;
const MAX_PRESENTS_PER_STOP = 50000;

// Workshop activity messages
const WORKSHOP_ACTIVITIES = [
  "🔨 Building wooden trains",
  "🧸 Stuffing teddy bears",
  "🎮 Testing video games",
  "📝 Checking the nice list",
  "🍪 Eating cookies with elves",
  "🦌 Feeding the reindeer",
  "🛷 Polishing the sleigh",
  "🎁 Wrapping presents",
  "📖 Reading wish letters",
  "⭐ Making toys sparkle",
  "🧵 Sewing doll clothes",
  "🎨 Painting toy soldiers",
  "🔔 Tuning sleigh bells",
  "🗺️ Planning the route",
  "☕ Hot cocoa break!"
];

// DOM elements
let cityNameEl, countryNameEl, localTimeEl, presentsCountEl, citiesCountEl, countdownEl;
let panelSubtitleEl, locationLabelEl, presentsLabelEl, citiesLabelEl, countdownLabelEl;
let presentsIconEl, citiesIconEl;

/**
 * Check if today is Christmas Day (December 25th)
 * @returns {boolean}
 */
function checkIfChristmas() {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed, so December = 11
  const day = now.getDate();
  return month === 11 && day === 25;
}

/**
 * Get days until Christmas
 * @returns {Object} { days, hours, minutes, seconds }
 */
function getTimeUntilChristmas() {
  const now = new Date();
  const year = now.getMonth() === 11 && now.getDate() > 25 
    ? now.getFullYear() + 1 
    : now.getFullYear();
  const christmas = new Date(year, 11, 25, 0, 0, 0);
  const diff = christmas - now;
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isChristmas: true };
  }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isChristmas: false
  };
}

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
  
  // Labels that change based on mode
  panelSubtitleEl = document.getElementById('panel-subtitle');
  locationLabelEl = document.getElementById('location-label');
  presentsLabelEl = document.getElementById('presents-label');
  citiesLabelEl = document.getElementById('cities-label');
  countdownLabelEl = document.getElementById('countdown-label');
  presentsIconEl = document.getElementById('presents-icon');
  citiesIconEl = document.getElementById('cities-icon');

  // Check if it's Christmas Day
  isChristmasDay = checkIfChristmas();
  
  if (isChristmasDay) {
    // 🎄 IT'S CHRISTMAS! Santa is delivering presents!
    console.log('🎄 Merry Christmas! Santa is delivering presents!');
    isWorkshopMode = false;
    
    // Start with initial location
    moveToNextLocation(false);
    
    // Start the movement cycle
    scheduleNextMove();
  } else {
    // 🏠 Not Christmas - Santa is at the North Pole workshop
    console.log('🏠 Santa is at the North Pole preparing for Christmas!');
    isWorkshopMode = true;
    
    // Set Santa at North Pole
    currentLocation = NORTH_POLE;
    updateSantaPosition(NORTH_POLE.lat, NORTH_POLE.lng, false);
    updateWorkshopUI();
    
    // Start workshop activity cycle
    scheduleWorkshopActivity();
  }

  // Update local time every second
  setInterval(updateLocalTime, 1000);
  
  // Check for midnight to switch modes
  scheduleChristmasCheck();
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

  // Add flight path from previous to current location
  if (previousLocation && animate) {
    addFlightPath(previousLocation, currentLocation);
  }

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
    
    // Trigger fun features
    onSantaArrival(currentLocation, presentsDelivered + presentsThisStop, citiesVisited);
    
    // Check for aurora (northern locations)
    checkAuroraEffect(currentLocation);
  }

  // Announce for screen readers
  announceLocation();
}

/**
 * Check if we should show aurora effect
 */
function checkAuroraEffect(location) {
  const auroraOverlay = document.getElementById('aurora-overlay');
  if (!auroraOverlay) return;
  
  // Show aurora for locations above 60° latitude
  const isNorthern = location.lat > 60 || location.lat < -60;
  auroraOverlay.classList.toggle('visible', isNorthern);
}

/**
 * Schedule the next Santa movement (Christmas Day only)
 */
function scheduleNextMove() {
  if (!isChristmasDay || isWorkshopMode) return;
  
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
 * Schedule workshop activity updates (non-Christmas days)
 */
function scheduleWorkshopActivity() {
  if (isChristmasDay || !isWorkshopMode) return;
  
  // Clear existing timers
  if (moveTimer) clearTimeout(moveTimer);
  if (countdownTimer) clearInterval(countdownTimer);
  
  // Update activity every 10-20 seconds
  const interval = 10000 + Math.random() * 10000;
  
  // Update countdown to show time until Christmas
  countdownTimer = setInterval(updateChristmasCountdown, 1000);
  
  // Schedule next activity
  moveTimer = setTimeout(() => {
    updateWorkshopActivity();
    scheduleWorkshopActivity();
  }, interval);
}

/**
 * Update workshop UI with current activity
 */
function updateWorkshopUI() {
  // Update labels for workshop mode
  if (panelSubtitleEl) panelSubtitleEl.textContent = "🔨 Workshop Mode";
  if (locationLabelEl) locationLabelEl.textContent = "Santa is currently at";
  if (presentsLabelEl) presentsLabelEl.textContent = "Presents Made";
  if (citiesLabelEl) citiesLabelEl.textContent = "Elves Working";
  if (countdownLabelEl) countdownLabelEl.textContent = "Christmas in";
  if (presentsIconEl) presentsIconEl.textContent = "🔨";
  if (citiesIconEl) citiesIconEl.textContent = "🧝";
  
  if (cityNameEl) {
    cityNameEl.textContent = "Santa's Workshop";
    cityNameEl.classList.add('animate-santa-arrive');
    setTimeout(() => cityNameEl.classList.remove('animate-santa-arrive'), 800);
  }

  if (countryNameEl) {
    countryNameEl.textContent = "North Pole 🎅";
  }

  // Update mobile peek content
  updatePeekContent("Santa's Workshop", "North Pole", null);

  // Update presents to show "presents being made"
  if (presentsCountEl) {
    presentsCountEl.textContent = "0";
  }
  
  // Show number of elves working
  if (citiesCountEl) {
    citiesCountEl.textContent = formatNumber(Math.floor(Math.random() * 500) + 1000);
  }

  updateLocalTime();
  updateWorkshopActivity();
}

/**
 * Update UI labels for delivery mode (Christmas Day)
 */
function updateDeliveryUI() {
  if (panelSubtitleEl) panelSubtitleEl.textContent = "🎄 Christmas Eve Journey";
  if (locationLabelEl) locationLabelEl.textContent = "Santa is currently in";
  if (presentsLabelEl) presentsLabelEl.textContent = "Presents Delivered";
  if (citiesLabelEl) citiesLabelEl.textContent = "Cities Visited";
  if (countdownLabelEl) countdownLabelEl.textContent = "Next stop in";
  if (presentsIconEl) presentsIconEl.textContent = "🎁";
  if (citiesIconEl) citiesIconEl.textContent = "🌍";
}

/**
 * Update workshop activity message
 */
function updateWorkshopActivity() {
  const activity = WORKSHOP_ACTIVITIES[Math.floor(Math.random() * WORKSHOP_ACTIVITIES.length)];
  
  // Show activity as a toast notification
  showWorkshopToast(activity);
  
  // Animate presents being made (increment slowly)
  if (presentsCountEl && presentsCountEl.textContent !== "Making...") {
    const current = parseInt(presentsCountEl.textContent.replace(/,/g, '')) || 0;
    const newCount = current + Math.floor(Math.random() * 1000) + 500;
    presentsCountEl.textContent = formatNumber(newCount);
  } else if (presentsCountEl) {
    presentsCountEl.textContent = formatNumber(Math.floor(Math.random() * 5000) + 1000);
  }
}

/**
 * Show workshop activity toast
 */
function showWorkshopToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.add('visible');
  
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000);
}

/**
 * Update countdown to Christmas (workshop mode)
 */
function updateChristmasCountdown() {
  const time = getTimeUntilChristmas();
  
  let countdownText;
  if (time.isChristmas) {
    countdownText = "🎄 IT'S CHRISTMAS!";
    // Switch to delivery mode!
    switchToDeliveryMode();
  } else if (time.days > 0) {
    countdownText = `${time.days}d ${time.hours}h`;
  } else if (time.hours > 0) {
    countdownText = `${time.hours}h ${time.minutes}m`;
  } else {
    countdownText = `${time.minutes}m ${time.seconds}s`;
  }
  
  if (countdownEl) {
    countdownEl.textContent = countdownText;
  }
  
  // Update mobile peek
  updatePeekContent(null, null, countdownText);
}

/**
 * Switch from workshop mode to delivery mode
 */
function switchToDeliveryMode() {
  if (!isWorkshopMode) return;
  
  console.log('🎄 SWITCHING TO DELIVERY MODE! Merry Christmas!');
  isChristmasDay = true;
  isWorkshopMode = false;
  
  // Clear workshop timers
  if (moveTimer) clearTimeout(moveTimer);
  if (countdownTimer) clearInterval(countdownTimer);
  
  // Update UI labels for delivery mode
  updateDeliveryUI();
  
  // Reset counters
  presentsDelivered = 0;
  citiesVisited = 0;
  if (presentsCountEl) presentsCountEl.textContent = "0";
  if (citiesCountEl) citiesCountEl.textContent = "0";
  
  // Start delivering!
  moveToNextLocation(true);
  scheduleNextMove();
  
  // Show celebration toast
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = "🎄🎅 IT'S CHRISTMAS! Santa is now delivering presents! 🎁✨";
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 5000);
  }
}

/**
 * Schedule check for Christmas Day at midnight
 */
function scheduleChristmasCheck() {
  // Check every minute if it's become Christmas
  setInterval(() => {
    const wasChristmas = isChristmasDay;
    isChristmasDay = checkIfChristmas();
    
    // If it just became Christmas, switch modes!
    if (!wasChristmas && isChristmasDay && isWorkshopMode) {
      switchToDeliveryMode();
    }
    
    // If Christmas just ended, switch back to workshop
    if (wasChristmas && !isChristmasDay && !isWorkshopMode) {
      switchToWorkshopMode();
    }
  }, 60000); // Check every minute
}

/**
 * Switch back to workshop mode after Christmas
 */
function switchToWorkshopMode() {
  console.log('🏠 Christmas is over. Santa is heading back to the North Pole!');
  isWorkshopMode = true;
  
  // Clear delivery timers
  if (moveTimer) clearTimeout(moveTimer);
  if (countdownTimer) clearInterval(countdownTimer);
  
  // Reset stats for next year
  presentsDelivered = 0;
  citiesVisited = 0;
  
  // Move Santa back to North Pole
  currentLocation = NORTH_POLE;
  updateSantaPosition(NORTH_POLE.lat, NORTH_POLE.lng, true);
  updateWorkshopUI();
  
  // Start workshop cycle
  scheduleWorkshopActivity();
  
  // Show toast
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = "🏠 Santa is back at the North Pole! See you next Christmas! 🎄";
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 5000);
  }
}

/**
 * Update the countdown display
 */
function updateCountdown() {
  const remaining = Math.max(0, nextMoveTime - Date.now());
  const seconds = Math.ceil(remaining / 1000);
  const countdownText = `${seconds}s`;

  if (countdownEl) {
    countdownEl.textContent = countdownText;

    // Add pulse effect when close
    if (seconds <= 5) {
      countdownEl.classList.add('animate-pulse-glow');
    } else {
      countdownEl.classList.remove('animate-pulse-glow');
    }
  }

  // Update mobile peek countdown
  updatePeekContent(null, null, countdownText);
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

  // Update mobile peek content
  updatePeekContent(currentLocation.city, currentLocation.country, null);

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
