/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// Particle class (to be inherited by Bullet and Debris)
class Particle {
  constructor({
    radius,
    origin,
    distance,
    angle,
    speed,
    color,
    dispose,
    distanceToDisposed,
  }) {
    this.radius = radius;
    this.origin = origin;
    this.distance = distance;
    this.angle = angle;
    this.speed = speed;
    this.color = color;
    this.dispose = dispose;
    this.distanceToDisposed = distanceToDisposed;
  }

  // To be called in each frame
  draw() {
    // Move paricle according to speed
    this.distance += this.speed * deltaTime;

    // Transform body shape around canvas center
    translate(...this.origin);
    rotate(this.angle);
    translate(0, -this.distance);

    this.drawBody();

    resetMatrix();

    // Dispose particle if it travel beyond distanceToDisposed
    if (abs(this.distance) > this.distanceToDisposed) {
      this.dispose(this);
    }
  }

  // Draw body shape (to be implemented by subclass)
  drawBody() {}
}
