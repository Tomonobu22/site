import { width } from './board.js';

export default class Pacman {
    constructor(startIndex) {
        this.currentIndex = startIndex;
        this.direction = null;
        this.nextDirection = null;
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
            this.currentIndex += moves[this.direction];
        }
    }

    canMove(direction, squares) {
        const moves = {
            left: -1,
            right: 1,
            up: -width,
            down: width
        };

        const nextSquare = squares[this.currentIndex + moves[direction]];
        return nextSquare && !nextSquare.classList.contains('wall');
    }
}