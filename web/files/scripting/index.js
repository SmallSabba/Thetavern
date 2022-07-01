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


function changeImage() {
    const i = Math.floor((Math.random() * 3) + 1);

    document.getElementById("containerHeader").style.backgroundImage = "url('" + backgroundImg[i] + "')";
    document.getElementById("headerHeading").innerText = headerHeading[i];
    document.getElementById("headerSubheading").innerText = headerSubheading[i];


    setInterval(changeImage, 5000);
}


//--------------------------------------------------------------------------------------------------\\

function findTopProduct(category, number) {

    fetch(`api/categories/${category}/wheelchairs`)
        .then(response => response.json())
        .then(wheelchairs => {

            let topProduct;

            if (wheelchairs.length !== 0) {

                topProduct = wheelchairs[0];

                for (let i = 1; i < wheelchairs.length; i++) {

                    if (topProduct.sold < wheelchairs[i].sold) {
                        topProduct = wheelchairs[i]
                    }
                }
            } else topProduct = null;

            let container = document.querySelector(`#article${number}`);
            container ? container.remove() : null;

            console.log("in find top: " + topProduct);

            addWheelchairToDOM(document.querySelector(`.articleContainer${number}`), topProduct);

        })
}

document.addEventListener("DOMContentLoaded", function (event) {

    currentPage = document.location.pathname.replace("/", "").replace(".html", "");

    importNavBar();
    changeImage();
});