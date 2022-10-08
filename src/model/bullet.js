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

  draw() {
    this.distance += this.speed * deltaTime;

    translate(width / 2, height / 2);
    rotate(this.angle);

    this.drawBody(-this.distance);

    resetMatrix();

    if (abs(this.distance) > this.stageSafeDistance) {
      this.dispose(this);
    }
  }

  checkCollisionWithFighter(fighter) {
    const [fx, fy] = this.convertPolarToCartesian(
      fighter.angle,
      fighter.orbitalRadius
    );
    const [bx, by] = this.convertPolarToCartesian(this.angle, this.distance);

    const distanceFromBulletToFighter = sqrt(pow(fx - bx, 2) + pow(fy - by, 2));

    const isCollide =
      distanceFromBulletToFighter < fighter.radius + this.hitboxRedius;

    if (isCollide) {
      this.dispose(this);
    }

    return isCollide;
  }

  convertPolarToCartesian(angle, radius) {
    return [
      radius * cos(angle), // x
      radius * sin(angle), // y
    ];
  }

  drawBody(y) {}
}
