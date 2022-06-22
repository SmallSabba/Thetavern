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

    user = async (req, res) => {

        console.log("user1");

        if (!req.session.user) {
            console.log("user2");
            return
        }

    return res.send({user: req.session.user});
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
                        email: email
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
                            req.session.save();
                            //console.log(req.session);
                            //console.log(req.session.user);
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
}

module.exports = new AccountController();