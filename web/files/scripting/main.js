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

            addWheelchairToDOM(document.querySelector(`.articleContainer${number}`), topProduct);

        })
}

document.addEventListener("DOMContentLoaded", function (event) {

    currentPage = document.location.pathname.replace("/", "").replace(".html", "");

    importNavBar();

});