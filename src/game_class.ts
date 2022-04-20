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

  constructor() {
    let myField: Field = new Field([4, 14, 16, 18, 19, 22, 23, 24, 26, 28, 29, 36, 41, 42, 43, 44, 46, 47, 48, 49, 52, 54, 62, 64, 66, 67, 69, 76, 77, 79, 82, 83, 84, 89, 94, 96, 97])
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
    this.drawMonsters();
    this.round = 0;
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
    this.boss.drawSelf();
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
  public returnBoss() {
    return this.boss
  }
  public getField() {
    return this.field
  }
  public returnMonsters() {
    return this.monsters
  }
  public makeRound(): void {
    this.round++;
    if (this.round % 2 === 0) {
      this.boss.moveRandom(this.field)
      for (let i: number = 0; i < this.monsters.length; i++) {
        this.monsters[i].moveRandom(this.field);
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
    ctx.fillText("Hero", xPosition, yPosition);
    ctx.font = "15px Arial"
    ctx.fillText("HP:   " + this.hero.getHp(), xPosition, yPosition + spacing * 1.5);
    ctx.fillText("DP:   " + this.hero.getDp(), xPosition, yPosition + spacing * 2.5);
    ctx.fillText("AP    " + this.hero.getAp(), xPosition, yPosition + spacing * 3.5);
  }
}