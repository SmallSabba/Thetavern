const fs = require('fs');

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

                            console.log("There already is an existing account.");
                            res.redirect('/register.html')
                            return;
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
                            console.log('Error writing file', err)
                        } else {
                            console.log('Successfully wrote file')
                            res.redirect('/login.html');
                        }
                    })
                }
            })
        } catch (err) {
            res.status(400);
            console.log("An error occurred, try again later.");
            res.redirect('/register.html');
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

                            console.log("did it" + req.session.user);
                            res.redirect('/index.html');
                            return;
                        }
                    }

                    console.log("Invalid username or password.")
                    res.redirect('/login.html');

                }
            })
        } catch (err) {
            res.status(400);
            console.log("An error occurred, try again later.");
            res.redirect('/login.html');
        }
    }

    logout = async (req, res) => {

        req.session.destroy();
        res.redirect('/index.html');
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
                                console.log('Error writing file', err)
                            } else {
                                console.log('Successfully wrote file')
                                this.logout(req, res);
                            }
                        })

                        return;
                    }
                }
            }
        })
    }

    changePassword = async (req, res) => {

        let username = req.session.user;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                console.log(err)

            } else {

                for (let i = 0; i < users.length; i++) {

                    if (username === users[i].username) {

                        users[i].password = req.body.newPassword;

                        const usersAsString = JSON.stringify(users, null, 2);
                        fs.writeFile('././files/users.json', usersAsString, err => {

                            if (err) {
                                console.log('Error writing file', err)
                            } else {
                                console.log('Successfully wrote file')
                            }
                        })

                        res.redirect('index.html')
                        return;
                    }
                }
            }
        })
    }

    changeUsername = async (req, res) => {

        let username = req.session.user;

        jsonReader("././files/users.json", (err, users) => {

                if (err) {
                    console.log(err)

                } else {

                    for (let i = 0; i < users.length; i++) {

                        if (username === users[i].username && username === req.body.oldUsername) {


                            users[i].username = req.body.newUsername;
                            req.session.user = req.body.newUsername;


                            const usersAsString = JSON.stringify(users, null, 2);
                            fs.writeFile('././files/users.json', usersAsString, err => {

                                if (err) {
                                    console.log('Error writing file', err)
                                } else {
                                    console.log('Successfully wrote file')
                                }
                            })

                            res.redirect('index.html')
                            return;
                        }
                    }
                }
            }
        )
    }

    verifyPassword = async (req, res) => {

        let username = req.session.user;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < users.length; i++) {

                    if (username === users[i].username) {
                        console.log("Account was found");

                        if (req.body.oldPassword === users[i].password) {
                            return res.send({bo: true})
                        } else {
                            return res.send({bo: false})
                        }
                    }
                }
            }
        })
    }

    checkDuplicateUsername = async (req, res) => {
        let username = req.session.user;

        jsonReader("././files/users.json", (err, users) => {

            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < users.length; i++) {

                    if (username === users[i].username) {
                        console.log("Account was found");

                        for (let j = 0; j < users.length; j++) {

                            if (req.body.newUsername === users[j].username) {
                                return res.send({bo: false})
                            }
                        }
                        return res.send({bo: true})
                    }
                }
            }
        })
    }
}

module.exports = new AccountController();