export default class lilyContainer extends Phaser.GameObjects.Container {
  static config = {
    startPos: {
      x: 0,
      y: 600,
    },
  };

  constructor({ scene, x, y, children }) {
    super(scene, x, y, children);
    scene.add.existing(this);

    this.sprite = scene.add.sprite(0, 0, "", "").disableInteractive();
    this.add(this.sprite);
    this.textObject = scene.add.text(0, 0, "", {}).disableInteractive();
    this.add(this.textObject);
    this.textObjectForSign = scene.add.text(0, 0, "", {}).disableInteractive();
    this.add(this.textObjectForSign);

    this.canMove = false;
    this.answer = 0;
  }

  SetStatus(status, answer) {
    this.canMove = status;
    this.y = lilyContainer.config.startPos.y;
    this.answer = answer;
  }
}
