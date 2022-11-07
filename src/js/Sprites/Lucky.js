// ts-check

import lucky from '../../assets/enemies/lucky.png';

import Game from "../Game";
import Enemy from "./Enemy";

export default class Lucky extends Enemy {
  /** @param {Game} */
  constructor(game) {
    super(game);
    this.lives = 3;
    this.score = this.lives * 3;
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.frameY = Math.floor(Math.random() * 2);
    this.img = new Image();
    this.img.src = lucky;
    this.img.onload = () => {
      this.canDraw = true;
    }
    this.type = 'lucky';
  }
} 