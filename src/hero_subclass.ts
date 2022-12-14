'use strict'

import { Character } from "./character_class"
import { Field } from "./field_class";
import { Game } from "./game_class";

export class Hero extends Character {
  lookingDirection: string;

  constructor(field: Field, diceRoll: number) {
    let hp: number = 20 + 3 * diceRoll;
    let dp: number = 2 * diceRoll;
    let sp: number = 5 + diceRoll;
    super(hp, dp, sp, field);
    let lookingDirection: string = "down";
  }
  public changeLookRight(): void {
    this.lookingDirection = "right"
  }
  public changeLookLeft(): void {
    this.lookingDirection = "left"
  }

  public changeLookUp(): void {
    this.lookingDirection = "up"
  }
  public changeLookDown(): void {
    this.lookingDirection = "down"
  }
  public getLookingDirection(): string {
    return this.lookingDirection
  }
  public iM(): string {
    return "hero";
  }
  public nextAreaHp(): void {
    const myMathRandomNumberZeroToTen: number = Math.floor(Math.random() * 10)
    if (myMathRandomNumberZeroToTen < 1) {
      super.setHp(super.getMaxHp())
    } else if (myMathRandomNumberZeroToTen < 5) {
      const maxHp: number = super.getMaxHp()
      const thirdOfMaxHp: number = Math.floor(maxHp / 3)
      const newHp: number = super.getHp() + thirdOfMaxHp;
      if (newHp > maxHp) {
        super.setHp(super.getMaxHp())
      } else {
        super.setHp(newHp);
      }
    } else if (myMathRandomNumberZeroToTen < 10) {
      const maxHp: number = super.getMaxHp()
      const tenthOfMaxHp: number = Math.floor(maxHp / 10)
      const newHp: number = super.getHp() + tenthOfMaxHp;
      if (newHp > maxHp) {
        super.setHp(super.getMaxHp())
      } else {
        super.setHp(newHp);
      }
    } else {
      throw "error in nextArea() function in game class"
    }
  }
  public battle(position: number, game: Game): void {
    if (position === game.getBoss().getPosition()) {
      console.log("Hero fights boss.");
      game.getBoss().writeEnemyStatusText();
    } else { }
    for (let i: number = 0; i < game.getMonsters().length; i++) {
      if (position === game.getMonsters()[i].getPosition()) {
        console.log("Hero fights monster" + i);
        game.getMonsters()[i].writeEnemyStatusText();
      } else { }
    }
  }
  public heroMoveRight(field: Field, game?: Game): void {
    if (super.getPosition() < 99) {
      const possibility: boolean = field.getTiles()[super.getPosition() + 1].isThrough();
      if (super.getPosition() % 10 === 9) { } else if (possibility) {
        this.battle(this.getPosition() + 1, game);
        super.setPositionRight();
        game.makeRound(game);
      } else { }
    } else { }
    this.changeLookRight();
  }
  public heroMoveLeft(field: Field, game?: Game): void {
    if (super.getPosition() > 0) {
      const possibility: boolean = field.getTiles()[super.getPosition() - 1].isThrough();
      if (super.getPosition() % 10 === 0) {
      } else if (possibility) {
        this.battle(this.getPosition() - 1, game);
        super.setPositionLeft();
        game.makeRound(game);
      } else { }
    } else { }
    this.changeLookLeft();
  }
  public heroMoveDown(field: Field, game?: Game): void {
    if (super.getPosition() < 90) {
      const possibility: boolean = field.getTiles()[super.getPosition() + 10].isThrough();
      if (super.getPosition() >= 90) { } else if (possibility) {
        this.battle(this.getPosition() + 10, game);
        super.setPositionDown();
        game.makeRound(game);
      } else { }
    }
    this.changeLookDown();
  }
  public heroMoveUp(field: Field, game?: Game): void {
    if (super.getPosition() > 9) {
      const possibility: boolean = field.getTiles()[super.getPosition() - 10].isThrough();
      if (super.getPosition() < 10) { } else if (possibility) {

        this.battle(this.getPosition() - 10, game);
        super.setPositionUp();
        game.makeRound(game);
      } else { }
    }
    this.changeLookUp();
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