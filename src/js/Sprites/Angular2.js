// ts-check

import angler from '../../assets/enemies/angler2.png';

import Game from "../Game";
import Enemy from "./Enemy";

export default class Angular2 extends Enemy {
  /** @param {Game} */
  constructor(game) {
    super(game);
    
    this.lives = 5;
    this.score = this.lives;
    this.width = 213;
    this.height = 165;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.frameY = Math.floor(Math.random() * 2);
    this.img = new Image();
    this.img.src = angler;
    this.img.onload = () => {
      this.canDraw = true;
    }
  }
} 