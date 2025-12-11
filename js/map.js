/**
 * Santa Tracker - Map Module
 * Handles Leaflet map initialization and controls
 * Enhanced for kid-friendly cartoon experience
 */

// Map instance
let map = null;
let santaMarker = null;
let visitedMarkers = [];
let flightPaths = [];
let landmarkMarkers = [];
let reindeerMarkers = [];

// Map configuration
const MAP_CONFIG = {
  center: [20, 0], // Center on Atlantic for global view
  zoom: 2,
  minZoom: 2,
  maxZoom: 12,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0
};

// Use a lighter, more kid-friendly map style (Positron/Light)
// This creates a "snowy" effect when combined with our CSS filters
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Famous landmarks for kids to discover
const LANDMARKS = [
  { lat: 48.8584, lng: 2.2945, name: 'Eiffel Tower', emoji: '🗼', fact: 'The Eiffel Tower sparkles with 20,000 lights every night!' },
  { lat: 40.6892, lng: -74.0445, name: 'Statue of Liberty', emoji: '🗽', fact: 'Lady Liberty wears a size 879 shoe!' },
  { lat: 51.5014, lng: -0.1419, name: 'Big Ben', emoji: '🕐', fact: 'Big Ben\'s clock faces are 23 feet wide!' },
  { lat: 27.1751, lng: 78.0421, name: 'Taj Mahal', emoji: '🕌', fact: 'The Taj Mahal changes color throughout the day!' },
  { lat: -22.9519, lng: -43.2105, name: 'Christ the Redeemer', emoji: '⛪', fact: 'This statue is 98 feet tall - as big as a 10-story building!' },
  { lat: 41.8902, lng: 12.4922, name: 'Colosseum', emoji: '🏛️', fact: 'The Colosseum could hold 50,000 spectators!' },
  { lat: 35.6586, lng: 139.7454, name: 'Tokyo Tower', emoji: '🗼', fact: 'Tokyo Tower is painted orange and white for air safety!' },
  { lat: -33.8568, lng: 151.2153, name: 'Sydney Opera House', emoji: '🎭', fact: 'The roof has over 1 million tiles!' },
  { lat: 40.4319, lng: 116.5704, name: 'Great Wall of China', emoji: '🧱', fact: 'The Great Wall is over 13,000 miles long!' },
  { lat: 29.9792, lng: 31.1342, name: 'Pyramids of Giza', emoji: '🔺', fact: 'The pyramids are over 4,500 years old!' },
  { lat: 64.1466, lng: -21.9426, name: 'North Pole Village', emoji: '🏠', fact: 'Santa\'s workshop is here! 🎅' },
  { lat: 60.1699, lng: 24.9384, name: 'Santa\'s Village', emoji: '🎄', fact: 'Rovaniemi, Finland - Santa\'s official hometown!' },
];

/**
 * Initialize the Leaflet map
 * @returns {Object} Leaflet map instance
 */
export function initMap() {
  // Create map instance
  map = L.map('map', {
    center: MAP_CONFIG.center,
    zoom: MAP_CONFIG.zoom,
    minZoom: MAP_CONFIG.minZoom,
    maxZoom: MAP_CONFIG.maxZoom,
    maxBounds: MAP_CONFIG.maxBounds,
    maxBoundsViscosity: MAP_CONFIG.maxBoundsViscosity,
    zoomControl: true,
    attributionControl: true,
    worldCopyJump: true
  });

  // Add light/snowy tile layer (CSS filters make it look snowy)
  L.tileLayer(TILE_URL, {
    attribution: TILE_ATTRIBUTION,
    subdomains: 'abcd',
    maxZoom: 19,
    className: 'snowy-tiles'
  }).addTo(map);

  // Position zoom controls
  map.zoomControl.setPosition('bottomright');

  // Add custom attribution
  map.attributionControl.addAttribution('🎅 Santa Tracker');

  // Add famous landmarks for kids to discover
  addLandmarks();

  // Add map click handler for fun interactions
  map.on('click', handleMapClick);

  return map;
}

/**
 * Add famous landmarks to the map for kids to discover
 */
function addLandmarks() {
  LANDMARKS.forEach(landmark => {
    const icon = L.divIcon({
      className: 'landmark-marker',
      html: `<div class="landmark-icon" data-name="${landmark.name}">${landmark.emoji}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const marker = L.marker([landmark.lat, landmark.lng], {
      icon: icon,
      zIndexOffset: 50
    }).addTo(map);

    // Kid-friendly popup with fun fact
    const popupContent = `
      <div class="landmark-popup">
        <div class="landmark-popup-emoji">${landmark.emoji}</div>
        <h3 class="landmark-popup-title">${landmark.name}</h3>
        <p class="landmark-popup-fact">💡 ${landmark.fact}</p>
      </div>
    `;

    marker.bindPopup(popupContent, {
      className: 'cartoon-popup landmark-popup-container',
      maxWidth: 250
    });

    // Add bounce animation on hover
    marker.on('mouseover', () => {
      marker.getElement()?.classList.add('landmark-bounce');
    });
    marker.on('mouseout', () => {
      marker.getElement()?.classList.remove('landmark-bounce');
    });

    landmarkMarkers.push(marker);
  });
}

/**
 * Handle map clicks for fun interactions
 */
function handleMapClick(e) {
  // Create a fun snow burst effect where clicked
  createSnowBurst(e.containerPoint.x, e.containerPoint.y);
}

/**
 * Create custom Santa marker icon - BIG and kid-friendly!
 * @returns {Object} Leaflet divIcon
 */
function createSantaIcon() {
  return L.divIcon({
    className: 'santa-marker',
    html: `
      <div class="santa-icon-container" id="santa-icon">
        <div class="santa-glow"></div>
        <div class="santa-sleigh">🛷</div>
        <div class="santa-reindeer">🦌</div>
        <div class="santa-trail"></div>
      </div>
    `,
    iconSize: [80, 80],
    iconAnchor: [40, 40]
  });
}

/**
 * Create visited location marker (present) - bigger for kids!
 * @param {string} cityName - Name of the city for the tooltip
 * @returns {Object} Leaflet divIcon
 */
function createPresentIcon(cityName) {
  const presents = ['🎁', '🎀', '📦', '🧸', '🎄'];
  const randomPresent = presents[Math.floor(Math.random() * presents.length)];
  
  return L.divIcon({
    className: 'visited-marker cartoon-present',
    html: `<div class="present-icon" title="Santa visited ${cityName}!">${randomPresent}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
}

/**
 * Create snow burst effect at click location
 */
function createSnowBurst(x, y) {
  const burst = document.createElement('div');
  burst.className = 'map-snow-burst';
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  
  // Create snowflake particles
  for (let i = 0; i < 8; i++) {
    const flake = document.createElement('div');
    flake.className = 'burst-flake';
    flake.textContent = '❄️';
    flake.style.setProperty('--angle', `${i * 45}deg`);
    burst.appendChild(flake);
  }
  
  document.body.appendChild(burst);
  
  // Remove after animation
  setTimeout(() => burst.remove(), 1000);
}

/**
 * Add or update Santa's position on the map
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {boolean} animate - Whether to animate the transition
 */
export function updateSantaPosition(lat, lng, animate = true) {
  const newPosition = [lat, lng];

  if (!santaMarker) {
    // Create Santa marker for the first time
    santaMarker = L.marker(newPosition, {
      icon: createSantaIcon(),
      zIndexOffset: 1000
    }).addTo(map);
  } else {
    // Get current position for animation
    const currentPos = santaMarker.getLatLng();

    if (animate) {
      // Trigger flying animation
      const santaIcon = document.getElementById('santa-icon');
      if (santaIcon) {
        santaIcon.classList.add('flying');
        setTimeout(() => {
          santaIcon.classList.remove('flying');
        }, 500);
      }
    }

    // Update marker position
    santaMarker.setLatLng(newPosition);
  }

  // Smoothly pan map to new location
  if (animate) {
    map.flyTo(newPosition, Math.max(map.getZoom(), 4), {
      duration: 1.5,
      easeLinearity: 0.25
    });
  } else {
    map.setView(newPosition, Math.max(map.getZoom(), 4));
  }
}

/**
 * Add a visited location marker (present left behind)
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} cityName - Name of the city
 */
export function addVisitedMarker(lat, lng, cityName) {
  // Limit the number of visible markers to avoid performance issues
  const MAX_VISIBLE_MARKERS = 50;

  if (visitedMarkers.length >= MAX_VISIBLE_MARKERS) {
    // Remove oldest marker
    const oldestMarker = visitedMarkers.shift();
    map.removeLayer(oldestMarker);
  }

  // Create and add new marker with random present
  const marker = L.marker([lat, lng], {
    icon: createPresentIcon(cityName),
    zIndexOffset: 100
  }).addTo(map);

  // Kid-friendly popup with fun message
  const messages = [
    'Santa left presents here! 🎉',
    'Ho ho ho! Gifts delivered! 🎅',
    'All the good kids got presents! ⭐',
    'Santa\'s magic was here! ✨',
    'Presents under the tree! 🎄'
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  marker.bindPopup(`
    <div class="visited-popup">
      <h3>🎁 ${cityName}</h3>
      <p>${randomMessage}</p>
    </div>
  `, {
    className: 'cartoon-popup visited-popup-container'
  });

  // Add drop animation class
  setTimeout(() => {
    marker.getElement()?.classList.add('present-dropped');
  }, 100);

  visitedMarkers.push(marker);
}

/**
 * Get the map instance
 * @returns {Object} Leaflet map instance
 */
export function getMap() {
  return map;
}

/**
 * Clear all visited markers
 */
export function clearVisitedMarkers() {
  visitedMarkers.forEach(marker => map.removeLayer(marker));
  visitedMarkers = [];
}

/**
 * Show arrival effect at coordinates
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 */
export function showArrivalEffect(lat, lng) {
  const point = map.latLngToContainerPoint([lat, lng]);
  const arrivalEffect = document.getElementById('arrival-effect');

  if (arrivalEffect) {
    // Create burst particles
    arrivalEffect.innerHTML = '';
    arrivalEffect.style.left = `${point.x}px`;
    arrivalEffect.style.top = `${point.y}px`;

    const burst = document.createElement('div');
    burst.className = 'arrival-burst';

    // Create particles
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.transform = `rotate(${i * 45}deg) translateX(30px)`;
      burst.appendChild(particle);
    }

    arrivalEffect.appendChild(burst);
    arrivalEffect.style.opacity = '1';

    // Clean up after animation
    setTimeout(() => {
      arrivalEffect.style.opacity = '0';
      arrivalEffect.innerHTML = '';
    }, 800);
  }
}

/**
 * Add flight path between two locations with animated reindeer!
 * @param {Object} from - Starting location {lat, lng}
 * @param {Object} to - Ending location {lat, lng}
 */
export function addFlightPath(from, to) {
  if (!map) return;

  // Limit number of visible paths
  const MAX_PATHS = 20;
  if (flightPaths.length >= MAX_PATHS) {
    const oldPath = flightPaths.shift();
    map.removeLayer(oldPath);
  }

  // Remove old reindeer markers
  reindeerMarkers.forEach(m => map.removeLayer(m));
  reindeerMarkers = [];

  // Calculate great circle path points for curved line
  const points = calculateGreatCircle(from, to, 50);

  // Create sparkly flight path (more magical for kids!)
  const path = L.polyline(points, {
    color: '#FFD700',
    weight: 4,
    opacity: 0.8,
    dashArray: '15, 10',
    className: 'flight-path magical-path',
    lineCap: 'round'
  }).addTo(map);

  // Add sparkle overlay path
  const sparklePath = L.polyline(points, {
    color: '#FFFFFF',
    weight: 2,
    opacity: 0.6,
    dashArray: '5, 20',
    className: 'sparkle-path'
  }).addTo(map);

  // Animate the path appearing
  path.getElement()?.classList.add('flight-path-animate');
  sparklePath.getElement()?.classList.add('sparkle-animate');

  flightPaths.push(path);
  flightPaths.push(sparklePath);

  // Add animated reindeer along the path!
  addReindeerToPath(points);

  // Fade out old paths
  flightPaths.forEach((p, index) => {
    const opacity = 0.3 + (index / flightPaths.length) * 0.5;
    p.setStyle({ opacity });
  });
}

/**
 * Add animated reindeer along the flight path
 * @param {Array} points - Path points
 */
function addReindeerToPath(points) {
  // Add 2-3 reindeer along the path
  const reindeerCount = 3;
  const reindeerEmojis = ['🦌', '🦌', '🦌'];
  
  for (let i = 0; i < reindeerCount; i++) {
    const pointIndex = Math.floor((points.length / (reindeerCount + 1)) * (i + 1));
    const point = points[pointIndex];
    
    if (point) {
      const reindeerIcon = L.divIcon({
        className: 'reindeer-marker',
        html: `<div class="reindeer-icon" style="animation-delay: ${i * 0.2}s">${reindeerEmojis[i]}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const reindeer = L.marker(point, {
        icon: reindeerIcon,
        zIndexOffset: 500
      }).addTo(map);

      reindeerMarkers.push(reindeer);
    }
  }
}

/**
 * Calculate points along a great circle path
 * @param {Object} from - Starting point
 * @param {Object} to - Ending point
 * @param {number} numPoints - Number of points to generate
 * @returns {Array} Array of [lat, lng] points
 */
function calculateGreatCircle(from, to, numPoints) {
  const points = [];
  const lat1 = from.lat * Math.PI / 180;
  const lng1 = from.lng * Math.PI / 180;
  const lat2 = to.lat * Math.PI / 180;
  const lng2 = to.lng * Math.PI / 180;

  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints;
    const d = Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)
    );

    if (d === 0) {
      points.push([from.lat, from.lng]);
      continue;
    }

    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);

    const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
    const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);

    const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * 180 / Math.PI;
    const lng = Math.atan2(y, x) * 180 / Math.PI;

    points.push([lat, lng]);
  }

  return points;
}

/**
 * Clear all flight paths
 */
export function clearFlightPaths() {
  flightPaths.forEach(path => map.removeLayer(path));
  flightPaths = [];
}
