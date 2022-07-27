function mouseOver2() {

    this.style.backgroundColor = "#084057"
    this.style.color = "#c1e3f3";
}

function mouseLeave2() {

    if (this.id !== "barLabel" && this.id !== "icon1" && this.id !== "icon2") {
        if (infoButtons && this.id !== "technicalInformationLabel") {

            if (this.tagName.toLowerCase() === "button") {
                this.style.backgroundColor = "#cde6f8";
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
            .id("productName")
            .text(wheelchair.name)
        )
        .append(new ElementCreator("p")
            .id("manufacturerName")
            .text(wheelchair.manufacturer)
        )
        .append(new ElementCreator("p")
            .id("shortDescription")
            .text(wheelchair.description)
        )
        .append(new ElementCreator("p")
            .with("class", "productPrice")
            .text(wheelchair.price + "€ / day")
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

function generateCurrentProductEditContainer(wheelchair) {

    document.querySelector(".itemContainer").remove();

    const itemContainer = document.createElement("div");
    itemContainer.setAttribute("class", "itemContainer");
    document.body.prepend(itemContainer);

    //product info field
    new ElementCreator("div")
        .with("class", "productInfoEdit")
        .append(new ElementCreator("input")
            .id("productName")
            .with("value", wheelchair.name)
            .listener("focusout", () => {

                checkForEmptyInput(this.event.currentTarget, wheelchair.name);
            })
        )
        .append(new ElementCreator("input")
            .id("manufacturerName")
            .with("value", wheelchair.manufacturer)
            .listener("focusout", () => {

                checkForEmptyInput(this.event.currentTarget, wheelchair.manufacturer);
            })
        )
        .append(new ElementCreator("textarea")
            .id("shortDescription")
            .text(wheelchair.description)
            .listener("focusout", () => {

                checkForEmptyInput(this.event.currentTarget, wheelchair.description);
            })
        )
        .append(new ElementCreator("input")
            .with("class", "productPrice")
            .with("value", wheelchair.price + "€ / day")
            .listener("focusin", () => {

                const elem = this.event.currentTarget;
                elem.value = elem.value.split("€")[0];
            })
            .listener("focusout", () => {

                const elem = this.event.currentTarget;
                checkForEmptyInput(elem, wheelchair.price + "€ / day")
                checkPriceInput(elem);
            })
        )
        .append(new ElementCreator("p")
            .id("errorMessage")
        )
        .prependTo(itemContainer)

    //product image field
    new ElementCreator("div")
        .with("class", "productImage")
        .append(new ElementCreator("img")
            .with("src", wheelchair.image)
        )
        .prependTo(itemContainer)
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

            currentWheelchair = wheelchair;

            if (editProduct) {
                document.querySelector(".relatedProducts").style.display = "none";
                generateCurrentProductEditContainer(wheelchair);


                new ElementCreator("button")
                    .id("resetChangesButton")
                    .text("Reset Changes")
                    .listener("click", resetChanges)
                    .appendTo(document.querySelector(".applyButtonContainer")
                    )
                new ElementCreator("button")
                    .id("saveChangesButton")
                    .text("Save Changes")
                    .listener("click", saveChanges)
                    .appendTo(document.querySelector(".applyButtonContainer")
                    )

            } else {
                generateCurrentProduct(wheelchair);

                if (productIsSaved) {
                    document.getElementById("saveProductIcon").style.color = "#084057";
                } else {
                    document.getElementById("saveProductIcon").style.color = "#277db0";
                }

                fetch(`api/categories/${wheelchair.category}/wheelchairs`)
                    .then(res => res.json())
                    .then(wheelchairs => {

                        for (const wheelchairsKey in wheelchairs) {
                            if (wheelchairs[wheelchairsKey].id === wheelchair.id) {
                                wheelchairs.splice(wheelchairsKey, 1);
                            }
                        }

                        let random = Math.floor(Math.random() * wheelchairs.length);
                        let usedNumbers = [random], lastNum = 2;

                        if (wheelchairs.length <= 2) lastNum = 1;

                        for (let num = 0; num < lastNum; num++) {

                            while (usedNumbers.includes(random)) {
                                random = Math.floor(Math.random() * wheelchairs.length);
                            }
                            usedNumbers.push(random);
                        }

                        usedNumbers.forEach(product => {
                            addWheelchairToDOM(document.querySelector(".articles"), wheelchairs[product]);
                        })
                    })
            }
        })
}

function checkForEmptyInput(elem, text) {

    if (elem.value.length === 0) {
        elem.value = text;
    }
}

function checkPriceInput(elem) {

    let errorMessage = document.getElementById("errorMessage");
    let error = false;

    if (isNaN(elem.value.replaceAll(" ", "").toLowerCase().replace("€/day", ""))) {
        errorMessage.innerText = "Product price must be a number.";
        error = true;
    }

    for (const char of elem.value) {

        if (isNaN(char)) {
            elem.value = elem.value.replace(char, "");
        }
    }

    if (parseInt(elem.value) >= 20) {
        errorMessage.innerText = "Product price is too high.";
        error = true;
    } else if (parseInt(elem.value) <= 2) {
        errorMessage.innerText = "Product price is too low.";
        error = true;
    }
    elem.value = elem.value.replaceAll(" ", "") + "€ / day";
    error ? errorMessage.style.display = "block" : errorMessage.style.display = "none";
}

function resetChanges() {

    document.querySelector("#productName").value = currentWheelchair.name;
    document.querySelector("#manufacturerName").value = currentWheelchair.manufacturer;
    document.querySelector("#shortDescription").value = currentWheelchair.description;
    document.querySelector(".productPrice").value = currentWheelchair.price + "€ / day";
}

function saveChanges() {

    if (document.getElementById("errorMessage").style.display !== "none") {
        return displayPopUpInfo("Be sure that there are no invalid attributes.");
    }

    if (document.querySelector("#productName").value === currentWheelchair.name
    && document.querySelector("#manufacturerName").value === currentWheelchair.manufacturer
    && document.querySelector("#shortDescription").value === currentWheelchair.description
    && document.querySelector(".productPrice").value === currentWheelchair.price + "€ / day") {
        return;
    }

    fetch(`/api/wheelchairs/${localStorage.getItem("productID")}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: document.querySelector("#productName").value,
            manufacturer: document.querySelector("#manufacturerName").value,
            description: document.querySelector("#shortDescription").value,
            price: document.querySelector(".productPrice").value.replace("€ / day", "")
        })
    }).then(res => res.json())
        .then(data => {

            if (data.bo) {
                localStorage.clear();
                displayPopUpInfo(`Successfully changed attributes of ${currentWheelchair.name}. Redirecting to shop page..`);
                setTimeout(() => {
                    window.location.href = "shop.html";
                }, 1500)
            } else {
                displayPopUpInfo("An error occurred while saving data.")
            }
        })
}

let currentWheelchair;
let editProduct;
let infoButtons;
let productIsSaved;
let saveProduct;

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("editProduct") === "true") editProduct = true;
    importNavBar();
    if (editProduct) localStorage.setItem("editProduct", "true");
})