// @ts-check

import Game from "./Game";

export default class UI {
  /** @param {Game} game */
  constructor(game) {
    /** @type {Game} */ this.game = game;
    /** @type {number} */ this.fontSize = 25;
    /** @type {string} */ this.fontFam = 'Bangers';
    /** @type {string} */ this.color = 'white'
  }
  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.save();
    ctx.font = `${this.fontSize}px ${this.fontFam}`;
    ctx.fillStyle = this.color;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
    ctx.shadowColor = 'black';
    //score
    ctx.fillText(`Score:${this.game.score}`, 20, 40);
    
    // timer
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    ctx.fillText(`Timer: ${formattedTime}`, 20, 100)

    // game over message
    if (this.game.gameOver) {
      ctx.textAlign = 'center';
      let message1;
      let message2;

      if (this.game.score >= this.game.winningScore) {
        message1 = 'Most Wonderus!!!';
        message2 = 'Well Explorer!'
      } else {
        message1 = 'Blast, You broke my ship!'
        message2 = 'Head for repares and try again.'
      }

      ctx.font = `70px ${this.fontFam}`;
      ctx.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
      ctx.font = `25px ${this.fontFam}`;
      ctx.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
    }
    
    //ammo
    if (this.game.player.porweUp) ctx.fillStyle = "#ffffbd";
    for (let i = 0; i < this.game.ammo; i += 1) { 
      ctx.fillRect(20 + 5 * i, 50, 3, 20);
    }

    ctx.restore();
  }
}
