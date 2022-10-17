//ts-check

import Game from "./Game";
import Projectile from "./Projectile";

export default class Player {
  /** @param {Game} game */
  constructor(game) {
    /** @type {Game} */ this.game = game;
    /** @type {number} */ this.width = 120;
    /** @type {number} */ this.height = 190;
    /** @type {number} */ this.x = 20;
    /** @type {number} */ this.y = 100;
    /** @type {number} */ this.speedX = 0;
    /** @type {number} */ this.speedY = 0;
    /** @type {number} */ this.maxSpeed = 5;
    /** @type {Array<Projectile>} */ this.projectiles = [];
  }

  update() {
    if (this.game.keys.includes('ArrowUp') && this.y > 0) this.speedY = -this.maxSpeed;
    else if (this.game.keys.includes('ArrowDown') && this.y + this.height < this.game.height) this.speedY = this.maxSpeed;
    else this.speedY = 0;
    
    if (this.game.keys.includes('ArrowLeft') && this.x > 0) this.speedX = -this.maxSpeed;
    else if (this.game.keys.includes('ArrowRight') && this.x + this.width <= this.game.width * 0.25) this.speedX = this.maxSpeed;
    else this.speedX = 0;

    this.y += this.speedY;
    this.x += this.speedX;

    this.projectiles.forEach(/** @type {Projectile} */ (projectile) => {
      projectile.update();
    });
    this.projectiles = this.projectiles.filter(/** @type {Projectile} */ (projectile) => !projectile.markedForDeletion);
  }

  /** @param {CanvasRenderingContext2D} ctx  */
  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.projectiles.forEach(/** @type {Projectile} */ (projectile) => {
      projectile.draw(ctx);
    })
  }

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
      this.game.ammo--;
    }
  }
}
