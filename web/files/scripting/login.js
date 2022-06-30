function generateLoginField() {

    const element = document.querySelector(".loginForm");
    element ? element.remove() : null;

    new ElementCreator("form")
        .with("class", "loginForm")
        .with("action", "javascript:login()")
        .append(new ElementCreator("input")
            .id("username")
            .with("type", "text")
            .with("placeholder", "username / e-mail")
            .with("required"))
        .append(new ElementCreator("input")
            .id("password")
            .with("type", "password")
            .with("placeholder", "password")
            .with("required"))
        .append(new ElementCreator("div")
            .with("class", "buttonFlex")
            .append(new ElementCreator("button")
                .with("class", "submitButton")
                .text("Login")
                .with("type", "submit")
            )
            .append(new ElementCreator("button")
                .with("class", "resetButton")
                .text("Reset")
                .listener("click", () => {
                    document.querySelectorAll(".loginForm input")
                        .forEach(textField => {
                            textField.value = null;
                        });
                })
            )
        )
        .append(new ElementCreator("p")
            .text("Not yet registered?")
            .append(new ElementCreator("a")
                .text("Sign Up")
                .listener("click", () => generateRegisterField())
            )
        )
        .appendTo(document.querySelector(".styleForm"))
}

function generateRegisterField() {

    const elem = document.querySelector(".loginForm");
    elem ? elem.remove() : null;

    new ElementCreator("form")
        .with("class", "loginForm")
        .with("action", "javascript:register()")
        .append(new ElementCreator("input")
            .id("username")
            .with("type", "text")
            .with("name", "username")
            .with("placeholder", "username / e-mail")
            .with("required"))
        .append(new ElementCreator("input")
            .id("password")
            .with("type", "password")
            .with("name", "password")
            .with("placeholder", "password")
            .with("required"))
        .append(new ElementCreator("input")
            .id("email")
            .with("type", "email")
            .with("name", "email")
            .with("placeholder", "max@kilian.oliver")
            .with("required"))
        .append(new ElementCreator("div")
            .with("class", "buttonFlex")
            .append(new ElementCreator("button")
                .with("class", "submitButton")
                .text("Create")
                .with("type", "submit")
            )
            .append(new ElementCreator("button")
                .with("class", "resetButton")
                .text("Reset")
                .listener("click", () => {
                    document.querySelectorAll(".loginForm input")
                        .forEach(textField => {
                            textField.value = null;
                        });
                })
            )
        )
        .append(new ElementCreator("p")
            .text("Already have an account?")
            .append(new ElementCreator("a")
                .text("Sign In")
                .listener("click", () => generateLoginField())
            )
        )
        .appendTo(document.querySelector(".styleForm"))
}

function login() {

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user !== "" && pass !== "") {

    fetch("/api/user/login", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: user,
            password: pass
        })
    }).then(res => res.json())
        .then(data => {

            if (data.bo) {
                alert("Successfully logged in to your account.");
                window.location.href = localStorage.getItem("page");

            } else if (data.bo === false) {
                alert("Your username or password is incorrect.");
            } else {
                alert("An error occurred while logging in to your account.");
            }
        })
    } else {
        //alert("Please enter a username and a password.");
    }
}

function register() {

    fetch("/api/user/register", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            email: document.getElementById("email").value
        })
    }).then(res => res.json())
        .then(data => {

            if (data.bo) {
                alert("Successfully created your account.");
                generateLoginField();
            } else if (data.bo === false) {
                alert("There already is an existing account with this username or email address.");
            } else {
                alert("An error occurred while creating your account.");
            }
        })
}

document.addEventListener("DOMContentLoaded", function (event) {

    generateLoginField();

});