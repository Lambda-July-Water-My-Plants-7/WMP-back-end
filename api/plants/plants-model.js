const db = require('../../data/dbConfig');

const findAllPlants = async () => {
    return await db("plants");
}

const findPlantById = async (plantID) => {
    return await db("plants")
        .where({ plantID })
        .first();
}

const findPlantsByOwner = async (ownerID) => {
    return await db("plants")
        .where({ ownerID });
}

const createPlant = async (neoPlant) => {
    neoPlant.plantID = Date.now();

    const id = await db("plants")
        .insert(neoPlant);
    return await findPlantById(id);
}

const updatePlant = async (neoPlant) => {
    const id = await db("plants")
        .update(neoPlant, ['plantID', neoPlant.plantID]);
    return await findPlantById(neoPlant.plantID);
}

const removePlant = async (plantID) => {
    return await db("plants")
        .where({plantID})
        .del();
}

module.exports = {
    findAllPlants,
    findPlantsByOwner,
    createPlant,
    removePlant,
    updatePlant
}
