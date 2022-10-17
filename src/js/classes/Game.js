//ts-check

import Angular1 from "./Enemies/Angular1";
import Enemy from "./Enemies/Enemy";
import InputHandler from "./InputHandler";
import Player from "./Player";
import UI from "./UI";

export default class Game {
  constructor(width, height) {
    /** @type {number} */ this.width = width;
    /** @type {number} */ this.height = height;
    /** @type {Player} */ this.player = new Player(this);
    /** @type {InputHandler} */ this.input = new InputHandler(this);
    /** @type {UI} */ this.ui = new UI(this);
    /** @type {Array<string>} */ this.keys = [];
    /** @type {number} */ this.maxEnemies = 20;
    /** @type {number} */ this.enemyTimer = 0
    /** @type {number} */ this.enemyInterval = 1000;
    /** @type {number} */ this.ammo = 20;
    /** @type {number} */ this.maxAmmo = 50;
    /** @type {number} */ this.ammoTimer = 0;
    /** @type {number} */ this.ammoInterval = 250;
    /** @type {Array<Enemy>} */ this.enemies = [];
    /** @type {boolean} */ this.gameOver = false;
    /** @type {number} */ this.score = 0;
    /** @type {number} */ this.winningScore = 20;
    /** @type {number} */ this.gameTime = 0;
    /** @type {number} */ this.timeLimit = 5000;
  }

  update(deltaTime) {
    if (!this.gameOver) this.gameTime += deltaTime;
    if (this.gameTime > this.timeLimit) this.gameOver = true;
    this.player.update();
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else this.ammoTimer += deltaTime;

    if (this.enemyTimer > this.enemyInterval && !this.gameOver && this.enemies.length < this.maxEnemies) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else this.enemyTimer += deltaTime;

    this.enemies.forEach(/** @type {Enemy} */(enemy) => {
      enemy.update();
      if (this.checkCollisions(this.player, enemy)) {
        enemy.markedForDeletion = true;
      }
      this.player.projectiles.forEach(/** @type {Projectile} */(projectile) => {
        if (this.checkCollisions(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;
            if(!this.gameOver) this.score += enemy.score;
            if (this.score >= this.winningScore) this.gameOver = true;
          }
        }
      })
    });
    this.enemies = this.enemies.filter(/** @type {Enemy} */(enemy) => !enemy.markedForDeletion);
  }

  /** @param {CanvasRenderingContext2D} ctx  */
  draw(ctx) {
    this.player.draw(ctx);
    this.ui.draw(ctx);

    this.enemies.forEach(/** @type {Enemy} */(enemy) => {
      enemy.draw(ctx);
    });
  }

  addEnemy() {
    this.enemies.push(new Angular1(this));
  }

  checkCollisions(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    )
  }
}
