class Bullet {
  constructor({ distance, angle, speed, dispose }) {
    this.distance = distance;
    this.angle = angle;
    this.speed = speed;
    this.dispose = dispose;

    this.stageSafeDistance = sqrt(width * width + height * height) / 2;
  }

  draw() {
    this.distance += this.speed;

    translate(width / 2, height / 2);
    rotate(this.angle);

    this.drawBody(-this.distance);

    resetMatrix();

    if (abs(this.distance) > this.stageSafeDistance) {
      this.dispose(this);
    }
  }

  drawBody(y) {}
}
