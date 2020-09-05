import * as PIXI from 'pixi.js';

export default function FPSCounter(ticker: PIXI.Ticker) {
  const container = new PIXI.Container();
  container.position.set(220, 560);

  const fpsPanel = new PIXI.Text('', {
    fontSize: 20,
    fill: 0xff0000
  });

  setInterval(() => {
    const fps = ticker.FPS.toFixed(2);
    fpsPanel.text = `Timestamp: ${Date.now()}, FPS: ${fps}`;
  }, 1000);

  container.addChild(fpsPanel);
  return container;
}
