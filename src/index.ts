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
import reelCellsAsset from './assets/reel_cells.png';

const gameWidth = 800;
const gameHeight = 600;
const reelsPosition = { x: 120, y: 60 };
const buttonPosition = { x: 300, y: 440 };
const fpsPanelPosition = { x: 220, y: 560 };

export default function main() {
  let app: PIXI.Application;

  function loadAssets(): void {
    const loader = PIXI.Loader.shared;
    loader.add('playbtn', btnPlayAsset);
    loader.add('playbtn_inactive', btnPlayInactiveAsset);
    loader.add('reel_cells', reelCellsAsset);
    loader.onComplete.once(setup);
    loader.load();
  }

  function setup(): void {
    createRenderer();
    const stage = app.stage;

    const { rotate, getContainer } = Reels();
    const reelsContainer = getContainer();
    reelsContainer.position.set(reelsPosition.x, reelsPosition.y);
    stage.addChild(reelsContainer);

    const btnContainer = Button((cb: Function) => rotate(cb));
    btnContainer.position.set(buttonPosition.x, buttonPosition.y);
    stage.addChild(btnContainer);

    const fpsContainer = FPSCounter(app.ticker);
    fpsContainer.position.set(fpsPanelPosition.x, fpsPanelPosition.y);
    stage.addChild(fpsContainer);
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
