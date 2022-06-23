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


generateChangePassword = function () {
    const removePasswordContainer = document.querySelectorAll('.changePassword');
    removePasswordContainer.forEach(removePasswordContainer => {
        removePasswordContainer.remove();
    })


    const removeUsernameContainer = document.querySelectorAll('.changeUsername');
    removeUsernameContainer.forEach(removeUsernameContainer => {
        removeUsernameContainer.remove();
    })


    new ElementCreator("div")
        .with("class", "changePassword")

        .append(new ElementCreator("input")
            .with("type", "text")
            .with("class", "oldPassword")
            .with("placeholder","Old password")
        )
        .append(new ElementCreator("input")
            .with("type", "text")
            .with("class", "newPassword")
            .with("placeholder","New password")
        )
        .append(new ElementCreator("button")
            .text("Click to save")
            .listener('click', () => changePassword())
        )

        .appendTo(document.querySelector(".account"))
}


generateChangeUsername = function () {
    const removePasswordContainer = document.querySelectorAll('.changePassword');
    removePasswordContainer.forEach(removePasswordContainer => {
        removePasswordContainer.remove();
    })


    const removeUsernameContainer = document.querySelectorAll('.changeUsername');
    removeUsernameContainer.forEach(removeUsernameContainer => {
        removeUsernameContainer.remove();
    })

    new ElementCreator("div")
        .with("class","changeUsername")

        .append(new ElementCreator("input")
            .with("type", "text")
            .with("class", "oldUsername")
            .with("placeholder","Old username")
        )
        .append(new ElementCreator("input")
            .with("type", "text")
            .with("class", "newUsername")
            .with("placeholder", "New username")
        )
        .append(new ElementCreator("button")
            .text("Click to save")
            .listener('click', () => changeUsername())
        )

        .appendTo(document.querySelector(".account"))
}


deleteAccount = async (req, res) => {

    fetch('/api/user/delete', {
        method: 'delete'
    }).then(() => {
        console.log("finished");
        window.location.href = 'index.html';
    })
}

changePassword = async (req, res) => {

    let oldPassword = document.querySelector(".oldPassword").value;
    let newPassword = document.querySelector(".newPassword").value;

    fetch('/api/user/verifyPassword', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
        }),
    }).then(res => res.json())
        .then(data => {
            console.log(data.bo)
            if (data.bo) {
            fetch('/api/user/changePassword', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                }),
            }).then(() => {
                console.log("finished");
                window.location.href = 'index.html';
            })
        } else {
            console.log("Your password is not correct.")
            alert("Your password is not correct.")
        }
    })
}

changeUsername = async (req, res) => {



    let oldUsername = document.querySelector(".oldUsername").value;
    let newUsername = document.querySelector(".newUsername").value;

    console.log(oldUsername + "    " + newUsername);


    fetch('/api/user/verifyUsername', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            oldUsername: oldUsername,
            newUsername: newUsername,
        }),
    }).then(res => res.json())
        .then(data => {
        if (data.bo) {
            fetch('/api/user/changeUsername', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    oldUsername: oldUsername,
                    newUsername: newUsername,
                }),
            }).then(() => {
                console.log("finished");
                window.location.href = 'index.html';
            })
        } else {
            console.log("Your username is not correct.")
            alert("Your username is not correct.")
        }
    })
}