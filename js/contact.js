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
        errors[0].innerHTML = "Invalid name";
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

// Navigation

const navSlide = () => {
    const responsive = document.querySelector('.responsive');
    const nav = document.querySelector('.nav__links');
    const navLinks = document.querySelectorAll('.nav__links li');
    const container = document.querySelector('.container');

    responsive.addEventListener('click',() => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation='';
            }
            else{
                link.style.animation = `navLinkFade 0.3s ease forwards ${index/7+0.6}s`;
            }
        })
    })
}

navSlide();