const player = document.getElementById('player');
const game = document.getElementById('game');

const speed = 4;
const keys = {};
let isJumping = false;
let velocityY = 0;
const jumpStrength = 15;
const gravity = 0.5;

// Initialize player position
player.style.left = player.style.left || '50px';
player.style.bottom = player.style.bottom || '20px';

// Track keys
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

function gameLoop() {
    let left = parseFloat(player.style.left);
    let bottom = parseFloat(player.style.bottom);

    // Horizontal movement
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) left -= speed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) left += speed;

    // Clamp edges
    const gameWidth = game.clientWidth;
    left = Math.max(0, Math.min(left, gameWidth - player.offsetWidth));

    // Jump
    if ((keys['ArrowUp'] || keys['w'] || keys['W'] || keys[' ']) && !isJumping) {
        velocityY = jumpStrength;
        isJumping = true;
    }

    // Gravity
    velocityY -= gravity;
    bottom += velocityY;

    if (bottom <= 20) {
        bottom = 20;
        velocityY = 0;
        isJumping = false;
    }

    // Apply positions
    player.style.left = left + 'px';
    player.style.bottom = bottom + 'px';

    requestAnimationFrame(gameLoop);
}

// Start game loop
requestAnimationFrame(gameLoop);

// --- Additions for the 01/11/2025 12:30 ---

// --- Mobile touch controls ---
document.getElementById('left').addEventListener('touchstart', () => {
  keys['ArrowLeft'] = true;
});
document.getElementById('left').addEventListener('touchend', () => {
  keys['ArrowLeft'] = false;
});

document.getElementById('right').addEventListener('touchstart', () => {
  keys['ArrowRight'] = true;
});
document.getElementById('right').addEventListener('touchend', () => {
  keys['ArrowRight'] = false;
});

document.getElementById('jump').addEventListener('touchstart', () => {
  if (!isJumping) {
    velocityY = jumpStrength;
    isJumping = true;
  }
});
