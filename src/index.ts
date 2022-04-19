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
const myField: Field = new Field([4, 14, 16, 18, 19, 22, 23, 24, 26, 28, 29, 36, 41, 42, 43, 44, 46, 47, 48, 49, 52, 54, 62, 64, 66, 67, 69, 76, 77, 79, 82, 83, 84, 89, 94, 96, 97]);

// This function runs after the images are loaded
window.onload = () => {
  myField.drawField();
  myHero.drawSelf('down');
};


// Function to handle the key press events
function onKeyPress(event: any) {
  // Handle arrow keys
  switch (event.keyCode) {
    //left
    case 37:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myField.drawField();
      myHero.moveLeft(myField);
      myHero.drawSelf("left");
      break;
    //up
    case 38:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myField.drawField();
      myHero.moveUp(myField);
      myHero.drawSelf("up");
      break;
    //right
    case 39:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myField.drawField();
      myHero.moveRight(myField);
      myHero.drawSelf("right");
      break;
    //down
    case 40:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myField.drawField();
      myHero.moveDown(myField);
      myHero.drawSelf("down");
      break;
  }
}

// Listen on pressing the keys
document.body.addEventListener('keydown', onKeyPress);