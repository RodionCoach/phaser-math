import TextButton from "../objects/textButton";

import { BUTTON_STYLE } from "../utils/constants";

class StartScene extends Phaser.Scene {
  private startGameKey: Phaser.Input.Keyboard.Key | null = null;
  private textButtonStart: TextButton | null = null;
  private textButtonRules: TextButton | null = null;

  constructor() {
    super({
      key: "StartScene"
    });
  }

  create() {
    this.startGameKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.textButtonStart = new TextButton({
      scene: this,
      x:
      this.game.renderer.width / 2 -
      BUTTON_STYLE?.fixedWidth,
    y:
      this.game.renderer.height / 2 -
      BUTTON_STYLE?.fixedWidth,
      text: "NEW GAME",
      style: BUTTON_STYLE,
      clb: this.StartGame
    });
    this.add.existing(this.textButtonStart);

    this.textButtonRules = new TextButton({
      scene: this,
      x:
        this.game.renderer.width / 2 -
        BUTTON_STYLE?.fixedWidth,
      y:
        this.game.renderer.height / 2 -
        BUTTON_STYLE?.fixedWidth,
      text: "HOW TO PLAY",
      style: BUTTON_STYLE,
      clb: () => {}
    });
    this.add.existing(this.textButtonRules);
    
  }

  update() {
    if (
      this.startGameKey &&
      Phaser.Input.Keyboard.JustDown(this.startGameKey)
    ) {
      this.StartGame();
    }
  }

  StartGame() {
    this.scene.start("GameScene");
  }

  Rules() {
    this.scene.start("RulesScene");
  }

  HowToPlay() {
    this.scene.start("RulesScene");
  }
}

export default StartScene;
