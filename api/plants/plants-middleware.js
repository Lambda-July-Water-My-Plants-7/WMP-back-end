const plants = require('./plants-model');

const secureByOwnerID = async (req, res, next) => {
    const { plantID } = req.params;
    const certID = req.decoded.id;

    const target = await plants.findPlantById(plantID);

    if (target === certID) {
        next();
    } else {
        res.status(403).json({ message: "That is not your plant" });
    }
}

module.exports = {
    secureByOwnerID
}