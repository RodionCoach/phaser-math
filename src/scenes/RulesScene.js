import uiWidgets from "phaser-ui-tools";
import { GAME_RESOLUTION } from "../utils/constants";
import { BUTTON_STYLE, RULES_STYLE } from "../utils/stylies";
import SoundButton from "../objects/soundButton";
import { configObjects } from "../utils/configObjects";

class RulesScene extends Phaser.Scene {
  constructor() {
    super({
      key: "RulesScene",
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
    const rulesText = this.add.text(
      configObjects.rulesTextArea.text.x,
      configObjects.rulesTextArea.text.y,
      configObjects.rulesTextArea.text.value,
      RULES_STYLE,
    );

    const container = this.add
      .container(configObjects.rulesTextArea.x, configObjects.rulesTextArea.y)
      .setName(configObjects.rulesTextArea.name);

    const graphics = this.add.graphics();
    graphics.fillStyle(configObjects.rulesTextArea.background.color, configObjects.rulesTextArea.background.alpha);
    graphics.fillRoundedRect(
      configObjects.rulesTextArea.background.x,
      configObjects.rulesTextArea.background.y,
      configObjects.rulesTextArea.background.width,
      configObjects.rulesTextArea.background.height,
      configObjects.rulesTextArea.background.borderRadius,
    );
    container.add(graphics);
    container.add(rulesText);

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
    const halfHeightOfButton = buttonReturn.height / 2;
    const column = new uiWidgets.Column(
      this,
      GAME_RESOLUTION.width / 2,
      configObjects.rulesTextArea.y +
        configObjects.rulesTextArea.background.height +
        halfHeightOfButton +
        configObjects.buttonContainer.buttonDistance.y,
    );
    column.addNode(buttonReturn);
  }

  ReturnToMainMenu() {
    this.scene.start("StartScene");
  }
}

export default RulesScene;
