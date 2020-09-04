import * as PIXI from 'pixi.js';

export default function Button(onClickActive: Function) {
  const activeBTN = PIXI.Texture.from('playbtn');
  const inactiveBTN = PIXI.Texture.from('playbtn_inactive');
  let isActive = true;

  const button = new PIXI.Sprite(activeBTN);
  button.buttonMode = true;
  button.interactive = true;

  button.on('click', () => {
    if (isActive) {
      isActive = false;
      button.texture = inactiveBTN;
      onClickActive(() => {
        isActive = true;
        button.texture = activeBTN;
      });
    }
  });

  const container = new PIXI.Container();
  container.position.set(300, 440);
  container.addChild(button);

  return container;
}
