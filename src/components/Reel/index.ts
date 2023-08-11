import * as PIXI from 'pixi.js';
import { ConfigInterface } from '../../config/contract';

class Reel extends PIXI.TilingSprite {
  protected spinningOutcome: number;

  protected spinningCycles: number;

  protected spinningCyclesMeter: number;

  protected reelIndex: number;

  protected horizontalMargin: number;

  protected verticalPadding: number;

  protected cellHeight: number;

  protected appTicker: PIXI.Ticker;

  protected cellPosition: number;

  protected stop: boolean = false;

  protected totalCells: number = 0;

  protected startingPoint: number = 0;

  constructor(reelIndex: number, config: ConfigInterface, ticker: PIXI.Ticker, symbolsTape: string, startingPosition: number) {
    const texture = PIXI.Texture.from(symbolsTape);
    const {
      reelCellHeight,
      reelVisibleCells,
      reelVerticalPadding,
      reelCellWidth,
      reelHorizontalMargin,
      reelSpinningCycles,
      totalReelCells
    } = config;
    const reelHeight = reelCellHeight * reelVisibleCells + reelVerticalPadding;
    super(texture, reelCellWidth, reelHeight);
    this.appTicker = ticker;
    this.spinningOutcome = 0;
    this.cellHeight = reelCellHeight;
    this.horizontalMargin = reelHorizontalMargin;
    this.spinningCycles = reelSpinningCycles;
    this.verticalPadding = reelVerticalPadding;
    this.reelIndex = reelIndex;
    this.spinningCyclesMeter = 0;
    this.totalCells = totalReelCells;
    this.cellPosition = 0;
    this.setTilePositionAt(startingPosition);
    this.startingPoint = startingPosition;
    this.setPosition();
    PIXI.Assets.load(symbolsTape);
  }

  protected setPosition() {
    this.x = this.reelIndex * (this.width + this.horizontalMargin);
    this.y = 0;
  }

  protected setTilePositionAt(cellNumber: number) {
    this.tilePosition.x = 0;
    if (cellNumber < 0) {
      cellNumber = this.totalCells - cellNumber;
    }
    this.tilePosition.y = -cellNumber * this.cellHeight + Math.ceil(this.verticalPadding / 2);
  }


  protected resetSpinningMeter() {
    this.spinningCyclesMeter = this.spinningCycles * this.cellHeight * this.totalCells;
  }

  static rollDice(): number {
    const chance = Reel.getNumberBetween(0, 10);
    if (chance < 5) {
      return Reel.getRandomOutcome();
    }
    return -1;
  }

  protected setSpinningOutcome(useOutcome: number) {
    this.spinningOutcome = useOutcome >= 0 ? useOutcome : Reel.getRandomOutcome();
    this.setTilePositionAt(this.spinningOutcome);
    this.resetSpinningMeter();
  }

  getSpinningOutcome() {
    return this.spinningOutcome;
  }

  spin(spinningSpeedFactor: number, cb: Function) {
    
    const animation = () => {
      if (this.spinningCyclesMeter > this.cellHeight * this.totalCells) {
        this.spinningCyclesMeter = 0;
      } else {
        this.tilePosition.y += spinningSpeedFactor;
        this.spinningCyclesMeter += spinningSpeedFactor;
      }
        
      if (this.stop) {
        this.stop = false;
        this.appTicker.remove(animation);
        cb();
      }
    };
    this.appTicker.add(animation);
  }

  protected static getNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected static getRandomOutcome() {
    return Reel.getNumberBetween(0, 7);
  }
}



export default Reel;
