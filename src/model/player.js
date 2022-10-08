class Player extends Fighter {
  constructor({
    fireCooldownDuration,
    maxBullet,
    bulletReloadDuration,
    ...config
  }) {
    super({
      ...config,
      bulletClass: PlayerBullet,
      bulletColors: [COLOR_NEON_CYAN, COLOR_NEON_PINK, COLOR_NEON_YELLOW],
    });

    this.fireCooldownDuration = fireCooldownDuration;
    this.currentBullet = maxBullet;
    this.maxBullet = maxBullet;
    this.bulletReloadDuration = bulletReloadDuration;
  }

  draw() {
    if (this.currentBullet < this.maxBullet) {
      this.currentBullet += deltaTime / this.bulletReloadDuration;
    }

    super.draw();
  }

  drawBody() {
    fill(this.color);
    noStroke();

    const yOffset = -this.orbitalRadius;

    triangle(
      0,
      -this.radius + yOffset,
      this.radius,
      this.radius + yOffset,
      -this.radius,
      this.radius + yOffset
    );
  }

  updateAngle() {
    if (keyIsDown(KEY_LEFT_ARROW)) {
      this.angle -= this.rotationSpeed * deltaTime;
    }

    if (keyIsDown(KEY_RIGHT_ARROW)) {
      this.angle += this.rotationSpeed * deltaTime;
    }
  }

  shouldFireBullet() {
    const isFire =
      keyIsDown(KEY_SPACE) && this.fireCooldown === 0 && this.currentBullet > 0;

    if (isFire) {
      this.currentBullet--;
    }

    return isFire;
  }

  setFireCooldown() {
    this.fireCooldown = this.fireCooldownDuration;
  }
}
