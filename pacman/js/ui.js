export function clearCell(square, isGhost) {
    if (isGhost)
    {
        square.classList.remove('ghost', 'scared-ghost', 'blinky', 'pinky', 'inky', 'clyde');
    }
    else {
        square.className = '';
    }
}

export function drawWall(square) {
    square.classList.add('wall');
}

export function drawPacDot(square) {
    square.classList.add('pac-dot');
}

export function drawPacman(square) {
    square.classList.add('pac-man');
}

export function drawGhost(square, ghost, isScared) {
    if (isScared) {
        square.classList.add('scared-ghost');
    } else {
        square.classList.add('ghost', ghost.name);
    }
}

export function updateScore(element, score) {
    element.textContent = score;
}