// Bullet class (to be inherited by PlayerBullet and AlienBullet)
class Bullet {
  constructor({ distance, angle, speed, dispose, hitBoxRadius, color }) {
    this.distance = distance;
    this.angle = angle;
    this.speed = speed;
    this.dispose = dispose;
    this.hitboxRedius = hitBoxRadius;
    this.color = color;
    this.stageSafeDistance = sqrt(width * width + height * height) / 2;
  }

  // To be called in each frame
  draw() {
    // Move bullet according to speed
    this.distance += this.speed * deltaTime;

    // Transform body shape around canvas center
    translate(width / 2, height / 2);
    rotate(this.angle);
    translate(0, -this.distance);

    this.drawBody();

    resetMatrix();

    // Dispose bullet if it travel beyond cavas diagonal/2
    if (abs(this.distance) > this.stageSafeDistance) {
      this.dispose(this);
    }
  }

  // Check if the bullet collide with given fighter (using circle hit/hurt box)
  checkCollisionWithFighter(fighter) {
    const [fx, fy] = this.convertPolarToCartesian(
      fighter.angle,
      fighter.orbitalRadius
    );
    const [bx, by] = this.convertPolarToCartesian(this.angle, this.distance);

    const distanceFromBulletToFighter = sqrt(pow(fx - bx, 2) + pow(fy - by, 2));

    const isCollide =
      distanceFromBulletToFighter < fighter.radius + this.hitboxRedius;

    // Dispose the bullet if it's collided
    if (isCollide) {
      this.dispose(this);
    }

    return isCollide;
  }

  // Convert polay coordinate to cartesian coordinate
  convertPolarToCartesian(angle, radius) {
    return [
      radius * cos(angle), // x
      radius * sin(angle), // y
    ];
  }

  // Draw body shape (to be implemented by subclass)
  drawBody() {}
}
