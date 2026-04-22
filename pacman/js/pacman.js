import { width } from './board.js';

export default class Pacman {
    constructor(startIndex) {
        this.currentIndex = startIndex;
        this.direction = null;
        this.nextDirection = null;
        this.points = 0;
        this.collidedWithGhost = false;
        this.isPowered = false;
        this.powerEndTime = 0;
    }

    move(squares) {
        const moves = {
            left: -1,
            right: 1,
            up: -width,
            down: width
        };

        if (this.nextDirection && this.canMove(this.nextDirection, squares)) {
            this.direction = this.nextDirection;
        }

        if (this.direction && this.canMove(this.direction, squares)) {
            let nextIndex = this.currentIndex + moves[this.direction];
            this.currentIndex = nextIndex === 272 ? 293 : nextIndex === 294 ? 273 : nextIndex;
            // Add points for pac-dot or power-pellet
            const currentSquare = squares[this.currentIndex];
            if (currentSquare.classList.contains('pac-dot')) {
                this.points += 10;
                currentSquare.classList.remove('pac-dot');
            }
        }
    }

    canMove(direction, squares) {
        const moves = {
            left: -1,
            right: 1,
            up: -width,
            down: width
        };

        let nextIndex = this.currentIndex + moves[direction];
        if (nextIndex === 272) nextIndex = 293;
        else if (nextIndex === 294) nextIndex = 273;

        const nextSquare = squares[nextIndex];
        return nextSquare && !nextSquare.classList.contains('wall');
    }

    reset(startIndex) {
        this.currentIndex = startIndex;
        this.direction = null;
        this.nextDirection = null;
        this.points = 0;
        this.collidedWithGhost = false;
    }
}