/**
 * Santa Tracker - Fun Features Module
 * Adds delightful events and interactions to the experience
 */

// ==========================================
// STATE & CONFIGURATION
// ==========================================

let state = {
  cookiesEaten: 0,
  milkDrunk: 0,
  currentSpeed: 0,
  currentReindeer: '',
  achievements: [],
  lastGiftType: '',
  musicPlaying: false,
  soundEnabled: true,
  continentsVisited: new Set(),
  nightOwlUnlocked: false,
  startTime: Date.now()
};

// Reindeer team
const reindeer = [
  { name: 'Dasher', emoji: '🦌', trait: 'the speedster' },
  { name: 'Dancer', emoji: '🦌', trait: 'the graceful' },
  { name: 'Prancer', emoji: '🦌', trait: 'the proud' },
  { name: 'Vixen', emoji: '🦌', trait: 'the clever' },
  { name: 'Comet', emoji: '🦌', trait: 'the bright' },
  { name: 'Cupid', emoji: '🦌', trait: 'the loving' },
  { name: 'Donner', emoji: '🦌', trait: 'the strong' },
  { name: 'Blitzen', emoji: '🦌', trait: 'the lightning' },
  { name: 'Rudolph', emoji: '🔴', trait: 'the guide', special: true }
];

// Gift types with weights
const giftTypes = [
  { name: 'Teddy Bears', emoji: '🧸', weight: 15 },
  { name: 'Building Blocks', emoji: '🧱', weight: 12 },
  { name: 'Dolls', emoji: '🪆', weight: 10 },
  { name: 'Video Games', emoji: '🎮', weight: 12 },
  { name: 'Books', emoji: '📚', weight: 15 },
  { name: 'Bicycles', emoji: '🚲', weight: 5 },
  { name: 'Art Supplies', emoji: '🎨', weight: 10 },
  { name: 'Sports Equipment', emoji: '⚽', weight: 8 },
  { name: 'Musical Instruments', emoji: '🎸', weight: 5 },
  { name: 'Puzzles', emoji: '🧩', weight: 10 },
  { name: 'Board Games', emoji: '🎲', weight: 8 },
  { name: 'LEGO Sets', emoji: '🏗️', weight: 10 },
  { name: 'Stuffed Animals', emoji: '🐻', weight: 12 },
  { name: 'RC Cars', emoji: '🚗', weight: 6 },
  { name: 'Science Kits', emoji: '🔬', weight: 7 },
  { name: 'Candy', emoji: '🍬', weight: 15 },
  { name: 'Chocolates', emoji: '🍫', weight: 12 }
];

// Santa's messages
const santaMessages = [
  "Ho Ho Ho! 🎅",
  "Merry Christmas to all!",
  "The reindeer are flying wonderfully tonight!",
  "So many good children this year!",
  "Mrs. Claus packed extra cookies!",
  "The elves outdid themselves!",
  "What a beautiful night for flying!",
  "Almost to the next chimney!",
  "Rudolph's nose is extra bright tonight!",
  "Time for some milk and cookies!",
  "The sleigh is running perfectly!",
  "So many wishes to fulfill!",
  "Christmas magic is in the air!",
  "The Northern Lights are beautiful tonight!",
  "Every child deserves a gift!",
  "Spreading joy around the world!",
  "The stars are guiding us well!",
  "What wonderful letters this year!",
  "The workshop worked overtime!",
  "Love and joy to everyone!"
];

// City fun facts database
export const cityFunFacts = {
  'New York': "The Rockefeller Center Christmas tree tradition started in 1931!",
  'London': "The first Christmas card was sent from London in 1843!",
  'Paris': "The Eiffel Tower sparkles with 20,000 lights every night!",
  'Tokyo': "Christmas Eve is the most popular date night of the year in Japan!",
  'Sydney': "Australians celebrate Christmas in summer with beach BBQs!",
  'Rome': "The Vatican displays a life-size nativity scene in St. Peter's Square!",
  'Berlin': "Germany invented the Christmas tree tradition!",
  'Moscow': "Father Frost (Ded Moroz) delivers gifts on New Year's Eve!",
  'Dubai': "The world's tallest Christmas tree was displayed here at 40 meters!",
  'Rio de Janeiro': "Brazil celebrates with fireworks on Copacabana Beach!",
  'Toronto': "The Toronto Santa Claus Parade is the oldest in the world (since 1905)!",
  'Amsterdam': "Dutch children leave carrots in shoes for Santa's horse!",
  'Stockholm': "Swedes watch Donald Duck cartoons every Christmas Eve!",
  'Copenhagen': "The oldest amusement park, Tivoli Gardens, has magical Christmas lights!",
  'Vienna': "Vienna's Christmas markets date back to 1298!",
  'Hong Kong': "Victoria Harbour hosts a spectacular Christmas light show!",
  'Singapore': "Orchard Road transforms into a winter wonderland!",
  'Mumbai': "Midnight Mass at churches attracts thousands of visitors!",
  'Cairo': "Egypt celebrates Coptic Christmas on January 7th!",
  'Cape Town': "South Africans enjoy Christmas lunch outdoors!",
  'Mexico City': "Las Posadas celebrations last 9 days before Christmas!",
  'Buenos Aires': "Argentinians throw paper scraps from balconies at midnight!",
  'Rovaniemi': "This is Santa's OFFICIAL hometown in Finnish Lapland! 🎅",
  'Bethlehem': "The birthplace of Christmas itself! Manger Square hosts celebrations!",
  'Reykjavik': "Iceland has 13 Yule Lads who each bring a gift!",
  'Helsinki': "Finns visit saunas on Christmas Eve!",
  'Seoul': "South Korea is the only East Asian country with Christmas as a holiday!",
  'North Pole': "Santa's workshop is working overtime tonight! 🎁",
  'Nuremberg': "Home to the world-famous Christkindlesmarkt since 1628!",
  'Prague': "Old Town Square features a stunning Christmas tree and market!",
  'Strasbourg': "Known as the Capital of Christmas with 300+ stalls!",
  'Zurich': "The train station hosts Europe's largest indoor Christmas market!",
  'Barcelona': "Catalans have the quirky Caga Tió (pooping log) tradition!",
  'Venice': "Gondolas decorated with lights cruise the canals!",
  'Osaka': "KFC for Christmas dinner is a beloved tradition!",
  'San Francisco': "The historic cable cars are decorated with wreaths!",
  'Las Vegas': "The Bellagio fountains perform to Christmas music!",
  'Honolulu': "Santa arrives by outrigger canoe in Hawaii! 🏄"
};

// Achievement definitions
const achievements = [
  { id: 'first_stop', name: 'First Stop!', emoji: '🌟', desc: 'Watched Santa make his first delivery', condition: (s) => s.citiesVisited >= 1 },
  { id: 'night_owl', name: 'Night Owl', emoji: '🦉', desc: 'Tracked Santa past midnight', condition: () => new Date().getHours() >= 0 && new Date().getHours() < 5 },
  { id: 'globe_trotter', name: 'Globe Trotter', emoji: '🌍', desc: 'Saw Santa visit 5 continents', condition: (s) => s.continentsVisited.size >= 5 },
  { id: 'cookie_monster', name: 'Cookie Monster', emoji: '🍪', desc: 'Santa ate 100 cookies', condition: (s) => s.cookiesEaten >= 100 },
  { id: 'speed_demon', name: 'Speed Demon', emoji: '⚡', desc: 'Santa reached Mach 5000!', condition: (s) => s.topSpeed >= 5000 },
  { id: 'million_gifts', name: 'Million Gifts', emoji: '🎁', desc: 'Santa delivered 1 million presents!', condition: (s) => s.presentsDelivered >= 1000000 },
  { id: 'fifty_cities', name: 'World Tour', emoji: '🗺️', desc: 'Santa visited 50 cities', condition: (s) => s.citiesVisited >= 50 },
  { id: 'rudolph_fan', name: 'Rudolph Fan', emoji: '🔴', desc: 'Saw Rudolph lead the sleigh', condition: (s) => s.sawRudolph },
  { id: 'dedication', name: 'Dedicated Tracker', emoji: '⏰', desc: 'Tracked for 30 minutes', condition: () => (Date.now() - state.startTime) > 30 * 60 * 1000 },
  { id: 'special_city', name: 'North Pole Visit', emoji: '❄️', desc: 'Santa stopped at a special location', condition: (s) => s.visitedSpecial }
];

// Sound effects (using Web Audio API for generated sounds)
let audioContext = null;

// ==========================================
// INITIALIZATION
// ==========================================

export function initFeatures() {
  // Initialize audio context on first user interaction
  document.addEventListener('click', initAudio, { once: true });
  document.addEventListener('touchstart', initAudio, { once: true });
  
  // Set up UI elements
  setupFeaturesUI();
  
  // Start Christmas countdown
  updateChristmasCountdown();
  setInterval(updateChristmasCountdown, 1000);
  
  // Start periodic Santa messages
  setInterval(showRandomSantaMessage, 45000);
  
  // Check achievements periodically
  setInterval(checkAchievements, 5000);
  
  console.log('🎄 Fun features initialized!');
}

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// ==========================================
// UI SETUP
// ==========================================

function setupFeaturesUI() {
  // Create features container
  const featuresPanel = document.createElement('div');
  featuresPanel.id = 'features-panel';
  featuresPanel.className = 'features-panel';
  featuresPanel.innerHTML = `
    <div class="features-row">
      <div class="feature-item" id="cookie-display" title="Cookies & Milk consumed">
        <span class="feature-emoji">🍪</span>
        <span class="feature-value" id="cookie-count">0</span>
      </div>
      <div class="feature-item" id="speed-display" title="Santa's current speed">
        <span class="feature-emoji">⚡</span>
        <span class="feature-value" id="speed-value">Mach 0</span>
      </div>
      <div class="feature-item" id="reindeer-display" title="Lead reindeer">
        <span class="feature-emoji">🦌</span>
        <span class="feature-value" id="reindeer-name">--</span>
      </div>
    </div>
  `;
  
  // Create gift type display
  const giftDisplay = document.createElement('div');
  giftDisplay.id = 'gift-display';
  giftDisplay.className = 'gift-display hidden';
  giftDisplay.innerHTML = `
    <span class="gift-emoji" id="gift-emoji">🎁</span>
    <span class="gift-text">Delivering <span id="gift-type">gifts</span>!</span>
  `;
  
  // Create Christmas countdown
  const countdownDisplay = document.createElement('div');
  countdownDisplay.id = 'christmas-countdown';
  countdownDisplay.className = 'christmas-countdown';
  countdownDisplay.innerHTML = `
    <div class="countdown-label">🎄 Until Christmas</div>
    <div class="countdown-time" id="xmas-countdown-time">--:--:--</div>
  `;
  
  // Create fun fact display
  const factDisplay = document.createElement('div');
  factDisplay.id = 'fun-fact';
  factDisplay.className = 'fun-fact hidden';
  factDisplay.innerHTML = `
    <span class="fact-icon">💡</span>
    <span class="fact-text" id="fact-text"></span>
  `;
  
  // Create achievement popup
  const achievementPopup = document.createElement('div');
  achievementPopup.id = 'achievement-popup';
  achievementPopup.className = 'achievement-popup hidden';
  achievementPopup.innerHTML = `
    <div class="achievement-content">
      <span class="achievement-emoji" id="achievement-emoji">🏆</span>
      <div class="achievement-info">
        <span class="achievement-title">Achievement Unlocked!</span>
        <span class="achievement-name" id="achievement-name"></span>
      </div>
    </div>
  `;
  
  // Create confetti canvas
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.id = 'confetti-canvas';
  confettiCanvas.className = 'confetti-canvas';
  
  // Create sound toggle
  const soundToggle = document.createElement('button');
  soundToggle.id = 'sound-toggle';
  soundToggle.className = 'sound-toggle';
  soundToggle.setAttribute('aria-label', 'Toggle sound effects');
  soundToggle.innerHTML = '🔔';
  soundToggle.onclick = toggleSound;
  
  // Create music toggle
  const musicToggle = document.createElement('button');
  musicToggle.id = 'music-toggle';
  musicToggle.className = 'music-toggle';
  musicToggle.setAttribute('aria-label', 'Toggle Christmas music');
  musicToggle.innerHTML = '🎵';
  musicToggle.onclick = toggleMusic;
  
  // Add elements to DOM
  document.body.appendChild(featuresPanel);
  document.body.appendChild(giftDisplay);
  document.body.appendChild(countdownDisplay);
  document.body.appendChild(factDisplay);
  document.body.appendChild(achievementPopup);
  document.body.appendChild(confettiCanvas);
  document.body.appendChild(soundToggle);
  document.body.appendChild(musicToggle);
  
  // Update initial reindeer
  rotateReindeer();
}

// ==========================================
// FEATURE UPDATES
// ==========================================

/**
 * Called when Santa arrives at a new location
 */
export function onSantaArrival(location, presentsDelivered, citiesVisited) {
  // Update cookies eaten (random per stop)
  const cookiesThisStop = Math.floor(Math.random() * 5) + 1;
  const milkThisStop = Math.floor(Math.random() * 3) + 1;
  state.cookiesEaten += cookiesThisStop;
  state.milkDrunk += milkThisStop;
  updateCookieDisplay();
  
  // Calculate and display speed
  const speed = Math.floor(Math.random() * 3000) + 2000; // Mach 2000-5000
  state.currentSpeed = speed;
  state.topSpeed = Math.max(state.topSpeed || 0, speed);
  updateSpeedDisplay(speed);
  
  // Rotate reindeer occasionally
  if (Math.random() < 0.3) {
    rotateReindeer();
  }
  
  // Show gift type being delivered
  showGiftType();
  
  // Show fun fact if available
  if (cityFunFacts[location.city]) {
    showFunFact(cityFunFacts[location.city]);
  }
  
  // Track continent
  trackContinent(location);
  
  // Check for special locations
  if (['Rovaniemi', 'North Pole', 'Bethlehem', 'Lapland'].includes(location.city)) {
    state.visitedSpecial = true;
    triggerConfetti();
    playSound('special');
  }
  
  // Play arrival sound
  playSound('arrival');
  
  // Check for milestones
  checkMilestones(presentsDelivered, citiesVisited);
  
  // Update state for achievements
  state.presentsDelivered = presentsDelivered;
  state.citiesVisited = citiesVisited;
}

function updateCookieDisplay() {
  const el = document.getElementById('cookie-count');
  if (el) {
    el.textContent = state.cookiesEaten;
    el.parentElement.title = `🍪 ${state.cookiesEaten} cookies, 🥛 ${state.milkDrunk} glasses of milk`;
  }
}

function updateSpeedDisplay(speed) {
  const el = document.getElementById('speed-value');
  if (el) {
    el.textContent = `Mach ${speed.toLocaleString()}`;
    el.classList.add('speed-flash');
    setTimeout(() => el.classList.remove('speed-flash'), 500);
  }
}

function rotateReindeer() {
  const newReindeer = reindeer[Math.floor(Math.random() * reindeer.length)];
  state.currentReindeer = newReindeer.name;
  
  if (newReindeer.special) {
    state.sawRudolph = true;
  }
  
  const nameEl = document.getElementById('reindeer-name');
  const emojiEl = nameEl?.previousElementSibling;
  
  if (nameEl) {
    nameEl.textContent = newReindeer.name;
    nameEl.parentElement.title = `${newReindeer.name} ${newReindeer.trait} is leading!`;
  }
  if (emojiEl && newReindeer.special) {
    emojiEl.textContent = newReindeer.emoji;
  }
}

function showGiftType() {
  // Weighted random selection
  const totalWeight = giftTypes.reduce((sum, g) => sum + g.weight, 0);
  let random = Math.random() * totalWeight;
  let selectedGift = giftTypes[0];
  
  for (const gift of giftTypes) {
    random -= gift.weight;
    if (random <= 0) {
      selectedGift = gift;
      break;
    }
  }
  
  state.lastGiftType = selectedGift.name;
  
  const display = document.getElementById('gift-display');
  const emoji = document.getElementById('gift-emoji');
  const type = document.getElementById('gift-type');
  
  if (display && emoji && type) {
    emoji.textContent = selectedGift.emoji;
    type.textContent = selectedGift.name;
    display.classList.remove('hidden');
    display.classList.add('animate-gift');
    
    setTimeout(() => {
      display.classList.add('hidden');
      display.classList.remove('animate-gift');
    }, 4000);
  }
}

function showFunFact(fact) {
  const display = document.getElementById('fun-fact');
  const text = document.getElementById('fact-text');
  
  if (display && text) {
    text.textContent = fact;
    display.classList.remove('hidden');
    display.classList.add('animate-fact');
    
    setTimeout(() => {
      display.classList.add('hidden');
      display.classList.remove('animate-fact');
    }, 6000);
  }
}

function trackContinent(location) {
  const continentMap = {
    'USA': 'North America', 'Canada': 'North America', 'Mexico': 'North America',
    'Brazil': 'South America', 'Argentina': 'South America', 'Colombia': 'South America',
    'Peru': 'South America', 'Chile': 'South America', 'Venezuela': 'South America',
    'United Kingdom': 'Europe', 'France': 'Europe', 'Germany': 'Europe', 'Italy': 'Europe',
    'Spain': 'Europe', 'Netherlands': 'Europe', 'Belgium': 'Europe', 'Poland': 'Europe',
    'Japan': 'Asia', 'China': 'Asia', 'South Korea': 'Asia', 'India': 'Asia',
    'Thailand': 'Asia', 'Singapore': 'Asia', 'Vietnam': 'Asia', 'Indonesia': 'Asia',
    'Australia': 'Oceania', 'New Zealand': 'Oceania', 'Fiji': 'Oceania',
    'Egypt': 'Africa', 'South Africa': 'Africa', 'Kenya': 'Africa', 'Nigeria': 'Africa',
    'Morocco': 'Africa', 'Ethiopia': 'Africa', 'Ghana': 'Africa'
  };
  
  const continent = continentMap[location.country];
  if (continent) {
    state.continentsVisited.add(continent);
  }
}

// ==========================================
// CHRISTMAS COUNTDOWN
// ==========================================

function updateChristmasCountdown() {
  const now = new Date();
  const year = now.getMonth() === 11 && now.getDate() > 25 ? now.getFullYear() + 1 : now.getFullYear();
  const christmas = new Date(year, 11, 25, 0, 0, 0);
  
  const diff = christmas - now;
  
  const el = document.getElementById('xmas-countdown-time');
  if (!el) return;
  
  if (diff <= 0) {
    el.textContent = "🎄 IT'S CHRISTMAS! 🎄";
    el.classList.add('christmas-now');
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  if (days > 0) {
    el.textContent = `${days}d ${hours}h ${minutes}m`;
  } else {
    el.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }
}

// ==========================================
// SANTA MESSAGES
// ==========================================

function showRandomSantaMessage() {
  const message = santaMessages[Math.floor(Math.random() * santaMessages.length)];
  showToast(message, 'santa');
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.className = `toast visible toast-${type}`;
    
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4000);
  }
}

// ==========================================
// MILESTONES & CONFETTI
// ==========================================

const milestones = [
  { presents: 100000, message: "100,000 presents delivered! 🎉" },
  { presents: 500000, message: "Half a million gifts! Amazing! 🌟" },
  { presents: 1000000, message: "ONE MILLION PRESENTS! 🎊🎁🎊" },
  { presents: 5000000, message: "5 MILLION! Santa's on fire! 🔥" },
  { cities: 10, message: "10 cities visited! 🌍" },
  { cities: 25, message: "25 cities! Quarter century! 🗺️" },
  { cities: 50, message: "50 cities around the world! 🌎" },
  { cities: 100, message: "100 CITIES! World Tour Complete! 🏆" }
];

let triggeredMilestones = new Set();

function checkMilestones(presents, cities) {
  for (const milestone of milestones) {
    const key = milestone.presents ? `p${milestone.presents}` : `c${milestone.cities}`;
    
    if (triggeredMilestones.has(key)) continue;
    
    if ((milestone.presents && presents >= milestone.presents) ||
        (milestone.cities && cities >= milestone.cities)) {
      triggeredMilestones.add(key);
      showToast(milestone.message, 'milestone');
      triggerConfetti();
      playSound('milestone');
    }
  }
}

// ==========================================
// CONFETTI ANIMATION
// ==========================================

let confettiParticles = [];
let confettiAnimating = false;

export function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Create particles
  const colors = ['#ff0000', '#00ff00', '#ffd700', '#ff69b4', '#00bfff', '#ff6347', '#7fff00'];
  
  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 150,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngle: 0,
      tiltAngleInc: Math.random() * 0.1 + 0.05
    });
  }
  
  if (!confettiAnimating) {
    confettiAnimating = true;
    animateConfetti(ctx, canvas);
  }
  
  // Stop after 3 seconds
  setTimeout(() => {
    confettiAnimating = false;
    confettiParticles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 3000);
}

function animateConfetti(ctx, canvas) {
  if (!confettiAnimating) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (const p of confettiParticles) {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.rect(p.x, p.y, p.r, p.r * 1.5);
    ctx.fill();
    
    p.y += Math.cos(p.d) + 3;
    p.x += Math.sin(p.d) * 2;
    p.tiltAngle += p.tiltAngleInc;
    p.tilt = Math.sin(p.tiltAngle) * 15;
    
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  }
  
  requestAnimationFrame(() => animateConfetti(ctx, canvas));
}

// ==========================================
// ACHIEVEMENTS
// ==========================================

function checkAchievements() {
  for (const achievement of achievements) {
    if (state.achievements.includes(achievement.id)) continue;
    
    if (achievement.condition(state)) {
      unlockAchievement(achievement);
    }
  }
}

function unlockAchievement(achievement) {
  state.achievements.push(achievement.id);
  
  const popup = document.getElementById('achievement-popup');
  const emoji = document.getElementById('achievement-emoji');
  const name = document.getElementById('achievement-name');
  
  if (popup && emoji && name) {
    emoji.textContent = achievement.emoji;
    name.textContent = achievement.name;
    popup.classList.remove('hidden');
    popup.classList.add('animate-achievement');
    
    playSound('achievement');
    
    setTimeout(() => {
      popup.classList.add('hidden');
      popup.classList.remove('animate-achievement');
    }, 4000);
  }
  
  // Save to localStorage
  try {
    localStorage.setItem('santaAchievements', JSON.stringify(state.achievements));
  } catch (e) {}
}

// Load achievements from localStorage
try {
  const saved = localStorage.getItem('santaAchievements');
  if (saved) {
    state.achievements = JSON.parse(saved);
  }
} catch (e) {}

// ==========================================
// SOUND EFFECTS
// ==========================================

function playSound(type) {
  if (!state.soundEnabled || !audioContext) return;
  
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'arrival':
        // Sleigh bells - quick high notes
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialDecayTo = 0.01;
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
        
      case 'milestone':
        // Fanfare
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.15);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
        
      case 'achievement':
        // Victory jingle
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(554, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
        
      case 'special':
        // Magic sparkle
        oscillator.type = 'sine';
        for (let i = 0; i < 5; i++) {
          const time = audioContext.currentTime + i * 0.1;
          oscillator.frequency.setValueAtTime(1000 + i * 200, time);
        }
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
        break;
    }
  } catch (e) {
    console.log('Sound play failed:', e);
  }
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  const btn = document.getElementById('sound-toggle');
  if (btn) {
    btn.innerHTML = state.soundEnabled ? '🔔' : '🔕';
    btn.classList.toggle('disabled', !state.soundEnabled);
  }
}

// ==========================================
// CHRISTMAS MUSIC (Synthesized)
// ==========================================

let musicPlaying = false;
let musicOscillators = [];
let masterGain = null;

// Jingle Bells melody - simpler format [note, duration in ms]
const jingleBellsMelody = [
  ['E5', 300], ['E5', 300], ['E5', 600],
  ['E5', 300], ['E5', 300], ['E5', 600],
  ['E5', 300], ['G5', 300], ['C5', 400], ['D5', 200], ['E5', 800],
  ['F5', 300], ['F5', 300], ['F5', 400], ['F5', 200],
  ['F5', 300], ['E5', 300], ['E5', 200], ['E5', 200],
  ['E5', 300], ['D5', 300], ['D5', 300], ['E5', 300], ['D5', 600], ['G5', 600],
  ['REST', 600],
];

// Note frequencies (octave 5 for brighter sound)
const notes = {
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46,
  'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
  'G4': 392.00, 'REST': 0
};

function toggleMusic() {
  const btn = document.getElementById('music-toggle');
  
  if (state.musicPlaying) {
    stopMusic();
    state.musicPlaying = false;
    if (btn) {
      btn.innerHTML = '🎵';
      btn.classList.remove('playing');
    }
    showToast('🔇 Music stopped', 'info');
  } else {
    // Initialize audio context on user gesture
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // MUST resume on user gesture for browsers
    audioContext.resume().then(() => {
      state.musicPlaying = true;
      playJingleBells();
      if (btn) {
        btn.innerHTML = '🎶';
        btn.classList.add('playing');
      }
      showToast('🎵 Playing Jingle Bells!', 'info');
    }).catch(err => {
      console.error('Music failed to start:', err);
      showToast('❌ Could not play music', 'info');
    });
  }
}

async function playJingleBells() {
  if (!audioContext) return;
  
  // Create master gain
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.5; // Good volume
  masterGain.connect(audioContext.destination);
  
  while (state.musicPlaying) {
    for (const [note, duration] of jingleBellsMelody) {
      if (!state.musicPlaying) break;
      
      if (note !== 'REST' && notes[note]) {
        playNote(notes[note], duration * 0.85);
      }
      
      await sleep(duration);
    }
    
    // Small pause between loops
    if (state.musicPlaying) {
      await sleep(500);
    }
  }
}

function playNote(frequency, duration) {
  if (!audioContext || !masterGain || !state.musicPlaying) return;
  
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    // Triangle wave sounds more like bells
    osc.type = 'triangle';
    osc.frequency.value = frequency;
    
    osc.connect(gain);
    gain.connect(masterGain);
    
    const now = audioContext.currentTime;
    const endTime = now + duration / 1000;
    
    // Bell-like envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.5, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, endTime);
    
    osc.start(now);
    osc.stop(endTime + 0.1);
    
    // Add a harmonic for richer sound
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = 'sine';
    osc2.frequency.value = frequency * 2; // Octave higher
    osc2.connect(gain2);
    gain2.connect(masterGain);
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, endTime);
    osc2.start(now);
    osc2.stop(endTime + 0.1);
    
  } catch (e) {
    console.log('Note play error:', e);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function stopMusic() {
  state.musicPlaying = false;
  
  if (masterGain && audioContext) {
    try {
      masterGain.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    } catch (e) {}
  }
  
  setTimeout(() => {
    masterGain = null;
  }, 400);
}

// ==========================================
// PHOTO MODE
// ==========================================

export function capturePhoto() {
  // Create a styled screenshot notification
  showToast('📸 Screenshot captured! Share Santa\'s location!', 'photo');
  
  // Trigger native share if available
  if (navigator.share) {
    navigator.share({
      title: 'Santa Tracker',
      text: `Santa is currently in ${state.currentCity}! Track him live!`,
      url: window.location.href
    }).catch(() => {});
  }
}

// ==========================================
// EXPORT STATE FOR OTHER MODULES
// ==========================================

export function getFeaturesState() {
  return { ...state };
}

