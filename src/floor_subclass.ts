'use strict'
import { Tile } from "./tiles_class"

export class Floor extends Tile {
  
  public draw(x: number, y: number, width: number = 40, height: number = 40):void {
    const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const floor = document.getElementById('floor') as HTMLImageElement;
    ctx.drawImage(floor, x, y, width, height)
  }
  public isThrough(): boolean {
    return true;
  }
}