const plants = require('./plants-model');

const checkPlantID = async (req, res, next) => {
    const { plantID } = req.params;
    const target = await plants.findPlantById(plantID);

    if (!target || target === undefined || target === null 
        || target === {}) {
            res.status(400).json({
                message: "No such plant"
            })
        } else {
            req.plant = target;
            next();
        }
}

const secureByOwnerID = async (req, res, next) => {
    const { plantID } = req.params;
    const certID = req.decoded.id;

    const target = await plants.findPlantById(plantID);

    if (target.ownerID === certID) {
        next();
    } else {
        res.status(403).json({ message: "That is not your plant" });
    }
}

const validateSpeciesName = (req, res, next) => {
    let { speciesID } = req.body; 
  
    if (!speciesID || typeof(speciesID) === "number" ) {
      next();
    } else {
      speciesID = speciesID.trim();
      if (speciesID === "") {
        speciesID = "hybrid";
      }
    }
    req.body.speciesID = speciesID;
    next();
  }  

module.exports = {
    checkPlantID,
    secureByOwnerID,
    validateSpeciesName
}