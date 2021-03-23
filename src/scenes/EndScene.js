import uiWidgets from "phaser-ui-tools";
import { GAME_RESOLUTION } from "../utils/constants";
import { BUTTON_STYLE, SCORE_TITLE_STYLE, SCORE_NUMBERS_STYLE, SCORE_TEXT_STYLE } from "../utils/stylies";
import { SetAudio } from "../sceneHooks/SetAudio";
import SoundButton from "../objects/soundButton";
import { configObjects } from "../utils/configObjects";

class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: "EndScene",
    });

    this.currentScore = 0;
    this.soundControl = null;
  }

  init({ currentScore }) {
    this.currentScore = currentScore;
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

    this.sound.add(configObjects.soundsName.gameOver);

    const yourScoreText = this.add.text(0, 0, "Your Score:", SCORE_TITLE_STYLE);
    const scoreText = this.add.text(0, 0, `${this.currentScore}`, SCORE_NUMBERS_STYLE);
    const bestScoreText = this.add.text(0, 0, this.IsBestScore(), SCORE_TEXT_STYLE);
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
    ).setText("PLAY AGAIN", BUTTON_STYLE);
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

    const column = new uiWidgets.Column(
      this,
      GAME_RESOLUTION.width / 2 - configObjects.scoreText.textDistance.y,
      configObjects.scoreText.textDistance.y,
    );
    column.addNode(yourScoreText);
    column.addNode(
      scoreText,
      configObjects.buttonContainer.buttonDistance.x,
      configObjects.buttonContainer.buttonDistance.y,
    );
    column.addNode(
      bestScoreText,
      configObjects.buttonContainer.buttonDistance.x,
      configObjects.scoreText.textDistance.y,
    );
    column.addNode(
      buttonRestart,
      configObjects.buttonContainer.buttonDistance.x,
      configObjects.scoreText.textDistance.y * 2,
    );
    column.addNode(
      buttonReturn,
      configObjects.buttonContainer.buttonDistance.x,
      configObjects.buttonContainer.buttonDistance.y,
    );

    SetAudio(this, configObjects.soundsName.gameOver, 1.0, false);
  }

  IsBestScore() {
    let prevBestScore = window.localStorage.getItem("best_score");
    if (prevBestScore === "undefined" || prevBestScore === null) {
      prevBestScore = 0;
    }

    if (prevBestScore < this.currentScore) {
      window.localStorage.setItem("best_score", this.currentScore);

      return "It is your best score!";
    }

    return `Your best Score is ${prevBestScore}`;
  }

  RestartGame() {
    this.sound.stopAll();
    this.scene.start("CountdownScene");
  }

  ReturnToMainMenu() {
    this.sound.stopAll();
    this.scene.start("StartScene");
  }
}

export default EndScene;
