const model = require("../models/wheelchair-model");

class WheelchairController {
    static MANDATORY = ["name", "manufacturer", "image", "price"];

    getCategories(req, res) {
        res.send(model.getCategories());
    }

    getCategoryWheelchairs(req, res) {
        res.send(model.getWheelchairs(req.params.category));
    }

    getWheelchair(req, res) {

        const wheelchair = model.getWheelchair(parseInt(req.params.id));
        if (wheelchair) {
            res.send(wheelchair);
        } else {
            res.status(404).send(`Wheelchair with id ${req.params.id} not found.`);
        }
    }

    checkWheelchairProperties(res, wheelchair, id) {
        let result = true;

        const mandatoryNames = [...WheelchairController.MANDATORY];

        if (id) {
            mandatoryNames.push("id");
        }

        const containedNames = mandatoryNames.filter(c => c in wheelchair);
        if (containedNames.length < mandatoryNames.length) {
            const necessary = mandatoryNames.join(", ");
            const contained = containedNames.length === 0 ? "none of those" : "only " + containedNames.join(", ");
            res.status(400).send(`Wheelchair data must include ${necessary}, but ${contained} present.`);
            result = false;
        }

        // If id given, check if it matches the one in the wheelchair
        if (id && result) {
            if (parseInt(wheelchair.id) !== id) {
                res.status(400).send(`Wheelchair data can only be updated if the id in the path (${id}) and the id in the body (${wheelchair.id}) match.`);
                result = false;
            }
        }
        return result;
    }

    createWheelchair = (req, res) => {

        let wheelchair = req.body;

        try {
            let category = model.resolveCategory(req.params.category);

            if (this.checkWheelchairProperties(res, wheelchair)) {

                res.send(model.createWheelchair(category, wheelchair))
            }

        } catch (e) {
            //console.log(e);
            res.status(400).send(req.params.category + " does not exist. Wheelchair cannot be created.")
        }
    }

    updateWheelchair = (req, res) => {

        let wheelchairID = parseInt(req.params.id);

        if (model.getWheelchair(wheelchairID)) {

            let book = req.body;

            if (this.checkWheelchairProperties(res, book, wheelchairID)) {

                model.updateWheelchair(wheelchairID, book);
                res.send(200);
            }
        } else {
            res.status(404).send(`Wheelchair with id ${wheelchairID} does not exist. Wheelchair cannot be updated.`)
        }
    }

    deleteWheelchair(req, res) {

        let wheelchairID = parseInt(req.params.id);

        if (model.getWheelchair(wheelchairID)) {

            model.deleteWheelchair(wheelchairID);
            res.send(204);

        } else {
            res.status(404).send(`Wheelchair with id ${wheelchairID} does not exist. Wheelchair cannot be deleted.`)
        }
    }
}

module.exports = new WheelchairController();