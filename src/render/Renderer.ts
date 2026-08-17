export class Renderer {
  private ctx: CanvasRenderingContext2D | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    throw new Error('not implemented');
  }

  render(): void {
    void this.ctx;
    throw new Error('not implemented');
  }

  clear(): void {
    throw new Error('not implemented');
  }
}
