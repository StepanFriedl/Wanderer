'use strict'



export class Tile {
  private isEmpty: boolean = false;
  constructor() {}

  public isThrough(): boolean {
    return this.isEmpty;
  }
  public setEmptyness(value: boolean) {
    this.isEmpty = value;
  }
}