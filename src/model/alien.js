class Alien extends Fighter {
  constructor(config) {
    super({ ...config, bulletClass: AlienBullet });
  }

  drawBody() {
    fill(255);
    noStroke();

    circle(0, -this.orbitalRadius, this.radius * 2);
  }

  updateAngle() {
    this.angle += this.rotationSpeed;
  }

  shouldFireBullet() {
    return frameCount % 80 === 0;
  }
}
