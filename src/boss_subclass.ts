'use strict'

import { Character } from "./character_class"

export class Boss extends Character {

  constructor(hp: number, dp: number, ap: number) {
    super(hp, dp, ap);
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
    ctx.drawImage(boss,x,y,40,40)
  }
  
}