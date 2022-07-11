function mouseOver2() {

    this.style.backgroundColor = "#084057"
    this.style.color = "#c1e3f3";
}

function mouseLeave2() {

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

function infoBoxClicked() {

    if (document.getElementById("techInf").checked && this.id !== "technicalInformationLabel") {
        infoButtons = false;
        localStorage.setItem("infoButtons", "false");
    } else if (document.getElementById("prodDesc").checked && this.id !== "productDescriptionLabel") {
        infoButtons = true;
        localStorage.setItem("infoButtons", "true");
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

function generateCurrentProduct(wheelchair) {

    const itemContainer = document.querySelector(".itemContainer");

    //product info field
    new ElementCreator("div")
        .with("class", "productInfo")
        .append(new ElementCreator("h2")
            .text(wheelchair.name)
            .with("id", "productName")
        )
        .append(new ElementCreator("p")
            .text(wheelchair.manufacturer)
            .with("id", "manufacturerName")
        )
        .append(new ElementCreator("p")
            .text(wheelchair.description)
            .with("id", "shortDescription")
        )
        .append(new ElementCreator("p")
            .text(wheelchair.price + "€ / day")
            .with("class", "productPrice")
        )
        .prependTo(itemContainer)

    //product image field
    new ElementCreator("div")
        .with("class", "productImage")
        .append(new ElementCreator("img")
            .with("src", wheelchair.image)
        )
        .prependTo(itemContainer)


    //product selection field

    new ElementCreator("div")
        .with("class", "priceInfo")
        .append(new ElementCreator("p")
            .text(wheelchair.price + "€ / day")
            .with("class", "productPrice")
        )
        .append(new ElementCreator("i")
            .id("saveProductIcon")
            .with("class", "fa-solid fa-bookmark")
            .listener("click", saveItemClicked)
            .listener("mouseover", saveItemHovered)
            .listener("mouseleave", saveItemLeft)
        )
        .prependTo(document.querySelector(".productSelection")
        )
}

function checkProductIsSaved() {

    productIsSaved = false;

    fetch("/api/user/get")
        .then(res => res.json())
        .then(data => {

            if (data.user) {
                for (const index in data.user.savedItems) {
                    if (data.user.savedItems[index] === parseInt(localStorage.getItem("productID"))) {

                        productIsSaved = true;
                    }
                }
            } else {
                displayPopUpInfo("An error occurred while fetching user information.");
            }
            initProductPage();
        })
}

function saveItemHovered() {

    this.style.color = "#084057";
}

function saveItemLeft() {

    if (!saveProduct) this.style.color = "#277db0";
}

function saveItemClicked() {

    if (currentUser !== null) {

        if (saveProduct) {
            this.style.color = "#277db0";
            localStorage.setItem("saveProduct", "false");
        } else {
            this.style.color = "#084057";
            localStorage.setItem("saveProduct", "true");
        }
        saveProduct = !saveProduct;

    } else {
        displayPopUpInfo("You must login to save a product.");
    }
}

function purchaseButtonClicked() {

    if (currentUser !== null) {
        localStorage.setItem('checkBoxID', 'creditCardCheckBox');
        localStorage.setItem('orderProgress', '1');
        window.location.href = 'checkout.html';
    } else {
        displayPopUpInfo("You must login to purchase a product.")
    }
}

function initProductPage() {

    document.getElementById("technicalInformationLabel").addEventListener("click", infoBoxClicked);
    document.getElementById("technicalInformationLabel").addEventListener("mouseover", mouseOver2);
    document.getElementById("technicalInformationLabel").addEventListener("mouseleave", mouseLeave2);

    document.getElementById("productDescriptionLabel").addEventListener("click", infoBoxClicked);
    document.getElementById("productDescriptionLabel").addEventListener("mouseover", mouseOver2);
    document.getElementById("productDescriptionLabel").addEventListener("mouseleave", mouseLeave2);

    document.getElementById("purchaseButton").addEventListener("mouseover", mouseOver2);
    document.getElementById("purchaseButton").addEventListener("mouseleave", mouseLeave2);

    saveProduct = productIsSaved;

    if (localStorage.getItem("infoButtons") === "true") {
        document.getElementById("techInf").checked = false;
        document.getElementById("prodDesc").checked = true;
        document.getElementById("technicalInformationLabel").click();

    } else {
        document.getElementById("techInf").checked = true;
        document.getElementById("prodDesc").checked = false;
        document.getElementById("productDescriptionLabel").click();
    }

    fetch(`api/wheelchairs/${localStorage.getItem("productID")}`)
        .then(response => response.json())
        .then(wheelchair => {

            generateCurrentProduct(wheelchair);

            if (productIsSaved) {
                document.getElementById("saveProductIcon").style.color = "#084057";
            } else {
                document.getElementById("saveProductIcon").style.color = "#277db0";
            }
        })

    for (let num = 0; num < 3; num++) {

        let random = Math.floor(Math.random() * 9) + 1;

        fetch(`api/wheelchairs/${random}`)
            .then(response => response.json())
            .then(wheelchair => {
                addWheelchairToDOM(document.querySelector(".articles"), wheelchair);
            })
    }
}

let infoButtons;
let productIsSaved;
let saveProduct;

document.addEventListener("DOMContentLoaded", () => {

    importNavBar();
})