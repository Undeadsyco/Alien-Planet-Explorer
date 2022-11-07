import fire from '../../assets/fireExplosion.png';

import Explosion from "./Explosion";

export default class Fire extends Explosion {
  constructor(game, x, y) {
    super(game, x, y);

    this.img.src = fire;
    this.img.onload = () => {
      this.canDraw = true;
    }
  }
}