interface ButtonStyle {
  fontSize: string;
  fixedHeight: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle?: string;
  color: string;
  align: string;
}

export interface GUIContainerConfig {
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

export interface InitData {
  currentScore: number;
}

export interface Score {
  pts: number;
  textObject: Phaser.GameObjects.Text;
}

export interface Example {
  number1: number;
  sign: string;
  number2: number;
  answer: number;
}
