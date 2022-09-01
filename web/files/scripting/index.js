const backgroundImg =
    [
        "/slidePictures/slidePicture1.jpg",
        "/slidePictures/slidePicture2.jpg",
        "/slidePictures/slidePicture3.jpg",
        "/slidePictures/slidePicture4.jpg"
    ], headerHeading =
    [
        "Travel the World",
        "No Restrictions",
        "Enjoy life to the fullest",
        "Retake freedom"
    ], headerSubheading =
    [
        "There are no obstacles anymore",
        "Roam like you want",
        "That's our company's motto",
        "It's in your hands"
    ];

function changeImage(headingIndex) {

    document.getElementById("containerHeader").style.backgroundImage = `url("${backgroundImg[headingIndex]}")`;
    document.getElementById("headerHeading").innerText = headerHeading[headingIndex];
    document.getElementById("headerSubheading").innerText = headerSubheading[headingIndex];

    headingIndex === 3 ? headingIndex = 0 : headingIndex++;

    //two equal approaches to call a function with parameters in setInterval

    setTimeout(changeImage, 5000, headingIndex);
    //setInterval(() => { changeImage(nextNum) }, 5000);
}

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

            let container = document.querySelector(`.articleContainer${number} article`);

            container ? container.remove() : null;

            addWheelchairToDOM(document.querySelector(`.articleContainer${number}`), topProduct);

        })
}

document.addEventListener("DOMContentLoaded",  () => {

    importNavBar();
    changeImage(0);
});