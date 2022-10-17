//ts-check

import './styles/main.css';
import { Game } from './js/classes';

window.addEventListener('load', () => {
  // canvas setup
  /** @type {HTMLCanvasElement} */ const canvas = document.getElementById('canvas1');
  /** @param {CanvasRenderingContext2D} ctx */ const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth * 0.9, canvas.height = window.innerHeight * 0.8;

  /** @type {Game} */
  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(animate);
  }
  animate(0);
});