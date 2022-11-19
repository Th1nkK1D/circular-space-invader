# Circular Space Invader

**WORK IN PROGRESS!**

Space invader, but with circular orbit. Built with vanilla [p5.js](https://p5js.org) from scratch.

[Play now](https://th1nkk1d.github.io/circular-space-invader) or view in [p5.js Web Editor](https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c)

## Game mechanics deviation

- **Player and aliens are moving in circular orbit.** This will make control a bit more challenging because each bullet will have 2 chances to hit the player.
- **Player have limit bullet capacity, which will be refilled overtime.** This mechanics add variation to the game play. Player can come up with severals bullet stratgies.
- **No score count, either kill all the aliens (win) or got killed (lost).** I want to make the game goal simple so the player just need to focus on shooting and evading.

## File structure

- **index.html** - Entrypoint which import all JS file
- **style.css** Global CSS stylesheet
- **sketch.js** p5.js entry point with load and setup function
- **constants.js** Global constants including key code and color
- **/models** Contain JS classes representing game object
- **/fonts** Contain font files
- **/sounds** Contain audio files

## Graphics

I use classes to represent object in the game

- **`PolarObject`** provide polar coordinate mechanic (more suitable for orbital movement) using p5.js's `rotate` and `translate` function. It will be converted to cartesian coordinate for circular collision detection. Inherited by all other graphic classes.
  - **`Figher`** having body, can move in orbit and can fire bullet. `Fighter` have following subclasses:
    - **`Player`** Draw spaceship as a body. Use keybord input to move and fire.
    - **`Alien`** Draw alien as a body, move at constant speed, and fire randomly.
  - **`Particle`** having body, move from a specific point with constant speed. Dispose itself when reach some distance. `Particle` have following subclass:
    - **`Bullet`** Can detect collision with fighter.
      - **`PlayerBullet`** Draw player's bullet shape as a body.
      - **`AlienBullet`** Draw alien's bullet shape as a body.
    - **`Debris`** Draw debris shape as a body. (Spawn when a `Fighter` is destroyed)

All shape are drawn in p5.js without loading any picture. [Scientifica font](https://github.com/NerdyPepper/scientifica) is used to render text.

[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is used for batch animation instead of array. Set member can be reference by value (which is game object instance, in my case) instead of index, allowing me to remove item from set directly without looping through array.

## Sounds

There are sound effects in the foreground and music in a background. All sound are taken from [freesound.org](https://freesound.org)

- **Foreground audio**
  - `laserSound` ([source](https://freesound.org/people/kafokafo/sounds/128349/)) with frequency randomization
  - `hitEnermySound` ([source](https://freesound.org/people/InspectorJ/sounds/411642/)) with frequency randomization and p5's `reverb` effect to improve space aesthetic
  - `hitPlayerSound` ([source](https://freesound.org/people/mitchelk/sounds/136765/))
- **Background audio**
  - `winningSound` ([source](https://freesound.org/people/Tuudurt/sounds/275104/)) short soundtrack when player win the game
  - `bgMusic` ([source](https://freesound.org/people/eardeer/sounds/401613/)) loop music when game is playing

I added `pan` effect on foreground sound, relative to position of that sound origin on the screen, to make the game sound more dynamic.
