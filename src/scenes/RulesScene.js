import uiWidgets from "phaser-ui-tools";
import { BUTTON_STYLE, RULES_STYLE, RULES_TEXT, GAME_RESOLUTION, TEXT_AREA_CONFIG_FOR_RULES } from "../utils/constants";

class RulesScene extends Phaser.Scene {
  constructor() {
    super({
      key: "RulesScene",
    });

    this.soundControl = null;
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

  ToggleAudio() {
    if (!this.sound.mute) {
      this.soundControl.setTexture("gui", "sound_off_light.svg");
    } else {
      this.soundControl.setTexture("gui", "sound_on.svg");
    }
    this.sound.mute = !this.sound.mute;
  }

  ReturnToMainMenu() {
    this.scene.start("StartScene");
  }
}

export default RulesScene;
