const CANVAS_WIDTH = 416;
const CANVAS_HEIGHT = 416;


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
  render(ctx);

  console.log('Super Tank 1990 initialized.');
  console.log('Canvas: ${CANVAS_WIDTHx${CANVAS_HEIGHT}');
}


window.addEventListener('DOMContentLoaded', init);
