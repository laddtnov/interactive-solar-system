const planetData = {
  sun: {
    name: "SUN",
    symbol: "☉",
    subtitle: "Yellow Dwarf Star",
    info: "The heart of our solar system",
    distance: "0",
    diameter: "1,392,000 km",
    period: "—",
    dayLength: "25 Earth days",
    temperature: "5,500°C (surface)",
    gravity: "28g",
    moons: 0,
    atmosphere: "Hydrogen, Helium",
    facts: [
      "Contains 99.8% of system's mass",
      "Powers all life on Earth",
      "Nuclear fusion reactor at core"
    ]
  },
  "asteroid-belt": {
    name: "ASTEROID BELT",
    symbol: "☄",
    subtitle: "Main Belt Region",
    info: "Rocky debris field between Mars and Jupiter",
    distance: "329-478 million km",
    diameter: "~150 million km wide",
    period: "3-6 Earth years (varies)",
    dayLength: "N/A",
    temperature: "-73°C to -108°C",
    gravity: "Near zero (individual asteroids)",
    moons: 0,
    atmosphere: "None",
    facts: [
      "Formed from failed planet formation",
      "Jupiter's gravity prevented coalescence",
      "Ceres contains 25% of belt's total mass",
      "Safe for spacecraft (sparse distribution)",
      "Total mass: ~3% of Moon's mass",
      "Over 1.3 million cataloged asteroids"
    ]
  },
  mercury: {
    name: "MERCURY",
    symbol: "☿",
    subtitle: "The Swift Planet",
    info: "Smallest planet in solar system",
    distance: "57.9 million km",
    diameter: "4,879 km",
    period: "88 Earth days",
    dayLength: "59 Earth days",
    temperature: "-173°C to 427°C",
    gravity: "0.38g",
    moons: 0,
    atmosphere: "None",
    facts: [
      "Fastest orbit around Sun",
      "Extreme temperature swings",
      "Named after Roman messenger god"
    ]
  },
  venus: {
    name: "VENUS",
    symbol: "♀",
    subtitle: "Earth's Evil Twin",
    info: "Hottest planet in solar system",
    distance: "108.2 million km",
    diameter: "12,104 km",
    period: "225 Earth days",
    dayLength: "243 Earth days (retrograde)",
    temperature: "462°C (average)",
    gravity: "0.90g",
    moons: 0,
    atmosphere: "CO₂, Sulfuric Acid clouds",
    facts: [
      "Rotates backwards (retrograde)",
      "Day longer than year",
      "Volcanic hellscape"
    ]
  },
  earth: {
    name: "EARTH",
    symbol: "🜨",
    subtitle: "The Blue Planet",
    info: "Our home in the cosmos",
    distance: "149.6 million km",
    diameter: "12,742 km",
    period: "365.25 days",
    dayLength: "24 hours",
    temperature: "-88°C to 58°C",
    gravity: "1.0g",
    moons: 1,
    atmosphere: "N₂, O₂",
    facts: [
      "Only known planet with life",
      "71% covered by water",
      "Perfect conditions for civilization"
    ]
  },
  mars: {
    name: "MARS",
    symbol: "♂",
    subtitle: "The Red Planet",
    info: "Future human colony",
    distance: "227.9 million km",
    diameter: "6,779 km",
    period: "687 Earth days",
    dayLength: "24.6 hours",
    temperature: "-140°C to 20°C",
    gravity: "0.38g",
    moons: 2,
    atmosphere: "CO₂ (thin)",
    facts: [
      "Home to Olympus Mons (tallest mountain)",
      "Ancient riverbeds discovered",
      "Target for human colonization"
    ]
  },
  jupiter: {
    name: "JUPITER",
    symbol: "♃",
    subtitle: "King of Planets",
    info: "Largest planet in solar system",
    distance: "778.5 million km",
    diameter: "139,820 km",
    period: "11.9 Earth years (4,333 days)",
    dayLength: "10 hours",
    temperature: "-145°C (cloud tops)",
    gravity: "2.5g",
    moons: 79,
    atmosphere: "H₂, He",
    facts: [
      "Great Red Spot storm (300+ years old)",
      "Protects Earth from asteroids",
      "Could contain 1,300 Earths"
    ]
  },
  saturn: {
    name: "SATURN",
    symbol: "♄",
    subtitle: "Lord of the Rings",
    info: "Most spectacular ring system",
    distance: "1.4 billion km",
    diameter: "116,460 km",
    period: "29.5 Earth years (10,759 days)",
    dayLength: "10.7 hours",
    temperature: "-178°C",
    gravity: "1.1g",
    moons: 82,
    atmosphere: "H₂, He",
    facts: [
      "Rings made of ice and rock",
      "Low density (would float on water)",
      "Hexagonal storm at north pole"
    ]
  },
  uranus: {
    name: "URANUS",
    symbol: "♅",
    subtitle: "The Sideways Planet",
    info: "Ice giant with extreme tilt",
    distance: "2.9 billion km",
    diameter: "50,724 km",
    period: "84 Earth years (30,687 days)",
    dayLength: "17.2 hours (retrograde)",
    temperature: "-224°C",
    gravity: "0.89g",
    moons: 27,
    atmosphere: "H₂, He, CH₄",
    facts: [
      "Rotates on its side (98° tilt)",
      "Faint ring system",
      "Methane gives blue-green color"
    ]
  },
  neptune: {
    name: "NEPTUNE",
    symbol: "♆",
    subtitle: "The Windy World",
    info: "Fastest winds in solar system",
    distance: "4.5 billion km",
    diameter: "49,244 km",
    period: "165 Earth years (60,190 days)",
    dayLength: "16 hours",
    temperature: "-214°C",
    gravity: "1.1g",
    moons: 14,
    atmosphere: "H₂, He, CH₄",
    facts: [
      "Winds reach 2,100 km/h",
      "Dark Spot storms",
      "Discovered by mathematics"
    ]
  },
  pluto: {
    name: "PLUTO",
    symbol: "♇",
    subtitle: "The Heart of Ice",
    info: "Dwarf planet in Kuiper Belt",
    distance: "5.9 billion km",
    diameter: "2,377 km",
    period: "248 Earth years (90,560 days)",
    dayLength: "6.4 Earth days",
    temperature: "-229°C",
    gravity: "0.06g",
    moons: 5,
    atmosphere: "N₂, CH₄ (seasonal)",
    facts: [
      "Heart-shaped ice plain (Tombaugh Regio)",
      "Reclassified as dwarf planet (2006)",
      "Five moons in complex dance"
    ]
  }
};



let soundEnabled = true;
let audioContext = null;


function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playTypeSound() {
  if (!soundEnabled) return;
  
  try {
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 800; 
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime); 
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.04);
  } catch (e) {
    console.log('Audio blocked:', e);
  }
}


function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('sound-toggle');
  if (btn) {
    btn.innerHTML = soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
    btn.style.color = soundEnabled ? '#00ff00' : '#666';
  }
}



function typewriterEffect(element, text, speed = 30) {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = '';
    
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '█';
    element.appendChild(cursor);
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.insertBefore(document.createTextNode(text[i]), cursor);
        
        
        if (text[i] !== ' ') {
          playTypeSound();
        }
        
        i++;
      } else {
        cursor.remove();
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}


async function typeAllLines(container, lines, speed = 30) {
  for (const line of lines) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';
    container.appendChild(lineDiv);
    
    await typewriterEffect(lineDiv, line, speed);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}


const soundButtonStyles = `
  .sound-toggle-btn {
    position: absolute;
    top: 50px;
    right: 15px;
    background: transparent;
    border: 2px solid #00ff00;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 25;
    font-weight: bold;
  }
  
  .sound-toggle-btn:hover {
    background: #00ff00;
    color: #000;
    box-shadow: 0 0 10px #00ff00;
  }
`;


if (!document.getElementById('sound-btn-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'sound-btn-styles';
  styleSheet.textContent = soundButtonStyles;
  document.head.appendChild(styleSheet);
}

document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('planet-info');
  const modal = document.getElementById('planet-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('close-modal');
  const overlay = document.getElementById('modal-overlay');

  
  function toggleOrbit(el, stop) {
    let parent = el.parentElement;
    while (parent && parent !== document.body) {
      if (parent.classList.contains('orbit')) {
        parent.style.animationPlayState = stop ? 'paused' : 'running';
      }
      parent = parent.parentElement;
    }
  }

  
  async function showModal(planetName) {
    const data = planetData[planetName];
    if (!data) return;

    modal.style.display = 'flex';
    overlay.style.display = 'block';
    
    
    modalContent.innerHTML = '';
    
   
    const soundBtn = document.createElement('button');
    soundBtn.id = 'sound-toggle';
    soundBtn.className = 'sound-toggle-btn';
    soundBtn.innerHTML = soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
    soundBtn.style.color = soundEnabled ? '#00ff00' : '#666';
    soundBtn.onclick = toggleSound;
    modalContent.appendChild(soundBtn);
    
    
    const terminalContainer = document.createElement('div');
    terminalContainer.className = 'terminal-container';
    modalContent.appendChild(terminalContainer);
    
    
    const allLines = [
      '> ACCESSING PLANETARY DATABASE...',
      '> LOADING DATA...',
      '',
      `${data.symbol} ${data.name}`,
      `${data.subtitle}`,
      '',
      '>> OVERVIEW',
      data.info,
      '',
      '>> ORBITAL DATA',
      `Distance from Sun: ${data.distance}`,
      `Diameter: ${data.diameter}`,
      `Orbital Period: ${data.period}`,
      `Day Length: ${data.dayLength}`,
      '',
      '>> PHYSICAL DATA',
      `Temperature: ${data.temperature}`,
      `Gravity: ${data.gravity}`,
      `Moons: ${data.moons}`,
      `Atmosphere: ${data.atmosphere}`,
      '',
      '>> CLASSIFIED INTEL',
      ...data.facts.map((fact, i) => `${i + 1}. ${fact}`),
      '',
      '> DATA TRANSFER COMPLETE',
      '> PRESS [ESC] OR [X] TO EXIT'
    ];
    
    
    await typeAllLines(terminalContainer, allLines, 20);
  }

  
  function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  
  Object.keys(planetData).forEach(name => {
    let el;
    
    
    if (name === 'asteroid-belt') {
      el = document.querySelector('[data-name="asteroid-belt"]');
    } else {
      el = document.querySelector(`.${name}`);
    }
    
    if (!el) return;

    
    el.addEventListener('mouseenter', () => {
      const item = planetData[name];
      tooltip.innerHTML = `
        <b style="color:#00ff00; font-size: 18px;">${item.name}</b>
        <div style="margin-top: 5px; font-style: italic;">${item.subtitle}</div>
        <div style="font-size: 11px; color: #00cc00; margin-top: 5px;">${item.info}</div>
        ${item.distance !== "0" ? `<div style="color:#00ff00; margin-top:5px;">📍 Distance: ${item.distance}</div>` : ''}
        <div style="font-size: 10px; color: #00ff00; margin-top: 8px; animation: blink 1s infinite;">► CLICK TO ACCESS TERMINAL</div>
      `;
      tooltip.classList.add('show');
      if (name !== 'sun' && name !== 'asteroid-belt') toggleOrbit(el, true);
    });

    el.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
      if (name !== 'sun' && name !== 'asteroid-belt') toggleOrbit(el, false);
    });

    
    el.addEventListener('mousemove', (e) => {
      const tooltipWidth = 270;
      const tooltipHeight = 150;
      const padding = 20;
      
      let left = e.clientX + padding;
      let top = e.clientY - padding;
      
      
      if (left + tooltipWidth > window.innerWidth) {
        left = e.clientX - tooltipWidth - padding;
      }
      
      
      if (top + tooltipHeight > window.innerHeight) {
        top = e.clientY - tooltipHeight - padding;
      }
      
      
      if (top < 0) {
        top = e.clientY + padding;
      }
      
      
      if (left < 0) {
        left = e.clientX + padding;
      }
      
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    });

    
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      showModal(name);
    });
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});

// ── Star Parallax ─────────────────────────────────────────
(function initStarParallax() {
  const canvas = document.getElementById('stars-bg');
  const ctx = canvas.getContext('2d');

  const STAR_COUNT = 220;
  const PARALLAX_FACTOR = 0.05;
  const LERP_SPEED = 0.07;

  // Each star stores a normalised position (0–1) so it rescales with the window.
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    nx: Math.random(),
    ny: Math.random(),
    radius: Math.random() * 1.4 + 0.3,
    opacity: Math.random() * 0.6 + 0.3,
  }));

  let targetX = window.innerWidth  / 2;
  let targetY = window.innerHeight / 2;
  let smoothX  = targetX;
  let smoothY  = targetY;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function drawStars() {
    const w  = canvas.width;
    const h  = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Smooth interpolation toward the real mouse position.
    smoothX += (targetX - smoothX) * LERP_SPEED;
    smoothY += (targetY - smoothY) * LERP_SPEED;

    // Parallax offset = (mousePos - center) * factor
    const dx = (smoothX - cx) * PARALLAX_FACTOR;
    const dy = (smoothY - cy) * PARALLAX_FACTOR;

    ctx.clearRect(0, 0, w, h);

    for (const star of stars) {
      const sx = star.nx * w + dx;
      const sy = star.ny * h + dy;

      ctx.beginPath();
      ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    }

    requestAnimationFrame(drawStars);
  }

  drawStars();
}());