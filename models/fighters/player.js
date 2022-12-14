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
    this.isEmptyBulletSoundPlayed = false;
  }

  // Override fighter draw() to add refill bullet logic
  draw() {
    // Refill bullet by deltaTime is currentBullet is not full
    if (this.currentBullet < this.maxBullet) {
      this.currentBullet += deltaTime / this.bulletReloadDuration;

      if (this.currentBullet >= this.maxBullet) {
        fullBulletSound.play();
      }
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
      this.coord.theta -= this.rotationSpeed * deltaTime;
    }

    if (keyIsDown(KEY_RIGHT_ARROW)) {
      this.coord.theta += this.rotationSpeed * deltaTime;
    }
  }

  // Will fire bullet if space is pressed, no fire cooldown and bullet is available
  shouldFireBullet() {
    const isFire =
      keyIsDown(KEY_SPACE) && this.fireCooldown === 0 && this.currentBullet > 0;

    if (keyIsDown(KEY_SPACE) && this.fireCooldown === 0) {
      if (this.currentBullet > 0) {
        this.currentBullet--;
        this.isEmptyBulletSoundPlayed = false;

        // Pan laser sound to player position, random rate and play
        laserSound.pan(this.getAudioPanFromCoord());
        laserSound.rate(random(0.7, 1.3));
        laserSound.play();

        return true;
      }

      if (!this.isEmptyBulletSoundPlayed) {
        emptyBulletSound.play();
        this.isEmptyBulletSoundPlayed = true;
      }
    }

    return false;
  }

  // Set fireCooldown to be initial fireCooldownDuration
  setFireCooldown() {
    this.fireCooldown = this.fireCooldownDuration;
  }
}
