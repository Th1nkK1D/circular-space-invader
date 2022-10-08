class AlienBullet extends Bullet {
  drawBody(y) {
    fill(COLOR_WHITE);
    circle(0, y, this.hitboxRedius * 2);
  }
}
