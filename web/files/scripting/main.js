class ElementCreator {
    constructor(tag) {
        this.element = document.createElement(tag);
    }

    id(id) {
        console.log(id);
        this.element.id = id;
        return this;
    }

    class(clazz) {
        this.element.class = clazz;
        return this;
    }

    text(content) {
        this.element.innerHTML = content;
        return this;
    }

    with(name, value) {
        this.element.setAttribute(name, value)
        return this;
    }

    listener(name, listener) {
        this.element.addEventListener(name, listener)
        return this;
    }

    append(child) {
        child.appendTo(this.element);
        return this;
    }

    prependTo(parent) {
        parent.prepend(this.element);
        return this.element;
    }

    appendTo(parent) {
        parent.append(this.element);
        return this.element;
    }

    insertBefore(parent, sibling) {
        parent.insertBefore(this.element, sibling);
        return this.element;
    }
}

function addWheelchairToDOM(category, wheelchair) {

    let background = wheelchair.terrain;

    new ElementCreator("article")
        .with("style", `background-image: url('${background}')`)
        .append(new ElementCreator("img")
            .with("src", wheelchair.image)
        )
        .append(new ElementCreator("ul")
            .append(new ElementCreator("li")
                .append(new ElementCreator("p")
                    .text(wheelchair.name)
                )
            )
            .append(new ElementCreator("li")
                .append(new ElementCreator("p")
                    .text(wheelchair.price + "€ / day")
                )
            )
            .append(new ElementCreator("li")
                .append(new ElementCreator("a")
                    .with("href", "product.html")

                    .append(new ElementCreator("button")
                        .with("title", "go to shop")
                        .text("Select Product")
                        .id(`wheelchair${wheelchair.id}`)
                    )
                )
            )
        )
        .appendTo(document.querySelector(".topProducts"))
}

document.addEventListener("DOMContentLoaded", function (event) {

    let currentCategory = "electric";

    for (let i = 0; i < 2; i++) {

        fetch(`api/categories/${currentCategory}/wheelchairs`)
            .then(response => response.json())
            .then(wheelchairs => {

                console.log(wheelchairs);

                let topProduct = wheelchairs[0];
                for (let i = 1; i < wheelchairs.length; i++) {

                    if (topProduct.sold < wheelchairs[i].sold) {
                        topProduct = wheelchairs[i]
                    }
                }
                addWheelchairToDOM(currentCategory, topProduct);
            })
        currentCategory = "manual";
    }

});