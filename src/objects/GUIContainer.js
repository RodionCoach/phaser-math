class GUIContainer extends Phaser.GameObjects.Container {
  constructor({ scene, x, y }) {
    super(scene, x, y, null);
    scene.add.existing(this);

    this.sprite = scene.add.sprite(0, 0, "", "").disableInteractive();
    this.add(this.sprite);

    this.textObject = scene.add.text(0, 0, "", {}).disableInteractive();
    this.add(this.textObject);
  }
}

export { GUIContainer };
