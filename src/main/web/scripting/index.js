window.onload = function () {
    const backgroundImg =
        [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1517057011470-8f36d636e6ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/flagged/photo-1552035791-b3cc1632e933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
            "https://images.unsplash.com/photo-1574700273608-7962d3602a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1605045544284-d13c6d6a60a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        ];

    const headerHeading =
        [
            "Travel the World",
            "No Restrictions",
            "Enjoy life to the fullest"
        ];

    const headerSubheading =
        [
            "There are no obstacles anymore",
            "Roam like you want",
            "That's your company's motto"
        ];

    function changeImage() {
        const i = Math.floor((Math.random() * 3));

        document.getElementById("containerHeader").style.backgroundImage = "url('" + backgroundImg[i] + "')";
        document.getElementById("headerHeading").innerText = headerHeading[i];
        document.getElementById("headerSubheading").innerText = headerSubheading[i];
    }

    setInterval(changeImage, 5000);
}

//--------------------------------------------------------------------------------------------------\\


document.getElementById("collapsible").addEventListener("click", boxClicked);
document.getElementById("barLabel").addEventListener("mouseover", mouseOver);
document.getElementById("barLabel").addEventListener("mouseleave", mouseLeave);
document.querySelector(".containerHeader").addEventListener("mouseover", toggleLabelHover);
window.addEventListener("resize", showMenuContent);

let isVisible;
let allowDeactivation;

function showMenuContent() {

    let elements = document.getElementsByTagName("li");

    if (innerWidth >= 1080) {
        document.querySelector(".menuList").style.visibility = "visible";

        for (let i = 0; i < elements.length; i++) {
            elements[i].style.transitionDuration = "400ms";
        }

    } else if (innerWidth < 1080 && !isVisible ) {
        document.querySelector(".menuList").style.visibility = "hidden";

        for (let i = 0; i < elements.length; i++) {
            elements[i].style.transitionDuration = "0ms";
        }
    }
}

function toggleMenu() {

    if (!isVisible) {
        isVisible = false;
        document.querySelector(".menuList").style.visibility = "hidden";
        document.querySelector(".bars").style.transform = "rotate(0deg)";
        document.querySelector(".nav").style.height = "0";


        document.querySelector("#barLabel").style.backgroundColor = "#fff";
        document.querySelector("#barLabel").style.color = "#0a4a65";

    } else {
        isVisible = true;
        allowDeactivation = true;
        document.querySelector(".menuList").style.visibility = "visible";
        document.querySelector(".bars").style.transform = "rotate(90deg)";
        document.querySelector(".nav").style.height = "fit-content";

        document.querySelector("#barLabel").style.backgroundColor = "#0a4a65";
        document.querySelector("#barLabel").style.color = "#c1e3f3";

        toggleLabelHover();
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

    document.querySelector("#barLabel").style.backgroundColor = "#0a4a65";
    document.querySelector("#barLabel").style.color = "#c1e3f3";

}
function mouseLeave() {

    if (!isVisible) {
        document.querySelector("#barLabel").style.backgroundColor = "#fff";
        document.querySelector("#barLabel").style.color = "#0a4a65";
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