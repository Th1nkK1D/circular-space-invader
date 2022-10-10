# Circular Space Invader
**WORK IN PROGRESS!**

Space invader, but with circular orbit. Built with vanilla [p5.js](https://p5js.org) from scratch.

[Play now](https://th1nkk1d.github.io/circular-space-invader) or view in [p5.js Web Editor](https://editor.p5js.org/Th1nkK1D/sketches/Xv7vjo71c)

## Game mechanics deviation
- Player and aliens are moving in circular orbit
- Player have limit bullet capacity, which will be refilled overtime
- No score count, either kill all the aliens (win) or got killed (lose)

## File structure
- **index.html** - Entrypoint which import all JS file
- **style.css** Global CSS stylesheet
- **sketch.js** p5.js entry point with load and setup function
- **constants.js** Global constants including key code and color
- **/models** Contain JS classes representing game object
- **/fonts** Contain font files


## Graphic part explanation

I use classes to represent object in the game
- **`Figher`** having body, can move in orbit and can fire bullet. `Fighter` have following subclasses:
  - **`Player`** Draw spaceship as a body. Use keybord input to move and fire.
  - **`Alien`** Draw alien as a body, move at constant speed, and fire randomly.
- **`Particle`** having body, move from a specific point with constant speed. Dispose itself when reach some distance. `Particle` have following subclass:
  - **`Bullet`** Can detect collision with fighter.
    - **`PlayerBullet`** Draw player's bullet shape as a body.
    - **`AlienBullet`** Draw alien's bullet shape as a body.
  - **`Debris`** Draw debris shape as a body. (Spawn when  a `Fighter` is destroyed)

All shape are drawn in p5.js without loading any picture. [Scientifica font](https://github.com/NerdyPepper/scientifica) is used to render text.

For orbital movement, polar coordinate is used with p5.js's `rotate` and `translate` function. It will be converted to catesian coordinate for circular collision detection.

[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is used for batch animation instead of array. Set member can be reference by value (which is game object instance, in my case) instead of index, allowing me to remove item from set directly without looping through array. 
