class Player extends Fighter {
  draw() {
    this.drawOrbitalRing();
    super.draw();
  }

  drawBody() {
    fill(255);
    noStroke();

    const yOffset = -this.orbitalRadius / 2;

    triangle(
      0,
      -this.radius + yOffset,
      this.radius,
      this.radius + yOffset,
      -this.radius,
      this.radius + yOffset
    );
  }

  drawOrbitalRing() {
    noFill();
    stroke(255, 50);
    strokeWeight(2);

    circle(width / 2, height / 2, this.orbitalRadius);
  }

  updateAngle() {
    if (keyIsDown(37 /* left arrow */)) {
      this.angle -= this.rotationSpeed;
    }

    if (keyIsDown(39 /* right arrow */)) {
      this.angle += this.rotationSpeed;
    }
  }
}
