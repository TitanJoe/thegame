const player = document.getElementById('player');
const game = document.getElementById('game');

const speed = 4;
const keys = {};
let isJumping = false;
let velocityY = 0;
const jumpStrength = 12;
const gravity = 0.5;

// Track key presses
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const jumpBtn = document.getElementById('jump');


// Initialize player position if missing
player.style.left = player.style.left || '50px';
player.style.bottom = player.style.bottom || '20px';

// Game loop
function gameLoop() {
    let left = parseInt(player.style.left) || 50;

    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        left -= speed;
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        left += speed;
    }

    if ((keys['ArrowUp'] || keys['w'] || keys['W'] || keys[' ']) && !isJumping) {
        velocityY = jumpStrength;
        isJumping = true;
    }

    velocityY -= gravity;
    let bottom = parseFloat(player.style.bottom) || 20;
    bottom += velocityY;

    if (bottom <= 20) {
        bottom = 20;
        velocityY = 0;
        isJumping = false;
    }

    const gameWidth = game.clientWidth;
    if (left < 0) left = 0;
    if (left > gameWidth - player.offsetWidth) left = gameWidth - player.offsetWidth;

    player.style.left = left + 'px';
    player.style.bottom = bottom + 'px';

    requestAnimationFrame(gameLoop); // repeat
}

// Start the loop
requestAnimationFrame(gameLoop);

leftBtn.addEventListener('touchstart', () => keys['ArrowLeft'] = true);
leftBtn.addEventListener('touchend',   () => keys['ArrowLeft'] = false);

rightBtn.addEventListener('touchstart', () => keys['ArrowRight'] = true);
rightBtn.addEventListener('touchend',   () => keys['ArrowRight'] = false);

jumpBtn.addEventListener('touchstart', () => {
  if (!isJumping) velocityY = jumpStrength;
  isJumping = true;
});