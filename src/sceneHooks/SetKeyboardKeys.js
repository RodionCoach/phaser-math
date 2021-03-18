export const SetKeyboardKeys = (scene, inputField) => {
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE).on("down", event => {
    scene.SetAnswerText(event.originalEvent.key, inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).on("down", event => {
    scene.CheckAnswer(inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE).on("down", event => {
    scene.ResetAnswerText(inputField.textObject, inputField.sprite);
  });
  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DELETE).on("down", event => {
    scene.ResetAnswerText(inputField.textObject, inputField.sprite);
  });
};