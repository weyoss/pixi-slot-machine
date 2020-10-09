import * as PIXI from 'pixi.js';
import reelCellsImg from './assets/reel_cells.png';
import { ConfigInterface } from '../../config/contract';

class Reel extends PIXI.TilingSprite {
  protected spinningOutcome: number;

  protected spinningCycles: number;

  protected spinningCyclesMeter: number;

  protected reelIndex: number;

  protected horizontalMargin: number;

  protected verticalPadding: number;

  protected cellHeight: number;

  protected totalCells: number;

  protected appTicker: PIXI.Ticker;

  constructor(reelIndex: number, config: ConfigInterface, ticker: PIXI.Ticker, initialTilePosition: number = 0) {
    const texture = PIXI.Texture.from('reelCellsImg');
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
    this.totalCells = totalReelCells;
    this.verticalPadding = reelVerticalPadding;
    this.reelIndex = reelIndex;
    this.spinningCyclesMeter = 0;
    this.setTilePositionAt(initialTilePosition);
    this.setPosition();
  }

  protected setPosition() {
    this.x = this.reelIndex * (this.width + this.horizontalMargin);
    this.y = 0;
  }

  protected setTilePositionAt(cellNumber: number) {
    this.tilePosition.x = 0;
    this.tilePosition.y = -cellNumber * this.cellHeight + Math.ceil(this.verticalPadding / 2);
  }

  protected resetSpinningMeter() {
    this.spinningCyclesMeter = this.spinningCycles * this.cellHeight * this.totalCells;
  }

  protected setSpinningOutcome(outcome: number) {
    this.spinningOutcome = outcome;
    this.setTilePositionAt(outcome);
    this.resetSpinningMeter();
  }

  getSpinningOutcome() {
    return this.spinningOutcome;
  }

  spin(outcome: number, spinningSpeedFactor: number, cb: Function) {
    this.setSpinningOutcome(outcome);
    const animation = () => {
      if (this.spinningCyclesMeter > 0) {
        this.tilePosition.y += spinningSpeedFactor;
        this.spinningCyclesMeter -= spinningSpeedFactor;
      } else if (this.spinningCyclesMeter <= 0) {
        if (this.spinningCyclesMeter < 0) {
          this.tilePosition.y += this.spinningCyclesMeter;
          this.spinningCyclesMeter = 0;
        }
        this.appTicker.remove(animation);
        cb();
      }
    };
    this.appTicker.add(animation);
  }

  static load(loader: PIXI.Loader) {
    loader.add('reelCellsImg', reelCellsImg);
  }
}

export default Reel;
