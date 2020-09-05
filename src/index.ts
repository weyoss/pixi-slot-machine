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

const { gameWidth, gameHeight, reelsPosition, buttonPosition, FPSDisplayPosition } = config;

export default function main() {
  let app: PIXI.Application;

  function loadAssets(): void {
    const loader = PIXI.Loader.shared;
    Button.load(loader);
    Reels.load(loader);
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

    const button = Button();
    button.setOnclick((instance) => {
      if (instance.isActive()) {
        instance.setActive(false);
        rotate(() => {
          instance.setActive(true);
        });
      }
    });
    const btnContainer = button.getContainer();
    btnContainer.position.set(buttonPosition.x, buttonPosition.y);
    stage.addChild(btnContainer);

    const fpsDisplayContainer = FPSDisplay(app.ticker);
    fpsDisplayContainer.position.set(FPSDisplayPosition.x, FPSDisplayPosition.y);
    stage.addChild(fpsDisplayContainer);
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
