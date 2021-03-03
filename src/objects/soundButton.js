export default class TextButton extends Phaser.GameObjects.Text {
  constructor({ scene, x, y, text, style, clb }) {
    super(scene, x, y, text, style);

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