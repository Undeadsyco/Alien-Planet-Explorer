// ts-check

import angler from '../../assets/enemies/angler1.png';

import Game from "../Game";
import Enemy from "./Enemy";

export default class Angular1 extends Enemy {
  /** @param {Game} */
  constructor(game) {
    super(game);
    this.lives = 7;
    this.score = this.lives;
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.frameY = Math.floor(Math.random() * 3);
    this.img = new Image();
    this.img.src = angler;
    this.img.onload = () => {
      this.canDraw = true;
    }
  }
} 