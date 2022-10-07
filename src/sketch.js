let player;
let alien;

function setup() {
  createCanvas(800, 800);

  player = new Player({
    radius: 15,
    orbitalRadius: 100,
    rotationSpeed: PI / 50,
  });

  alien = new Alien({
    radius: 15,
    orbitalRadius: 250,
    rotationSpeed: PI / 200,
  });
}

function draw() {
  background(0);

  player.draw();
  alien.draw();
}
