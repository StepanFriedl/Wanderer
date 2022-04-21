'use strict'

import { Field } from "./field_class";
import { getRandomPosition } from "./get_random_position_function";
import { Game } from "./game_class";
import { diceRoll } from "./diceRoll function";

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
  public setPosition(value: number) {
    this.position = value;
  }
  public levelUp(): void {
    const diceA: number = diceRoll();
    this.hp += diceA;
    this.ap += diceA;
    this.dp += diceA;
    this.apMax += diceA;
    this.dpMax += diceA;
    this.hpMax += diceA;
  }
  public die(): void {
    this.isAlive = false;
  }
  public areYouAlive(): boolean {
    return this.isAlive
  }
  public setHp(value: number): void {
    this.hp = value;
  }
  public writeEnemyStatusText(): void { }
  public monsterBattle(position: number, heroPosition: number): void { }
  public battle(position: number, game: Game) { }
  public iM(): string {
    return "character";
  }
  public getDpValue(): number {
    return this.dp;
  }
  public strike(enemy: Character) {
    if (enemy.getHp() > 0 && this.getHp() > 0) {

      const dice: number = diceRoll();
      const strikeValue: number = dice * 2 + this.getAp();
      if (strikeValue > enemy.getDp()) {
        console.log("Striking " + enemy.iM() + ".");
        enemy.getStrike(strikeValue);
        enemy.counterStrike(this);
      } else {
        console.log(this.iM() + " failed to strike.");
        enemy.counterStrike(this)
      }
    }
  }
  public counterStrike(enemy: Character) {
    if (enemy.getHp() > 0 && this.getHp() > 0) {
      const dice: number = diceRoll()
      const strikeValue: number = 2 * dice + this.getAp();
      if (strikeValue > enemy.getDp()) {
        console.log(this.iM() + " is counterstriking.");
        enemy.getStrike(strikeValue);
      } else {
        console.log(this.iM() + " failed to counterstrike.");
      }
    }
  }
  public attackTile(game: Game, targetPosition: number): void {
  }
  public getHp(): number {
    return this.hp
  }
  public getMaxHp(): number {
    return this.hpMax
  }
  public getDp(): number {
    return this.dp
  }
  public getMaxDp(): number {
    return this.dpMax
  }
  public getAp(): number {
    return this.ap
  }
  public getMaxAp(): number {
    return this.apMax
  }
  public getStrike(strikeValue: number): void {
    this.hp -= strikeValue - this.dp;
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
        this.position--;
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
  public drawSelf(direction: string): void { }
  public moveRandom(field: Field, game: Game): void {
    let tempBool: boolean = false;
    const heroPosition: number = game.getHero().getPosition();
    do {
      let directionIndex: number = Math.ceil(Math.random() * 4);
      if (directionIndex <= 1 && this.position % 10 !== 9) { //right   
        if (field.getTiles()[this.position + 1].isThrough()) {
          tempBool = true;
          this.monsterBattle(this.position + 1, heroPosition);
          if (game.getHero().getPosition() === this.position + 1) {
            do {
              this.strike(game.getHero())
            } while (this.getHp() > 0 && game.getHero().getHp() > 0)
          } else { }
          game.clearTheField()
          this.moveRight(field);
        } else { }
      } else if (directionIndex <= 2 && this.position % 10 !== 0) { //left
        if (field.getTiles()[this.position - 1].isThrough()) {
          tempBool = true;
          if (game.getHero().getPosition() === this.position - 1) {
            do {
              this.strike(game.getHero())
            } while (this.getHp() > 0 && game.getHero().getHp() > 0)
          } else { }
          this.monsterBattle(this.position - 1, heroPosition);
          game.clearTheField()
          this.moveLeft(field);
        } else { }
      } else if (directionIndex <= 3 && this.position > 9) { //up
        if (field.getTiles()[this.position - 10].isThrough()) {
          tempBool = true;
          if (game.getHero().getPosition() === this.position - 10) {
            do {
              this.strike(game.getHero())
            } while (this.getHp() > 0 && game.getHero().getHp() > 0)
          } else { }
          this.monsterBattle(this.position - 10, heroPosition);
          game.clearTheField()
          this.moveUp(field);
        } else { }
      } else if (directionIndex <= 4 && this.position < 90) { //down
        if (field.getTiles()[this.position + 10].isThrough()) {
          tempBool = true;
          if (game.getHero().getPosition() === this.position + 10) {
            do {
              this.strike(game.getHero())
            } while (this.getHp() > 0 && game.getHero().getHp() > 0)
          } else { }
          this.monsterBattle(this.position + 10, heroPosition);
          game.clearTheField()
          this.moveDown(field);
        } else { }
      } else { }
    } while (tempBool === false)
  }
}


