export class Body {
  /**
   * @param {object} opts
   * @param {string}  opts.id          - e.g. 'earth', 'moon'
   * @param {Vector}  opts.position    - absolute sim-space position
   * @param {Vector}  opts.velocity    - px / sim-second
   * @param {number}  opts.mass
   * @param {number}  opts.radius      - visual half-size in px
   * @param {string|null} opts.parent  - id of parent body (null for sun)
   * @param {string}  opts.domSelector
   * @param {string}  opts.color
   * @param {number}  opts.trailMax
   */
  constructor({ id, position, velocity, mass, radius, parent, domSelector, color, trailMax }) {
    this.id       = id
    this.pos      = position
    this.vel      = velocity
    this.mass     = mass
    this.radius   = radius
    this.parent   = parent
    this.color    = color
    this.domEl    = document.querySelector(domSelector)
    this.trail    = []
    this.trailMax = trailMax ?? 600
  }

  /** Record current position into the trail ring-buffer. */
  pushTrail() {
    if (this.trailMax === 0) return
    this.trail.push(this.pos.x, this.pos.y)          // flat array: [x0,y0,x1,y1,...]
    if (this.trail.length > this.trailMax * 2) {
      this.trail.splice(0, 2)                         // drop oldest point
    }
  }

  /** Move the DOM element to match the physics position. */
  updateDOM(cx, cy) {
    if (!this.domEl) return
    // translate to screen coords, then re-center the element on the point
    this.domEl.style.transform =
      `translate(${cx + this.pos.x}px, ${cy + this.pos.y}px) translate(-50%, -50%)`
  }
}
