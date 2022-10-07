let spaceship;
let alien;

function setup() {
  createCanvas(800, 800);

  spaceship = new Spaceship({
    shipSize: 30,
    orbitalRadius: 200,
    rotationSpeed: PI / 50,
  });

  alien = new Alien({
    size: 30,
    orbitalRadius: 500,
    rotationSpeed: PI / 200,
  });
}

function draw() {
  background(0);

  spaceship.draw();
  alien.draw();
}
