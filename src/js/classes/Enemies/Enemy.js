//ts-check

import Game from "../Game";

export default class Enemy {
  /** @param {Game} game */
  constructor(game) {
    /** @type {Game} */ this.game = game;
    /** @type {number} */ this.x = this.game.width;
    /** @type {number} */ this.speedX = Math.random() * -2.5 - 1.5;
    /** @type {boolean} */ this.markedForDeletion = false;
    /** @type {number} */ this.lives = 5
    /** @type {number} */ this.score = this.lives;
  }

  update() {
    this.x += this.speedX;
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  /** @param {CanvasRenderingContext2D}  ctx*/
  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '20px Helvetica';
    ctx.fillText(this.lives, this.x, this.y);
  }
}
