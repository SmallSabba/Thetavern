const resetButton = document.querySelector('.resetButton');
const submitButton = document.querySelector('.submitButton');
const loginForm = document.querySelector('.loginForm');

resetButton.addEventListener('click', () => {
    loginForm.reset();
});
