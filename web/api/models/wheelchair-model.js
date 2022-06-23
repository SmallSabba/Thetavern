const fs = require('fs');

function jsonReader(filePath, cb) {

    fs.readFile(filePath, (err, jsonFile) => {

        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(jsonFile);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}


class Category {

    constructor(title, name) {

        this.name = name;
        this.title = title;
    }
}

class Wheelchair {

    constructor(id, name, category, manufacturer, price, image, terrain, description) {

        this.sold = 0;
        this.id = id;
        this.name = name;
        this.category = category;
        this.manufacturer = manufacturer;
        this.price = price;
        this.image = image;
        this.terrain = terrain;
        this.description = description;
    }
}

class WheelchairModel {
    static WHEELCHAIR_ID = 1;

    constructor() {
        this.wheelchairs = new Map();
    }

    readWheelchairs() {

        try {
            jsonReader("././files/wheelchairs.json", (err, wheelchairs) => {

                if (err) {
                    console.log(err);

                } else {

                    for (let i = 0; i < wheelchairs.length; i++) {

                        this.addWheelchair(wheelchairs[i].category,
                            new Wheelchair(wheelchairs[i].id, wheelchairs[i].name, wheelchairs[i].category,
                                wheelchairs[i].manufacturer, wheelchairs[i].price, wheelchairs[i].image,
                                wheelchairs[i].terrain, wheelchairs[i].description)
                        );
                    }
                }
            })
        } catch (err) {
            console.log("An error occurred, try again later.");

        }
    }

    addCategory(category)  {
        if (!this.wheelchairs.get(category)) {
            this.wheelchairs.set(category, new Map())
        }
    }

    addWheelchair(category, wheelchair) {
        if (!this.wheelchairs.get(category)) {
            throw new Error(`Unknown wheelchair category ${category}`)
        }
        wheelchair.id = WheelchairModel.WHEELCHAIR_ID++;
        this.getWheelchairsAsMap(category).set(wheelchair.id, wheelchair);
    }

    resolveCategory(category) {
        if (typeof category === "string") {
            for (const [_category, wheelchairs] of this.wheelchairs.entries()) {

                if (_category === category) {
                    return _category;
                }
            }
            throw new Error(`Unknown wheelchair category ${category}`)
        }
        return category;
    }

    getCategories() {
        return Array.from(this.wheelchairs.keys());
    }

    getCategory(id) {
        for (const [category, wheelchairsAsMap] of this.wheelchairs.entries()) {
            const wheelchairs = Array.from(wheelchairsAsMap.values());
            if (wheelchairs.find(wheelchair => wheelchair.id === id)) {
                return category;
            }
        }
        return null;
    }

    getWheelchairsAsMap(category) {
        return this.wheelchairs.get(this.resolveCategory(category));
    }

    getAllWheelchairs() {
        return this.getWheelchairs("electric").concat(this.getWheelchairs("manual"));
    }

    getWheelchairs(category) {
        return Array.from(this.getWheelchairsAsMap(category).values());
    }

    getWheelchair = async (id) => {
        if (typeof id !== "number") {
            throw new Error(`Given id must be a number, but is a ${typeof id}`);
        }
        let wheelchair = null;
        const category = await this.getCategory(id);
        if (category) {
            wheelchair = await this.wheelchairs.get(category).get(id);
        }
        return wheelchair;
    }

    createWheelchair = async (category, wheelchair) => {
        await this.addWheelchair(category, wheelchair);
        return await this.getWheelchair(WheelchairModel.WHEELCHAIR_ID - 1);
    }

    updateWheelchair = async (id, wheelchair) => {
        wheelchair.id = parseInt(wheelchair.id);
        wheelchair.price = parseInt(wheelchair.price);
        Object.assign(await this.getWheelchair(id), wheelchair);      /** changes all params not only differences */
    }

    deleteWheelchair(id) {
        // for delete async is not necessary
        this.getWheelchairsAsMap(this.getCategory(id)).delete(id);
    }
}

const model = new WheelchairModel();

model.addCategory("electric");
model.addCategory("manual");

model.readWheelchairs();

module.exports = model;