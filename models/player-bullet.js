// PlayerBullet class, inherit from Bullet
class PlayerBullet extends Bullet {
  // Draw player's buller shape
  drawBody() {
    const width = this.hitboxRedius * 1.1;
    const height = this.hitboxRedius * 2.2;

    fill(this.color);
    rect(-width / 2, -height / 2, width, height);
  }
}
