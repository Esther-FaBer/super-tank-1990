import { Entity } from '../entities/Entity';
import { Grid, TileType } from '../core/Grid';
import { Bullet } from '../entities/Bullet';


export function aabbOverlap(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number
): boolean {
  return (
    ax < bx + bw &&
    ax + aw > bx &&
    ay < by + bh &&
    ay + ah > by
  );
}


interface OverlapResult {
  overlapX: number;
  overlapY: number;
  axis: 'x' | 'y';
}

function getOverlap(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number
): OverlapResult {

  const overlapLeft  = (bx + bw) - ax;
  const overlapRight = (ax + aw) - bx;
  const overlapTop   = (by + bh) - ay;
  const overlapBottom = (ay + ah) - by;

  const overlapX = overlapLeft < overlapRight ? overlapLeft : -overlapRight;
  const overlapY = overlapTop  < overlapBottom ? overlapTop : -overlapBottom;


  const axis = Math.abs(overlapX) < Math.abs(overlapY) ? 'x' : 'y';

  return { overlapX, overlapY, axis };
}

export class CollisionSystem {
  private grid: Grid;

  constructor(grid: Grid) {
    this.grid = grid;
  }

 
  public resolveEntityVsTiles(entity: Entity): void {

    const startCol = Math.floor(entity.x / this.grid.tileSize) - 1;
    const endCol   = Math.floor((entity.x + entity.width)  / this.grid.tileSize) + 1;
    const startRow = Math.floor(entity.y / this.grid.tileSize) - 1;
    const endRow   = Math.floor((entity.y + entity.height) / this.grid.tileSize) + 1;

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const tile = this.grid.getTile(col, row);

        if (tile === null) continue;
        if (tile === TileType.Empty || tile === TileType.Trees) continue;

        if (tile === TileType.Water && !(entity instanceof Entity)) continue;


        const tileX = col * this.grid.tileSize;
        const tileY = row * this.grid.tileSize;
        const tileW = this.grid.tileSize;
        const tileH = this.grid.tileSize;

        if (!aabbOverlap(entity.x, entity.y, entity.width, entity.height,
                          tileX,   tileY,   tileW,         tileH)) {
          continue;
        }

        const { overlapX, overlapY, axis } = getOverlap(
          entity.x, entity.y, entity.width, entity.height,
          tileX,    tileY,    tileW,        tileH
        );


        if (axis === 'x') {
          entity.x -= overlapX;
        } else {
          entity.y -= overlapY;
        }
      }
    }
  }

  public resolveEntityVsEntity(a: Entity, b: Entity): void {
    if (!aabbOverlap(a.x, a.y, a.width, a.height,
                     b.x, b.y, b.width, b.height)) {
      return;
    }

    const { overlapX, overlapY, axis } = getOverlap(
      a.x, a.y, a.width, a.height,
      b.x, b.y, b.width, b.height
    );

    if (axis === 'x') {
      a.x -= overlapX / 2;
      b.x += overlapX / 2;
    } else {
      a.y -= overlapY / 2;
      b.y += overlapY / 2;
    }
  }

  public checkBulletVsTile(
    bx: number, by: number, bw: number, bh: number
  ): { col: number; row: number; tile: TileType } | null {
    const startCol = Math.floor(bx / this.grid.tileSize);
    const endCol   = Math.floor((bx + bw) / this.grid.tileSize);
    const startRow = Math.floor(by / this.grid.tileSize);
    const endRow   = Math.floor((by + bh) / this.grid.tileSize);

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const tile = this.grid.getTile(col, row);
        if (tile === null) continue;

        if (tile !== TileType.Brick && tile !== TileType.Steel && tile !== TileType.Base) {
          continue;
        }

        const tileX = col * this.grid.tileSize;
        const tileY = row * this.grid.tileSize;
        if (aabbOverlap(bx, by, bw, bh, tileX, tileY, this.grid.tileSize, this.grid.tileSize)) {
          return { col, row, tile };
        }
      }
    }

    return null;
  }

  public isOutOfBounds(entity: Entity): boolean {
    const mapWidth  = this.grid.cols * this.grid.tileSize;
    const mapHeight = this.grid.rows * this.grid.tileSize;
    return (
      entity.x + entity.width  < 0 ||
      entity.x                  > mapWidth ||
      entity.y + entity.height < 0 ||
      entity.y                  > mapHeight
    );
  }

  public processBullet(bullet: Bullet): boolean {

    if (this.isOutOfBounds(bullet)) {
      bullet.alive = false;
      return true;
    }


    const hit = this.checkBulletVsTile(bullet.x, bullet.y, bullet.width, bullet.height);

    if (hit === null) return false;

    const { col, row, tile } = hit;


    if (tile === TileType.Brick) {
      this.grid.setTile(col, row, TileType.Empty);
      bullet.alive = false;
      return true;
    }


    if (tile === TileType.Steel) {
      bullet.alive = false;
      return true;
    }

    if (tile === TileType.Base) {
      bullet.alive = false;
      return true;
    }

    return false;
  }
}