import * as PIXI from 'pixi.js';
import Reel from '../Reel';
import { ConfigInterface } from '../../config/contract';

function shuffle(set: number[]) {
  for (let i = set.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [set[i], set[j]] = [set[j], set[i]];
  }
}

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
    Reel.totalCells = config.totalReelCells;
    for (let index = 0; index < this.totalReels; index = index + 1) {
      const reel = new Reel(index, config, ticker);
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
        this.checkResults();
      }
    };
    this.rolledDiceOutcome = this.useEasyMode ? Reel.rollDice() : -1;
    if (this.shuffleSpinningSpeedFactor) {
      shuffle(this.spinningSpeedFactor);
    }
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].spin(this.rolledDiceOutcome, this.spinningSpeedFactor[i], onStop);
    }
  }

  areSpinning() {
    return this.spinning;
  }

  setEasyMode(flag: boolean) {
    this.useEasyMode = flag;
  }

  protected checkResults(): void {
    // If we have rolled a dice and got lucky, skip checking spinning outcome
    let won = this.rolledDiceOutcome >= 0;
    if (!won) {
      // Check if all the reels have the same spinning outcome
      const outcome = this.items[0].getSpinningOutcome();
      won = this.items.find((i) => i.getSpinningOutcome() !== outcome) === undefined;
    }
    if (won) alert('You won!');
  }
}

export default Reels;
