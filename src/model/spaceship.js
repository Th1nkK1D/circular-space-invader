class Spaceship {
  constructor({ shipSize, orbitalRadius, rotationSpeed }) {
    this.diameter = shipSize / 2;
    this.orbitalRadius = orbitalRadius;
    this.rotationSpeed = rotationSpeed;
    this.angle = 0;
  }

  draw() {
    this.updateShipAngle();
    this.drawOrbitalRing();
    this.drawShip();
  }

  drawShip() {
    fill(255);
    noStroke();

    translate(width / 2, height / 2);
    rotate(this.angle);

    const yOffset = -this.orbitalRadius / 2;

    triangle(
      0,
      -this.diameter + yOffset,
      this.diameter,
      this.diameter + yOffset,
      -this.diameter,
      this.diameter + yOffset
    );
  }

  drawOrbitalRing() {
    noFill();
    stroke(255, 50);
    strokeWeight(2);

    circle(width / 2, height / 2, this.orbitalRadius);
  }

  updateShipAngle() {
    if (keyIsDown(37 /* left arrow */)) {
      this.angle -= this.rotationSpeed;
    }

    if (keyIsDown(39 /* right arrow */)) {
      this.angle += this.rotationSpeed;
    }
  }
}
