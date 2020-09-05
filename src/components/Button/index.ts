import * as PIXI from 'pixi.js';
import { ButtonFactoryInterface, ButtonInstanceInterface } from './contract';

import btnActiveImg from './assets/playbtn.png';
import btnInactiveImg from './assets/playbtn_inactive.png';

const Button: ButtonFactoryInterface = () => {
  const btnActiveTexture = PIXI.Texture.from('btnActiveImg');
  const btnInactiveTexture = PIXI.Texture.from('btnInactiveImg');
  let isActive = true;
  let onClick: Function = () => {};

  const btn = new PIXI.Sprite(btnActiveTexture);
  btn.buttonMode = true;
  btn.interactive = true;

  const container = new PIXI.Container();
  container.addChild(btn);

  const buttonInstance: ButtonInstanceInterface = {
    getContainer(): PIXI.Container {
      return container;
    },

    setActive(flag = true) {
      isActive = flag;
      btn.texture = isActive ? btnActiveTexture : btnInactiveTexture;
    },

    isActive() {
      return isActive;
    },

    setOnclick(cb) {
      onClick = cb;
    }
  };

  btn.on('click', () => {
    if (onClick) onClick(buttonInstance);
  });

  return buttonInstance;
};

Button.load = (loader) => {
  loader.add('btnActiveImg', btnActiveImg);
  loader.add('btnInactiveImg', btnInactiveImg);
};

export default Button;
