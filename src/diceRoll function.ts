'use strict';

export function diceRoll(): number {
  const num: number = Math.ceil(Math.random() * 6);
  return num;
}
