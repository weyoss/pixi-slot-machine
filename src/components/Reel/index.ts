import * as PIXI from 'pixi.js';
import reelCellsImg from './assets/reel_cells.png';
import { ConfigInterface } from '../../config/contract';

class Reel extends PIXI.TilingSprite {
  protected reelPosition: number;

  protected cyclesLength: number;

  protected reelIndex: number;

  protected horizontalMargin: number;

  protected verticalPadding: number;

  protected rotationCycles: number;

  protected cellHeight: number;

  protected totalCells: number;

  protected appTicker: PIXI.Ticker;

  constructor(reelIndex: number, config: ConfigInterface, ticker: PIXI.Ticker, initialPosition: number = 0) {
    const texture = PIXI.Texture.from('reelCellsImg');
    const {
      reelCellHeight,
      reelVisibleCells,
      reelVerticalPadding,
      reelCellWidth,
      reelHorizontalMargin,
      reelRotationCycles,
      reelTotalCells
    } = config;
    const reelHeight = reelCellHeight * reelVisibleCells + reelVerticalPadding;
    super(texture, reelCellWidth, reelHeight);
    this.appTicker = ticker;
    this.reelPosition = 0;
    this.cellHeight = reelCellHeight;
    this.horizontalMargin = reelHorizontalMargin;
    this.rotationCycles = reelRotationCycles;
    this.totalCells = reelTotalCells;
    this.verticalPadding = reelVerticalPadding;
    this.reelIndex = reelIndex;
    this.cyclesLength = 0;
    this.selectCellNumber(initialPosition);
    this.setPosition();
  }

  protected setPosition() {
    this.x = this.reelIndex * (this.width + this.horizontalMargin);
    this.y = 0;
  }

  protected selectCellNumber(position: number) {
    this.reelPosition = position;
    this.tilePosition.x = 0;
    this.tilePosition.y = -position * this.cellHeight + Math.ceil(this.verticalPadding / 2);
    this.cyclesLength = this.rotationCycles * this.cellHeight * this.totalCells;
  }

  getPosition() {
    return this.reelPosition;
  }

  rotate(position: number, rotationSpeedFactor: number, cb: Function) {
    this.selectCellNumber(position);
    const animation = () => {
      if (this.cyclesLength > 0) {
        this.tilePosition.y += rotationSpeedFactor;
        this.cyclesLength -= rotationSpeedFactor;
      } else if (this.cyclesLength <= 0) {
        if (this.cyclesLength < 0) {
          this.tilePosition.y += this.cyclesLength;
          this.cyclesLength = 0;
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
