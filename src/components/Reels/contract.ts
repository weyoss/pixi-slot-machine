import * as PIXI from 'pixi.js';
import { LoadableInterface } from '../../common/contract';

export interface ReelsFactoryInterface extends LoadableInterface {
  (): ReelsInstanceInterface;
}

export interface ReelsInstanceInterface {
  getContainer(): PIXI.Container;
  rotate(cb: Function): void;
}
