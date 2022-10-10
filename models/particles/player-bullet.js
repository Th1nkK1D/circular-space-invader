/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// PlayerBullet class, inherit from Bullet
class PlayerBullet extends Bullet {
  // Draw player's buller shape
  drawBody() {
    const width = this.radius * 1.1;
    const height = this.radius * 2.2;

    fill(this.color);
    rect(-width / 2, -height / 2, width, height);
  }
}
