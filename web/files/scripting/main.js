class ElementCreator {
    constructor(tag) {
        this.element = document.createElement(tag);
    }

    id(id) {
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

function addWheelchairToDOM(wheelchair, number) {

    let article = document.getElementById(`article${number}`);

    if (wheelchair === null) {
        return document.querySelector(`.articleContainer${number}`).style.display = "none";
    }

    article.style.backgroundImage = `url('${wheelchair.terrain}')`;

    new ElementCreator("img")
        .with("src", wheelchair.image)
        .appendTo(article)

    new ElementCreator("a")
        .with("style", "cursor: pointer")
        .with("class", `editIcon${wheelchair.category}`)
        .append(new ElementCreator("i")
            .with("class", "fa-solid fa-pencil")
        )
        .listener('click', () => {

            localStorage.setItem("id", wheelchair.id);
            window.location.href = 'product.html';
        })
        .appendTo(article)

    new ElementCreator("a")
        .with("style", "cursor: pointer")
        .with("class", `removeIcon${wheelchair.category}`)
        .append(new ElementCreator("i")
            .with("class", "fa-solid fa-xmark")
        )
        .listener('click', () => {

            displayConfirmMessage(wheelchair);
        })
        .appendTo(article)


    new ElementCreator("ul")
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
                .append(new ElementCreator("button")
                    .with("title", "go to shop")
                    .text("Select Product")
                    .id(`wheelchair${wheelchair.id}`)
                    .listener('click', () => {
                        localStorage.setItem("id", wheelchair.id);
                        console.log(parseInt(wheelchair.id));
                        window.location.href = 'product.html';
                    })
                )
            )
        ).appendTo(article)


    if (isAdmin) {
        document.querySelector(`.editIcon${wheelchair.category}`).style.display = "inline";
        document.querySelector(`.removeIcon${wheelchair.category}`).style.display = "inline";
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    updateNavBarIcons();    //in "sharedMethods.js"

    findTopProduct("electric", 1);
    findTopProduct("manual", 2);

});

function displayConfirmMessage(wheelchair) {

    let element = document.querySelector(".deleteConfirmMessage");

    if (element !== null) element.remove();

    let cancelButton = document.createElement("button");
    cancelButton.id = "cancelButton";
    cancelButton.textContent = "Cancel";
    cancelButton.onclick = () => document.querySelector(".deleteConfirmMessage").remove();

    let confirmButton = document.createElement("button");
    confirmButton.id = "confirmButton";
    confirmButton.textContent = "Delete";
    confirmButton.onclick = () => {
        removeItem(wheelchair.id);
        document.querySelector(".deleteConfirmMessage").remove();
    }

    let btnContainer = document.createElement("div");
    btnContainer.setAttribute("class", "buttonContainer");
    btnContainer.append(cancelButton);
    btnContainer.append(confirmButton);

    let icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-xmark");
    icon.addEventListener("click", () => {
        document.querySelector(".deleteConfirmMessage").remove();
    })
    let p = document.createElement("p");
    p.textContent = `Do you really want to delete "${wheelchair.name}"?`;

    let container = document.createElement("div");
    container.setAttribute("class", "deleteConfirmMessage");

    container.append(icon);
    container.append(p);
    container.append(btnContainer);

    document.querySelector(".topProducts").append(container);

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

            addWheelchairToDOM(topProduct, number);
        })
}

function removeItem(id) {

    fetch(`/api/wheelchairs/${id}`, {
        method: 'delete'
    }).then(() => {
        console.log("finished")
        window.location.href = localStorage.getItem("page");
    })
}