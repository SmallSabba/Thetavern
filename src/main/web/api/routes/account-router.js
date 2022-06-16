const {Router} = require("express");
const controller = require("../controllers/account-controller");

const router = new Router();

// Accept the register form
router.post('/authenticate', controller.authenticate);

module.exports = router;