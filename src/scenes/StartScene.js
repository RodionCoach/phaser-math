import uiWidgets from "phaser-ui-tools";
import { GAME_RESOLUTION } from "../utils/constants";
import { BUTTON_STYLE } from "../utils/stylies";
import { configObjects } from "../utils/configObjects";
import { SetAudio } from "../sceneHooks/SetAudio";
import SoundButton from "../objects/soundButton";

class StartScene extends Phaser.Scene {
  startGameKey = null;

  constructor() {
    super({
      key: "StartScene",
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

    this.sound.add(configObjects.soundsName.background);

    const buttonOne = new uiWidgets.TextButton(
      this,
      configObjects.menuButton.x,
      configObjects.menuButton.y,
      configObjects.menuButton.texture,
      this.StartGame,
      this,
      configObjects.menuButton.hoverFrame,
      configObjects.menuButton.defaultFrame,
      configObjects.menuButton.pressedFrame,
      configObjects.menuButton.defaultFrame,
    ).setText("NEW GAME", BUTTON_STYLE);
    const buttonTwo = new uiWidgets.TextButton(
      this,
      configObjects.menuButton.x,
      configObjects.menuButton.y,
      configObjects.menuButton.texture,
      this.HowToPlay,
      this,
      configObjects.menuButton.hoverFrame,
      configObjects.menuButton.defaultFrame,
      configObjects.menuButton.pressedFrame,
      configObjects.menuButton.defaultFrame,
    ).setText("HOW TO PLAY", BUTTON_STYLE);

    const column = new uiWidgets.Column(
      this,
      GAME_RESOLUTION.width / 2,
      GAME_RESOLUTION.height / 2 - configObjects.buttonContainer.buttonDistance.y,
    );
    column.addNode(
      buttonOne,
      configObjects.buttonContainer.buttonDistance.x,
      configObjects.buttonContainer.buttonDistance.y,
    );
    column.addNode(
      buttonTwo,
      configObjects.buttonContainer.buttonDistance.x,
      configObjects.buttonContainer.buttonDistance.y,
    );

    SetAudio(this, "background", 1.0, true);
  }

  update() {
    if (this.startGameKey && Phaser.Input.Keyboard.JustDown(this.startGameKey)) {
      this.StartGame();
    }
  }

  StartGame() {
    this.scene.start("CountdownScene");
  }

  HowToPlay() {
    this.scene.start("RulesScene");
  }
}

export default StartScene;
