let player, alienSet, isPlaying, isGameover, scientificaFont;

const ALIEN_LAYERS = [
  {
    amount: 3,
    rotationSpeed: Math.PI / 8000,
    orbitalRadius: 300,
  },
  {
    amount: 5,
    rotationSpeed: -Math.PI / 10000,
    orbitalRadius: 375,
  },
  {
    amount: 7,
    rotationSpeed: Math.PI / 14000,
    orbitalRadius: 450,
  },
];

function setup() {
  createCanvas(1000, 1000);

  scientificaFont = loadFont('src/fonts/scientifica.ttf');

  isPlaying = false;
  isGameover = false;

  spawnPlayer(false);
}

function draw() {
  background(COLOR_BLACK);
  textFont(scientificaFont);
  textAlign('center', 'center');

  drawOrbitRings();

  if (isPlaying) {
    if (alienSet.size > 0) {
      alienSet.forEach((alien) => {
        alien.draw();

        alien.bulletSet.forEach((bullet) => {
          bullet.draw();

          if (bullet.checkCollisionWithFighter(player)) {
            alienSet.forEach((alien) => {
              alien.isEnable = false;
            });

            isGameover = true;
          }
        });
      });
    } else {
      drawCutScene({
        title: 'YOU WIN',
        subtitle: 'PRESS <R> TO RESTART',
      });

      if (keyIsDown(KEY_R)) {
        spawnPlayer();
        spawnAliens();
      }
    }

    player.bulletSet.forEach((bullet) => {
      bullet.draw();

      alienSet.forEach((alien) => {
        if (bullet.checkCollisionWithFighter(alien)) {
          alienSet.delete(alien);
          alienSet.forEach((otherAlien) => otherAlien.speedUp());
        }
      });
    });

    drawBulletHUD();
  } else {
    drawCutScene({
      title: 'CIRCULAR\nSPACE\nINVADER',
      subtitle: 'PRESS <SPACE> TO START',
    });

    if (keyIsDown(KEY_SPACE)) {
      spawnPlayer();
      spawnAliens();
      isGameover = false;
      isPlaying = true;
    }
  }

  if (isGameover) {
    drawCutScene({
      title: 'GAME OVER',
      subtitle: 'PRESS <R> TO RETRY',
    });

    if (keyIsDown(KEY_R)) {
      spawnPlayer();
      spawnAliens();
      isGameover = false;
      isPlaying = true;
    }
  } else {
    player.draw();
  }
}

function spawnPlayer(isEnabled = true) {
  player = new Player({
    isEnabled,
    radius: 15,
    orbitalRadius: 150,
    rotationSpeed: PI / 800,
    bulletSpeed: 0.3,
    bulletHitBoxRadius: 5,
    fireCooldownDuration: 150,
    maxBullet: 10,
    bulletReloadDuration: 400,
  });
}

function spawnAliens() {
  alienSet = new Set();

  ALIEN_LAYERS.forEach(({ amount, orbitalRadius, rotationSpeed }) => {
    const angleOffset = random(0, 2 * PI);

    for (let i = 0; i < amount; i++) {
      alienSet.add(
        new Alien({
          isEnabled: true,
          radius: 15,
          angle: angleOffset + ((2 * PI) / amount) * i,
          rotationSpeed,
          orbitalRadius,
          bulletSpeed: -0.15,
          bulletHitBoxRadius: 5,
          fireCooldownDurationRange: [5000, 12000],
          initialFireCooldown: random(0, 7000),
        })
      );
    }
  });
}

function drawOrbitRings() {
  [player, ...ALIEN_LAYERS].forEach(({ orbitalRadius }) => {
    noFill();
    stroke(COLOR_WHITE, 30);
    strokeWeight(2);

    circle(width / 2, height / 2, orbitalRadius * 2);
  });
}

function drawBulletHUD() {
  for (let b = 0; b < player.maxBullet; b++) {
    if (b < player.currentBullet) {
      fill(player.color);
    } else {
      strokeWeight(1);
      stroke(COLOR_WHITE, 150);
      noFill();
    }

    rect(width - player.maxBullet * 10 + 10 * b, 10, 4, 15);
  }
}

function drawCutScene({ title, subtitle }) {
  fill(COLOR_WHITE);

  textSize(42);
  text(title, width / 2, height / 2);

  textSize(16);
  text(subtitle, width / 2, height / 2 + 200);
}
