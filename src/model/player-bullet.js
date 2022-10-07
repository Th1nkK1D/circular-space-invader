class PlayerBullet extends Bullet {
  drawBody(y) {
    const width = 6;
    const height = 9;

    fill(255);
    rect(-width / 2, y - height / 2, width, height);
  }
}
