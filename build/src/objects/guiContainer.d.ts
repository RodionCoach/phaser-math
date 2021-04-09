interface ButtonStyle {
    fontSize: string;
    fixedHeight: number;
    fontFamily: string;
    fontWeight: string;
    fontStyle?: string;
    color: string;
    align: string;
}
interface GUIContainerConfig {
    scene: Phaser.Scene;
    name: string;
    x: number;
    y: number;
    text?: string;
    textStyle?: ButtonStyle;
    texture: string;
    defaultFrame: string;
    frameHover?: string;
    pressedFrame?: string;
    depth?: number;
    pointerDown?: () => void;
    pointerUp?: () => void;
    pointerOver?: () => void;
    pointerOut?: () => void;
}
declare class GUIContainer extends Phaser.GameObjects.Container {
    sprite: Phaser.GameObjects.Sprite;
    textObject: Phaser.GameObjects.Text;
    constructor({ scene, name, x, y, text, textStyle, texture, defaultFrame, frameHover, pressedFrame, depth, pointerDown, pointerUp, pointerOver, pointerOut, }: GUIContainerConfig);
}
export { GUIContainer };
