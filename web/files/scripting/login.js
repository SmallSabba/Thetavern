const resetButton = document.querySelector('.resetButton');
const loginForm = document.querySelector('.loginForm');

resetButton.addEventListener('click', () => {
    loginForm.reset();
})
