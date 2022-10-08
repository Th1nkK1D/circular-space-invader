let player, alien;

function setup() {
  createCanvas(800, 800);

  player = new Player({
    radius: 15,
    orbitalRadius: 100,
    rotationSpeed: PI / 800,
    bulletSpeed: 0.3,
    bulletHitBoxRadius: 5,
    fireCooldownDuration: 150,
  });

  alien = new Alien({
    radius: 15,
    orbitalRadius: 250,
    rotationSpeed: PI / 3000,
    bulletSpeed: -0.2,
    bulletHitBoxRadius: 5,
    fireCooldownDurationRange: [500, 1500],
  });
}

function draw() {
  background(0);

  player.draw();
  alien.draw();

  player.bulletSet.forEach((bullet) => {
    bullet.draw();

    if (bullet.checkCollisionWithFighter(alien)) {
      console.log('HIT ALIEN');
    }
  });

  alien.bulletSet.forEach((bullet) => {
    bullet.draw();

    if (bullet.checkCollisionWithFighter(player)) {
      console.log('HIT PLAYER');
    }
  });
}
