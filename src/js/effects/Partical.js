import partical from '../../assets/gears.png';

export default class Partical {
  /** @type {HTMLImageElement} */ img = new Image();
  /** @type {boolean} */ canDraw = false;

  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.spriteSize = 50;
    this.modifier = (Math.random() * 0.5 + 0.5).toFixed(1);
    this.size = this.spriteSize * this.modifier;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15;
    this.gravity = 0.5;
    this.delete = false;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1
    this.img.src = partical;
    this.img.onload = () => {
      this.canDraw = true;
    }

    this.bounced = 0;
    this.bottomBounce = Math.random() * 80 + 60;
  }

  update() {
    this.angle += this.va;
    this.speedY += this.gravity;
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.y > this.game.height + this.size || this.x < 0 - this.size) this.delete = true;
    if (this.y > this.game.height - this.bottomBounce && this.bounced < 2) {
      this.bounced += 1;
      this.speedY *= -0.5;
    }
  }

  draw(ctx) {
    if (this.canDraw) {
      ctx.save();

      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(
        this.img,
        this.frameX * this.size, this.frameY * this.size, this.size, this.size,
        this.size * -0.5, this.size * -0.5, this.size, this.size
      );

      ctx.restore();
    }
  }
}