import { ConfigInterface } from './contract';

export const config: ConfigInterface = {
  gameWidth: 800,
  gameHeight: 600,
  reelsPosition: { x: 120, y: 60 },
  buttonPosition: { x: 300, y: 440 },
  FPSDisplayPosition: { x: 220, y: 560 },
  totalReels: 5,
  reelSpinningCycles: 2,
  reelSpinningSpeedFactor: [5, 10, 15, 20, 30],
  totalReelCells: 7,
  reelVisibleCells: 3,
  reelCellHeight: 100,
  reelCellWidth: 102,
  reelVerticalPadding: 25,
  reelHorizontalMargin: 15,
  useEasyMode: true
};
