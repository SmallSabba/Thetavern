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
            return res.send({user: null, admin: null});
        }
        if (req.session.authorized) {
            return res.send({user: req.session.user, admin: true});
        }
        return res.send({user: req.session.user, admin: false});
    }

    register = async (req, res) => {

        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;

        try {
            jsonReader("././files/users.json", (err, users) => {

                if (err) {
                    console.log(err);

                } else {
                    for (let i = 0; i < users.length; i++) {

                        if (username === users[i].username || email === users[i].email) {

                            return res.status(400).send("There already is an existing account.").redirect('/register.html')
                        }
                    }
                    const newUser = {
                        username: username,
                        password: password,
                        email: email,
                        authorized: false
                    }
                    users.push(newUser);
                    console.log(users);

                    const usersAsString = JSON.stringify(users, null, 2);
                    fs.writeFile('././files/users.json', usersAsString, err => {

                        if (err) {
                            return res.status(400).send("An error occurred while registration process.", err).redirect('/login.html');

                        } else {
                            return res.status(200).send("Successfully registered your account.").redirect('/login.html');
                        }
                    })
                }
            })
        } catch (err) {
            res.status(400).send("An error occurred, try again later.").redirect('/register.html');
        }
    }

    login = async (req, res) => {

        let username = req.body.username.toLowerCase();
        let password = req.body.password;

        try {

            jsonReader("././files/users.json", (err, users) => {

                if (err) {
                    console.log(err);

                } else {
                    for (let i = 0; i < users.length; i++) {

                        if (username === users[i].username.toLowerCase() && password === users[i].password) {

                            req.session.user = users[i].username;
                            req.session.authorized = users[i].authorized;
                            req.session.save();

                            return res.status(200).redirect('/index.html');
                        }
                    }

                    return res.status(400).send("Invalid username or password.").redirect('/login.html');
                }
            })
        } catch (err) {

            res.status(400).send("An error occurred, try again later.").redirect('/login.html');
        }
    }

    logout = async (req, res) => {

        req.session.destroy();
        res.status(200).redirect('/index.html');
    }


    deleteUser = async (req, res) => {

        let username = req.session.user;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                console.log(err)

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (username === users[i].username) {
                        console.log("Account was found and deleted");
                        users.splice(i, 3)

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(400).send("An error occurred while deleting your account. Don't go..", err);
                            } else {
                                this.logout(req, res);
                                return res.status(200).send("Successfully deleted your account.");
                            }
                        })
                    }
                }
            }
        })
    }
    changeEmail = async (req, res) => {

        let currentUser = req.body.currentUser;
        let newEmail = req.body.newEmail;

        console.log(currentUser);

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                console.log(err)

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        if (newEmail.toLowerCase() === users[i].email.toLowerCase()) {
                            return res.send({bo: false});

                        } else {
                            users[i].email = newEmail;
                        }

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(400).send("An error occurred while changing your email.", err);
                            } else {
                                return res.status(200).send({bo: true});
                            }
                        })
                    }
                }
            }
        })
    }

    changePassword = async (req, res) => {

        let currentUser = req.body.currentUser;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                console.log(err)

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        users[i].password = req.body.newPassword;

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                return res.status(400).send("An error occurred while changing your password.", err);
                            } else {
                                return res.status(200).send("Successfully changed your password.");
                            }
                        })
                    }
                }
            }
        })
    }

    async changeUsername(req, res)  {

        let currentUsername = req.body.oldUsername;
        let newUsername = req.body.newUsername;

        //just for now till method call is fixed
        let index;

        //couldn't get to work because of asynchronicity..
        //if (checkDuplicateUsername(newUsername)) {

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUsername.toLowerCase() === users[i].username.toLowerCase()) index = i;

                    if (newUsername.toLowerCase() === users[i].username.toLowerCase()) {

                        return res.send({bo: false});
                    }
                }
                users[index].username = newUsername;
                req.session.user = newUsername;

                const usersAsString = JSON.stringify(users, null, 2);
                fs.writeFile('././files/users.json', usersAsString, err => {

                    if (err) {
                        return res.status(400).send("An error occurred while changing your username.", err);
                    } else {
                        return res.status(200).send({bo: true});
                    }
                })
            }
        })
    }

    //checks if the old password is correct
    async verifyPassword (req, res) {

        let currentUser = req.body.currentUser;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                console.log(err);
            } else {

                for (let i = 0; i < users.length; i++) {

                    if (currentUser === users[i].username) {

                        if (req.body.oldPassword === users[i].password) {
                            return res.send({bo: true});

                        } else {
                            return res.send({bo: false});
                        }
                    }
                }
            }
        })
    }

    //checks if there already is a user with the requested new username
    checkDuplicateUsername = async (newUsername) => {

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < users.length; i++) {

                    if (newUsername.toLowerCase() === users[i].username.toLowerCase()) {
                        return false;
                    }
                }
                return true;
            }
        })
    }
}

module.exports = new AccountController();