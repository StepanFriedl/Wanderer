'use strict'

import { Field } from "./field_class";

export function getRandomPosition(field: Field): number {
  let tempNumber: number = 0;
  do {
    tempNumber = Math.floor(Math.random() * 99)
  } while (field.getPositionFreedom(tempNumber) !== true)
  return tempNumber
}
