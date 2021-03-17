import LilyContainer from "./lilyContainer";
import { exampleGenerator } from "../../utils/generators/numbers";
import { signGenerator } from "../../utils/generators/signs";
import { LILY_BONDARY_LIMIT, EXAMPLES_STYLE, EXAMPLES, TOTAL_LILIES, SIGNS } from "../../utils/constants";

export default class LilySpawner extends Phaser.GameObjects.GameObject {
  constructor(scene) {
    super(scene);

    scene.add.existing(this);
    this.speedIncrementer = 1;
    this.delta = 1;
    this.currentLiliesCount = 0;
    this.lilies = [];
    this.currentExample = 0;
    this.notGuessedCount = 0;
    this.guessedCount = 0;
    this.visibleLiliesCount = 0;
    let frameNamesWave = scene.anims.generateFrameNames("lily", {
      start: 1,
      end: 4,
      zeroPad: 4,
      prefix: "wave/",
      suffix: ".png",
    });
    scene.anims.create({ key: "wave", frames: frameNamesWave, frameRate: 4, repeat: -1 });

    let frameNamesSolved = scene.anims.generateFrameNames("lily", {
      start: 1,
      end: 11,
      zeroPad: 4,
      prefix: "solved/",
      suffix: ".png",
    });
    scene.anims.create({ key: "solved", frames: frameNamesSolved, frameRate: 10, repeat: 0 });

    let frameNamesLine = scene.anims.generateFrameNames("lily", {
      start: 1,
      end: 5,
      zeroPad: 4,
      prefix: "line/",
      suffix: ".png",
    });
    scene.anims.create({ key: "line", frames: frameNamesLine, frameRate: 15, repeat: 0 });

    for (let i = 0; i < TOTAL_LILIES; i++) {
      let lilyContainer = new LilyContainer({
        scene,
        x: LilyContainer.config.startPos.x,
        y: LilyContainer.config.startPos.y,
      });
      lilyContainer.sprite.setTexture("lily", "wave/0001.png").setScale(1.1, 1.1);
      lilyContainer.sprite.on(
        Phaser.Animations.Events.ANIMATION_COMPLETE,
        () => {
          lilyContainer.SetStatus(false);
        },
        this,
      );
      lilyContainer.textObject.setStyle(EXAMPLES_STYLE).setOrigin(1, 0.5).setPosition(20, 0);
      lilyContainer.textObjectForSign.setStyle(EXAMPLES_STYLE).setOrigin(0, 0.5);
      this.lilies.push(lilyContainer);
    }
  }

  checkSomeExample(answerText) {
    const guessedLilyIndex = this.lilies.filter(
      (lily, index) => lily.answer === answerText,
    );

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
    this.currentExample = Phaser.Math.Between(0, EXAMPLES.length - 1);
    this.currentLiliesCount %= TOTAL_LILIES;
    const randInt = Phaser.Math.RND.integerInRange(186, 650);
    const lily = this.lilies[this.currentLiliesCount];
    this.visibleLiliesCount += 1;
    const example = exampleGenerator(signGenerator(SIGNS));
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
