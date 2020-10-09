import * as PIXI from 'pixi.js';

import btnActiveImg from './assets/playbtn.png';
import btnInactiveImg from './assets/playbtn_inactive.png';
import { ConfigInterface } from '../../config/contract';

class Button extends PIXI.Container {
  protected btnActiveTexture: PIXI.Texture;
  protected btnInactiveTexture: PIXI.Texture;
  protected btn: PIXI.Sprite;

  constructor(config: ConfigInterface) {
    super();
    this.position.set(config.buttonPosition.x, config.buttonPosition.y);
    this.btnActiveTexture = PIXI.Texture.from('btnActiveImg');
    this.btnInactiveTexture = PIXI.Texture.from('btnInactiveImg');
    this.btn = new PIXI.Sprite(this.btnActiveTexture);
    this.btn.buttonMode = true;
    this.btn.interactive = true;
    this.addChild(this.btn);
  }

  setActive(active: boolean) {
    this.btn.texture = active ? this.btnActiveTexture : this.btnInactiveTexture;
  }

  onClick(fn: (instance: Button) => void) {
    this.btn.on('click', () => fn(this));
  }

  static load(loader: PIXI.Loader) {
    loader.add('btnActiveImg', btnActiveImg);
    loader.add('btnInactiveImg', btnInactiveImg);
  }
}

export default Button;
