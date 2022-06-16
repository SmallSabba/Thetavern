class Category {

    constructor(title, name) {

        this.name = name;
        this.title = title;
    }
}

class Wheelchair {

    constructor(name, manufacturer, price, image, description) {

        this.name = name;
        this.manufacturer = manufacturer;
        this.image = image;
        this.price = price;
        this.description = description;
    }
}

class WheelchairModel {
    static CATEGORY_ID = 1;
    static WHEELCHAIR_ID = 1;

    constructor() {
        this.wheelchairs = new Map();
    }

    addCategory(category) {
        if (!this.wheelchairs.get(category)) {
            category.id = WheelchairModel.CATEGORY_ID++;
            this.wheelchairs.set(category, new Map())
        }
    }

    addWheelchair(category, wheelchair) {
        if (!this.wheelchairs.get(category)) {

            console.log(this.wheelchairs.get(category));
            console.log(category);

            throw new Error(`Unknown wheelchair category ${category.name}`)
        }
        wheelchair.id = WheelchairModel.WHEELCHAIR_ID++;

        this.getWheelchairsAsMap(category).set(wheelchair.id, wheelchair);
    }

    resolveCategory(category) {
        if (typeof category === "string") {
            for (const [_category, wheelchairs] of this.wheelchairs.entries()) {

                if (_category.name === category) {
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
        for (const [ category, wheelchairsAsMap] of this.wheelchairs.entries()) {
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

    getWheelchairs(category) {
        return Array.from(this.getWheelchairsAsMap(category).values());
    }

    getWheelchair(id) {
        if (typeof id !== "number") {
            throw new Error(`Given id must be a number, but is a ${typeof id}`);
        }

        let book = null;

        const category = this.getCategory(id);
        if (category) {
            book = this.wheelchairs.get(category).get(id);
        }
        return book;
    }


    createWheelchair(category, wheelchair) {

        this.addWheelchair(category, wheelchair);

        return this.getWheelchair(WheelchairModel.WHEELCHAIR_ID - 1);
    }

    updateWheelchair(id, wheelchair) {

        wheelchair.id = parseInt(wheelchair.id);
        wheelchair.price = parseInt(wheelchair.price);

        Object.assign(this.getWheelchair(id), wheelchair);      /** changes all params not only differences */
    }

    deleteWheelchair(id) {

        this.getWheelchairsAsMap(this.getCategory(id)).delete(id);
    }
}

const model = new WheelchairModel();

const electrical = new Category("Electrical Wheelchairs", "electric");
model.addCategory(electrical);
model.addWheelchair(electrical, new Wheelchair("iCHAIR MC2 1.611", "Some guy", 14,
    "/wheelchairs/electric/iCHAIR_MC2.png",
    "Some information, some more information, additional information."));
model.addWheelchair(electrical, new Wheelchair("Optimus_2__Optimus_2_S", "Some other guy", 11,
    "/wheelchairs/electric/Optimus_2__Optimus_2_S.png",
    "Some information, some more information, additional information."));


const manual = new Category("Electrical Wheelchairs", "manual");
model.addCategory(manual);
model.addWheelchair(manual, new Wheelchair("Format", "Third guy", 7,
    "/wheelchairs/manual/Format.png",
    "Some information, some more information, additional information."));
model.addWheelchair(manual, new Wheelchair("MWstone", "Fourth guy", 6,
    "/wheelchairs/manual/MWstone.png",
    "Some information, some more information, additional information."));

module.exports = model;