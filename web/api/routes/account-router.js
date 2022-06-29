const { Router } = require("express");
const controller = require("../controllers/account-controller");

const router = new Router();

router.post('/user/register', controller.register);
router.post('/user/login', controller.login);
router.get('/user/logout', controller.logout);

router.get('/user/get', controller.getUser);
router.delete('/user/delete', controller.deleteUser);

//router.post('/user/checkDuplicateUsername', controller.checkDuplicateUsername);
router.post('/user/changeUsername', controller.changeUsername);

router.post('/user/verifyPassword', controller.verifyPassword);
router.post('/user/changePassword', controller.changePassword);

router.post('/user/changeEmail', controller.changeEmail);


module.exports = router;