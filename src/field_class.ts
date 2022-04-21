'use strict'

import { Tile } from "./tiles_class";
import { Floor } from "./floor_subclass";
import { Wall } from "./wall_subclass";

export class Field {
  private tiles: Tile[];
  private walls: number[];

  constructor(walls: number[]) {
    const myFloor: Floor = new Floor();
    this.tiles = [];
    for (let i: number = 0; i < 100; i++) {
      this.tiles.push(myFloor);
    }
    const myWall: Wall = new Wall();
    for (let i: number = 0; i < walls.length; i++) {
      this.tiles.splice(walls[i] - 1, 1, myWall);
    }
  }
  public drawField(): void {
    const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const floor = document.getElementById('floor') as HTMLImageElement;
    const wall = document.getElementById('wall') as HTMLImageElement;

    for (let i: number = 0; i < 10; i++) {
      for (let j: number = 0; j < 10; j++) {
        this.tiles[i * 10 + j].draw(100 + j * 40, i * 40);
      }
    }
  }
  public getTiles(): Tile[] {
    return this.tiles;
  }
  public getPositionFreedom(position: number): boolean {
    return this.tiles[position].isThrough()
  }
}