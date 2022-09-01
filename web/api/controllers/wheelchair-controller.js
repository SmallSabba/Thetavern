const model = require("../models/wheelchair-model");

class WheelchairController {
    static MANDATORY = ["name", "manufacturer", "description", "price"];

    getCategories(req, res) {
        // here is async not necessary
        // because it is a non-promise type
        res.send(model.getCategories());
        // getCategories -> keys -> which returns array as map
        // no object thus no multithreading
    }

    getAllWheelchairs(req, res) {

        res.send(model.getAllWheelchairs());
    }

    getCategoryWheelchairs(req, res) {
        res.send(model.getWheelchairs(req.params.category));
    }

    getWheelchair = async (req, res) => {
        const wheelchair = await model.getWheelchair(parseInt(req.params.id));
        if (wheelchair) {
            res.send(wheelchair);
        } else {
            res.status(404).send(null);
        }
    }

    checkWheelchairProperties(res, wheelchair) {
        let result = true;

        const mandatoryNames = [...WheelchairController.MANDATORY];
        // ... dot dot dot -> zero or more string objects may be passed as the arguments
        // "varargs"

        const containedNames = mandatoryNames.filter(c => c in wheelchair);
        if (containedNames.length < mandatoryNames.length) {
            const necessary = mandatoryNames.join(", ");
            const contained = containedNames.length === 0 ? "none of those" : "only " + containedNames.join(", ");
            res.status(400).send(`Wheelchair data must include ${necessary}, but ${contained} present.`);
            result = false;
        }

        return result;
    }

    createWheelchair = async (req, res) => {
        let wheelchair = req.body;
        try {
            let category = await model.resolveCategory(req.params.category);
            if (this.checkWheelchairProperties(res, wheelchair)) {
                res.send(await model.createWheelchair(category, wheelchair))
            }

        } catch (e) {
            res.status(400).send(req.params.category + " does not exist. Wheelchair cannot be created.")
        }
    }

    updateWheelchair = async (req, res) => {

        let wheelchairID = parseInt(req.params.id);

        if (await model.getWheelchair(wheelchairID)) {

            if (this.checkWheelchairProperties(res, req.body, wheelchairID)) {
                model.updateWheelchair(req, res);
            }
        } else {
            res.status(404).send(`Wheelchair with id ${wheelchairID} does not exist. Wheelchair cannot be updated.`)
        }
    }

    deleteWheelchair = async (req, res) => {

        let wheelchairID = parseInt(req.params.id);
        if (await model.getWheelchair(wheelchairID)) {
            await model.deleteWheelchair(wheelchairID);
            res.status(200).send();
        } else {
            res.status(404).send(`Wheelchair with id ${wheelchairID} does not exist. Wheelchair cannot be deleted.`)
        }
    }

    async buyWheelchair(req, res) {

        model.buyWheelchair(req, res).then();
    }
}

module.exports = new WheelchairController();