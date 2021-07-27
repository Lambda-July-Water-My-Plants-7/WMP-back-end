const express = require('express');
const { checkSpeciesID } = require('./plants-middleware');

const species = require('./plant-species-model');
const router = express.Router();

router.get("/", (req, res, next) => {
    species.findAllSpecies()
        .then(resp => {
            res.status(200).json(resp);
        }).catch(next);
})

router.post("/", (req, res, next) => {
    let neoSpecies = req.body;
    
    species.createSpecies(neoSpecies)
        .then(() => {
            res.status(201).json({...neoPlant});
        }).catch(next);
})

router.put("/:speciesID", [checkSpeciesID], (req, res, next) => {
    const { speciesID } = req.params;
    let neoSpecies = req.body;
    neoSpecies.speciesID = speciesID;

    species.updateSpecies(neoSpecies)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.delete("/:speciesID", [checkSpeciesID], (req, res, next) => {
const { speciesID } = req.params;

    species.deleteSpecies(speciesID)
        .then(() => {
            res.status(200).json({
                message: `Species ID ${speciesID} has been deleted.` 
            });
        }).catch(next);
})

module.exports = router;
