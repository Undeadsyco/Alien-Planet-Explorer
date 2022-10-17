import Game from "./Game";

export default class Projectile {
  /**
   * 
   * @param {Game} game 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(game, x, y) {
    /** @type {Game} */ this.game = game;
    /** @type {number} */ this.x = x;
    /** @type {number} */ this.y = y;
    /** @type {number} */  this.width = 10;
    /** @type {number} */ this.height = 3;
    /** @type {number} */  this.speed = 10;
    /** @type {boolean} */  this.markedForDeletion = false;
  }

  update() {
    this.x += this.speed;
    if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
  }
  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
