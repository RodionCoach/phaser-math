import LilyContainer from "./lilyContainer";
import { exampleGenerator } from "../../utils/generators/numbers";
import { LILY_BONDARY_LIMIT, TOTAL_LILIES } from "../../utils/constants";
import { EXAMPLES_STYLE } from "../../utils/stylies";
import { configObjects } from "../../utils/configObjects";

export default class LilySpawner extends Phaser.GameObjects.GameObject {
  constructor(scene) {
    super(scene);

    scene.add.existing(this);
    this.speedIncrementer = 1;
    this.delta = 1;
    this.currentLiliesCount = 0;
    this.lilies = [];
    this.notGuessedCount = 0;
    this.guessedCount = 0;
    this.visibleLiliesCount = 0;
    let frameNamesWave = scene.anims.generateFrameNames("lily", {
      start: 1,
      end: 4,
      zeroPad: 4,
      prefix: configObjects.lilySpawner.animation.prefixWave,
      suffix: configObjects.lilySpawner.animation.suffix,
    });
    scene.anims.create({ key: "wave", frames: frameNamesWave, frameRate: 4, repeat: -1 });

    let frameNamesSolved = scene.anims.generateFrameNames("lily", {
      start: 1,
      end: 11,
      zeroPad: 4,
      prefix: configObjects.lilySpawner.animation.prefixSolved,
      suffix: configObjects.lilySpawner.animation.suffix,
    });
    scene.anims.create({ key: "solved", frames: frameNamesSolved, frameRate: 10, repeat: 0 });

    let frameNamesLine = scene.anims.generateFrameNames("lily", {
      start: 1,
      end: 5,
      zeroPad: 4,
      prefix: configObjects.lilySpawner.animation.prefixLine,
      suffix: configObjects.lilySpawner.animation.suffix,
    });
    scene.anims.create({ key: "line", frames: frameNamesLine, frameRate: 15, repeat: 0 });

    for (let i = 0; i < TOTAL_LILIES; i++) {
      let lilyContainer = new LilyContainer({
        scene,
        x: LilyContainer.config.startPos.x,
        y: LilyContainer.config.startPos.y,
      });
      lilyContainer.sprite
        .setTexture(configObjects.lilySpawner.texture, configObjects.lilySpawner.frame)
        .setScale(configObjects.lilySpawner.divisionSign.scale.x, configObjects.lilySpawner.divisionSign.scale.y);
      lilyContainer.sprite.on(
        Phaser.Animations.Events.ANIMATION_COMPLETE,
        () => {
          lilyContainer.SetStatus(false);
        },
        this,
      );
      lilyContainer.textObject
        .setStyle(EXAMPLES_STYLE)
        .setOrigin(configObjects.lilySpawner.textObject.origin.x, configObjects.lilySpawner.textObject.origin.y)
        .setPosition(configObjects.lilySpawner.textObject.x, configObjects.lilySpawner.textObject.y);
      lilyContainer.textObjectForSign
        .setStyle(EXAMPLES_STYLE)
        .setOrigin(
          configObjects.lilySpawner.textObjectForSign.origin.x,
          configObjects.lilySpawner.textObjectForSign.origin.y,
        );
      this.lilies.push(lilyContainer);
    }
  }

  checkSomeExample(answerText) {
    const guessedLilyIndex = this.lilies.filter(lily => lily.answer === answerText);

    guessedLilyIndex.forEach(lily => {
      this.visibleLiliesCount -= 1;
      lily.answer = null;
      lily.tweenMove.stop();
      lily.spriteText.setVisible(false);
      lily.textObject.setText("");
      lily.textObjectForSign.setText("");
      lily.sprite.anims.play({
        key: "solved",
        frameRate: Phaser.Math.Between(15, 20),
      });
      this.speedIncrementer += (this.delta / 1000) * 0.05;
    });

    return guessedLilyIndex.length;
  }

  GetLily(HeartsCallBack = () => {}) {
    this.currentLiliesCount %= TOTAL_LILIES;
    const randInt = Phaser.Math.RND.integerInRange(
      configObjects.lilySpawner.rangeX.min,
      configObjects.lilySpawner.rangeX.max,
    );
    const lily = this.lilies[this.currentLiliesCount];
    this.visibleLiliesCount += 1;
    const example = exampleGenerator();
    lily.SetStatus(true, example.answer);
    lily.x = randInt;
    lily.spriteText.setVisible(true);
    lily.textObject.setText(`${example.number1}\n${example.number2}`);
    lily.textObjectForSign.setText(example.sign).setPosition(-lily.textObject.width, 0);
    this.currentLiliesCount += 1;
    lily.sprite.anims.play({
      key: "wave",
      frameRate: Phaser.Math.Between(2, 5),
    });

    lily.UpdateExampleTexture();
    lily.tweenMove = this.scene.tweens.add({
      targets: lily,
      y: LILY_BONDARY_LIMIT,
      duration: 10000,
      ease: "Linear",
      onComplete: () => {
        lily.answer = null;
        this.notGuessedCount++;
        HeartsCallBack();
        this.visibleLiliesCount -= 1;
        lily.spriteText.setVisible(false);
        lily.textObject.setText("");
        lily.textObjectForSign.setText("");
        lily.sprite.anims.stop();
        lily.sprite.anims.play({
          key: "line",
          frameRate: 15,
        });
      },
    });
  }
}
