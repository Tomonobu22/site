document.addEventListener('DOMContentLoaded',()=>{
	const start = document.querySelector('.start');
	const grid = document.querySelector('.grid');
	const scoreDisplay = document.getElementById('score');
	let pacmanTimer = NaN;
	let pacmanDirection = "";
	let score=0;
	let extraScore=0;
	let count=0;
	let activeScaredGhost = 0;
	const width = 21;
	const height = 27; // 21*27 475 squares
	const layout = [
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
	1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,
	1,3,1,4,1,0,1,4,1,0,1,0,1,4,1,0,1,4,1,3,1,
	1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,
	1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,
	1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,
	1,1,1,1,1,0,1,1,1,4,1,4,1,1,1,0,1,1,1,1,1,
	4,4,4,4,1,0,1,4,4,4,4,4,4,4,1,0,1,4,4,4,4,
	4,4,4,4,1,0,1,4,1,2,2,2,1,4,1,0,1,4,4,4,4,
	1,1,1,1,1,0,1,4,1,2,2,2,1,4,1,0,1,1,1,1,1,
	4,4,4,4,4,0,4,4,1,2,2,2,1,4,4,0,4,4,4,4,4,
	1,1,1,1,1,0,1,4,1,1,1,1,1,4,1,0,1,1,1,1,1,
	4,4,4,4,1,0,1,4,4,4,4,4,4,4,1,0,1,4,4,4,4,
	4,4,4,4,1,0,1,4,1,1,1,1,1,4,1,0,1,4,4,4,4,
	1,1,1,1,1,0,1,4,1,1,1,1,1,4,1,0,1,1,1,1,1,
	1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
	1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,
	1,3,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,3,1,
	1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,
	1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,
	1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,
	1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
	];

	let squares = [];
	//0 - pac-dot 
	//1 - wall
	//2- ghost-lair
	//3 - power
	//4 - empty

//draw grid

	function createBoard(){
		for (let i =0; i <= layout.length; i++){
			const square = document.createElement('div');
			grid.appendChild(square);
			squares.push(square);
			if(layout[i]===0){
				squares[i].classList.add('pac-dot');
			} else if (layout[i] === 1){
				squares[i].classList.add('wall');
			} else if(layout[i] === 2){
				squares[i].classList.add('ghost-lair')
			} else if (layout[i] === 3){
				squares[i].classList.add('power-pellet');	
			}
		}
	}

	createBoard();
	let pacmanCurrentIndex = 325;
	squares[pacmanCurrentIndex].classList.add('pac-man');

	function movePacman() {	
		pacmanTimer = setInterval(function(){
			squares[pacmanCurrentIndex].classList.remove('pac-man');	
			if (pacmanDirection == "left"){
				if(!squares[pacmanCurrentIndex-1].classList.contains('wall')){ 
					pacmanCurrentIndex -=1;
				}
				else if(pacmanCurrentIndex-1 === 272) pacmanCurrentIndex = 293;		
			}
			else if (pacmanDirection == "up" && !squares[pacmanCurrentIndex-width].classList.contains('wall')){
				pacmanCurrentIndex-=width;
			}
			else if (pacmanDirection == "right"){
				if (!squares[pacmanCurrentIndex+1].classList.contains('wall'))
					pacmanCurrentIndex += 1;
				else if(pacmanCurrentIndex+1 === 294) pacmanCurrentIndex = 273;				
			}
			else if (pacmanDirection == "down" && !squares[pacmanCurrentIndex+width].classList.contains('wall') && !squares[pacmanCurrentIndex+width].classList.contains('ghost-lair')){
				pacmanCurrentIndex+=width;
			}	

			console.log(pacmanCurrentIndex);			
			pacDotEaten();
			powerPelletEaten();
			checkForWin();
			squares[pacmanCurrentIndex].classList.add('pac-man');	
		},350);
	}
	movePacman();


	function setDirection(e){
		switch(e.keyCode){
			case 37:
				if(!squares[pacmanCurrentIndex-1].classList.contains('wall') || pacmanCurrentIndex-1 === 272)
					pacmanDirection = "left";
				break	
			case 38:
				if (!squares[pacmanCurrentIndex-width].classList.contains('wall'))
					pacmanDirection = "up";
				break
			case 39: 
				if (!squares[pacmanCurrentIndex+1].classList.contains('wall') || pacmanCurrentIndex+1 === 294)			
					pacmanDirection = "right";
				break
			case 40:
				if (!squares[pacmanCurrentIndex+width].classList.contains('wall') && !squares[pacmanCurrentIndex+width].classList.contains('ghost-lair'))
					pacmanDirection = "down";
				break			
		}
	}
	
	//Put this down when the game starts
	//document.addEventListener('keydown',setDirection);


	//score
	function pacDotEaten(){
		if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
			score++;
			scoreDisplay.textContent = score+extraScore;
			squares[pacmanCurrentIndex].classList.remove('pac-dot');
		}
	}

	//when you eat a power-pellet
	function powerPelletEaten(){
		if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
			score+=10;
			scoreDisplay.textContent=score+extraScore;
			squares[pacmanCurrentIndex].classList.remove('power-pellet');
			activeScaredGhost = 1;
			timer = setTimeout(function(){ activeScaredGhost=0;},10000);
		}
	}

	// create Ghost
	class Ghost{
		constructor(className,startIndex,speed){
			this.className = className;
			this.startIndex = startIndex;
			this.speed = speed;
			this.currentIndex = startIndex;
			this.timeId = NaN;
		}
	}

	ghosts = [
		new Ghost('blinky',261,250),
		new Ghost('pinky',263,400),
		new Ghost('inky',282,300),
		new Ghost('clyde',284,500)
	];

	//draw

	ghosts.forEach(ghost =>{
		squares[ghost.currentIndex].classList.add(ghost.className);
		squares[ghost.currentIndex].classList.add('ghost');		
	})

	// move ghosts

	//Put down when the game starts
	//ghosts.forEach(ghost => moveGhost(ghost));

	function moveGhost(ghost){
		const directions = [-1,+1,width,-width];
		let direction = directions[Math.floor(Math.random()*directions.length)];
	
		ghost.timerId = setInterval(function(){
			if(!squares[ghost.currentIndex+direction].classList.contains('wall') && !squares[ghost.currentIndex+direction].classList.contains('ghost') && !squares[ghost.currentIndex+direction].classList.contains('scared-ghost')){
				squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost');				
				ghost.currentIndex += direction;
				if(activeScaredGhost===0)
				squares[ghost.currentIndex].classList.add(ghost.className,'ghost');		
				else squares[ghost.currentIndex].classList.add('scared-ghost');
			}
			else direction = directions[Math.floor(Math.random()*directions.length)]; 

			if(activeScaredGhost === 1 && squares[ghost.currentIndex].classList.contains('pac-man')){
				squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost');
				ghost.currentIndex = ghost.startIndex;
				extraScore+=100;
				scoreDisplay.textContent=score+extraScore;
				squares[ghost.currentIndex].classList.add(ghost.className,'ghost');

			}
			checkGameOver();
		},ghost.speed);
	}

	function checkGameOver(){
		if(activeScaredGhost === 0 && squares[pacmanCurrentIndex].classList.contains('ghost')){
			console.log("GAME OVER");
			ghosts.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener('keydown',setDirection);
			scoreDisplay.textContent='GAME OVER';
		}		
	}

	function checkForWin(){
		if(score >= 229){
			ghosts.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener('keydown',setDirection);
			scoreDisplay.textContent = 'YOU WON!';
		}
	}


	start.addEventListener('click',()=>{
		if(start.innerHTML == 'RESTART'){
			location.reload();
		} 	
		else{
			document.addEventListener('keydown',setDirection);
			ghosts.forEach(ghost => moveGhost(ghost));
			start.innerHTML = 'RESTART';
		}
	})


})