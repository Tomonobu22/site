const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const gameOver = document.getElementById("gameOver");
const fragment = document.createDocumentFragment();
const boardWidth = 560;
const boardHeight = 300;
const blockWidth = 100;
const ballDiameter = 20;
const blockHeight = 20;
let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0;

const userStart = [230,10];
let currentPosition = userStart;

const ballStart = [270,40];
let  currentPositionBall = ballStart;

class Block{
	constructor(xAxis, yAxis){
		this.bottomLeft = [xAxis,yAxis];
		this.bottomRight = [xAxis + blockWidth, yAxis];
		this.topLeft = [xAxis,yAxis + blockHeight];
		this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
	}
}


const blocks = [
	new Block(10,270),
	new Block(120,270),
	new Block(230,270),
	new Block(340,270),
	new Block(450,270),
	new Block(10,240),
	new Block(120,240),
	new Block(230,240),
	new Block(340,240),
	new Block(450,240),	
	new Block(10,210),
	new Block(120,210),
	new Block(230,210),
	new Block(340,210),
	new Block(450,210),	
];


function addBlocks() {
	for (let i = 0; i < blocks.length; i++) {
		const block = document.createElement('div');
		block.classList.add("block");
		block.style.left = blocks[i].bottomLeft[0]+'px';
		block.style.bottom = blocks[i].bottomLeft[1]+'px';
		fragment.appendChild(block)	
	}
	grid.appendChild(fragment);
}


addBlocks();


//add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

//draw user
function drawUser() {
	user.style.left = currentPosition[0]+'px';
	user.style.bottom = currentPosition[1]+'px';
}

//draw ball
function drawBall() {
	ball.style.left = currentPositionBall[0]+'px';
	ball.style.bottom = currentPositionBall[1]+'px';
}


//move user
function moveUser(e) {
	switch(e.key){
		case 'ArrowLeft':
			if (currentPosition[0] >= 10){
				currentPosition[0] -= 10;
				drawUser();				
			}
			break;
		case 'ArrowRight':
			if (currentPosition[0] <= boardWidth - blockWidth - 10){
				currentPosition[0] += 10;
				drawUser();
			}
			break;
	}
}

document.addEventListener('keydown',moveUser);

//add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);


//move ball
function moveBall() {
	currentPositionBall[0]+=xDirection;
	currentPositionBall[1]+=yDirection;
	drawBall();
	checkForCollisions();
}

timerId = setInterval(moveBall,15);

//check for collisions
function checkForCollisions() {
	//check for block collisions
	for (let i=0; i<blocks.length; i++){
		if (
			currentPositionBall[0] > blocks[i].bottomLeft[0] && 
			currentPositionBall[0] < blocks[i].bottomRight[0] && 
			currentPositionBall[1] + ballDiameter > blocks[i].bottomLeft[1] && 
			currentPositionBall[1] < blocks[i].topLeft[1]
			){
			const allBlocks = Array.from(document.querySelectorAll('.block'));
			allBlocks[i].classList.remove('block');	
			blocks.splice(i,1);
			changeDirection();
			score++;
			scoreDisplay.textContent = score;

			//check for win
			if (blocks.length === 0){
				scoreDisplay.textContent= "YOU WIN";
				clearInterval(timerId);
				document.removeEventListener('keydown',moveBall);
			}

		}
	}

	//check for wall collisions
	if (
		currentPositionBall[0] >= boardWidth - ballDiameter || 
		currentPositionBall[0] <= 0 || 
		currentPositionBall[1] >= boardHeight - ballDiameter){
		changeDirection();
	}

	//check for user collision
	if (
		currentPositionBall[0] > currentPosition[0] && 
		currentPositionBall[0] < currentPosition[0] + blockWidth && 
		currentPositionBall[1] > currentPosition[1] &&
		currentPositionBall[1] < currentPosition[1] + blockHeight
		){
		changeDirection();
	}

	//check for game over
	if(currentPositionBall[1] <= 0){
		clearInterval(timerId);
		scoreDisplay.innerHTML= 'You lose';
		gameOver.style.display = "block";
		gameOver.addEventListener("click",()=>{location.reload(); })
		document.removeEventListener('keydown',moveUser);
	}
}

function changeDirection() {
	if (xDirection === 2 && yDirection === 2){
		yDirection = -2;
		return
	}
	if (xDirection === 2 && yDirection === -2){
		xDirection = -2;
		return
	}
	if (xDirection === -2 && yDirection === -2){
		yDirection = 2;
		return
	}
	if (xDirection === -2 && yDirection === 2){
		xDirection = 2;
		return
	}			

	// if(currentPositionBall[0] >= boardWidth - ballDiameter || currentPositionBall[0] <= 0){
	// 	xDirection = xDirection * (-1);
	// 	return;
	// }
	// if(currentPositionBall[1] >= boardHeight - ballDiameter){
	// 	yDirection = yDirection * (-1);
	// 	return;
	// }

}