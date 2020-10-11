import * as PIXI from 'pixi.js';
import { ConfigInterface } from '../../config/contract';

class FPSDisplay extends PIXI.Container {
  protected textStyle: Partial<PIXI.TextStyle> = {
    fontSize: 20,
    fill: '#F4802C',
    align: 'right'
  };

  constructor(config: ConfigInterface, ticker: PIXI.Ticker) {
    super();
    this.position.set(config.FPSDisplayPosition.x, config.FPSDisplayPosition.y);
    const content = new PIXI.Text('', this.textStyle);
    this.addChild(content);

    setInterval(() => {
      const fps = ticker.FPS.toFixed(2);
      content.text = `Timestamp: ${Date.now()} / FPS: ${fps}`;
    }, 1000);
  }
}

export default FPSDisplay;
