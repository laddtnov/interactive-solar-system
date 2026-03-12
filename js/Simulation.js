import { Vector } from './Vector.js'
import { Body }   from './Body.js'
import { step }   from './Gravity.js'
import { G, bodyConfig } from './data.js'

const SPEEDS     = [1, 10, 50, 200]
const MIN_STEPS  = 4               // minimum sub-steps per frame
const MAX_SUB_DT = 0.012           // max physics dt per sub-step (~1.4px for Mercury)
const MOBILE_CAP = 150             // cap sub-steps on mobile for performance
const MAX_DT     = 1 / 30          // cap to prevent explosion after tab-switch
const MOBILE_BP  = 768             // px

export class Simulation {
  constructor(trailCanvas) {
    this.canvas    = trailCanvas
    this.ctx       = trailCanvas.getContext('2d')
    this.bodies    = []
    this.bodyMap   = new Map()      // id → Body
    this.speedIdx  = 0
    this.timeScale = SPEEDS[0]
    this.paused    = false
    this.lastTime  = 0
    this.centerX   = 600            // half of 1200 .space
    this.centerY   = 600
    this.isMobile  = window.innerWidth <= MOBILE_BP
    this.frameCount = 0
  }

  // ── Initialisation ───────────────────────────────────────────────────────

  init() {
    this._buildBodies()
    this._sizeCanvas()
    this._bindKeys()
    window.addEventListener('resize', () => {
      this._sizeCanvas()
      this.isMobile = window.innerWidth <= MOBILE_BP
    })
    // Pause physics when tab is hidden to avoid dt explosion
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.lastTime = performance.now()
    })
    this.lastTime = performance.now()
    requestAnimationFrame(t => this._loop(t))
  }

  _buildBodies() {
    // First pass — create Body instances with placeholder positions
    for (const cfg of bodyConfig) {
      const body = new Body({
        id:          cfg.id,
        position:    new Vector(0, 0),
        velocity:    new Vector(0, 0),
        mass:        cfg.mass,
        radius:      cfg.radius,
        parent:      cfg.parent,
        domSelector: cfg.domSelector,
        color:       cfg.color,
        trailMax:    cfg.trailMax,
      })
      this.bodies.push(body)
      this.bodyMap.set(cfg.id, body)
    }

    // Second pass — set initial positions & circular-orbit velocities
    for (const cfg of bodyConfig) {
      const body = this.bodyMap.get(cfg.id)

      if (!cfg.parent) {
        // Sun stays at origin
        body.pos = new Vector(0, 0)
        body.vel = new Vector(0, 0)
        continue
      }

      const parent = this.bodyMap.get(cfg.parent)
      const r      = cfg.orbitRadius
      const angle  = cfg.startAngle ?? 0

      // Position relative to parent
      body.pos = new Vector(
        parent.pos.x + r * Math.cos(angle),
        parent.pos.y + r * Math.sin(angle)
      )

      // Circular-orbit speed around parent:  v = sqrt(G * M_parent / r)
      const speed = Math.sqrt(G * parent.mass / r)
      const dir   = cfg.retrograde ? 1 : -1   // -1 = counter-clockwise (prograde)

      body.vel = new Vector(
        parent.vel.x + speed * dir * Math.sin(angle),
        parent.vel.y + speed * (-dir) * Math.cos(angle)
      )
    }
  }

  // ── Main Loop ────────────────────────────────────────────────────────────

  _loop(now) {
    let dt = (now - this.lastTime) / 1000
    this.lastTime = now
    dt = Math.min(dt, MAX_DT)

    if (!this.paused && !document.hidden) {
      const scaledDt = dt * this.timeScale

      // Adaptive sub-stepping: more steps at higher speeds so fast
      // inner planets (Mercury v≈120 px/s) stay accurate.
      // MAX_SUB_DT = 0.012 → Mercury moves ~1.4px per step (2% of orbit)
      let steps = Math.max(MIN_STEPS, Math.ceil(scaledDt / MAX_SUB_DT))
      if (this.isMobile) steps = Math.min(steps, MOBILE_CAP)
      const subDt = scaledDt / steps

      for (let i = 0; i < steps; i++) {
        step(this.bodies, subDt, G, this.bodyMap)
      }

      // Record trails once per frame
      for (const b of this.bodies) b.pushTrail()
    }

    this.frameCount++
    // On mobile, draw trails every other frame
    if (!this.isMobile || this.frameCount % 2 === 0) {
      this._renderTrails()
    }
    this._updateDOM()

    requestAnimationFrame(t => this._loop(t))
  }

  // ── DOM Positioning ──────────────────────────────────────────────────────

  _updateDOM() {
    for (const b of this.bodies) {
      b.updateDOM(this.centerX, this.centerY)
    }
  }

  // ── Trail Canvas ─────────────────────────────────────────────────────────

  _sizeCanvas() {
    this.canvas.width  = 1200
    this.canvas.height = 1200
  }

  _renderTrails() {
    const ctx = this.ctx
    const cx  = this.centerX
    const cy  = this.centerY

    ctx.clearRect(0, 0, 1200, 1200)

    // Draw soft orbit guide lines for planets around the sun
    ctx.save()
    ctx.strokeStyle = 'rgba(200, 200, 255, 0.12)'
    ctx.lineWidth   = 0.8
    for (const cfg of bodyConfig) {
      if (cfg.parent !== 'sun' || !cfg.orbitRadius) continue
      ctx.beginPath()
      ctx.arc(cx, cy, cfg.orbitRadius, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.restore()

    for (const body of this.bodies) {
      const t = body.trail
      if (t.length < 4) continue        // need at least 2 points (4 values)

      ctx.beginPath()
      ctx.strokeStyle = body.color
      ctx.lineWidth   = 1

      const len = t.length
      ctx.moveTo(cx + t[0], cy + t[1])

      for (let i = 2; i < len; i += 2) {
        // Fade: alpha ramps from 0.05 (oldest) to 0.6 (newest)
        ctx.globalAlpha = 0.05 + 0.55 * (i / len)
        ctx.lineTo(cx + t[i], cy + t[i + 1])
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx + t[i], cy + t[i + 1])
      }
    }
    ctx.globalAlpha = 1
  }

  // ── Time Controls ────────────────────────────────────────────────────────

  _bindKeys() {
    document.addEventListener('keydown', (e) => {
      // Don't capture keys when modal is open
      const modal = document.getElementById('planet-modal')
      if (modal && modal.style.display === 'flex') return

      if (e.key === ']' || e.key === '=') {
        this.speedIdx = Math.min(this.speedIdx + 1, SPEEDS.length - 1)
        this.timeScale = SPEEDS[this.speedIdx]
        this._updateHUD()
      }
      if (e.key === '[' || e.key === '-') {
        this.speedIdx = Math.max(this.speedIdx - 1, 0)
        this.timeScale = SPEEDS[this.speedIdx]
        this._updateHUD()
      }
      if (e.key === ' ') {
        e.preventDefault()
        this.paused = !this.paused
        this._updateHUD()
      }
      // Number keys 1-4 for direct speed selection
      const num = parseInt(e.key)
      if (num >= 1 && num <= 4) {
        this.speedIdx = num - 1
        this.timeScale = SPEEDS[this.speedIdx]
        this._updateHUD()
      }
    })
  }

  _updateHUD() {
    const el = document.getElementById('speed-hud')
    if (!el) return
    if (this.paused) {
      el.textContent = 'PAUSED'
    } else {
      el.textContent = `${this.timeScale}x`
    }
  }

  /** Expose for mobile UI buttons */
  speedUp()   { this.speedIdx = Math.min(this.speedIdx + 1, SPEEDS.length - 1); this.timeScale = SPEEDS[this.speedIdx]; this._updateHUD() }
  speedDown() { this.speedIdx = Math.max(this.speedIdx - 1, 0); this.timeScale = SPEEDS[this.speedIdx]; this._updateHUD() }
  togglePause() { this.paused = !this.paused; this._updateHUD() }
  pause() { if (!this.paused) { this.paused = true; this._updateHUD() } }
  resume() { if (this.paused) { this.paused = false; this._updateHUD() } }
}
