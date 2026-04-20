export default class Ghost {
    constructor(name, startIndex, speed) {
        this.name = name;
        this.startIndex = startIndex;
        this.currentIndex = startIndex;
        this.speed = speed;
        this.direction = null;
    }

    move(squares, width) {
        const directions = [-1, 1, width, -width];

        // pick a random valid direction
        const validDirections = directions.filter(dir => {
            const nextSquare = squares[this.currentIndex + dir];
            return nextSquare && !nextSquare.classList.contains('wall');
        });

        if (validDirections.length > 0) {
            const randomDir = validDirections[Math.floor(Math.random() * validDirections.length)];
            this.currentIndex += randomDir;
        }
    }

    reset() {
        this.currentIndex = this.startIndex;
    }
}