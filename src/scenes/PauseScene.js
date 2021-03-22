import uiWidgets from "phaser-ui-tools";
import { BUTTON_STYLE, GAME_RESOLUTION } from "../utils/constants";
import SoundButton from "../objects/soundButton";
class PauseScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PauseScene",
    });

    this.soundControl = null;
  }

  create() {
    this.soundControl = new SoundButton(this, 20, 20, "gui", "sound_on.svg", "sound_off_light.svg");
    this.add.shader(
      "cartoonWaterShader",
      GAME_RESOLUTION.width / 2,
      GAME_RESOLUTION.height / 2,
      GAME_RESOLUTION.width,
      GAME_RESOLUTION.height,
      ["cartoonWater", "noiseWater", "noise"],
    );
    this.add.image(770, 670, "actors", "water_lily.png").setOrigin(0).setAngle(-135.0).setFlipY(true);

    const buttonResume = new uiWidgets.TextButton(
      this,
      0,
      0,
      "buttonBackground",
      this.ResumeGame,
      this,
      "hover.png",
      "default.png",
      "pressed.png",
      "default.png",
    ).setText("RESUME", BUTTON_STYLE);
    const buttonRestart = new uiWidgets.TextButton(
      this,
      0,
      0,
      "buttonBackground",
      this.RestartGame,
      this,
      "hover.png",
      "default.png",
      "pressed.png",
      "default.png",
    ).setText("RESTART", BUTTON_STYLE);
    const buttonReturn = new uiWidgets.TextButton(
      this,
      0,
      0,
      "buttonBackground",
      this.ReturnToMainMenu,
      this,
      "hover.png",
      "default.png",
      "pressed.png",
      "default.png",
    ).setText("MAIN MENU", BUTTON_STYLE);
    const heightOfButton = buttonResume.height / 2;
    const halfHeightOfButton = heightOfButton / 2;
    const distanceBetweenButtons = 40;
    let deltaY = heightOfButton + halfHeightOfButton + distanceBetweenButtons;
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
    this.sound.stopAll();
    this.scene.stop("GameScene");
    this.scene.start("CountdownScene");
  }

  ReturnToMainMenu() {
    this.sound.stopAll();
    this.scene.stop("GameScene");
    this.scene.stop("PauseScene");
    this.scene.start("StartScene");
  }
}

export default PauseScene;
