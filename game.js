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

    // spawnTile() {
    //     if (!this.gameOver && this.gameStarted) {
    //         const levelConfig = GameConfig.levels[this.currentLevel];
    //         if (Math.random() < levelConfig.spawnRate) {
    //             const bottomHalfColors = this.getBottomHalfColors();
    //             let tileColor;
                
    //             // 40% chance for target color, 60% for others
    //             if (Math.random() < 0.4) {
    //                 tileColor = this.targetColor;
    //             } else {
    //                 // Respect bottom-half color limit (max 4 unique colors)
    //                 if (bottomHalfColors.length >= 4) {
    //                     tileColor = bottomHalfColors[Math.floor(Math.random() * bottomHalfColors.length)];
    //                 } else {
    //                     tileColor = GameConfig.colors[Math.floor(Math.random() * GameConfig.colors.length)];
    //                 }
    //             }
                
    //             this.tiles.push(new Tile(tileColor, this.speed));
    //         }
    //     }
    // },

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

                // Try to spawn a tile with no overlap
                let attempts = 0;
                const maxAttempts = 5;
                let newTile = null;

                while (attempts < maxAttempts) {
                    const potentialX = Math.random() * (this.canvas.width - 60); // canvas width - tile width
                    newTile = new Tile(tileColor, this.speed);
                    newTile.x = potentialX;
                    newTile.y = -60;

                    // Check for overlap with existing tiles
                    let hasOverlap = false;
                    for (const existingTile of this.tiles) {
                        if (this.checkOverlap(newTile, existingTile)) {
                            hasOverlap = true;
                            break;
                        }
                    }

                    if (!hasOverlap) {
                        this.tiles.push(newTile);
                        break; // Found a valid position, add tile and exit
                    }
                    attempts++;
                }
            }
        }
    },

    // Helper method to check for overlap between two tiles
    checkOverlap(tile1, tile2) {
        const buffer = 5; // Small buffer to ensure tiles aren't touching
        return !(
            tile1.x + tile1.width + buffer < tile2.x ||
            tile1.x - buffer > tile2.x + tile2.width ||
            tile1.y + tile1.height + buffer < tile2.y ||
            tile1.y - buffer > tile2.y + tile2.height
        );
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
                    const audio = new Audio('public/assets/sound/click.mp3');
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
        const audio = new Audio('public/assets/sound/gameover.mp3');
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