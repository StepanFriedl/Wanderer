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
    let d6: number = diceRoll();
    const myHero: Hero = new Hero((20 + 3 * d6), (2 * d6), (5 + d6), myField);
    this.hero = myHero;
    this.level = 1;
    const myBoss: Boss = new Boss(100,100,100,myField)
    this.boss = myBoss ;
  }
}