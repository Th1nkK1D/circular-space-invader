class PlayerBullet extends Bullet {
  drawBody(y) {
    const width = this.hitboxRedius * 1.1;
    const height = this.hitboxRedius * 2.2;

    fill(COLOR_WHITE);
    rect(-width / 2, y - height / 2, width, height);
  }
}
