import { GameLoop } from './core/GameLoop';
import { Grid } from './core/Grid';
import { RenderSystem } from './systems/RenderSystem';


import level1 from './levels/level1.json';


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

  const renderer = new RenderSystem(ctx, grid);

// Update
  function update(_dt: number): void {

  }

//Render
  function render(): void {
    renderer.clear();       //  background
    renderer.drawMap();     // all tiles
    renderer.drawDebugGrid(); // grid lines
  }

  // Start the loop
  const gameLoop = new GameLoop(update, render);
  gameLoop.start();
}

window.addEventListener('DOMContentLoaded', init);