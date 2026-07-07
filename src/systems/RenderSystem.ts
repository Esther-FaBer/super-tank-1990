import { Grid, TileType, TILE_COLORS } from '../core/Grid';
import { Tank, Direction, PLAYER_COLOR, BARREL_COLOR } from '../entities/Tank';
import { Bullet } from '../entities/Bullet';

export class RenderSystem {
  private ctx: CanvasRenderingContext2D;
  private grid: Grid;

  constructor(ctx: CanvasRenderingContext2D, grid: Grid) {
    this.ctx = ctx;
    this.grid = grid;
  }

  public clear(): void {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(
      0,
      0,
      this.grid.cols * this.grid.tileSize,
      this.grid.rows * this.grid.tileSize
    );
  }

    public drawMap(): void {
    for (let row = 0; row < this.grid.rows; row++) {
      for (let col = 0; col < this.grid.cols; col++) {
        const tile = this.grid.getTile(col, row);


        if (tile === null || tile === TileType.Empty) continue;

   
        const { x, y } = this.grid.gridToPixel(col, row);

        this.ctx.fillStyle = TILE_COLORS[tile];
        this.ctx.fillRect(x, y, this.grid.tileSize, this.grid.tileSize);


        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, this.grid.tileSize, this.grid.tileSize);
      }
    }
  }


  public drawDebugGrid(): void {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 0.5;

    for (let row = 0; row <= this.grid.rows; row++) {
      const y = row * this.grid.tileSize;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.grid.cols * this.grid.tileSize, y);
      this.ctx.stroke();
    }

    for (let col = 0; col <= this.grid.cols; col++) {
      const x = col * this.grid.tileSize;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.grid.rows * this.grid.tileSize);
      this.ctx.stroke();
    }
  }


  public drawTank(tank: Tank): void {
    const { x, y, width, height, direction } = tank;


    this.ctx.fillStyle = PLAYER_COLOR;
    this.ctx.fillRect(x + 4, y + 4, width - 8, height - 8);

    this.ctx.fillStyle = BARREL_COLOR;

    const cx = x + width / 2; 
    const cy = y + height / 2;
    const bw = 6;
    const bh = 14;

    this.ctx.save();

    this.ctx.translate(cx, cy);

    switch (direction) {
      case Direction.Up:    this.ctx.rotate(0);              break;
      case Direction.Right: this.ctx.rotate(Math.PI / 2);   break;
      case Direction.Down:  this.ctx.rotate(Math.PI);        break;
      case Direction.Left:  this.ctx.rotate(-Math.PI / 2);  break;
    }


    this.ctx.fillRect(-bw / 2, -height / 2 + 2, bw, bh);

    this.ctx.restore();
  }

  public drawBullets(bullets: Bullet[]): void {
    for (const bullet of bullets) {
      if (!bullet.alive) continue;

      this.ctx.fillStyle = 'rgba(255, 220, 50, 0.4)';
      this.ctx.fillRect(
        bullet.x - 2,
        bullet.y - 2,
        bullet.width  + 4,
        bullet.height + 4
      );


      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
  }
}

