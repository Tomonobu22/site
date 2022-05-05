document.addEventListener('DOMContentLoaded',() =>{
    const section = document.querySelector('.section');
    const fragment = document.createDocumentFragment();
    const score = document.querySelector('.score');
    const gameOver = document.getElementById("gameOver");

    let grid =[];
    let snakePosition = 1415;
    let snakeLength = 10;
    let positions = [];
    let direction = 'right';
    let timerUp
    let timerDown
    let timerRight
    let timerLeft
    let dotPosition = 1415;
    let points = 0;
    let speed = 100;

    score.textContent = `Score ${points}`;

    function createBoard() {
        for(let i=0; i<50*50; i++){
            const pixel = document.createElement('div');
            grid.push(pixel);
            pixel.classList.add('empty');
            fragment.appendChild(pixel);
        }
        section.appendChild(fragment);
    }

    function initializeSnake() {
        for(let i=0; i<snakeLength; i++){
            grid[snakePosition+i].classList.add('snake'); 
            grid[snakePosition+i].classList.remove('empty');
            positions.push(snakePosition+i);
        }
    }

    createBoard();
    initializeSnake();

    function moveSnake(e){
        switch(e.keyCode){
            case 37:
                if(direction != 'right'){
                    clearIntervals();
                    timerLeft = setInterval(moveLeft,speed);
                }
                break;
            case 38:
                if(direction != 'down'){
                    clearIntervals();
                    timerUp = setInterval(moveUp,speed);
                } 
                break;
            case 39:
                if(direction != 'left'){
                    clearIntervals();
                    timerRight = setInterval(moveRight,speed);
                }
                break;
            case 40:
                if(direction != 'up'){
                    clearIntervals();
                    timerDown = setInterval(moveDown,speed);
                }              
                break;
        }
    }
    

    function changePositions(){
        grid[positions[positions.length-1]].classList.add('snake');
        grid[positions[positions.length-1]].classList.remove('empty');   
        
        if(positions[positions.length-1] != dotPosition){
            grid[positions[0]].classList.add('empty'); 
            grid[positions[0]].classList.remove('snake'); 
            positions.shift();   
        } else {
            points++
            createDots();
        };

        score.textContent = `Score ${points}`;
    }

    function moveLeft(){
        direction = 'left';
        if(positions[positions.length-1]%50 == 0 || positions.includes(positions[positions.length-1]-1))
        youLose();

        positions.push(positions[positions.length-1]-1);
        changePositions();
    }
    
    function moveRight(){
        direction = 'right';
        if(positions[positions.length-1]%50 == 49 || positions.includes((positions[positions.length-1]+1)))
        youLose();

        positions.push(positions[positions.length-1]+1);
        changePositions();
    }

    function moveUp(){
        direction = 'up';
        if(positions[positions.length-1] < 50 || positions.includes((positions[positions.length-1]-50)))
        youLose();

        positions.push(positions[positions.length-1]-50);
        changePositions();
    }
    
    function moveDown(){
        direction = 'down';
        if(positions[positions.length-1] > 2450 || positions.includes((positions[positions.length-1]+50))) 
        youLose();

        positions.push(positions[positions.length-1]+50);
        changePositions();
    }

    function createDots(){
        do {
        dotPosition = Math.floor(Math.random()*2500)+1;
        } while(positions.includes(dotPosition));

        grid[dotPosition].classList.add('snake');
        grid[dotPosition].classList.remove('empty');
    }
    createDots();

    function clearIntervals(){
        clearInterval(timerDown);
        clearInterval(timerLeft);
        clearInterval(timerRight);
        clearInterval(timerUp); 
    }

    function youLose(){
        clearIntervals();
        gameOver.style.display = "block";
        gameOver.addEventListener("click",()=>{location.reload(); })
        document.removeEventListener('keydown',moveSnake);
    }

    document.addEventListener('keydown',moveSnake);


})