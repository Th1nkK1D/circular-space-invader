class Fighter {
  constructor({ radius, orbitalRadius, rotationSpeed, angle = 0 }) {
    this.radius = radius;
    this.orbitalRadius = orbitalRadius;
    this.rotationSpeed = rotationSpeed;
    this.angle = angle;
  }

  draw() {
    this.updateAngle();

    translate(width / 2, height / 2);
    rotate(this.angle);

    this.drawBody();

    resetMatrix();
  }

  drawBody() {}

  updateAngle() {}
}
