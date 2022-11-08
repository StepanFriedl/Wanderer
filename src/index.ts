'use strict';

import { diceRoll } from "./diceRoll function";
import { Game } from "./game_class";

// Acquire the rendering context
const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const floor = document.getElementById('floor') as HTMLImageElement;
const wall = document.getElementById('wall') as HTMLImageElement;
const heroUp = document.getElementById('hero-up') as HTMLImageElement;
const heroRight = document.getElementById('hero-right') as HTMLImageElement;
const heroDown = document.getElementById('hero-down') as HTMLImageElement;
const heroLeft = document.getElementById('hero-left') as HTMLImageElement;
const diceThrow = diceRoll();
const fields: number[][] = [
  [4, 14, 16, 18, 19, 22, 23, 24, 26, 28, 29, 36, 41, 42, 43, 44, 46, 47, 48, 49, 52, 54, 62, 64, 66, 67, 69, 76, 77, 79, 82, 83, 84, 89, 94, 96, 97],
  [2, 10, 12, 14, 15, 17, 18, 28, 30, 31, 32, 34, 35, 37, 38, 44, 51, 52, 54, 55, 56, 58, 59, 60, 66, 72, 74, 75, 76, 78, 80, 82, 84, 96, 97, 99],
  [11, 12, 13, 14, 16, 18, 21, 24, 31, 33, 34, 37, 39, 41, 46, 55, 58, 61, 63, 64, 65, 67, 71, 79, 81, 83, 84, 85, 88],
  [11, 12, 13, 15, 17, 21, 23, 25, 26, 27, 42, 43, 44, 46, 47, 48, 54, 56, 62, 63, 64, 66, 67, 68, 81, 82, 83, 84, 85, 86, 87, 88],
  [7, 11, 12, 13, 14, 15, 19, 25, 27, 30, 31, 32, 33, 35, 37, 47, 51, 52, 54, 56, 57, 70, 71, 72, 74, 76, 77, 78, 82, 84, 86, 90, 94, 96],
  [3, 7, 11, 13, 15, 17, 19, 21, 25, 29, 31, 33, 35, 37, 39, 43, 47, 53, 57, 61, 63, 65, 67, 69, 71, 75, 79, 81, 83, 85, 87, 89, 93, 97],
  [10, 11, 12, 13, 16, 17, 18, 23, 24, 25, 26, 31, 33, 38, 41, 43, 45, 47, 48, 51, 61, 62, 63, 64, 65, 66, 67, 68, 69, 81, 83, 85, 87, 89]]
const myGame: Game = new Game(fields);
// This function runs after the images are loaded
window.onload = () => {
  myGame.drawHero();
  myGame.drawMonsters();
  myGame.drawBoss();
  myGame.writeHeroStatusText();
};
// Function to handle the key press events
function onKeyPress(event: any) {
  // Handle arrow keys
  switch (event.keyCode) {
    //spacebar
    case 32:
      if (myGame.getHero().getHp() > 0) {
        let ifBoss: boolean = false;
        let ifMonster: boolean = false;
        let monsterIndex: number = 0;
        //boss
        if (myGame.getHero().getPosition() === myGame.getBoss().getPosition()) {
          myGame.getHero().strike(myGame.getBoss())
          myGame.getBoss().writeEnemyStatusText();
          ifBoss = true;
          myGame.setBossKilled();
        }
        //monsters
        for (let i: number = 0; i < myGame.getMonsters().length; i++) {
          if (myGame.getHero().getPosition() === myGame.getMonsters()[i].getPosition()) {
            do {
              myGame.getHero().strike(myGame.getMonsters()[i])
              myGame.getMonsters()[i].writeEnemyStatusText();
            } while (myGame.getMonsters()[i].getHp() > 0 && myGame.getHero().getHp() > 0)
            ifMonster = true;
            monsterIndex = i;
          }
        }
        myGame.clearTheField();
        myGame.nextArea(fields);
        console.log(myGame.keys());
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        myGame.drawField();
        myGame.drawBoss()
        myGame.drawHero(myGame.getHero().getLookingDirection());
        myGame.drawMonsters();
        myGame.writeHeroStatusText();

      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.font = "80px Arial"
        ctx.fillStyle = "red"
        ctx.fillText("You are dead", 55, 200);
      }
      break;
    //left
    case 37:
      if (myGame.getHero().getHp() > 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        myGame.getHero().heroMoveLeft(myGame.getField(), myGame);
        myGame.drawField();
        myGame.drawBoss()
        myGame.drawHero(myGame.getHero().getLookingDirection());
        myGame.drawMonsters();
        myGame.writeHeroStatusText();

      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.font = "80px Arial"
        ctx.fillStyle = "red"
        ctx.fillText("You are dead", 55, 200);
      }
      break;
    //up
    case 38:
      if (myGame.getHero().getHp() > 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        myGame.getHero().heroMoveUp(myGame.getField(), myGame);
        myGame.drawField();
        myGame.drawBoss()
        myGame.drawHero(myGame.getHero().getLookingDirection());
        myGame.drawMonsters();
        myGame.writeHeroStatusText();

      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.font = "80px Arial"
        ctx.fillStyle = "red"
        ctx.fillText("You are dead", 55, 200);
      }
      break;
    //right
    case 39:
      if (myGame.getHero().getHp() > 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        myGame.getHero().heroMoveRight(myGame.getField(), myGame);
        myGame.drawField();
        myGame.drawBoss()
        myGame.drawHero(myGame.getHero().getLookingDirection());
        myGame.drawMonsters();
        myGame.writeHeroStatusText();

      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.font = "80px Arial"
        ctx.fillStyle = "red"
        ctx.fillText("You are dead", 55, 200);
      }
      break;
    //down
    case 40:
      if (myGame.getHero().getHp() > 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        myGame.getHero().heroMoveDown(myGame.getField(), myGame);
        myGame.drawField();
        myGame.drawBoss()
        myGame.drawHero(myGame.getHero().getLookingDirection());
        myGame.drawMonsters();
        myGame.writeHeroStatusText();

      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.font = "80px Arial"
        ctx.fillStyle = "red"
        ctx.fillText("You are dead", 55, 200);
      }
      break;
  }
}

// Listen on pressing the keys
document.body.addEventListener('keydown', onKeyPress);