// Player class, inherit from Fighter
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
    }); // Pass constuctor argument to Fighter's constructor

    this.fireCooldownDuration = fireCooldownDuration;
    this.currentBullet = maxBullet;
    this.maxBullet = maxBullet;
    this.bulletReloadDuration = bulletReloadDuration;
  }

  // Override fighter draw() to add refill bullet logic
  draw() {
    // Refill bullet by deltaTime is currentBullet is not full
    if (this.currentBullet < this.maxBullet) {
      this.currentBullet += deltaTime / this.bulletReloadDuration;
    }

    super.draw(); // Call Fighter's draw()
  }

  // Draw body shape (spaceship)
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

  // Update angle according to the pressed arrow jey
  updateAngle() {
    if (keyIsDown(KEY_LEFT_ARROW)) {
      this.angle -= this.rotationSpeed * deltaTime;
    }

    if (keyIsDown(KEY_RIGHT_ARROW)) {
      this.angle += this.rotationSpeed * deltaTime;
    }
  }

  // Will fire bullet if space is pressed, no fire cooldown and bullet is available
  shouldFireBullet() {
    const isFire =
      keyIsDown(KEY_SPACE) && this.fireCooldown === 0 && this.currentBullet > 0;

    if (isFire) {
      this.currentBullet--;
    }

    return isFire;
  }

  // Set fireCooldown to be initial fireCooldownDuration
  setFireCooldown() {
    this.fireCooldown = this.fireCooldownDuration;
  }
}
