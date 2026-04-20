import { createBoard, width } from './board.js';
import Pacman from './pacman.js';
import Ghost from './ghost.js';
import { drawPacman, drawGhost, clearCell } from './ui.js';

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

    // Pacman controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') pacman.nextDirection = 'left';
        if (e.key === 'ArrowRight') pacman.nextDirection = 'right';
        if (e.key === 'ArrowUp') pacman.nextDirection = 'up';
        if (e.key === 'ArrowDown') pacman.nextDirection = 'down';
    });

    // Game loop
    function gameLoop(time) {

        // Call gameLoop again on the next frame.
        // Browser waits until next screen refresh
        // Gets a fresh timestamp
        // Passes it into your function as time
        requestAnimationFrame(gameLoop);

        // only update game state at fixed intervals
        if (time - lastTime < GAME_SPEED) return;
 

        lastTime = time;

        // clear ONLY previous dynamic positions
        clearCell(squares[pacmanPrevIndex]);
        ghostPrevIndexes.forEach(i => clearCell(squares[i], true));

        // move entities
        pacman.move(squares, width);
        ghosts.forEach(ghost => ghost.move(squares, width));

        // draw pacman
        drawPacman(squares[pacman.currentIndex]);

        // draw ghosts
        ghosts.forEach(ghost => {
            drawGhost(squares[ghost.currentIndex], ghost, false);
        });

        // update previous positions
        pacmanPrevIndex = pacman.currentIndex;
        ghostPrevIndexes = ghosts.map(g => g.currentIndex);
    }

    // 5. START GAME LOOP
    gameLoop();
});