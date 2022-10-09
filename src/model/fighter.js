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
    this.bulletHitBoxRadius = bulletHitBoxRadius;
    this.fireCooldown = initialFireCooldown;
    this.bulletColors = bulletColors;
    this.color = COLOR_WHITE;
    this.isEnabled = isEnabled;
  }

  draw() {
    if (this.isEnabled) {
      this.updateAngle();

      this.fireCooldown = Math.max(this.fireCooldown - deltaTime, 0);

      if (this.fireCooldown === 0) {
        this.color = COLOR_WHITE;
      }

      if (this.shouldFireBullet()) {
        this.color = random(this.bulletColors);

        this.bulletSet.add(
          new this.bulletClass({
            distance: this.orbitalRadius,
            angle: this.angle,
            speed: this.bulletSpeed,
            hitBoxRadius: this.bulletHitBoxRadius,
            color: this.color,
            dispose: (bullet) => this.bulletSet.delete(bullet),
          })
        );

        this.setFireCooldown();
      }
    }

    translate(width / 2, height / 2);
    rotate(this.angle);
    translate(0, -this.orbitalRadius);

    this.drawBody();

    resetMatrix();
  }

  drawBody() {}

  updateAngle() {}

  shouldFireBullet() {}

  setFireCooldown() {}
}
