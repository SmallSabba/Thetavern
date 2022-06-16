class AccountController {

    authenticate(req, res) {

        let username = req.body.username;
        let password = req.body.password;

        if (username && password) {

            //...
        }
    }
}

module.exports = new AccountController();