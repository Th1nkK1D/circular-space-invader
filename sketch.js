/* Created by Withee Poositasai
 * p5.js Web Editor - https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c
 * Github repository - https://github.com/Th1nkK1D/circular-space-invader
 * Play on the web - https://th1nkk1d.github.io/circular-space-invader
 */

let player,
  alienSet,
  debrisSet,
  gameState,
  scientificaFont,
  msElapsed,
  laserSound,
  enermyExplosionSound,
  playerExplosionSound,
  emptyBulletSound,
  fullBulletSound,
  winningSound,
  bgMusic,
  bgMusicRate;

// Define orbit layer of aliens
const ALIEN_LAYERS = [
  {
    orbitalRadius: 300,
    amount: 4,
    rotationSpeed: Math.PI / 8000,
  },
  {
    orbitalRadius: 375,
    amount: 5,
    rotationSpeed: -Math.PI / 10000,
  },
  {
    orbitalRadius: 450,
    amount: 6,
    rotationSpeed: Math.PI / 14000,
  },
];

function preload() {
  scientificaFont = loadFont('fonts/scientifica.ttf');
  // Sound from https://freesound.org/people/kafokafo/sounds/128349/
  laserSound = loadSound('sounds/128349__kafokafo__laser.mp3');
  // Sound from https://freesound.org/people/InspectorJ/sounds/411642/
  enermyExplosionSound = loadSound(
    'sounds/411642__inspectorj__pop-high-a-h1.mp3'
  );
  // Sound from https://freesound.org/people/mitchelk/sounds/136765/
  playerExplosionSound = loadSound('sounds/136765__mitchelk__explode001.mp3');
  // Sound from https://freesound.org/people/rnina01/sounds/240717/
  emptyBulletSound = loadSound('sounds/240717__rnina01__empty-bullet.mp3');
  // Sound from https://freesound.org/people/bennychico11/sounds/29543/
  fullBulletSound = loadSound('sounds/29543__bennychico11__wink.mp3');
  // Sound from https://freesound.org/people/Tuudurt/sounds/275104/
  winningSound = loadSound('sounds/275104__tuudurt__piglevelwin2.mp3');
  // Sound from https://freesound.org/people/eardeer/sounds/401613/
  bgMusic = loadSound(
    'sounds/401613__eardeer__cheeserider-loop-155bpm-8bars.mp3'
  );
}

function setup() {
  createCanvas(1000, 1000);

  gameState = STATE_INTRO;
  debrisSet = new Set();

  laserSound.setVolume(0.4);
  enermyExplosionSound.setVolume(0.6);
  playerExplosionSound.setVolume(0.6);
  emptyBulletSound.setVolume(0.15);
  fullBulletSound.setVolume(0.6);
  winningSound.setVolume(0.2);

  const hitEnermyEffect = new p5.Delay();
  hitEnermyEffect.process(enermyExplosionSound, 0.2, 0.5, 1500);

  bgMusic.setVolume(0.1);
  bgMusic.playMode('restart');
  bgMusic.setLoop(true);

  spawnPlayer(false);
}

function draw() {
  background(COLOR_BLACK);

  drawOrbitRings();

  debrisSet.forEach((debris) => debris.draw());

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
        const collidePosition = bullet.checkCollisionWithFighter(alien);

        if (collidePosition) {
          // If bullet collide with alien, delete alien and speed op other aliens
          alienSet.delete(alien);
          alienSet.forEach((otherAlien) => otherAlien.speedUp());

          spawnDebris(collidePosition, bullet.color);

          // Pan hit enermy sound to the alien position, random rate and play
          enermyExplosionSound.pan(alien.getAudioPanFromCoord(collidePosition));
          enermyExplosionSound.rate(random(0.5, 0.9));
          enermyExplosionSound.play();

          // Slowdown and Speedup bg music
          bgMusicRate *= 1.02;
          bgMusic.rate((bgMusicRate * 2) / 3);
          setTimeout(() => {
            bgMusic.rate(bgMusicRate);
          }, 1500);
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
      bgMusic.stop();
      winningSound.play();
    }
  }

  if (gameState === STATE_PLAYING || gameState === STATE_GAMEOVER) {
    // Draw aliens, alien's bullets and check collision with player
    alienSet.forEach((alien) => {
      alien.draw();

      alien.bulletSet.forEach((bullet) => {
        bullet.draw();

        if (gameState !== STATE_GAMEOVER) {
          const collidePosition = bullet.checkCollisionWithFighter(player);

          if (collidePosition) {
            // If alien bullet hits player, game is over
            spawnDebris(collidePosition, bullet.color);
            gameState = STATE_GAMEOVER;

            // Pan hit player sound to player position and play
            playerExplosionSound.pan(
              player.getAudioPanFromCoord(collidePosition)
            );
            playerExplosionSound.play();
            bgMusic.stop();
          }
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

  bgMusicRate = 0.9;
  bgMusic.rate(bgMusicRate);
  bgMusic.play();
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

// Assign player with new Player instance, enable player by default
function spawnPlayer(isEnabled = true) {
  player = new Player({
    isEnabled,
    radius: 15,
    orbitalRadius: 150,
    rotationSpeed: PI / 900,
    bulletSpeed: 0.3,
    bulletRadius: 5,
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
          bulletRadius: 5,
          fireCooldownDurationRange: [5000, 12000],
          initialFireCooldown: random(0, 7000),
        })
      );
    }
  });
}

// Spawn debris and add to debrisSet
function spawnDebris([x, y], color) {
  for (let d = 0; d < random(10, 12); d++) {
    debrisSet.add(
      new Debris({
        radius: random(1, 4),
        origin: [x + width / 2, y + width / 2],
        distance: 0,
        angle: random(0, 2 * PI),
        speed: 0.02,
        color: color,
        distanceToDisposed: random(20, 40),
        dispose: (debris) => debrisSet.delete(debris),
      })
    );
  }
}
