import { GameLoop } from './core/GameLoop';
import { Grid } from './core/Grid';
import { InputManager } from './core/InputManager';
import { RenderSystem } from './systems/RenderSystem';
import { Tank, Direction } from './entities/Tank';


import level1 from './levels/level1.json';

// Constants
const TILE_SIZE = 32;
const CANVAS_WIDTH  = 13 * TILE_SIZE; // 416
const CANVAS_HEIGHT = 13 * TILE_SIZE; // 416

// Canvas set up
function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width  = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const container = document.getElementById('game-container');
  if (!container) {
    throw new Error('No #game-container found in HTML.');
  }
  container.appendChild(canvas);
  return canvas;
}

//Init
function init(): void {
  const canvas = createCanvas();
  const ctx    = canvas.getContext('2d')!;

  const grid = new Grid(level1.tiles, TILE_SIZE);

  const player   = new Tank(6 * TILE_SIZE, 10 * TILE_SIZE, grid, Direction.Up);

  const input    = new InputManager();

  const renderer = new RenderSystem(ctx, grid);

// Update
  function update(dt: number): void {

    player.update(dt);


    if (input.up)         player.move(Direction.Up,    dt);
    else if (input.down)  player.move(Direction.Down,  dt);
    else if (input.left)  player.move(Direction.Left,  dt);
    else if (input.right) player.move(Direction.Right, dt);


    if (input.fire && player.canShoot()) {
      player.shoot();
    }
  }

//Render
  function render(): void {
    renderer.clear();       //  background
    renderer.drawMap();     // all tiles
    renderer.drawTank(player); // player tank (drawn ON TOP of tiles)
    renderer.drawDebugGrid(); // grid lines
  }

  // Start the loop
  const gameLoop = new GameLoop(update, render);
  gameLoop.start();
}

window.addEventListener('DOMContentLoaded', init);