function windowResized() {
  resizeCanvas(innerWidth, innerHeight);

  reset();
}

let roboto;
let points;
const word = "Joe++";
const widthPad = 0.75;

function preload() {
  roboto = loadFont("./fonts/Roboto-Regular.ttf");
}

function reset() {
  textSize(height / 2);
  while (textWidth(word) > width * widthPad) textSize(textSize() - 1);
  points = roboto
    .textToPoints(
      word,
      (width - textWidth(word)) / 2,
      height / 2 + textSize() / 3,
      textSize(),
      { sampleFactor: 0.5 }
    )
    .map((p) => new Particle(p));
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  textFont(roboto);

  fill("white");
  noStroke();

  background(20);
  reset();

  points.forEach(
    (p) => (p.pos = createVector(random(width), random(-200, -100)))
  );
}

function draw() {
  background(20);
  points.forEach((point) => point.update());
}
