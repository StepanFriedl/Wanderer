'use strict'

import { Character } from "./character_class"
import { Field } from "./field_class";
import { Game } from "./game_class";

export class Hero extends Character {
  constructor(field: Field, diceRoll: number) {
    let hp: number = 20 + 3 * diceRoll;
    let dp: number = 2 * diceRoll;
    let sp: number = 5 + diceRoll;
    super(hp, dp, sp, field);
  }
  public moveLeft(field: Field, game?: Game): void {
    if (super.getPosition() > 0) {
      const possibility: boolean = field.getTiles()[super.getPosition() - 1].isThrough();
      if (super.getPosition() % 10 === 0) {
      } else if (possibility) {
        super.setPositionLeft();
        game.makeRound();
      } else { }
    } else { }
  }
  public moveRight(field: Field, game?: Game): void {
    const possibility: boolean = field.getTiles()[super.getPosition() + 1].isThrough();
    if (super.getPosition() % 10 === 9) { } else if (possibility) {
      super.setPositionRight();
      game.makeRound();
    } else { }
  }
  public moveDown(field: Field, game?: Game): void {
    if (super.getPosition() < 90) {
      const possibility: boolean = field.getTiles()[super.getPosition() + 10].isThrough();
      if (super.getPosition() >= 90) { } else if (possibility) {
        super.setPositionDown();
        game.makeRound();
      } else { }
    }
  }
  public moveUp(field: Field, game?: Game): void {
    if (super.getPosition() > 9) {
      const possibility: boolean = field.getTiles()[super.getPosition() - 10].isThrough();
      if (super.getPosition() < 10) { } else if (possibility) {
        super.setPositionUp();
        game.makeRound();
      } else { }
    }
  }
  public drawSelf(direction: string): void {
    const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const heroUp = document.getElementById('hero-up') as HTMLImageElement;
    const heroRight = document.getElementById('hero-right') as HTMLImageElement;
    const heroDown = document.getElementById('hero-down') as HTMLImageElement;
    const heroLeft = document.getElementById('hero-left') as HTMLImageElement;
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
    if (direction === "right") {
      ctx.drawImage(heroRight, x, y, 40, 40)
    } else if (direction === "left") {
      ctx.drawImage(heroLeft, x, y, 40, 40)
    } else if (direction === "down") {
      ctx.drawImage(heroDown, x, y, 40, 40)
    } else if (direction === "up") {
      ctx.drawImage(heroUp, x, y, 40, 40)
    } else {
      throw "wrong direction input"
    }
  }

}