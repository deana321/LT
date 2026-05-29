const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameOverModal = document.getElementById('gameOverModal');
const pauseModal = document.getElementById('pauseModal');
const finalScoreEl = document.getElementById('finalScore');
const playAgainBtn = document.getElementById('playAgainBtn');
const resumeBtn = document.getElementById('resumeBtn');
const difficultySelect = document.getElementById('difficulty');
const dpadBtns = document.querySelectorAll('.dpad-btn');

const TILE_COUNT = 20;
const GRID_SIZE = canvas.width / TILE_COUNT;

let snake = [];
let food = { x: 0, y: 0 };
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval = null;
let isRunning = false;
let isPaused = false;
let gameSpeed = 120;

highScoreEl.textContent = highScore;

function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    scoreEl.textContent = score;
    placeFood();
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT)
    };
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            placeFood();
            break;
        }
    }
}

function draw() {
    ctx.fillStyle = '#16213e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < TILE_COUNT; i++) {
        for (let j = 0; j < TILE_COUNT; j++) {
            ctx.strokeStyle = 'rgba(8, 217, 214, 0.1)';
            ctx.strokeRect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
    }

    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00ff88';

    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        if (i === 0) {
            ctx.fillStyle = '#39ff14';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#39ff14';
        } else {
            ctx.fillStyle = '#00ff88';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00ff88';
        }
        ctx.fillRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
    }

    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff2e63';
    ctx.fillStyle = '#ff2e63';
    ctx.fillRect(food.x * GRID_SIZE + 2, food.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4);

    ctx.shadowBlur = 0;
}

function update() {
    direction = { ...nextDirection };

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }

    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }

    draw();
}

function gameOver() {
    isRunning = false;
    clearInterval(gameInterval);
    gameInterval = null;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreEl.textContent = highScore;
    }

    finalScoreEl.textContent = score;
    gameOverModal.classList.remove('hidden');
}

function startGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameSpeed = parseInt(difficultySelect.value);
    initGame();
    isRunning = true;
    isPaused = false;
    gameInterval = setInterval(update, gameSpeed);
    startBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden');
    pauseModal.classList.add('hidden');
    gameOverModal.classList.add('hidden');
}

function togglePause() {
    if (!isRunning) return;

    if (isPaused) {
        isPaused = false;
        gameInterval = setInterval(update, gameSpeed);
        pauseModal.classList.add('hidden');
    } else {
        isPaused = true;
        clearInterval(gameInterval);
        pauseModal.classList.remove('hidden');
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (isRunning) {
            togglePause();
        }
        return;
    }

    if (!isRunning || isPaused) return;

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction.y !== 1) {
                nextDirection = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction.y !== -1) {
                nextDirection = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction.x !== 1) {
                nextDirection = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction.x !== -1) {
                nextDirection = { x: 1, y: 0 };
            }
            break;
    }
});

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

canvas.addEventListener('touchend', (e) => {
    if (!isRunning || isPaused) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && direction.x !== -1) {
            nextDirection = { x: 1, y: 0 };
        } else if (diffX < 0 && direction.x !== 1) {
            nextDirection = { x: -1, y: 0 };
        }
    } else {
        if (diffY > 0 && direction.y !== -1) {
            nextDirection = { x: 0, y: 1 };
        } else if (diffY < 0 && direction.y !== 1) {
            nextDirection = { x: 0, y: -1 };
        }
    }
}, { passive: true });

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', startGame);
resumeBtn.addEventListener('click', togglePause);

difficultySelect.addEventListener('change', () => {
    if (isRunning && !isPaused) {
        gameSpeed = parseInt(difficultySelect.value);
        clearInterval(gameInterval);
        gameInterval = setInterval(update, gameSpeed);
    }
});

dpadBtns.forEach(btn => {
    const handler = (e) => {
        e.preventDefault();
        if (!isRunning || isPaused) return;
        const dir = btn.dataset.dir;
        switch (dir) {
            case 'up':
                if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
                break;
            case 'down':
                if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
                break;
            case 'left':
                if (direction.x !== 1) nextDirection = { x: -1, y: 0 };
                break;
            case 'right':
                if (direction.x !== -1) nextDirection = { x: 1, y: 0 };
                break;
        }
    };
    btn.addEventListener('touchstart', handler, { passive: false });
    btn.addEventListener('mousedown', handler);
});

document.addEventListener('touchmove', (e) => {
    if (e.target.closest('#gameCanvas') || e.target.closest('.dpad')) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('gesturechange', (e) => e.preventDefault());

initGame();
draw();