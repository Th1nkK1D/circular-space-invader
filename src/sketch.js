let player, aliens;

const ALIEN_LAYERS = [
  {
    amount: 5,
    rotationSpeed: -Math.PI / 10000,
    orbitalRadius: 350,
  },
  {
    amount: 7,
    rotationSpeed: Math.PI / 14000,
    orbitalRadius: 450,
  },
];

function setup() {
  createCanvas(1000, 1000);

  player = new Player({
    radius: 15,
    orbitalRadius: 150,
    rotationSpeed: PI / 800,
    bulletSpeed: 0.3,
    bulletHitBoxRadius: 5,
    fireCooldownDuration: 150,
  });

  aliens = ALIEN_LAYERS.flatMap(({ amount, orbitalRadius, rotationSpeed }) => {
    const angleOffset = random(0, 2 * PI);
    return new Array(amount).fill().map(
      (_, i) =>
        new Alien({
          radius: 15,
          angle: angleOffset + ((2 * PI) / amount) * i,
          rotationSpeed,
          orbitalRadius,
          bulletSpeed: -0.15,
          bulletHitBoxRadius: 5,
          fireCooldownDurationRange: [5000, 12000],
          initialFireCooldown: random(1000, 5000),
        })
    );
  });
}

function draw() {
  background(0);

  [player, ...ALIEN_LAYERS].forEach((obj, i) => {
    noFill();
    stroke(255, 30);
    strokeWeight(2);

    circle(width / 2, height / 2, obj.orbitalRadius * 2);
  });

  player.draw();

  aliens.forEach((alien) => {
    alien.draw();

    alien.bulletSet.forEach((bullet) => {
      bullet.draw();

      if (bullet.checkCollisionWithFighter(player)) {
        console.log('HIT PLAYER');
      }
    });
  });

  player.bulletSet.forEach((bullet) => {
    bullet.draw();

    aliens.forEach((alien) => {
      if (bullet.checkCollisionWithFighter(alien)) {
        console.log('HIT ALIEN');
      }
    });
  });
}
