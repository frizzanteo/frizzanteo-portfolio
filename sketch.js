// ═══════════════════════════════════════════════
// p5.js Sketch — frizzanteo portfolio
// Renders a rotating wireframe sphere + torus rings
// ═══════════════════════════════════════════════

let angle2 = 1;

class Sfera {
  constructor(radius) {
    this.radius = radius;
  }
  output() {
    stroke(255);         // white outline
    strokeWeight(0.3);
    fill(26);            // dark / black globe
    sphere(this.radius, 10, 10);
  }
}

let sfera2;

function getContainerSize() {
  const container = document.getElementById('p5-container');
  if (container) {
    const rect = container.getBoundingClientRect();
    const s = Math.min(rect.width, rect.height);
    if (s > 20) return Math.round(s);
  }
  return 240;
}

function setup() {
  const size = getContainerSize();
  let canvas = createCanvas(size, size, WEBGL);
  canvas.parent('p5-container');

  frameRate(60);
  angleMode(DEGREES);
  camera(600, 600, 600);

  sfera2 = new Sfera(100);
}

function draw() {
  background(245, 244, 239, 0); // transparent background

  // Dynamic scale so the black sphere is bold and outer green rings never get clipped
  const currentScale = (width / 220) * 0.55;
  scale(currentScale);

  // Rotating sphere
  push();
  rotateZ(angle2);
  rotateY(angle2);
  rotateX(angle2);
  sfera2.output();
  pop();

  // Ring 1 — green accent
  push();
  rotateX(45);
  noFill();
  stroke(20, 200, 80);
  strokeWeight(0.25);
  rotateZ(-angle2);
  rotateY(-angle2);
  rotateX(-angle2);
  torus(240, 10);
  pop();

  // Ring 2 — faster, tighter
  push();
  rotateX(45);
  noFill();
  stroke(20, 200, 80);
  strokeWeight(0.25);
  rotateZ(-angle2 * 2);
  rotateY(-angle2 * 2);
  rotateX(-angle2 * 4);
  torus(180, 10);
  pop();

  // Ring 3 — slow drift
  push();
  rotateX(45);
  noFill();
  stroke(20, 200, 80);
  strokeWeight(0.25);
  rotateZ(-angle2 / 3);
  rotateY(-angle2 / 3);
  rotateX(-angle2 / 3);
  torus(150, 10);
  pop();

  angle2 += 0.35;
}

// Resize canvas if container changes
function windowResized() {
  const size = getContainerSize();
  if (size > 20 && (size !== width || size !== height)) {
    resizeCanvas(size, size);
  }
}
