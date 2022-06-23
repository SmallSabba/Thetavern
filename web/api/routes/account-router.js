const { Router } = require("express");
const controller = require("../controllers/account-controller");

const router = new Router();

// Accept the register form
router.get('/user/get', controller.getUser);
router.post('/user/register', controller.register);
router.post('/user/login', controller.login);
router.get('/user/logout', controller.logout);
router.delete('/user/delete', controller.deleteUser);
router.post('/user/changePassword', controller.changePassword);
router.post('/user/changeUsername', controller.changeUsername);
router.post('/user/verifyPassword', controller.verifyPassword);
router.post('/user/verifyUsername', controller.checkDuplicateUsername);

module.exports = router;