import uiWidgets from "phaser-ui-tools";
import { GAME_RESOLUTION } from "../utils/constants";
import { BUTTON_STYLE } from "../utils/stylies";
import SoundButton from "../objects/soundButton";
import { configObjects } from "../utils/configObjects";

class PauseScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PauseScene",
    });

    this.soundControl = null;
  }

  create() {
    this.soundControl = new SoundButton(
      this,
      configObjects.soundControl.x,
      configObjects.soundControl.y,
      configObjects.soundControl.texture,
      configObjects.soundControl.frameOn,
      configObjects.soundControl.frameOff,
    );
    this.add.shader(
      configObjects.waterShader.name,
      GAME_RESOLUTION.width / 2,
      GAME_RESOLUTION.height / 2,
      GAME_RESOLUTION.width,
      GAME_RESOLUTION.height,
      [configObjects.waterShader.iChannel0, configObjects.waterShader.iChannel1, configObjects.waterShader.iChannel2],
    );
    this.add
      .image(
        configObjects.menuWaterLily.x,
        configObjects.menuWaterLily.y,
        configObjects.menuWaterLily.texture,
        configObjects.menuWaterLily.frame,
      )
      .setOrigin(configObjects.menuWaterLily.origin.x, configObjects.menuWaterLily.origin.y)
      .setAngle(configObjects.menuWaterLily.angle)
      .setFlipY(configObjects.menuWaterLily.setFlipY);

    const buttonResume = new uiWidgets.TextButton(
      this,
      configObjects.menuButton.x,
      configObjects.menuButton.y,
      configObjects.menuButton.texture,
      this.ResumeGame,
      this,
      configObjects.menuButton.hoverFrame,
      configObjects.menuButton.defaultFrame,
      configObjects.menuButton.pressedFrame,
      configObjects.menuButton.defaultFrame,
    ).setText("RESUME", BUTTON_STYLE);
    const buttonRestart = new uiWidgets.TextButton(
      this,
      configObjects.menuButton.x,
      configObjects.menuButton.y,
      configObjects.menuButton.texture,
      this.RestartGame,
      this,
      configObjects.menuButton.hoverFrame,
      configObjects.menuButton.defaultFrame,
      configObjects.menuButton.pressedFrame,
      configObjects.menuButton.defaultFrame,
    ).setText("RESTART", BUTTON_STYLE);
    const buttonReturn = new uiWidgets.TextButton(
      this,
      configObjects.menuButton.x,
      configObjects.menuButton.y,
      configObjects.menuButton.texture,
      this.ReturnToMainMenu,
      this,
      configObjects.menuButton.hoverFrame,
      configObjects.menuButton.defaultFrame,
      configObjects.menuButton.pressedFrame,
      configObjects.menuButton.defaultFrame,
    ).setText("MAIN MENU", BUTTON_STYLE);
    const heightOfButton = buttonResume.height / 2;
    const halfHeightOfButton = heightOfButton / 2;
    let deltaY = heightOfButton + halfHeightOfButton + configObjects.buttonContainer.buttonDistance.y;
    const column = new uiWidgets.Column(this, GAME_RESOLUTION.width / 2, GAME_RESOLUTION.height / 2 - deltaY);
    column.addNode(buttonResume, 0, configObjects.buttonContainer.buttonDistance.y);
    column.addNode(buttonRestart, 0, configObjects.buttonContainer.buttonDistance.y);
    column.addNode(buttonReturn, 0, configObjects.buttonContainer.buttonDistance.y);
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
