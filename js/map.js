/**
 * Santa Tracker - Map Module
 * Handles Leaflet map initialization and controls
 */

// Map instance
let map = null;
let santaMarker = null;
let visitedMarkers = [];
let flightPaths = [];

// Map configuration
const MAP_CONFIG = {
  center: [20, 0], // Center on Atlantic for global view
  zoom: 2,
  minZoom: 2,
  maxZoom: 12,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0
};

// Dark tile layer for festive night theme
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

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

  // Add dark tile layer
  L.tileLayer(TILE_URL, {
    attribution: TILE_ATTRIBUTION,
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Position zoom controls
  map.zoomControl.setPosition('bottomright');

  // Add custom attribution
  map.attributionControl.addAttribution('🎅 Santa Tracker');

  return map;
}

/**
 * Create custom Santa marker icon
 * @returns {Object} Leaflet divIcon
 */
function createSantaIcon() {
  return L.divIcon({
    className: 'santa-marker',
    html: '<div class="santa-icon" id="santa-icon">🛷</div>',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
  });
}

/**
 * Create visited location marker (present)
 * @returns {Object} Leaflet divIcon
 */
function createPresentIcon() {
  return L.divIcon({
    className: 'visited-marker',
    html: '🎁',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
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

  // Create and add new marker
  const marker = L.marker([lat, lng], {
    icon: createPresentIcon(),
    zIndexOffset: 100
  }).addTo(map);

  // Add popup with city name
  marker.bindPopup(`<strong>🎁 ${cityName}</strong><br>Santa was here!`, {
    className: 'santa-popup'
  });

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
 * Add flight path between two locations
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

  // Calculate great circle path points for curved line
  const points = calculateGreatCircle(from, to, 50);

  // Create polyline with dashed style
  const path = L.polyline(points, {
    color: '#ffd700',
    weight: 2,
    opacity: 0.6,
    dashArray: '10, 5',
    className: 'flight-path'
  }).addTo(map);

  // Animate the path appearing
  path.getElement()?.classList.add('flight-path-animate');

  flightPaths.push(path);

  // Fade out old paths
  flightPaths.forEach((p, index) => {
    const opacity = 0.2 + (index / flightPaths.length) * 0.4;
    p.setStyle({ opacity });
  });
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
