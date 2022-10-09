class Alien extends Fighter {
  constructor({ fireCooldownDurationRange, ...config }) {
    super({
      ...config,
      bulletClass: AlienBullet,
      bulletColors: [COLOR_NEON_RED],
    });

    this.fireCooldownDurationRange = fireCooldownDurationRange;
  }

  drawBody() {
    const width = this.radius * 1.8;
    const height = this.radius * 1.5;
    const dotSize = this.radius / 3;

    noStroke();
    fill(COLOR_NEON_PURPLE);

    // body
    rect(-width / 2, -height / 2, width, height);

    // arms
    rect(-width / 2 - dotSize, -dotSize / 2, dotSize, dotSize);
    rect(width / 2, -dotSize / 2, dotSize, dotSize);

    // legs
    rect((dotSize - width) / 2, height / 2, dotSize, dotSize);
    rect(width / 2 - 2 * dotSize, height / 2, dotSize, dotSize);

    // hat
    rect(-dotSize / 2, -height / 2 - dotSize, dotSize, dotSize);

    // eyes
    fill(COLOR_BLACK);
    rect(-width / 2 + dotSize, -height / 2 + dotSize, dotSize, dotSize);
    rect(width / 2 - 2 * dotSize, -height / 2 + dotSize, dotSize, dotSize);
  }

  updateAngle() {
    this.angle += this.rotationSpeed * deltaTime;
  }

  shouldFireBullet() {
    return this.fireCooldown === 0;
  }

  setFireCooldown() {
    this.fireCooldown = random(...this.fireCooldownDurationRange);
  }

  speedUp() {
    this.rotationSpeed *= 1.1;
    this.bulletSpeed *= 1.05;
    this.fireCooldownDurationRange = this.fireCooldownDurationRange.map(
      (value) => value * 0.9
    );
  }
}
