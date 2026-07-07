import { Entity }  from './Entity';
import { Bullet }  from './Bullet';

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

  public shootCooldown: number      = 0;
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

  public shoot(): Bullet {
    this.shootCooldown = this.SHOOT_DELAY;

    const bulletSize = 8;
    const halfBullet = bulletSize / 2;

    const cx = this.x + this.width  / 2;
    const cy = this.y + this.height / 2;

    let bx: number;
    let by: number;

    switch (this.direction) {
      case Direction.Up:
        bx = cx - halfBullet;
        by = this.y - bulletSize;
        break;
      case Direction.Down:
        bx = cx - halfBullet;
        by = this.y + this.height;
        break;
      case Direction.Left:
        bx = this.x - bulletSize;
        by = cy - halfBullet;
        break;
      case Direction.Right:
        bx = this.x + this.width;
        by = cy - halfBullet;
        break;
    }

    return new Bullet(bx, by, this.direction, 'player');
  }
}