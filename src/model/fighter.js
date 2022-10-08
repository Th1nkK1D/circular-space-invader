class Fighter {
  constructor({
    radius,
    orbitalRadius,
    rotationSpeed,
    angle = 0,
    bulletSet = new Set(),
    bulletClass,
    bulletSpeed,
    bulletHitBoxRadius,
  }) {
    this.radius = radius;
    this.orbitalRadius = orbitalRadius;
    this.rotationSpeed = rotationSpeed;
    this.angle = angle;
    this.bulletSet = bulletSet;
    this.bulletClass = bulletClass;
    this.bulletSpeed = bulletSpeed;
    this.bulletHitBoxRadius = bulletHitBoxRadius;
    this.fireCooldown = 0;
  }

  draw() {
    this.updateAngle();

    translate(width / 2, height / 2);
    rotate(this.angle);

    this.drawBody();

    resetMatrix();

    this.fireCooldown = Math.max(this.fireCooldown - deltaTime, 0);

    if (this.shouldFireBullet()) {
      this.bulletSet.add(
        new this.bulletClass({
          distance: this.orbitalRadius,
          angle: this.angle,
          speed: this.bulletSpeed,
          hitBoxRadius: this.bulletHitBoxRadius,
          dispose: (bullet) => this.bulletSet.delete(bullet),
        })
      );

      this.setFireCooldown();
    }
  }

  drawBody() {}

  updateAngle() {}

  shouldFireBullet() {}

  setFireCooldown() {}
}
