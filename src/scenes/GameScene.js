import LilySpawner from "../sprites/lilySpawner";
import uiWidgets from "phaser-ui-tools";
import { GUIContainer } from "../objects/GUIContainer";
import { BUTTON_NUMBER_STYLE, GAME_RESOLUTION, SCORE_STYLE, TEXT_AREA_CONFIG_FOR_RULES } from "../utils/constants";

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });

    this.currentScoreDelay = 0;
    this.currentLifes = 4;
    this.hearts = [];
    this.lilySpawner = null;
    this.music = null;
    this.plusPts = null;
  }

  create() {
    const soundControl = this.add
      .image(20, 20, "gui", "sound_on.svg")
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
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

    this.plusPts = this.add.text(60, 395, "+100", SCORE_STYLE).setOrigin(0.5).setDepth(1).setVisible(false);
    this.add.image(0, 0, "background", "background.png").setOrigin(0);
    this.add.image(349, 85, "background", "wave1.png").setOrigin(0);
    this.add.image(136, 97, "background", "wave2.png").setOrigin(0);
    this.add.image(429, 141, "background", "wave2.png").setOrigin(0);
    this.add.image(702, 217, "background", "wave3.png").setOrigin(0);
    this.add.image(615, 430, "background", "wave4.png").setOrigin(0);
    this.add.image(128, 443, "background", "wave5.png").setOrigin(0);
    this.add.image(632, 72, "background", "wave6.png").setOrigin(0);
    this.add.image(149, 207, "background", "wave6.png").setOrigin(0);
    this.add.image(371, 229, "background", "wave6.png").setOrigin(0);
    this.add.image(301, 351, "background", "wave7.png").setOrigin(0);
    this.add.image(608, 316, "background", "wave7.png").setOrigin(0);
    this.add.image(0, 0, "background", "sand_left_side.png").setOrigin(0);
    this.add.image(698, 0, "background", "sand_right_side.png").setOrigin(0);
    this.add.image(49, 0, "background", "water_foam_dark.png").setOrigin(0);
    this.add.image(56, 0, "background", "water_foam_light.png").setOrigin(0).setDepth(1);
    this.add.image(56, 347, "actors", "boat.png").setAngle(-5.5);
    this.add.text(60, 335, "Score", SCORE_STYLE).setOrigin(0.5).setDepth(1);

    this.add.image(0, 449, "actors", "bridge.png").setOrigin(0).setDepth(1);
    //this.add.image(284, 1, "actors", "water_lily_small.png").setOrigin(0);
    this.add.image(765, 483, "actors", "leaves_stones_right.png").setOrigin(0).setDepth(1);
    this.add.image(0, 541, "actors", "leaves_stones_left.png").setOrigin(0).setDepth(1);

    const heartsGroup = new uiWidgets.Column(this, 755, 327);
    for (let i = 0; i < this.currentLifes; i++) {
      const heartFilled = this.add.sprite(0, 0, "gui", "filled_heart.svg").setOrigin(0).disableInteractive();
      heartsGroup.addNode(heartFilled, 0, 0);
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
      .container(GAME_RESOLUTION.width / 2 - 350, 547)
      .setName("containerDigitalGUI")
      .setDepth(1);
    for (let i = 1; i < 10; i++) {
      const digitalButton = new GUIContainer({
        scene: this,
        x: i * 70,
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
    //this.SetAudio();

    this.keys = {
      num0: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO),
      num1: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE),
      num3: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE),
      num2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO),
      num4: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR),
      num5: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE),
      num6: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX),
      num7: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN),
      num8: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT),
      num9: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE),
      key0: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO),
      key1: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
      key2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
      key3: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
      key4: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
      key5: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE),
      key6: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX),
      key7: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN),
      key8: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT),
      key9: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE),
      enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    };
    // let i = 0;
    // setInterval(() => {
    //   heartsGroup.list[i].setTexture("gui", "empty_heart.svg");
    //   i++;
    // }, 6500);
  }

  update(time, delta) {
    this.lilySpawner.update(delta);
    if (!LilySpawner.notGuessedCount) {
      for (let i = 0; i < this.hearts.length - LilySpawner.notGuessedCount; i++) {
        //console.log(this.lifes[i]);
      }
    }
  }

  SpawnObjects() {
    this.lilySpawner = new LilySpawner(this);
  }

  ResetAnswerText(inputTextObject, inputFieldObject) {
    inputTextObject.setText("");
    inputFieldObject.setTexture("inputField", "0001.png");
  }

  SetAnswerText(subString, inputTextObject, inputFieldObject) {
    let text = "";
    if (inputTextObject.text.length <= 5) {
      text = inputTextObject.text + subString;
    } else {
      text = subString;
    }
    inputTextObject.setText(text);
    inputFieldObject.setTexture("inputField", "0001.png");
  }

  CheckAnswer(inputTextObject, inputFieldObject) {
    if (inputTextObject.text !== "") {
      //TO DO
    } else {
      inputFieldObject.setTexture("inputField", "0002.png");
    }
    inputTextObject.setText("");
  }

  SetAudio() {
    // Add and play the music
    this.music = this.sound.add("mars-slow");
    this.music.play({
      loop: true,
    });
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
  }

  UpdateScore() {
    this.score.pts += 100;
    this.score.textObject.setText(this.score.pts);
    this.plusPts.setVisible(true);
    this.time.addEvent({
      delay: 1000,
      callback: () => this.plusPts.setVisible(false),
      callbackScope: this,
    });
  }

  ResetGame() {
    const score = this.score.pts;
    this.ResetMusic();
    this.ResetScore();

    this.scene.start("EndScene", {
      score: score,
    });
  }

  ResetMusic() {
    this.music.pause();
    this.music.seek = 0;
  }

  ResetScore() {
    this.score.pts = 0;
    this.score.textObject.setText(0);
  }
}

export default GameScene;
