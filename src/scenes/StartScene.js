import "phaser-ui-tools";
import { BUTTON_STYLE, GAME_RESOLUTION } from "../utils/constants";
class StartScene extends Phaser.Scene {
  startGameKey = null;

  constructor() {
    super({
      key: "StartScene",
    });
  }

  create() {
    this.add.image(0, 0, "background", "background.png").setOrigin(0);
    this.add.image(349, 85, "background", "wave1.png").setOrigin(0);
    this.add.image(136, 97, "background", "wave2.png").setOrigin(0);
    this.add.image(429, 141, "background", "wave2.png").setOrigin(0);
    this.add.image(702, 217, "background", "wave3.png").setOrigin(0);
    this.add.image(615, 430, "background", "wave4.png").setOrigin(0);
    this.add.image(128, 443, "background", "wave5.png").setOrigin(0);
    this.add.image(632, 72, "background", "wave6.png").setOrigin(0);
    this.add.image(149, 207, "background", "wave6.png").setOrigin(0);
    this.add.image(371, 229, "background", "wave6.png").setOrigin(0);
    this.add.image(301, 351, "background", "wave7.png").setOrigin(0);
    this.add.image(608, 316, "background", "wave7.png").setOrigin(0);
    this.add.image(770, 670, "actors", "water_lily.png").setOrigin(0).setAngle(-135.0).setFlipY(true);

    const soundControl = this.add
      .image(20, 20, "gui", "sound_on.svg")
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });

    const buttonOne = new uiWidgets.TextButton(this, 0, 0, "buttonBackground", this.StartGame, this).setText(
      "NEW GAME",
      BUTTON_STYLE,
    );
    const buttonTwo = new uiWidgets.TextButton(this, 0, 0, "buttonBackground", this.HowToPlay, this).setText(
      "HOW TO PLAY",
      BUTTON_STYLE,
    );

    const column = new uiWidgets.Column(this, GAME_RESOLUTION.width / 2, GAME_RESOLUTION.height / 2 - 40);
    column.addNode(buttonOne, 0, 40);
    column.addNode(buttonTwo, 0, 40);

    //this.SetAudio();
  }

  update() {
    if (this.startGameKey && Phaser.Input.Keyboard.JustDown(this.startGameKey)) {
      this.StartGame();
    }
  }

  SetAudio() {
    // Add and play the music
    this.music = this.sound.add("intro");
    this.music.play({
      loop: true,
    });
  }

  StartGame() {
    // this.scene.start("GameScene");
    this.scene.start("CountdownScene");
  }

  HowToPlay() {
    this.scene.start("RulesScene");
  }
}

export default StartScene;
