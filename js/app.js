/**
 * Santa Tracker - Main Application Entry Point
 * Initializes all modules and handles app lifecycle
 */

import { initMap } from './map.js';
import { initSanta } from './santa.js';
import { initAnimations } from './animations.js';
import { initShare } from './share.js';
import { initPanel } from './panel.js';
import { initFeatures } from './features.js';

// Loading screen element
let loadingScreen;

/**
 * Initialize the application
 */
async function init() {
  console.log('🎅 Santa Tracker initializing...');

  loadingScreen = document.getElementById('loading-screen');

  try {
    // Wait for DOM to be fully ready
    await waitForDOM();

    // Initialize map first (critical for app)
    console.log('Initializing map...');
    initMap();

    // Initialize Santa tracking
    console.log('Initializing Santa tracking...');
    initSanta();

    // Initialize animations (non-blocking)
    console.log('Initializing animations...');
    initAnimations();

    // Initialize share functionality
    console.log('Initializing share...');
    initShare();

    // Initialize mobile panel controller
    console.log('Initializing panel...');
    initPanel();

    // Initialize fun features
    console.log('Initializing features...');
    initFeatures();

    // Hide loading screen
    hideLoadingScreen();

    console.log('🎄 Santa Tracker ready!');

  } catch (error) {
    console.error('Failed to initialize Santa Tracker:', error);
    showError('Failed to load Santa Tracker. Please refresh the page.');
  }
}

/**
 * Wait for DOM to be ready
 * @returns {Promise} Resolves when DOM is ready
 */
function waitForDOM() {
  return new Promise(resolve => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve);
    }
  });
}

/**
 * Hide the loading screen with animation
 */
function hideLoadingScreen() {
  if (loadingScreen) {
    // Add hidden class for CSS transition
    loadingScreen.classList.add('hidden');

    // Remove from DOM after transition
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

/**
 * Show error message to user
 * @param {string} message - Error message
 */
function showError(message) {
  if (loadingScreen) {
    const content = loadingScreen.querySelector('.loading-content');
    if (content) {
      content.innerHTML = `
        <div class="error-icon">❌</div>
        <h1>Oops!</h1>
        <p>${message}</p>
        <button onclick="location.reload()" class="retry-btn">Try Again</button>
      `;
    }
  }
}

/**
 * Handle keyboard shortcuts
 */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Press 'S' to trigger share
    if (e.key === 's' || e.key === 'S') {
      if (!e.ctrlKey && !e.metaKey) {
        // Could trigger share modal here
        console.log('Share shortcut triggered');
      }
    }

    // Press 'F' for fullscreen toggle
    if (e.key === 'f' || e.key === 'F') {
      if (!e.ctrlKey && !e.metaKey) {
        toggleFullscreen();
      }
    }
  });
}

/**
 * Toggle fullscreen mode
 */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Fullscreen not supported:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

/**
 * Register service worker for offline capability (optional enhancement)
 */
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/santa-tracker/sw.js');
      console.log('ServiceWorker registered:', registration);
    } catch (error) {
      console.log('ServiceWorker registration failed:', error);
    }
  }
}

/**
 * Performance monitoring
 */
function reportPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          console.log('📊 Performance:', {
            loadTime: Math.round(perfData.loadEventEnd - perfData.startTime) + 'ms',
            domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.startTime) + 'ms',
            firstPaint: Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0) + 'ms'
          });
        }
      }, 0);
    });
  }
}

// Initialize keyboard shortcuts
initKeyboardShortcuts();

// Report performance metrics
reportPerformance();

// Start the app
init();
