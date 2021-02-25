import { TextButton } from "./gui";
import { ButtonCreator } from "../utils/types";
import { BUTTON_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR_CLICK } from "../utils/constants";

class MenuButton extends TextButton {
  constructor({ scene, x, y, text, style, clb }: ButtonCreator) {
    super(scene);

    this.setInteractive({ useHandCursor: true })
      .on("pointerout", () => this.enterButtonRestState())
      .on("pointerdown", () => this.enterButtonActiveState())
      .on("pointerup", () => {
        this.enterButtonHoverState();

        if (clb) clb();
      });
  }

  enterButtonHoverState() {
    this.setStyle({ backgroundColor: BUTTON_BACKGROUND_COLOR });
  }

  enterButtonRestState() {
    this.setStyle({ backgroundColor: BUTTON_BACKGROUND_COLOR });
  }

  enterButtonActiveState() {
    this.setStyle({ backgroundColor: BUTTON_BACKGROUND_COLOR_CLICK });
  }
}

export default MenuButton;