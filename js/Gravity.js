import { Vector } from './Vector.js'

// Softening prevents division-by-zero when bodies pass very close.
// Keep small: large values distort orbits (Bertrand's theorem — only
// exact 1/r² produces closed ellipses).  1 px² is enough safety.
const SOFTENING_SQ = 1    // 1^2

/**
 * Acceleration for planets in a simplified, solar‑centric model.
 * Each planet only feels the Sun's gravity, which keeps their
 * paths very close to perfect circles that match `orbitRadius`.
 */
function planetAccel(body, sun, G) {
  // The sun itself has no acceleration (pinned at origin)
  if (body === sun) return new Vector(0, 0)

  const dx = sun.pos.x - body.pos.x
  const dy = sun.pos.y - body.pos.y
  const distSq = dx * dx + dy * dy + SOFTENING_SQ
  const dist   = Math.sqrt(distSq)
  const mag    = G * sun.mass / distSq

  return new Vector(
    dx / dist * mag,
    dy / dist * mag
  )
}

/**
 * Velocity-Verlet integration — symplectic, conserves energy.
 *
 * Strategy for moons: integrate in RELATIVE coordinates (offset from parent).
 * This is the standard restricted two-body approach and is perfectly stable
 * regardless of the parent's own motion through space.
 */
export function step(bodies, dt, G, bodyMap) {
  // Separate planets (includes sun) from moons
  const planets = bodies.filter(b => !b.parent || b.parent === 'sun')
  const moons   = bodies.filter(b => b.parent && b.parent !== 'sun')

  const sun = planets.find(b => !b.parent)

  // ── Step 1: Convert moons to relative coordinates ──

  for (const moon of moons) {
    const p = bodyMap.get(moon.parent)
    if (!p) continue
    // Store relative position/velocity
    moon._relX = moon.pos.x - p.pos.x
    moon._relY = moon.pos.y - p.pos.y
    moon._relVx = moon.vel.x - p.vel.x
    moon._relVy = moon.vel.y - p.vel.y
  }

  // ── Step 2: Integrate planets with solar‑centric Velocity-Verlet ──

  const pAcc = planets.map(p => planetAccel(p, sun, G))

  // Position update (skip sun — pinned at origin)
  for (let i = 0; i < planets.length; i++) {
    const b = planets[i]
    if (!b.parent) continue   // sun stays at (0,0)
    b.pos = new Vector(
      b.pos.x + b.vel.x * dt + 0.5 * pAcc[i].x * dt * dt,
      b.pos.y + b.vel.y * dt + 0.5 * pAcc[i].y * dt * dt
    )
  }

  const pNewAcc = planets.map(p => planetAccel(p, sun, G))

  // Velocity update (skip sun)
  for (let i = 0; i < planets.length; i++) {
    const b = planets[i]
    if (!b.parent) continue
    b.vel = new Vector(
      b.vel.x + 0.5 * (pAcc[i].x + pNewAcc[i].x) * dt,
      b.vel.y + 0.5 * (pAcc[i].y + pNewAcc[i].y) * dt
    )
  }

  // ── Step 3: Integrate moons in relative coordinates ──
  // In relative coords, moon only feels parent's gravity:
  //   a_rel = -G * M_parent * r_rel / |r_rel|^3

  for (const moon of moons) {
    const p = bodyMap.get(moon.parent)
    if (!p) continue

    let rx = moon._relX, ry = moon._relY
    let vx = moon._relVx, vy = moon._relVy

    // Acceleration at current relative position
    const distSq1 = rx * rx + ry * ry + SOFTENING_SQ
    const dist1   = Math.sqrt(distSq1)
    const mag1    = G * p.mass / distSq1
    const ax1     = -rx / dist1 * mag1
    const ay1     = -ry / dist1 * mag1

    // Position update
    rx += vx * dt + 0.5 * ax1 * dt * dt
    ry += vy * dt + 0.5 * ay1 * dt * dt

    // Acceleration at new relative position
    const distSq2 = rx * rx + ry * ry + SOFTENING_SQ
    const dist2   = Math.sqrt(distSq2)
    const mag2    = G * p.mass / distSq2
    const ax2     = -rx / dist2 * mag2
    const ay2     = -ry / dist2 * mag2

    // Velocity update
    vx += 0.5 * (ax1 + ax2) * dt
    vy += 0.5 * (ay1 + ay2) * dt

    // Convert back to absolute coordinates
    moon.pos = new Vector(p.pos.x + rx, p.pos.y + ry)
    moon.vel = new Vector(p.vel.x + vx, p.vel.y + vy)
  }
}
