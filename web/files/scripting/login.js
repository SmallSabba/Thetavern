

const resetButton = document.querySelector('.resetButton');
const submitButton = document.querySelector('.submitButton');
const loginForm = document.querySelector('.loginForm');
const errorMsg = document.querySelector('.errorMsg');
const username = document.querySelector('#username');


resetButton.addEventListener('click', () => {
    loginForm.reset();
});


window.alertLogin = function (username) {
    alert(username);
}




