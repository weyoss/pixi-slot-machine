# Pixi Slot Machine

Pixi Slot Machine is a bare minimum slot machine game to get familiar with Pixi.js. 

Game parameters are configurable through a configuration file.

![Main screen](./screenshots/mainscreen.png)

## Installation

```
$ yarn install
```

## Configuration

The configuration file `index.ts` is located under the [config folder](./src/config) and allows you to change for 
example the game dimensions (width, height), the number of reels, visible reel cells or enable/disable the easy mode.

Supported configuration parameters are described by the `ConfigInterface` interface.

```typescript
interface ConfigInterface {
  gameWidth: number;
  gameHeight: number;
  reelsPosition: { x: number; y: number };
  buttonPosition: { x: number; y: number };
  FPSDisplayPosition: { x: number; y: number };
  totalReels: number;
  reelRotationCycles: number;
  reelRotationSpeedFactor: number[];
  reelTotalCells: number;
  reelCellHeight: number;
  reelCellWidth: number;
  reelVisibleCells: number;
  reelVerticalPadding: number;
  reelHorizontalMargin: number;
  useEasyMode: boolean;
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

### reelRotationCycles

Rotation cycles of reels during the animation.

### reelRotationSpeedFactor

Each reel rotate at its own speed. The length of the array is total number of reels. The first item of the array 
corresponds to the speed of the first reel from the screen's left side. 

Example:

`[5, 10, 15, 20, 30]` - First reel will move by 5px at a time, second reel will move by 10px at a time and so on.

### reelTotalCells

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

### useEasyMode

Use the easy mode to increase the probability to win.

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
