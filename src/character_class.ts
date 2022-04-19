import { Field } from "./field_class";

export class Character {
  private hp: number;
  private hpMax: number;
  private dp: number;
  private dpMax: number;
  private ap: number;
  private apMax: number;
  private isAlive: boolean = true;
  private position: number = 0;
  private level: number = 1;

  constructor(hp: number, dp: number, ap: number, level?: number) {
    this.hp = hp;
    this.hpMax = hp;
    this.dp = dp;
    this.dpMax = dp;
    this.ap = ap;
    this.apMax = ap;
  }
  public getPosition(): number {
    return this.position;
  }

  public moveRight(field: Field): void {
    const possibility: boolean = field.getTiles()[this.position + 1].isThrough();
    if (this.position % 10 === 9) {
    } else if (possibility) {
      this.position += 1;
    } else { }
  }
  public moveLeft(field: Field): void {
    if (this.position > 0) {
      const possibility: boolean = field.getTiles()[this.position - 1].isThrough();
      if (this.position % 10 === 0) {
      } else if (possibility) {
        this.position -= 1;
      } else { }
    }
  }
  public moveUp(field: Field): void {
    if (this.position > 9) {
      const possibility: boolean = field.getTiles()[this.position - 10].isThrough();
      if (this.position < 10) {
      } else if (possibility) {
        this.position -= 10;
      } else { }
    }
  }
  public moveDown(field: Field): void {
    if (this.position < 90) {
      const possibility: boolean = field.getTiles()[this.position + 10].isThrough();
      if (this.position >= 90) {
      } else if (possibility) {
        this.position += 10;
      } else { }
    }
  }
}


