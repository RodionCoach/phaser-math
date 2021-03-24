import { DEPTH_LAYERS, GAME_RESOLUTION } from "../utils/constants";
import { BUTTON_STYLE } from "../utils/styles";
import { SetAudio } from "../sceneHooks/SetAudio";
import SoundButton from "../objects/soundButton";
import { GUIContainer } from "../objects/GUIContainer";
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
    this.add.shader(
      "cartoonWaterShader",
      GAME_RESOLUTION.width / 2,
      GAME_RESOLUTION.height / 2,
      GAME_RESOLUTION.width,
      GAME_RESOLUTION.height,
      ["cartoonWater", "noiseWater", "noise"],
    );
    this.add.image(770, 670, "actors", "water_lily.png").setOrigin(0).setAngle(-135.0).setFlipY(true);

    this.sound.add("background");

    const containerButton = this.add
      .container(GAME_RESOLUTION.width / 2, GAME_RESOLUTION.height / 2)
      .setName("containerButton")
      .setDepth(DEPTH_LAYERS.one);

    const newGameButton = new GUIContainer({
      scene: this,
      name: "newGameButton",
      x: 0,
      y: -50,
      text: "NEW GAME",
      textStyle: BUTTON_STYLE,
      texture: "buttonBackground",
      defaultFrame: "default.png",
      frameHover: "hover.png",
      pressedFrame: "pressed.png",
      depth: DEPTH_LAYERS.one,
      pointerDown: () => {
        this.StartGame();
      },
    });
    containerButton.add(newGameButton);

    const rulesGameButton = new GUIContainer({
      scene: this,
      name: "rulesGameButton",
      x: 0,
      y: 50,
      text: "HOW TO PLAY",
      textStyle: BUTTON_STYLE,
      texture: "buttonBackground",
      defaultFrame: "default.png",
      frameHover: "hover.png",
      pressedFrame: "pressed.png",
      depth: DEPTH_LAYERS.one,
      pointerDown: () => {
        this.HowToPlay();
      },
    });
    containerButton.add(rulesGameButton);

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
