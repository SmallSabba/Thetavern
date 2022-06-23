class ElementCreator {
    constructor(tag) {
        this.element = document.createElement(tag);
    }

    id(id) {
        console.log(id);
        this.element.id = id;
        return this;
    }

    class(clazz) {
        this.element.class = clazz;
        return this;
    }

    text(content) {
        this.element.innerHTML = content;
        return this;
    }

    with(name, value) {
        this.element.setAttribute(name, value)
        return this;
    }

    listener(name, listener) {
        this.element.addEventListener(name, listener)
        return this;
    }

    append(child) {
        child.appendTo(this.element);
        return this;
    }

    prependTo(parent) {
        parent.prepend(this.element);
        return this.element;
    }

    appendTo(parent) {
        parent.append(this.element);
        return this.element;
    }

    insertBefore(parent, sibling) {
        parent.insertBefore(this.element, sibling);
        return this.element;
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

document.getElementById("technicalInformationLabel").addEventListener("click", mouseClicked);
document.getElementById("technicalInformationLabel").addEventListener("mouseover", mouseOver);
document.getElementById("technicalInformationLabel").addEventListener("mouseleave", mouseLeave);

document.getElementById("productDescriptionLabel").addEventListener("click", mouseClicked);
document.getElementById("productDescriptionLabel").addEventListener("mouseover", mouseOver);
document.getElementById("productDescriptionLabel").addEventListener("mouseleave", mouseLeave);

document.getElementById("cartButton").addEventListener("mouseover", mouseOver);
document.getElementById("cartButton").addEventListener("mouseleave", mouseLeave);
document.getElementById("purchaseButton").addEventListener("mouseover", mouseOver);
document.getElementById("purchaseButton").addEventListener("mouseleave", mouseLeave);

window.addEventListener("scroll", toggleToTopButton);


let infoButtons = true;


function toggleToTopButton() {

    if (window.scrollY >= innerHeight / 2) {
        document.querySelector(".toTop").style.opacity = "1";

    } else {
        document.querySelector(".toTop").style.opacity = "0";
    }
}

function mouseClicked() {

    if (document.getElementById("techInf").checked && this.id !== "technicalInformationLabel") {
        infoButtons = false;
    } else if (document.getElementById("prodDesc").checked && this.id !== "productDescriptionLabel") {
        infoButtons = true;
    }

    if (infoButtons) {
        document.getElementById("productDescriptionLabel").style.backgroundColor = "#CEE8F8CC";
        document.getElementById("productDescriptionLabel").style.color = "#084057";


        document.querySelector(".productDescriptionContainer").style.display = "none";
        document.querySelector(".technicalInfoContainer").style.display = "block";

    } else {
        document.getElementById("technicalInformationLabel").style.backgroundColor = "#CEE8F8CC";
        document.getElementById("technicalInformationLabel").style.color = "#084057";


        document.querySelector(".productDescriptionContainer").style.display = "block";
        document.querySelector(".technicalInfoContainer").style.display = "none";
    }
}

function mouseOver() {

    this.style.backgroundColor = "#084057"
    this.style.color = "#c1e3f3";
}

function mouseLeave() {

    if (this.id !== "barLabel" && this.id !== "icon1" && this.id !== "icon2") {
        if (infoButtons && this.id !== "technicalInformationLabel") {

            if (this.tagName.toLowerCase() === "button") {
                this.style.backgroundColor = "rgb(146,194,214)";
            } else this.style.backgroundColor = "#CEE8F8CC"

            this.style.color = "#084057";

        } else if (!infoButtons && this.id !== "productDescriptionLabel") {

            if (this.tagName.toLowerCase() === "button") {
                this.style.backgroundColor = "rgb(146,194,214)";
            } else this.style.backgroundColor = "#CEE8F8CC"

            this.style.color = "#084057";
        }
    } else {
        if (this.id === "barLabel" && !isVisible) {
            this.style.backgroundColor = "transparent";
            this.style.color = "#0a4a65";
        } else if (this.id !== "barLabel") {
            this.style.backgroundColor = "transparent";
            this.style.color = "#0a4a65";
        }
    }
}

//--------------------------------------------------------------------------------------------------\\


document.getElementById("collapsible").addEventListener("click", boxClicked);
//document.querySelector(".containerHeader").addEventListener("mouseover", toggleLabelHover);
window.addEventListener("resize", showMenuContent);

document.getElementById("barLabel").addEventListener("mouseover", mouseOver);
document.getElementById("barLabel").addEventListener("mouseleave", mouseLeave);

document.getElementById("icon1").addEventListener("mouseover", mouseOver);
document.getElementById("icon1").addEventListener("mouseleave", mouseLeave);

document.getElementById("icon2").addEventListener("mouseover", mouseOver);
document.getElementById("icon2").addEventListener("mouseleave", mouseLeave);


let isVisible;
let allowDeactivation;


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

        toggleLabelHover();
    }
}


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

document.addEventListener("DOMContentLoaded", function (event) {

    let id = localStorage.getItem("id");

    fetch(`api/wheelchairs/${id}`)
        .then(response => response.json())
        .then(wheelchairs => {
            console.log(wheelchairs);

            new ElementCreator("img")
                .with("src", wheelchairs.image)
                .appendTo(document.querySelector(".productImage"))

            new ElementCreator("h2")
                .text(wheelchairs.name)
                .with("id", "productName")
                .appendTo(document.querySelector(".productInfo"))

            new ElementCreator("p")
                .text(wheelchairs.manufacturer)
                .with("id", "manufacturerName")
                .appendTo(document.querySelector(".productInfo"))

            new ElementCreator("p")
                .text(wheelchairs.description)
                .with("id", "shortDescription")
                .appendTo(document.querySelector(".productInfo"))

            new ElementCreator("p")
                .text(wheelchairs.price + "€ / day")
                .with("class", "productPrice")
                .appendTo(document.querySelector(".productInfo"))

            new ElementCreator("p")
                .text(wheelchairs.price + "€ / day")
                .with("class", "productPrice")
                .appendTo(document.querySelector(".priceInfo"))
        })

    for(let num = 0; num < 3; num++) {

        let random = Math.floor(Math.random() * 9) + 1;

        fetch(`api/wheelchairs/${random}`)
            .then(response => response.json())
            .then(wheelchairs => {
                console.log(wheelchairs);
                addWheelchairToDOM(wheelchairs);
            })
    }
});


function addWheelchairToDOM(wheelchair) {

    let background = wheelchair.terrain;

    new ElementCreator("article")
        .with("style", `background-image: url('${background}')`)
        .append(new ElementCreator("img")
            .with("src", wheelchair.image)
        )
        .append(new ElementCreator("ul")
            .append(new ElementCreator("li")
                .append(new ElementCreator("p")
                    .text(wheelchair.name)
                )
            )
            .append(new ElementCreator("li")
                .append(new ElementCreator("p")
                    .text(wheelchair.price + "€ / day")
                )
            )
            .append(new ElementCreator("li")
                .append(new ElementCreator("a")
                    .append(new ElementCreator("button")
                        .with("title", "go to shop")
                        .text("Select Product")
                        .id(`wheelchair${wheelchair.id}`)
                        .listener('click', () => {
                            localStorage.setItem("id", wheelchair.id);
                            console.log(parseInt(wheelchair.id));
                            window.location.href = 'product.html';
                        })
                    )
                )
            )
        )
        .appendTo(document.querySelector(".articles"))
}