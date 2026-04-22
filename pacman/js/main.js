import { createBoard, width, resetBoard } from './board.js';
import Pacman from './pacman.js';
import Ghost from './ghost.js';
import { drawPacman, drawGhost, clearCell, updateScore, showGameOver } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {

    // Get grid from DOM
    const grid = document.getElementById('grid');

    // Create board
    const squares = createBoard(grid);

    // Create game objects
    const pacman = new Pacman(325);

    const ghosts = [
        new Ghost('blinky', 261, 250),
        new Ghost('pinky', 263, 400),
        new Ghost('inky', 282, 300),
        new Ghost('clyde', 284, 500)
    ];

    // Track previous positions
    let pacmanPrevIndex = pacman.currentIndex;
    let ghostPrevIndexes = ghosts.map(g => g.currentIndex);

    // Game speed control
    let lastTime = 0;
    const GAME_SPEED = 200; // lower = faster, higher = slower

    let animationId;
    let isPaused = false;
    let gameInitialized = false;
    let isGameOver = false;

    // Pacman controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') pacman.nextDirection = 'left';
        if (e.key === 'ArrowRight') pacman.nextDirection = 'right';
        if (e.key === 'ArrowUp') pacman.nextDirection = 'up';
        if (e.key === 'ArrowDown') pacman.nextDirection = 'down';
    });

    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');


    // Stop and resume button
    pauseBtn.addEventListener('click', (e) => {
        if (!isPaused) {
            isPaused = true;
            cancelAnimationFrame(animationId);
            pauseBtn.textContent = 'Resume';
        } else {
            isPaused = false;
            lastTime = 0; // reset time to avoid large jump
            animationId = requestAnimationFrame(gameLoop);
            pauseBtn.textContent = 'Pause';
        }
    });

    // Start game loop when start button is clicked
    startBtn.addEventListener('click', (e) => {
        if (!gameInitialized) {
            gameInitialized = true;
            animationId = requestAnimationFrame(gameLoop);
            startBtn.textContent = 'Restart';
        }
        else {
            resetGame();
        }
    });


    // Reset game state
    function resetGame() {
        cancelAnimationFrame(animationId);
        isGameOver = false;

        // hide gameOver
        const gameOver = document.getElementById('gameOver');
        gameOver.style.display = 'none';

        resetBoard(squares);
        pacman.reset(325);
        ghosts.forEach(g => {
            g.reset();
            g.isScared = false;
        });
        pacmanPrevIndex = pacman.currentIndex;
        ghostPrevIndexes = ghosts.map(g => g.currentIndex);

        updateScore(document.getElementById('score'), pacman.points);
        lastTime = 0;
        isPaused = false;
        pauseBtn.textContent = 'Pause';
        animationId = requestAnimationFrame(gameLoop);
    }

    // Game loop
    function gameLoop(time) {
        if (isPaused) return; // stop updating

        // Call gameLoop again on the next frame.
        // Browser waits until next screen refresh
        // Gets a fresh timestamp
        // Passes it into your function as time
        animationId = requestAnimationFrame(gameLoop);

        // only update game state at fixed intervals
        if (time - lastTime < GAME_SPEED) return;

        lastTime = time;

        // clear ONLY previous dynamic positions
        clearCell(squares[pacmanPrevIndex]);
        // move entities
        pacman.move(squares, width);

        const currentPacmanSquare = squares[pacman.currentIndex];
        if (currentPacmanSquare.classList.contains('power-pellet')) {
            pacman.points += 50;
            pacman.isPowered = true;
            pacman.powerEndTime = Date.now() + 10000; // 10 seconds
            currentPacmanSquare.classList.remove('power-pellet');
            // Set ghosts to scared
            ghosts.forEach(g => {
                g.isScared = true;
                g.isFlashing = false;
            });
        }

        if (pacman.isPowered) {
            const timeLeft = pacman.powerEndTime - Date.now();
            if (timeLeft <= 0) {
                pacman.isPowered = false;
                ghosts.forEach(g => {
                    g.isScared = false;
                    g.isFlashing = false;
                });
            } else if (timeLeft < 2000 && g.isScared) {
                ghosts.forEach(g => g.isFlashing = true);
            }
        }

        ghostPrevIndexes.forEach(i => clearCell(squares[i], true));
        ghosts.forEach(ghost => ghost.move(squares, width));


        // Check ghost collision
        ghosts.forEach((g, i) => {
            const ghostPrev = ghostPrevIndexes[i];

            const sameTile = g.currentIndex === pacman.currentIndex;
            const crossed =
                g.currentIndex === pacmanPrevIndex &&
                ghostPrev === pacman.currentIndex;

            if (sameTile || crossed) {
                if (pacman.isPowered && g.isScared) {
                    pacman.points += 200;
                    g.reset();
                } else {
                    pacman.collidedWithGhost = true;
                }
            }
        });

        if (pacman.collidedWithGhost) {
            isGameOver = true;
            cancelAnimationFrame(animationId);
            showGameOver(pacman.points);
            return; // stop the game loop
        }

        updateScore(document.getElementById('score'), pacman.points);

        // draw pacman
        drawPacman(squares[pacman.currentIndex]);

        // draw ghosts
        ghosts.forEach(ghost => {
            drawGhost(squares[ghost.currentIndex], ghost, ghost.isScared);
        });

        // update previous positions
        pacmanPrevIndex = pacman.currentIndex;
        ghostPrevIndexes = ghosts.map(g => g.currentIndex);
    }
});