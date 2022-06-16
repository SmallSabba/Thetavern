const { Router } = require("express");
const controller = require("../controllers/wheelchair-controller");

const router = Router();

router.get("/categories", controller.getCategories);
router.get("/categories/:category/wheelchairs", controller.getCategoryWheelchairs);
router.get("/wheelchairs/:id", controller.getWheelchair);

router.post("/categories/:category/wheelchairs", controller.createWheelchair);

router.put("/wheelchairs/:id", controller.updateWheelchair);

router.delete("/wheelchairs/:id", controller.deleteWheelchair);

module.exports = router;