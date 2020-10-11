# Pixi Slot Machine

Pixi Slot Machine is a bare minimum slot machine game to get familiar with Pixi.js. 

Game parameters are configurable through a configuration file.

![Gameplay](./screenshots/gameplay.gif?v=124)

## Installation

```
$ git clone https://github.com/weyoss/pixi-slot-machine.git
$ cd pixi-slot-machine
$ yarn install
```

## Configuration

The configuration file `index.ts` is located under the [config folder](./src/config) and allows you to change for 
example the game dimensions (width, height), the number of reels, visible reel cells or to enable/disable the easy mode.

Supported configuration parameters are described by the `ConfigInterface` interface.

```typescript
interface ConfigInterface {
  gameWidth: number;
  gameHeight: number;
  reelsPosition: { x: number; y: number };
  buttonPosition: { x: number; y: number };
  FPSDisplayPosition: { x: number; y: number };
  totalReels: number;
  reelSpinningCycles: number;
  reelSpinningSpeedFactor: number[];
  reelShuffleSpinningSpeedFactor: boolean;
  totalReelCells: number;
  reelCellHeight: number;
  reelCellWidth: number;
  reelVisibleCells: number;
  reelVerticalPadding: number;
  reelHorizontalMargin: number;
}
```

### gameWidth

Game width in pixels.

### gameHeight

Game height in pixels.

### reelsPosition 

Position of the reels' container.

### buttonPosition

Position of the button container.

### FPSDisplayPosition

Position of the FPS display.

### totalReels

Total number of reels. 

If you change this parameter you need also to update [reelRatationSpeedFactor](#reelrotationspeedfactor) parameter.

### reelSpinningCycles

The number of spinning cycles the reels should perform during the animation.

### reelSpinningSpeedFactor

Each reel spins at its own speed. The length of the array is total number of reels.
 
An array value corresponds to the amount of pixels by which a given reel spins at a time.

Example:

Given `[5, 10, 15, 20, 30]` - The first reel will spin by 5px at a time, the second reel will spin by 10px 
at a time and so on.

### reelShuffleSpinningSpeedFactor

Make reels spin randomly at different speeds each run.

When `true`, the order of the `reelSpinningSpeedFactor` array elements does not play a role.

### totalReelCells

Total number of reel cells.

### reelVisibleCells

Number of reel cells that are visible in the screen.

### reelCellHeight

Height of a reel cell item in pixels.

### reelCellWidth

Width of a reel cell item in pixels.

### reelVerticalPadding

Reel top and bottom padding in pixels. 

### reelHorizontalMargin

Space between reels in pixels.

## Running

```
$ npm start
```

## Build

```
$ npm run build
```

# License

MIT
