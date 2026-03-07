# 🌌 CSS Solar System Ultimate

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

An interactive 3D solar system simulation with Fallout 3-style terminal interface, real astronomical data, and typewriter sound effects.

[🌐 Live Demo](https://interactive-solar-system-rose.vercel.app/) • [📁 View Code](https://interactive-solar-system-rose.vercel.app/)
![Portfolio Preview](screenshot-desktop.png)![Portfolio Preview](screenshot-terminal.png)![Portfolio Preview](screenshot-mobile.png)!



</div>

---

## ✨ Features

### 🪐 Planetary System
- **9 Planets + Dwarf Planet** - Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, and Pluto
- **Natural Satellites** - 20+ moons including Luna, Phobos, Deimos, Titan, Europa, Ganymede, and more
- **Asteroid Belt** - Realistic debris field between Mars and Jupiter with 80+ asteroids
- **Planetary Rings** - Detailed ring systems for Jupiter, Saturn, Uranus, and Neptune
- **Great Red Spot** - Jupiter's iconic storm feature

### 💚 Fallout 3-Style Terminal
- **Interactive Data Cards** - Click any celestial body to access detailed information
- **Typewriter Effect** - Text types out character-by-character
- **Sound Effects** - Authentic typewriter sounds during text rendering
- **Terminal Interface** - Green monochrome CRT monitor aesthetic
- **Scanlines & Flicker** - Retro computer terminal visual effects

### 📊 Real Astronomical Data
- Orbital periods and distances from the Sun
- Planetary diameters and compositions
- Temperature ranges and atmospheric data
- Gravitational measurements
- Moon counts and orbital characteristics
- Interesting facts and discoveries

### 🎨 Visual Effects
- **Smooth Animations** - CSS keyframe animations for orbits
- **Glow Effects** - Neon-style planet and moon labels on hover
- **3D Perspective** - Depth and rotation for realistic appearance
- **Responsive Design** - Adapts to desktop, tablet, and mobile devices
- **Dark Space Background** - Radial gradient cosmic atmosphere

### 🔊 Audio Features
- **Typewriter Sound** - 800 Hz square wave on each character
- **Web Audio API** - Synthesized sounds (no external files)
- **Toggle Control** - 🔊/🔇 button to enable/disable sounds
- **Performance Optimized** - Sounds play only when needed

---

## 🚀 Technologies

### Core Technologies
- **HTML5** - Semantic markup structure
- **CSS3** - Advanced styling and animations
  - CSS Grid & Flexbox
  - CSS Variables (Custom Properties)
  - CSS Animations (@keyframes)
  - CSS Transforms (3D rotations)
  - Media Queries (Responsive)
- **JavaScript (ES6+)** - Interactive functionality
  - Web Audio API
  - Async/Await
  - DOM Manipulation
  - Event Handling

### Design Patterns
- **Component-based structure** - Modular orbital systems
- **Progressive enhancement** - Works without JavaScript, enhanced with it
- **Mobile-first approach** - Responsive from smallest to largest screens

---

## 🎵 Sound System

### Implementation
The project uses **Web Audio API** to generate typewriter sounds programmatically:

```javascript
// Typewriter sound: 800 Hz square wave, 40ms duration
oscillator.frequency.value = 800;
oscillator.type = 'square';
gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
```

### Features
- **Zero dependencies** - No audio files required
- **Instant loading** - Sounds generated on-the-fly
- **Memory efficient** - Minimal resource usage
- **User control** - Toggle button in terminal
- **Smart playback** - Skips spaces, only plays on characters

---

## 📂 Project Structure

```
css-solar-system-ultimate/
├── index.html              # Main HTML structure
├── styles.css              # All styles and animations
├── script.js               # Terminal, sounds, interactions
├── README.md              # Project documentation
├── screenshot.png         # Preview image
└── LICENSE                # MIT License
```

---

## 🎯 Celestial Bodies

### Inner Solar System
| Body | Diameter | Orbit Period | Moons |
|------|----------|--------------|-------|
| ☉ **Sun** | 1,392,000 km | — | 0 |
| ☿ **Mercury** | 4,879 km | 88 days | 0 |
| ♀ **Venus** | 12,104 km | 225 days | 0 |
| 🜨 **Earth** | 12,742 km | 365 days | 1 |
| ♂ **Mars** | 6,779 km | 687 days | 2 |

### Asteroid Belt
- **Distance:** 329-478 million km from Sun
- **Width:** ~150 million km
- **Composition:** Rock, metal, ice
- **Total Mass:** ~3% of Moon's mass

### Outer Solar System
| Body | Diameter | Orbit Period | Moons |
|------|----------|--------------|-------|
| ♃ **Jupiter** | 139,820 km | 11.9 years | 79 |
| ♄ **Saturn** | 116,460 km | 29.5 years | 82 |
| ♅ **Uranus** | 50,724 km | 84 years | 27 |
| ♆ **Neptune** | 49,244 km | 165 years | 14 |
| ♇ **Pluto** | 2,377 km | 248 years | 5 |

---

## 💻 Installation & Usage

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/laddtnov/css-solar-system-ultimate.git
cd css-solar-system-ultimate
```

2. **Open in browser**
```bash
# MacOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

That's it! No build process, no dependencies. 🎉

### GitHub Pages Deployment

1. Push code to GitHub
2. Go to **Settings → Pages**
3. Select **Deploy from main branch**
4. Access at `https://yourusername.github.io/css-solar-system-ultimate/`

---

## 📱 Responsive Design

### Breakpoints

```css
/* Desktop: Full experience with all features */
Default: 1200x1200px solar system

/* Tablet: Scaled down, optimized asteroids */
@media (max-width: 1024px) {
  .space { transform: scale(0.7); }
}

/* Mobile: Compact layout, minimal asteroids */
@media (max-width: 768px) {
  .space { transform: scale(0.5); }
  .asteroid-belt { opacity: 0.6; }
}

/* Small Mobile: Maximum optimization */
@media (max-width: 480px) {
  .space { transform: scale(0.35); }
}
```

### Adaptive Features
- **Desktop:** 80+ asteroids, full animations
- **Tablet:** 15 asteroids, smooth performance
- **Mobile:** 7 asteroids, battery-efficient
- **Accessibility:** Respects `prefers-reduced-motion`

---

## ⚡ Performance Optimization

### CSS Optimizations
- **box-shadow technique** - 1 element generates 80+ asteroids (not 80 DOM nodes)
- **will-change: transform** - GPU acceleration for animations
- **transform over position** - Hardware-accelerated movements
- **Containment** - CSS contain property for render optimization

### JavaScript Optimizations
- **Lazy Audio Context** - Initialized only after first user interaction
- **Event delegation** - Efficient event handling
- **Debounced resize** - Smooth window resizing
- **Memory management** - Cleanup of audio nodes

### Load Time
- **HTML:** ~5 KB
- **CSS:** ~15 KB
- **JavaScript:** ~12 KB
- **Total:** ~32 KB (gzipped: ~10 KB)
- **Load time:** <1 second on 3G connection

---

## 🎨 Customization

### Change Orbital Speeds

Edit animation durations in `styles.css`:

```css
.mercury-orbit { animation: orbit 7s linear infinite; }
.earth-orbit { animation: orbit 15s linear infinite; }
/* Adjust the "7s" and "15s" values */
```

### Add New Planets/Moons

1. Add HTML structure:
```html
<div class="orbit new-planet-orbit">
  <div class="new-planet"></div>
</div>
```

2. Add CSS styling:
```css
.new-planet-orbit {
  width: 600px;
  height: 600px;
  animation: orbit 25s linear infinite;
}

.new-planet {
  width: 30px;
  height: 30px;
  background: #yourcolor;
}
```

3. Add data in `script.js`:
```javascript
"new-planet": {
  name: "NEW PLANET",
  info: "Description...",
  // ... more data
}
```

### Modify Sound Effects

Adjust sound parameters in `script.js`:

```javascript
oscillator.frequency.value = 800; // Change pitch (Hz)
gainNode.gain.value = 0.08;       // Change volume (0.0 - 1.0)
oscillator.type = 'square';       // Change wave type
```

Wave types: `sine`, `square`, `sawtooth`, `triangle`

---

## 🌟 Features Showcase

### Tooltip System
- Appears on hover over any celestial body
- Shows name, subtitle, basic info
- Smart positioning (never goes off-screen)
- Prompt to click for full data

### Terminal Interface
- Fallout 3-inspired green CRT aesthetic
- Typewriter text animation
- Scanlines and screen flicker effects
- Sound toggle button
- ESC or X to close

### Data Display
```
> ACCESSING PLANETARY DATABASE...
> LOADING DATA...

🜨 EARTH
The Blue Planet

>> OVERVIEW
Our home in the cosmos

>> ORBITAL DATA
Distance from Sun: 149.6 million km
Diameter: 12,742 km
Orbital Period: 365.25 days
Day Length: 24 hours

>> PHYSICAL DATA
Temperature: -88°C to 58°C
Gravity: 1.0g
Moons: 1
Atmosphere: N₂, O₂

>> CLASSIFIED INTEL
1. Only known planet with life
2. 71% covered by water
3. Perfect conditions for civilization

> DATA TRANSFER COMPLETE
```

---

## 🛠️ Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Safari | iOS 14+ | ✅ Full |
| Chrome Mobile | Latest | ✅ Full |

**Note:** Web Audio API requires user interaction to start (browser autoplay policy).

---

## 📸 Screenshots

### Desktop View
![Desktop Screenshot](screenshots/desktop.png)

### Terminal Interface
![Terminal Screenshot](screenshots/terminal.png)

### Mobile View
![Mobile Screenshot](screenshots/mobile.png)

---

## 🗺️ Roadmap

### Completed ✅
- [x] All 9 planets + Pluto
- [x] 20+ natural satellites
- [x] Asteroid belt
- [x] Planetary rings
- [x] Fallout terminal interface
- [x] Sound effects
- [x] Responsive design
- [x] Real astronomical data

### Future Ideas 💡
- [ ] Kuiper Belt beyond Neptune
- [ ] Oort Cloud visualization
- [ ] Dwarf planets (Ceres, Eris, Makemake)
- [ ] Spacecraft trajectories (Voyager, New Horizons)
- [ ] Time controls (speed up/slow down)
- [ ] Date display (current position calculator)
- [ ] Planet comparison tool
- [ ] Educational mode for schools
- [ ] VR/AR support

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style
- Test on multiple browsers
- Update README if adding features
- Optimize for performance
- Maintain accessibility standards

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Laddtnov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Inspiration:** Fallout 3 terminal interface
- **Astronomical Data:** NASA JPL Solar System Dynamics
- **Fonts:** Google Fonts (Orbitron)
- **Icons:** Unicode symbols
- **Sound:** Web Audio API

---

## 📬 Contact

**Laddtnov**
- GitHub: [@laddtnov](https://github.com/laddtnov)
- Email: novytskiyvladislav@proton.me
- Portfolio: [laddtnov.github.io/portfolio-website](https://laddtnov.github.io/portfolio-website/)

---

## 🌠 Project Showcase

Part of the **Cyberpunk Portfolio Collection**:

1. [🌌 Solar System Simulator](https://github.com/laddtnov/css-solar-system-ultimate) - This project
2. [💼 Cyberpunk Portfolio](https://github.com/laddtnov/portfolio-website) - Personal portfolio
3. [📚 Book Tracker](https://github.com/laddtnov/cyberpunk-book-tracker) - Reading tracker

All projects feature **cyberpunk aesthetics** and **modern web technologies**.

---

<div align="center">

### 💚 Built with passion for space and retro-futurism 💚

**Made with ❤️ using HTML, CSS, and JavaScript**

**If you like this project, give it a ⭐!**

?style=social)](https://github.com/laddtnov/interactive-solar-system/stargazers)
[![GitHub stars](https://img.shields.io/github/stars/laddtnov/interactive-solar-system
?style=social)](https://github.com/laddtnov/interactive-solar-system/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/laddtnov/interactive-solar-system?style=social)](https://github.com/laddtnov/interactive-solar-system/network/members)

</div>
