// @ts-check

// @ts-ignore;
import player from '../../assets/player.png';

import Game from "../Game";
import Projectile from "../effects/Projectile";

export default class Player {
  /** @type {HTMLImageElement} */ img;
  canDraw = false;

  /** @param {Game} game */
  constructor(game) {
    /** @type {Game} */ this.game = game;
    /** @type {number} */ this.width = 120;
    /** @type {number} */ this.height = 190;
    /** @type {number} */ this.x = 20;
    /** @type {number} */ this.y = 100;
    /** @type {number} */ this.frameX = 0;
    /** @type {number} */ this.frameY = 0;
    /** @type {number} */ this.maxFrame = 37;
    /** @type {number} */ this.speedX = 0;
    /** @type {number} */ this.speedY = 0;
    /** @type {number} */ this.maxSpeed = 5;
    /** @type {Array<Projectile>} */ this.projectiles = [];
    /** @type {boolean} */ this.porweUp = false;
    /** @type {number} */ this.porweUpTimer = 0;
    /** @type {number} */ this.porweUpLimit = 10000;
    this.img = new Image();
    this.img.src = player;
    this.img.onload = () => {
      this.canDraw = true;
    }
  }

  update(deltaTime) {
    if (this.game.keys.includes('ArrowUp') && this.y + (this.height * 0.5)> 0) this.speedY = -this.maxSpeed;
    else if (this.game.keys.includes('ArrowDown') && this.y + (this.height * 0.5) < this.game.height) this.speedY = this.maxSpeed;
    else this.speedY = 0;

    if (this.game.keys.includes('ArrowLeft') && this.x > 0) this.speedX = -this.maxSpeed;
    else if (this.game.keys.includes('ArrowRight') && this.x + this.width <= this.game.width * 0.5) this.speedX = this.maxSpeed;
    else this.speedX = 0;

    this.y += this.speedY;
    this.x += this.speedX;

    this.projectiles.forEach(/** @type {Projectile} */(projectile) => {
      projectile.update();
    });
    this.projectiles = this.projectiles.filter(/** @type {Projectile} */(projectile) => !projectile.markedForDeletion);

    if (this.frameX < this.maxFrame) this.frameX += 1
    else this.frameX = 0;

    if (this.porweUp) {
      if (this.porweUpTimer > this.porweUpLimit) {
        this.porweUpTimer = 0;
        this.porweUp = false;
        this.frameY = 0;
      } else {
        this.porweUpTimer += deltaTime;
        this.frameY = 1;
        if (this.game.ammo < this.game.maxAmmo) this.game.ammo += 0.1;
      }
    }
  }

  /** @param {CanvasRenderingContext2D} ctx  */
  draw(ctx) {
    if (this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height);
    this.projectiles.forEach(/** @type {Projectile} */(projectile) => {
      projectile.draw(ctx);
    });
    if (this.canDraw) {
      ctx.drawImage(
        this.img,
        this.frameX * this.width, this.frameY * this.height, this.width, this.height,
        this.x, this.y, this.width, this.height
      );
    }
  }

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
      this.game.ammo--;
    }

    if (this.porweUp) this.shootBottom()
  }

  shootBottom() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175));
    }
  }

  enterPowerUp() {
    this.porweUpTimer = 0;
    this.porweUp = true;
    this.game.ammo = this.game.maxAmmo;
  }
}
