import Lily from "./lily";

import { TOTAL_LILIES } from "../utils/constants";

export default class LilySpawner extends Phaser.GameObjects.GameObject {
  static notGuessedCount = 0;
  constructor(scene) {
    super(scene);

    scene.add.existing(this);
    this.speedIncrementer = 0;
    this.currentLiliesCount = 0;
    this.lilies = [];

    for (let i = 0; i < TOTAL_LILIES; i++) {
      this.lilies.push(
        new Lily({
          scene,
          texture: "actors",
          key: "water_lily.png",
          x: Lily.config.startPos.x,
          y: Lily.config.startPos.y,
        }),
      );
    }

    this.GetLily();
  }

  update(delta) {
    const activeLily = Phaser.Math.Clamp(this.currentLiliesCount - 1, 0, TOTAL_LILIES);

    if (this.lilies[activeLily].y < this.scene.game?.config?.height - 140) {
      this.GetLily();
    }

    this.speedIncrementer += (delta / 1000) * 0.1;

    this.lilies.forEach(lily => {
      if (lily.CheckForReset()) {
        LilySpawner.notGuessedCount += 1;
      }

      lily.update(delta, this.speedIncrementer);
    });
  }

  GetLily() {
    this.currentLiliesCount %= TOTAL_LILIES;

    const randInt = Phaser.Math.RND.integerInRange(186, 650);
    const lily = this.lilies[this.currentLiliesCount];
    lily.SetStatus(true);
    lily.x = randInt;
    this.currentLiliesCount++;
  }
}
