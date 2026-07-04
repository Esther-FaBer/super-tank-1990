export class InputManager {

  private keys: Map<string, boolean> = new Map();

  constructor() {

    window.addEventListener('keydown', (e) => {

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      this.keys.set(e.key, true);
    });

    window.addEventListener('keyup', (e) => {
      this.keys.set(e.key, false);
    });
  }

  public isHeld(key: string): boolean {
    return this.keys.get(key) ?? false;
  }

  public get up(): boolean    { return this.isHeld('ArrowUp'); }
  public get down(): boolean  { return this.isHeld('ArrowDown'); }
  public get left(): boolean  { return this.isHeld('ArrowLeft'); }
  public get right(): boolean { return this.isHeld('ArrowRight'); }
  public get fire(): boolean  { return this.isHeld(' '); } 
}