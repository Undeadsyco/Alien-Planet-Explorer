// ts-check

import whale from '../../assets/enemies/hivewhale.png';

import Game from "../Game";
import Enemy from "./Enemy";

export default class Whale extends Enemy {
  /** @param {Game} */
  constructor(game) {
    super(game);
    this.lives = 15;
    this.score = this.lives;
    this.width = 400;
    this.height = 227;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.frameY = 0;
    this.img = new Image();
    this.img.src = whale;
    this.img.onload = () => {
      this.canDraw = true;
    }
    this.type = 'whale';
    this.speedX = Math.random() * -1.2 - 0.2;
  }
} 