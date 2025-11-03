// Start 03/11/2025
// Target: touch control glitches
const buttons = document.querySelectorAll('#touch-controls button');
buttons.forEach(btn => {
  btn.addEventListener('touchstart', e => e.preventDefault());
  btn.addEventListener('touchend', e => e.preventDefault());
});
// End 03/11/2025

// find and track the html elements
const player = document.getElementById('player');
const game = document.getElementById('game');
const menu = document.getElementById('controls-menu');
const touchControls = document.getElementById('touch-controls');

const speed = 4;
const keys = {};
let isJumping = false;
let velocityY = 0;
const jumpStrength = 15;
const gravity = 0.5;

// Initialize player position
player.style.left = '50px';
player.style.bottom = '20px';

// Track key presses and releases
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

function gameLoop() {
    // Players curent position
    let left = parseFloat(player.style.left);
    let bottom = parseFloat(player.style.bottom);

    // Move the player left or right while the keys are pressed
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) left -= speed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) left += speed;

    // stop the player at the border
    const gameWidth = game.clientWidth;
    left = Math.max(0, Math.min(left, gameWidth - player.offsetWidth));

    // if the jump key is pressed yeet the player into the air
    if ((keys['ArrowUp'] || keys['w'] || keys['W'] || keys[' ']) && !isJumping) {
        velocityY = jumpStrength;
        isJumping = true;
    }

    // if the player is yeeting into space absorb their energy and slow them down
    velocityY -= gravity;
    bottom += velocityY;

    if (bottom <= 20) {
        bottom = 20;
        velocityY = 0;
        isJumping = false;
    }

    // Set the players new position as its current position
    player.style.left = left + 'px';
    player.style.bottom = bottom + 'px';

    // Find the cameras current position
    const viewportWidth = document.getElementById('viewport').clientWidth;

    // Move the camera if not at the border
    const playerCenter = parseFloat(player.style.left) + player.offsetWidth / 2;
    let targetLeft = viewportWidth / 2 - playerCenter;

    // Dont let the player leave the game
    let gameLeft = parseFloat(game.style.left) || 0;
    targetLeft = Math.min(0, Math.max(targetLeft, viewportWidth - game.offsetWidth));

    game.style.left = gameLeft + (targetLeft - gameLeft) * 0.1 + 'px';

    requestAnimationFrame(gameLoop);
}

// Hide touch buttons by default so they dont show on the menu
touchControls.style.display = 'none';

// If keyboard mode is pressed hide touch controls, hide the menu and start the game
document.getElementById('keyboard-btn').addEventListener('click', () => {
  touchControls.style.display = 'none';
  menu.style.display = 'none';
  requestAnimationFrame(gameLoop); // Start game
});

// If touch mode is pressed show touch controls, hide the menu and start the game
document.getElementById('touch-btn').addEventListener('click', () => {
  touchControls.style.display = 'block';
  menu.style.display = 'none';
  requestAnimationFrame(gameLoop); // Start game
});

// Track button presses and releases
document.getElementById('move-left-btn').addEventListener('touchstart', () => {
    keys['ArrowLeft'] = true;
});
document.getElementById('move-left-btn').addEventListener('touchend', () => {
    keys['ArrowLeft'] = false;
});

document.getElementById('move-right-btn').addEventListener('touchstart', () => {
    keys['ArrowRight'] = true;
});
document.getElementById('move-right-btn').addEventListener('touchend', () => {
    keys['ArrowRight'] = false;
});

document.getElementById('jump-btn').addEventListener('touchstart', () => {
    if (!isJumping) {
        velocityY = jumpStrength;
        isJumping = true;
    }
});
