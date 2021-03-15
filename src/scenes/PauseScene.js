import uiWidgets from "phaser-ui-tools";
import LilySpawner from "../sprites/lily/lilySpawner";
import { BUTTON_STYLE, GAME_RESOLUTION } from "../utils/constants";
class PauseScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PauseScene",
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

    const heightOfButton = this.textures.get("buttonBackground").source[0].height / 2;
    const halfHeightOfButton = heightOfButton / 2;
    const distanceBetweenButtons = 40;
    let deltaY = heightOfButton + halfHeightOfButton + distanceBetweenButtons;

    const buttonResume = new uiWidgets.TextButton(this, 0, 0, "buttonBackground", this.ResumeGame, this).setText(
      "RESUME",
      BUTTON_STYLE,
    );
    const buttonRestart = new uiWidgets.TextButton(this, 0, 0, "buttonBackground", this.RestartGame, this).setText(
      "RESTART",
      BUTTON_STYLE,
    );
    const buttonReturn = new uiWidgets.TextButton(this, 0, 0, "buttonBackground", this.ReturnToMainMenu, this).setText(
      "MAIN MENU",
      BUTTON_STYLE,
    );

    const column = new uiWidgets.Column(this, GAME_RESOLUTION.width / 2, GAME_RESOLUTION.height / 2 - deltaY);
    column.addNode(buttonResume, 0, distanceBetweenButtons);
    column.addNode(buttonRestart, 0, distanceBetweenButtons);
    column.addNode(buttonReturn, 0, distanceBetweenButtons);
  }

  ResumeGame() {
    this.scene.resume("GameScene");
    this.scene.stop("PauseScene");
  }

  RestartGame() {
    LilySpawner.notGuessedCount = 0;
    this.scene.stop("GameScene");
    this.scene.start("CountdownScene");
  }

  ReturnToMainMenu() {
    this.scene.stop("GameScene");
    this.scene.stop("PauseScene");
    this.scene.start("StartScene");
  }
}

export default PauseScene;
