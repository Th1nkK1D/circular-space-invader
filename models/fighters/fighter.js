/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// Fighter class (will be inherit by Player and Alien)
class Fighter {
  constructor({
    radius,
    orbitalRadius,
    rotationSpeed,
    angle = 0,
    bulletSet = new Set(),
    bulletClass,
    bulletSpeed,
    bulletRadius,
    initialFireCooldown = 0,
    bulletColors,
    isEnabled = false,
  }) {
    this.radius = radius;
    this.orbitalRadius = orbitalRadius;
    this.rotationSpeed = rotationSpeed;
    this.angle = angle;
    this.bulletSet = bulletSet;
    this.bulletClass = bulletClass;
    this.bulletSpeed = bulletSpeed;
    this.bulletRadius = bulletRadius;
    this.fireCooldown = initialFireCooldown;
    this.bulletColors = bulletColors;
    this.color = COLOR_WHITE;
    this.isEnabled = isEnabled;
  }

  // To be called in each frame
  draw() {
    if (this.isEnabled) {
      this.updateAngle();

      // Loop angle in range 0 to 2*PI
      if (this.angle > 2 * PI) {
        this.angle = this.angle - 2 * PI;
      } else if (this.angle < 0) {
        this.angle = 2 * PI + this.angle;
      }

      // Deduct fireCooldown by delta time (min 0)
      this.fireCooldown = Math.max(this.fireCooldown - deltaTime, 0);

      if (this.fireCooldown === 0) {
        this.color = COLOR_WHITE;
      }

      if (this.shouldFireBullet()) {
        this.color = random(this.bulletColors);

        // Create new bullet instance and add to bulletSet
        this.bulletSet.add(
          new this.bulletClass({
            distance: this.orbitalRadius,
            angle: this.angle,
            speed: this.bulletSpeed,
            radius: this.bulletRadius,
            color: this.color,
            dispose: (bullet) => this.bulletSet.delete(bullet),
          })
        );

        this.setFireCooldown();
      }
    }

    // Transform body shape around canvas center
    translate(width / 2, height / 2);
    rotate(this.angle);
    translate(0, -this.orbitalRadius);

    this.drawBody();

    resetMatrix(); // Reset transformation for other shape
  }

  // Draw body shape (to be implemented by subclass)
  drawBody() {}

  // How to update angle in each frame (to be implemented by subclass)
  updateAngle() {}

  // Return boolean if bullet will be fired in this frame (to be implemented by subclass)
  shouldFireBullet() {}

  // Logic to set fireCooldown (to be implemented by subclass)
  setFireCooldown() {}
}