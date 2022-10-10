/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// Bullet class inherit from Particle (to be inherited by PlayerBullet and AlienBullet)
class Bullet extends Particle {
  constructor(config) {
    super({
      ...config,
      origin: [width / 2, height / 2],
      distanceToDisposed: sqrt(width * width + height * height) / 2,
    });
  }

  // Check if the bullet collide with given fighter (using circle hit/hurt box) and return collided fighter position
  checkCollisionWithFighter(fighter) {
    const [fx, fy] = this.convertPolarToCartesian(
      fighter.angle,
      fighter.orbitalRadius
    );
    const [bx, by] = this.convertPolarToCartesian(this.angle, this.distance);

    const distanceFromBulletToFighter = sqrt(pow(fx - bx, 2) + pow(fy - by, 2));

    const isCollide =
      distanceFromBulletToFighter < fighter.radius + this.radius;

    if (isCollide) {
      this.dispose(this); // Dispose the bullet if it's collided

      return [fx, fy]; // Return fighter position if collided
    }

    return null; // Return null if not
  }

  // Convert polay coordinate to cartesian coordinate
  convertPolarToCartesian(angle, radius) {
    const normalizedAngle = angle - PI / 2;
    return [
      radius * cos(normalizedAngle), // x
      radius * sin(normalizedAngle), // y
    ];
  }
}
