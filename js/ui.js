import { planetData } from './data.js'

// ── Sound System ───────────────────────────────────────────────────────────

let soundEnabled = true
let audioContext  = null

function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

function playTypeSound() {
  if (!soundEnabled) return
  try {
    const ctx  = initAudioContext()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    osc.type = 'square'
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.04)
  } catch (e) {
    console.log('Audio blocked:', e)
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled
  const btn = document.getElementById('sound-toggle')
  if (btn) {
    btn.innerHTML = soundEnabled ? '\ud83d\udd0a SOUND: ON' : '\ud83d\udd07 SOUND: OFF'
    btn.style.color = soundEnabled ? '#00ff00' : '#666'
  }
}

// ── Typewriter Effect ──────────────────────────────────────────────────────

function typewriterEffect(element, text, speed = 30) {
  return new Promise(resolve => {
    let i = 0
    element.textContent = ''
    const cursor = document.createElement('span')
    cursor.className = 'cursor'
    cursor.textContent = '\u2588'
    element.appendChild(cursor)

    const timer = setInterval(() => {
      if (i < text.length) {
        element.insertBefore(document.createTextNode(text[i]), cursor)
        if (text[i] !== ' ') playTypeSound()
        i++
      } else {
        cursor.remove()
        clearInterval(timer)
        resolve()
      }
    }, speed)
  })
}

async function typeAllLines(container, lines, speed = 30) {
  for (const line of lines) {
    const lineDiv = document.createElement('div')
    lineDiv.className = 'terminal-line'
    container.appendChild(lineDiv)
    await typewriterEffect(lineDiv, line, speed)
    await new Promise(r => setTimeout(r, 50))
  }
}

// ── Sound Button Styles (injected once) ────────────────────────────────────

const soundButtonCSS = `
.sound-toggle-btn{position:absolute;top:50px;right:15px;background:transparent;
border:2px solid #00ff00;color:#00ff00;font-family:'Courier New',monospace;
font-size:11px;padding:5px 10px;cursor:pointer;transition:all .2s ease;
z-index:25;font-weight:bold}
.sound-toggle-btn:hover{background:#00ff00;color:#000;box-shadow:0 0 10px #00ff00}`

if (!document.getElementById('sound-btn-styles')) {
  const s = document.createElement('style')
  s.id = 'sound-btn-styles'
  s.textContent = soundButtonCSS
  document.head.appendChild(s)
}

// ── Tooltip Helpers ────────────────────────────────────────────────────────

function positionTooltip(e, tooltip) {
  const tw = 270, th = 150, pad = 20
  let left = e.clientX + pad
  let top  = e.clientY - pad
  if (left + tw > window.innerWidth)  left = e.clientX - tw - pad
  if (top + th > window.innerHeight)  top  = e.clientY - th - pad
  if (top < 0)  top  = e.clientY + pad
  if (left < 0) left = e.clientX + pad
  tooltip.style.left = `${left}px`
  tooltip.style.top  = `${top}px`
}

function buildTooltipHTML(item) {
  return `
    <b style="color:#00ff00;font-size:18px">${item.name}</b>
    <div style="margin-top:5px;font-style:italic">${item.subtitle}</div>
    <div style="font-size:11px;color:#00cc00;margin-top:5px">${item.info}</div>
    ${item.distance !== '0' ? `<div style="color:#00ff00;margin-top:5px">\ud83d\udccd Distance: ${item.distance}</div>` : ''}
    <div style="font-size:10px;color:#00ff00;margin-top:8px;animation:blink 1s infinite">\u25ba CLICK TO ACCESS TERMINAL</div>`
}

// ── Asteroid Belt Ring-Zone Detection ──────────────────────────────────────

function isInBeltRing(e, beltEl) {
  const rect = beltEl.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top  + rect.height / 2
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const outer = rect.width / 2
  const inner = outer * 0.83
  return dist >= inner && dist <= outer
}

// ── Modal ──────────────────────────────────────────────────────────────────

async function showModal(planetName, modal, modalContent, overlay) {
  const data = planetData[planetName]
  if (!data) return

  modal.style.display   = 'flex'
  overlay.style.display = 'block'
  modalContent.innerHTML = ''

  // Sound toggle button
  const soundBtn = document.createElement('button')
  soundBtn.id = 'sound-toggle'
  soundBtn.className = 'sound-toggle-btn'
  soundBtn.innerHTML = soundEnabled ? '\ud83d\udd0a SOUND: ON' : '\ud83d\udd07 SOUND: OFF'
  soundBtn.style.color = soundEnabled ? '#00ff00' : '#666'
  soundBtn.onclick = toggleSound
  modalContent.appendChild(soundBtn)

  const terminalContainer = document.createElement('div')
  terminalContainer.className = 'terminal-container'
  modalContent.appendChild(terminalContainer)

  const lines = [
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
    ...data.facts.map((f, i) => `${i + 1}. ${f}`),
    '',
    '> DATA TRANSFER COMPLETE',
    '> PRESS [ESC] OR [X] TO EXIT'
  ]

  await typeAllLines(terminalContainer, lines, 20)
}

// ── Initialise all UI interactions ─────────────────────────────────────────

export function initUI(simulation) {
  const tooltip      = document.getElementById('planet-info')
  const modal        = document.getElementById('planet-modal')
  const modalContent = document.getElementById('modal-content')
  const closeBtn     = document.getElementById('close-modal')
  const overlay      = document.getElementById('modal-overlay')

  function closeModal() {
    modal.style.display   = 'none'
    overlay.style.display = 'none'
  }

  closeBtn.addEventListener('click', closeModal)
  overlay.addEventListener('click', closeModal)

  // Attach per-body event listeners
  Object.keys(planetData).forEach(name => {
    let el
    if (name === 'asteroid-belt') {
      el = document.querySelector('[data-name="asteroid-belt"]')
    } else {
      el = document.querySelector(`.${name}`)
    }
    if (!el) return

    // ── Asteroid Belt (special ring-zone handling) ──
    if (name === 'asteroid-belt') {
      let beltVisible = false
      el.addEventListener('mousemove', e => {
        if (isInBeltRing(e, el)) {
          if (!beltVisible) {
            tooltip.innerHTML = buildTooltipHTML(planetData[name])
            tooltip.classList.add('show')
            beltVisible = true
          }
          positionTooltip(e, tooltip)
        } else if (beltVisible) {
          tooltip.classList.remove('show')
          beltVisible = false
        }
      })
      el.addEventListener('mouseleave', () => { tooltip.classList.remove('show'); beltVisible = false })
      el.addEventListener('click', e => {
        if (isInBeltRing(e, el)) { e.stopPropagation(); showModal(name, modal, modalContent, overlay) }
      })
      return
    }

    // ── Regular planets / moons / sun ──
    el.addEventListener('mouseenter', () => {
      if (simulation) simulation.pause()
      tooltip.innerHTML = buildTooltipHTML(planetData[name])
      tooltip.classList.add('show')
    })
    el.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show')
      if (simulation) simulation.resume()
    })
    el.addEventListener('mousemove', e => positionTooltip(e, tooltip))
    el.addEventListener('click', e => { e.stopPropagation(); showModal(name, modal, modalContent, overlay) })
  })

  // Escape closes modal
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })
}

// ── Star Parallax (canvas background) ──────────────────────────────────────

export function initStarParallax() {
  const canvas = document.getElementById('stars-bg')
  const ctx    = canvas.getContext('2d')

  const STAR_COUNT     = 220
  const PARALLAX       = 0.05
  const LERP           = 0.07

  const stars = Array.from({ length: STAR_COUNT }, () => ({
    nx: Math.random(),
    ny: Math.random(),
    radius: Math.random() * 1.4 + 0.3,
    opacity: Math.random() * 0.6 + 0.3,
  }))

  let targetX = window.innerWidth  / 2
  let targetY = window.innerHeight / 2
  let smoothX = targetX
  let smoothY = targetY

  document.addEventListener('mousemove', e => { targetX = e.clientX; targetY = e.clientY })

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
  resize()
  window.addEventListener('resize', resize)

  function draw() {
    const w  = canvas.width
    const h  = canvas.height
    const cx = w / 2
    const cy = h / 2

    smoothX += (targetX - smoothX) * LERP
    smoothY += (targetY - smoothY) * LERP
    const dx = (smoothX - cx) * PARALLAX
    const dy = (smoothY - cy) * PARALLAX

    ctx.clearRect(0, 0, w, h)
    for (const s of stars) {
      ctx.beginPath()
      ctx.arc(s.nx * w + dx, s.ny * h + dy, s.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${s.opacity})`
      ctx.fill()
    }
    requestAnimationFrame(draw)
  }
  draw()
}
