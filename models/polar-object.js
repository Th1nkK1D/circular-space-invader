/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

// PolarObject class, base class of avery graphic objects
class PolarObject {
  constructor({ origin, r, theta }) {
    this.origin = origin;
    this.coord = { r, theta };
  }

  // To be called in each frame
  drawBodyInPolarCoordSpace() {
    // Transform body shape around canvas center
    translate(...this.origin);
    rotate(this.coord.theta);
    translate(0, -this.coord.r);

    this.drawBody();

    resetMatrix();
  }

  // Draw body shape (to be implemented by subclass)
  drawBody() {}

  // Convert polay coordinate to cartesian coordinate
  getCartesianCoord() {
    const normalizedAngle = this.coord.theta - PI / 2;
    return [
      this.coord.r * cos(normalizedAngle), // x
      this.coord.r * sin(normalizedAngle), // y
    ];
  }
}
