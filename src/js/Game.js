// @ts-check

import UI from "./UI";
import Background from "./Background";
import InputHandler from "./InputHandler";
import { Explosion, Fire, Partical, Projectile, Smoke } from "./effects"
import { Angular1, Angular2, Drone, Enemy, Lucky, Player, Whale } from "./Sprites";

export default class Game {
  constructor(width, height) {
    /** @type {number} */ this.width = width;
    /** @type {number} */ this.height = height;
    /** @type {Player} */ this.player = new Player(this);
    /** @type {InputHandler} */ this.input = new InputHandler(this);
    /** @type {UI} */ this.ui = new UI(this);
    /** @type {Background} */ this.background = new Background(this);
    /** @type {Array<string>} */ this.keys = [];
    /** @type {number} */ this.maxEnemies = 15;
    /** @type {number} */ this.enemyTimer = 0
    /** @type {number} */ this.enemyInterval = 750;
    /** @type {number} */ this.ammo = 10;
    /** @type {number} */ this.maxAmmo = 30;
    /** @type {number} */ this.ammoTimer = 0;
    /** @type {number} */ this.ammoInterval = 250;
    /** @type {Array<Enemy>} */ this.enemies = [];
    /** @type {Array<Explosion>} */ this.explosions = [];
    /** @type {Array<Partical>} */ this.particals = [];
    /** @type {boolean} */ this.gameOver = false;
    /** @type {boolean} */ this.debug = false;
    /** @type {number} */ this.score = 0;
    /** @type {number} */ this.winningScore = 200;
    /** @type {number} */ this.gameTime = 0;
    /** @type {number} */ this.timeLimit = 65000;
    /** @type {number} */ this.speed = 1;
  }

  /** @param {CanvasRenderingContext2D} ctx  */
  draw(ctx) {
    this.background.draw(ctx);
    this.player.draw(ctx);

    this.particals.forEach(/** @type {Partical} */(partical) => { partical.draw(ctx); });
    this.enemies.forEach(/** @type {Enemy} */(enemy) => {
      enemy.draw(ctx);
    });
    this.explosions.forEach(/** @type {Explosion} */(explosion) => { explosion.draw(ctx); });

    if (this.background.layer4) this.background.layer4.draw(ctx);
    this.ui.draw(ctx);

    if (this.player.porweUp) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#ffffbd';
      ctx.strokeRect(0, 0, this.width, this.height);
    }
  }

  update(deltaTime) {
    if (!this.gameOver) this.gameTime += deltaTime;
    if (this.gameTime > this.timeLimit) this.gameOver = true;
    this.background.update();
    if (this.background.layer4) this.background.layer4.update();
    this.player.update(deltaTime);

    if (this.score < 0) this.gameOver = true;
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else this.ammoTimer += deltaTime;

    if (this.enemyTimer > this.enemyInterval && !this.gameOver && this.enemies.length < this.maxEnemies) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else this.enemyTimer += deltaTime;

    this.particals.forEach(/** @type {Partical} */(partical) => { partical.update(); });
    this.explosions.forEach(/** @type {Explosion} */(explosion) => { explosion.update(deltaTime); });
    this.enemies.forEach(/** @type {Enemy} */(enemy) => {
      enemy.update();
      if (this.checkCollisions(this.player, enemy)) {
        enemy.markedForDeletion = true;
        this.addExplosion(enemy);
        for (let i = 0; i < enemy.lives; i += 1) {
          this.particals.push(new Partical(this, enemy.x + (enemy.width * 0.5), enemy.y + (enemy.height * 0.5)));
        }
        if (enemy.type === 'lucky') this.player.enterPowerUp();
        else if (!this.gameOver) this.score -= Math.floor(enemy.lives * 0.5);
      }
      this.player.projectiles.forEach(/** @type {Projectile} */(projectile) => {
        if (this.checkCollisions(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;
          this.particals.push(new Partical(this, enemy.x + (enemy.width * 0.5), enemy.y + (enemy.height * 0.5)));
          if (enemy.lives <= 0) {
            for (let i = 0; i < enemy.lives; i += 1) {
              this.particals.push(new Partical(this, enemy.x + (enemy.width * 0.5), enemy.y + (enemy.height * 0.5)));
            }
            enemy.markedForDeletion = true;
            this.addExplosion(enemy);
            if (enemy.type === 'whale') {
              for (let i = 0; i < 5; i += 1) {
                this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * (enemy.height * 0.5)))
              }
            }
            if (!this.gameOver) this.score += enemy.score;
            if (this.score >= this.winningScore) this.gameOver = true;
          }
        }
      })
    });

    this.explosions = this.explosions.filter(/** @type {Explosion} */(explosion) => !explosion.delete);
    this.particals = this.particals.filter(/** @type {Partical} */(partical) => !partical.delete);
    this.enemies = this.enemies.filter(/** @type {Enemy} */(enemy) => !enemy.markedForDeletion);
  }

  addEnemy() {
    const random = Math.random();
    if (random < 0.35) this.enemies.push(new Angular1(this));
    else if (random < 0.7) this.enemies.push(new Angular2(this));
    else if (random < 0.9) this.enemies.push(new Lucky(this));
    else this.enemies.push(new Whale(this));
  }

  /** @param {Enemy} enemy */
  addExplosion(enemy) {
    this.explosions.push(new Smoke(this, enemy.x + (enemy.width * 0.5), enemy.y+ (enemy.height * 0.5)));
    this.explosions.push(new Fire(this, enemy.x + (enemy.width * 0.5), enemy.y + (enemy.height * 0.5)));
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
