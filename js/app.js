const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const success = document.querySelector('#success');
const errors = document.querySelectorAll('.error');

function validateForm(){
    let errorFlag = false;
    errorFlag = validateName() || emailIsValid();

    return !errorFlag;
}

function validateName(){
    let error = false;
    if(userName.value.length < 2){
        errors[0].innerHTML = "Invalid name (Too short)";
        errors[0].style.backgroundColor = "rgb(238, 166, 166)";
        userName.focus();
        userName.select();
        error = true;
    }
    else{
        errors[0].innerHTML = "";
        error = false;
    }

    return error;
}

function emailIsValid(){
    let error = false;
    var pattern = /^\S+@\S+\.\S+$/;
    if(!pattern.test(email.value)){
        errors[1].innerHTML = "Invalid email";
        errors[1].style.backgroundColor = "rgb(238, 166, 166)";
        email.focus();
        email.select();
        error = true;
    }
    else{
        errors[1].innerHTML = "";
        error = false;
    }
    return error;
}


var aboutMe = document.getElementById("aboutMe");
var projects = document.getElementById("projects");
var contactMe = document.getElementById("contactMe");
var pages = document.querySelectorAll('.nav-link');
var demoDiv = document.getElementById("demo");
pages.forEach(element => {
    element.addEventListener("click", function(event) {
        event.preventDefault();
        if(element.textContent == "Home") window.scrollTo(0,0);
        if(element.textContent == "About") window.scrollTo(0,aboutMe.offsetTop);
        if(element.textContent == "Portfolio") window.scrollTo(0,projects.offsetTop);
        if(element.textContent == "Contact") window.scrollTo(0,contactMe.offsetTop);
    })
});

document.getElementById("letsTalk").addEventListener("click", function(event) {
    event.preventDefault();
    window.scrollTo(0,contactMe.offsetTop);
});

var seeProjects = document.querySelectorAll(".seeProjects");
seeProjects.forEach(element => {
    element.addEventListener("click", function(event) {
        event.preventDefault();
        window.scrollTo(0,projects.offsetTop);
    });
})


