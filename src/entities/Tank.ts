ßimport { Entity } from './Entity';

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

export const PLAYER_COLOR = '#d4c23a';
export const BARREL_COLOR = '#a89e2e';

export class Tank extends Entity {
  public direction: Direction;
  public speed: number = 96;

  public shootCooldown: number = 0;
  public readonly SHOOT_DELAY: number = 0.5;

  constructor(x: number, y: number, direction: Direction = Direction.Up) {
    super(x, y, 32, 32);
    this.direction = direction;
  }

  public update(dt: number): void {
    if (this.shootCooldown > 0) {
      this.shootCooldown -= dt;
    }
  }

  public move(direction: Direction, dt: number): void {
    this.direction = direction;
    const { dx, dy } = DIRECTION_VECTORS[direction];
    this.x += dx * this.speed * dt;
    this.y += dy * this.speed * dt;
  }

  public canShoot(): boolean {
    return this.shootCooldown <= 0;
  }

  public shoot(): void {
    this.shootCooldown = this.SHOOT_DELAY;

  }
}