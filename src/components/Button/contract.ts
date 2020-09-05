import * as PIXI from 'pixi.js';
import { LoadableInterface } from '../../common/contract';

export interface ButtonFactoryInterface extends LoadableInterface {
  (): ButtonInstanceInterface;
}

export interface ButtonInstanceInterface {
  getContainer(): PIXI.Container;
  setActive(flag: boolean): void;
  isActive(): boolean;
  setOnclick(cb: (instance: ButtonInstanceInterface) => void): void;
}
