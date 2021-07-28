const db = require('../../data/dbConfig');

const findAllSpecies = async () => {
    return await db("plant_species");
}

const findSpeciesByID = async (speciesID) => {
    return await db("plant_species")
        .where({speciesID})
        .first();
}

const createSpecies = async (neoSpecies) => {
    neoSpecies.speciesID = Date.now();

    await db("plant_species")
        .insert(neoSpecies);
    return findSpeciesByID(neoSpecies.speciesID);
}

const updateSpecies = async (neoSpecies) => {
    const speciesID = neoSpecies.speciesID;

    await db("plant_species")
        .update(neoSpecies)
        .where({speciesID});
    return findSpeciesByID(neoSpecies.speciesID);
}

const deleteSpecies = async (speciesID) => {
    await db("plant_species")
        .where({speciesID})
        .del();
}

module.exports = {
    findAllSpecies,
    findSpeciesByID,
    createSpecies,
    updateSpecies,
    deleteSpecies
}
