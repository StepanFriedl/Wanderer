'use strict'

import { Character } from "./character_class"

export class Monster extends Character {
  
  constructor(hp: number, dp: number, ap: number) {
    super(hp, dp, ap);
  }

}