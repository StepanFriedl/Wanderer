'use strict'

import { Character } from "./character_class"
import { Field } from "./field_class";
import { Game } from "./game_class";

export class Boss extends Character {

  constructor(field: Field, diceRoll: number, level: number) {
    let hp: number = 2 * level * diceRoll + diceRoll;
    let dp: number = (level / 2) * diceRoll + (diceRoll / 2)
    let sp: number = level * diceRoll + level;
    super(hp, dp, sp, field);
  }
  public monsterBattle(position: number, heroPosition: number): void {
    if (position === heroPosition && this.getHp()>0) {
      console.log("Boss fights hero.");
      this.writeEnemyStatusText();
    } else { }
  }
  public writeEnemyStatusText(): void {
    const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const xPosition: number = 510;
    const yPosition: number = 30;
    const spacing: number = 20;
    
    ctx.clearRect(501,0, 99,400);
    ctx.font = "20px Arial"
    ctx.fillText("Boss", xPosition, yPosition);
    ctx.font = "15px Arial"
    ctx.fillText("HP:   " + super.getHp() + " / " + super.getMaxHp(), xPosition, yPosition + spacing * 1.5);
    ctx.fillText("DP:   " + super.getDp() + " / " + super.getMaxDp(), xPosition, yPosition + spacing * 2.5);
    ctx.fillText("AP    " + super.getAp() + " / " + super.getMaxAp(), xPosition, yPosition + spacing * 3.5);
  }
  public drawSelf(): void {
    const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const boss = document.getElementById('boss') as HTMLImageElement;
    let x: number = 0;
    let y: number = 0;
    if (super.getPosition() < 10) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 0;
    } else if (super.getPosition() < 20) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 40;
    } else if (super.getPosition() < 30) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 80;
    } else if (super.getPosition() < 40) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 120;
    } else if (super.getPosition() < 50) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 160;
    } else if (super.getPosition() < 60) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 200;
    } else if (super.getPosition() < 70) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 240;
    } else if (super.getPosition() < 80) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 280;
    } else if (super.getPosition() < 90) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 320;
    } else if (super.getPosition() < 100) {
      x = super.getPosition() % 10 * 40 + 100;
      y = 360;
    } else {
      throw "Cannot draw, cause position is out of range."
    }
    ctx.drawImage(boss, x, y, 40, 40)
  }
  public iM(): string {
    return "boss";
  }
}