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
  }

  init({ currentScore }) {
    this.currentScore = currentScore;
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

    const distanceBetweenButtons = 40;

    const yourScoreText = this.add.text(0, 0, "Your Score:", SCORE_TITLE_STYLE);
    const scoreText = this.add.text(0, 0, `${this.currentScore}`, SCORE_NUMBERS_STYLE);
    const bestScoreText = this.add.text(0, 0, this.IsBestScore(), SCORE_TEXT_STYLE);
    const buttonRestart = new uiWidgets.TextButton(this, 0, 0, "buttonBackground", this.RestartGame, this).setText(
      "PLAY AGAIN",
      BUTTON_STYLE,
    );
    const buttonReturn = new uiWidgets.TextButton(this, 0, 0, "buttonBackground", this.ReturnToMainMenu, this).setText(
      "MAIN MENU",
      BUTTON_STYLE,
    );

    const column = new uiWidgets.Column(this, GAME_RESOLUTION.width / 2 - 60, 60);
    column.addNode(yourScoreText, 0, 0);
    column.addNode(scoreText, 0, 40);
    column.addNode(bestScoreText, 0, 60);
    column.addNode(buttonRestart, 0, 120);
    column.addNode(buttonReturn, 0, distanceBetweenButtons);
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

  RestartGame() {
    this.scene.stop("GameScene");
    this.scene.start("CountdownScene");
  }

  ReturnToMainMenu() {
    this.scene.start("StartScene");
  }
}

export default EndScene;
