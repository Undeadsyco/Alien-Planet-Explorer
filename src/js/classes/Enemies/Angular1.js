// ts-check

import Game from "../Game";
import Enemy from "./Enemy";

export default class Angular1 extends Enemy {
  /** @param {Game} */
  constructor(game) {
    super(game);
    /** @type {number} */ this.width = 228 * 0.2;
    /** @type {number} */ this.height = 169 * 0.2;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
  }
} 