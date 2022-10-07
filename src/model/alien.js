class Alien extends Fighter {
  drawBody() {
    fill(255);
    noStroke();

    circle(0, -this.orbitalRadius, this.radius * 2);
  }

  updateAngle() {
    this.angle += this.rotationSpeed;
  }
}
