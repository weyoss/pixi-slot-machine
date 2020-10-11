import { ConfigInterface } from './contract';

export const config: ConfigInterface = {
  gameWidth: 800,
  gameHeight: 600,
  reelsPosition: { x: 120, y: 60 },
  playButtonPosition: { x: 305, y: 470 },
  selectEasyModePosition: { x: 640, y: 415 },
  FPSDisplayPosition: { x: 318, y: 20 },
  totalReels: 5,
  reelSpinningCycles: 2,
  reelSpinningSpeedFactor: [5, 10, 15, 20, 30],
  reelShuffleSpinningSpeedFactor: false,
  totalReelCells: 7,
  reelVisibleCells: 3,
  reelCellHeight: 100,
  reelCellWidth: 102,
  reelVerticalPadding: 25,
  reelHorizontalMargin: 15
};
