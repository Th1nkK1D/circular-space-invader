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
    const width = this.radius * 2;
    const height = (this.radius * 4) / 3;
    const dotSize = this.radius / 3;

    const yOffset = -this.orbitalRadius;

    noStroke();
    fill(COLOR_NEON_PURPLE);

    // body
    rect(-width / 2, -height / 2 + yOffset, width, height);

    // arms
    rect(-width / 2 - dotSize, -dotSize / 2 + yOffset, dotSize, dotSize);
    rect(width / 2, -dotSize / 2 + yOffset, dotSize, dotSize);

    // legs
    rect((dotSize - width) / 2, height / 2 + yOffset, dotSize, dotSize);
    rect(width / 2 - 2 * dotSize, height / 2 + yOffset, dotSize, dotSize);

    // hat
    rect(-dotSize / 2, -height / 2 - dotSize + yOffset, dotSize, dotSize);

    // eyes
    fill(COLOR_BLACK);
    rect(
      -width / 2 + dotSize,
      -height / 2 + dotSize + yOffset,
      dotSize,
      dotSize
    );
    rect(
      width / 2 - 2 * dotSize,
      -height / 2 + dotSize + yOffset,
      dotSize,
      dotSize
    );
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
}
