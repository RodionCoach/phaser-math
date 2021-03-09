import { PATH_SPRITES } from "../utils/constants";
class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene",
      pack: {
        files: [
          {
            type: "plugin",
            key: "rexwebfontloaderplugin",
            url:
              "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js",
            start: true,
          },
        ],
      },
    });
  }
  preload() {
    const progressBox = this.add.graphics();
    const progress = this.add.graphics();

    // Register a load progress event to show a load bar
    this.load.on("progress", value => {
      progress.clear();
      progressBox.fillStyle(0xfffffff, 0.8);
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, this.sys.game.config.height / 2, +this.sys.game.config.width * value, 60);
    });

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on("complete", () => {
      progress.destroy();
      progressBox.destroy();
      this.scene.start("StartScene");
    });

    this.load.multiatlas("actors", `${PATH_SPRITES}/actors/actors.json`, `${PATH_SPRITES}/actors`);
    this.load.multiatlas("background", `${PATH_SPRITES}/background/background.json`, `${PATH_SPRITES}/background`);
    this.load.multiatlas("gui", `${PATH_SPRITES}/gui/gui.json`, `${PATH_SPRITES}/gui`);
    this.load.image("buttonBackground", "./assets/img/GUI_button_default.png");
    this.load.image("asnwerButton", "./assets/img/GUI_digit_button.png");
    this.load.image("resetButton", "./assets/img/GUI_reset_btn.png");
    this.load.image("setButton", "./assets/img/GUI_submit_btn.png");

    this.plugins.get("rexwebfontloaderplugin").addToScene(this);
    this.load.rexWebFont({
      google: {
        families: ["Lato:400,700,900"],
      },
    });
    // this.load.audio("mars-slow", "assets/sounds/Mars.wav");
    // this.load.audio("intro", "assets/sounds/Intro.wav");
  }
}

export default BootScene;
