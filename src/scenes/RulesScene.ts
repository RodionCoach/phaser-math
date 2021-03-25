import { RULES_TEXT, GAME_RESOLUTION, TEXT_AREA_CONFIG_FOR_RULES, DEPTH_LAYERS } from "../utils/constants";
import { BUTTON_STYLE, RULES_STYLE } from "../utils/styles";
import SoundButton from "../objects/soundButton";
import { GUIContainer } from "../objects/GUIContainer";

class RulesScene extends Phaser.Scene {
  soundControl: SoundButton;

  constructor() {
    super({
      key: "RulesScene",
    });
  }

  create(): void {
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

    const container = this.add
      .container(GAME_RESOLUTION.width / 2, GAME_RESOLUTION.height / 2)
      .setName("textArea")
      .setDepth(DEPTH_LAYERS.one);

    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRoundedRect(
      -(TEXT_AREA_CONFIG_FOR_RULES.width / 2),
      -(TEXT_AREA_CONFIG_FOR_RULES.height / 2) - TEXT_AREA_CONFIG_FOR_RULES.y,
      TEXT_AREA_CONFIG_FOR_RULES.width,
      TEXT_AREA_CONFIG_FOR_RULES.height,
      8,
    );
    container.add(graphics);

    const rulesText = this.add.text(0, -TEXT_AREA_CONFIG_FOR_RULES.y, RULES_TEXT, RULES_STYLE).setOrigin(0.5);
    container.add(rulesText);

    const buttonReturn = new GUIContainer({
      scene: this,
      name: "buttonReturn",
      x: 0,
      y: TEXT_AREA_CONFIG_FOR_RULES.height / 2 + TEXT_AREA_CONFIG_FOR_RULES.y,
      text: "MAIN MENU",
      textStyle: BUTTON_STYLE,
      texture: "buttonBackground",
      defaultFrame: "default.png",
      frameHover: "hover.png",
      pressedFrame: "pressed.png",
      depth: DEPTH_LAYERS.one,
      pointerDown: () => {
        this.ReturnToMainMenu();
      },
    });
    container.add(buttonReturn);
  }

  ReturnToMainMenu(): void {
    this.scene.start("StartScene");
  }
}

export default RulesScene;
