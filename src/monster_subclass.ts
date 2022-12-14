'use strict'

import { Character } from "./character_class"
import { Field } from "./field_class";

export class Monster extends Character {
  private hasAKey: boolean;

  constructor(field: Field, diceRoll: number, level: number) {
    let hp: number = 2 * level * diceRoll;
    let dp: number = (level / 2) * diceRoll;
    let sp: number = level * diceRoll;
    super(hp, dp, sp, field);
    this.hasAKey = false
  }
  public monsterBattle(position: number, heroPosition: number): void {
    if (position === heroPosition && this.getHp() > 0) {
      console.log("Monster fights hero.");
    } else { }
  }
  public giveKey(): void {
    this.hasAKey = true;
  }
  public hasKey(): boolean {
    return this.hasAKey;
  }
  public writeEnemyStatusText(): void {
    const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const xPosition: number = 510;
    const yPosition: number = 30;
    const spacing: number = 20;
    ctx.clearRect(501, 0, 99, 400);
    ctx.font = "20px Arial"
    ctx.fillStyle = "blue"
    ctx.fillText("Monster", xPosition, yPosition);
    ctx.font = "15px Arial"
    ctx.fillText("HP:   " + super.getHp() + " / " + super.getMaxHp(), xPosition, yPosition + spacing * 1.5);
    ctx.fillText("DP:   " + super.getDp() + " / " + super.getMaxDp(), xPosition, yPosition + spacing * 2.5);
    ctx.fillText("AP    " + super.getAp() + " / " + super.getMaxAp(), xPosition, yPosition + spacing * 3.5);
  }
  public drawSelf(): void {
    const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const skeleton = document.getElementById('skeleton') as HTMLImageElement;
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
    if (this.hasAKey) {
      ctx.drawImage(skeleton, x, y, 40, 40)
    } else {
      ctx.drawImage(skeleton, x + 2, y + 2, 36, 35)
    }
  }
  public iM(): string {
    return "monster";
  }
}