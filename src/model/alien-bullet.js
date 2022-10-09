// AlienBullet class, inherit from Bullet
class AlienBullet extends Bullet {
  // Draw player's buller shape
  drawBody() {
    fill(this.color);
    circle(0, 0, this.hitboxRedius * 2);
  }
}
