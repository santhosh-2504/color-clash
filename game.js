// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// const scoreDisplay = document.getElementById('score');
// const highScoreDisplay = document.getElementById('highScore');
// const targetColorDisplay = document.getElementById('targetColor');
// const gameOverScreen = document.getElementById('gameOver');
// const finalScoreDisplay = document.getElementById('finalScore');

// // Colors for tiles
// const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

// // Game state
// let score = 0;
// let highScore = localStorage.getItem('highScore') || 0;
// highScoreDisplay.textContent = highScore;
// let gameOver = false;
// let tiles = [];
// let targetColor;
// let speed = 2;
// let gameStarted = false;

// // Start button
// const startButton = document.createElement('button');
// startButton.textContent = 'Start Game';
// startButton.style.cssText = 'padding: 10px 20px; font-size: 16px; cursor: pointer; margin-top: 10px;';
// document.getElementById('ui').appendChild(startButton);

// startButton.addEventListener('click', () => {
//     if (!gameStarted) {
//         gameStarted = true;
//         startButton.style.display = 'none';
//         targetColor = getRandomColor();
//         targetColorDisplay.style.backgroundColor = targetColor;
//         gameLoop();
//     }
// });

// // Tile class
// class Tile {
//     constructor() {
//         this.x = Math.random() * (canvas.width - 50);
//         this.y = -50;
//         this.width = 50;
//         this.height = 50;
//         this.color = colors[Math.floor(Math.random() * colors.length)];
//         this.speed = speed;
//     }

//     update() {
//         this.y += this.speed;
//     }

//     draw() {
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }

// // Audio (commented out; uncomment if you add a local sound file)
// // const clickSound = new Audio('sounds/click.mp3');

// // Helper functions
// function getRandomColor() {
//     return colors[Math.floor(Math.random() * colors.length)];
// }

// function spawnTile() {
//     if (!gameOver && gameStarted && Math.random() < 0.02) {
//         tiles.push(new Tile());
//     }
// }

// function updateTargetColor() {
//     targetColor = getRandomColor();
//     targetColorDisplay.style.backgroundColor = targetColor;
// }

// // Handle clicks
// canvas.addEventListener('click', (e) => {
//     if (gameOver || !gameStarted) return;
//     const rect = canvas.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     for (let i = tiles.length - 1; i >= 0; i--) {
//         const tile = tiles[i];
//         if (
//             clickX >= tile.x &&
//             clickX <= tile.x + tile.width &&
//             clickY >= tile.y &&
//             clickY <= tile.y + tile.height
//         ) {
//             if (tile.color === targetColor) {
//                 score += 10;
//                 // clickSound.play().catch(() => {}); // Uncomment if audio is added
//                 tiles.splice(i, 1);
//                 speed += 0.1; // Increase difficulty
//                 scoreDisplay.textContent = score;
//                 updateTargetColor(); // Only change target color on correct click
//             } else {
//                 // Wrong color clicked: end game
//                 gameOver = true;
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'block';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             break;
//         }
//     }
// });

// // Game loop
// function gameLoop() {
//     if (gameOver || !gameStarted) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     spawnTile();
//     tiles = tiles.filter(tile => tile.y < canvas.height);

//     for (let tile of tiles) {
//         tile.update();
//         tile.draw();
//         if (tile.y >= canvas.height) {
//             if (tile.color === targetColor) {
//                 // Target-colored tile missed: end game
//                 gameOver = true;
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'block';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             // Remove tile regardless of color to avoid clutter
//             tiles = tiles.filter(t => t !== tile);
//         }
//     }

//     requestAnimationFrame(gameLoop);
// }

// // Restart game
// function restartGame() {
//     score = 0;
//     speed = 2;
//     tiles = [];
//     gameOver = false;
//     gameStarted = true;
//     scoreDisplay.textContent = score;
//     gameOverScreen.style.display = 'none';
//     startButton.style.display = 'none';
//     updateTargetColor();
//     gameLoop();
// }

// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// const scoreDisplay = document.getElementById('score');
// const highScoreDisplay = document.getElementById('highScore');
// const targetColorDisplay = document.getElementById('targetColor');
// const gameOverScreen = document.getElementById('gameOver');
// const finalScoreDisplay = document.getElementById('finalScore');
// const gameOverReason = document.getElementById('gameOverReason');

// // Colors for tiles
// const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

// // Game state
// let score = 0;
// let highScore = localStorage.getItem('highScore') || 0;
// highScoreDisplay.textContent = highScore;
// let gameOver = false;
// let tiles = [];
// let targetColor;
// let speed = 2;
// let gameStarted = false;

// // Start button
// const startButton = document.createElement('button');
// startButton.textContent = 'Start Game';
// startButton.style.cssText = 'padding: 10px 20px; font-size: 16px; cursor: pointer; margin-top: 10px;';
// document.getElementById('ui').appendChild(startButton);

// startButton.addEventListener('click', () => {
//     if (!gameStarted) {
//         gameStarted = true;
//         startButton.style.display = 'none';
//         targetColor = getRandomColor();
//         targetColorDisplay.style.backgroundColor = targetColor;
//         gameLoop();
//     }
// });

// // Tile class
// class Tile {
//     constructor() {
//         this.x = Math.random() * (canvas.width - 50);
//         this.y = -50;
//         this.width = 50;
//         this.height = 50;
//         this.color = colors[Math.floor(Math.random() * colors.length)];
//         this.speed = speed;
//     }

//     update() {
//         this.y += this.speed;
//     }

//     draw() {
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }

// // Audio (commented out; uncomment if you add a local sound file)
// // const clickSound = new Audio('sounds/click.mp3');

// // Helper functions
// function getRandomColor() {
//     return colors[Math.floor(Math.random() * colors.length)];
// }

// function spawnTile() {
//     if (!gameOver && gameStarted && Math.random() < 0.02) {
//         tiles.push(new Tile());
//     }
// }

// function updateTargetColor() {
//     targetColor = getRandomColor();
//     targetColorDisplay.style.backgroundColor = targetColor;
// }

// // Handle clicks
// canvas.addEventListener('click', (e) => {
//     if (gameOver || !gameStarted) return;
//     const rect = canvas.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     for (let i = tiles.length - 1; i >= 0; i--) {
//         const tile = tiles[i];
//         if (
//             clickX >= tile.x &&
//             clickX <= tile.x + tile.width &&
//             clickY >= tile.y &&
//             clickY <= tile.y + tile.height
//         ) {
//             if (tile.color === targetColor) {
//                 score += 10;
//                 // clickSound.play().catch(() => {}); // Uncomment if audio is added
//                 tiles.splice(i, 1);
//                 speed += 0.1; // Increase difficulty
//                 scoreDisplay.textContent = score;
//                 updateTargetColor(); // Change target color on correct click
//             } else {
//                 // Wrong color clicked: end game
//                 gameOver = true;
//                 gameOverReason.textContent = 'Wrong Color Clicked!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'block';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             break;
//         }
//     }
// });

// // Game loop
// function gameLoop() {
//     if (gameOver || !gameStarted) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     spawnTile();
//     tiles = tiles.filter(tile => tile.y < canvas.height);

//     for (let tile of tiles) {
//         tile.update();
//         tile.draw();
//         if (tile.y >= canvas.height) {
//             if (tile.color === targetColor) {
//                 // Target-colored tile missed: end game
//                 gameOver = true;
//                 gameOverReason.textContent = 'Missed Target Color!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'block';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             // Remove tile regardless of color to avoid clutter
//             tiles = tiles.filter(t => t !== tile);
//         }
//     }

//     requestAnimationFrame(gameLoop);
// }

// // Restart game
// function restartGame() {
//     score = 0;
//     speed = 2;
//     tiles = [];
//     gameOver = false;
//     gameStarted = true;
//     scoreDisplay.textContent = score;
//     gameOverScreen.style.display = 'none';
//     gameOverReason.textContent = ''; // Clear alert message
//     startButton.style.display = 'none';
//     updateTargetColor();
//     gameLoop();
// }

// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// const scoreDisplay = document.getElementById('score');
// const highScoreDisplay = document.getElementById('highScore');
// const targetColorDisplay = document.getElementById('targetColor');
// const gameOverScreen = document.getElementById('gameOver');
// const finalScoreDisplay = document.getElementById('finalScore');
// const gameOverReason = document.getElementById('gameOverReason');

// // Colors for tiles
// const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

// // Game state
// let score = 0;
// let highScore = localStorage.getItem('highScore') || 0;
// highScoreDisplay.textContent = highScore;
// let gameOver = false;
// let tiles = [];
// let targetColor;
// let speed = 2;
// const maxSpeed = 6; // Speed cap
// let gameStarted = false;
// let lastTime = performance.now(); // For time-based speed increase

// // Start button
// const startButton = document.createElement('button');
// startButton.textContent = 'Start Game';
// startButton.style.cssText = 'padding: 10px 20px; font-size: 16px; cursor: pointer; margin-top: 10px;';
// document.getElementById('ui').appendChild(startButton);

// startButton.addEventListener('click', () => {
//     if (!gameStarted) {
//         gameStarted = true;
//         startButton.style.display = 'none';
//         targetColor = getRandomColor();
//         targetColorDisplay.style.backgroundColor = targetColor;
//         lastTime = performance.now(); // Reset timer
//         gameLoop();
//     }
// });

// // Tile class
// class Tile {
//     constructor() {
//         this.x = Math.random() * (canvas.width - 50);
//         this.y = -50;
//         this.width = 50;
//         this.height = 50;
//         this.color = colors[Math.floor(Math.random() * colors.length)];
//         this.speed = speed;
//     }

//     update() {
//         this.y += this.speed;
//     }

//     draw() {
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }

// // Audio (commented out; uncomment if you add a local sound file)
// // const clickSound = new Audio('sounds/click.mp3');

// // Helper functions
// function getRandomColor() {
//     return colors[Math.floor(Math.random() * colors.length)];
// }

// function spawnTile() {
//     if (!gameOver && gameStarted && Math.random() < 0.02) {
//         tiles.push(new Tile());
//     }
// }

// function updateTargetColor() {
//     targetColor = getRandomColor();
//     targetColorDisplay.style.backgroundColor = targetColor;
// }

// // Handle clicks
// canvas.addEventListener('click', (e) => {
//     if (gameOver || !gameStarted) return;
//     const rect = canvas.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     for (let i = tiles.length - 1; i >= 0; i--) {
//         const tile = tiles[i];
//         if (
//             clickX >= tile.x &&
//             clickX <= tile.x + tile.width &&
//             clickY >= tile.y &&
//             clickY <= tile.y + tile.height
//         ) {
//             if (tile.color === targetColor) {
//                 score += 10;
//                 // clickSound.play().catch(() => {}); // Uncomment if audio is added
//                 tiles.splice(i, 1);
//                 speed = Math.min(maxSpeed, speed + 0.05); // Smaller per-click increase
//                 scoreDisplay.textContent = score;
//                 updateTargetColor();
//             } else {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Wrong Color Clicked!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'block';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             break;
//         }
//     }
// });

// // Game loop
// function gameLoop(timestamp) {
//     if (gameOver || !gameStarted) return;

//     // Time-based speed increase (0.01 per second)
//     const deltaTime = (timestamp - lastTime) / 1000; // Time in seconds
//     if (deltaTime >= 1) { // Every second
//         speed = Math.min(maxSpeed, speed + 0.01 * deltaTime);
//         lastTime = timestamp;
//     }

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     spawnTile();
//     tiles = tiles.filter(tile => tile.y < canvas.height);

//     for (let tile of tiles) {
//         tile.speed = speed; // Update tile speed
//         tile.update();
//         tile.draw();
//         if (tile.y >= canvas.height) {
//             if (tile.color === targetColor) {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Missed Target Color!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'block';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             tiles = tiles.filter(t => t !== tile);
//         }
//     }

//     requestAnimationFrame(gameLoop);
// }

// // Restart game
// function restartGame() {
//     score = 0;
//     speed = 2;
//     tiles = [];
//     gameOver = false;
//     gameStarted = true;
//     scoreDisplay.textContent = score;
//     gameOverScreen.style.display = 'none';
//     gameOverReason.textContent = '';
//     startButton.style.display = 'none';
//     lastTime = performance.now(); // Reset timer
//     updateTargetColor();
//     gameLoop();
// }

// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// const scoreDisplay = document.getElementById('score');
// const highScoreDisplay = document.getElementById('highScore');
// const targetColorDisplay = document.getElementById('targetColor');
// const gameOverScreen = document.getElementById('gameOver');
// const finalScoreDisplay = document.getElementById('finalScore');
// const gameOverReason = document.getElementById('gameOverReason');

// // Colors for tiles
// const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

// // Game state
// let score = 0;
// let highScore = localStorage.getItem('highScore') || 0;
// highScoreDisplay.textContent = highScore;
// let gameOver = false;
// let tiles = [];
// let targetColor;
// let speed = 2;
// const maxSpeed = 6;
// let gameStarted = false;
// let lastTime = performance.now();

// // Animation for correct clicks
// let particles = [];

// class Particle {
//     constructor(x, y, color) {
//         this.x = x;
//         this.y = y;
//         this.color = color;
//         this.radius = Math.random() * 5 + 2;
//         this.vx = Math.random() * 4 - 2;
//         this.vy = Math.random() * 4 - 2;
//         this.alpha = 1;
//     }

//     update() {
//         this.x += this.vx;
//         this.y += this.vy;
//         this.alpha -= 0.02;
//     }

//     draw() {
//         ctx.save();
//         ctx.globalAlpha = this.alpha;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//         ctx.restore();
//     }
// }

// // Tile class
// class Tile {
//     constructor() {
//         this.x = Math.random() * (canvas.width - 50);
//         this.y = -50;
//         this.width = 50;
//         this.height = 50;
//         this.color = colors[Math.floor(Math.random() * colors.length)];
//         this.speed = speed;
//         this.scale = 1; // For click animation
//     }

//     update() {
//         this.y += this.speed;
//         if (this.scale > 1) this.scale -= 0.05; // Shrink back after click
//     }

//     draw() {
//         ctx.save();
//         ctx.beginPath();
//         ctx.roundRect(this.x, this.y, this.width * this.scale, this.height * this.scale, 10);
//         ctx.fillStyle = this.color;
//         ctx.shadowColor = this.color;
//         ctx.shadowBlur = 10;
//         ctx.fill();
//         ctx.restore();
//     }
// }

// // Start button
// const startButton = document.createElement('button');
// startButton.textContent = 'Start Game';
// startButton.style.cssText = 'padding: 12px 24px; font-size: 1.1em; font-weight: 600; background: #ff6f61; color: #fff; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px;';
// document.getElementById('ui').appendChild(startButton);

// startButton.addEventListener('click', () => {
//     if (!gameStarted) {
//         gameStarted = true;
//         startButton.style.display = 'none';
//         targetColor = getRandomColor();
//         targetColorDisplay.style.backgroundColor = targetColor;
//         lastTime = performance.now();
//         gameLoop();
//     }
// });

// // Audio (commented out; uncomment if you add a local sound file)
// // const clickSound = new Audio('sounds/click.mp3');

// // Helper functions
// function getRandomColor() {
//     return colors[Math.floor(Math.random() * colors.length)];
// }

// function spawnTile() {
//     if (!gameOver && gameStarted && Math.random() < 0.02) {
//         tiles.push(new Tile());
//     }
// }

// function updateTargetColor() {
//     targetColor = getRandomColor();
//     targetColorDisplay.style.backgroundColor = targetColor;
// }

// // Handle clicks
// canvas.addEventListener('click', (e) => {
//     if (gameOver || !gameStarted) return;
//     const rect = canvas.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     for (let i = tiles.length - 1; i >= 0; i--) {
//         const tile = tiles[i];
//         if (
//             clickX >= tile.x &&
//             clickX <= tile.x + tile.width &&
//             clickY >= tile.y &&
//             clickY <= tile.y + tile.height
//         ) {
//             if (tile.color === targetColor) {
//                 score += 10;
//                 // clickSound.play().catch(() => {});
//                 tile.scale = 1.2; // Brief scale-up animation
//                 for (let j = 0; j < 10; j++) {
//                     particles.push(new Particle(tile.x + tile.width / 2, tile.y + tile.height / 2, tile.color));
//                 }
//                 tiles.splice(i, 1);
//                 speed = Math.min(maxSpeed, speed + 0.05);
//                 scoreDisplay.textContent = score;
//                 updateTargetColor();
//             } else {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Wrong Color Clicked!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'flex';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             break;
//         }
//     }
// });

// // Game loop
// function gameLoop(timestamp) {
//     if (gameOver || !gameStarted) return;

//     const deltaTime = (timestamp - lastTime) / 1000;
//     if (deltaTime >= 1) {
//         speed = Math.min(maxSpeed, speed + 0.01 * deltaTime);
//         lastTime = timestamp;
//     }

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     spawnTile();
//     tiles = tiles.filter(tile => tile.y < canvas.height);

//     for (let tile of tiles) {
//         tile.speed = speed;
//         tile.update();
//         tile.draw();
//         if (tile.y >= canvas.height) {
//             if (tile.color === targetColor) {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Missed Target Color!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'flex';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             tiles = tiles.filter(t => t !== tile);
//         }
//     }

//     particles = particles.filter(p => p.alpha > 0);
//     for (let particle of particles) {
//         particle.update();
//         particle.draw();
//     }

//     requestAnimationFrame(gameLoop);
// }

// // Restart game
// function restartGame() {
//     score = 0;
//     speed = 2;
//     tiles = [];
//     particles = [];
//     gameOver = false;
//     gameStarted = true;
//     scoreDisplay.textContent = score;
//     gameOverScreen.style.display = 'none';
//     gameOverReason.textContent = '';
//     startButton.style.display = 'none';
//     lastTime = performance.now();
//     updateTargetColor();
//     gameLoop();
// }

// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// const scoreDisplay = document.getElementById('score');
// const highScoreDisplay = document.getElementById('highScore');
// const targetColorDisplay = document.getElementById('targetColor');
// const gameOverScreen = document.getElementById('gameOver');
// const finalScoreDisplay = document.getElementById('finalScore');
// const gameOverReason = document.getElementById('gameOverReason');

// // Colors for tiles
// const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

// // Game state
// let score = 0;
// let highScore = localStorage.getItem('highScore') || 0;
// highScoreDisplay.textContent = highScore;
// let gameOver = false;
// let tiles = [];
// let targetColor;
// let speed = 2;
// const maxSpeed = 6;
// let gameStarted = false;
// let lastTime = performance.now();

// // Animation for correct clicks
// let particles = [];

// class Particle {
//     constructor(x, y, color) {
//         this.x = x;
//         this.y = y;
//         this.color = color;
//         this.radius = Math.random() * 5 + 2;
//         this.vx = Math.random() * 4 - 2;
//         this.vy = Math.random() * 4 - 2;
//         this.alpha = 1;
//     }

//     update() {
//         this.x += this.vx;
//         this.y += this.vy;
//         this.alpha -= 0.02;
//     }

//     draw() {
//         ctx.save();
//         ctx.globalAlpha = this.alpha;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//         ctx.restore();
//     }
// }

// // Tile class
// class Tile {
//     constructor(targetColor) {
//         this.x = Math.random() * (canvas.width - 50);
//         this.y = -50;
//         this.width = 50;
//         this.height = 50;
//         this.color = colors[Math.floor(Math.random() * colors.length)];
//         this.isTarget = this.color === targetColor; // Mark if tile matches target color
//         this.speed = speed;
//         this.scale = 1;
//     }

//     update() {
//         this.y += this.speed;
//         if (this.scale > 1) this.scale -= 0.05;
//     }

//     draw() {
//         ctx.save();
//         ctx.beginPath();
//         ctx.roundRect(this.x, this.y, this.width * this.scale, this.height * this.scale, 10);
//         ctx.fillStyle = this.color;
//         ctx.shadowColor = this.color;
//         ctx.shadowBlur = 10;
//         ctx.fill();
//         ctx.restore();
//     }
// }

// // Start button
// const startButton = document.createElement('button');
// startButton.textContent = 'Start Game';
// startButton.style.cssText = 'padding: 12px 24px; font-size: 1.1em; font-weight: 600; background: #ff6f61; color: #fff; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px;';
// document.getElementById('ui').appendChild(startButton);

// startButton.addEventListener('click', () => {
//     if (!gameStarted) {
//         gameStarted = true;
//         startButton.style.display = 'none';
//         targetColor = getRandomColor();
//         targetColorDisplay.style.backgroundColor = targetColor;
//         lastTime = performance.now();
//         gameLoop();
//     }
// });

// // Audio (commented out; uncomment if you add a local sound file)
// // const clickSound = new Audio('sounds/click.mp3');

// // Helper functions
// function getRandomColor() {
//     return colors[Math.floor(Math.random() * colors.length)];
// }

// function spawnTile() {
//     if (!gameOver && gameStarted && Math.random() < 0.02) {
//         tiles.push(new Tile(targetColor)); // Pass targetColor to set isTarget
//     }
// }

// function updateTargetColor() {
//     targetColor = getRandomColor();
//     targetColorDisplay.style.backgroundColor = targetColor;
//     // Update isTarget for existing tiles
//     tiles.forEach(tile => {
//         tile.isTarget = tile.color === targetColor;
//     });
// }

// // Handle clicks
// canvas.addEventListener('click', (e) => {
//     if (gameOver || !gameStarted) return;
//     const rect = canvas.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     for (let i = tiles.length - 1; i >= 0; i--) {
//         const tile = tiles[i];
//         if (
//             clickX >= tile.x &&
//             clickX <= tile.x + tile.width &&
//             clickY >= tile.y &&
//             clickY <= tile.y + tile.height
//         ) {
//             if (tile.color === targetColor) {
//                 score += 10;
//                 // clickSound.play().catch(() => {});
//                 tile.scale = 1.2;
//                 for (let j = 0; j < 10; j++) {
//                     particles.push(new Particle(tile.x + tile.width / 2, tile.y + tile.height / 2, tile.color));
//                 }
//                 tiles.splice(i, 1);
//                 speed = Math.min(maxSpeed, speed + 0.05);
//                 scoreDisplay.textContent = score;
//                 updateTargetColor();
//             } else {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Wrong Color Clicked!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'flex';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             break;
//         }
//     }
// });

// // Game loop
// function gameLoop(timestamp) {
//     if (gameOver || !gameStarted) return;

//     const deltaTime = (timestamp - lastTime) / 1000;
//     if (deltaTime >= 1) {
//         speed = Math.min(maxSpeed, speed + 0.01 * deltaTime);
//         lastTime = timestamp;
//     }

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     spawnTile();
//     tiles = tiles.filter(tile => tile.y < canvas.height);

//     for (let tile of tiles) {
//         tile.speed = speed;
//         tile.update();
//         tile.draw();
//         if (tile.y >= canvas.height) {
//             if (tile.isTarget) {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Missed Target Color!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'flex';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             tiles = tiles.filter(t => t !== tile);
//         }
//     }

//     particles = particles.filter(p => p.alpha > 0);
//     for (let particle of particles) {
//         particle.update();
//         particle.draw();
//     }

//     requestAnimationFrame(gameLoop);
// }

// // Restart game
// function restartGame() {
//     score = 0;
//     speed = 2;
//     tiles = [];
//     particles = [];
//     gameOver = false;
//     gameStarted = true;
//     scoreDisplay.textContent = score;
//     gameOverScreen.style.display = 'none';
//     gameOverReason.textContent = '';
//     startButton.style.display = 'none';
//     lastTime = performance.now();
//     updateTargetColor();
//     gameLoop();
// }

// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// const scoreDisplay = document.getElementById('score');
// const highScoreDisplay = document.getElementById('highScore');
// const targetColorDisplay = document.getElementById('targetColor');
// const gameOverScreen = document.getElementById('gameOver');
// const finalScoreDisplay = document.getElementById('finalScore');
// const gameOverReason = document.getElementById('gameOverReason');

// // Colors for tiles (expanded to 8)
// const colors = [
//     '#ff0000', // Red
//     '#00ff00', // Green
//     '#0000ff', // Blue
//     '#ffff00', // Yellow
//     '#ffffff', // White
// ];

// // Game state
// let score = 0;
// let highScore = localStorage.getItem('highScore') || 0;
// highScoreDisplay.textContent = highScore;
// let gameOver = false;
// let tiles = [];
// let targetColor;
// let speed = 2;
// const maxSpeed = 6;
// let gameStarted = false;
// let lastTime = performance.now();

// // Animation for correct clicks
// let particles = [];

// class Particle {
//     constructor(x, y, color) {
//         this.x = x;
//         this.y = y;
//         this.color = color;
//         this.radius = Math.random() * 5 + 2;
//         this.vx = Math.random() * 4 - 2;
//         this.vy = Math.random() * 4 - 2;
//         this.alpha = 1;
//     }

//     update() {
//         this.x += this.vx;
//         this.y += this.vy;
//         this.alpha -= 0.02;
//     }

//     draw() {
//         ctx.save();
//         ctx.globalAlpha = this.alpha;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//         ctx.restore();
//     }
// }

// // Tile class
// class Tile {
//     constructor(color) {
//         this.x = Math.random() * (canvas.width - 50);
//         this.y = -50;
//         this.width = 50;
//         this.height = 50;
//         this.color = color; // Use specified color
//         this.speed = speed;
//         this.scale = 1;
//     }

//     update() {
//         this.y += this.speed;
//         if (this.scale > 1) this.scale -= 0.05;
//     }

//     draw() {
//         ctx.save();
//         ctx.beginPath();
//         ctx.roundRect(this.x, this.y, this.width * this.scale, this.height * this.scale, 10);
//         ctx.fillStyle = this.color;
//         ctx.shadowColor = this.color;
//         ctx.shadowBlur = 10;
//         ctx.fill();
//         ctx.restore();
//     }
// }

// // Start button
// const startButton = document.createElement('button');
// startButton.textContent = 'Start Game';
// startButton.style.cssText = 'padding: 12px 24px; font-size: 1.1em; font-weight: 600; background: #ff6f61; color: #fff; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px;';
// document.getElementById('ui').appendChild(startButton);

// startButton.addEventListener('click', () => {
//     if (!gameStarted) {
//         gameStarted = true;
//         startButton.style.display = 'none';
//         updateTargetColor();
//         lastTime = performance.now();
//         gameLoop();
//     }
// });

// // Audio (commented out; uncomment if you add a local sound file)
// // const clickSound = new Audio('sounds/click.mp3');

// // Helper functions
// function getRandomColor(excludeColors) {
//     const availableColors = colors.filter(color => !excludeColors.includes(color));
//     if (availableColors.length === 0) return colors[4]; // Default to white if none available
//     return availableColors[Math.floor(Math.random() * availableColors.length)];
// }

// function getBottomHalfColors() {
//     return [...new Set(tiles.filter(tile => tile.y >= canvas.height / 2).map(tile => tile.color))];
// }

// function updateTargetColor() {
//     const bottomHalfColors = getBottomHalfColors();
//     targetColor = getRandomColor(bottomHalfColors);
//     targetColorDisplay.style.backgroundColor = targetColor;
// }

// function spawnTile() {
//     if (!gameOver && gameStarted && Math.random() < 0.02) {
//         const bottomHalfColors = getBottomHalfColors();
//         // Allow up to 4 unique colors in bottom half
//         let tileColor;
//         if (bottomHalfColors.length >= 4) {
//             // Use an existing bottom-half color to prevent adding a 5th
//             tileColor = bottomHalfColors[Math.floor(Math.random() * bottomHalfColors.length)];
//         } else {
//             // Allow any color (prioritizes variety but respects target color logic)
//             tileColor = colors[Math.floor(Math.random() * colors.length)];
//         }
//         tiles.push(new Tile(tileColor));
//     }
// }

// // Handle clicks
// canvas.addEventListener('click', (e) => {
//     if (gameOver || !gameStarted) return;
//     const rect = canvas.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     for (let i = tiles.length - 1; i >= 0; i--) {
//         const tile = tiles[i];
//         if (
//             clickX >= tile.x &&
//             clickX <= tile.x + tile.width &&
//             clickY >= tile.y &&
//             clickY <= tile.y + tile.height
//         ) {
//             if (tile.color === targetColor) {
//                 score += 10;
//                 // clickSound.play().catch(() => {});
//                 tile.scale = 1.2;
//                 for (let j = 0; j < 10; j++) {
//                     particles.push(new Particle(tile.x + tile.width / 2, tile.y + tile.height / 2, tile.color));
//                 }
//                 tiles.splice(i, 1);
//                 speed = Math.min(maxSpeed, speed + 0.05);
//                 scoreDisplay.textContent = score;
//                 updateTargetColor();
//             } else {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Wrong Color Clicked!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'flex';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             break;
//         }
//     }
// });

// // Game loop
// function gameLoop(timestamp) {
//     if (gameOver || !gameStarted) return;

//     const deltaTime = (timestamp - lastTime) / 1000;
//     if (deltaTime >= 1) {
//         speed = Math.min(maxSpeed, speed + 0.01 * deltaTime);
//         lastTime = timestamp;
//     }

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     spawnTile();
//     tiles = tiles.filter(tile => tile.y < canvas.height);

//     for (let tile of tiles) {
//         tile.speed = speed;
//         tile.update();
//         tile.draw();
//         if (tile.y >= canvas.height) {
//             if (tile.color === targetColor) {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Missed Target Color!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'flex';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             tiles = tiles.filter(t => t !== tile);
//         }
//     }

//     particles = particles.filter(p => p.alpha > 0);
//     for (let particle of particles) {
//         particle.update();
//         particle.draw();
//     }

//     requestAnimationFrame(gameLoop);
// }

// // Restart game
// function restartGame() {
//     score = 0;
//     speed = 2;
//     tiles = [];
//     particles = [];
//     gameOver = false;
//     gameStarted = true;
//     scoreDisplay.textContent = score;
//     gameOverScreen.style.display = 'none';
//     gameOverReason.textContent = '';
//     startButton.style.display = 'none';
//     lastTime = performance.now();
//     updateTargetColor();
//     gameLoop();
// }

// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// const scoreDisplay = document.getElementById('score');
// const highScoreDisplay = document.getElementById('highScore');
// const targetColorDisplay = document.getElementById('targetColor');
// const gameOverScreen = document.getElementById('gameOver');
// const finalScoreDisplay = document.getElementById('finalScore');
// const gameOverReason = document.getElementById('gameOverReason');

// // Colors for tiles (8 colors)
// const colors = [
//     '#ff0000', // Red
//     '#00ff00', // Green
//     '#0000ff', // Blue
//     '#ffff00', // Yellow
//     '#ffffff', // White
//     '#87ceeb', // Sky Blue
//     '#800080', // Purple
//     '#ffa500', // Orange
// ];

// // Game state
// let score = 0;
// let highScore = localStorage.getItem('highScore') || 0;
// highScoreDisplay.textContent = highScore;
// let gameOver = false;
// let tiles = [];
// let targetColor;
// let speed = 2;
// const maxSpeed = 6;
// let gameStarted = false;
// let lastTime = performance.now();

// // Animation for correct clicks
// let particles = [];

// class Particle {
//     constructor(x, y, color) {
//         this.x = x;
//         this.y = y;
//         this.color = color;
//         this.radius = Math.random() * 5 + 2;
//         this.vx = Math.random() * 4 - 2;
//         this.vy = Math.random() * 4 - 2;
//         this.alpha = 1;
//     }

//     update() {
//         this.x += this.vx;
//         this.y += this.vy;
//         this.alpha -= 0.02;
//     }

//     draw() {
//         ctx.save();
//         ctx.globalAlpha = this.alpha;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//         ctx.restore();
//     }
// }

// // Tile class
// class Tile {
//     constructor(color) {
//         this.x = Math.random() * (canvas.width - 50);
//         this.y = -50;
//         this.width = 50;
//         this.height = 50;
//         this.color = color;
//         this.speed = speed;
//         this.scale = 1;
//     }

//     update() {
//         this.y += this.speed;
//         if (this.scale > 1) this.scale -= 0.05;
//     }

//     draw() {
//         ctx.save();
//         ctx.beginPath();
//         ctx.roundRect(this.x, this.y, this.width * this.scale, this.height * this.scale, 10);
//         ctx.fillStyle = this.color;
//         ctx.shadowColor = this.color;
//         ctx.shadowBlur = 10;
//         ctx.fill();
//         ctx.restore();
//     }
// }

// // Start button
// const startButton = document.createElement('button');
// startButton.textContent = 'Start Game';
// startButton.style.cssText = 'padding: 12px 24px; font-size: 1.1em; font-weight: 600; background: #ff6f61; color: #fff; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px;';
// document.getElementById('ui').appendChild(startButton);

// startButton.addEventListener('click', () => {
//     if (!gameStarted) {
//         gameStarted = true;
//         startButton.style.display = 'none';
//         updateTargetColor();
//         lastTime = performance.now();
//         gameLoop();
//     }
// });

// // Audio (commented out; uncomment if you add a local sound file)
// // const clickSound = new Audio('sounds/click.mp3');

// // Helper functions
// function getRandomColor(excludeColors) {
//     const availableColors = colors.filter(color => !excludeColors.includes(color));
//     if (availableColors.length === 0) return colors[4]; // Default to white
//     return availableColors[Math.floor(Math.random() * availableColors.length)];
// }

// function getBottomHalfColors() {
//     return [...new Set(tiles.filter(tile => tile.y >= canvas.height / 2).map(tile => tile.color))];
// }

// function updateTargetColor() {
//     const bottomHalfColors = getBottomHalfColors();
//     targetColor = getRandomColor(bottomHalfColors);
//     targetColorDisplay.style.backgroundColor = targetColor;
// }

// function spawnTile() {
//     if (!gameOver && gameStarted && Math.random() < 0.03) { // Increased spawn rate
//         const bottomHalfColors = getBottomHalfColors();
//         let tileColor;
//         // 40% chance for target color, 60% for others
//         if (Math.random() < 0.4) {
//             tileColor = targetColor;
//         } else {
//             // Respect bottom-half color limit (max 4 unique colors)
//             if (bottomHalfColors.length >= 4) {
//                 tileColor = bottomHalfColors[Math.floor(Math.random() * bottomHalfColors.length)];
//             } else {
//                 tileColor = colors[Math.floor(Math.random() * colors.length)];
//             }
//         }
//         tiles.push(new Tile(tileColor));
//     }
// }

// // Handle clicks
// canvas.addEventListener('click', (e) => {
//     if (gameOver || !gameStarted) return;
//     const rect = canvas.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     for (let i = tiles.length - 1; i >= 0; i--) {
//         const tile = tiles[i];
//         if (
//             clickX >= tile.x &&
//             clickX <= tile.x + tile.width &&
//             clickY >= tile.y &&
//             clickY <= tile.y + tile.height
//         ) {
//             if (tile.color === targetColor) {
//                 score += 10;
//                 // clickSound.play().catch(() => {});
//                 tile.scale = 1.2;
//                 for (let j = 0; j < 10; j++) {
//                     particles.push(new Particle(tile.x + tile.width / 2, tile.y + tile.height / 2, tile.color));
//                 }
//                 tiles.splice(i, 1);
//                 speed = Math.min(maxSpeed, speed + 0.05);
//                 scoreDisplay.textContent = score;
//                 updateTargetColor();
//             } else {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Wrong Color Clicked!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'flex';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             break;
//         }
//     }
// });

// // Game loop
// function gameLoop(timestamp) {
//     if (gameOver || !gameStarted) return;

//     const deltaTime = (timestamp - lastTime) / 1000;
//     if (deltaTime >= 1) {
//         speed = Math.min(maxSpeed, speed + 0.01 * deltaTime);
//         lastTime = timestamp;
//     }

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     spawnTile();
//     tiles = tiles.filter(tile => tile.y < canvas.height);

//     for (let tile of tiles) {
//         tile.speed = speed;
//         tile.update();
//         tile.draw();
//         if (tile.y >= canvas.height) {
//             if (tile.color === targetColor) {
//                 gameOver = true;
//                 gameOverReason.textContent = 'Missed Target Color!';
//                 finalScoreDisplay.textContent = score;
//                 gameOverScreen.style.display = 'flex';
//                 startButton.style.display = 'block';
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     highScoreDisplay.textContent = highScore;
//                 }
//             }
//             tiles = tiles.filter(t => t !== tile);
//         }
//     }

//     particles = particles.filter(p => p.alpha > 0);
//     for (let particle of particles) {
//         particle.update();
//         particle.draw();
//     }

//     requestAnimationFrame(gameLoop);
// }

// // Restart game
// function restartGame() {
//     score = 0;
//     speed = 2;
//     tiles = [];
//     particles = [];
//     gameOver = false;
//     gameStarted = true;
//     scoreDisplay.textContent = score;
//     gameOverScreen.style.display = 'none';
//     gameOverReason.textContent = '';
//     startButton.style.display = 'none';
//     lastTime = performance.now();
//     updateTargetColor();
//     gameLoop();
// }

// Game Configuration
const GameConfig = {
    levels: {
        easy: {
            name: 'Easy',
            baseSpeed: 1.5,
            maxSpeed: 4,
            speedIncrease: 0.03,
            spawnRate: 0.025
        },
        medium: {
            name: 'Medium',
            baseSpeed: 2.5,
            maxSpeed: 6,
            speedIncrease: 0.05,
            spawnRate: 0.035
        },
        hard: {
            name: 'Hard',
            baseSpeed: 3.5,
            maxSpeed: 8,
            speedIncrease: 0.08,
            spawnRate: 0.045
        }
    },
    colors: [
        '#FF4D6A', // Pinkish Red
        '#5D4FEB', // Indigo
        '#18C9CC', // Teal
        '#FFB84D', // Orange
        '#F8F9FA', // White
        '#2DD47A', // Green
        '#9D50E7', // Purple
        '#FF7946', // Coral
    ]
};

// Storage Manager
const StorageManager = {
    getHighScore: (level) => {
        return parseInt(localStorage.getItem(`colorClash_highScore_${level}`)) || 0;
    },
    
    setHighScore: (level, score) => {
        const currentHigh = StorageManager.getHighScore(level);
        if (score > currentHigh) {
            localStorage.setItem(`colorClash_highScore_${level}`, score);
            return true;
        }
        return false;
    },
    
    getCurrentLevel: () => {
        return localStorage.getItem('colorClash_currentLevel') || 'easy';
    },
    
    setCurrentLevel: (level) => {
        localStorage.setItem('colorClash_currentLevel', level);
    }
};

// Particle Class
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 6 + 3;
        this.vx = Math.random() * 5 - 2.5;
        this.vy = Math.random() * 5 - 2.5;
        this.alpha = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
        this.radius -= 0.05;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
    }
}

// Tile Class
class Tile {
    constructor(color, speed) {
        this.x = Math.random() * (400 - 60); // canvas width - tile width
        this.y = -60;
        this.width = 60;
        this.height = 60;
        this.color = color;
        this.speed = speed;
        this.scale = 1;
        this.rotation = 0;
        this.cornerRadius = 15;
        this.glow = 15;
    }

    update() {
        this.y += this.speed;
        if (this.scale > 1) this.scale -= 0.05;
        if (this.rotation > 0) this.rotation -= 0.2;
        if (this.glow > 10) this.glow -= 0.5;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.rotation * Math.PI / 180);
        
        // Shadow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glow;
        
        // Main tile
        ctx.beginPath();
        const radius = this.cornerRadius;
        const w = (this.width * this.scale) / 2;
        const h = (this.height * this.scale) / 2;
        
        // Draw rounded rectangle
        ctx.moveTo(-w + radius, -h);
        ctx.lineTo(w - radius, -h);
        ctx.arcTo(w, -h, w, -h + radius, radius);
        ctx.lineTo(w, h - radius);
        ctx.arcTo(w, h, w - radius, h, radius);
        ctx.lineTo(-w + radius, h);
        ctx.arcTo(-w, h, -w, h - radius, radius);
        ctx.lineTo(-w, -h + radius);
        ctx.arcTo(-w, -h, -w + radius, -h, radius);
        ctx.closePath();
        
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, -h, 0, h);
        const colorObj = this.hexToRgb(this.color);
        const lighterColor = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, 1)`;
        const darkerColor = `rgba(${Math.max(0, colorObj.r-40)}, ${Math.max(0, colorObj.g-40)}, ${Math.max(0, colorObj.b-40)}, 1)`;
        gradient.addColorStop(0, lighterColor);
        gradient.addColorStop(1, darkerColor);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Highlight
        ctx.beginPath();
        ctx.moveTo(-w + radius, -h);
        ctx.lineTo(w - radius, -h);
        ctx.arcTo(w, -h, w, -h + radius, radius);
        ctx.lineTo(w, -h + radius * 2);
        ctx.quadraticCurveTo(-w/3, -h/2, -w + radius, -h);
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
        ctx.fill();
        
        ctx.restore();
    }

    hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    }

    isClicked(x, y) {
        return x >= this.x && x <= this.x + this.width && 
               y >= this.y && y <= this.y + this.height;
    }
}

// Game Manager
const GameManager = {
    // DOM Elements
    canvas: null,
    ctx: null,
    homeScreen: null,
    gameContainer: null,
    gameOverScreen: null,
    
    // Game State
    currentLevel: 'easy',
    score: 0,
    gameOver: false,
    gameStarted: false,
    tiles: [],
    particles: [],
    targetColor: null,
    speed: 0,
    lastTime: 0,
    animationId: null,

    init() {
        this.setupDOM();
        this.setupEventListeners();
        this.createBackgroundParticles();
        this.loadSettings();
        this.showHomeScreen();
    },

    setupDOM() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.homeScreen = document.getElementById('homeScreen');
        this.gameContainer = document.getElementById('game-container');
        this.gameOverScreen = document.getElementById('gameOver');
        
        // Responsive canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    },

    resizeCanvas() {
        const container = this.gameContainer;
        const maxWidth = Math.min(400, window.innerWidth - 40);
        const maxHeight = Math.min(600, window.innerHeight - 200);
        
        this.canvas.style.width = maxWidth + 'px';
        this.canvas.style.height = (maxWidth * 1.5) + 'px';
    },

    setupEventListeners() {
        // Level selection
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentLevel = e.target.dataset.level;
                StorageManager.setCurrentLevel(this.currentLevel);
                this.updateHomeHighScore();
            });
        });

        // Start game
        document.getElementById('startGameBtn').addEventListener('click', () => {
            this.startGame();
        });

        // Back to home
        document.getElementById('backToHomeBtn').addEventListener('click', () => {
            this.goToHome();
        });

        // Canvas clicks
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
    },

    loadSettings() {
        this.currentLevel = StorageManager.getCurrentLevel();
        
        // Set active level button
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.level === this.currentLevel) {
                btn.classList.add('active');
            }
        });
        
        this.updateHomeHighScore();
    },

    updateHomeHighScore() {
        const highScore = StorageManager.getHighScore(this.currentLevel);
        document.getElementById('homeHighScore').textContent = highScore;
    },

    showHomeScreen() {
        this.homeScreen.style.display = 'flex';
        this.gameContainer.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    },

    startGame() {
        this.homeScreen.style.display = 'none';
        this.gameContainer.style.display = 'flex';
        this.gameOverScreen.style.display = 'none';
        
        // Reset game state
        this.score = 0;
        this.gameOver = false;
        this.gameStarted = true;
        this.tiles = [];
        this.particles = [];
        this.speed = GameConfig.levels[this.currentLevel].baseSpeed;
        this.lastTime = performance.now();
        
        // Update UI
        this.updateScore();
        this.updateHighScore();
        this.updateCurrentLevel();
        this.updateTargetColor();
        
        // Start game loop
        this.gameLoop();
    },

    updateScore() {
        document.getElementById('score').textContent = this.score;
    },

    updateHighScore() {
        const highScore = StorageManager.getHighScore(this.currentLevel);
        document.getElementById('highScore').textContent = highScore;
    },

    updateCurrentLevel() {
        document.getElementById('currentLevel').textContent = GameConfig.levels[this.currentLevel].name;
    },

    updateTargetColor() {
        const bottomHalfColors = this.getBottomHalfColors();
        this.targetColor = this.getRandomColor(bottomHalfColors);
        
        const targetDisplay = document.getElementById('targetColor');
        targetDisplay.style.backgroundColor = this.targetColor;
        targetDisplay.classList.add('pulse');
        setTimeout(() => targetDisplay.classList.remove('pulse'), 500);
    },

    getBottomHalfColors() {
        const bottomHalfTiles = this.tiles.filter(tile => tile.y >= this.canvas.height / 2);
        return [...new Set(bottomHalfTiles.map(tile => tile.color))];
    },

    getRandomColor(excludeColors = []) {
        const availableColors = GameConfig.colors.filter(color => !excludeColors.includes(color));
        if (availableColors.length === 0) return GameConfig.colors[0];
        return availableColors[Math.floor(Math.random() * availableColors.length)];
    },

    spawnTile() {
        if (!this.gameOver && this.gameStarted) {
            const levelConfig = GameConfig.levels[this.currentLevel];
            if (Math.random() < levelConfig.spawnRate) {
                const bottomHalfColors = this.getBottomHalfColors();
                let tileColor;
                
                // 40% chance for target color, 60% for others
                if (Math.random() < 0.4) {
                    tileColor = this.targetColor;
                } else {
                    // Respect bottom-half color limit (max 4 unique colors)
                    if (bottomHalfColors.length >= 4) {
                        tileColor = bottomHalfColors[Math.floor(Math.random() * bottomHalfColors.length)];
                    } else {
                        tileColor = GameConfig.colors[Math.floor(Math.random() * GameConfig.colors.length)];
                    }
                }
                
                this.tiles.push(new Tile(tileColor, this.speed));
            }
        }
    },

    handleCanvasClick(e) {
        if (this.gameOver || !this.gameStarted) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        for (let i = this.tiles.length - 1; i >= 0; i--) {
            const tile = this.tiles[i];
            if (tile.isClicked(clickX, clickY)) {
                if (tile.color === this.targetColor) {

                    // Play sound (if available)
                    const audio = new Audio('color-clash/public/assets/sound/click.mp3');
                    audio.play();
                    
                    // Correct click
                    this.score += 10;
                    tile.scale = 1.2;
                    tile.rotation = 15;
                    tile.glow = 25;
                    
                    // Create particles
                    for (let j = 0; j < 12; j++) {
                        this.particles.push(new Particle(
                            tile.x + tile.width / 2, 
                            tile.y + tile.height / 2, 
                            tile.color
                        ));
                    }
                    
                    this.tiles.splice(i, 1);
                    
                    // Increase speed
                    const levelConfig = GameConfig.levels[this.currentLevel];
                    this.speed = Math.min(levelConfig.maxSpeed, this.speed + levelConfig.speedIncrease);
                    
                    this.updateScore();
                    this.updateTargetColor();
                } else {
                    // Wrong color clicked
                    this.endGame('Wrong Color Clicked!');
                }
                break;
            }
        }
    },

    endGame(reason) {
        this.gameOver = true;
        this.gameStarted = false;
        const audio = new Audio('color-clash/public/assets/sound/gameover.mp3');
        audio.play();

        // Check for new high score
        const isNewHighScore = StorageManager.setHighScore(this.currentLevel, this.score);
        
        // Update displays
        document.getElementById('gameOverReason').textContent = reason;
        document.getElementById('finalScore').textContent = this.score;
        
        if (isNewHighScore) {
            document.getElementById('gameOverReason').textContent += ' NEW HIGH SCORE!';
            this.updateHighScore();
            this.updateHomeHighScore();
        }
        
        this.gameOverScreen.style.display = 'flex';
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    },

    gameLoop() {
        if (this.gameOver || !this.gameStarted) return;

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        
        // Gradually increase speed over time
        if (deltaTime >= 1) {
            const levelConfig = GameConfig.levels[this.currentLevel];
            this.speed = Math.min(levelConfig.maxSpeed, this.speed + levelConfig.speedIncrease * deltaTime);
            this.lastTime = currentTime;
        }

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Spawn new tiles
        this.spawnTile();

        // Update and draw tiles
        for (let i = this.tiles.length - 1; i >= 0; i--) {
            const tile = this.tiles[i];
            tile.speed = this.speed;
            tile.update();
            tile.draw(this.ctx);
            
            // Check if tile reached bottom
            if (tile.y >= this.canvas.height) {
                if (tile.color === this.targetColor) {
                    // Missed target color
                    this.endGame('Missed Target Color!');
                    return;
                }
                this.tiles.splice(i, 1);
            }
        }

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            particle.draw(this.ctx);
            
            if (particle.alpha <= 0 || particle.radius <= 0) {
                this.particles.splice(i, 1);
            }
        }

        this.animationId = requestAnimationFrame(() => this.gameLoop());
    },

    restartGame() {
        this.gameOverScreen.style.display = 'none';
        this.startGame();
    },

    goToHome() {
        this.showHomeScreen();
        this.updateHomeHighScore();
    },

    createBackgroundParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${GameConfig.colors[Math.floor(Math.random() * GameConfig.colors.length)]};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 8}s;
                animation-duration: ${Math.random() * 4 + 6}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
};

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    GameManager.init();
});