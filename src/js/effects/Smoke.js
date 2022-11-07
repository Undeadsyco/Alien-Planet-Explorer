import smoke from '../../assets/smokeExplosion.png';
import Game from '../Game';

import Explosion from "./Explosion";

export default class Smoke extends Explosion {
  /**
   * @param {Game} game 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(game, x, y) {
    super(game, x, y);

    this.img.src = smoke;
    this.img.onload = () => {
      this.canDraw = true;
    }
  }
}