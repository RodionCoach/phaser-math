const init = (game: Phaser.Game) => {
  game.registry.set("prevScore", 0);
  game.registry.set("gradingLevel", 5);
  window.parent.postMessage({ eventName: "onReady", name: window.name }, "*");
};

const onMessageHanlder = (game: Phaser.Game) => {
  window.addEventListener("message", (e: MessageEvent) => {
    if (e.data.eventName === "setCurrentState") {
      game.registry.set("prevScore", e.data.prevScore);
      game.registry.set("gradingLevel", e.data.gradingLevel);
    }
  });
};

const onGameOver = (game: Phaser.Game, score: number) => {
  if (game.registry.get("prevScore") <= score) {
    game.registry.set("prevScore", score);
  }

  window.parent.postMessage({ eventName: "updateScore", score }, "*");
};

export default { init, onMessageHanlder, onGameOver };
