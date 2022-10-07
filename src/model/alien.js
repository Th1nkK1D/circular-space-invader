class Alien {
  constructor({ size, orbitalRadius, rotationSpeed, angle = 0 }) {
    this.diameter = size;
    this.orbitalRadius = orbitalRadius;
    this.rotationSpeed = rotationSpeed;
    this.angle = angle;
  }

  draw() {
    this.updateAngle();
    this.drawAlien();
  }

  drawAlien() {
    fill(255);
    noStroke();

    translate(width / 2, height / 2);
    rotate(this.angle);

    circle(0, -this.orbitalRadius / 2, this.diameter);

    resetMatrix();
  }

  updateAngle() {
    this.angle += this.rotationSpeed;
  }
}
