let weather = {
    "apiKey": "270f1c7da04edef9d74b37ad002e2944",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&units=metric&appid="
        + this.apiKey)
        .then(res=> res.json())
        .then(data => this.displayWeather(data));
    },
    displayWeather: function(data){
        const name = data.name;
        const icon = data.weather[0].icon;
        const description = data.weather[0].description;
        const {temp,humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector('.city').textContent = "Weather in "+ name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/"+ icon+ ".png";
        //@2x.png for increase the size of  the image
        document.querySelector('.description').textContent = description;
        document.querySelector('.temp').textContent = temp + "ºC";
        document.querySelector('.humidity').textContent = "Humidity: "+ humidity + "%";
        document.querySelector('.wind').textContent = "Wind speed: " + speed + " km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+name+"')";
        document.querySelector(".weather").classList.remove('loading');

    },
    search: function(){
        this.fetchWeather(document.querySelector('.search-bar').value)
    }

}

document.querySelector('.search button').addEventListener('click',()=>{
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup',(e)=>{
    if(e.keyCode == 13 && 
        document.querySelector('.search-bar').value != ""){
        weather.search();
    }
});

weather.fetchWeather("Tokyo");