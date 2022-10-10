/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

let player, alienSet, gameState, scientificaFont, msElapsed;

// Define orbit layer of aliens
const ALIEN_LAYERS = [
  {
    orbitalRadius: 300,
    amount: 3,
    rotationSpeed: Math.PI / 8000,
  },
  {
    orbitalRadius: 375,
    amount: 4,
    rotationSpeed: -Math.PI / 10000,
  },
  {
    orbitalRadius: 450,
    amount: 5,
    rotationSpeed: Math.PI / 14000,
  },
];

function setup() {
  createCanvas(1000, 1000);

  scientificaFont = loadFont('fonts/scientifica.ttf');

  gameState = STATE_INTRO;

  spawnPlayer(false);
}

function draw() {
  background(COLOR_BLACK);

  drawOrbitRings();

  if (gameState === STATE_INTRO) {
    // Intro scene
    drawCutScene({
      title: 'CIRCULAR\nSPACE\nINVADER',
      subtitle:
        'Use ← → to move and <SPACE> to fire\n\n[ PRESS ANY KEY TO START ]',
      startGameOn: () => keyIsPressed,
    });
  } else {
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

    drawTimeElapsed();
    drawBulletHUD();
  }

  if (gameState === STATE_PLAYING) {
    msElapsed += deltaTime;

    if (alienSet.size === 0) {
      // No alien left = player win
      gameState = STATE_WIN;
    }
  }

  if (gameState === STATE_PLAYING || gameState === STATE_GAMEOVER) {
    // Draw aliens, alien's bullets and check collision with player
    alienSet.forEach((alien) => {
      alien.draw();

      alien.bulletSet.forEach((bullet) => {
        bullet.draw();

        // If alien bullet hits player, game is over
        if (bullet.checkCollisionWithFighter(player)) {
          gameState = STATE_GAMEOVER;
        }
      });
    });
  }

  if (gameState === STATE_WIN) {
    // All aliens are dead = Player win
    drawCutScene({
      title: 'YOU WIN',
      subtitle: 'PRESS <R> TO RESTART',
      startGameOn: () => keyIsDown(KEY_R),
    });
  }

  if (gameState === STATE_GAMEOVER) {
    // Game over scene
    drawCutScene({
      title: 'GAME OVER',
      subtitle: 'PRESS <R> TO RETRY',
      startGameOn: () => keyIsDown(KEY_R),
    });
  } else {
    // Draw player when game is not over
    player.draw();
  }
}

// Start the game
function startGame() {
  spawnPlayer();
  spawnAliens();
  msElapsed = 0;
  gameState = STATE_PLAYING;
}

// Assign player with new Player instance, enable player by default
function spawnPlayer(isEnabled = true) {
  player = new Player({
    isEnabled,
    radius: 15,
    orbitalRadius: 150,
    rotationSpeed: PI / 900,
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

function drawTimeElapsed() {
  const secondElapsed = (msElapsed / 1000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  textFont(scientificaFont);
  textAlign('left', 'top');
  fill(COLOR_WHITE);

  textSize(24);
  text(secondElapsed, 10, 10);
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
function drawCutScene({ title, subtitle, startGameOn }) {
  textFont(scientificaFont);
  textAlign('center', 'center');
  fill(COLOR_WHITE);

  textSize(42);
  text(title, width / 2, height / 2);

  textSize(18);
  text(subtitle, width / 2, height / 2 + 200);

  if (startGameOn()) {
    startGame();
  }
}
