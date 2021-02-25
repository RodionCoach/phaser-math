export interface ButtonCreator {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text: string;
  style: Phaser.Types.GameObjects.Text.TextStyle;
  clb?: () => void;
}