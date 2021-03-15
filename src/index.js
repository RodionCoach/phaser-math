import "phaser";
import BootScene from "./scenes/BootScene";
import StartScene from "./scenes/StartScene";
import GameScene from "./scenes/GameScene";
import PauseScene from "./scenes/PauseScene";
import RulesScene from "./scenes/RulesScene";
import CountdownScene from "./scenes/CountdownScene";
import EndScene from "./scenes/EndScene";
import WebFontLoaderPlugin from "phaser3-rex-plugins/plugins/webfontloader-plugin.js";

import { GAME_RESOLUTION, BACKGROUND_COLOR } from "./utils/constants";

const config = {
  type: Phaser.WEBGL,
  pixelArt: true,
  roundPixels: true,
  parent: "content",
  width: GAME_RESOLUTION.width,
  height: GAME_RESOLUTION.height,
  backgroundColor: BACKGROUND_COLOR,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
      debug: false,
    },
  },
  plugins: {
    global: [
      {
        key: "rexWebFontLoader",
        plugin: WebFontLoaderPlugin,
        start: true,
      },
    ],
  },
  scene: [BootScene, CountdownScene, StartScene, GameScene, PauseScene, EndScene, RulesScene],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
