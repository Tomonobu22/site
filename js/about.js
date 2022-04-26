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