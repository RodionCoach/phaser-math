import uiWidgets from "phaser-ui-tools";
import {
  BUTTON_STYLE,
  GAME_RESOLUTION,
  SCORE_TITLE_STYLE,
  SCORE_NUMBERS_STYLE,
  SCORE_TEXT_STYLE,
} from "../utils/constants";
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
    this.soundControl = this.add
      .image(20, 20, "gui", this.sound.mute ? "sound_off_light.svg" : "sound_on.svg")
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.ToggleAudio();
      })
      ?.setDepth(1);
    this.add.image(0, 0, "background", "background.png").setOrigin(0);
    this.add.shader(
      "cartoonWaterShader",
      GAME_RESOLUTION.width / 2,
      GAME_RESOLUTION.height / 2 - 75,
      GAME_RESOLUTION.width,
      GAME_RESOLUTION.height + 150,
      ["cartoonWater", "noiseWater", "noise"],
    );
    this.add.image(770, 670, "actors", "water_lily.png").setOrigin(0).setAngle(-135.0).setFlipY(true);

    this.sound.add("gameOver");

    const distanceBetweenButtons = 40;

    const yourScoreText = this.add.text(0, 0, "Your Score:", SCORE_TITLE_STYLE);
    const scoreText = this.add.text(0, 0, `${this.currentScore}`, SCORE_NUMBERS_STYLE);
    const bestScoreText = this.add.text(0, 0, this.IsBestScore(), SCORE_TEXT_STYLE);
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
    ).setText("PLAY AGAIN", BUTTON_STYLE);
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

    const column = new uiWidgets.Column(this, GAME_RESOLUTION.width / 2 - 60, 60);
    column.addNode(yourScoreText, 0, 0);
    column.addNode(scoreText, 0, 40);
    column.addNode(bestScoreText, 0, 60);
    column.addNode(buttonRestart, 0, 120);
    column.addNode(buttonReturn, 0, distanceBetweenButtons);

    this.SetAudio();
  }

  IsBestScore() {
    let prevBestScore = window.localStorage.getItem("best_score");
    if (prevBestScore === "undefined") {
      prevBestScore = 0;
    }

    if (prevBestScore < this.currentScore) {
      window.localStorage.setItem("best_score", this.currentScore);

      return "It is your best score!";
    }

    return `Your best Score is ${prevBestScore}`;
  }

  SetAudio() {
    // Add and play the music
    this.sound.get("gameOver").play();
  }

  ToggleAudio() {
    if (!this.sound.mute) {
      this.soundControl.setTexture("gui", "sound_off_light.svg");
    } else {
      this.soundControl.setTexture("gui", "sound_on.svg");
    }
    this.sound.mute = !this.sound.mute;
  }

  RestartGame() {
    this.sound.stopAll();
    this.scene.stop("GameScene");
    this.scene.start("CountdownScene");
  }

  ReturnToMainMenu() {
    this.sound.stopAll();
    this.scene.start("StartScene");
  }
}

export default EndScene;
