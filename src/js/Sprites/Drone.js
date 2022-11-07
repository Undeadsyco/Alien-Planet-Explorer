// ts-check

import drone from '../../assets/enemies/drone.png';

import Game from "../Game";
import Enemy from "./Enemy";

export default class Drone extends Enemy {
  /** @param {Game} */
  constructor(game, x, y) {
    super(game);
    this.lives = 3;
    this.score = this.lives;
    this.x = x;
    this.y = y;
    this.width = 115;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.frameY = Math.floor(Math.random() * 2);
    this.img = new Image();
    this.img.src = drone;
    this.img.onload = () => {
      this.canDraw = true;
    }
    this.type = 'drone';
    this.speedX = Math.random() * -4.2 - 0.5;
  }
} 