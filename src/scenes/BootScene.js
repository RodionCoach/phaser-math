import { PATH_SPRITES } from "../utils/constants";
class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene",
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

    this.load.multiatlas("lily", `${PATH_SPRITES}/lily/lily.json`, `${PATH_SPRITES}/lily`);
    this.load.multiatlas("actors", `${PATH_SPRITES}/actors/actors.json`, `${PATH_SPRITES}/actors`);
    this.load.multiatlas("background", `${PATH_SPRITES}/background/background.json`, `${PATH_SPRITES}/background`);
    this.load.multiatlas("gui", `${PATH_SPRITES}/gui/gui.json`, `${PATH_SPRITES}/gui`);
    this.load.image("buttonBackground", "./assets/img/GUI_button_default.png");
    this.load.image("answerButton", "./assets/img/GUI_digit_button.png");
    this.load.image("resetButton", "./assets/img/GUI_reset_btn.png");
    this.load.image("setButton", "./assets/img/GUI_submit_btn.png");

    this.load.rexWebFont({
      google: {
        families: ["Lato:400,700,900"],
      },
    });
  }
}

export default BootScene;
