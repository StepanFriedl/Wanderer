'use strict'

import { Boss } from "./boss_subclass";
import { diceRoll } from "./diceRoll function";
import { Field } from "./field_class"
import { Hero } from "./hero_subclass";
import { Monster } from "./monster_subclass";

export class Game {
  private field: Field;
  private hero: Hero;
  private boss: Boss;
  private monsters: Monster[];
  private level: number;
  private round: number;
  private bossKilled: boolean;
  private keyTaken: boolean;

  constructor(fieldArray: number[][]) {

    let myField: Field = new Field(fieldArray[0])
    this.field = myField;
    this.field.drawField();
    let d6: number = diceRoll();
    const myHero: Hero = new Hero(myField, d6);
    this.hero = myHero;
    this.level = 1;
    const myBoss: Boss = new Boss(myField, d6, this.level)
    this.boss = myBoss;
    this.boss.drawSelf();
    this.hero.drawSelf("down");
    this.spawnMonsters(d6);
    this.giveKeyToSomeRandomMonster();
    this.round = 0;
    this.keyTaken = false;
    this.bossKilled = false
  }
  public setBossKilled():void {
    this.bossKilled = true;
  }
  public setKeyTaken(): void {
    this.keyTaken = true;
  }
  public keys(): string {
    return "key: " + this.keyTaken + "\r\nboss: " + this.bossKilled;
  }
  public nextArea(fieldArray: number[][]): void {
    if (this.bossKilled && this.keyTaken) {      
    const d6: number = diceRoll();
      let myField: Field = new Field(fieldArray[this.level])
      this.level++
      const myBoss: Boss = new Boss(myField, d6, this.level)
      this.field = myField;
      this.boss = myBoss;
      this.spawnMonsters(d6);
      this.giveKeyToSomeRandomMonster();
      this.hero.nextAreaHp()
      this.round = 0;
      this.bossKilled = false;
      this.keyTaken = false;
      console.log("Entering new area.");
      
    }
  }
  private giveKeyToSomeRandomMonster(): void {
    const mathRandom: number = Math.floor(Math.random() * this.monsters.length)
    this.monsters[mathRandom].giveKey();
  }
  public getLevel(): number {
    return this.level;
  }
  public spawnMonsters(diceRoll: number): void {
    this.monsters = [];
    const numberOfMonstersTotal: number = 3 + diceRoll / 2;
    for (let i: number = 0; i < numberOfMonstersTotal; i++) {
      let someMonster: Monster = new Monster(this.field, diceRoll, this.level);
      this.monsters.push(someMonster)
    }
  }
  public drawField(): void {
    this.field.drawField();
  }
  public drawBoss(): void {
    if (this.getBoss().areYouAlive()) {
      this.boss.drawSelf();
    } else {
      console.log("boss is dead");

    }
  }
  public drawMonsters(): void {
    for (let i: number = 0; i < this.monsters.length; i++) {
      this.monsters[i].drawSelf();
    }
  }
  public drawHero(direction: string = "down"): void {
    this.hero.drawSelf(direction)
  }
  public getBoss() {
    return this.boss;
  }
  public getHero() {
    return this.hero;
  }
  public getMonsters(): Monster[] {
    return this.monsters
  }
  public returnBoss() {
    return this.boss
  }
  public getField() {
    return this.field
  }
  public returnMonsters() {
    return this.monsters
  }
  public makeRound(game: Game): void {
    this.round++;
    if (this.round % 2 === 0) {
      this.boss.moveRandom(this.field, game)
      for (let i: number = 0; i < this.monsters.length; i++) {
        this.monsters[i].moveRandom(this.field, game);
      }
    }
  }
  public writeHeroStatusText(): void {
    const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const xPosition: number = 10;
    const yPosition: number = 30;
    const spacing: number = 20;
    ctx.font = "20px Arial"
    ctx.fillStyle = "blue"
    ctx.fillText("Hero", xPosition, yPosition);
    ctx.font = "15px Arial"
    ctx.fillText("HP:   " + this.hero.getHp() + " / " + this.hero.getMaxHp(), xPosition, yPosition + spacing * 1.5);
    ctx.fillText("DP:   " + this.hero.getDp() + " / " + this.hero.getMaxDp(), xPosition, yPosition + spacing * 2.5);
    ctx.fillText("AP    " + this.hero.getAp() + " / " + this.hero.getMaxAp(), xPosition, yPosition + spacing * 3.5);
    if (this.keyTaken) {
      ctx.fillStyle = "green"
      ctx.fillText("Got key.", xPosition, yPosition + spacing * 5);
    } else {
      ctx.fillStyle = "red"
      ctx.fillText("Key missing.", xPosition, yPosition + spacing * 5);

    }
  }
  public clearTheField(): void {
    if (this.getBoss().getHp() <= 0) {
      this.boss.die();
      this.bossKilled = true;
      this.hero.levelUp()
    } else { }
    for (let i: number = this.getMonsters().length - 1; i >= 0; i--) {
      if (this.getMonsters()[i].getHp() <= 0) {
        if (this.getMonsters()[i].hasKey()) {
          this.keyTaken = true;
        } else {}
        this.monsters.splice(i, 1)
        this.hero.levelUp()
      }
    }
  }
}