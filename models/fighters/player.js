/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// Player class, inherit from Fighter
class Player extends Fighter {
  constructor({
    fireCooldownDuration,
    maxBullet,
    bulletReloadDuration,
    maxRotationSpeed,
    rotationAcceleration,
    ...config
  }) {
    super({
      ...config,
      rotationSpeed: 0,
      bulletClass: PlayerBullet,
      bulletColors: [COLOR_NEON_CYAN, COLOR_NEON_PINK, COLOR_NEON_YELLOW],
    }); // Pass constuctor argument to Fighter's constructor

    this.fireCooldownDuration = fireCooldownDuration;
    this.currentBullet = maxBullet;
    this.maxBullet = maxBullet;
    this.bulletReloadDuration = bulletReloadDuration;
    this.maxRotationSpeed = maxRotationSpeed;
    this.rotationAcceleration = rotationAcceleration;
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
      this.rotationSpeed = max(
        this.rotationSpeed - this.rotationAcceleration * deltaTime,
        -this.maxRotationSpeed
      );
    } else if (keyIsDown(KEY_RIGHT_ARROW)) {
      this.rotationSpeed = min(
        this.rotationSpeed + this.rotationAcceleration * deltaTime,
        this.maxRotationSpeed
      );
    } else if (this.rotationSpeed > 0) {
      this.rotationSpeed = max(
        this.rotationSpeed - this.rotationAcceleration * deltaTime,
        0
      );
    } else {
      this.rotationSpeed = min(
        this.rotationSpeed + this.rotationAcceleration * deltaTime,
        0
      );
    }

    this.angle += this.rotationSpeed * deltaTime;
  }

  // Will fire bullet if space is pressed, no fire cooldown and bullet is available
  shouldFireBullet() {
    const isFire =
      keyIsDown(KEY_SPACE) && this.fireCooldown === 0 && this.currentBullet > 0;

    if (isFire) {
      this.currentBullet--;

      // Play sound with random rate
      laserSound.rate(random(0.8, 1.2));
      laserSound.play();
    }

    return isFire;
  }

  // Set fireCooldown to be initial fireCooldownDuration
  setFireCooldown() {
    this.fireCooldown = this.fireCooldownDuration;
  }
}
