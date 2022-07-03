function resetInputFields() {

    document.querySelectorAll(".loginForm input")
        .forEach(textField => {
            textField.value = null;
        });

    displayIncorrectInputMessage("none");
}

function displayIncorrectInputMessage(display) {

    document.getElementById("incorrectInputMessage").style.display = display;
}

function generateLoginField() {

    localStorage.setItem("formType", "login");

    const element = document.querySelector(".loginForm");
    element ? element.remove() : null;

    new ElementCreator("form")
        .with("class", "loginForm")
        .listener("submit", login)
        .append(new ElementCreator("input")
            .with("type", "text")
            .with("name", "username")
            .with("placeholder", "username / e-mail")
            .with("required")
        )
        .append(new ElementCreator("input")
            .with("type", "password")
            .with("name", "password")
            .with("placeholder", "password")
            .with("required")
        )
        .append(new ElementCreator("p")
            .id("incorrectInputMessage")
            .text("Your username or password is incorrect.")
        )
        .append(new ElementCreator("div")
            .with("class", "buttonFlex")
            .append(new ElementCreator("button")
                .with("class", "submitButton")
                .text("Login")
            )
            .append(new ElementCreator("button")
                .with("class", "resetButton")
                .text("Reset")
                .listener("click", () => {
                    resetInputFields();
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

    localStorage.setItem("formType", "register");

    const elem = document.querySelector(".loginForm");
    elem ? elem.remove() : null;

    new ElementCreator("form")
        .with("class", "loginForm")
        .listener("submit", register)
        .append(new ElementCreator("input")
            .with("type", "text")
            .with("name", "username")
            .with("placeholder", "username / e-mail")
            .with("required"))
        .append(new ElementCreator("input")
            .with("type", "password")
            .with("name", "password")
            .with("placeholder", "password")
            .with("required"))
        .append(new ElementCreator("input")
            .with("type", "email")
            .with("name", "email")
            .with("placeholder", "max@kilian.oliver")
            .with("required"))
        .append(new ElementCreator("p")
            .id("incorrectInputMessage")
            .text("There already is an existing account with this username or email address.")
        )
        .append(new ElementCreator("div")
            .with("class", "buttonFlex")
            .append(new ElementCreator("button")
                .with("class", "submitButton")
                .text("Create")
            )
            .append(new ElementCreator("button")
                .with("class", "resetButton")
                .text("Reset")
                .listener("click", () => {
                    resetInputFields();
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

function login(event) {

    event.preventDefault();
    const form = event.currentTarget;

    fetch("/api/user/login", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: form.username.value,
            password: form.password.value
        })
    }).then(res => res.json())
        .then(data => {

            if (data.bo) {
                displayIncorrectInputMessage("none");
                localStorage.removeItem("formType");

                window.location.href = localStorage.getItem("page");

            } else if (data.bo === false) {
                displayIncorrectInputMessage("block");

            } else {
                displayPopUpInfo("An error occurred while logging in to your account.");
            }
        })
}

function register(event) {

    event.preventDefault();
    const form = event.currentTarget;

    fetch("/api/user/register", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: form.username.value,
            password: form.password.value,
            email: form.email.value
        })
    }).then(res => res.json())
        .then(data => {

            if (data.bo) {
                displayPopUpInfo("Successfully created your account.");
                generateLoginField();
            } else if (data.bo === false) {
                //displayIncorrectInputMessage("block");
                displayPopUpInfo("There already is an existing account with this username or email address.")
            } else {
                displayPopUpInfo("An error occurred while creating your account.");
            }
        })
}

document.addEventListener("DOMContentLoaded", function (event) {

    if (localStorage.getItem("formType") === "login") {
        generateLoginField();
        //document.querySelector(".loginForm").addEventListener("submit", login);
    } else {
        generateRegisterField();
        //document.querySelector(".loginForm").addEventListener("submit", register);
    }
});