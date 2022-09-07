const { Router } = require("express");
const controller = require("../controllers/account-controller");

const router = new Router();

router.post('/user/register', controller.register);
router.post('/user/login', controller.login);
router.get('/user/logout', controller.logout);

router.get('/user/get', controller.getUser);
router.get('/user/getAll', controller.getAllUsers);
router.delete('/user/delete', controller.deleteUser);

router.post('/user/changeUsername', controller.changeUsername);

router.post('/user/changePassword', controller.changePassword);
router.post('/user/verifyPassword', controller.verifyPassword);

router.post('/user/changeEmail', controller.changeEmail);
router.post('/user/changeProfilePicture', controller.changeProfilePicture);

router.get('/user/orders/get', controller.getOrders);
router.post('/user/orders/:productID/add', controller.addOrder);
router.post('/user/orders/:productID/remove', controller.removeOrder);

router.get('/user/saves/get', controller.getSavedItems);
router.post('/user/saves/:productID/add', controller.addSavedItem);
router.post('/user/saves/:productID/remove', controller.removeSavedItem);

router.post('/user/shipping/setAddress', controller.setShippingAddress);
router.post('/user/payment/setPayment', controller.setPaymentMethod);

module.exports = router;