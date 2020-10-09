import * as PIXI from 'pixi.js';
import Reel from '../Reel';
import { ConfigInterface } from '../../config/contract';

class Reels extends PIXI.Container {
  protected items: Reel[] = [];

  protected totalReels: number;

  protected rotationSpeedFactor: number[];

  protected useEasyMode: boolean;

  protected rotating = false;

  protected reelTotalCells: number;

  constructor(config: ConfigInterface, ticker: PIXI.Ticker) {
    super();
    this.totalReels = config.totalReels;
    this.useEasyMode = config.useEasyMode;
    this.rotationSpeedFactor = config.reelRotationSpeedFactor;
    this.reelTotalCells = config.reelTotalCells;
    this.position.set(config.reelsPosition.x, config.reelsPosition.y);
    for (let index = 0; index < this.totalReels; index = index + 1) {
      const reel = new Reel(index, config, ticker);
      this.items.push(reel);
      this.addChild(reel);
    }
  }

  rotate(cb: Function) {
    this.rotating = true;
    const reelPositions = this.getNewReelPositions();
    let rotatingReels = this.totalReels;
    const onStop = () => {
      rotatingReels -= 1;
      if (!rotatingReels) {
        cb();
        this.rotating = false;
        this.checkResults();
      }
    };
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].rotate(reelPositions[i], this.rotationSpeedFactor[i], onStop);
    }
  }

  isRotating() {
    return this.rotating;
  }

  protected getNewReelPositions(): number[] {
    const positions = [];
    const getNumberBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
    let preDefinedPosition = null;
    if (this.useEasyMode) {
      const chance = getNumberBetween(0, 10);
      if (chance < 5) {
        preDefinedPosition = getNumberBetween(0, this.reelTotalCells - 1);
      }
    }
    for (let i = 0; i < this.totalReels; i += 1) {
      const position = preDefinedPosition || getNumberBetween(0, this.reelTotalCells - 1);
      positions.push(position);
    }
    return positions;
  }

  protected checkResults(): void {
    const position = this.items[0].getPosition();
    const win = this.items.find((i) => i.getPosition() !== position) === undefined;
    if (win) alert('You won!');
  }

  static load(loader: PIXI.Loader) {
    Reel.load(loader);
  }
}

export default Reels;
