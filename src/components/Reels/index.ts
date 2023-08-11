import * as PIXI from 'pixi.js';
import Reel from '../Reel';
import { ConfigInterface } from '../../config/contract';


class Reels extends PIXI.Container {
  protected items: Reel[] = [];

  protected totalReels: number;

  protected spinningSpeedFactor: number[];

  protected useEasyMode: boolean = false;

  protected spinning = false;

  protected shuffleSpinningSpeedFactor: boolean;

  protected rolledDiceOutcome: number = -1;

  constructor(config: ConfigInterface, ticker: PIXI.Ticker) {
    super();
    this.totalReels = config.totalReels;
    this.spinningSpeedFactor = [...config.reelSpinningSpeedFactor];
    this.shuffleSpinningSpeedFactor = config.reelShuffleSpinningSpeedFactor;
    this.position.set(config.reelsPosition.x, config.reelsPosition.y);
    for (let index = 0; index < this.totalReels; index = index + 1) {
      const reel = new Reel(index, config, ticker, config.reelSymbolsTape[index], config.reelStartingPositions[index]);
      this.items.push(reel);
      this.addChild(reel);
    }
  }

  spin(cb: Function) {
    this.spinning = true;
    let spinningReelsNumber = this.totalReels;
    const onStop = () => {
      spinningReelsNumber -= 1;
      if (!spinningReelsNumber) {
        cb();
        this.spinning = false;
      }
    };
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].spin(this.spinningSpeedFactor[i], onStop);
    }
  }

  areSpinning() {
    return this.spinning;
  }

  setEasyMode(flag: boolean) {
    this.useEasyMode = flag;
  }

}

export default Reels;
