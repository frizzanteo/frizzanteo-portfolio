// code run on my pc not on the web editor

let angle1 = 1;
let angle2 = 1;

let tx = 0;
let ty = 0;
let tz = 0;

class sfera {
  constructor(radius) {
    this.radius = radius;
  }

  output() {
    stroke(256);
    strokeWeight (0.3);
   fill(0);
    sphere(this.radius, 10,10);
  }
}

let sfera1;

function setup() {
  let canvas = createCanvas(140, 140, WEBGL);
  canvas.parent('letteraO');



  frameRate(60);
  angleMode(DEGREES);
  camera(600, 600, 600);

  sfera2 = new sfera(100);
}

function draw() {
  background(255,0);

  scale (0.3)

  push();
  rotateZ(angle2);
  rotateY(angle2);
  rotateX(angle2);
  sfera2.output();
  angle2 = angle2 + 0.2;
  pop();

  push();
  rotateX(45);
  noFill();
  stroke(20, 250, 20);
  strokeWeight (0.2);
  rotateZ(-angle2);
  rotateY(-angle2);
  rotateX(-angle2);
  angle2 = angle2 + 0.2;
  torus(240, 10);
  pop();

  push();
  rotateX(45);
  noFill();
  stroke(20, 250, 20);
  strokeWeight (0.2);
  rotateZ(-angle2 * 2);
  rotateY(-angle2 * 2);
  rotateX(-angle2 * 4);
  angle2 = angle2 + 1;
  torus(180, 10);
  pop();

  push();
  rotateX(45);
  noFill();
  stroke(20, 250, 20);
  strokeWeight (0.2);
  rotateZ(-angle2 / 3);
  rotateY(-angle2 / 3);
  rotateX(-angle2 / 3);
  angle2 = angle2 + 1;
  torus(150, 10);
  pop();
}
