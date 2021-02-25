import { ButtonCreator } from "../utils/types";
declare class TextButton extends Phaser.GameObjects.Text {
    constructor({ scene, x, y, text, style, clb }: ButtonCreator);
    enterButtonHoverState(): void;
    enterButtonRestState(): void;
    enterButtonActiveState(): void;
}
export default TextButton;
