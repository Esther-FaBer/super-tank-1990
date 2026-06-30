const CANVAS_WIDTH = 416;
const CANVAS_HEIGHT = 416;


//canvas set up
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