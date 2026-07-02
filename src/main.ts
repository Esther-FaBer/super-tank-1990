import { GameLoop } from './core/GameLoop';


const CANVAS_WIDTH = 416;
const CANVAS_HEIGHT = 416;

const state = {
  square: {
    x: 0,
    y: 192,
    width: 32,
    height: 32,
    speed: 120,
  }
};

// Canvas setup
function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const container = document.getElementById('game-container');
  if (!container) {
    throw new Error('No #game-container found in HTML. Check index.html.');
  }
  container.appendChild(canvas);

  return canvas;
}

// Update — game logic
function update(dt: number): void {
  const sq = state.square;

  sq.x += sq.speed * dt;

  if (sq.x > CANVAS_WIDTH) {
    sq.x = -sq.width;
  }
}



// Render
function render(ctx: CanvasRenderingContext2D): void {
  //background in black
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //draw a green rectangle
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(192, 192, 32, 32);

  //text
  ctx.fillStyle = '#ffffff';
  ctx.font = '20px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Super Tank World', CANVAS_WIDTH / 2, 50);

}

// Init = page load
function init(): void {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d')!;

  const gameLoop = new GameLoop(
    (dt) => update(dt),
    () => render(ctx)
  );

  gameLoop.start();
}


window.addEventListener('DOMContentLoaded', init);
