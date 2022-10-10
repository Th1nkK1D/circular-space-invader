/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// AlienBullet class, inherit from Bullet
class AlienBullet extends Bullet {
  // Draw player's buller shape
  drawBody() {
    fill(this.color);
    circle(0, 0, this.hitboxRedius * 2);
  }
}
