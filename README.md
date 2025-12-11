# 🎅 Santa Tracker

**Track Santa's magical journey around the globe on Christmas Eve!**

A fun, interactive web application that lets kids (and kids at heart) follow Santa Claus as he delivers presents to children worldwide.

[![Live Demo](https://santa-tracker-rlm.netlify.app/)](https://santa-tracker-rlm.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

### 🗺️ Interactive World Map
- **Snowy winter theme** - White land masses and icy blue oceans
- **Famous landmarks** - Discover 12 world landmarks with fun facts (Eiffel Tower, Pyramids, etc.)
- **Click interactions** - Tap anywhere to create snowflake bursts!
- **Flight paths** - Watch Santa's magical golden trail with animated reindeer

### 🎄 Two Modes

#### **Christmas Day (December 25th)**
- Santa travels around the world delivering presents
- Real-time tracking with city-to-city movement
- Stats: Presents Delivered, Cities Visited
- Countdown to next stop

#### **Workshop Mode (All Other Days)**
- Santa is at the North Pole with his elves
- Fun activity updates (building toys, checking lists, feeding reindeer)
- Stats: Presents Made, Elves Working  
- Countdown to Christmas!

### 🎨 Kid-Friendly Design
- **Cartoon-style UI** with bouncy animations
- **Big, tappable elements** perfect for little fingers
- **Playful fonts** (Fredoka One, Nunito)
- **Cheerful color palette** - Santa red, elf green, magic gold

### 🎵 Fun Extras
- **Christmas music** - Synthesized Jingle Bells
- **Sound effects** - Sleigh bells and fanfares
- **Snowfall animation** - Beautiful canvas-based snow
- **Floating decorations** - Presents, stars, and snowflakes
- **Aurora borealis** - Special effect for northern locations

### 📱 Mobile-Friendly
- **Collapsible bottom sheet** - Swipe up/down to expand
- **Peek preview** - Always see Santa's current location
- **Touch gestures** - Intuitive mobile interactions
- **Responsive design** - Works on all screen sizes

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lebobo88/santa-tracker.git
cd santa-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser!

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

---

## 🛠️ Tech Stack

- **Vite** - Fast build tool and dev server
- **Leaflet.js** - Interactive maps
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Animations, filters, and modern styling
- **Web Audio API** - Synthesized Christmas music
- **Canvas API** - Snowfall animation

---

## 📁 Project Structure

```
santa-tracker/
├── index.html          # Main HTML file
├── css/
│   ├── main.css        # Core styles
│   ├── animations.css  # Animation keyframes
│   ├── responsive.css  # Mobile styles
│   ├── features.css    # Fun feature styles
│   └── theme-kids.css  # Kid-friendly cartoon theme
├── js/
│   ├── app.js          # Main application entry
│   ├── map.js          # Leaflet map setup & landmarks
│   ├── santa.js        # Santa tracking & workshop logic
│   ├── locations.js    # City data & timezones
│   ├── animations.js   # Snowfall & decorations
│   ├── features.js     # Fun features (music, sounds, etc.)
│   ├── panel.js        # Mobile bottom sheet
│   └── share.js        # Social sharing
├── package.json
├── vite.config.js
└── netlify.toml        # Netlify deployment config
```

---

## 🎯 How It Works

### Santa's Journey (December 25th)
1. Santa starts at a random city
2. Every 30-60 seconds, he moves to a new location
3. Each stop delivers 10,000-50,000 presents
4. Flight paths show his route with animated reindeer
5. Present markers are left at visited cities

### Workshop Mode (Other Days)
1. Santa stays at the North Pole (90°N, 0°E)
2. Activity messages show what's happening in the workshop
3. Present counter slowly increases as toys are made
4. Countdown shows time until Christmas

### Date Detection
- The app checks the current date on load
- Automatically switches modes at midnight
- Uses local timezone for date detection

---

## 🌍 Landmarks

Discover these famous locations on the map:

| Landmark | Location | Fun Fact |
|----------|----------|----------|
| 🗼 Eiffel Tower | Paris, France | Sparkles with 20,000 lights every night! |
| 🗽 Statue of Liberty | New York, USA | Wears a size 879 shoe! |
| 🕐 Big Ben | London, UK | Clock faces are 23 feet wide! |
| 🕌 Taj Mahal | Agra, India | Changes color throughout the day! |
| ⛪ Christ the Redeemer | Rio, Brazil | 98 feet tall - like a 10-story building! |
| 🏛️ Colosseum | Rome, Italy | Could hold 50,000 spectators! |
| 🗼 Tokyo Tower | Tokyo, Japan | Painted orange and white for air safety! |
| 🎭 Sydney Opera House | Sydney, Australia | Roof has over 1 million tiles! |
| 🧱 Great Wall | China | Over 13,000 miles long! |
| 🔺 Pyramids | Giza, Egypt | Over 4,500 years old! |
| 🏠 North Pole Village | Arctic | Santa's workshop is here! |
| 🎄 Santa's Village | Finland | Santa's official hometown! |

---

## 🎨 Customization

### Change the Theme
Edit `css/theme-kids.css` to customize:
- Colors (CSS custom properties in `:root`)
- Fonts
- Border styles
- Animation timing

### Add More Landmarks
Edit the `LANDMARKS` array in `js/map.js`:

```javascript
{ 
  lat: 48.8584, 
  lng: 2.2945, 
  name: 'Eiffel Tower', 
  emoji: '🗼', 
  fact: 'Your fun fact here!' 
}
```

### Add More Cities
Edit `js/locations.js` to add cities Santa can visit.

---

## 📱 Deployment

### Netlify (Recommended)
1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Enable GitHub Actions in your repo
2. The included workflow will auto-deploy on push

### Manual
```bash
npm run build
# Upload contents of dist/ to your web server
```

---

## 🤝 Contributing

Contributions are welcome! Ideas for improvements:
- [ ] More landmarks and fun facts
- [ ] Additional languages/translations
- [ ] More Christmas songs
- [ ] Mini-games for kids
- [ ] AR features

---

## 📄 License

MIT License - feel free to use this for your own Christmas projects!

---

## 🙏 Credits

- Map tiles by [CARTO](https://carto.com/) via OpenStreetMap
- Map library: [Leaflet.js](https://leafletjs.com/)
- Fonts: [Google Fonts](https://fonts.google.com/) (Fredoka One, Nunito)
- Inspiration: Google Santa Tracker, NORAD Tracks Santa

---

**Made with ❤️ and holiday cheer! 🎄**

*Merry Christmas and Happy Holidays!* 🎅🎁❄️
