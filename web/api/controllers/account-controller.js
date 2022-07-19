const wheelmodel = require("../models/wheelchair-model")
const fs = require('fs');
const {toJSON} = require("express-session/session/cookie");

function jsonReader(filePath, cb) {

    fs.readFile(filePath, (err, jsonFile) => {

        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(jsonFile);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}

class AccountController {

    getUser = async (req, res) => {

        if (req.session.user === undefined) {

            const tmpUser = {
                username: null,
                email: null,
                profilePicture: null,
                authorized: null,
                orderedItems: [],
                savedItems: [],
                shippingInfo: null,
                paymentInfo: null
            }
            return res.status(200).send({user: tmpUser});
        }

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({user: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (req.session.user === users[i].username) {
                        return res.status(200).send({user: users[i]});
                    }
                }
            }
        })
    }

    getAllUsers = async (req, res) => {

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({users: null});

            } else {
                return res.status(200).send({users: users});
            }
        })
    }

    register = async (req, res) => {

        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {
                for (let i = 0; i < users.length; i++) {

                    if (username.toLowerCase() === users[i].username.toLowerCase()
                        || email.toLowerCase() === users[i].email.toLowerCase()) {

                        return res.status(400).send({bo: false});
                    }
                }
                const newUser = {
                    username: username,
                    password: password,
                    email: email,
                    profilePicture: "noAvatar.png",
                    authorized: false,
                    orderedItems: [],
                    savedItems: [],
                    shippingInfo: {
                        firstname: null,
                        lastname: null,
                        street: null,
                        city: null,
                        state: null,
                        postal: null,
                        phone: null
                    },
                    paymentInfo: {
                        cardNumber: null,
                        expireMonth: null,
                        expireYear: null,
                        cvv: null
                    }
                }
                users.push(newUser);

                const usersAsString = JSON.stringify(users, null, 2);
                fs.writeFile('././files/users.json', usersAsString, err => {

                    if (err) {
                        return res.status(500).send({bo: null});
                    } else {
                        return res.status(200).send({bo: true});
                    }
                })
            }
        })

    }

    login = async (req, res) => {

        let username = req.body.username;
        let password = req.body.password;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {
                for (let i = 0; i < users.length; i++) {

                    if (username.toLowerCase() === users[i].username.toLowerCase() && password === users[i].password
                        || username.toLowerCase() === users[i].email.toLowerCase() && password === users[i].password) {

                        req.session.user = users[i].username;
                        req.session.save();

                        return res.status(200).send({bo: true});
                    }
                }
                return res.status(400).send({bo: false});
            }
        })

    }

    logout = async (req, res) => {

        req.session.destroy();
        return res.status(200).send();
    }

    deleteUser = async (req, res) => {

        let currentUser = req.session.user;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {
                        users.splice(i, 9)

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(500).send({bo: null});
                            } else {
                                req.session.destroy();
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }

    //checks if the old password is correct
    async verifyPassword(req, res) {

        let currentUser = req.session.user;
        let form = req.body;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});
            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        if (form.oldPassword === users[i].password) {
                            return res.status(200).send({bo: true});

                        } else {
                            return res.status(400).send({bo: false});
                        }
                    }
                }
            }
        })
    }

    changePassword = async (req, res) => {

        let currentUser = req.session.user;
        let form = req.body;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        if (form.oldPassword === form.newPassword) {
                            return res.status(400).send({bo: false});
                        }

                        users[i].password = form.newPassword;

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(500).send({bo: null});
                            } else {
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }

    async changeUsername(req, res) {

        let currentUsername = req.session.user;
        let form = req.body;

        //just for now till method call is fixed
        let userIndex;

        //couldn't get to work because of asynchronicity..
        //if (checkDuplicateUsername(newUsername)) {

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUsername === users[i].username) userIndex = i;

                    if (form.value.toLowerCase() === users[i].username.toLowerCase() && userIndex !== i) {

                        return res.send({bo: false});
                    }
                }

                users[userIndex].username = form.value;
                req.session.user = form.value;

                const usersAsString = JSON.stringify(users, null, 2);
                fs.writeFile('././files/users.json', usersAsString, err => {

                    if (err) {
                        return res.status(500).send({bo: null});
                    } else {
                        return res.status(200).send({bo: true});
                    }
                })
            }
        })
    }

    changeEmail = async (req, res) => {

        let currentUser = req.session.user;
        let form = req.body;
        let userIndex;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    //same email as a different user already has
                    if (form.value.toLowerCase() === users[i].email.toLowerCase()) {

                        return res.status(400).send({bo: false});
                    }

                    if (currentUser === users[i].username) {
                        userIndex = i;
                    }
                }

                users[userIndex].email = form.value;

                const usersAsString = JSON.stringify(users, null, 2);
                fs.writeFile('././files/users.json', usersAsString, err => {

                    if (err) {
                        return res.status(500).send({bo: null});
                    } else {
                        return res.status(200).send({bo: true});
                    }
                })
            }
        })
    }

    async changeProfilePicture(req, res) {

        let currentUser = req.session.user;
        let newProfilePicture = req.body.profilePicture;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        users[i].profilePicture = newProfilePicture;
                        req.session.profilePicture = users[i].profilePicture;

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(500).send({bo: null});
                            } else {
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }

    async getOrders(req, res) {

        let currentUser = req.session.user;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({items: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        let orderedWheelchairs = [];

                        for (const wheelchair of users[i].orderedItems) {

                            orderedWheelchairs.push(wheelmodel.getWheelchair(wheelchair));
                        }
                        if (orderedWheelchairs.length === 0) {
                            return res.status(200).send({items: false});
                        }
                        return res.status(200).send({items: orderedWheelchairs});
                    }
                }
            }
        })
    }

    async addOrder(req, res) {

        let currentUser = req.session.user;
        let productID = parseInt(req.params.productID);

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        users[i].orderedItems.push(productID);

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(500).send({bo: null});
                            } else {
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }

    async removeOrder(req, res) {

        let currentUser = req.session.user;
        let productID = parseInt(req.params.productID);

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        for (let j = 0; j < users[i].orderedItems.length; j++) {

                            if (users[i].orderedItems[j] === productID) {
                                users[i].orderedItems.splice(j, 1);
                            }
                        }

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(500).send({bo: null});
                            } else {
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }

    async getSavedItems(req, res) {

        let currentUser = req.session.user;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({items: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        let savedWheelchairs = [];

                        for (const wheelchair of users[i].savedItems) {

                            savedWheelchairs.push(wheelmodel.getWheelchair(wheelchair));
                        }

                        if (savedWheelchairs.length === 0) {
                            return res.status(200).send({items: false});
                        }
                        return res.status(200).send({items: savedWheelchairs});
                    }
                }
            }
        })
    }

    async addSavedItem(req, res) {

        let currentUser = req.session.user;
        let productID = parseInt(req.params.productID);

        if (currentUser === undefined) {
            return res.status(200).send({bo: true});
        }

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        for (let j = 0; j < users[i].savedItems.length; j++) {

                            if (productID === users[i].savedItems[j]) {
                                return res.status(200).send({bo: true});
                            }
                        }
                        users[i].savedItems.push(productID);

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(500).send({bo: null});
                            } else {
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }

    async removeSavedItem(req, res) {

        let currentUser = req.session.user;
        let productID = parseInt(req.params.productID);

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        for (let j = 0; j < users[i].savedItems.length; j++) {

                            if (users[i].savedItems[j] === productID) {

                                users[i].savedItems.splice(j, 1);
                            }
                        }

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(500).send({bo: null});
                            } else {
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }

    async setShippingAddress(req, res) {

        let currentUser = req.session.user;
        let form = req.body;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {
                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        users[i].shippingInfo.firstname = form.firstname.replaceAll(" ", "");
                        users[i].shippingInfo.lastname = form.lastname.replaceAll(" ", "");
                        users[i].shippingInfo.street = form.street;
                        users[i].shippingInfo.city = form.city.replaceAll(" ", "");
                        users[i].shippingInfo.state = form.state.replaceAll(" ", "");
                        users[i].shippingInfo.postal = form.postal.replaceAll(" ", "");
                        users[i].shippingInfo.phone = form.phone.replaceAll(" ", "");

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(500).send({bo: null});
                            } else {
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }

    async setPaymentMethod(req, res) {

        let currentUser = req.session.user;
        let form = req.body;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                return res.status(500).send({bo: null});

            } else {
                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        users[i].paymentInfo.cardNumber = form.cardNumber.replaceAll(" ", "");
                        users[i].paymentInfo.expireMonth = form.expireMonth.replaceAll(" ", "");
                        users[i].paymentInfo.expireYear = form.expireYear.replaceAll(" ", "");
                        users[i].paymentInfo.cvv = form.cvv.replaceAll(" ", "");

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(500).send({bo: null});
                            } else {
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }
}

module.exports = new AccountController();