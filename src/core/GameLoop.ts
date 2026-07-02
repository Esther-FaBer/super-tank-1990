export class GameLoop {

  private updateFn: (dt: number) => void;
  private renderFn: () => void;


  private isRunning: boolean = false;


  private rafId: number = 0;

  private lastTimestamp: number = 0;


  private readonly MAX_DELTA: number = 0.05;

  constructor(updateFn: (dt: number) => void, renderFn: () => void) {
    this.updateFn = updateFn;
    this.renderFn = renderFn;
  }


  // start — loop
  public start(): void {
    if (this.isRunning) return; 
    this.isRunning = true;

    this.rafId = requestAnimationFrame(this.loop.bind(this));
  }


  // stop — pause or end the loop
  public stop(): void {
    this.isRunning = false;
    cancelAnimationFrame(this.rafId);
  }

  // loop() — runs every frame
  private loop(timestamp: number): void {
    if (!this.isRunning) return;


    const deltaMs = timestamp - this.lastTimestamp;
    const dt = Math.min(deltaMs / 1000, this.MAX_DELTA);
    this.lastTimestamp = timestamp;

    this.updateFn(dt);

    this.renderFn();

    this.rafId = requestAnimationFrame(this.loop.bind(this));
  }
}
