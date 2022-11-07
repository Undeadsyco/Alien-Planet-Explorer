// @ts-check
import Game from "./Game";

export default class Layer {
  /** @type {Game} */ #game
  /** @type {HTMLImageElement} */ #image
  /** @type {number} */ #speedModifier
  /** @type {number} */ #width
  /** @type {number} */ #height
  /** @type {number} */ #x
  /** @type {number} */ #y
  /**
   * 
   * @param {Game} game 
   * @param {HTMLImageElement} image 
   * @param {number} speedModifier 
   */
  constructor(game, image, speedModifier) {
    this.#game = game;
    this.#image = image;
    this.#speedModifier = speedModifier;
    this.#width = 1768;
    this.#height = 500;
    this.#x = 0;
    this.#y = 0;
  }

  get image() { return this.#image; }

  get modifier() { return this.#speedModifier; }
  set modifier(value) { this.#speedModifier = value; }

  update() {
    if (this.#x <= -this.#width ) this.#x = 0;
    this.#x -= this.#game.speed * this.#speedModifier;
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.drawImage(this.#image, this.#x, this.#y);
    ctx.drawImage(this.#image, this.#x + this.#width, this.#y);
  }
}
