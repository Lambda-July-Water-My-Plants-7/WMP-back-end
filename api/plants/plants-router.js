const express = require('express');

const plants = require('./plants-model');
const router = express.Router();

router.get("/", (req, res, next) => {
    const ownerID = req.decoded.id;
    plants.findPlantsByOwner(ownerID)
        .then(resp => {
            res.status(200).json(resp);
        }).catch(next);
})

router.post("/", (req, res, next) => {
    const ownerID = req.decoded.id;
    let neoPlant = req.body;
    neoPlant.ownerID = ownerID;

    plants.createPlant(neoPlant)
        .then(() => {
            res.status(201).json({...neoPlant});
        }).catch(next);
})

router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    let neoPlant = req.body;
    neoPlant.plantID = id;

    plants.updatePlant(neoPlant)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.delete("/:plantID", (req, res, next) => {
const { plantID } = req.params;

    plants.removePlant(plantID)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

module.exports = router;
