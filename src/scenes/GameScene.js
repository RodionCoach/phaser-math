import LilySpawner from "../sprites/lily/lilySpawner";
import { GUIContainer } from "../objects/GUIContainer";
import { SetKeyboardKeys } from "../sceneHooks/SetKeyboardKeys";
import { SetAudio, ToggleAudio } from "../sceneHooks/SetAudio";
import {
  BUTTON_NUMBER_STYLE,
  GAME_RESOLUTION,
  SCORE_STYLE,
  GAME_HEALTH_POINTS,
  TOTAL_LILIES,
} from "../utils/constants";

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });

    this.currentLifes = GAME_HEALTH_POINTS;
    this.prevHealthPoints = 0;
    this.heartsGroup = null;
    this.lilySpawner = null;
    this.music = null;
    this.plusPts = null;
    this.soundControl = null;
  }

  create() {
    this.soundControl = this.add
      .image(20, 20, "gui", this.sound.mute ? "sound_off_light.svg" : "sound_on.svg")
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        ToggleAudio(this);
      })
      ?.setDepth(1);
    const pauseControl = this.add
      .image(752, 24, "gui", "pause.svg")
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      ?.setDepth(1);
    pauseControl.on("pointerdown", () => {
      this.scene.launch("PauseScene");
      this.scene.pause();
    });

    this.plusPts = this.add.text(60, 395, "", SCORE_STYLE).setOrigin(0.5).setDepth(1).setVisible(false);
    this.add.image(0, 0, "background", "background.png").setOrigin(0);
    this.add.shader(
      "cartoonWaterShader",
      GAME_RESOLUTION.width / 2,
      GAME_RESOLUTION.height / 2,
      GAME_RESOLUTION.width - 75,
      GAME_RESOLUTION.height,
      ["cartoonWater", "noiseWater", "noise"],
    );

    this.add.image(0, 0, "background", "sand_left_side.png").setOrigin(0);
    this.add.image(698, 0, "background", "sand_right_side.png").setOrigin(0);
    this.add.image(56, 347, "actors", "boat.png").setAngle(-5.5);
    this.add.text(60, 335, "Score", SCORE_STYLE).setOrigin(0.5).setDepth(1);

    this.add.image(0, 449, "actors", "bridge.png").setOrigin(0).setDepth(1);
    this.add.image(765, 483, "actors", "leaves_stones_right.png").setOrigin(0).setDepth(1);
    this.add.image(0, 541, "actors", "leaves_stones_left.png").setOrigin(0).setDepth(1);

    this.sound.add("background");
    this.sound.add("wrong");
    this.sound.add("missed");
    this.sound.add("solved");

    this.heartsGroup = this.add.container(765, 355).setName("heartsGroup").setDepth(1);
    for (let i = 0; i < this.currentLifes; i++) {
      const heartFilled = this.add
        .sprite(0, i * 30, "gui", "filled_heart.svg")
        .setOrigin(0.5, 0.5)
        .disableInteractive();
      this.heartsGroup.add(heartFilled);
    }

    const containerInputGUI = this.add
      .container(GAME_RESOLUTION.width / 2, 477)
      .setName("containerInputGUI")
      .setDepth(1);

    const inputField = new GUIContainer({
      scene: this,
      x: 0,
      y: 0,
    })
      .setName("setButton")
      .setDepth(1)
      .setSize(100, 100)
      .disableInteractive();
    inputField.sprite.setTexture("gui", "inpul_field.png");
    inputField.textObject.setStyle(BUTTON_NUMBER_STYLE).setOrigin(0.5, 0.5);
    containerInputGUI.add(inputField);

    const resetButton = new GUIContainer({
      scene: this,
      x: -inputField.sprite.width / 2 - 40,
      y: 0,
    })
      .setName("resetButton")
      .setDepth(1)
      .setSize(100, 100)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.ResetAnswerText(inputField.textObject, inputField.sprite);
      });
    resetButton.sprite.setTexture("gui", "reset_btn.png");
    containerInputGUI.add(resetButton);

    const setButton = new GUIContainer({
      scene: this,
      x: inputField.sprite.width / 2 + 40,
      y: 0,
    })
      .setName("setButton")
      .setDepth(1)
      .setSize(100, 100)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.CheckAnswer(inputField.textObject, inputField.sprite);
      });
    setButton.sprite.setTexture("gui", "submit_btn.png");
    containerInputGUI.add(setButton);

    const containerDigitalGUI = this.add
      .container(GAME_RESOLUTION.width / 2 - 316, 547)
      .setName("containerDigitalGUI")
      .setDepth(1);
    for (let i = 0; i < 10; i++) {
      const digitalButton = new GUIContainer({
        scene: this,
        x: i === 0 ? 9 * 70 : (i - 1) * 70,
        y: 0,
      })
        .setName("digitalButton")
        .setDepth(1)
        .setSize(100, 100)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.SetAnswerText(i, inputField.textObject, inputField.sprite);
        });
      digitalButton.sprite.setTexture("gui", "digit_button.png");
      digitalButton.textObject.setStyle(BUTTON_NUMBER_STYLE).setOrigin(0.5, 0.5);
      digitalButton.textObject.setText(i);
      containerDigitalGUI.add(digitalButton);
    }

    this.SpawnObjects();
    this.SetScore();
    SetAudio(this, "background", 0.4, true);
    SetKeyboardKeys(this, inputField);
  }

  update(time, delta) {
    const renderedLily = Phaser.Math.Clamp(this.lilySpawner.currentLiliesCount - 1, 0, TOTAL_LILIES);
    if (
      this.lilySpawner.lilies[renderedLily].y < this.game?.config?.height - 200 ||
      !this.lilySpawner.visibleLiliesCount
    ) {
      this.lilySpawner.GetLily(() => {
        this.HeartsCallBack();
      });
    }

    this.lilySpawner.lilies.forEach(lily => {
      if (lily.tweenMove) {
        lily.tweenMove.timeScale = this.lilySpawner.speedIncrementer;
      }
    });

    this.soundControl.setTexture("gui", this.sound.mute ? "sound_off_light.svg" : "sound_on.svg");
  }

  HeartsCallBack() {
    if (this.prevHealthPoints !== this.lilySpawner.notGuessedCount) {
      this.prevNotGuessed = this.lilySpawner.notGuessedCount;
      this.tweens.add({
        targets: this.heartsGroup.getAll()[this.prevNotGuessed - 1],
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 170,
        yoyo: true,
        ease: "Quad.easeInOut",
        repeat: 0,
        onComplete: () => {
          this.PlayMissedSound();
          this.heartsGroup.getAll()[this.prevNotGuessed - 1].setTexture("gui", "empty_heart.svg");
        },
      });
      if (this.prevNotGuessed === this.currentLifes) {
        //ToDo: move it out
        this.time.addEvent({
          delay: 500,
          callback: () => this.ResetGame(),
          callbackScope: this,
        });
      }
    }
  }

  SpawnObjects() {
    this.lilySpawner = new LilySpawner(this);
    this.lilySpawner.GetLily(() => {
      this.HeartsCallBack();
    });
  }

  ResetAnswerText(inputTextObject, inputFieldObject, text) {
    inputTextObject.setText(text);
    inputFieldObject.setTexture("inputField", "0001.png");
  }

  WrongAnswerText(inputTextObject, inputFieldObject) {
    inputTextObject.setText("");
    inputFieldObject.setTexture("inputField", "0002.png");
  }

  SetAnswerText(subString, inputTextObject, inputFieldObject) {
    let text = "";
    if (inputTextObject.text.length <= 5) {
      text = inputTextObject.text + subString;
    } else {
      text = subString;
    }
    this.ResetAnswerText(inputTextObject, inputFieldObject, text);
  }

  CheckAnswer(inputTextObject, inputFieldObject) {
    if (inputTextObject.text !== "") {
      const guessedCount = this.lilySpawner.checkSomeExample(+inputTextObject.text);
      if (guessedCount) {
        this.PlaySolvedSound();
        this.UpdateScore(100 * guessedCount);
        this.ResetAnswerText(inputTextObject, inputFieldObject, "");
      } else {
        this.PlayWrongSound();
        this.WrongAnswerText(inputTextObject, inputFieldObject);
      }
    } else {
      this.WrongAnswerText(inputTextObject, inputFieldObject);
    }
  }

  PlaySolvedSound() {
    this.sound.get("solved").play();
  }

  PlayWrongSound() {
    this.sound.get("wrong").play();
  }

  PlayMissedSound() {
    this.sound.get("missed").play();
  }

  SetScore() {
    this.score = {
      pts: 0,
      textObject: this.make.text({
        x: 60,
        y: 355,
        textObject: "0",
        origin: {
          x: 0.5,
          y: 0.5,
        },
        style: SCORE_STYLE,
        add: true,
      }),
    };

    this.score.textObject.setText(this.score.pts);
  }

  UpdateScore(scores) {
    this.score.pts += scores;
    this.score.textObject.setText(this.score.pts);
    this.plusPts.setText(`+${scores}`).setVisible(true);
    this.time.addEvent({
      delay: 1000,
      callback: () => this.plusPts.setVisible(false),
      callbackScope: this,
    });
  }

  ResetGame() {
    LilySpawner.notGuessedCount = 0;
    this.sound.stopAll();
    this.scene.start("EndScene", {
      currentScore: this.score.pts,
    });
  }
}

export default GameScene;
