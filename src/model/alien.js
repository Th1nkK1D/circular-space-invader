class Alien extends Fighter {
  constructor({ fireCooldownDurationRange, ...config }) {
    super({ ...config, bulletClass: AlienBullet });

    this.fireCooldownDurationRange = fireCooldownDurationRange;
  }

  drawBody() {
    fill(255);
    noStroke();

    circle(0, -this.orbitalRadius, this.radius * 2);
  }

  updateAngle() {
    this.angle += this.rotationSpeed * deltaTime;
  }

  shouldFireBullet() {
    return millis() % 1000 === 0;
  }

  shouldFireBullet() {
    return this.fireCooldown === 0;
  }

  setFireCooldown() {
    this.fireCooldown = random(...this.fireCooldownDurationRange);
  }
}
