const model = require("../models/wheelchair-model");

class WheelchairController {
    static MANDATORY = ["name", "manufacturer", "image", "price"];

    getCategories (req, res) {
        // here is async not necessary
        // because it is a non-promise type
        res.send(model.getCategories());
        // getCategories -> keys -> which returns array as map
        // no object thus no multithreading
    }

    getAllWheelchairs (req, res) {
        // here is async not necessary
        // because it is a non-promise type
        res.send(model.getAllWheelchairs());
        // no object thus no multithreading
    }

    getCategoryWheelchairs (req, res) {
        // here is async not necessary
        // because it is a non-promise type
        res.send(model.getWheelchairs(req.params.category));
        // no object thus no multithreading
    }

    getWheelchair = async (req, res) => {
        const wheelchair = await model.getWheelchair(parseInt(req.params.id));
        if (wheelchair) {
            res.send(wheelchair);
        } else {
            res.status(404).send(`Wheelchair with id ${req.params.id} not found.`);
        }
    }

    checkWheelchairProperties(res, wheelchair, id) {
        let result = true;

        const mandatoryNames = [...WheelchairController.MANDATORY];
        // ... dot dot dot -> zero or more string objects may be passed as the arguments
        // "varargs"

        if (id) {
            mandatoryNames.push("id");
            // .push() adds item into array
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

    createWheelchair = async (req, res) => {
        let wheelchair = req.body;
        try {
            let category = await model.resolveCategory(req.params.category);
            if (this.checkWheelchairProperties(res, wheelchair)) {
                res.send(await model.createWheelchair(category, wheelchair))
            }

        } catch (e) {
            //console.log(e);
            res.status(400).send(req.params.category + " does not exist. Wheelchair cannot be created.")
        }

        file.write = jsonEdi
    }

    updateWheelchair = async (req, res) => {
        let wheelchairID = parseInt(req.params.id);
        if (await model.getWheelchair(wheelchairID)) {
            let wheelchair = req.body;
            if (this.checkWheelchairProperties(res, wheelchair, wheelchairID)) {
                // non-promise type thus no await
                await model.updateWheelchair(wheelchairID, wheelchair);
                res.send(200);
            }
        } else {
            res.status(404).send(`Wheelchair with id ${wheelchairID} does not exist. Wheelchair cannot be updated.`)
        }
    }

    deleteWheelchair = async (req, res) => {
        let wheelchairID = parseInt(req.params.id);
        if (await model.getWheelchair(wheelchairID)) {
            await model.deleteWheelchair(wheelchairID);
            res.send(204);
        } else {
            res.status(404).send(`Wheelchair with id ${wheelchairID} does not exist. Wheelchair cannot be deleted.`)
        }
    }
}

module.exports = new WheelchairController();