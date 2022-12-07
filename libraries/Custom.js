class Particle {
  constructor({ x, y }) {
    this.pos = createVector(x, y);
    this.start = { ...this.pos };
    this.vel = createVector();
    this.acc = createVector();

    this.maxAcc = 0.4;
    this.maxSpeed = 4;
    this.avoidRadius = 100;

    this.gravity = createVector(0, 0.1);

    this.size = 4;
  }

  applyForce(vec) {
    this.acc.add(vec).limit(this.maxAcc);
  }

  dist(x, y) {
    return dist(this.pos.x, this.pos.y, x, y);
  }

  seek(x, y) {
    const predicted = this.pos.copy().add(this.vel);
    const desired = createVector(x, y);

    this.applyForce(desired.sub(predicted).mult(1 / this.dist(x, y)));
  }

  avoid(x, y) {
    const predicted = this.pos.copy().add(this.vel);
    const desired = createVector(x, y);

    this.applyForce(predicted.sub(desired));
  }

  update() {
    this.applyForce(this.gravity);

    if (this.dist(mouseX, mouseY) < this.avoidRadius)
      this.avoid(mouseX, mouseY);
    else this.seek(this.start.x, this.start.y);

    this.vel.add(this.acc).limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.draw();
  }

  draw() {
    circle(this.pos.x, this.pos.y, this.size);
  }
}
