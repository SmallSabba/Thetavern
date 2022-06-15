const { Router } = require("express");
const controller = require("../controllers/wheelchair-controller");

const routes = Router();

routes.get("/categories", controller.getCategories);
routes.get("/categories/:category/books", controller.getCategoryWheelchairs);
routes.get("wheelchairs/:id", controller.getWheelchair);

routes.post("/categories/:category/books", controller.createWheelchair);

routes.put("/books/:id", controller.updateWheelchair);

routes.delete("/books/:id", controller.deleteWheelchair);

module.exports = routes;