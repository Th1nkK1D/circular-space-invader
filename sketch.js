let player, alienSet, isPlaying, isGameover, scientificaFont;

// Define orbit layer of aliens
const ALIEN_LAYERS = [
  {
    orbitalRadius: 300,
    amount: 3,
    rotationSpeed: Math.PI / 8000,
  },
  {
    orbitalRadius: 375,
    amount: 5,
    rotationSpeed: -Math.PI / 10000,
  },
  {
    orbitalRadius: 450,
    amount: 7,
    rotationSpeed: Math.PI / 14000,
  },
];

function setup() {
  createCanvas(1000, 1000);

  scientificaFont = loadFont('fonts/scientifica.ttf');

  isPlaying = false;
  isGameover = false;

  spawnPlayer(false);
}

function draw() {
  background(COLOR_BLACK);

  drawOrbitRings();

  if (isPlaying) {
    // If some aliens are still alive
    if (alienSet.size > 0) {
      // Draw aliens, alien's bullets and check collision with player
      alienSet.forEach((alien) => {
        alien.draw();

        alien.bulletSet.forEach((bullet) => {
          bullet.draw();

          // If alien bullet hits player, game is over
          if (bullet.checkCollisionWithFighter(player)) {
            isGameover = true;
          }
        });
      });
    } else {
      // All aliens are dead = Player win
      drawCutScene({
        title: 'YOU WIN',
        subtitle: 'PRESS <R> TO RESTART',
      });

      // Press R to reset the game
      if (keyIsDown(KEY_R)) {
        spawnPlayer();
        spawnAliens();
      }
    }

    // Draw player's bullets and check collision with every alien
    player.bulletSet.forEach((bullet) => {
      bullet.draw();

      alienSet.forEach((alien) => {
        if (bullet.checkCollisionWithFighter(alien)) {
          // If bullet collide with alien, delete alien and speed op other aliens
          alienSet.delete(alien);
          alienSet.forEach((otherAlien) => otherAlien.speedUp());
        }
      });
    });

    drawBulletHUD();
  } else {
    // Not playing = intro scene
    drawCutScene({
      title: 'CIRCULAR\nSPACE\nINVADER',
      subtitle:
        'Use ← → to move and <SPACE> to fire\n\n[ PRESS ANYKEY TO START ]',
    });

    // Start game when any key is pressed
    if (keyIsPressed) {
      spawnPlayer();
      spawnAliens();
      isGameover = false;
      isPlaying = true;
    }
  }

  if (isGameover) {
    // Game over scene
    drawCutScene({
      title: 'GAME OVER',
      subtitle: 'PRESS <R> TO RETRY',
    });

    // Press R to restart the game
    if (keyIsDown(KEY_R)) {
      spawnPlayer();
      spawnAliens();
      isGameover = false;
      isPlaying = true;
    }
  } else {
    // Draw player when game is not over
    player.draw();
  }
}

// Assign player with new Player instance, enable player by default
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

// Create alien instances according to ALIEN_LAYERS and add to alienSet set
function spawnAliens() {
  alienSet = new Set(); // Set is JS data structure, similar to array but can be select by value instead of index

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

// Draw player's and alien's orbit circle
function drawOrbitRings() {
  [player, ...ALIEN_LAYERS].forEach(({ orbitalRadius }) => {
    noFill();
    stroke(COLOR_WHITE, 30);
    strokeWeight(2);

    circle(width / 2, height / 2, orbitalRadius * 2);
  });
}

// Draw player's bullet status
function drawBulletHUD() {
  for (let b = 0; b < player.maxBullet; b++) {
    if (b < player.currentBullet) {
      // Available bullets are filled
      fill(player.color);
    } else {
      // Reloading bullets are outlined
      strokeWeight(1);
      stroke(COLOR_WHITE, 150);
      noFill();
    }

    rect(width - player.maxBullet * 10 + 10 * b, 10, 4, 15);
  }
}

// Draw cut scene text with title and subtitle
function drawCutScene({ title, subtitle }) {
  textFont(scientificaFont);
  textAlign('center', 'center');
  fill(COLOR_WHITE);

  textSize(42);
  text(title, width / 2, height / 2);

  textSize(18);
  text(subtitle, width / 2, height / 2 + 200);
}
