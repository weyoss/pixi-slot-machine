/**
 * Just for simplicity and demonstration purposes, no specific JavaScript framework or state management library has
 * been used.
 */

import * as PIXI from 'pixi.js';

import Reels from './Reels';
import Button from './Button';
import FPSCounter from './FPSCounter';

import './style.css';
import btnPlayAsset from './assets/playbtn.png';
import btnPlayInactiveAsset from './assets/playbtn_inactive.png';
import reelCeelsAsset from './assets/reel_cells.png';

export default function main() {
  const gameWidth = 800;
  const gameHeight = 600;
  let app: PIXI.Application;

  function loadAssets(): void {
    const loader = PIXI.Loader.shared;
    loader.add('playbtn', btnPlayAsset);
    loader.add('playbtn_inactive', btnPlayInactiveAsset);
    loader.add('reel_cells', reelCeelsAsset);
    loader.onComplete.once(setup);
    loader.load();
  }

  function setup(): void {
    createRenderer();

    const stage = app.stage;

    const reels = Reels();
    stage.addChild(reels.getContainer());

    const button = Button((cb: Function) => reels.rotate(cb));
    stage.addChild(button);

    const container = FPSCounter(app.ticker);
    stage.addChild(container);
  }

  function createRenderer(): void {
    app = new PIXI.Application({
      backgroundColor: 0xd3d3d3,
      width: gameWidth,
      height: gameHeight
    });

    document.body.appendChild(app.view);

    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.scale.x = window.innerWidth / gameWidth;
    app.stage.scale.y = window.innerHeight / gameHeight;

    window.addEventListener('resize', onResize);
  }

  function onResize(): void {
    if (!app) {
      return;
    }
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.scale.x = window.innerWidth / gameWidth;
    app.stage.scale.y = window.innerHeight / gameHeight;
  }

  window.onload = (): void => {
    loadAssets();
  };
}

main();
