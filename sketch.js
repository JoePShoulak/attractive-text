function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

let roboto;
let points;
const word = "Joe++";

function preload() {
  roboto = loadFont("./fonts/Roboto-Regular.ttf");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  textFont(roboto);
  textSize(200);
  fill("white");
  noStroke();

  background(20);
  // text(word, 100, height / 2 + 50);
  points = roboto
    .textToPoints(word, 100, height / 2 + 50)
    .map((p) => new Particle(p));
  points.forEach(
    (p) => (p.pos = createVector(random(width), -100 - random(100)))
  );
}

function draw() {
  background(20);
  points.forEach((point) => point.update());
}
