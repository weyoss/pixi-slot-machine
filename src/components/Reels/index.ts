import * as PIXI from 'pixi.js';
import Reel from '../Reel';
import { ConfigInterface } from '../../config/contract';

class Reels extends PIXI.Container {
  protected items: Reel[] = [];

  protected totalReels: number;

  protected totalReelCells: number;

  protected spinningSpeedFactor: number[];

  protected useEasyMode: boolean;

  protected spinning = false;

  constructor(config: ConfigInterface, ticker: PIXI.Ticker) {
    super();
    this.totalReels = config.totalReels;
    this.useEasyMode = config.useEasyMode;
    this.spinningSpeedFactor = config.reelSpinningSpeedFactor;
    this.totalReelCells = config.totalReelCells;
    this.position.set(config.reelsPosition.x, config.reelsPosition.y);
    for (let index = 0; index < this.totalReels; index = index + 1) {
      const reel = new Reel(index, config, ticker);
      this.items.push(reel);
      this.addChild(reel);
    }
  }

  spin(cb: Function) {
    this.spinning = true;
    const spinningOutcome = this.getSpinningOutcome();
    let spinningReelsNumber = this.totalReels;
    const onStop = () => {
      spinningReelsNumber -= 1;
      if (!spinningReelsNumber) {
        cb();
        this.spinning = false;
        this.checkResults();
      }
    };
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].spin(spinningOutcome[i], this.spinningSpeedFactor[i], onStop);
    }
  }

  areSpinning() {
    return this.spinning;
  }

  protected getSpinningOutcome(): number[] {
    const outcome = [];
    const getNumberBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
    let useOutcome = null;
    if (this.useEasyMode) {
      const chance = getNumberBetween(0, 10);
      if (chance < 5) {
        useOutcome = getNumberBetween(0, this.totalReelCells - 1);
      }
    }
    for (let i = 0; i < this.totalReels; i += 1) {
      const reelSpinningOutcome = useOutcome || getNumberBetween(0, this.totalReelCells - 1);
      outcome.push(reelSpinningOutcome);
    }
    return outcome;
  }

  protected checkResults(): void {
    const position = this.items[0].getSpinningOutcome();
    const win = this.items.find((i) => i.getSpinningOutcome() !== position) === undefined;
    if (win) alert('You won!');
  }

  static load(loader: PIXI.Loader) {
    Reel.load(loader);
  }
}

export default Reels;
