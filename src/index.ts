/**
 * Just for simplicity and demonstration purposes, no specific JavaScript framework or state management library has
 * been used.
 */

import * as PIXI from 'pixi.js';
import { config } from './config';
import Button from './components/Button';
import Reels from './components/Reels';
import FPSDisplay from './components/FPSDisplay';

import './style.css';

const { gameWidth, gameHeight } = config;

function createApplication(): PIXI.Application {
  const app = new PIXI.Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight
  });
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.stage.scale.x = window.innerWidth / gameWidth;
  app.stage.scale.y = window.innerHeight / gameHeight;
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.scale.x = window.innerWidth / gameWidth;
    app.stage.scale.y = window.innerHeight / gameHeight;
  });
  return app;
}

function loadAssets(onComplete: () => void): void {
  const loader = PIXI.Loader.shared;
  Button.load(loader);
  Reels.load(loader);
  loader.onComplete.once(onComplete);
  loader.load();
}

function render(app: PIXI.Application) {
  document.body.appendChild(app.view);
}

window.onload = () =>
  loadAssets(() => {
    const app = createApplication();
    const stage = app.stage;

    const button = new Button(config);
    stage.addChild(button);

    const reels = new Reels(config, app.ticker);
    stage.addChild(reels);

    const fpsDisplay = new FPSDisplay(config, app.ticker);
    stage.addChild(fpsDisplay);

    button.onClick((instance) => {
      if (!reels.isRotating()) {
        instance.setActive(false);
        reels.rotate(() => {
          instance.setActive(true);
        });
      }
    });

    render(app);
  });
