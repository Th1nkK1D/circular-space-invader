let spaceship;

function setup() {
  createCanvas(800, 800);

  spaceship = new Spaceship({
    shipSize: 30,
    orbitalRadius: 200,
    rotationSpeed: PI / 50,
  });
}

function draw() {
  background(0);

  spaceship.draw();
}
