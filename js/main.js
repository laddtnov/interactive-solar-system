import { Simulation }     from './Simulation.js'
import { initUI, initStarParallax } from './ui.js'

const trailCanvas = document.getElementById('trail-canvas')
const sim = new Simulation(trailCanvas)
sim.init()

initUI(sim)
initStarParallax()

// Expose simulation for mobile speed controls
window.__sim = sim
