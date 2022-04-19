'use strict';

import { diceRoll } from "./diceRoll function";
import { Field } from "./field_class";
import { Hero } from "./hero_subclass";
import { Tile } from "./tiles_class";

// Acquire the rendering context
const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const floor = document.getElementById('floor') as HTMLImageElement;
const wall = document.getElementById('wall') as HTMLImageElement;
const heroUp = document.getElementById('hero-up') as HTMLImageElement;
const heroRight = document.getElementById('hero-right') as HTMLImageElement;
const heroDown = document.getElementById('hero-down') as HTMLImageElement;
const heroLeft = document.getElementById('hero-left') as HTMLImageElement;

let myHero: Hero = new Hero(100, 100, 100);
const myField: Field = new Field([4,14,16,18,19,22,23,24,26,28,29,36,41,42,43,44,46,47,48,49,52,54,62,64,66,67,69,76,77,79,82,83,84,89,94,96,97]);
const levelOne: number[] = [3, 0, 3, 1, 5, 1, 7, 1, 8, 1, 1, 2, 2, 2, 3, 2, 5, 2, 7, 2, 8, 2, 5, 3, 0, 4, 1, 4, 2, 4, 3, 4, 5, 4, 6, 4, 7, 4, 8, 4, 1, 5, 3, 5, 1, 6, 3, 6, 5, 6, 6, 6, 8, 6, 5, 7, 6, 7, 8, 7, 1, 8, 2, 8, 3, 8, 8, 8, 3, 9, 5, 9, 6, 9]

// This function runs after the images are loaded
window.onload = () => {
  myField.drawField();
  // Drawing a floor tile
  for (let i: number = 0; i < 10; i++) {
    for (let j: number = 0; j < 10; j++) {
      let x: number = 100 + i * 40;
      let y: number = 0 + j * 40;
      ctx.drawImage(floor, x, y, 40, 40);
    }
  }
  // Drawing a wall tile
  for (let j: number = 0; j < (levelOne.length / 2); j++) {
    let x: number = levelOne[(0 + 2 * j)] * 40 + 100;
    let y: number = levelOne[(1 + 2 * j)] * 40;
    ctx.drawImage(wall, x, y, 40, 40)
  }
  ctx.drawImage(heroDown, 100, 0, 40, 40);

};

/* You only have to change the argument string in document.getElementById('floor')
 *
 * Possible images:
 * - floor
 * - wall
 * - hero-up
 * - hero-right
 * - hero-down
 * - hero-left
 * - boss
 * - skeleton
 */



// Function to handle the key press events
function onKeyPress(event: any) {
  // Handle arrow keys
  switch (event.keyCode) {
    //left
    case 37:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myField.drawField();
      myHero.moveLeft();
      const xx: number = myHero.getPosition()[0];
      const yy: number = myHero.getPosition()[1];
      ctx.drawImage(heroLeft, xx, yy, 40, 40);
      break;
    //up
    case 38:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myField.drawField();
      myHero.moveUp();
      const xxx: number = myHero.getPosition()[0];
      const yyy: number = myHero.getPosition()[1];
      ctx.drawImage(heroUp, xxx, yyy, 40, 40);
      break;
    //right
    case 39:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myField.drawField();
      myHero.moveRight();
      const x: number = myHero.getPosition()[0];
      const y: number = myHero.getPosition()[1];
      ctx.drawImage(heroRight, x, y, 40, 40);
      break;
    //down
    case 40:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myField.drawField();
      myHero.moveDown();
      const xxxx: number = myHero.getPosition()[0];
      const yyyy: number = myHero.getPosition()[1];
      ctx.drawImage(heroDown, xxxx, yyyy, 40, 40);
      break;
  }
}

// Listen on pressing the keys
document.body.addEventListener('keydown', onKeyPress);