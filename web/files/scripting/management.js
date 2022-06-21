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


checkMethodCall = function () {
    const methodCallType = document.getElementsByName('method');
    for (let i = 0; i < methodCallType.length; i++) {
        if (methodCallType[i].checked === true) {
            if (methodCallType[i].value === "delete") {
                createFormDomDelete();
                window.MethodType = methodCallType[i].value;
                console.log(methodCallType[i].value);
            } else if (methodCallType[i].value === "post") {
                createFormDomPost();
                window.MethodType = methodCallType[i].value;
                console.log(methodCallType[i].value);
            } else {
                createFormDomPut();
                window.MethodType = methodCallType[i].value;
                console.log(methodCallType[i].value);
            }
        }
    }
}

createFormDomDelete = function () {
    const deleteMethod = document.querySelectorAll('.delete');

    deleteMethod.forEach(deleteMethod => {
        deleteMethod.remove();
    })

    const postMethod = document.querySelectorAll('.post');

    postMethod.forEach(postMethod => {
        postMethod.remove();
    });

    const putMethod = document.querySelectorAll('.put');

    putMethod.forEach(putMethod => {
        putMethod.remove();
    });

    new ElementCreator("form")
        .with("class", "delete")
        //.with("action", `/api/wheelchairs/:id`)

        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("ID")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "id")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Name")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "name")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Category")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "category")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Manufacturer")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "manufacturer")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Price")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "price")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Image")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "image")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Terrain")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "terrain")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Description")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "description")
                )
            )
        )

        .append(new ElementCreator("p")
            .append(new ElementCreator("button")
                .text("Send")
                .with("type", "submit")
            )
        )
        .appendTo(document.querySelector(".form"))
}


createFormDomPost = function () {
    const deleteMethod = document.querySelectorAll('.delete');

    deleteMethod.forEach(deleteMethod => {
        deleteMethod.remove();
    })

    const postMethod = document.querySelectorAll('.post');

    postMethod.forEach(postMethod => {
        postMethod.remove();
    });

    const putMethod = document.querySelectorAll('.put');

    putMethod.forEach(putMethod => {
        putMethod.remove();
    });

    new ElementCreator("form")
        .with("class", "post")
        //.with("method", "post")
        //.with("action", `/api/categories/:category/wheelchairs`)

        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("ID")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "id")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Name")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "name")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Category")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "category")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Manufacturer")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "manufacturer")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Price")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "price")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Image")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "image")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Terrain")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "terrain")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Description")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "description")
                )
            )
        )

        .append(new ElementCreator("p")
            .append(new ElementCreator("button")
                .text("Send")
                .with("type", "submit")
            )
        )
        .appendTo(document.querySelector(".form"))
}


createFormDomPut = function () {
    const deleteMethod = document.querySelectorAll('.delete');

    deleteMethod.forEach(deleteMethod => {
        deleteMethod.remove();
    })

    const postMethod = document.querySelectorAll('.post');

    postMethod.forEach(postMethod => {
        postMethod.remove();
    });

    const putMethod = document.querySelectorAll('.put');

    putMethod.forEach(putMethod => {
        putMethod.remove();
    });

    new ElementCreator("form")
        .with("class", "put")
        //.with("method", "put")
        //.with("action", `/api/wheelchairs/:id`)

        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("ID")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "id")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Name")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "name")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Category")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "category")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Manufacturer")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "manufacturer")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Price")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "price")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Image")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "image")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Terrain")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "terrain")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("label")
                .text("Description")
                .append(new ElementCreator("input")
                    .with("type", "text")
                    .with("name", "description")
                )
            )
        )
        .append(new ElementCreator("p")
            .append(new ElementCreator("button")
                .text("Send")
            )
        )
        .appendTo(document.querySelector(".form"))
}