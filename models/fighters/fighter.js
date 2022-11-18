/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// Fighter class (will be inherit by Player and Alien)
class Fighter extends PolarObject {
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
    super({
      origin: [width / 2, height / 2],
      r: orbitalRadius,
      theta: angle,
    });

    this.radius = radius;
    this.rotationSpeed = rotationSpeed;
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
      if (this.coord.theta > 2 * PI) {
        this.coord.theta = this.coord.theta - 2 * PI;
      } else if (this.coord.theta < 0) {
        this.coord.theta = 2 * PI + this.coord.theta;
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
            distance: this.coord.r,
            angle: this.coord.theta,
            speed: this.bulletSpeed,
            radius: this.bulletRadius,
            color: this.color,
            dispose: (bullet) => this.bulletSet.delete(bullet),
          })
        );

        this.setFireCooldown();
      }
    }

    this.drawBodyInPolarCoordSpace();
  }

  // How to update angle in each frame (to be implemented by subclass)
  updateAngle() {}

  // Return boolean if bullet will be fired in this frame (to be implemented by subclass)
  shouldFireBullet() {}

  // Logic to set fireCooldown (to be implemented by subclass)
  setFireCooldown() {}

  // Calculate pan value from given/current coordinate x in range of screen width
  getAudioPanFromCoord(coord) {
    return (coord || this.getCartesianCoord())[0] / width / 2;
  }
}
