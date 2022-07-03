function checkShippingAddress(event) {

    event.preventDefault();
    const form = event.currentTarget;

    console.log(form.firstname.value)
}

function checkPickUpSelf() {

    let element = document.getElementById("form");

    if (document.getElementById("takeAwayCheckBox").checked) {
        console.log("checked")
        //element.style.height = "0";
        element.style.display = "none";
    } else {
        console.log("unchecked")
        //element.style.height = "fit-content";
        element.style.display = "block";
    }
}

function checkPayment() {

}

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("form").addEventListener("submit", checkShippingAddress);

    importNavBar();
    checkPickUpSelf();
});