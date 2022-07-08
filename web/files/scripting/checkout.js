function checkShippingAddress(event) {

    if (event === null) {

        localStorage.setItem("street", "You will pick up the product in one of our stores.");
        localStorage.setItem("firstname", "null")
        localStorage.setItem("lastname", "null")
        localStorage.setItem("postal", "null")
        localStorage.setItem("state", "null")
        localStorage.setItem("email", "null")
        localStorage.setItem("phone", "null")

        orderProgress = "2";
        updateProgressContainer();

    } else {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new URLSearchParams(new FormData(form));

        fetch("/api/user/shipping/setAddress", {
            method: "post",
            body: formData
        }).then(res => res.json())
            .then(data => {

                if (data.bo) {
                    orderProgress = "2";
                    updateProgressContainer();

                } else {
                    displayPopUpInfo("An error occurred during the purchase process.")
                }
            })

        for (let i = 0; form[i].name !== ""; i++) {
            localStorage.setItem(`${form[i].name}`, form[i].value);
        }
    }

}

function updateShippingSummaryValues() {

    document.getElementById("name").textContent = `${localStorage.getItem("firstname")} ${localStorage.getItem("lastname")}`;
    document.getElementById("street").textContent = `${localStorage.getItem("street")}`;
    document.getElementById("address").textContent = `${localStorage.getItem("postal")}, ${localStorage.getItem("city")}`;
    document.getElementById("state").textContent = `${localStorage.getItem("state")}`;
    document.getElementById("phone").textContent = `${localStorage.getItem("phone")}`;

    document.querySelectorAll(".shippingSummaryContainer p").forEach(e => {
        e.textContent.includes("null") ? e.textContent = "" : null;
    })
}

function updateProgressContainer() {

    if (orderProgress === "1") {

        document.querySelector(".firstForm h1").style.backgroundColor = "#0e6191";
        document.querySelector(".firstForm h1").style.color = "#fff";
        document.querySelector(".secondForm h1").style.backgroundColor = "#DCE6EA7F";
        document.querySelector(".secondForm h1").style.color = "rgba(45,127,164,0.6)";
        document.querySelector(".secondForm h1").setAttribute("data-after", "");

        document.querySelector(".shippingContainer").style.display = "flex";
        document.querySelector(".paymentContainer").style.display = "none";
        document.querySelector(".shippingSummaryContainer").style.display = "none";
        document.querySelector(".editFormSpan").style.display = "none";

        localStorage.setItem("orderProgress", "1");
        checkPickUpSelf();

    } else if (orderProgress === "2") {

        document.querySelector(".firstForm h1").style.backgroundColor = "#073b4d";
        document.querySelector(".firstForm h1").style.color = "#ddeef8";
        document.querySelector(".secondForm h1").style.backgroundColor = "#0e6191";
        document.querySelector(".secondForm h1").style.color = "#ddeef8";
        document.querySelector(".firstForm h1").setAttribute("data-after", "\uf00c");

        document.querySelector(".paymentContainer").style.display = "flex";
        document.querySelector(".shippingContainer").style.display = "none";
        document.querySelector(".shippingSummaryContainer").style.display = "flex";
        document.querySelector(".editFormSpan").style.display = "inline";

        localStorage.setItem("orderProgress", "2");
        updateShippingSummaryValues();
        checkPayment(document.getElementById(`${checkBoxID}`));
    }
}

function editFormClicked() {

    if (orderProgress === "2") {

        orderProgress = "1";
        updateProgressContainer();
    }
}

function paymentButtonClicked() {

    checkPickUpSelf()
        ? checkShippingAddress(null) : document.getElementById("hiddenButton1").click();
}

function checkPickUpSelf() {

    let element = document.getElementById("form");

    if (document.getElementById("takeAwayCheckBox").checked) {
        element.style.display = "none";
        return true;
    } else {
        element.style.display = "block";
        return false;
    }
}

function checkPayment(checkBox) {

    if (checkBox.id.toLowerCase().includes("creditcard")) {

        document.getElementById("form2").style.display = "block";
        document.getElementById("payPalContainer").style.display = "none";
        document.getElementById("cashContainer").style.display = "none";
        localStorage.setItem('checkBoxID', 'creditCardCheckBox');

    } else if (checkBox.id.toLowerCase().includes("paypal")) {

        document.getElementById("payPalContainer").style.display = "block";
        document.getElementById("form2").style.display = "none";
        document.getElementById("cashContainer").style.display = "none";
        localStorage.setItem('checkBoxID', 'payPalCheckBox');

    } else {
        document.getElementById("cashContainer").style.display = "block";
        document.getElementById("form2").style.display = "none";
        document.getElementById("payPalContainer").style.display = "none";
        localStorage.setItem('checkBoxID', 'cashCheckBox');
    }
}


function processOrder(event) {

    if (event === null) {

        /*
        let payment = "cash";
         */

    } else {

        event.preventDefault();
        const form = event.currentTarget;
        let formData = new URLSearchParams(new FormData(form));

        if (form.cardNumber.value.replaceAll(" ", "").length === 16) {

            fetch("/api/user/payment/setPayment", {
                method: "post",
                body: formData
            }).then(res => res.json())
                .then(data => {

                    if (data.bo) {

                        console.log("finished first")

                        fetch(`/api/wheelchairs/${localStorage.getItem("productID")}/buy`, {
                            method: 'post',
                            headers: {'Content-Type': 'application/json'}
                        }).then(res => res.json())
                            .then(data => {

                                if (data.bo) {

                                    fetch(`/api/user/orders/${localStorage.getItem("productID")}/add`, {
                                        method: 'post',
                                        headers: {'Content-Type': 'application/json'}
                                    }).then(res => res.json())
                                        .then(data => {

                                            if (data.bo) {
                                                localStorage.clear();
                                                displayPopUpInfo(`Successfully ordered ${wheelchairName}. Redirecting to shop page..`)
                                                setTimeout(() => {
                                                    window.location.href = "shop.html"
                                                }, 1500)
                                            } else {
                                                displayPopUpInfo("An error occurred during the purchase process.")
                                            }
                                        })
                                } else {
                                    displayPopUpInfo("An error occurred during the purchase process.")
                                }
                            })

                    } else {
                        displayPopUpInfo("An error occurred during the purchase process.")
                    }
                })
        } else {
            displayPopUpInfo("Invalid credit card number.")
        }
    }
}

function placeOrderButtonClicked() {

    document.getElementById("cashCheckBox").checked
        ? processOrder(null) : document.getElementById("hiddenButton2").click();

}

function initCheckoutPage() {

    fetch(`/api/wheelchairs/${localStorage.getItem("productID")}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .then(wheelchair => {

            if (wheelchair) {
                wheelchairName = wheelchair.name;

            } else {
                displayPopUpInfo("An error occurred while fetching information.")
            }
        })
}

let checkBoxID = localStorage.getItem("checkBoxID");
let orderProgress = localStorage.getItem("orderProgress");
let wheelchairName;

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("form").addEventListener("submit", checkShippingAddress);
    document.getElementById("form2").addEventListener("submit", processOrder);
    document.getElementById(`${checkBoxID}`).checked = "true";

    importNavBar();
    initCheckoutPage();
    updateProgressContainer();
});