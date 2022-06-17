const { Router } = require("express");
const controller = require("../controllers/account-controller");

const router = new Router();

// Accept the register form
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

module.exports = router;