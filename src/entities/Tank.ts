import { Entity } from './Entity';
import { Grid } from '../core/Grid';


export enum Direction {
  Up    = 'UP',
  Down  = 'DOWN',
  Left  = 'LEFT',
  Right = 'RIGHT',
}

const DIRECTION_VECTORS: Record<Direction, { dx: number; dy: number }> = {
  [Direction.Up]:    { dx:  0, dy: -1 },
  [Direction.Down]:  { dx:  0, dy:  1 },
  [Direction.Left]:  { dx: -1, dy:  0 },
  [Direction.Right]: { dx:  1, dy:  0 },
};


export const PLAYER_COLOR  = '#d4c23a';
export const BARREL_COLOR  = '#a89e2e';

export class Tank extends Entity {
  public direction: Direction;


  public speed: number = 96;


  private grid: Grid;


  public shootCooldown: number = 0;
  public readonly SHOOT_DELAY: number = 0.5;

  constructor(x: number, y: number, grid: Grid, direction: Direction = Direction.Up) {

    super(x, y, 32, 32);
    this.direction = direction;
    this.grid = grid;
  }

  public update(dt: number): void {
    // Count down the shoot cooldown
    if (this.shootCooldown > 0) {
      this.shootCooldown -= dt;
    }
  }


  public move(direction: Direction, dt: number): void {
 
    this.direction = direction;

    const { dx, dy } = DIRECTION_VECTORS[direction];


    const moveAmount = this.speed * dt;
    const newX = this.x + dx * moveAmount;
    const newY = this.y + dy * moveAmount;


    if (this.canMoveTo(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }


  private canMoveTo(newX: number, newY: number): boolean {
    const margin = 1; 

    const corners = [
      { x: newX + margin,              y: newY + margin },
      { x: newX + this.width - margin, y: newY + margin },   
      { x: newX + margin,              y: newY + this.height - margin },
      { x: newX + this.width - margin, y: newY + this.height - margin },
    ];


    for (const corner of corners) {
      const { col, row } = this.grid.pixelToGrid(corner.x, corner.y);
      if (!this.grid.isWalkable(col, row)) {
        return false;
      }
    }

    return true;
  }


  public canShoot(): boolean {
    return this.shootCooldown <= 0;
  }


  public shoot(): void {
    this.shootCooldown = this.SHOOT_DELAY;

  }
}