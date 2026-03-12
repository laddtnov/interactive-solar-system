/** Immutable 2D vector — every method returns a new Vector. */
export class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add(v)    { return new Vector(this.x + v.x, this.y + v.y) }
  sub(v)    { return new Vector(this.x - v.x, this.y - v.y) }
  scale(s)  { return new Vector(this.x * s, this.y * s) }
  mag()     { return Math.sqrt(this.x * this.x + this.y * this.y) }
  magSq()   { return this.x * this.x + this.y * this.y }
  norm()    { const m = this.mag(); return m > 0 ? this.scale(1 / m) : new Vector() }
  distTo(v) { return this.sub(v).mag() }
}
