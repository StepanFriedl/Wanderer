
export class Character {
  private hp: number;
  private hpMax: number;
  private dp: number;
  private dpMax: number;
  private ap: number;
  private apMax: number;
  private isAlive: boolean = true;
  private positionX: number = 100;
  private positionY: number = 0;
  private level: number = 1;

  constructor(hp: number, dp: number, ap: number, level?: number) {
    this.hp = hp;
    this.hpMax = hp;
    this.dp = dp;
    this.dpMax = dp;
    this.ap = ap ;
    this.apMax = ap ;
  }
  public getPosition(): number[] {
    let arr: number[] = [];
    arr.push(this.positionX);
    arr.push(this.positionY);
    return arr;
  }
  public moveRight(): void {
    this.positionX += 40;
  }
  public moveLeft(): void {
    this.positionX -= 40;
  }
  public moveUp(): void {
    this.positionY -= 40;
  }
  public moveDown(): void {
    this.positionY += 40;
  }
}


