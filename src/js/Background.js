import image1 from '../assets/backgrounds/layer1.png';
import image2 from '../assets/backgrounds/layer2.png';
import image3 from '../assets/backgrounds/layer3.png';
import image4 from '../assets/backgrounds/layer4.png';

import Layer from './Layer';


export default class Background {
  /** @type {Array<Layer>} */ layers = [];
  /** @type {Layer} */ layer1;
  /** @type {Layer} */ layer2;
  /** @type {Layer} */ layer3;
  /** @type {Layer} */ layer4;
  
  constructor (game) {
    this.game = game;
    this.image1 = new Image();
    this.image1.src = image1;
    this.image1.onload = () => {
      this.layer1 = new Layer(this.game, this.image1, 0.2);
      this.layers.push(this.layer1);
    };

    this.image2 = new Image();
    this.image2.src = image2
    this.image2.onload = () => {
      this.layer2 = new Layer(this.game, this.image2, 0.4);
      this.layers.push(this.layer2);
    }
    this.image3 = new Image();
    this.image3.src = image3
    this.image3.onload = () => {
      this.layer3 = new Layer(this.game, this.image3, 1);
      this.layers.push(this.layer3);
    }
    this.image4 = new Image();
    this.image4.src = image4
    this.image4.onload = () => {
      this.layer4 = new Layer(this.game, this.image4, 1.5);
      // this.layers.push(this.layer4);
    }
  }

  update() {
    this.layers.forEach(layer => layer.update());
  }

  draw(ctx) {
    this.layers.forEach(layer => layer.draw(ctx));
  }
}
