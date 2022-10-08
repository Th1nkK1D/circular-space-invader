class Player extends Fighter {
  constructor({ fireCooldownDuration, ...config }) {
    super({ ...config, bulletClass: PlayerBullet });

    this.fireCooldownDuration = fireCooldownDuration;
  }

  draw() {
    this.drawOrbitalRing();
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
      this.angle -= this.rotationSpeed * deltaTime;
    }

    if (keyIsDown(KEY_RIGHT_ARROW)) {
      this.angle += this.rotationSpeed * deltaTime;
    }
  }

  shouldFireBullet() {
    return keyIsDown(KEY_SPACE) && this.fireCooldown === 0;
  }

  setFireCooldown() {
    this.fireCooldown = this.fireCooldownDuration;
  }
}
