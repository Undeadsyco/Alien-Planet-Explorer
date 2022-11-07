// @ts-check

import Game from "./Game";

export default class InputHandler {
  /** @param {Game} game */
  constructor(game) {
    /** @type {Game} */ this.game = game;
    window.addEventListener('keydown', (e) => {
      const isArrowKey = (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight');
      if (isArrowKey && (this.game.keys.indexOf(e.key) === -1)) this.game.keys.push(e.key);
      else if (e.key === ' ') this.game.player.shootTop();
      else if (e.key === 'd') this.game.debug = !this.game.debug;
    });
    window.addEventListener('keyup', (e) => {
      if (this.game.keys.indexOf(e.key) > -1) this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
    });
  }
}
