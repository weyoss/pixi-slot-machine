export interface ConfigInterface {
  gameWidth: number;
  gameHeight: number;
  reelsPosition: { x: number; y: number };
  playButtonPosition: { x: number; y: number };
  selectEasyModePosition: { x: number; y: number };
  FPSDisplayPosition: { x: number; y: number };
  totalReels: number;
  reelSymbolsTape: string[];
  reelSpinningCycles: number;
  reelSpinningSpeedFactor: number[];
  reelShuffleSpinningSpeedFactor: boolean;
  totalReelCells: number;
  reelCellHeight: number;
  reelCellWidth: number;
  reelVisibleCells: number;
  reelVerticalPadding: number;
  reelHorizontalMargin: number;
  reelStartingPositions: number[];
}
