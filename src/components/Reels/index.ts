import * as PIXI from 'pixi.js';
import { config } from '../../config';
import { ReelsFactoryInterface } from './contract';

import reelCellsImg from './assets/reel_cells.png';

const {
  totalReels,
  reelRotationCycles,
  reelRotationSpeedFactor,
  reelTotalCells,
  reelCellHeight,
  reelCellWidth,
  reelVisibleCells,
  reelVerticalPadding,
  reelHorizontalMargin,
  useEasyMode
} = config;
const reelWidth = reelCellWidth;
const reelHeight = reelCellHeight * reelVisibleCells + reelVerticalPadding;

const Reel = (width: number, height: number): PIXI.TilingSprite => {
  const reelCellsTexture = PIXI.Texture.from('reelCellsImg');
  return new PIXI.TilingSprite(reelCellsTexture, width, height);
};

const getNumberBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const getNewReelPositions = (easyMode = true): number[] => {
  const positions = [];
  let preDefinedPosition = null;
  if (easyMode) {
    const chance = getNumberBetween(0, 10);
    if (chance < 5) {
      preDefinedPosition = getNumberBetween(0, reelTotalCells - 1);
    }
  }
  for (let i = 0; i < totalReels; i += 1) {
    const position = preDefinedPosition || getNumberBetween(0, reelTotalCells - 1);
    positions.push(position);
  }
  return positions;
};

const checkResults = (positions: number[]): void => {
  const win = positions.find((i) => i !== positions[0]) === undefined;
  if (win) alert('You won!');
};

const Reels: ReelsFactoryInterface = () => {
  const container: PIXI.Container = new PIXI.Container();
  const reels: PIXI.TilingSprite[] = [];
  const reelsCyclesLength: number[] = [];
  let reelPositions: number[] = Array.from({ length: totalReels }, (_, index) => index);

  for (let i = 0; i < totalReels; i = i + 1) {
    const reel = Reel(reelWidth, reelHeight);
    reel.tilePosition.x = 0;
    reel.tilePosition.y = -reelPositions[i] * reelCellHeight + Math.floor(reelVerticalPadding / 2);
    reel.x = i * (reelWidth + reelHorizontalMargin);
    reel.y = 0;
    reels.push(reel);
    container.addChild(reel);
  }

  function rotateReels(cb: Function): void {
    for (let i = 0; i < totalReels; i++) {
      if (reelsCyclesLength[i] > 0) {
        reels[i].tilePosition.y += reelRotationSpeedFactor[i];
        reelsCyclesLength[i] -= reelRotationSpeedFactor[i];
      } else if (reelsCyclesLength[i] < 0) {
        reels[i].tilePosition.y += reelsCyclesLength[i];
        reelsCyclesLength[i] = 0;
      }
    }
    const done = reelsCyclesLength.find((i) => i > 0);
    if (done !== undefined) requestAnimationFrame(() => rotateReels(cb));
    else {
      cb();
      checkResults(reelPositions);
    }
  }

  return {
    getContainer() {
      return container;
    },

    rotate(cb) {
      reelPositions = getNewReelPositions(useEasyMode);
      for (let i = 0; i < totalReels; i += 1) {
        reels[i].tilePosition.y = -reelPositions[i] * reelCellHeight + Math.ceil(reelVerticalPadding / 2);
        reelsCyclesLength[i] = reelRotationCycles * reelCellHeight * reelTotalCells;
      }
      rotateReels(cb);
    }
  };
};

Reels.load = (loader) => {
  loader.add('reelCellsImg', reelCellsImg);
};

export default Reels;
