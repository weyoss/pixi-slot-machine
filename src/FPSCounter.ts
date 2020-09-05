import * as PIXI from 'pixi.js';

export default function FPSCounter(ticker: PIXI.Ticker): PIXI.Container {
  const container = new PIXI.Container();
  const fpsPanel = new PIXI.Text('', {
    fontSize: 20,
    fill: 0xff0000
  });
  container.addChild(fpsPanel);

  setInterval(() => {
    const fps = ticker.FPS.toFixed(2);
    fpsPanel.text = `Timestamp: ${Date.now()}, FPS: ${fps}`;
  }, 1000);

  return container;
}
