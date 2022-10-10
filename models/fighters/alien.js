/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// Player class, inherit from Fighter
class Alien extends Fighter {
  constructor({ fireCooldownDurationRange, ...config }) {
    super({
      ...config,
      bulletClass: AlienBullet,
      bulletColors: [COLOR_NEON_RED],
    }); // Pass constuctor argument to Fighter's constructor

    this.fireCooldownDurationRange = fireCooldownDurationRange;
  }

  // Draw body shape (alien)
  drawBody() {
    const width = this.radius * 1.8;
    const height = this.radius * 1.5;
    const dotSize = this.radius / 3;

    noStroke();
    fill(COLOR_NEON_PURPLE);

    // body
    rect(-width / 2, -height / 2, width, height);

    // arms
    rect(-width / 2 - dotSize, -dotSize / 2, dotSize, dotSize);
    rect(width / 2, -dotSize / 2, dotSize, dotSize);

    // legs
    rect((dotSize - width) / 2, height / 2, dotSize, dotSize);
    rect(width / 2 - 2 * dotSize, height / 2, dotSize, dotSize);

    // hat
    rect(-dotSize / 2, -height / 2 - dotSize, dotSize, dotSize);

    // eyes
    fill(COLOR_BLACK);
    rect(-width / 2 + dotSize, -height / 2 + dotSize, dotSize, dotSize);
    rect(width / 2 - 2 * dotSize, -height / 2 + dotSize, dotSize, dotSize);
  }

  // Update angle by rotationSpeed
  updateAngle() {
    this.angle += this.rotationSpeed * deltaTime;
  }

  // Fire bullet when fireCooldown is 0
  shouldFireBullet() {
    return this.fireCooldown === 0;
  }

  // Fire cooldown will be randomed in fireCooldownDurationRange
  setFireCooldown() {
    this.fireCooldown = random(...this.fireCooldownDurationRange);
  }

  // Speedup alien rotation and bullet speed, and fire coold
  speedUp() {
    this.rotationSpeed *= 1.1;
    this.bulletSpeed *= 1.05;
    this.fireCooldownDurationRange = this.fireCooldownDurationRange.map(
      (value) => value * 0.9
    );
  }
}
