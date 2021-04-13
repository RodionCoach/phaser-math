const init = (game: Phaser.Game) => {
  game.registry.set("prevScore", 0);
  game.registry.set("gradingLevel", 5);
  window.parent.postMessage({ eventName: "onReady", id: window.name }, "*");

  window.addEventListener("message", (e: MessageEvent) => {
    console.log("inside_game_e.data.eventName", e.data.prevScore, e.data.gradingLevel);
    if (e.data.eventName === "setCurrentState") {
      console.log("inside_game_e.data.eventName", e.data.prevScore, e.data.gradingLevel);
      game.registry.set("prevScore", e.data.prevScore);
      game.registry.set("gradingLevel", e.data.gradingLevel);
    }
  });
  debugger;
};

const onGameOver = (game: Phaser.Game, score: number) => {
  if (game.registry.get("prevScore") <= score) {
    game.registry.set("prevScore", score);
  }
  debugger;
  window.parent.postMessage({ eventName: "updateScore", id: window.name, score }, "*");
};

export default { init, onGameOver };
