import * as PIXI from 'pixi.js';

const reelsNumber = 5;
const reelCellWidth = 102;
const reelCellHeight = 100;
const reelWidth = reelCellWidth;
const reelHeight = reelCellHeight * 3 + 20;
const reelCellNumber = 7;
const reelSpeedFactor = [5, 10, 15, 20, 30];
const reelRotationCycles = 2;

function Reel(width: number, height: number): PIXI.TilingSprite {
  const texture = PIXI.Texture.from('reel_cells');
  return new PIXI.TilingSprite(texture, width, height);
}

function getNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNewReelPositions(easyLevel = true): number[] {
  const positions = [];
  let preDefinedPosition = null;
  if (easyLevel) {
    const chance = getNumberBetween(0, 10);
    if (chance < 5) {
      preDefinedPosition = getNumberBetween(0, reelCellNumber - 1);
    }
  }
  for (let i = 0; i < reelsNumber; i += 1) {
    const position = preDefinedPosition || getNumberBetween(0, reelCellNumber - 1);
    positions.push(position);
  }
  return positions;
}

function checkResults(positions: number[]): void {
  const win = positions.find((i) => i !== positions[0]) === undefined;
  if (win) alert('You won!');
}

export default function Reels(): { getContainer(): PIXI.Container; rotate(cb: Function): void } {
  const container: PIXI.Container = new PIXI.Container();
  const reels: PIXI.TilingSprite[] = [];
  const reelsCyclesLength: number[] = [];
  let reelPositions: number[] = Array.from({ length: reelsNumber }, (_, index) => index);

  for (let i = 0; i < reelsNumber; i = i + 1) {
    const reel = Reel(reelWidth, reelHeight);
    reel.tilePosition.x = 0;
    reel.tilePosition.y = -reelPositions[i] * reelCellHeight + 10;
    reel.x = i * (reelWidth + 10);
    reel.y = 0;
    reels.push(reel);
    container.addChild(reel);
  }

  function rotateReels(cb: Function): void {
    for (let i = 0; i < reelsNumber; i++) {
      if (reelsCyclesLength[i] > 0) {
        reels[i].tilePosition.y += reelSpeedFactor[i];
        reelsCyclesLength[i] -= reelSpeedFactor[i];
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

    rotate(cb: Function) {
      reelPositions = getNewReelPositions();
      for (let i = 0; i < reelsNumber; i += 1) {
        reels[i].tilePosition.y = -reelPositions[i] * reelCellHeight + 10;
        reelsCyclesLength[i] = reelRotationCycles * reelCellHeight * reelCellNumber;
      }
      rotateReels(cb);
    }
  };
}
