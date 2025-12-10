/**
 * Santa Tracker - Social Sharing Module
 * Handles share buttons and link copying
 */

import { getSantaState } from './santa.js';

// Toast element
let toastEl;
let toastTimeout;

/**
 * Initialize share functionality
 */
export function initShare() {
  toastEl = document.getElementById('toast');

  // Twitter/X share button
  const twitterBtn = document.getElementById('share-twitter');
  if (twitterBtn) {
    twitterBtn.addEventListener('click', shareToTwitter);
  }

  // Facebook share button
  const facebookBtn = document.getElementById('share-facebook');
  if (facebookBtn) {
    facebookBtn.addEventListener('click', shareToFacebook);
  }

  // Copy link button
  const copyBtn = document.getElementById('share-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyLink);
  }
}

/**
 * Get share text based on current Santa location
 * @returns {string} Share message
 */
function getShareText() {
  const state = getSantaState();
  if (!state.location) {
    return "Track Santa's magical journey around the globe! #SantaTracker #ChristmasEve";
  }

  return `Santa is currently delivering presents in ${state.location.city}, ${state.location.country}! Track his magical journey: #SantaTracker #ChristmasEve`;
}

/**
 * Get the current page URL
 * @returns {string} Current URL
 */
function getShareUrl() {
  return window.location.href;
}

/**
 * Share to Twitter/X
 */
function shareToTwitter() {
  const text = getShareText();
  const url = getShareUrl();

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

  window.open(twitterUrl, '_blank', 'width=550,height=420,noopener,noreferrer');

  // Track share (could send to analytics)
  console.log('Shared to Twitter');
}

/**
 * Share to Facebook
 */
function shareToFacebook() {
  const url = getShareUrl();

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  window.open(facebookUrl, '_blank', 'width=550,height=420,noopener,noreferrer');

  // Track share
  console.log('Shared to Facebook');
}

/**
 * Copy link to clipboard
 */
async function copyLink() {
  const state = getSantaState();
  let textToCopy = getShareUrl();

  // Add location context to copied text
  if (state.location) {
    textToCopy = `Santa is in ${state.location.city}, ${state.location.country}! Track him here: ${getShareUrl()}`;
  }

  try {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy);
      showToast('Link copied to clipboard!');
    } else {
      // Fallback for older browsers
      fallbackCopyToClipboard(textToCopy);
    }
  } catch (err) {
    console.error('Failed to copy:', err);
    showToast('Failed to copy link');
  }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 */
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  textArea.style.top = '-9999px';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast('Link copied to clipboard!');
    } else {
      showToast('Failed to copy link');
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
    showToast('Failed to copy link');
  }

  document.body.removeChild(textArea);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {number} duration - Duration in ms
 */
function showToast(message, duration = 3000) {
  if (!toastEl) return;

  // Clear any existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // Set message and show
  toastEl.textContent = message;
  toastEl.classList.add('visible');

  // Hide after duration
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('visible');
  }, duration);
}

/**
 * Web Share API (for mobile devices that support it)
 */
export async function nativeShare() {
  const state = getSantaState();

  const shareData = {
    title: 'Santa Tracker',
    text: getShareText(),
    url: getShareUrl()
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      console.log('Shared successfully');
    } else {
      // Fallback to copy
      copyLink();
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Share failed:', err);
    }
  }
}
