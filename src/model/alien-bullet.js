class AlienBullet extends Bullet {
  drawBody(y) {
    fill(this.color);
    circle(0, y, this.hitboxRedius * 2);
  }
}
