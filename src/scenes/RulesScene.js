import uiWidgets from "phaser-ui-tools";
import { BUTTON_STYLE, RULES_STYLE, RULES_TEXT, GAME_RESOLUTION, TEXT_AREA_CONFIG_FOR_RULES } from "../utils/constants";
import SoundButton from "../objects/soundButton";

class RulesScene extends Phaser.Scene {
  constructor() {
    super({
      key: "RulesScene",
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
    const rulesText = this.add.text(44, 32, RULES_TEXT, RULES_STYLE);

    const container = this.add
      .container(TEXT_AREA_CONFIG_FOR_RULES.x, TEXT_AREA_CONFIG_FOR_RULES.y)
      .setName("textArea");

    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRoundedRect(0, 0, TEXT_AREA_CONFIG_FOR_RULES.width, TEXT_AREA_CONFIG_FOR_RULES.height, 8);
    container.add(graphics);
    container.add(rulesText);

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
    const halfHeightOfButton = buttonReturn.height / 2;
    const column = new uiWidgets.Column(
      this,
      GAME_RESOLUTION.width / 2,
      TEXT_AREA_CONFIG_FOR_RULES.y + TEXT_AREA_CONFIG_FOR_RULES.height + halfHeightOfButton + 40,
    );
    column.addNode(buttonReturn, 0, 0);
  }

  ReturnToMainMenu() {
    this.scene.start("StartScene");
  }
}

export default RulesScene;
