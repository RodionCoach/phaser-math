import uiWidgets from "phaser-ui-tools";
import { BUTTON_STYLE, GAME_RESOLUTION } from "../utils/constants";
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
    this.soundControl = new SoundButton(this, 20, 20, "gui", "sound_on.svg", "sound_off_light.svg");
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

    this.sound.add("background");

    const buttonOne = new uiWidgets.TextButton(
      this,
      0,
      0,
      "buttonBackground",
      this.StartGame,
      this,
      "hover.png",
      "default.png",
      "pressed.png",
      "default.png",
    ).setText("NEW GAME", BUTTON_STYLE);
    const buttonTwo = new uiWidgets.TextButton(
      this,
      0,
      0,
      "buttonBackground",
      this.HowToPlay,
      this,
      "hover.png",
      "default.png",
      "pressed.png",
      "default.png",
    ).setText("HOW TO PLAY", BUTTON_STYLE);

    const column = new uiWidgets.Column(this, GAME_RESOLUTION.width / 2, GAME_RESOLUTION.height / 2 - 40);
    column.addNode(buttonOne, 0, 40);
    column.addNode(buttonTwo, 0, 40);

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
