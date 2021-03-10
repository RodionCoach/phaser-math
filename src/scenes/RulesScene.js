import uiWidgets from "phaser-ui-tools";
import { BUTTON_STYLE, RULES_STYLE, RULES_TEXT, GAME_RESOLUTION, TEXT_AREA_CONFIG_FOR_RULES } from "../utils/constants";

class RulesScene extends Phaser.Scene {
  constructor() {
    super({
      key: "RulesScene",
    });
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
    const rulesText = this.add.text(44, 32, RULES_TEXT, RULES_STYLE);
    const soundControl = this.add
      .image(20, 20, "gui", "sound_on.svg")
      .setOrigin(0)
      .setInteractive({ useHandCursor: true });

    const container = this.add
      .container(TEXT_AREA_CONFIG_FOR_RULES.x, TEXT_AREA_CONFIG_FOR_RULES.y)
      .setName("textArea");

    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRoundedRect(0, 0, TEXT_AREA_CONFIG_FOR_RULES.width, TEXT_AREA_CONFIG_FOR_RULES.height, 8);
    container.add(graphics);
    container.add(rulesText);

    const buttonReturn = new uiWidgets.TextButton(this, 0, 0, "buttonBackground", this.ReturnToMainMenu, this).setText(
      "MAIN MENU",
      BUTTON_STYLE,
    );
    const halfHeightOfButton = this.textures.get("buttonBackground").source[0].height / 2;
    const column = new uiWidgets.Column(
      this,
      GAME_RESOLUTION.width / 2,
      TEXT_AREA_CONFIG_FOR_RULES.y + TEXT_AREA_CONFIG_FOR_RULES.height + halfHeightOfButton + 40,
    );
    column.addNode(buttonReturn, 0, 0);

    //this.SetAudio();
  }

  SetAudio() {
    // Add and play the music
    this.music = this.sound.add("intro");
    this.music.play({
      loop: true,
    });
  }

  ReturnToMainMenu() {
    this.scene.start("StartScene");
  }
}

export default RulesScene;
