'use strict'

import { Field } from "./field_class";
import { getRandomPosition } from "./get_random_position_function";
import { Game } from "./game_class";

export class Character {
  private hp: number;
  private hpMax: number;
  private dp: number;
  private dpMax: number;
  private ap: number;
  private apMax: number;
  private isAlive: boolean = true;
  private position: number;
  private level: number = 1;

  constructor(hp: number, dp: number, ap: number, field: Field) {
    this.hp = hp;
    this.hpMax = hp;
    this.dp = dp;
    this.dpMax = dp;
    this.ap = ap;
    this.apMax = ap;

    this.position = getRandomPosition(field);
  }
  public getHp(): number {
    return this.hp
  }
  public getDp(): number {
    return this.dp
  }
  public getAp(): number {
    return this.ap
  }
  public getPosition(): number {
    return this.position;
  }
  public setPositionUp(): void {
    this.position -= 10;
  }
  public setPositionDown(): void {
    this.position += 10;
  }
  public setPositionLeft(): void {
    this.position--;
  }
  public setPositionRight(): void {
    this.position++;
  }
  public moveRight(field: Field, game?: Game): void {
    const possibility: boolean = field.getTiles()[this.position + 1].isThrough();
    if (this.position % 10 === 9) {
    } else if (possibility) {
      this.position += 1;
    } else { }
  }
  public moveLeft(field: Field, game?: Game): void {
    if (this.position > 0) {
      const possibility: boolean = field.getTiles()[this.position - 1].isThrough();
      if (this.position % 10 === 0) {
      } else if (possibility) {
        this.position -= 1;
      } else { }
    }
  }
  public moveUp(field: Field, game?: Game): void {
    if (this.position > 9) {
      const possibility: boolean = field.getTiles()[this.position - 10].isThrough();
      if (this.position < 10) {
      } else if (possibility) {
        this.position -= 10;
      } else { }
    }
  }
  public moveDown(field: Field, game?: Game): void {
    if (this.position < 90) {
      const possibility: boolean = field.getTiles()[this.position + 10].isThrough();
      if (this.position >= 90) {
      } else if (possibility) {
        this.position += 10;
      } else { }
    }
  }
  public moveRandom(field: Field): void {
    let tempBool: boolean = false;
    do {
      let directionIndex: number = Math.ceil(Math.random() * 4);
      if (directionIndex <= 1 && this.position % 10 !== 9) { //right   

        if (field.getTiles()[this.position + 1].isThrough()) {
          tempBool = true;
          this.moveRight(field);
        } else { }
      } else if (directionIndex <= 2 && this.position % 10 !== 0) { //left
        if (field.getTiles()[this.position - 1].isThrough()) {
          tempBool = true;
          this.moveLeft(field);
        } else { }
      } else if (directionIndex <= 3 && this.position > 9) { //up
        if (field.getTiles()[this.position - 10].isThrough()) {
          tempBool = true;
          this.moveUp(field);
        } else { }
      } else if (directionIndex <= 4 && this.position < 90) { //down
        if (field.getTiles()[this.position + 10].isThrough()) {
          tempBool = true;
          this.moveDown(field);
        } else { }
      } else {      }
    } while (tempBool === false)
  }
}


