import { Entity } from './Entity';
import { Direction } from './Tank';

const BULLET_SPEED = 288;

const BULLET_VECTORS: Record<Direction, { vx: number; vy: number }> = {
  [Direction.Up]:    { vx:  0,            vy: -BULLET_SPEED },
  [Direction.Down]:  { vx:  0,            vy:  BULLET_SPEED },
  [Direction.Left]:  { vx: -BULLET_SPEED, vy:  0            },
  [Direction.Right]: { vx:  BULLET_SPEED, vy:  0            },
};

export class Bullet extends Entity {

  public vx: number;
  public vy: number;

  public owner: 'player' | 'enemy';

  public direction: Direction;

  constructor(
    x: number,
    y: number,
    direction: Direction,
    owner: 'player' | 'enemy' = 'player'
  ) {

    super(x, y, 8, 8);

    this.direction = direction;
    this.owner     = owner;

    const { vx, vy } = BULLET_VECTORS[direction];
    this.vx = vx;
    this.vy = vy;
  }

  public update(dt: number): void {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
}