const backgroundImg =
    [
        "/slidePictures/slidePicture1.jpg",
        "/slidePictures/slidePicture2.jpg",
        "/slidePictures/slidePicture3.jpg",
        "/slidePictures/slidePicture4.jpg",
    ];

const headerHeading =
    [
        "Travel the World",
        "No Restrictions",
        "Enjoy life to the fullest",
        "Retake freedom"
    ];

const headerSubheading =
    [
        "There are no obstacles anymore",
        "Roam like you want",
        "That's your company's motto",
        "It's in your hands"
    ];

window.onload = function () {

    toggleToTopButton();

    if (innerWidth > 1080) {
        document.querySelector(".collapsible-menu").style.transition = "400ms";
    } else {
        document.querySelector(".collapsible-menu").style.transition = "0ms";
    }

    function changeImage() {
        const i = Math.floor((Math.random() * 3) + 1);

        document.getElementById("containerHeader").style.backgroundImage = "url('" + backgroundImg[i] + "')";
        document.getElementById("headerHeading").innerText = headerHeading[i];
        document.getElementById("headerSubheading").innerText = headerSubheading[i];
    }

    setInterval(changeImage, 5000);
}

//--------------------------------------------------------------------------------------------------\\


document.getElementById("collapsible").addEventListener("click", boxClicked);
document.querySelector("#bars").addEventListener("click", boxClicked);
document.querySelector(".collapsible-menu ul").addEventListener("mouseover", toggleLabelHover);
window.addEventListener("resize", showMenuContent);
window.addEventListener("scroll", toggleToTopButton);

document.querySelector(".menuBars").addEventListener("mouseover", mouseOver);
document.querySelector(".menuBars").addEventListener("mouseleave", mouseLeave);

let isVisible = false;
let allowDeactivation;


function toggleToTopButton() {

    if (window.scrollY >= innerHeight / 4 * 3) {
        document.querySelector(".toTop").style.opacity = "1";

    } else {
        document.querySelector(".toTop").style.opacity = "0";
    }
}

function showMenuContent() {

    let elements = document.querySelector(".menuList").getElementsByTagName("li");
    let collapsibleMenu = document.querySelector(".collapsible-menu");

    if (innerWidth > 1080) {
        collapsibleMenu.style.transition = "400ms";
    }
    if (innerWidth <= 1080) {
        collapsibleMenu.style.transition = "0ms";
    }

    if (innerWidth > 1080) {
        document.querySelector(".menuList").style.visibility = "visible";
        collapsibleMenu.style.visibility = "hidden";

        for (let i = 0; i < elements.length; i++) {
            elements[i].style.transition = "400ms";
        }
    }

    if (innerWidth <= 1080) {
        collapsibleMenu.style.visibility = "visible";

        if (!isVisible) {
            document.querySelector(".menuList").style.visibility = "hidden";

            for (let i = 0; i < elements.length; i++) {
                elements[i].style.transition = "0ms";
            }
        }
    }
}

function toggleMenu() {

    if (!isVisible) {
        isVisible = false;
        document.querySelector(".menuList").style.visibility = "hidden";
        document.querySelector(".bars").style.transform = "rotate(0deg)";
        document.querySelector(".nav").style.height = "0";

        document.querySelector("#bars").style.backgroundColor = "transparent";
        document.querySelector("#barLabel").style.color = "#0a4a65";

    } else {
        isVisible = true;
        allowDeactivation = true;
        document.querySelector(".menuList").style.visibility = "visible";
        document.querySelector(".bars").style.transform = "rotate(90deg)";
        document.querySelector(".nav").style.height = "fit-content";

        document.querySelector("#bars").style.backgroundColor = "#0a4a65";
        document.querySelector("#barLabel").style.color = "#c1e3f3";

        toggleLabelHover();
    }
}

function boxClicked() {

    isVisible = !isVisible;

    let elements = document.getElementsByTagName("li");

    if (isVisible) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.transitionDuration = "400ms";
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.transitionDuration = "0ms";
        }
    }

    toggleMenu();
}

function mouseOver() {

    document.getElementById("bars").style.backgroundColor = "#0a4a65";
    document.getElementById("barLabel").style.color = "#c1e3f3";
}

function mouseLeave() {

    if (!isVisible) {
        document.getElementById("bars").style.backgroundColor = "transparent";
        document.getElementById("barLabel").style.color = "#0a4a65";
    }
}

function toggleLabelHover() {

    if (allowDeactivation) {
        document.querySelector(".menuBars").removeEventListener("mouseover", mouseOver);
        allowDeactivation = false;
    } else {
        document.querySelector(".menuBars").addEventListener("mouseover", mouseOver);
    }
}