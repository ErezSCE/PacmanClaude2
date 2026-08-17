export class AudioManager {
  private _muted = false;

  constructor() {
    throw new Error('not implemented');
  }

  play(_sound: string): void {
    throw new Error('not implemented');
  }

  toggleMute(): void {
    this._muted = !this._muted;
    throw new Error('not implemented');
  }

  isMuted(): boolean {
    return this._muted;
  }
}
