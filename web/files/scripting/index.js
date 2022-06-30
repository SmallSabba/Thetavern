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

window.onload = function () {

    function changeImage() {
        const i = Math.floor((Math.random() * 3) + 1);

        document.getElementById("containerHeader").style.backgroundImage = "url('" + backgroundImg[i] + "')";
        document.getElementById("headerHeading").innerText = headerHeading[i];
        document.getElementById("headerSubheading").innerText = headerSubheading[i];
    }

    setInterval(changeImage, 5000);
}

//--------------------------------------------------------------------------------------------------\\
