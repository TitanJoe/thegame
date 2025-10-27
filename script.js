const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player properties
const player = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    velocityY: 0,
    jumpPower: -15,
    gravity: 0.8,
    grounded: false
};

// Listen for jump
window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && player.grounded) {
        player.velocityY = player.jumpPower;
        player.grounded = false;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player physics
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Stop at ground
    if (player.y + player.height > canvas.height - 100) {
        player.y = canvas.height - 100 - player.height;
        player.velocityY = 0;
        player.grounded = true;
    }

    // Draw ground
    ctx.fillStyle = "#3d8b3d";
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // Draw player
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(gameLoop);
}

gameLoop();
