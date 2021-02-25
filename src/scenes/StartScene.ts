import { MenuButton } from "../objects";
class StartScene extends Phaser.Scene {
  private startGameKey: Phaser.Input.Keyboard.Key | null = null;
  private textButtonStart: MenuButton | null = null;
  private textButtonRules: MenuButton | null = null;

  constructor() {
    super({
      key: "StartScene"
    });
  }

  create() {
    this.add.image(0, 0, "background", "water_background").setOrigin(0);
    this.add.image(0, 0, "gui", "input_field").setOrigin(0);
    this.add.image(0, 0, "gui", "sound_on").setOrigin(0);
  }

  update() {
    if (
      this.startGameKey &&
      Phaser.Input.Keyboard.JustDown(this.startGameKey)
    ) {
      this.StartGame();
    }
  }

  StartGame() {
    this.scene.start("GameScene");
  }
  
  HowToPlay() {
    this.scene.start("RulesScene");
  }
}

export default StartScene;
