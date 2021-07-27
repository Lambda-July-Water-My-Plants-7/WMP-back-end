const db = require('../../data/dbConfig');

const findAllPlants = async () => {
    return await db("plants")
        .orderBy('plantID');
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

    await db("plants")
        .insert(neoPlant);
    return await findPlantById(neoPlant.plantID);
}

const updatePlant = async (neoPlant) => {
    await db("plants")
    .where({ plantID: neoPlant.plantID})
        .update(neoPlant);
    return await findPlantById(neoPlant.plantID);
}

const removePlant = async (plantID) => {
    return await db("plants")
        .where({plantID})
        .del();
}

module.exports = {
    findAllPlants,
    findPlantById,
    findPlantsByOwner,
    createPlant,
    removePlant,
    updatePlant
}
