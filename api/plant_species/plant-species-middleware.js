const species = require('./plant-species-model');

const checkSpeciesID = async (req, res, next) => {
    const { speciesID } = req.params;
    const target = await species.findSpeciesByID(speciesID);

    if (!target || target === undefined || target === null 
        || target === {}) {
            res.status(400).json({
                message: "No such species"
            })
        } else {
            req.species = target;
            next();
        }
}

module.exports = {
    checkSpeciesID
}
