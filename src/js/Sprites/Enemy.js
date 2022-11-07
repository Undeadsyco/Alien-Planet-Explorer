

import Game from "../Game";

export default class Enemy {
  /** @type {HTMLImageElement} */ img;
  /** @type {boolean} */ canDraw = false;
  /** @type {number} */ y;
  /** @type {number} */ width;
  /** @type {number} */ height;
  /** @type {number} */ frameY;
  /** @type {number} */ lives
  /** @type {number} */ score;
  /** @type {string} */ type;

  /** @param {Game} game */
  constructor(game) {
    /** @type {Game} */ this.game = game;
    /** @type {number} */ this.x = this.game.width;
    /** @type {number} */ this.speedX = Math.random() * -2.5 - 1.5;
    /** @type {boolean} */ this.markedForDeletion = false;
    this.frameX = 0;
    this.maxFrame = 37;
  }

  update() {
    this.x += this.speedX - this.game.speed;
    if (this.x + this.width < 0) this.markedForDeletion = true;

    if (this.frameX < this.maxFrame) this.frameX += 1;
    else this.frameX = 0;
  }

  /** @param {CanvasRenderingContext2D}  ctx*/
  draw(ctx) {
    if (this.game.debug) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = 'black';
      ctx.font = '20px Helvetica';
      ctx.fillText(this.lives, this.x, this.y);
    }
    if (this.canDraw) ctx.drawImage(
      this.img,
      this.frameX * this.width, this.frameY * this.height, this.width, this.height,
      this.x, this.y, this.width, this.height
    );
  }
}
