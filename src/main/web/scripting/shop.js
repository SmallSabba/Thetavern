window.addEventListener("scroll", toggleToTopButton);

function toggleToTopButton() {

    if (window.scrollY >= innerHeight / 2) {
        document.querySelector(".toTop").style.opacity = "1";

    } else {
        document.querySelector(".toTop").style.opacity = "0";
    }
}