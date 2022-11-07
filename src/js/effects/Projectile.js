import projectile from '../../assets/projectile.png';

import Game from "../Game";

export default class Projectile {
  /** @type {HTMLImageElement} */ img = new Image();
  /** @type {boolean} */ canDraw;

  /**
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
    this.img.src = projectile;
    this.img.onload = () => {
      this.canDraw = true;
    }
  }

  update() {
    this.x += this.speed;
    if (this.x > this.game.width * 0.95) this.markedForDeletion = true;
  }
  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    if (this.canDraw) ctx.drawImage(this.img, this.x, this.y);
  }
}
