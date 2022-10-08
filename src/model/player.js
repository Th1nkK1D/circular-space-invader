class Player extends Fighter {
  constructor(config) {
    super({ ...config, bulletClass: PlayerBullet });

    this.fireCooldown = 0;
    this.initialCooldownTime = 150;
  }

  draw() {
    this.drawOrbitalRing();

    this.fireCooldown = Math.max(this.fireCooldown - deltaTime, 0);

    super.draw();
  }

  drawBody() {
    fill(255);
    noStroke();

    const yOffset = -this.orbitalRadius;

    triangle(
      0,
      -this.radius + yOffset,
      this.radius,
      this.radius + yOffset,
      -this.radius,
      this.radius + yOffset
    );
  }

  drawOrbitalRing() {
    noFill();
    stroke(255, 50);
    strokeWeight(2);

    circle(width / 2, height / 2, this.orbitalRadius * 2);
  }

  updateAngle() {
    if (keyIsDown(KEY_LEFT_ARROW)) {
      this.angle -= this.rotationSpeed;
    }

    if (keyIsDown(KEY_RIGHT_ARROW)) {
      this.angle += this.rotationSpeed;
    }
  }

  shouldFireBullet() {
    const isFire = keyIsDown(KEY_SPACE) && this.fireCooldown === 0;

    if (isFire) {
      this.fireCooldown = this.initialCooldownTime;
    }

    return isFire;
  }
}
