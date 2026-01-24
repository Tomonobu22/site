const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const success = document.querySelector('#success');
const errors = document.querySelectorAll('.error');

// Testing JWT Login 
const openLoginBtn = document.getElementById("openLoginBtn");
const loginBox = document.getElementById("loginBox");
const loginBtn = document.getElementById("loginBtn");
const result = document.getElementById("result");

let jwtToken = null;
let refreshToken = null;
openLoginBtn.addEventListener("click", () => {
    loginBox.classList.toggle("hidden");
});

loginBtn.addEventListener("click", async (e) => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    result.textContent = "Authenticating...";

    try {
        if (!jwtToken) {
            console.log("Requesting new token...");
            // Authentication request
            const authResponse = await fetch('https://budgettracker-h9brhqfedkb5fxd2.canadacentral-01.azurewebsites.net/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Email: username, Password: password })
            });

            if (authResponse.ok) {
                const authData = await authResponse.json();
                jwtToken = authData.token;
                refreshToken = authData.refreshToken;
                result.textContent = "Authentication successful!";
            } else {
                result.textContent = "Authentication failed.";
            }
        }

        // Call protected API
        if (jwtToken) {
            const apiResponse = await fetch('https://budgettracker-h9brhqfedkb5fxd2.canadacentral-01.azurewebsites.net/api/ReportApi/GetReport', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });

            if (!apiResponse.ok) {
                if (apiResponse.status === 401 && refreshToken) {
                    const authResponse = await fetch('https://budgettracker-h9brhqfedkb5fxd2.canadacentral-01.azurewebsites.net/api/auth/refresh-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ token: jwtToken, refreshToken: refreshToken })
                    });

                    if (authResponse.ok) {
                        const authData = await authResponse.json();
                        jwtToken = authData.token;
                        const apiResponse2 = await fetch('https://budgettracker-h9brhqfedkb5fxd2.canadacentral-01.azurewebsites.net/api/ReportApi/GetReport', {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${jwtToken}`
                            }
                        });
                        if (apiResponse2.ok) {
                            result.textContent += "\n  Token refreshed successfully.";
                            const apiData = await apiResponse2.json();
                            result.textContent += "\n  Protected API call successful!";
                            result.textContent += `\n  Report Data`;
                            result.textContent += `\n  Year: ${apiData.year}`;
                            result.textContent += `\n  Total Income: ${apiData.totalIncome}`;
                            result.textContent += `\n  Total Expenses: ${apiData.totalExpenses}`;
                            result.textContent += `\n  Total Investments: ${apiData.totalInvestments}`;
                        }
                        else {
                            result.textContent += "\n  Protected API call failed after token refresh.";
                            return;
                        }
                    }
                    else {
                        result.textContent += "\n  Token refresh failed.";
                        jwtToken = null;
                        refreshToken = null;
                        return;
                    }
                }
            }
            else {
                const apiData = await apiResponse.json();
                result.textContent += "\n  Protected API call successful!";
                result.textContent += `\n  Report Data`;
                result.textContent += `\n  Year: ${apiData.year}`;
                result.textContent += `\n  Total Income: ${apiData.totalIncome}`;
                result.textContent += `\n  Total Expenses: ${apiData.totalExpenses}`;
                result.textContent += `\n  Total Investments: ${apiData.totalInvestments}`;
            }
        }
    } catch (error) {
        result.textContent = "Error occurred during authentication.";
    }
});
// End of JWT Login Test

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


