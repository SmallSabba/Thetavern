window.addEventListener("scroll", toggleToTopButton);

function toggleToTopButton() {

    if (window.scrollY >= innerHeight / 2) {
        document.querySelector(".toTop").style.opacity = "1";

    } else {
        document.querySelector(".toTop").style.opacity = "0";
    }
}

window.onload = function () {

    toggleToTopButton();

    if (innerWidth > 1080) {
        document.querySelector(".collapsible-menu").style.transition = "400ms";
    } else {
        document.querySelector(".collapsible-menu").style.transition = "0ms";
    }

}

//--------------------------------------------------------------------------------------------------\\


document.getElementById("collapsible").addEventListener("click", boxClicked);
//document.querySelector(".containerHeader").addEventListener("mouseover", toggleLabelHover);
window.addEventListener("resize", showMenuContent);
window.addEventListener("scroll", toggleToTopButton);

document.getElementById("barLabel").addEventListener("mouseover", mouseOver);
document.getElementById("barLabel").addEventListener("mouseleave", mouseLeave);

document.getElementById("icon1").addEventListener("mouseover", mouseOver);
document.getElementById("icon1").addEventListener("mouseleave", mouseLeave);

document.getElementById("icon2").addEventListener("mouseover", mouseOver);
document.getElementById("icon2").addEventListener("mouseleave", mouseLeave);

let isVisible;
let allowDeactivation;


function toggleToTopButton() {


    if (window.scrollY >= innerHeight / 4 * 3) {
        document.querySelector(".toTop").style.opacity = "1";

    } else {
        document.querySelector(".toTop").style.opacity = "0";

    }
    /*
    if (button.style.opacity === "0" && window.scrollY < innerHeight / 4 * 3) {
        setTimeout(display, 2000);

    } else if (button.style.opacity === "1") {

        setTimeout(display2, 3000);
    }
     */

}

/*
function display() {

    if (button.style.opacity === "0") button.style.display = "none";

}
function display2() {

    if (button.style.opacity === "1") button.style.display = "block";
}

 */


function showMenuContent() {

    let elements = document.getElementsByTagName("li");
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


        document.querySelector("#barLabel").style.backgroundColor = "transparent";
        document.querySelector("#barLabel").style.color = "#0a4a65";

    } else {
        isVisible = true;
        allowDeactivation = true;
        document.querySelector(".menuList").style.visibility = "visible";
        document.querySelector(".bars").style.transform = "rotate(90deg)";
        document.querySelector(".nav").style.height = "fit-content";

        document.querySelector("#barLabel").style.backgroundColor = "#0a4a65";
        document.querySelector("#barLabel").style.color = "#c1e3f3";

        //toggleLabelHover();
    }
}

function boxClicked() {

    isVisible = document.getElementById("collapsible").checked;
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

    this.style.backgroundColor = "#0a4a65";
    this.style.color = "#c1e3f3";
}

function mouseLeave() {

    if (this.id === "barLabel" && !isVisible) {
        this.style.backgroundColor = "transparent";
        this.style.color = "#0a4a65";
    } else if (this.id !== "barLabel") {
        this.style.backgroundColor = "transparent";
        this.style.color = "#0a4a65";
    }
}

function toggleLabelHover() {

    if (allowDeactivation) {
        document.getElementById("barLabel").removeEventListener("mouseover", mouseOver);
        allowDeactivation = false;
    } else {
        document.getElementById("barLabel").addEventListener("mouseover", mouseOver);
    }
}