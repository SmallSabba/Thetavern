function getAllWheelchairs() {

    fetch("/api/wheelchairs")
        .then(response => response.json())
        .then(wheelchairs => {

            document.querySelectorAll("main article")
                .forEach(a => a.remove())

            for (let i = 0; i < wheelchairs.length; i++) {

                if (wheelchairs[i].category === "manual") {
                    addWheelchairToDOM(document.querySelector("#manual"), wheelchairs[i]);
                } else {
                    addWheelchairToDOM(document.querySelector("#electric"), wheelchairs[i]);
                }
            }
        })
}

document.addEventListener("DOMContentLoaded", function (event) {

    currentPage = document.location.pathname.replace("/", "").replace(".html", "");
    localStorage.setItem("page", document.location.pathname.replace("/", ""));

    importNavBar();
});