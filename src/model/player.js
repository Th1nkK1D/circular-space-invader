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

    const wingWidth = this.radius / 3;
    const wingHeight = this.radius;

    // Body
    triangle(
      0,
      -this.radius,
      this.radius,
      this.radius,
      -this.radius,
      this.radius
    );

    // Wings
    rect(
      this.radius - wingWidth / 2,
      this.radius - wingHeight,
      wingWidth,
      wingHeight
    );
    rect(
      -this.radius - wingWidth / 2,
      this.radius - wingHeight,
      wingWidth,
      wingHeight
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
