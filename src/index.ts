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



let diceThrow = diceRoll();
const myGame: Game = new Game();

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
      let ifBoss: boolean = false;
      let ifMonster: boolean = false;
      let monsterIndex: number = 0;
      
      //boss
      if (myGame.getHero().getPosition() === myGame.getBoss().getPosition()) {
        myGame.getHero().strike(myGame.getBoss())
        myGame.getBoss().writeEnemyStatusText();
        ifBoss = true;
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
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myGame.drawField();
      myGame.drawBoss()
      myGame.drawHero(myGame.getHero().getLookingDirection());
      myGame.drawMonsters();
      myGame.writeHeroStatusText();
      if (ifBoss) {/* 
        myGame.getBoss().writeEnemyStatusText(); */
      } else if (ifMonster) {/* 
        myGame.getMonsters()[monsterIndex].writeEnemyStatusText(); */
      }

      break;

    //left
    case 37:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myGame.getHero().heroMoveLeft(myGame.getField(), myGame);
      myGame.drawField();
      myGame.drawBoss()
      myGame.drawHero(myGame.getHero().getLookingDirection());
      myGame.drawMonsters();
      myGame.writeHeroStatusText();
      break;

    //up
    case 38:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myGame.getHero().heroMoveUp(myGame.getField(), myGame);
      myGame.drawField();
      myGame.drawBoss()
      myGame.drawHero(myGame.getHero().getLookingDirection());
      myGame.drawMonsters();
      myGame.writeHeroStatusText();
      break;

    //right
    case 39:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myGame.getHero().heroMoveRight(myGame.getField(), myGame);
      myGame.drawField();
      myGame.drawBoss()
      myGame.drawHero(myGame.getHero().getLookingDirection());
      myGame.drawMonsters();
      myGame.writeHeroStatusText();
      break;

    //down
    case 40:
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      myGame.getHero().heroMoveDown(myGame.getField(), myGame);
      myGame.drawField();
      myGame.drawBoss()
      myGame.drawHero(myGame.getHero().getLookingDirection());
      myGame.drawMonsters();
      myGame.writeHeroStatusText();
      break;
  }
}

// Listen on pressing the keys
document.body.addEventListener('keydown', onKeyPress);