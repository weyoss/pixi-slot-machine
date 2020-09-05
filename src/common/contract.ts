import * as PIXI from 'pixi.js';

export interface LoadableInterface {
  load(loader: PIXI.Loader): void;
}
