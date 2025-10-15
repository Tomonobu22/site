const pokemon = document.querySelector('.pokemon');
const score = document.querySelector('.score');
const stars = document.querySelector('.stars');
const skip = document.querySelector('.skip');
const restart = document.querySelector('.restart');
const guess = document.querySelector('.guess');
const letters = document.querySelector('.letters');
const fragment = document.createDocumentFragment();
const _buttons = document.querySelectorAll('.button');
let _name;
let positions;
let reveal = [];
let _score = 0;
let opportunities = 2;
let _opportunities = ['<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>','<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>','<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'];


let poke = {
    api: 'https://pokeapi.co/api/v2/pokemon/',
    keyName: Math.round(Math.random()*899),
    //initialize and ask for the info
    info: function(){
         fetch(this.api+this.keyName)
        .then(res => res.json())
        .then(data => this.image(data))
    },
    //obtain the image and ask for the others functions
    image: function(data){
        if(data.sprites.front_default == null) nextPokemon();
        pokemon.src = data.sprites.front_default;
        _name = data.name;
        this.random();
        this.guess(reveal);
    },
    //random letters for 12 buttons
    random: function(){
        let arr1 = [];
        let a=0;
        let letter = "a";

        for (let i=0;i<_name.length;i++){
            if(!arr1.includes(_name[i])){
                arr1[a] = _name[i];
                a++;
            }
        }
        while (a < 12){
            let m = Math.round(Math.random()*25)+97;
            letter  = String.fromCharCode(m);
            if(!arr1.includes(letter)){
                arr1[a] = letter;
                a++;
            }
        }
        for (let i=11;i>=0;i--){
            let m = Math.round(Math.random()*i)
            _buttons[Math.abs(i-11)].textContent = arr1[m];
            arr1.splice(m,1);
        }        
    },
    //create the buttons and update them
    guess: function(pos){
        guess.innerHTML = '';
        for (let i=0;i<_name.length;i++){
            const item = document.createElement('div');
            if(pos.includes(i))item.textContent = _name[i];
            item.classList.add('square');
            fragment.appendChild(item);
        }      
        guess.appendChild(fragment);       
    }
}

//if you click a button
_buttons.forEach(element => {
    element.addEventListener('click',()=>{
        const data = element.textContent.toLowerCase();
        if(_name.includes(data) &&  !reveal.includes(_name.indexOf(data)) && opportunities>=0){
           ;
            let i = 0;
            let a = 0;
            positions = [_name.indexOf(data)];
            while (a != -1){ 
                a =_name.indexOf(data,positions[i]+1);   
                positions.push(a);
                i++;
            }
            positions.pop();
            reveal = reveal.concat(positions);
            reveal.sort();
            // Reveal contains the positions of the letters that the user accerts
            poke.guess(reveal);
            element.classList.add("hidden");
        } 

        if(reveal.length == _name.length)
        {
            _score+=10;
            score.textContent = "Score: "+_score;
            nextPokemon();
            opportunities = 2;
            stars.innerHTML = _opportunities[2];            
        }
        
        if(!_name.includes(data)){
            opportunities--;
            if(opportunities>=0){
                element.classList.add("hidden");
                stars.innerHTML = _opportunities[opportunities];
            }else {
                stars.textContent = 'YOU LOSE';
                restart.classList.remove('hidden');
                skip.classList.add('hidden');
            }
        } 
          
    })
});

skip.addEventListener('click',()=>{
    if(_score>=5){
        _score-=5;
        score.textContent = "Score: "+_score; 
    }
    nextPokemon();
})

const nextPokemon = function(){
    poke.keyName = Math.round(Math.random()*899);
    reveal = [];
    _buttons.forEach(element=>{
        element.classList.remove('hidden');
    });   
    poke.info(); 
}

restart.addEventListener('click',()=>{
    location.reload();
})

poke.info();
score.textContent = "Score: "+_score;

