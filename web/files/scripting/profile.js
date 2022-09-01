function generateAllUsersContainer() {

    fetch("/api/user/getAll")
        .then(res => res.json())
        .then(data => {

            const users = data.users;
            if (users) {

                let element = document.querySelector(".rightContainer");

                if (!element.className.includes("rightUsersContainer")) {
                    element ? element.remove() : null;

                    new ElementCreator("div")
                        .with("class", "rightUsersContainer rightContainer")
                        .append(new ElementCreator("div")
                            .with("class", "adminContainer")
                        )
                        .append(new ElementCreator("div")
                            .with("class", "userContainer")
                        )
                        .appendTo(document.querySelector(".content")
                        )

                    for (let i = 0; i < users.length; i++) {

                        let container, admin, user = "user";

                        container = document.querySelector(".userContainer");
                        admin = "User";

                        if (users[i].authorized) {
                            container = document.querySelector(".adminContainer");
                            admin = "Admin";
                        }

                        if (currentUser === users[i].username) user = "user currentUser";

                        new ElementCreator("div")
                            .with("class", `${user}`)
                            .append(new ElementCreator("img")
                                .with("src", users[i].profilePicture)
                            )
                            .append(new ElementCreator("ul")
                                .append(new ElementCreator("li")
                                    .append(new ElementCreator("p")
                                        .text(`${users[i].username}`)
                                    )
                                    .append(new ElementCreator("p")
                                        .text(`${users[i].email}`)
                                    )
                                    .append(new ElementCreator("p")
                                        .text(`${admin}`)
                                    )
                                )
                            )
                            .appendTo(container)
                    }
                }
            } else {
                return displayPopUpInfo("An error occurred while loading user profiles.");
            }
        })
}

function generateImgContainer() {

    let element = document.querySelector(".rightContainer");

    if (!element.className.includes("rightImgContainer")) {
        element ? element.remove() : null;

        new ElementCreator("div")
            .with("class", "rightImgContainer rightContainer")
            .append(new ElementCreator("div")
                .with("class", "currentImg")
                .append(new ElementCreator("img")
                    .with("src", profilePicture.replace(":", ""))
                    .with("alt", profilePicture.replace(":", ""))
                )
                .append(new ElementCreator("p")
                    .text(imgName)
                )
                .append(new ElementCreator("div")
                    .with("class", "editIconContainer")
                    .append(new ElementCreator("a")
                        .id("editIcon")
                        .with("style", "cursor: pointer")
                        .listener('click', () => {

                            toggleEditContainer("pencil");
                        })
                        .append(new ElementCreator("i")
                            .with("class", "fa-solid fa-pencil")
                        )
                    )
                    .append(new ElementCreator("div")
                        .with("class", "bubble")
                        .append(new ElementCreator("a")
                            .id("removePhoto")
                            .text("Remove photo")
                            .listener("click", () => {

                                removeUploadedImg();
                                changeProfilePicture("/uploads/:noAvatar.png").then();
                            })
                        )
                        .append(new ElementCreator("a")
                            .text("Select a file...")
                            .listener("click", () => {
                                document.getElementById("uploadPhoto").click();
                            })
                        )
                        .append(new ElementCreator("input")
                            .id("uploadPhoto")
                            .with("type", "file")
                            .listener("change", () => {

                                uploadPhoto();
                                document.getElementById("editIcon").click();
                            })
                        )
                    )
                )
            )
            .append(new ElementCreator("div")
                .with("class", "terrainImgContainer")
                .append(new ElementCreator("h3")
                    .text("Terrains")
                )
            )
            .append(new ElementCreator("div")
                .with("class", "wheelchairImgContainer")
                .append(new ElementCreator("h3")
                    .text("Wheelchairs")
                )
            )
            .appendTo(document.querySelector(".content"))

        let terrainDiv = document.createElement("div");
        let wheelchairDiv = document.createElement("div");

        for (let i = 1; i < imgLibrary.length; i++) {

            if (!imgLibrary[i].includes("user") && !imgLibrary[i].includes("noAvatar")) {

                let img = document.createElement("img");
                img.src = `${imgLibrary[i].replace(":", "")}`;
                img.alt = `${imgLibrary[i].replace(":", "")}`;

                if (!isAdmin && imgLibrary[i].includes("CRI") || !isAdmin && imgLibrary[i].includes("WaterWheels")) {
                    img.style.opacity = ".5";
                    img.style.cursor = "not-allowed";

                    img.addEventListener("click", () => {
                        displayPopUpInfo("Only premium members can use this background image.");
                    })
                } else {
                    img.addEventListener("click", () => {
                        changeProfilePicture(imgLibrary[i]).then();
                    })
                }

                if (imgLibrary[i].includes("background")) terrainDiv.append(img);
                else wheelchairDiv.append(img);
            }
        }

        document.querySelector(".terrainImgContainer").append(terrainDiv);
        document.querySelector(".wheelchairImgContainer").append(wheelchairDiv);
    }
}

function generateSavedItems(wheelchair) {

    new ElementCreator("article")
        .listener("click", () => {
            localStorage.setItem("productID", wheelchair.id);
            window.location.href = 'product.html';
        })
        .append(new ElementCreator("img")
            .with("src", `${wheelchair.image}`)
        )
        .append(new ElementCreator("div")
            .with("class", "wheelchairInfo")
            .append(new ElementCreator("h3")
                .text(`${wheelchair.name}`)
            )
            .append(new ElementCreator("p")
                .text(`${wheelchair.manufacturer}`)
            )
            .append(new ElementCreator("p")
                .text(`${wheelchair.price}€ / day`)
            )
        )
        .appendTo(document.querySelector(".rightContainer")
        )
}

function generateOrderedItems(wheelchair) {

    let shift = Math.floor((Math.random() * 3) + 1);
    const day = new Date().setDate(new Date().getDate() + shift);
    const deliveryDate = new Date(day).toLocaleDateString("en-GB");

    new ElementCreator("article")
        .append(new ElementCreator("img")
            .with("src", `${wheelchair.image}`)
        )
        .append(new ElementCreator("div")
            .with("class", "wheelchairInfo")
            .append(new ElementCreator("h3")
                .text(`${wheelchair.name}`)
            )
            .append(new ElementCreator("p")
                .with("class", "deliveredParagraph")
                .text("Delivered by:")
            )
            .append(new ElementCreator("p")
                .text(`${deliveryDate}`)
            )
            .append(new ElementCreator("p")
                .with("class", "deliveredParagraph")
                .text("Delivered to:")
            )
            .append(new ElementCreator("p")
                .text("Your address")
            )
        )
        .appendTo(document.querySelector(".rightContainer")
        )
}

function generateProductsContainer(type) {

    let message, heading;

    if (type === "orders") {
        heading = "Orders";
        message = "Looks like you have not ordered anything yet.";
    } else {
        heading = "Saved items";
        message = "Looks like you have not saved any items yet.";
    }

    fetch(`/api/user/${type}/get`)
        .then(res => res.json())
        .then(data => {

            if (data.items === null) {
                return displayPopUpInfo("An error occurred while displaying your orders.");
            }

            let element = document.querySelector(".rightContainer");

            if (!element.className.includes(`${type}`)) {
                element ? element.remove() : null;

                let container = document.createElement("div");
                container.setAttribute("class", `rightProductsContainer rightContainer ${type}`);

                let h = document.createElement("h2");
                h.setAttribute("class", "profileChangeHeading")
                h.textContent = `${heading}`;

                container.append(h);
                document.querySelector(".content").append(container);

                if (data.items) {
                    for (const wheelchair of data.items) {
                        type === "orders" ?
                            generateOrderedItems(wheelchair)
                            : generateSavedItems(wheelchair);
                    }
                } else {
                    new ElementCreator("div")
                        .with("class", "noSavesMessage")
                        .append(new ElementCreator("p")
                            .text("Oops!")
                        )
                        .append(new ElementCreator("p")
                            .text(`${message}`)
                        )
                        .append(new ElementCreator("a")
                            .with("href", "shop.html")
                            .text("Rummage in the shop")
                        )
                        .appendTo(container)
                }
            }
        })
}

function generateOneInputField(message) {

    fetch("/api/user/get")
        .then(res => res.json())
        .then(data => {

            if (data.user === null) return displayPopUpInfo("An error occurred while fetching user information.");

            let type, settingValue;
            if (message === "username") {
                type = "text";
                settingValue = data.user.username;
            } else {
                type = "email";
                settingValue = data.user.email;
            }

            let element = document.querySelector(".rightContainer");

            if (!element.className.includes(`right${message}Container`)) {
                element ? element.remove() : null;

                new ElementCreator("form")
                    .with("class", `rightInputContainer rightContainer right${message}Container`)
                    .listener("submit", () => {
                            message === "username" ? changeUsername(this.event) : changeEmail(this.event);
                        }
                    )
                    .append(new ElementCreator("h2")
                        .with("class", "profileChangeHeading")
                        .text(`Change ${message}`)
                    )
                    .append(new ElementCreator("div")
                        .with("class", "userSettingValue")
                        .append(new ElementCreator("p")
                            .text(`Current ${message}:`)
                        )
                        .append(new ElementCreator("p")
                            .id("value")
                            .text(`${settingValue}`)
                        )
                    )
                    .append(new ElementCreator("div")
                        .with("class", "inputFields")
                        .append(new ElementCreator("p")
                            .text(`Enter a new ${message}:`)
                        )
                        .append(new ElementCreator("input")
                            .id("input")
                            .with("class", "inputField")
                            .with("type", `${type}`)
                            .with("name", "value")
                            .with("placeholder", `${message}`)
                            .with("required")
                        )
                        .append(new ElementCreator("button")
                            .text("Save")
                        )
                    )
                    .appendTo(document.querySelector(".content"))
            }
        })
}

function generateChangePasswordField() {

    let element = document.querySelector(".rightContainer");

    if (!element.className.includes("rightPasswordContainer")) {
        element ? element.remove() : null;

        new ElementCreator("div")
            .with("class", "rightInputContainer rightContainer rightPasswordContainer")
            .append(new ElementCreator("h2")
                .with("class", "profileChangeHeading")
                .text("Change password")
            )
            .append(new ElementCreator("form")
                .with("class", "inputFields")
                .listener("submit", () => {
                    changePassword(this.event).then();
                })
                .append(new ElementCreator("p")
                    .text("Enter your old password:")
                )
                .append(new ElementCreator("input")
                    .id("inputOld")
                    .with("class", "inputField")
                    .with("type", "password")
                    .with("name", "oldPassword")
                    .with("placeholder", "old password")
                    .with("required")
                )
                .append(new ElementCreator("p")
                    .id("secondPar")
                    .text("Enter your new password:")
                )
                .append(new ElementCreator("input")
                    .id("inputNew")
                    .with("class", "inputField")
                    .with("type", "password")
                    .with("name", "newPassword")
                    .with("placeholder", "new password")
                    .with("required")
                )
                .append(new ElementCreator("button")
                    .text("Save")
                )
            )
            .appendTo(document.querySelector(".content")
            )
    }
}

function generateDeleteAccountField() {

    let element = document.querySelector(".rightContainer");

    if (!element.className.includes("rightDeleteContainer")) {
        element ? element.remove() : null;

        new ElementCreator("div")
            .with("class", "rightInputContainer rightContainer rightDeleteContainer")
            .append(new ElementCreator("h2")
                .id("deleteHeading")
                .with("class", "profileChangeHeading")
                .text("Delete account")
            )
            .append(new ElementCreator("div")
                .with("class", "deleteItemsContainer")
                .append(new ElementCreator("p")
                    .text("Once you delete your account, there is no going back. Please be certain.")
                )
                .append(new ElementCreator("button")
                    .text("Delete account")
                    .listener('click', () => {
                            deleteAccount().then();
                        }
                    )
                )
            )
            .appendTo(document.querySelector(".content")
            )
    }
}

async function deleteAccount() {

    fetch('/api/user/delete', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .then(data => {

            if (data.bo) {
                displayPopUpInfo("Successfully deleted your account. Redirecting to homepage..")

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500)

            } else {
                displayPopUpInfo("An error occurred while deleting your account.");
            }
        })
}

async function changePassword(event) {

    event.preventDefault();
    const form = event.currentTarget;
    let formData = new URLSearchParams(new FormData(form));

    fetch('/api/user/verifyPassword', {
        method: 'post',
        body: formData
    }).then(res => res.json())
        .then(data => {

            if (data.bo) {
                fetch('/api/user/changePassword', {
                    method: 'post',
                    body: formData
                }).then(res => res.json())
                    .then(data => {

                        if (data.bo) {
                            displayPopUpInfo("Successfully changed your password.");

                        } else if (data.bo === false) {
                            displayPopUpInfo("Enter a different password.");

                        } else {
                            displayPopUpInfo("An error occurred while changing your password.");
                        }
                    })
            } else if (data.bo === false) {
                displayPopUpInfo("Incorrect password.");
            } else {
                displayPopUpInfo("An error occurred while changing your password.");
            }
        })
}

async function changeUsername(event) {

    event.preventDefault();
    const form = event.currentTarget;
    let formData = new URLSearchParams(new FormData(form));

    if (form[0].value !== currentUser) {

        fetch('/api/user/changeUsername', {
            method: 'post',
            body: formData
        }).then(res => res.json())
            .then(data => {

                if (data.bo) {
                    currentUser = form[0].value;
                    document.querySelector("#value").innerHTML = currentUser;
                    document.querySelector(".topContainer h3").textContent = currentUser;

                } else if (data.bo === false) {
                    displayPopUpInfo("This username is already taken.");

                } else {
                    displayPopUpInfo("An error occurred while changing your username.");
                }
            })
    } else {
        displayPopUpInfo("Enter a different username.");
    }
}

async function changeEmail(event) {

    event.preventDefault();
    const form = event.currentTarget;
    let formData = new URLSearchParams(new FormData(form));

    fetch('/api/user/changeEmail', {
        method: 'post',
        body: formData
    }).then(res => res.json())
        .then(data => {

            if (data.bo) {
                document.querySelector("#value").innerHTML = form[0].value;
                displayPopUpInfo("Successfully changed your email address.");

            } else if (data.bo === false) {
                displayPopUpInfo("Enter a different email address.");

            } else {
                displayPopUpInfo("An error occurred while changing your email.");
            }
        })
}

async function changeProfilePicture(picture) {

    if (lastPhoto !== picture) {

        if (lastPhoto.includes(`user${currentUser}`)) {
            removeUploadedImg();
        }

        fetch("/api/user/changeProfilePicture", {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                profilePicture: picture.replace(":", "")
            })
        }).then(res => res.json())
            .then(data => {

                if (data.bo) {
                    profilePicture = picture;

                    if (profilePicture.includes("user")) {
                        imgName = `${currentUser}'s photo`;

                    } else {
                        imgName = picture.split(":")[1]
                        imgName = imgName.replace("BG", "").split(".")[0];
                        imgName = imgName.charAt(0).toUpperCase() + imgName.slice(1);

                        if (imgName === "NoAvatar") {
                            imgName = `${imgName.split("A")[0]} ${imgName.split("o")[1]}`
                        }
                    }

                    document.querySelector(".currentImg img").setAttribute("src", profilePicture.replace(":", ""));
                    document.querySelector(".currentImg p").textContent = imgName;

                    updateProfilePicture();

                } else {
                    displayPopUpInfo("An error occurred while changing your profile picture.");
                }
            })
    }
}

function updateProfilePicture() {

    let img = document.querySelector(".topContainer img");

    img.setAttribute("src", profilePicture.replace(":", ""));
    img.setAttribute("alt", profilePicture.replace(":", ""));
    img.addEventListener("click", () => generateImgContainer());

    document.querySelector(".topContainer h3").textContent = currentUser;

    imgLibrary.forEach(item => {
        if (item.replace(":", "").includes(profilePicture)) {
            imgName = imgLibrary.at(imgLibrary.indexOf(item)).split(":")[1];
        }
    })

    lastPhoto = profilePicture;

    if (imgName) {
        imgName = imgName.replace("BG", "").split(".")[0];
        imgName = imgName.charAt(0).toUpperCase() + imgName.slice(1);
    }

    if (imgName === "NoAvatar") {
        imgName = `${imgName.split("A")[0]} ${imgName.split("o")[1]}`
    }

    if (profilePicture.includes("user")) {
        imgName = `${currentUser}'s photo`;
    }
}

function removeUploadedImg() {

    fetch("/deleteUserFile", {
        method: "delete"
    }).then(res => res.json())
        .then(data => {

            if (!data.bo) {
                displayPopUpInfo("An error occurred while deleting your profile picture.");
            }
        })
}

function toggleEditContainer(source) {

    if (allowToggle || source === "pencil") {

        if (source === "pencil" && allowToggle) allowToggle = !allowToggle;
        else setTimeout(() => allowToggle = !allowToggle, 50);

        let element = document.querySelector(".bubble");
        element.style.display === "flex" ? element.style.display = "none" : element.style.display = "flex";
    }
}

function uploadPhoto() {

    const file = document.getElementById("uploadPhoto");

    if (file.files[0].name !== uploadedPhoto) {

        uploadedPhoto = file.files[0].name;

        const formData = new FormData();
        formData.append("file", file.files[0]);

        fetch("/uploadFiles/", {
            method: "post",
            body: formData
        })
            .then(res => res.json())
            .then(data => {

                imgLibrary.push(data.url);
                changeProfilePicture(data.url).then();
            })
    }
}

function generateDataContainer() {

    fetch("/api/user/get")
        .then(res => res.json())
        .then(data => {

            let user = data.user;
            let shipping = data.user.shippingInfo;

            if (user === null) return displayPopUpInfo("An error occurred while fetching user information.");

            let element = document.querySelector(".rightContainer");

            if (!element || !element.className.includes(`rightDataContainer`)) {
                element ? element.remove() : null;

                new ElementCreator("div")
                    .with("class", "rightProductsContainer rightDataContainer rightContainer")
                    .append(new ElementCreator("h2")
                        .with("class", "profileChangeHeading")
                        .text("Account")
                    )
                    .append(new ElementCreator("ul")
                        .with("class", "informationContainer")
                    )
                    .append(new ElementCreator("ul")
                        .with("class", "shippingContainer")
                    )
                    .append(new ElementCreator("ul")
                        .with("class", "paymentContainer")
                    )
                    .appendTo(document.querySelector(".content")
                    )

                let list = document.querySelector(".informationContainer");
                createListItem(list, "Name", "fullName", `${shipping.firstname} ${shipping.lastname}`);
                createListItem(list, "Email", "email", `${user.email}`);
                createListItem(list, "Phone", "phone", `${shipping.phone}`);

                list = document.querySelector(".shippingContainer");
                createListItem(list, "Street", "street", `${shipping.street}`);
                createListItem(list, "Address", "address", `${shipping.postal} ${shipping.city}, ${shipping.state}`);

                list = document.querySelector(".paymentContainer");
                let cardNumber = `${data.user.paymentInfo.cardNumber}`;

                if (cardNumber !== "null") {
                    cardNumber = "**** **** **** " + data.user.paymentInfo.cardNumber.slice(12);
                }
                createListItem(list, "Card", "cardNumber", `${cardNumber}`);
            }
        })
}

function createListItem(parent, heading, id, textContent) {

    if (textContent.includes("null")) textContent = "Not set";

    new ElementCreator("li")
        .id(id)
        .listener("mouseover", () => editIconHover(id))
        .listener("mouseleave", () => editIconLeft(id))
        .append(new ElementCreator("p")
            .with("class", "smallHeading")
            .text(`${heading}:`)
        )
        .append(new ElementCreator("p")
            .text(textContent)
            .append(new ElementCreator("span")
                .append(new ElementCreator("i")
                    .with("class", "fa-solid fa-pencil")
                )
                .listener("click", () => test())
            )
        )
        .appendTo(parent)
}

function test() {

    //console.log("editIcon clicked");
}

function editIconHover(id) {

    document.querySelector(`#${id} p`).style.textDecoration = "underline";
    document.querySelector(`#${id} span`).style.visibility = "visible";
}

function editIconLeft(id) {

    document.querySelector(`#${id} p`).style.textDecoration = "none";
    document.querySelector(`#${id} span`).style.visibility = "hidden";
}

function initImgLibrary() {

    fetch("readLibrary")
        .then(res => res.json())
        .then(data => {

            imgLibrary = data.array;
            importNavBar();
        })
}

let imgLibrary;
let imgName;
let lastPhoto;
let uploadedPhoto;

let allowToggle;

document.addEventListener("DOMContentLoaded",  () => {

    document.querySelector("body").addEventListener("click", () => toggleEditContainer("body"));

    //localStorage.clear();
    initImgLibrary();
    generateDataContainer();
});