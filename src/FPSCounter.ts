import * as PIXI from 'pixi.js';

export default function FPSCounter() {
  const container = new PIXI.Container();
  container.position.set(220, 560);

  const fpsPanel = new PIXI.Text('', {
    fontSize: 20,
    fill: 0xff0000
  });
  container.addChild(fpsPanel);

  const ticker = new PIXI.Ticker();
  ticker.add(() => {
    const fps = ticker.FPS.toFixed(2);
    fpsPanel.text = `Timestamp: ${Date.now()}, FPS: ${fps}`;
  });
  ticker.start();

  return container;
}
