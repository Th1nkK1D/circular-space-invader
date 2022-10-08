class AlienBullet extends Bullet {
  drawBody(y) {
    fill(255);
    circle(0, y, this.hitboxRedius * 2);
  }
}
