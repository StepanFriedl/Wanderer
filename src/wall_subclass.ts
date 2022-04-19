'use strict'
import { Tile } from "./tiles_class"

export class Wall extends Tile {
  public draw(x: number, y: number, width: number = 40, height: number = 40) {
    const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const wall = document.getElementById('wall') as HTMLImageElement;

    ctx.drawImage(wall, x, y, width, height);
  }
  public isThrough(): boolean {
    return false;
  }
}