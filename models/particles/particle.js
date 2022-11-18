/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// Particle class (to be inherited by Bullet and Debris)
class Particle extends PolarObject {
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
    super({
      origin,
      r: distance,
      theta: angle,
    });

    this.radius = radius;
    this.speed = speed;
    this.color = color;
    this.dispose = dispose;
    this.distanceToDisposed = distanceToDisposed;
  }

  // To be called in each frame
  draw() {
    // Move paricle according to speed
    this.coord.r += this.speed * deltaTime;

    this.drawBodyInPolarCoordSpace();

    // Dispose particle if it travel beyond distanceToDisposed
    if (abs(this.coord.r) > this.distanceToDisposed) {
      this.dispose(this);
    }
  }
}
