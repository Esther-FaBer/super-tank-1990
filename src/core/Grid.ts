export enum TileType {
  Empty  = 0,
  Brick  = 1,
  Steel  = 2,
  Water  = 3,
  Trees  = 4,
  Base   = 5,
}


export const TILE_COLORS: Record<TileType, string> = {
  [TileType.Empty]:  '#000000',  // black
  [TileType.Brick]:  '#c8622a',  // orange-brown
  [TileType.Steel]:  '#a0a0a0',  // grey
  [TileType.Water]:  '#2255cc',  // blue
  [TileType.Trees]:  '#2d7a2d',  // dark green
  [TileType.Base]:   '#ffcc00',  // gold
};


export class Grid {

  public readonly cols: number;
  public readonly rows: number;


  public readonly tileSize: number;


  private tiles: TileType[][];

  constructor(tiles: number[][], tileSize: number = 32) {
    this.tileSize = tileSize;
    this.rows = tiles.length;
    this.cols = tiles[0].length;


    this.tiles = tiles.map(row => row.map(cell => cell as TileType));
  }


  public getTile(col: number, row: number): TileType | null {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return null; // out of bounds
    }
    return this.tiles[row][col];
  }


  public setTile(col: number, row: number, type: TileType): void {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return; // ignore out-of-bounds writes silently
    }
    this.tiles[row][col] = type;
  }


  public gridToPixel(col: number, row: number): { x: number; y: number } {
    return {
      x: col * this.tileSize,
      y: row * this.tileSize,
    };
  }

  
  public pixelToGrid(x: number, y: number): { col: number; row: number } {
    return {
      col: Math.floor(x / this.tileSize),
      row: Math.floor(y / this.tileSize),
    };
  }

  public isWalkable(col: number, row: number): boolean {
    const tile = this.getTile(col, row);
    if (tile === null) return false; // out of bounds = not walkable
    return tile === TileType.Empty || tile === TileType.Trees;
  }


  public isBulletPassable(col: number, row: number): boolean {
    const tile = this.getTile(col, row);
    if (tile === null) return false;
    return (
      tile === TileType.Empty ||
      tile === TileType.Trees ||
      tile === TileType.Water
    );
  }
}