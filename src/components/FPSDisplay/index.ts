import * as PIXI from 'pixi.js';
import { FPSDisplayType } from './contract';

const FPSDisplay: FPSDisplayType = (ticker) => {
  const container = new PIXI.Container();
  const FPSDisplayText = new PIXI.Text('', {
    fontSize: 20,
    fill: 0xff0000
  });
  container.addChild(FPSDisplayText);

  setInterval(() => {
    const fps = ticker.FPS.toFixed(2);
    FPSDisplayText.text = `Timestamp: ${Date.now()}, FPS: ${fps}`;
  }, 1000);

  return container;
};

export default FPSDisplay;
